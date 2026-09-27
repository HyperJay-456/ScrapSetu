import re
from typing import Dict, Any, Optional

CATEGORIES_MAP = {
    1: {"name": "PCB", "sub": "Circuit Boards / Motherboards", "confidence_base": 0.94},
    2: {"name": "Cables", "sub": "Copper Wire & Telecom Cables", "confidence_base": 0.91},
    3: {"name": "LCD", "sub": "Flat Screen Panels & Monitors", "confidence_base": 0.89},
    4: {"name": "CRT", "sub": "Cathode Ray Glass Monitors", "confidence_base": 0.86},
    5: {"name": "Batteries", "sub": "Li-ion / Lead Acid Cells", "confidence_base": 0.88},
}

def classify_material_image(image_data: Optional[str] = None, hint_text: Optional[str] = None) -> Dict[str, Any]:
    """
    Classify material image with server-side fallback.
    Returns:
    {
        "category_id": int,
        "category_name": str,
        "sub_category": str,
        "confidence": float,
        "hazard_flag": bool,
        "requires_manual_check": bool
    }
    """
    # Heuristic analysis based on image metadata, data URL characteristics, or hint text
    text = (hint_text or "").lower()
    
    if any(k in text for k in ["pcb", "board", "circuit", "chip", "motherboard", "green"]):
        cat_id = 1
    elif any(k in text for k in ["cable", "wire", "copper", "cord", "insulat"]):
        cat_id = 2
    elif any(k in text for k in ["lcd", "screen", "panel", "display", "flat", "monitor"]):
        cat_id = 3
    elif any(k in text for k in ["crt", "tube", "glass", "tv", "heavy"]):
        cat_id = 4
    elif any(k in text for k in ["battery", "cell", "li-ion", "acid", "lead", "power"]):
        cat_id = 5
    elif image_data:
        # Analyze data signature length/hash or pattern
        length = len(image_data)
        # deterministic demo mapping
        cat_id = (length % 3) + 1 # prioritize 1 (PCB), 2 (Cables), 3 (LCD)
    else:
        # Default starting hero category: PCB
        cat_id = 1

    cat_info = CATEGORIES_MAP.get(cat_id, CATEGORIES_MAP[1])
    confidence = cat_info["confidence_base"]
    requires_manual_check = confidence < 0.70

    return {
        "category_id": cat_id,
        "category_name": cat_info["name"],
        "sub_category": cat_info["sub"],
        "confidence": round(confidence, 2),
        "confidence_pct": int(confidence * 100),
        "hazard_flag": cat_id in [4, 5],
        "requires_manual_check": requires_manual_check,
        "source": "server_classifier_fallback"
    }
