# ScrapSetu (स्क्रॅप सेतू)

> **Traceable, Offline-First Digital Bridge Connecting Informal E-Waste Collectors to Authorized Recyclers**  
> **Smart India Hackathon (SIH) | Problem Statement ID: 26229**  
> **Ministry:** Ministry of Mines (MoM) · **Department:** JNARDDC  
> **Theme:** Clean & Green Technology · **Category:** Software  

---

## 📌 Executive Summary

India generates over **2.2 million tonnes of e-waste annually** (3rd largest globally), yet over **82% leaks into informal processing channels** where toxic open-air burning and acid leaching cause severe health and environmental damage. While Extended Producer Responsibility (EPR) regulations mandate formal recycling, **the monetary value of EPR never reaches the grassroots informal collector (kabadiwala)**. 

Informal collectors sell to intermediary scrap dealers at suppressed prices because they lack:
1. Real-time visibility into fair market and authorized recycler rates.
2. Digital connectivity or English-text literacy at collection scrap points.
3. A verifiable mechanism to prove lot origin and capture EPR compliance bonuses.

**ScrapSetu bridges this gap.** It is a low-friction, vernacular, offline-first mobile and web platform that equips informal collectors with on-device AI material classification, spoken daily market rates, tamper-evident physical-digital lot tagging, and transparent matching with authorized recyclers passing through an **EPR Formal Bonus (+₹22/kg)** directly into the collector's ledger.

---

## 🎯 Key Differentiators & Judge Highlights

| Pillar | Industry Problem | ScrapSetu Implementation |
| :--- | :--- | :--- |
| **Connectivity** | Scrap yards and godowns frequently lack reliable 4G/5G data. | **100% Offline-First:** Local IndexedDB persistence with automatic sync queue when connectivity resumes. |
| **Accessibility** | Over 60% of informal collectors have low literacy or regional language constraints. | **Voice & Vernacular First:** Full Marathi, Hindi, and English support with one-tap text-to-speech (*"बोलो भाव"* audio rate reader). |
| **Material ID** | Collectors misclassify valuable circuit boards or hazardous batteries. | **On-Device Computer Vision:** Client-side canvas classifier (<50ms latency) identifying PCB, Cables, LCD, CRT, and Batteries without cloud dependencies. |
| **Traceability** | Recyclers struggle to audit informal lot provenance for CPCB compliance. | **Physical-Digital Handover Tag:** Unique QR code + 6-character short code attached to the physical sack, scanned and verified on recycler weighbridge. |
| **Economic Incentive** | Middlemen skim 40–60% margins; EPR credits stay with big players. | **EPR Pass-Through Bonus:** Recyclers pass compliance credits directly to the worker's ledger upon digital receipt verification. |
| **Matching Algorithm** | Informal collectors lack transparent buyer discovery. | **Explainable Weighted Engine:** 30% Distance + 30% Price + 25% Authorization + 15% Doorstep Pickup availability. |

---

## 🔄 Core End-to-End Workflow

```
[ INFORMAL COLLECTOR ]                     [ PHYSICAL SCRAP LOT ]               [ AUTHORIZED RECYCLER ]
          │                                           │                                    │
 1. Open Collector App (Offline)                      │                                    │
          │                                           │                                    │
 2. On-Device AI Photo Classification                 │                                    │
    (Identifies PCB / Cables / LCD / CRT)             │                                    │
          │                                           │                                    │
 3. Input Approx Weight (Slider)                      │                                    │
    └── Calculates Estimated Fair Value               │                                    │
          │                                           │                                    │
 4. Run Weighted Recycler Match                       │                                    │
    └── Selects Verified Nearby Facility              │                                    │
          │                                           │                                    │
 5. Generate Handover Tag ────────────────────► [ Attach QR Tag / ]                        │
    (e.g., SS-4A82F1)                           [ Short Code to Bag]                       │
          │                                           │                                    │
          │                                           └──────────────────────────► 6. Scan QR at Facility
          │                                                                                │
          │                                                                        7. Weigh on Scale & Confirm
          │                                                                                │
 8. Digital Receipt & Bonus ◄──────────────────────────────────────────────────────┴── Confirmed Transaction
    (Material Value + ₹22/kg EPR Bonus)                                                (CPCB Audit Record Created)
          │
 9. Ledger Updated & Auto-Synced
```

