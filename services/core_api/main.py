import os
import uuid
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, Query, Body, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session

from .database import engine, Base, get_db
from .models import (
    MaterialCategory, Collector, Recycler, Lot, PriceHistory,
    TraceabilityRecord, Transaction, SyncQueue
)
from .schemas import (
    MaterialCategorySchema, PriceItemSchema, PriceTrendSchema,
    RecyclerSchema, RecyclerMatchResult, LotCreateSchema, LotResponseSchema,
    HandoverInitiateRequest, HandoverResponseSchema,
    HandoverConfirmRequest, HandoverConfirmResponse,
    CollectorLedgerSchema, TransactionItemSchema,
    SyncPushRequest, SyncPushResponse, SyncPullResponse,
    OTPRequest, OTPVerifyRequest, AuthResponse
)
from .matching import rank_recyclers_for_lot
from .seed_data import seed_database
from ..ml_service.classifier import classify_material_image

# Initialize DB tables and seed data
Base.metadata.create_all(bind=engine)
db_session = next(get_db())
seed_database(db_session)
db_session.close()

app = FastAPI(
    title="ScrapSetu Core API",
    description="Traceable, offline-first digital bridge between informal e-waste collectors and authorized recyclers.",
    version="2.0.0"
)

# Enable CORS for cross-origin mobile/PWA and web requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# AUTHENTICATION (PHONE / OTP / JWT TOKEN)
# ---------------------------------------------------------

@app.post("/api/auth/otp/request", tags=["Auth"])
def request_otp(payload: OTPRequest, db: Session = Depends(get_db)):
    """Simulate instant SMS OTP request for zero-friction phone login."""
    return {
        "status": "success",
        "message": f"OTP sent to {payload.phone_number}. Use code '123456' for verification.",
        "test_otp": "123456"
    }

@app.post("/api/auth/otp/verify", response_model=AuthResponse, tags=["Auth"])
def verify_otp(payload: OTPVerifyRequest, db: Session = Depends(get_db)):
    """Verify OTP and return active user profile + auth token."""
    if payload.otp not in ["123456", "999999"]:
        raise HTTPException(status_code=400, detail="Invalid OTP code. Please use 123456.")

    if payload.role == "collector":
        collector = db.query(Collector).filter(Collector.phone_number == payload.phone_number).first()
        if not collector:
            collector = Collector(
                phone_number=payload.phone_number,
                name="Ramesh (Collector)",
                preferred_language="mr",
                operating_area="Pune - Hadapsar",
                trust_score=85.0
            )
            db.add(collector)
            db.commit()
            db.refresh(collector)
        return AuthResponse(
            token=f"jwt-col-{collector.collector_id[:8]}",
            user_id=collector.collector_id,
            role="collector",
            name=collector.name,
            phone_number=collector.phone_number or payload.phone_number
        )
    else: # Recycler
        recycler = db.query(Recycler).first()
        return AuthResponse(
            token=f"jwt-rec-{recycler.recycler_id[:8]}",
            user_id=recycler.recycler_id,
            role="recycler",
            name=recycler.name,
            phone_number=recycler.contact_phone or payload.phone_number
        )

# ---------------------------------------------------------
# MATERIAL CATEGORIES & PRICING BOARD
# ---------------------------------------------------------

@app.get("/api/categories", response_model=List[MaterialCategorySchema], tags=["Categories"])
def get_categories(db: Session = Depends(get_db)):
    """Get all standard e-waste material categories."""
    return db.query(MaterialCategory).order_id_asc(MaterialCategory.category_id).all() if hasattr(db.query(MaterialCategory), 'order_id_asc') else db.query(MaterialCategory).order_by(MaterialCategory.category_id).all()

@app.get("/api/prices", response_model=List[PriceItemSchema], tags=["Prices"])
def get_prices(location: Optional[str] = "PUNE-411028", db: Session = Depends(get_db)):
    """
    Live-style Price Board: returns current rate range per kg,
    up/down trend indicators, and percentage change.
    """
    categories = db.query(MaterialCategory).order_by(MaterialCategory.category_id).all()
    results = []

    trends_map = {
        1: ("up", 4.2),      # PCB high demand
        2: ("up", 2.8),      # Copper cables high demand
        3: ("stable", 0.0),  # LCD steady
        4: ("down", -1.5),   # CRT demand tapering
        5: ("up", 3.1),      # Batteries high recovery interest
    }

    for cat in categories:
        trend, change_pct = trends_map.get(cat.category_id, ("stable", 0.0))
        results.append(PriceItemSchema(
            category_id=cat.category_id,
            category_name=cat.category_name,
            price_min=cat.base_rate_min,
            price_max=cat.base_rate_max,
            unit="per_kg",
            trend=trend,
            change_pct=change_pct,
            icon_ref=cat.icon_ref,
            hazard_flag=cat.hazard_flag
        ))
    return results

