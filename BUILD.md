# ScrapSetu — MVP Build Blueprint
**SIH Problem Statement ID: 26229** · Organization: Ministry of Mines (MoM) · Department: JNARDDC  
**Theme:** Clean & Green Technology · **Category:** Software  

*How to use this file: This is a self-contained engineering + product spec. It covers architecture, data model, APIs, AI/ML design, UX rules, unit economics, and a build roadmap so any team member (or a judge skimming your repo) can understand the whole system without a briefing.*

---

## 1. Why This Problem, Why Now
India generated roughly 2.2 million tonnes of e-waste in 2025, making it the world's third-largest generator after China and the US, and over half of that stream is still handled by informal collectors using unsafe methods like open-air burning and acid leaching. Independent estimates put India's annual e-waste stream at a recoverable value of nearly ₹51,000 crore, of which only about 18% is actually captured through formal channels — the rest is lost to inefficient informal processing or leaks out of the system entirely.

Underneath all of that is a simpler fact: **the value locked up in the formal / EPR channel is not currently visible to the person who actually does the collecting.** A collector generally has no way to know what a fair price looks like, whether a buyer is authorized, or that a mechanism like EPR even exists — so there's no reason for them to prefer the formal route. Structured aggregation can meaningfully raise a worker's monthly income simply by removing multiple margin-taking middlemen and giving workers a stable, transparent outlet.

Lead with the plainer, harder-to-attack claim: *"EPR value is currently not transparently visible to informal collectors."* The win condition is not "digitize the scrap trade." It's **"make the formal, traceable route pay visibly more, in a form the collector can use with zero reading and zero data connectivity."**

---

## 2. Product Thesis & Unique Differentiators
Pitch it as: **"A traceable, offline-first digital bridge between informal e-waste collectors and authorized recyclers."** Then, as a supporting detail: *"AI helps classify material at the point of collection."*

### Key Differentiators:
1. **Physical–digital handover tag:** Every digital lot generates a short QR + human-readable code physically tied to the actual sack/bundle. Recycler scans it on arrival.
2. **Fully offline, on-device material classification:** On-device classifier evaluates material immediately, with no signal, so a collector with zero connectivity still gets instant category + estimate.
3. **EPR pass-through bonus:** Recycler receives a documented, traceable lot simplifying EPR compliance; a portion of value is passed to the originating collector as a "Formal Bonus" line in their ledger.
4. **Community drop-point aggregation:** Pool individual small lots into one combined lot for authorized pickup.
5. **Voice-first price board:** Single "बोलो भाव" button reads today's prices aloud in Hindi/Marathi via text-to-speech — no data required.

---

## 3. MVP Scope: What to Build vs. Defer

### The Core Loop (Build this first):
```text
COLLECTOR APP
     │
     ▼
Create Lot (Offline)
     │
     ├── Take photo
     │
     ├── AI classifies material (PCB, Cables, LCD -> CRT, Batteries)
     │
     └── Manual correction if wrong
     │
     ▼
Enter Weight
     │
     ▼
Calculate Estimated Value
     │
     ▼
Find Matching Recycler
     │
     ▼
Select Recycler
     │
     ▼
Generate QR + Handover Code
     │
     ▼
Handover
     │
     ▼
RECYCLER DASHBOARD
     │
     ▼
Scan QR
     │
     ▼
Confirm Receipt
     │
     ▼
TRANSACTION COMPLETED
     │
     ▼
COLLECTOR LEDGER
     │
     ▼
Sync with Backend
```

### Screens:
- **Collector App:**
  1. Language selection (मराठी / हिंदी / English)
  2. Home / Price board (with audio "बोलो भाव")
  3. Create lot (Camera + AI / Manual + Weight slider + Instant estimate)
  4. Recycler matches (Explainable rank: distance, rate, authorization, pickup)
  5. Handover (QR code + Handover Ref + confirmation status)
  6. Ledger (Earnings summary, pending dues, formal EPR bonus line items)
- **Recycler Dashboard:**
  1. Login
  2. Incoming lots queue (view offers, lot details)
  3. Accept / Reject / Counter
  4. Scan QR / Confirm receipt

---

## 4. System Architecture

```text
[Collector App (Offline-First)]
       │  (Offline writes to Local DB + Sync Queue)
       ▼
[Sync Engine] ──(When Online)──► [FastAPI Backend] ──► [PostgreSQL / SQLite Database]
                                       │
                                [Matching Engine] (30% Dist, 30% Price, 25% Auth, 15% Pickup)
                                       │
                                [Recycler Web Dashboard] (Incoming lots, QR scan-to-confirm)
```

---

## 5. Data Model

- `material_categories`: category_id, category_name (PCB, Cables, LCD, CRT, Batteries), hazard_flag, icon_ref
- `collectors`: collector_id, phone_number, preferred_language, operating_area, trust_score, total_earned, pending_dues
- `recyclers`: recycler_id, name, facility_lat, facility_lng, address, registration_number, authorization_status, offered_rates, pickup_available, rating
- `lots`: lot_id, collector_id, category_id, description, approx_weight_kg, condition, estimated_value, status, collection_lat, collection_lng, created_at, synced_at
- `price_history`: price_id, category_id, location_code, recorded_at, price_min, price_max, unit
- `transactions`: transaction_id, lot_id, collector_id, recycler_id, quoted_price, final_price, quantity_kg, handover_ref, payment_status, payment_mode, status
- `traceability_records`: handover_ref (PK), lot_id, photos, weight_confirmed_kg, gps_lat, gps_lng, captured_at, recycler_confirmed, recycler_confirmed_at

---

## 6. API Contract

- `POST /api/auth/otp/request` & `POST /api/auth/otp/verify`
- `POST /api/lots` (Create lot / batch sync)
- `GET /api/lots/:id` & `GET /api/lots?collector_id=`
- `GET /api/prices?category=&location=`
- `GET /api/recyclers?lat=&lng=&category=`
- `POST /api/lots/:id/match` (Explainable weighted recycler ranking)
- `POST /api/lots/:id/handover` (Create traceability record)
- `POST /api/handover/:ref/confirm` (Recycler confirms receipt via QR scan)
- `GET /api/collectors/:id/ledger`
- `POST /api/sync/push` & `GET /api/sync/pull?since=`

---

## 7. AI/ML Design
- **Hero component:** On-device material classification (MobileNet / lightweight classifier for PCB, Cables, LCD, CRT, Battery) with instant fallback to manual icon grid.
- **Explainable ranking:** 30% Distance, 30% Price, 25% Authorization, 15% Pickup availability.
- **Explainable pricing:** Category-location historical average range.
