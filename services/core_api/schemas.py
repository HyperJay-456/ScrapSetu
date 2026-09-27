from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# Category Schemas
class MaterialCategorySchema(BaseModel):
    category_id: int
    category_name: str
    sub_category: Optional[str] = None
    hazard_flag: bool = False
    icon_ref: str = "📦"
    base_rate_min: float
    base_rate_max: float

    class Config:
        from_attributes = True

# Price Schemas
class PriceItemSchema(BaseModel):
    category_id: int
    category_name: str
    price_min: float
    price_max: float
    unit: str = "per_kg"
    trend: str = "up" # up | down | stable
    change_pct: float = 0.0
    icon_ref: str = "📦"
    hazard_flag: bool = False

class PriceTrendSchema(BaseModel):
    category_id: int
    category_name: str
    history: List[Dict[str, Any]]

# Recycler Schemas
class RecyclerSchema(BaseModel):
    recycler_id: str
    name: str
    facility_lat: float
    facility_lng: float
    address: str
    registration_number: str
    authorization_status: str
    authorization_expiry: Optional[str] = None
    contact_phone: Optional[str] = None
    materials_accepted: List[int] = []
    offered_rates: Dict[str, float] = {}
    pickup_available: bool = True
    service_area_km: float = 15.0
    rating: float = 4.8
    verified_by: Optional[str] = None

    class Config:
        from_attributes = True

class RecyclerMatchResult(BaseModel):
    recycler: RecyclerSchema
    distance_km: float
    offered_rate: float
    total_score: float # 0 to 100
    score_breakdown: Dict[str, float] # distance (30%), price (30%), auth (25%), pickup (15%)
    pickup_available: bool
    is_authorized: bool

# Lot Schemas
class LotCreateSchema(BaseModel):
    lot_id: Optional[str] = None # can be generated offline on mobile
    collector_id: Optional[str] = None
    category_id: int
    description: Optional[str] = None
    image_paths: List[str] = []
    approx_weight_kg: float
    condition: str = "intact"
    source_type: str = "household"
    estimated_value: Optional[float] = None
    collection_lat: Optional[float] = 18.5204
    collection_lng: Optional[float] = 73.8567
    created_at: Optional[datetime] = None

class LotResponseSchema(BaseModel):
    lot_id: str
    collector_id: Optional[str] = None
    category_id: int
    category_name: Optional[str] = None
    description: Optional[str] = None
    image_paths: List[str] = []
    approx_weight_kg: float
    condition: str
    source_type: str
    estimated_value: float
    status: str
    matched_recycler_id: Optional[str] = None
    matched_recycler_name: Optional[str] = None
    collection_lat: Optional[float] = None
    collection_lng: Optional[float] = None
    handover_ref: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    synced_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Handover & Traceability Schemas
class HandoverInitiateRequest(BaseModel):
    lot_id: str
    recycler_id: str
    gps_lat: Optional[float] = 18.5204
    gps_lng: Optional[float] = 73.8567
    photos: List[str] = []
    handover_ref: Optional[str] = None # can be generated offline, e.g. KC-9F31A2

class HandoverResponseSchema(BaseModel):
    handover_ref: str
    lot_id: str
    status: str
    qr_payload: str
    gps_lat: float
    gps_lng: float
    captured_at: datetime
    recycler_confirmed: bool

class HandoverConfirmRequest(BaseModel):
    handover_ref: str
    weight_confirmed_kg: Optional[float] = None
    condition_confirmed: Optional[str] = "intact"
    payment_mode: Optional[str] = "cash"
    notes: Optional[str] = None

class HandoverConfirmResponse(BaseModel):
    success: bool
    message: str
    transaction_id: str
    handover_ref: str
    lot_id: str
    final_price: float
    formal_bonus: float
    collector_total_earned: float
    collector_pending_dues: float
    status: str

# Ledger Schemas
class TransactionItemSchema(BaseModel):
    transaction_id: str
    lot_id: str
    category_name: str
    weight_kg: float
    base_price: float
    formal_bonus: float # EPR pass-through bonus
    total_amount: float
    recycler_name: str
    handover_ref: str
    payment_status: str # pending | paid
    payment_mode: str # cash | upi
    date: datetime

class CollectorLedgerSchema(BaseModel):
    collector_id: str
    collector_name: str
    total_earned: float
    pending_dues: float
    total_lots_completed: int
    total_formal_bonus_earned: float
    transactions: List[TransactionItemSchema]

# Sync Schemas
class SyncPushRequest(BaseModel):
    collector_id: str
    lots: List[Dict[str, Any]] = []
    handover_records: List[Dict[str, Any]] = []

class SyncPushResponse(BaseModel):
    status: str
    synced_lots_count: int
    synced_handovers_count: int
    server_time: datetime

class SyncPullResponse(BaseModel):
    server_time: datetime
    updated_lots: List[LotResponseSchema]
    transactions: List[TransactionItemSchema]
    prices: List[PriceItemSchema]

# Auth Schemas
class OTPRequest(BaseModel):
    phone_number: str
    role: str = "collector" # collector | recycler

class OTPVerifyRequest(BaseModel):
    phone_number: str
    otp: str
    role: str = "collector"

class AuthResponse(BaseModel):
    token: str
    user_id: str
    role: str
    name: str
    phone_number: str
