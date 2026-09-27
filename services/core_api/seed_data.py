from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .models import MaterialCategory, Recycler, Collector, PriceHistory, Lot, Transaction, TraceabilityRecord

def seed_database(db: Session):
    # Check if already seeded
    if db.query(MaterialCategory).first():
        return

    # 1. Seed Material Categories
    categories = [
        MaterialCategory(
            category_id=1,
            category_name="PCB",
            sub_category="Motherboards & High-grade Circuit Boards",
            hazard_flag=False,
            icon_ref="💻",
            base_rate_min=280.0,
            base_rate_max=350.0
        ),
        MaterialCategory(
            category_id=2,
            category_name="Cables",
            sub_category="Insulated & Bare Copper Wiring",
            hazard_flag=False,
            icon_ref="🔌",
            base_rate_min=380.0,
            base_rate_max=440.0
        ),
        MaterialCategory(
            category_id=3,
            category_name="LCD",
            sub_category="Flat Panel Displays & Monitor Panels",
            hazard_flag=False,
            icon_ref="🖥️",
            base_rate_min=90.0,
            base_rate_max=140.0
        ),
        MaterialCategory(
            category_id=4,
            category_name="CRT",
            sub_category="Cathode Ray Tube Glass (Hazardous - Lead/Phosphor)",
            hazard_flag=True,
            icon_ref="📺",
            base_rate_min=40.0,
            base_rate_max=65.0
        ),
        MaterialCategory(
            category_id=5,
            category_name="Batteries",
            sub_category="Lithium-Ion & Lead Acid (Hazardous - Acid/Thermal)",
            hazard_flag=True,
            icon_ref="🔋",
            base_rate_min=85.0,
            base_rate_max=130.0
        )
    ]
    db.add_all(categories)
    db.commit()

    # 2. Seed Authorized & Registered Recyclers in Pune Region
    recyclers = [
        Recycler(
            recycler_id="rec-pune-01",
            name="EcoRecycle Hub Hadapsar",
            facility_lat=18.5089,
            facility_lng=73.9259,
            address="Plot 44, Hadapsar Industrial Estate, Pune, Maharashtra 411028",
            registration_number="MPCB/RO-PUNE/EW-2024/089",
            authorization_status="authorized",
            authorization_expiry="2027-10-15",
            contact_phone="+91 98230 11223",
            materials_accepted=[1, 2, 3, 4, 5],
            offered_rates={"1": 335.0, "2": 425.0, "3": 120.0, "4": 55.0, "5": 110.0},
            pickup_available=True,
            service_area_km=18.0,
            rating=4.9,
            verified_by="Maharashtra Pollution Control Board (MPCB)"
        ),
        Recycler(
            recycler_id="rec-pune-02",
            name="Mahasiddhi E-Waste Pimpri",
            facility_lat=18.6298,
            facility_lng=73.7997,
            address="MIDC Bhosari Block C, Pimpri-Chinchwad, Pune 411018",
            registration_number="MPCB/RO-PUNE/EW-2023/142",
            authorization_status="authorized",
            authorization_expiry="2026-12-31",
            contact_phone="+91 98221 44556",
            materials_accepted=[1, 2, 3],
            offered_rates={"1": 345.0, "2": 415.0, "3": 115.0},
            pickup_available=True,
            service_area_km=22.0,
            rating=4.7,
            verified_by="Maharashtra Pollution Control Board (MPCB)"
        ),
        Recycler(
            recycler_id="rec-pune-03",
            name="Chakan Green Metals & Recovery",
            facility_lat=18.7606,
            facility_lng=73.8636,
            address="Phase 2 Industrial Corridor, Chakan, Pune 410501",
            registration_number="CPCB/EPR-REC/MH-881",
            authorization_status="authorized",
            authorization_expiry="2028-05-30",
            contact_phone="+91 94220 77889",
            materials_accepted=[1, 2, 3, 4, 5],
            offered_rates={"1": 350.0, "2": 435.0, "3": 130.0, "4": 60.0, "5": 125.0},
            pickup_available=False, # Drop-off only
            service_area_km=30.0,
            rating=4.8,
            verified_by="Central Pollution Control Board (CPCB)"
        ),
        Recycler(
            recycler_id="rec-pune-04",
            name="Katraj Circular Aggregator",
            facility_lat=18.4575,
            facility_lng=73.8677,
            address="Survey 12, Katraj-Kondhwa Road, Pune 411046",
            registration_number="MPCB/PENDING/2026",
            authorization_status="pending",
            authorization_expiry="2026-06-30",
            contact_phone="+91 97654 33221",
            materials_accepted=[1, 2],
            offered_rates={"1": 310.0, "2": 395.0},
            pickup_available=True,
            service_area_km=10.0,
            rating=4.2,
            verified_by="Verification in Progress"
        )
    ]
    db.add_all(recyclers)
    db.commit()

    # 3. Seed Default Collector (Ramesh)
    collector = Collector(
        collector_id="col-ramesh-01",
        phone_number="9876543210",
        name="Ramesh (Collector)",
        preferred_language="mr",
        operating_area="Pune - Hadapsar / Mundhwa",
        trust_score=92.0,
        total_earned=4850.0,
        pending_dues=1240.0,
        created_at=datetime.utcnow() - timedelta(days=45)
    )
    db.add(collector)
    db.commit()

    # 4. Seed Price History (Last 7 days to generate trends)
    now = datetime.utcnow()
    price_trends = [
        (1, 310.0, 350.0), # PCB
        (2, 400.0, 440.0), # Cables
        (3, 100.0, 135.0), # LCD
        (4, 45.0, 65.0),   # CRT
        (5, 90.0, 125.0),  # Batteries
    ]
    for cat_id, min_p, max_p in price_trends:
        for day in range(7, -1, -1):
            day_time = now - timedelta(days=day)
            variance = (day % 3 - 1) * 3.5 # small realistic fluctuation
            ph = PriceHistory(
                category_id=cat_id,
                location_code="PUNE-411028",
                recorded_at=day_time,
                price_min=round(min_p + variance, 1),
                price_max=round(max_p + variance, 1),
                unit="per_kg",
                recycler_id="rec-pune-01",
                source="recycler_feed"
            )
            db.add(ph)
    db.commit()

    # 5. Seed Prior Completed Lots & Transactions for Ramesh's Ledger
    lot1 = Lot(
        lot_id="lot-hist-01",
        collector_id="col-ramesh-01",
        category_id=1, # PCB
        description="Assorted desktop computer motherboards",
        approx_weight_kg=8.5,
        condition="intact",
        source_type="repair_shop",
        estimated_value=2847.5,
        status="paid",
        matched_recycler_id="rec-pune-01",
        collection_lat=18.5100,
        collection_lng=73.9200,
        created_at=now - timedelta(days=5),
        synced_at=now - timedelta(days=5)
    )
    db.add(lot1)
    db.commit()

    tr1 = TraceabilityRecord(
        handover_ref="KC-4A82F1",
        lot_id=lot1.lot_id,
        photos=[],
        weight_confirmed_kg=8.5,
        gps_lat=18.5100,
        gps_lng=73.9200,
        captured_at=now - timedelta(days=5),
        recycler_confirmed=True,
        recycler_confirmed_at=now - timedelta(days=5),
        subsequent_status="received"
    )
    db.add(tr1)

    tx1 = Transaction(
        transaction_id="tx-hist-01",
        lot_id=lot1.lot_id,
        collector_id="col-ramesh-01",
        recycler_id="rec-pune-01",
        quoted_price=335.0 * 8.5, # 2847.5
        final_price=2847.5,
        quantity_kg=8.5,
        handover_ref="KC-4A82F1",
        formal_bonus=187.0, # EPR pass-through bonus (₹22/kg * 8.5kg)
        payment_status="paid",
        payment_mode="cash",
        status="closed",
        created_at=now - timedelta(days=5),
        closed_at=now - timedelta(days=5)
    )
    db.add(tx1)

    # Pending lot
    lot2 = Lot(
        lot_id="lot-hist-02",
        collector_id="col-ramesh-01",
        category_id=2, # Cables
        description="Stripped & unstripped telecom cables",
        approx_weight_kg=4.0,
        condition="intact",
        source_type="household",
        estimated_value=1700.0,
        status="confirmed",
        matched_recycler_id="rec-pune-01",
        collection_lat=18.5120,
        collection_lng=73.9230,
        created_at=now - timedelta(days=1),
        synced_at=now - timedelta(days=1)
    )
    db.add(lot2)
    db.commit()

    tr2 = TraceabilityRecord(
        handover_ref="KC-9F31A2",
        lot_id=lot2.lot_id,
        photos=[],
        weight_confirmed_kg=4.0,
        gps_lat=18.5120,
        gps_lng=73.9230,
        captured_at=now - timedelta(days=1),
        recycler_confirmed=True,
        recycler_confirmed_at=now - timedelta(hours=4),
        subsequent_status="received"
    )
    db.add(tr2)

    tx2 = Transaction(
        transaction_id="tx-hist-02",
        lot_id=lot2.lot_id,
        collector_id="col-ramesh-01",
        recycler_id="rec-pune-01",
        quoted_price=425.0 * 4.0, # 1700
        final_price=1700.0,
        quantity_kg=4.0,
        handover_ref="KC-9F31A2",
        formal_bonus=88.0, # EPR bonus
        payment_status="pending",
        payment_mode="cash",
        status="open",
        created_at=now - timedelta(days=1),
        closed_at=None
    )
    db.add(tx2)
    db.commit()
