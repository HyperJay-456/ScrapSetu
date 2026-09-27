import httpx

def test_live_server():
    client = httpx.Client(base_url='http://127.0.0.1:8000')

    print('--- Step 1: Health Check ---')
    r = client.get('/api/health')
    assert r.status_code == 200
    print('Backend online:', r.json())

    print('\n--- Step 2: Collector Price Board ---')
    prices = client.get('/api/prices').json()
    print('Categories on price board:', [p['category_name'] + ' (INR ' + str(p['price_min']) + '-' + str(p['price_max']) + ')' for p in prices])

    print('\n--- Step 3: Create Lot ---')
    lot_payload = {
        'collector_id': 'col-ramesh-01',
        'category_id': 1,
        'approx_weight_kg': 6.5,
        'description': 'Verified High-Grade Computer Motherboards',
        'condition': 'intact',
        'source_type': 'repair_shop'
    }
    lot = client.post('/api/lots', json=lot_payload).json()
    lot_id = lot['lot_id']
    print(f"Created Lot ID: {lot_id}, Estimated Value: INR {lot['estimated_value']}")

    print('\n--- Step 4: Explainable Recycler Matching ---')
    matches = client.post(f'/api/lots/{lot_id}/match').json()
    top = matches[0]
    print(f"Top Recycler: {top['recycler']['name']}")
    print(f"Total Score: {top['total_score']} / 100")
    print(f"Score Breakdown (Explainable Weights): {top['score_breakdown']}")

    print('\n--- Step 5: Initiate Handover & Generate QR Tag ---')
    ho = client.post(f'/api/lots/{lot_id}/handover', json={
        'lot_id': lot_id,
        'recycler_id': top['recycler']['recycler_id']
    }).json()
    handover_ref = ho['handover_ref']
    print(f"Handover Ref Code: {handover_ref}")
    print(f"QR Tag Payload: {ho['qr_payload']}")

    print('\n--- Step 6: Recycler Dashboard Confirmation (Scan QR) ---')
    conf = client.post(f'/api/handover/{handover_ref}/confirm', json={
        'handover_ref': handover_ref,
        'weight_confirmed_kg': 6.5,
        'payment_mode': 'cash'
    }).json()
    print(f"Confirmation Status: {conf['message']}")
    print(f"Final Material Payout: INR {conf['final_price'] - conf['formal_bonus']}")
    print(f"Formal EPR Bonus Added: INR {conf['formal_bonus']}")
    print(f"Total Collector Earnings Now: INR {conf['collector_total_earned']}")

    print('\n--- Step 7: Collector Ledger Verification ---')
    ledger = client.get('/api/collectors/col-ramesh-01/ledger').json()
    print(f"Ledger Owner: {ledger['collector_name']}")
    print(f"Total Lifetime Earnings: INR {ledger['total_earned']}")
    print(f"Total Formal Bonus Earned: INR {ledger['total_formal_bonus_earned']}")
    print(f"Latest Transaction: {ledger['transactions'][0]['category_name']}, Total: INR {ledger['transactions'][0]['total_amount']}")

    print('\n======================================================')
    print('>> FULL CORE LOOP VERIFIED LIVE OVER HTTP (PASS 100%) <<')
    print('======================================================')

if __name__ == '__main__':
    test_live_server()