---

## 🛠️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 SCRAPSETU ARCHITECTURE                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────┐       ┌────────────────────────────────────┐
  │         Collector Mobile App            │       │      Recycler Web Dashboard        │
  │     (Android PWA / Mobile Web)          │       │    (Facility Weighbridge Portal)   │
  │  - Marathi / Hindi / English UI         │       │  - Incoming Verified Lots Queue    │
  │  - Web Speech TTS Audio Price Board     │       │  - Optical QR Code Scanner         │
  │  - On-Device Canvas Material Classifier │       │  - Weight Verification & Acceptance│
  │  - Offline IndexedDB Local Store        │       │  - Audit-Ready CPCB Batch Export   │
  └────────────────────┬────────────────────┘       └─────────────────┬──────────────────┘
                       │                                              │
                       │ (JSON Payloads / Offline Sync Queue)         │ (HTTP REST / WebSocket)
                       ▼                                              ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │                         FastAPI High-Performance Core API                            │
  │                                                                                      │
  │   ├── /api/auth          : Zero-friction phone OTP simulation & token issuance       │
  │   ├── /api/categories    : E-waste material classifications and hazard metadata      │
  │   ├── /api/prices        : Real-time MPCB benchmark prices and market trends         │
  │   ├── /api/lots          : Lot creation, state machine, and status updates           │
  │   ├── /api/lots/:id/match: Explainable multi-factor recycler ranking engine          │
  │   ├── /api/handover      : Tamper-evident handover tag generation and QR dispatch    │
  │   ├── /api/collectors    : Worker digital ledger, lifetime earnings, and EPR bonuses │
  │   └── /api/sync          : Differential batch synchronization (Push / Pull)          │
  └──────────────────────────────────────────┬───────────────────────────────────────────┘
                                             │
                                             ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │                    Relational Data Layer (SQLite / PostgreSQL)                       │
  │   - collectors  - recyclers  - lots  - price_history  - transactions  - sync_queue  │
  └──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 30-Second Quick Start for Judges

ScrapSetu is engineered to run out-of-the-box in two evaluation modes:

### Mode 1: Dual Interactive Demo Portal (Zero Setup)
No terminal or server commands needed. Simply open the portal in any modern browser:

1. Clone or download the repository.
2. Double-click `index.html` in your file explorer.
3. You will see the **Dual Interactive Portal**:
   - **Left Panel:** The Collector Mobile App running in a responsive mobile frame.
   - **Right Panel:** The Authorized Recycler Dashboard.
   - Both panels synchronize state, language switching (Marathi, Hindi, English), and simulated QR code scans live.

### Mode 2: Full-Stack Production Mode (FastAPI + PWA)
Run the native Python backend to test live REST endpoints and database persistence:

```bash
# 1. Install dependencies
pip install fastapi uvicorn pydantic sqlalchemy httpx

# 2. Start the ScrapSetu Platform
# On Windows, simply double-click start.bat, or run:
python -m uvicorn services.core_api.main:app --host 127.0.0.1 --port 8000 --reload
```

