import math
from typing import List, Dict, Any

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance in kilometers between two GPS points using Haversine formula."""
    R = 6371.0 # Earth's radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

def rank_recyclers_for_lot(recyclers: List[Any], category_id: int, collector_lat: float, collector_lng: float) -> List[Dict[str, Any]]:
    """
    Explainable Recycler Matching Engine:
    Score = 0.30 * Distance + 0.30 * Price + 0.25 * Authorization + 0.15 * Pickup
    """
    scored_recyclers = []

    # Find max rate offered across all recyclers for normalisation
    rates = []
    for r in recyclers:
        rates_dict = r.offered_rates or {}
        rate = rates_dict.get(str(category_id)) or rates_dict.get(category_id) or 0.0
        rates.append(float(rate))
    max_rate = max(rates) if rates and max(rates) > 0 else 100.0

    for r in recyclers:
        rates_dict = r.offered_rates or {}
        offered_rate = float(rates_dict.get(str(category_id)) or rates_dict.get(category_id) or 0.0)

        # 1. Distance (30%) - closer is higher score (e.g. 0km = 100%, 25km+ = 0%)
        dist_km = calculate_haversine_distance(collector_lat, collector_lng, r.facility_lat, r.facility_lng)
        max_dist_threshold = 25.0
        dist_norm = max(0.0, min(100.0, (1.0 - (dist_km / max_dist_threshold)) * 100.0))
        dist_score = round(0.30 * dist_norm, 1)

        # 2. Price offered (30%) - higher rate compared to market max = higher score
        price_norm = max(0.0, min(100.0, (offered_rate / max_rate) * 100.0)) if max_rate > 0 else 50.0
        price_score = round(0.30 * price_norm, 1)

        # 3. Authorization status (25%) - authorized gets 100%, pending 40%, expired 0%
        auth_norm = 100.0 if r.authorization_status == "authorized" else (40.0 if r.authorization_status == "pending" else 0.0)
        auth_score = round(0.25 * auth_norm, 1)

        # 4. Pickup availability (15%) - doorstep pickup gets 100%, drop-off only gets 40%
        pickup_norm = 100.0 if r.pickup_available else 40.0
        pickup_score = round(0.15 * pickup_norm, 1)

        total_score = round(dist_score + price_score + auth_score + pickup_score, 1)

        scored_recyclers.append({
            "recycler": r,
            "distance_km": dist_km,
            "offered_rate": offered_rate,
            "total_score": total_score,
            "score_breakdown": {
                "distance": dist_score,
                "price": price_score,
                "authorization": auth_score,
                "pickup": pickup_score
            },
            "pickup_available": r.pickup_available,
            "is_authorized": r.authorization_status == "authorized"
        })

    # Sort descending by total score
    scored_recyclers.sort(key=lambda x: x["total_score"], reverse=True)
    return scored_recyclers
