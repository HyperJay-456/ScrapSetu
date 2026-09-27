import uuid
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class MaterialCategory(Base):
    __tablename__ = "material_categories"

    category_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_name = Column(String(100), nullable=False) # PCB, Cables, LCD, CRT, Batteries
    sub_category = Column(String(100), nullable=True)
    hazard_flag = Column(Boolean, default=False)
    icon_ref = Column(String(50), default="📦")
    base_rate_min = Column(Float, default=50.0)
    base_rate_max = Column(Float, default=100.0)

    lots = relationship("Lot", back_populates="category")
    prices = relationship("PriceHistory", back_populates="category")


class Collector(Base):
    __tablename__ = "collectors"

    collector_id = Column(String(36), primary_key=True, default=generate_uuid)
    phone_number = Column(String(20), unique=True, index=True, nullable=True)
    name = Column(String(100), default="Ramesh (Collector)")
    preferred_language = Column(String(10), default="mr") # 'mr' | 'hi' | 'en'
    operating_area = Column(String(100), default="Pune - Hadapsar")
    trust_score = Column(Float, default=50.0)
    total_earned = Column(Float, default=0.0)
    pending_dues = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    lots = relationship("Lot", back_populates="collector")
    transactions = relationship("Transaction", back_populates="collector")


class Recycler(Base):
    __tablename__ = "recyclers"

    recycler_id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(150), nullable=False)
    facility_lat = Column(Float, nullable=False)
    facility_lng = Column(Float, nullable=False)
    address = Column(Text, nullable=False)
    registration_number = Column(String(100), nullable=False)
    authorization_status = Column(String(50), default="authorized") # authorized | pending | expired
    authorization_expiry = Column(String(50), default="2027-12-31")
    contact_phone = Column(String(20), nullable=True)
    materials_accepted = Column(JSON, default=list) # [1, 2, 3] category_ids
    offered_rates = Column(JSON, default=dict) # {"1": 310, "2": 410, ...}
    pickup_available = Column(Boolean, default=True)
    service_area_km = Column(Float, default=15.0)
    rating = Column(Float, default=4.8)
    verified_by = Column(String(100), default="Maharashtra Pollution Control Board (MPCB)")
    created_at = Column(DateTime, default=datetime.utcnow)

    transactions = relationship("Transaction", back_populates="recycler")


class Lot(Base):
    __tablename__ = "lots"

    lot_id = Column(String(36), primary_key=True, default=generate_uuid)
    collector_id = Column(String(36), ForeignKey("collectors.collector_id"), nullable=True)
    category_id = Column(Integer, ForeignKey("material_categories.category_id"), nullable=False)
    description = Column(Text, nullable=True)
    image_paths = Column(JSON, default=list)
    approx_weight_kg = Column(Float, nullable=False, default=1.0)
    condition = Column(String(50), default="intact") # intact | damaged | burnt | dismantled
    source_type = Column(String(50), default="household") # household | dismantler | repair_shop | industrial
    estimated_value = Column(Float, default=0.0)
    status = Column(String(50), default="draft") # draft | quoted | matched | handed_over | confirmed | paid
    matched_recycler_id = Column(String(36), nullable=True)
    collection_lat = Column(Float, default=18.5204)
    collection_lng = Column(Float, default=73.8567)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    synced_at = Column(DateTime, nullable=True)

    category = relationship("MaterialCategory", back_populates="lots")
    collector = relationship("Collector", back_populates="lots")
    traceability = relationship("TraceabilityRecord", back_populates="lot", uselist=False)
    transactions = relationship("Transaction", back_populates="lot")


class PriceHistory(Base):
    __tablename__ = "price_history"

    price_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("material_categories.category_id"), nullable=False)
    location_code = Column(String(50), default="PUNE-411028")
    recorded_at = Column(DateTime, default=datetime.utcnow)
    price_min = Column(Float, nullable=False)
    price_max = Column(Float, nullable=False)
    unit = Column(String(20), default="per_kg")
    recycler_id = Column(String(36), nullable=True)
    source = Column(String(50), default="recycler_feed") # transaction | manual_survey | recycler_feed

    category = relationship("MaterialCategory", back_populates="prices")


class TraceabilityRecord(Base):
    __tablename__ = "traceability_records"

    handover_ref = Column(String(50), primary_key=True) # e.g. KC-9F31A2
    lot_id = Column(String(36), ForeignKey("lots.lot_id"), nullable=False, unique=True)
    photos = Column(JSON, default=list)
    weight_confirmed_kg = Column(Float, nullable=True)
    gps_lat = Column(Float, default=18.5204)
    gps_lng = Column(Float, default=73.8567)
    captured_at = Column(DateTime, default=datetime.utcnow)
    recycler_confirmed = Column(Boolean, default=False)
    recycler_confirmed_at = Column(DateTime, nullable=True)
    subsequent_status = Column(String(50), default="pending_pickup") # pending_pickup | received | processed

    lot = relationship("Lot", back_populates="traceability")


class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(String(36), primary_key=True, default=generate_uuid)
    lot_id = Column(String(36), ForeignKey("lots.lot_id"), nullable=False)
    collector_id = Column(String(36), ForeignKey("collectors.collector_id"), nullable=True)
    recycler_id = Column(String(36), ForeignKey("recyclers.recycler_id"), nullable=False)
    quoted_price = Column(Float, default=0.0)
    final_price = Column(Float, default=0.0)
    quantity_kg = Column(Float, default=0.0)
    handover_ref = Column(String(50), nullable=True)
    formal_bonus = Column(Float, default=0.0) # EPR pass-through bonus
    payment_status = Column(String(50), default="pending") # pending | paid | partial
    payment_mode = Column(String(50), default="cash") # cash | upi
    status = Column(String(50), default="open") # open | closed
    created_at = Column(DateTime, default=datetime.utcnow)
    closed_at = Column(DateTime, nullable=True)

    lot = relationship("Lot", back_populates="transactions")
    collector = relationship("Collector", back_populates="transactions")
    recycler = relationship("Recycler", back_populates="transactions")


class SyncQueue(Base):
    __tablename__ = "sync_queue"

    sync_id = Column(Integer, primary_key=True, autoincrement=True)
    entity_type = Column(String(50), nullable=False) # lot | transaction | handover
    entity_id = Column(String(50), nullable=False)
    operation = Column(String(20), default="upsert") # insert | update | upsert
    payload = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    synced = Column(Boolean, default=False)