Once started, open:
- **Interactive Dual Demo Portal:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Collector Mobile App:** [http://127.0.0.1:8000/collector/](http://127.0.0.1:8000/collector/)
- **Authorized Recycler Dashboard:** [http://127.0.0.1:8000/recycler/](http://127.0.0.1:8000/recycler/)
- **Interactive Swagger API Documentation:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

To gracefully stop the server on Windows, run `stop.bat`.

---

## 🔬 Step-by-Step Judge Evaluation Script

Follow this 5-step test script to evaluate the core loop:

1. **Test Vernacular & Voice Accessibility:**
   - In the Collector view, switch the language toggle to **मराठी** or **हिंदी**.
   - Click the **"आजचे भाव ऐका (बोलो भाव)"** button to hear the synthesized speech reading today's e-waste rates.
2. **Simulate Offline Lot Creation:**
   - Click the **"Live Online"** button at the top of the Collector screen to switch into **"Offline Mode"**.
   - Tap **"नवीन माल जोडा (Create Lot)"**.
   - Upload any sample hardware image: the on-device canvas classifier immediately detects the category (e.g., PCB Motherboards) and sets confidence.
   - Adjust the weight slider (e.g., 5.0 kg). Notice the real-time valuation updates instantly from local memory.
3. **Execute Explainable Recycler Matching:**
   - Click **"रिसायकलर शोधा (Find Matches)"**.
   - Observe the explainable rank breakdown displaying distance, rate, authorization license status, and doorstep pickup.
4. **Inspect Physical Handover Tag:**
   - Select the top-ranked recycler.
   - The app generates a verifiable handover tag with QR payload (`SCRAP-SETU|REF:SS-XXXXXX|...`) and human-readable ref code.
5. **Recycler Verification & EPR Bonus Confirmation:**
   - On the Recycler Dashboard (right panel), inspect the **Incoming Lots Queue**.
   - Click **"Scan Handover QR"** and confirm receipt with scale-verified weight.
   - Watch the Collector Ledger immediately receive both base material payment and the dedicated **Formal EPR Bonus (+₹22/kg)**.

---

## 📡 API Contract Overview

All endpoints are self-documenting via OpenAPI at `/docs`. Core endpoints include:

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health check and API version status. |
| `GET` | `/api/categories` | Returns supported material classes and hazard indicators. |
| `GET` | `/api/prices` | Real-time market rate board with 7-day trend history. |
| `POST` | `/api/lots` | Creates a new e-waste lot (supports offline client ID sync). |
| `POST` | `/api/lots/{lot_id}/match` | Runs the 4-factor explainable matching algorithm. |
| `POST` | `/api/lots/{lot_id}/handover` | Generates a traceable handover reference and QR payload. |
| `POST` | `/api/handover/{ref}/confirm` | Recycler confirms receipt, calculates EPR bonus, closes lot. |
| `GET` | `/api/collectors/{id}/ledger` | Fetches collector earnings summary, dues, and transaction log. |
| `POST` | `/api/sync/push` | Ingests offline-created lots and handovers queued on devices. |
| `GET` | `/api/sync/pull` | Fetches updated server records for client database reconciliation. |

---

## 🧪 Automated Test Verification

ScrapSetu includes automated unit and integration tests validating the full core loop:

```bash
# Execute core lifecycle verification test
python tests/test_api.py
```

### Verified Test Run Output:
```text
Categories seeded: 5
Prices seeded: 5
Created lot: e92fab93-2963-4182-823c-66958df89279, Estimated Value: INR 1575.0
Matches found: 4, Top match: EcoRecycle Hub Hadapsar (Score: 89.8)
Handover initiated. Ref: KC-324646, QR payload: SCRAP-SETU|REF:KC-324646|...
Handover confirmed! Final price: INR 1785.0, Formal EPR bonus: INR 110.0
Collector Ledger: Total Earned: INR 6635.0, Transactions count: 3
Sync push result: {'status': 'synced', 'synced_lots_count': 1}
Sync pull returned lots: 4
=============================================
>>> ALL PHASE 1 CORE LOOP TESTS PASSED 100%! <<<
=============================================
```

---

## 🌍 Measurable Impact & UN Sustainable Development Goals

* **Income Elevation (+20% to +35%):** Eliminates 2 to 3 tiers of predatory middlemen; channels EPR bonus directly to the bottom of the pyramid.
* **Informal Sector Formalization:** Converts anonymous cash transactions into traceable digital proof of safe disposal for CPCB audits.
* **Toxic Exposure Mitigation:** Enforces safety hazard flags on CRT glass (lead) and lithium-ion cells, disincentivizing hazardous open burning.
* **Targeted SDGs:**
  - **SDG 8:** Decent Work and Economic Growth (safer working conditions & fair wages).
  - **SDG 11:** Sustainable Cities and Communities (circular municipal waste diversion).
  - **SDG 12:** Responsible Consumption and Production (closed-loop resource recovery).
  - **SDG 13:** Climate Action (reduces toxic greenhouse emissions from open burning).

---

## 👥 Project Team & Submission Details

* **Hackathon:** Smart India Hackathon (SIH)
* **Problem Statement:** 26229 (Ministry of Mines / JNARDDC)
* **Project Name:** ScrapSetu (स्क्रॅप सेतू)
* **Repository:** Public Open Source under MIT License