@app.get("/api/prices/trends", tags=["Prices"])
def get_price_trends(category_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Historical price trend data for explainable valuation charts."""
    query = db.query(PriceHistory)
    if category_id:
        query = query.filter(PriceHistory.category_id == category_id)
    history = query.order_by(PriceHistory.recorded_at.desc()).limit(35).all()

    grouped: Dict[int, List[Dict[str, Any]]] = {}
    for h in history:
        if h.category_id not in grouped:
            grouped[h.category_id] = []
        grouped[h.category_id].append({
            "date": h.recorded_at.strftime("%Y-%m-%d"),
            "price_min": h.price_min,
            "price_max": h.price_max,
            "avg_price": round((h.price_min + h.price_max) / 2.0, 1)
        })
    return grouped

# ---------------------------------------------------------
# LOT CREATION & MANAGEMENT (OFFLINE-SYNC FRIENDLY)
# ---------------------------------------------------------

@app.post("/api/lots", response_model=LotResponseSchema, tags=["Lots"])
def create_lot(payload: LotCreateSchema, db: Session = Depends(get_db)):
    """
    Create a new lot (works both online and synced from offline queue).
    If estimated_value is not passed, calculates it using category base rate.
    """
    category = db.query(MaterialCategory).filter(MaterialCategory.category_id == payload.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    estimated_val = payload.estimated_value
    if not estimated_val or estimated_val <= 0:
        avg_rate = (category.base_rate_min + category.base_rate_max) / 2.0
        estimated_val = round(avg_rate * payload.approx_weight_kg, 2)

    # Use client-generated UUID if provided (for offline sync consistency), else generate
    lot_id = payload.lot_id or str(uuid.uuid4())

    # Check if lot already exists (prevent duplicate sync insert)
    existing_lot = db.query(Lot).filter(Lot.lot_id == lot_id).first()
    if existing_lot:
        existing_lot.approx_weight_kg = payload.approx_weight_kg
        existing_lot.estimated_value = estimated_val
        existing_lot.category_id = payload.category_id
        existing_lot.description = payload.description
        existing_lot.synced_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_lot)
        lot = existing_lot
    else:
        lot = Lot(
            lot_id=lot_id,
            collector_id=payload.collector_id or "col-ramesh-01",
            category_id=payload.category_id,
            description=payload.description or f"{category.category_name} Lot ({payload.approx_weight_kg} kg)",
            image_paths=payload.image_paths or [],
            approx_weight_kg=payload.approx_weight_kg,
            condition=payload.condition,
            source_type=payload.source_type,
            estimated_value=estimated_val,
            status="draft",
            collection_lat=payload.collection_lat or 18.5204,
            collection_lng=payload.collection_lng or 73.8567,
            created_at=payload.created_at or datetime.utcnow(),
            synced_at=datetime.utcnow()
        )
        db.add(lot)
        db.commit()
        db.refresh(lot)

    return LotResponseSchema(
        lot_id=lot.lot_id,
        collector_id=lot.collector_id,
        category_id=lot.category_id,
        category_name=category.category_name,
        description=lot.description,
        image_paths=lot.image_paths or [],
        approx_weight_kg=lot.approx_weight_kg,
        condition=lot.condition,
        source_type=lot.source_type,
        estimated_value=lot.estimated_value,
        status=lot.status,
        matched_recycler_id=lot.matched_recycler_id,
        collection_lat=lot.collection_lat,
        collection_lng=lot.collection_lng,
        created_at=lot.created_at,
        updated_at=lot.updated_at,
        synced_at=lot.synced_at
    )

@app.get("/api/lots", response_model=List[LotResponseSchema], tags=["Lots"])
def list_lots(
    collector_id: Optional[str] = None,
    recycler_id: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List lots filtered by collector, matched recycler, or lot status."""
    query = db.query(Lot)
    if collector_id:
        query = query.filter(Lot.collector_id == collector_id)
    if recycler_id:
        query = query.filter(Lot.matched_recycler_id == recycler_id)
    if status:
        query = query.filter(Lot.status == status)

    lots = query.order_by(Lot.created_at.desc()).all()
    results = []
    for lot in lots:
        cat_name = lot.category.category_name if lot.category else "E-Waste"
        rec_name = None
        if lot.matched_recycler_id:
            rec = db.query(Recycler).filter(Recycler.recycler_id == lot.matched_recycler_id).first()
            if rec:
                rec_name = rec.name

        handover_ref = lot.traceability.handover_ref if lot.traceability else None

        results.append(LotResponseSchema(
            lot_id=lot.lot_id,
            collector_id=lot.collector_id,
            category_id=lot.category_id,
            category_name=cat_name,
            description=lot.description,
            image_paths=lot.image_paths or [],
            approx_weight_kg=lot.approx_weight_kg,
            condition=lot.condition,
            source_type=lot.source_type,
            estimated_value=lot.estimated_value,
            status=lot.status,
            matched_recycler_id=lot.matched_recycler_id,
            matched_recycler_name=rec_name,
            collection_lat=lot.collection_lat,
            collection_lng=lot.collection_lng,
            handover_ref=handover_ref,
            created_at=lot.created_at,
            updated_at=lot.updated_at,
            synced_at=lot.synced_at
        ))
    return results

@app.get("/api/lots/{lot_id}", response_model=LotResponseSchema, tags=["Lots"])
def get_lot(lot_id: str, db: Session = Depends(get_db)):
    """Fetch single lot by ID."""
    lot = db.query(Lot).filter(Lot.lot_id == lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")

    cat_name = lot.category.category_name if lot.category else "E-Waste"
    rec_name = None
    if lot.matched_recycler_id:
        rec = db.query(Recycler).filter(Recycler.recycler_id == lot.matched_recycler_id).first()
        if rec:
            rec_name = rec.name

    handover_ref = lot.traceability.handover_ref if lot.traceability else None

    return LotResponseSchema(
        lot_id=lot.lot_id,
        collector_id=lot.collector_id,
        category_id=lot.category_id,
        category_name=cat_name,
        description=lot.description,
        image_paths=lot.image_paths or [],
        approx_weight_kg=lot.approx_weight_kg,
        condition=lot.condition,
        source_type=lot.source_type,
        estimated_value=lot.estimated_value,
        status=lot.status,
        matched_recycler_id=lot.matched_recycler_id,
        matched_recycler_name=rec_name,
        collection_lat=lot.collection_lat,
        collection_lng=lot.collection_lng,
        handover_ref=handover_ref,
        created_at=lot.created_at,
        updated_at=lot.updated_at,
        synced_at=lot.synced_at
    )

@app.post("/api/lots/{lot_id}/classify", tags=["ML Service"])
def classify_lot_image(lot_id: str, payload: Dict[str, Any] = Body(default={}), db: Session = Depends(get_db)):
    """
    Server-side classification fallback when on-device confidence is low.
    """
    lot = db.query(Lot).filter(Lot.lot_id == lot_id).first()
    image_data = payload.get("image_data") or (lot.image_paths[0] if lot and lot.image_paths else None)
    hint_text = payload.get("hint_text") or (lot.description if lot else None)

    result = classify_material_image(image_data=image_data, hint_text=hint_text)

    # If lot exists and was in draft, optionally update category
    if lot and lot.status == "draft":
        lot.category_id = result["category_id"]
        db.commit()

    return result

# ---------------------------------------------------------
# RECYCLER DISCOVERY & MATCHING ENGINE (EXPLAINABLE)
# ---------------------------------------------------------

@app.get("/api/recyclers", response_model=List[RecyclerSchema], tags=["Recyclers"])
def list_recyclers(category_id: Optional[int] = None, db: Session = Depends(get_db)):
    """List registered recyclers."""
    recyclers = db.query(Recycler).all()
    if category_id:
        recyclers = [r for r in recyclers if category_id in (r.materials_accepted or [])]
    return recyclers

@app.post("/api/lots/{lot_id}/match", response_model=List[RecyclerMatchResult], tags=["Matching"])
def match_recyclers_for_lot(lot_id: str, db: Session = Depends(get_db)):
    """
    Run explainable recycler matching engine for a lot:
    30% Distance, 30% Price offered, 25% Authorization status, 15% Pickup availability.
    """
    lot = db.query(Lot).filter(Lot.lot_id == lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")

    recyclers = db.query(Recycler).all()
    # Filter recyclers accepting this category
    accepted_recyclers = [r for r in recyclers if lot.category_id in (r.materials_accepted or [])]
    if not accepted_recyclers:
        accepted_recyclers = recyclers # fallback to all if none specified

    ranked = rank_recyclers_for_lot(
        recyclers=accepted_recyclers,
        category_id=lot.category_id,
        collector_lat=lot.collection_lat or 18.5204,
        collector_lng=lot.collection_lng or 73.8567
    )

    results = []
    for item in ranked:
        r = item["recycler"]
        results.append(RecyclerMatchResult(
            recycler=RecyclerSchema.from_orm(r),
            distance_km=item["distance_km"],
            offered_rate=item["offered_rate"],
            total_score=item["total_score"],
            score_breakdown=item["score_breakdown"],
            pickup_available=item["pickup_available"],
            is_authorized=item["is_authorized"]
        ))
    return results

# ---------------------------------------------------------
# PHYSICAL-DIGITAL HANDOVER & TRACEABILITY
# ---------------------------------------------------------

@app.post("/api/lots/{lot_id}/handover", response_model=HandoverResponseSchema, tags=["Handover"])
def initiate_handover(lot_id: str, payload: HandoverInitiateRequest, db: Session = Depends(get_db)):
    """
    Generate physical-digital handover record with short code (e.g. KC-9F31A2),
    bind GPS and timestamp, and assign matched recycler.
    """
    lot = db.query(Lot).filter(Lot.lot_id == lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")

    recycler = db.query(Recycler).filter(Recycler.recycler_id == payload.recycler_id).first()
    if not recycler:
        raise HTTPException(status_code=404, detail="Recycler not found")

    # Generate or reuse short handover reference (e.g., KC-8B39D1)
    if payload.handover_ref:
        handover_ref = payload.handover_ref
    else:
        short_id = uuid.uuid4().hex[:6].upper()
        handover_ref = f"KC-{short_id}"

    # Check if traceability record already exists
    traceability = db.query(TraceabilityRecord).filter(TraceabilityRecord.lot_id == lot_id).first()
    if not traceability:
        traceability = TraceabilityRecord(
            handover_ref=handover_ref,
            lot_id=lot_id,
            photos=payload.photos or [],
            gps_lat=payload.gps_lat or lot.collection_lat or 18.5204,
            gps_lng=payload.gps_lng or lot.collection_lng or 73.8567,
            captured_at=datetime.utcnow(),
            recycler_confirmed=False,
            subsequent_status="pending_pickup"
        )
        db.add(traceability)
    else:
        handover_ref = traceability.handover_ref

    # Update lot status to matched/handed_over
    lot.status = "handed_over"
    lot.matched_recycler_id = payload.recycler_id
    lot.updated_at = datetime.utcnow()
    db.commit()

    # QR payload containing JSON data readable offline by any standard scanner
    qr_payload = f"SCRAP-SETU|REF:{handover_ref}|LOT:{lot_id}|WEIGHT:{lot.approx_weight_kg}|CAT:{lot.category_id}"

    return HandoverResponseSchema(
        handover_ref=handover_ref,
        lot_id=lot_id,
        status="handed_over",
        qr_payload=qr_payload,
        gps_lat=traceability.gps_lat,
        gps_lng=traceability.gps_lng,
        captured_at=traceability.captured_at,
        recycler_confirmed=traceability.recycler_confirmed
    )

@app.post("/api/handover/{handover_ref}/confirm", response_model=HandoverConfirmResponse, tags=["Handover"])
def confirm_handover(handover_ref: str, payload: HandoverConfirmRequest, db: Session = Depends(get_db)):
    """
    Recycler scans QR code or enters code to confirm physical receipt of e-waste lot.
    Completes transaction, applies Formal EPR Bonus, updates collector earnings ledger.
    """
    traceability = db.query(TraceabilityRecord).filter(TraceabilityRecord.handover_ref == handover_ref).first()
    if not traceability:
        raise HTTPException(status_code=404, detail="Handover record not found for this reference code.")

    lot = db.query(Lot).filter(Lot.lot_id == traceability.lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Associated lot not found.")

    recycler = db.query(Recycler).filter(Recycler.recycler_id == lot.matched_recycler_id).first()
    if not recycler:
        recycler = db.query(Recycler).first() # fallback

    collector = db.query(Collector).filter(Collector.collector_id == lot.collector_id).first()

    # Confirmed weight (either verified on recycler's scale or collector's approx weight)
    final_weight = payload.weight_confirmed_kg or lot.approx_weight_kg

    # Calculate final price using recycler's rate for this category
    rate = 0.0
    if recycler and recycler.offered_rates:
        rate = float(recycler.offered_rates.get(str(lot.category_id), 0.0))
    if rate <= 0:
        rate = (lot.category.base_rate_min + lot.category.base_rate_max) / 2.0 if lot.category else 250.0

    material_price = round(rate * final_weight, 2)

    # Formal Bonus (EPR pass-through bonus: ₹22/kg)
    formal_bonus = round(22.0 * final_weight, 2)
    final_total_price = material_price + formal_bonus

    # Mark traceability confirmed
    traceability.recycler_confirmed = True
    traceability.recycler_confirmed_at = datetime.utcnow()
    traceability.weight_confirmed_kg = final_weight
    traceability.subsequent_status = "received"

    # Mark lot status confirmed
    lot.status = "confirmed"
    lot.approx_weight_kg = final_weight
    lot.estimated_value = material_price
    lot.updated_at = datetime.utcnow()

    # Create or update Transaction
    tx = db.query(Transaction).filter(Transaction.lot_id == lot.lot_id).first()
    if not tx:
        tx = Transaction(
            transaction_id=f"tx-{uuid.uuid4().hex[:8]}",
            lot_id=lot.lot_id,
            collector_id=lot.collector_id,
            recycler_id=recycler.recycler_id if recycler else "rec-pune-01",
            quoted_price=material_price,
            final_price=final_total_price,
            quantity_kg=final_weight,
            handover_ref=handover_ref,
            formal_bonus=formal_bonus,
            payment_status="paid" if payload.payment_mode == "cash" else "pending",
            payment_mode=payload.payment_mode or "cash",
            status="closed",
            created_at=datetime.utcnow(),
            closed_at=datetime.utcnow()
        )
        db.add(tx)
    else:
        tx.final_price = final_total_price
        tx.quantity_kg = final_weight
        tx.formal_bonus = formal_bonus
        tx.payment_status = "paid" if payload.payment_mode == "cash" else "pending"
        tx.status = "closed"
        tx.closed_at = datetime.utcnow()

    # Update collector ledger statistics
    if collector:
        collector.total_earned += final_total_price
        if tx.payment_status == "pending":
            collector.pending_dues += final_total_price
        collector.trust_score = min(100.0, collector.trust_score + 2.0)

    db.commit()

    return HandoverConfirmResponse(
        success=True,
        message=f"Lot {lot.lot_id[:8]} confirmed successfully! Verified weight: {final_weight} kg.",
        transaction_id=tx.transaction_id,
        handover_ref=handover_ref,
        lot_id=lot.lot_id,
        final_price=final_total_price,
        formal_bonus=formal_bonus,
        collector_total_earned=collector.total_earned if collector else final_total_price,
        collector_pending_dues=collector.pending_dues if collector else 0.0,
        status="confirmed"
    )

# ---------------------------------------------------------
# COLLECTOR EARNINGS LEDGER
# ---------------------------------------------------------

@app.get("/api/collectors/{collector_id}/ledger", response_model=CollectorLedgerSchema, tags=["Ledger"])
def get_collector_ledger(collector_id: str, db: Session = Depends(get_db)):
    """
    Get transparent collector earnings ledger showing total earned,
    pending dues, transaction history, and highlighted Formal EPR Bonus lines.
    """
    collector = db.query(Collector).filter(Collector.collector_id == collector_id).first()
    if not collector:
        # Default fallback
        collector = db.query(Collector).first()

    transactions = db.query(Transaction).filter(
        Transaction.collector_id == (collector.collector_id if collector else collector_id)
    ).order_by(Transaction.created_at.desc()).all()

    tx_items = []
    total_bonus = 0.0

    for tx in transactions:
        cat_name = tx.lot.category.category_name if tx.lot and tx.lot.category else "E-Waste"
        rec_name = tx.recycler.name if tx.recycler else "EcoRecycle Hub"
        base_p = tx.final_price - (tx.formal_bonus or 0.0)
        total_bonus += (tx.formal_bonus or 0.0)

        tx_items.append(TransactionItemSchema(
            transaction_id=tx.transaction_id,
            lot_id=tx.lot_id,
            category_name=cat_name,
            weight_kg=tx.quantity_kg,
            base_price=round(base_p, 2),
            formal_bonus=round(tx.formal_bonus or 0.0, 2),
            total_amount=round(tx.final_price, 2),
            recycler_name=rec_name,
            handover_ref=tx.handover_ref or "KC-NONE",
            payment_status=tx.payment_status,
            payment_mode=tx.payment_mode or "cash",
            date=tx.created_at
        ))

    return CollectorLedgerSchema(
        collector_id=collector.collector_id if collector else collector_id,
        collector_name=collector.name if collector else "Ramesh",
        total_earned=round(collector.total_earned if collector else sum(t.final_price for t in transactions), 2),
        pending_dues=round(collector.pending_dues if collector else 0.0, 2),
        total_lots_completed=len(transactions),
        total_formal_bonus_earned=round(total_bonus, 2),
        transactions=tx_items
    )

@app.post("/api/transactions/{transaction_id}/payment", tags=["Ledger"])
def complete_payment(transaction_id: str, mode: str = "cash", db: Session = Depends(get_db)):
    """Mark a pending transaction as paid."""
    tx = db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    tx.payment_status = "paid"
    tx.payment_mode = mode
    if tx.collector and tx.collector.pending_dues >= tx.final_price:
        tx.collector.pending_dues -= tx.final_price

    db.commit()
    return {"status": "success", "message": f"Payment marked {mode} paid."}

# ---------------------------------------------------------
# OFFLINE SYNCHRONIZATION (PUSH & PULL)
# ---------------------------------------------------------

@app.post("/api/sync/push", response_model=SyncPushResponse, tags=["Sync"])
def sync_push(payload: SyncPushRequest, db: Session = Depends(get_db)):
    """
    Push offline-created lots and handovers to backend when internet reconnects.
    """
    synced_lots = 0
    synced_handovers = 0

    for lot_dict in payload.lots:
        lot_id = lot_dict.get("lot_id") or str(uuid.uuid4())
        existing = db.query(Lot).filter(Lot.lot_id == lot_id).first()

        cat_id = lot_dict.get("category_id", 1)
        category = db.query(MaterialCategory).filter(MaterialCategory.category_id == cat_id).first()
        weight = float(lot_dict.get("approx_weight_kg", 1.0))
        est_val = float(lot_dict.get("estimated_value") or ((category.base_rate_min + category.base_rate_max) / 2.0 * weight))

        if not existing:
            new_lot = Lot(
                lot_id=lot_id,
                collector_id=payload.collector_id or "col-ramesh-01",
                category_id=cat_id,
                description=lot_dict.get("description", "Offline created lot"),
                approx_weight_kg=weight,
                condition=lot_dict.get("condition", "intact"),
                source_type=lot_dict.get("source_type", "household"),
                estimated_value=est_val,
                status=lot_dict.get("status", "draft"),
                matched_recycler_id=lot_dict.get("matched_recycler_id"),
                collection_lat=lot_dict.get("collection_lat", 18.5204),
                collection_lng=lot_dict.get("collection_lng", 73.8567),
                synced_at=datetime.utcnow()
            )
            db.add(new_lot)
            synced_lots += 1
        else:
            existing.status = lot_dict.get("status", existing.status)
            existing.matched_recycler_id = lot_dict.get("matched_recycler_id", existing.matched_recycler_id)
            existing.synced_at = datetime.utcnow()
            synced_lots += 1

    for h_dict in payload.handover_records:
        h_ref = h_dict.get("handover_ref")
        if h_ref:
            existing_h = db.query(TraceabilityRecord).filter(TraceabilityRecord.handover_ref == h_ref).first()
            if not existing_h:
                new_h = TraceabilityRecord(
                    handover_ref=h_ref,
                    lot_id=h_dict.get("lot_id"),
                    gps_lat=h_dict.get("gps_lat", 18.5204),
                    gps_lng=h_dict.get("gps_lng", 73.8567),
                    captured_at=datetime.utcnow(),
                    recycler_confirmed=h_dict.get("recycler_confirmed", False),
                    subsequent_status="pending_pickup"
                )
                db.add(new_h)
                synced_handovers += 1

    db.commit()

    return SyncPushResponse(
        status="synced",
        synced_lots_count=synced_lots,
        synced_handovers_count=synced_handovers,
        server_time=datetime.utcnow()
    )

@app.get("/api/sync/pull", response_model=SyncPullResponse, tags=["Sync"])
def sync_pull(since: Optional[datetime] = None, collector_id: Optional[str] = "col-ramesh-01", db: Session = Depends(get_db)):
    """
    Pull delta updates from server since a given timestamp.
    """
    if not since:
        since = datetime.utcnow() - timedelta(days=7)

    updated_lots = db.query(Lot).filter(Lot.updated_at >= since).all()
    txs = db.query(Transaction).filter(Transaction.created_at >= since).all()
    prices = get_prices(location="PUNE-411028", db=db)

    lot_schemas = []
    for lot in updated_lots:
        cat_name = lot.category.category_name if lot.category else "E-Waste"
        rec_name = db.query(Recycler).filter(Recycler.recycler_id == lot.matched_recycler_id).first().name if lot.matched_recycler_id and db.query(Recycler).filter(Recycler.recycler_id == lot.matched_recycler_id).first() else None
        href = lot.traceability.handover_ref if lot.traceability else None
        lot_schemas.append(LotResponseSchema(
            lot_id=lot.lot_id,
            collector_id=lot.collector_id,
            category_id=lot.category_id,
            category_name=cat_name,
            description=lot.description,
            image_paths=lot.image_paths or [],
            approx_weight_kg=lot.approx_weight_kg,
            condition=lot.condition,
            source_type=lot.source_type,
            estimated_value=lot.estimated_value,
            status=lot.status,
            matched_recycler_id=lot.matched_recycler_id,
            matched_recycler_name=rec_name,
            collection_lat=lot.collection_lat,
            collection_lng=lot.collection_lng,
            handover_ref=href,
            created_at=lot.created_at,
            updated_at=lot.updated_at,
            synced_at=lot.synced_at
        ))

    tx_schemas = []
    for tx in txs:
        cat_name = tx.lot.category.category_name if tx.lot and tx.lot.category else "E-Waste"
        rec_name = tx.recycler.name if tx.recycler else "EcoRecycle Hub"
        tx_schemas.append(TransactionItemSchema(
            transaction_id=tx.transaction_id,
            lot_id=tx.lot_id,
            category_name=cat_name,
            weight_kg=tx.quantity_kg,
            base_price=round(tx.final_price - (tx.formal_bonus or 0), 2),
            formal_bonus=round(tx.formal_bonus or 0, 2),
            total_amount=round(tx.final_price, 2),
            recycler_name=rec_name,
            handover_ref=tx.handover_ref or "KC-NONE",
            payment_status=tx.payment_status,
            payment_mode=tx.payment_mode or "cash",
            date=tx.created_at
        ))

    return SyncPullResponse(
        server_time=datetime.utcnow(),
        updated_lots=lot_schemas,
        transactions=tx_schemas,
        prices=prices
    )

@app.get("/api/health", tags=["System"])
def health_check():
    return {"status": "ok", "app": "ScrapSetu Core API", "version": "2.0.0"}

root_index_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "index.html")

@app.get("/", tags=["Portal"])
def get_portal():
    if os.path.exists(root_index_path):
        return FileResponse(root_index_path)
    return {"message": "ScrapSetu MVP Portal ready. Visit /collector or /recycler or /docs."}

# Mount static files for Collector App and Recycler Web if directory exists
collector_static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "apps", "collector_app")
recycler_static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "apps", "recycler_web")

if os.path.exists(collector_static_dir):
    app.mount("/collector", StaticFiles(directory=collector_static_dir, html=True), name="collector")

if os.path.exists(recycler_static_dir):
    app.mount("/recycler", StaticFiles(directory=recycler_static_dir, html=True), name="recycler")

