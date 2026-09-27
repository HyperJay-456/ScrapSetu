from fastapi.testclient import TestClient
from services.core_api.main import app

def test_full_core_loop():
    client = TestClient(app)

    # 1. Health check
    res = client.get('/api/health')
    assert res.status_code == 200, res.text

    # 2. Categories
    cats = client.get('/api/categories').json()
    print('Categories seeded:', len(cats))
    assert len(cats) >= 5

    # 3. Prices
    prices = client.get('/api/prices').json()
    print('Prices seeded:', len(prices))
    assert len(prices) >= 5

    # 4. Create Lot
    lot_res = client.post('/api/lots', json={
        'category_id': 1,
        'approx_weight_kg': 5.0,
        'description': 'Test PCB Motherboards',
        'condition': 'intact',
        'source_type': 'repair_shop'
    })
    assert lot_res.status_code == 200, lot_res.text
    lot = lot_res.json()
    lot_id = lot['lot_id']
    print(f"Created lot: {lot_id}, Estimated Value: INR {lot['estimated_value']}")

    # 5. Matching Recyclers
    match_res = client.post(f'/api/lots/{lot_id}/match')
    assert match_res.status_code == 200, match_res.text
    matches = match_res.json()
    print(f"Matches found: {len(matches)}, Top match: {matches[0]['recycler']['name']} (Score: {matches[0]['total_score']})")
    assert len(matches) > 0
    chosen_recycler = matches[0]['recycler']['recycler_id']

    # 6. Handover Initiation
    ho_res = client.post(f'/api/lots/{lot_id}/handover', json={
        'lot_id': lot_id,
        'recycler_id': chosen_recycler
    })
    assert ho_res.status_code == 200, ho_res.text
    ho = ho_res.json()
    handover_ref = ho['handover_ref']
    print(f"Handover initiated. Ref: {handover_ref}, QR payload: {ho['qr_payload']}")

    # 7. Recycler Scans QR & Confirms Receipt
    confirm_res = client.post(f'/api/handover/{handover_ref}/confirm', json={
        'handover_ref': handover_ref,
        'weight_confirmed_kg': 5.0,
        'payment_mode': 'cash'
    })
    assert confirm_res.status_code == 200, confirm_res.text
    conf = confirm_res.json()
    print(f"Handover confirmed! Final price: INR {conf['final_price']}, Formal EPR bonus: INR {conf['formal_bonus']}")

    # 8. Check Collector Ledger
    ledger_res = client.get('/api/collectors/col-ramesh-01/ledger')
    assert ledger_res.status_code == 200, ledger_res.text
    ledger = ledger_res.json()
    print(f"Collector Ledger: Total Earned: INR {ledger['total_earned']}, Transactions count: {len(ledger['transactions'])}")

    # 9. Sync Push & Pull
    push_res = client.post('/api/sync/push', json={
        'collector_id': 'col-ramesh-01',
        'lots': [{
            'lot_id': 'offline-lot-999',
            'category_id': 2,
            'approx_weight_kg': 3.5,
            'description': 'Offline copper wires',
            'status': 'draft'
        }],
        'handover_records': []
    })
    assert push_res.status_code == 200, push_res.text
    print('Sync push result:', push_res.json())

    pull_res = client.get('/api/sync/pull')
    assert pull_res.status_code == 200, pull_res.text
    print('Sync pull returned lots:', len(pull_res.json()['updated_lots']))

    print('=============================================')
    print('>>> ALL PHASE 1 CORE LOOP TESTS PASSED 100%! <<<')
    print('=============================================')

if __name__ == '__main__':
    test_full_core_loop()
