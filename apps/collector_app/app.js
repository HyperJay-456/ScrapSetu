/**
 * ScrapSetu — Collector App Core Logic
 * Fully Offline-First, Vernacular, Low-Literacy Optimized
 */

const API_BASE = window.location.origin.includes('8000') 
  ? window.location.origin 
  : 'http://127.0.0.1:8000';

const CATEGORY_TRANSLATIONS = {
  1: {
    mr: { name: 'पीसीबी (PCB)', sub: 'मदरबोर्ड व सर्किट बोर्ड' },
    hi: { name: 'पीसीबी (PCB)', sub: 'मदरबोर्ड और सर्किट बोर्ड' },
    en: { name: 'PCB (Circuit Boards)', sub: 'Motherboards & High-Grade Boards' }
  },
  2: {
    mr: { name: 'केबल्स (Cables)', sub: 'तांब्याची व वायरिंग केबल' },
    hi: { name: 'केबल्स (Cables)', sub: 'तांबे की वायरिंग व केबल' },
    en: { name: 'Cables (Wiring)', sub: 'Insulated & Bare Copper Wires' }
  },
  3: {
    mr: { name: 'एलसीडी (LCD)', sub: 'स्क्रीन व फ्लॅट डिस्प्ले' },
    hi: { name: 'एलसीडी (LCD)', sub: 'स्क्रीन व फ्लैट डिस्प्ले' },
    en: { name: 'LCD (Displays)', sub: 'Flat Screen Panels & Monitors' }
  },
  4: {
    mr: { name: 'सीआरटी (CRT)', sub: 'जुना टीव्ही काच (धोकादायक)' },
    hi: { name: 'सीआरटी (CRT)', sub: 'पुराना टीवी कांच (खतरनाक)' },
    en: { name: 'CRT (Monitors)', sub: 'Cathode Ray Tubes (Hazardous)' }
  },
  5: {
    mr: { name: 'बॅटऱ्या (Batteries)', sub: 'लिथियम व लीड सेल (धोकादायक)' },
    hi: { name: 'बैटरी (Batteries)', sub: 'लिथियम व लेड सेल (खतरनाक)' },
    en: { name: 'Batteries', sub: 'Li-ion & Lead Acid (Hazardous)' }
  }
};

const I18N = {
  mr: {
    langLabel: 'मराठी',
    brandName: 'स्क्रॅप<span>सेतू</span>',
    networkOnline: 'थेट चालू (Online)',
    networkOffline: 'ऑफलाइन मोड (Offline)',
    greeting: 'नमस्ते, रमेश भाऊ 👋',
    greetingSub: 'पुणे • थेट अधिकृत बाजारभाव',
    heroTag: 'कचऱ्याला द्या योग्य भाव, थेट अधिकृत रिसायकलरशी जोडा.',
    totalEarned: 'एकूण कमाई',
    pendingDues: 'येणे बाकी',
    speakRates: 'आजचे भाव ऐका (बोलो भाव)',
    priceBoardTitle: 'आजचे ई-कचरा दर (प्रती किलो)',
    priceSource: 'अधिकृत MPCB दर',
    btnCreateLot: 'नवीन माल जोडा (Create Lot)',
    createLotTitle: 'नवीन मालाची नोंद करा',
    photoPrompt: 'फोटो काढा किंवा निवडा',
    photoSub: 'AI कॅमेरा मालाचा प्रकार आपोआप ओळखेल (Offline Ready)',
    aiRecognized: '🤖 AI ओळख (On-Device Model)',
    accuracy: 'अचूक',
    aiIncorrectHint: 'बरोबर नसल्यास खालील पर्यायांमधून योग्य प्रकार निवडा:',
    selectCat: 'प्रकार निवडा:',
    weightLabel: 'अंदाजे वजन (Approx Weight):',
    weightUnit: 'किलो (kg)',
    estValueLabel: 'अंदाजे सरकारी/बाजार किंमत',
    estSubLabel: 'स्थानिक अधिकृत दरावर आधारित',
    btnFindRecycler: 'रिसायकलर शोधा (Find Matches)',
    matchesTitle: 'अधिकृत रिसायकलर शिफारसी',
    matchesDesc: 'पारदर्शक मूल्यांकन: ३०% अंतर + ३०% दर + २५% परवाना + १५% पिकअप',
    topPickBadge: '★ शिफारस (Top Match)',
    authorizedTag: '✓ अधिकृत परवाना (Authorized)',
    distTag: 'अंतर',
    rateTag: 'दर',
    authTag: 'परवाना',
    pickupTag: 'पिकअप',
    pickupAvail: 'पिकअप उपलब्ध',
    pickupDrop: 'ड्रॉप पॉइंट',
    estTotalPayout: 'अंदाजे एकूण रक्कम:',
    btnSelectRec: 'निवडा (Select) →',
    handoverTitle: 'हस्तांतरण QR कोड व संदर्भ',
    handoverSub: 'हा QR कोड किंवा संदर्भ क्रमांक तुमच्या पोत्यावर/मालावर चिकटवा.',
    refLabel: 'हस्तांतरण संदर्भ (REF CODE)',
    selectedRecLabel: 'निवडलेला रिसायकलर:',
    weightCatLabel: 'वजन व प्रकार:',
    gpsLabel: 'GPS स्थान:',
    waitingConfirm: 'रिसायकलरच्या स्कॅनची वाट पाहत आहे...',
    btnSimulateScan: '⚡ रिसायकलर स्कॅन डेमो (Confirm)',
    confirmedBanner: 'व्यवहार पूर्ण! मिळालेले पैसे:',
    bonusLabel: 'बोनस:',
    ledgerTitle: 'कमाई खाते व व्यवहार वही (Ledger)',
    totalEarnedTitle: 'एकूण मिळालेले पैसे',
    pendingTitle: 'जमा होणे बाकी (Pending)',
    bonusIncludedTag: 'फॉर्मल EPR बोनस समाविष्ट',
    pendingVerificationNote: '१ व्यवहार पडताळणीत',
    txHistory: 'व्यवहार इतिहास (Transactions)',
    paidTag: '✓ मिळाले (Paid)',
    pendingTag: '⏳ जमा होणे बाकी',
    navHome: 'भाव (Home)',
    navCreate: 'नवीन माल',
    navLedger: 'खाते (Ledger)',
    offlineMsg: 'इंटरनेट बंद आहे. माल स्थानिक मेमरीमध्ये सुरक्षित साठवला जात आहे.',
    onlineMsg: 'इंटरनेट चालू झाले. डेटा सर्व्हरशी सिंक झाला!',
    speechRates: 'आजचे ई-कचरा दर: पीसीबी ३१५ रुपये किलो, केबल्स ४१० रुपये किलो, एलसीडी ११५ रुपये किलो, बॅटरीज १०५ रुपये किलो.'
  },
  hi: {
    langLabel: 'हिंदी',
    brandName: 'स्क्रैप<span>सेतु</span>',
    networkOnline: 'लाइव चालू (Online)',
    networkOffline: 'ऑफ़लाइन मोड (Offline)',
    greeting: 'नमस्ते, रमेश जी 👋',
    greetingSub: 'पुणे • सीधे अधिकृत बाजार भाव',
    heroTag: 'कचरे का सही दाम पाएं, सीधे अधिकृत रीसाइक्लर से जुड़ें।',
    totalEarned: 'कुल कमाई',
    pendingDues: 'बकाया राशि',
    speakRates: 'आज के भाव सुनें (बोलो भाव)',
    priceBoardTitle: 'आज के ई-कचरा दर (प्रति किलो)',
    priceSource: 'अधिकृत MPCB दरें',
    btnCreateLot: 'नया माल जोड़ें (Create Lot)',
    createLotTitle: 'नए माल का विवरण भरें',
    photoPrompt: 'फोटो खींचें या चुनें',
    photoSub: 'AI कैमरा माल को तुरंत पहचानेगा (Offline Ready)',
    aiRecognized: '🤖 AI पहचान (On-Device Model)',
    accuracy: 'सटीकता',
    aiIncorrectHint: 'गलत होने पर नीचे से सही प्रकार चुनें:',
    selectCat: 'सामग्री प्रकार चुनें:',
    weightLabel: 'अनुमानित वजन (Approx Weight):',
    weightUnit: 'किलो (kg)',
    estValueLabel: 'अनुमानित सरकारी/बाजार भाव',
    estSubLabel: 'स्थानीय अधिकृत दरों पर आधारित',
    btnFindRecycler: 'रीसाइक्लर खोजें (Find Matches)',
    matchesTitle: 'अधिकृत रीसाइक्लर सुझाव',
    matchesDesc: 'पारदर्शी स्कोर: 30% दूरी + 30% भाव + 25% लाइसेंस + 15% पिकअप',
    topPickBadge: '★ शीर्ष सुझाव (Top Pick)',
    authorizedTag: '✓ अधिकृत लाइसेंस (Authorized)',
    distTag: 'दूरी',
    rateTag: 'भाव',
    authTag: 'लाइसेंस',
    pickupTag: 'पिकअप',
    pickupAvail: 'पिकअप उपलब्ध',
    pickupDrop: 'ड्रॉप पॉइंट',
    estTotalPayout: 'अनुमानित कुल राशि:',
    btnSelectRec: 'चुनें (Select) →',
    handoverTitle: 'हस्तांतरण QR कोड और संदर्भ',
    handoverSub: 'यह QR कोड या संदर्भ संख्या अपनी बोरी/माल पर लगाएं।',
    refLabel: 'हस्तांतरण संदर्भ (REF CODE)',
    selectedRecLabel: 'चयनित रीसाइक्लर:',
    weightCatLabel: 'वजन और प्रकार:',
    gpsLabel: 'GPS स्थान:',
    waitingConfirm: 'रीसाइक्लर द्वारा स्कैन की प्रतीक्षा है...',
    btnSimulateScan: '⚡ रीसाइक्लर स्कैन डेमो (Confirm)',
    confirmedBanner: 'लेन-देन सफल! प्राप्त राशि:',
    bonusLabel: 'बोनस:',
    ledgerTitle: 'कमाई खाता और बहीखाता (Ledger)',
    totalEarnedTitle: 'कुल प्राप्त राशि',
    pendingTitle: 'बकाया राशि (Pending)',
    bonusIncludedTag: 'फॉर्मल EPR बोनस शामिल',
    pendingVerificationNote: '1 लेन-देन सत्यापन में',
    txHistory: 'लेन-देन इतिहास (Transactions)',
    paidTag: '✓ प्राप्त (Paid)',
    pendingTag: '⏳ लंबित (Pending)',
    navHome: 'भाव (Home)',
    navCreate: 'नया माल',
    navLedger: 'खाता (Ledger)',
    offlineMsg: 'इंटरनेट बंद है। माल डिवाइस में सुरक्षित रूप से दर्ज हो रहा है।',
    onlineMsg: 'इंटरनेट बहाल हुआ। डेटा सर्वर से सिंक हो गया!',
    speechRates: 'आज के ई-कचरा भाव: पीसीबी 315 रुपये किलो, केबल्स 410 रुपये किलो, एलसीडी 115 रुपये किलो, बैटरीज 105 रुपये किलो।'
  },
  en: {
    langLabel: 'English',
    brandName: 'Scrap<span>Setu</span>',
    networkOnline: 'Live Online',
    networkOffline: 'Offline Mode',
    greeting: 'Hello, Ramesh 👋',
    greetingSub: 'Pune • Live Authorized Market Rates',
    heroTag: 'Get transparent rates for e-waste, connect directly to authorized recyclers.',
    totalEarned: 'Total Earned',
    pendingDues: 'Pending Dues',
    speakRates: 'Listen to Today\'s Rates (Voice)',
    priceBoardTitle: 'Today\'s E-Waste Rates (Per KG)',
    priceSource: 'Authorized MPCB Rates',
    btnCreateLot: 'Add Material (Create Lot)',
    createLotTitle: 'Register New E-Waste Lot',
    photoPrompt: 'Take Photo or Choose File',
    photoSub: 'On-device AI automatically classifies material (Offline Ready)',
    aiRecognized: '🤖 AI Classification (On-Device Model)',
    accuracy: 'Accuracy',
    aiIncorrectHint: 'If incorrect, select the correct category below:',
    selectCat: 'Select Category:',
    weightLabel: 'Estimated Weight (kg):',
    weightUnit: 'kg',
    estValueLabel: 'Estimated Fair Market Value',
    estSubLabel: 'Based on current authorized rates',
    btnFindRecycler: 'Find Recycler Matches',
    matchesTitle: 'Verified Recycler Matches',
    matchesDesc: 'Transparent Rank: 30% Distance + 30% Price + 25% License + 15% Pickup',
    topPickBadge: '★ Top Match',
    authorizedTag: '✓ MPCB Authorized',
    distTag: 'Distance',
    rateTag: 'Rate',
    authTag: 'License',
    pickupTag: 'Pickup',
    pickupAvail: 'Doorstep Pickup',
    pickupDrop: 'Drop-off Point',
    estTotalPayout: 'Estimated Payout:',
    btnSelectRec: 'Select Recycler →',
    handoverTitle: 'Handover QR Code & Ref',
    handoverSub: 'Attach this QR tag or code to your material bag/bundle.',
    refLabel: 'HANDOVER REF CODE',
    selectedRecLabel: 'Selected Recycler:',
    weightCatLabel: 'Weight & Category:',
    gpsLabel: 'GPS Coordinates:',
    waitingConfirm: 'Waiting for recycler scan confirmation...',
    btnSimulateScan: '⚡ Simulate Recycler Scan',
    confirmedBanner: 'Transaction Confirmed! Total Paid:',
    bonusLabel: 'Bonus:',
    ledgerTitle: 'Earnings Ledger & History',
    totalEarnedTitle: 'Total Amount Earned',
    pendingTitle: 'Pending Payment Dues',
    bonusIncludedTag: 'Formal EPR Bonus Included',
    pendingVerificationNote: '1 transaction in verification',
    txHistory: 'Transaction History',
    paidTag: '✓ Paid',
    pendingTag: '⏳ Pending Payment',
    navHome: 'Prices (Home)',
    navCreate: 'Add Lot',
    navLedger: 'Ledger',
    offlineMsg: 'Offline mode active. Lots saved securely to local SQLite/IndexedDB.',
    onlineMsg: 'Online connected. Local queue synced with backend!',
    speechRates: 'Today\'s rates: PCB 315 rupees per kilo, Cables 410 rupees per kilo, LCD 115 rupees per kilo, Batteries 105 rupees per kilo.'
  }
};

// Fallback rates & recyclers when 100% offline
const DEFAULT_PRICES = [
  { category_id: 1, category_name: 'PCB', icon_ref: '💻', price_min: 280, price_max: 350, avg: 315, trend: 'up', change_pct: 4.2 },
  { category_id: 2, category_name: 'Cables', icon_ref: '🔌', price_min: 380, price_max: 440, avg: 410, trend: 'up', change_pct: 2.8 },
  { category_id: 3, category_name: 'LCD', icon_ref: '🖥️', price_min: 90, price_max: 140, avg: 115, trend: 'stable', change_pct: 0.0 },
  { category_id: 4, category_name: 'CRT', icon_ref: '📺', price_min: 40, price_max: 65, avg: 52, trend: 'down', change_pct: -1.5, hazard_flag: true },
  { category_id: 5, category_name: 'Batteries', icon_ref: '🔋', price_min: 85, price_max: 130, avg: 105, trend: 'up', change_pct: 3.1, hazard_flag: true }
];

const DEFAULT_RECYCLERS = [
  {
    recycler_id: 'rec-pune-01',
    name: 'EcoRecycle Hub Hadapsar',
    facility_lat: 18.5089,
    facility_lng: 73.9259,
    authorization_status: 'authorized',
    pickup_available: true,
    offered_rates: { "1": 335, "2": 425, "3": 120, "4": 55, "5": 110 }
  },
  {
    recycler_id: 'rec-pune-02',
    name: 'Mahasiddhi E-Waste Pimpri',
    facility_lat: 18.6298,
    facility_lng: 73.7997,
    authorization_status: 'authorized',
    pickup_available: true,
    offered_rates: { "1": 345, "2": 415, "3": 115 }
  },
  {
    recycler_id: 'rec-pune-03',
    name: 'Chakan Green Recovery',
    facility_lat: 18.7606,
    facility_lng: 73.8636,
    authorization_status: 'authorized',
    pickup_available: false,
    offered_rates: { "1": 350, "2": 435, "3": 130, "4": 60, "5": 125 }
  }
];

class CollectorApp {
  constructor() {
    this.currentLang = localStorage.getItem('kc_preferred_lang') || 'mr';
    this.isOnline = true;
    this.activeScreen = 'screen-home';
    this.prices = DEFAULT_PRICES;
    this.recyclers = DEFAULT_RECYCLERS;

    // Current working lot draft
    this.currentLot = {
      lot_id: null,
      category_id: 1,
      category_name: 'PCB',
      approx_weight_kg: 5.0,
      estimated_value: 1575.0,
      photoData: null,
      matched_recycler: null,
      handover_ref: null
    };

    // User ledger summary
    this.ledger = {
      total_earned: 4850.0,
      pending_dues: 1240.0,
      transactions: []
    };
  }

  async init() {
    await LocalStore.init();
    this.bindEvents();
    this.applyLanguage(this.currentLang);
    await this.refreshData();
    this.renderPriceBoard();
    this.renderLedger();
  }

  bindEvents() {
    // Top Bar Offline/Online Toggle
    const netBtn = document.getElementById('networkToggleBtn');
    if (netBtn) {
      netBtn.addEventListener('click', () => this.toggleNetworkState());
    }

    // Language Button
    const langBtn = document.getElementById('langSelectBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.switchScreen('screen-language'));
    }

    // Language Confirmation Button
    const confirmLangBtn = document.getElementById('btnConfirmLang');
    if (confirmLangBtn) {
      confirmLangBtn.addEventListener('click', () => {
        this.switchScreen('screen-home');
      });
    }

    // Language selection cards
    document.querySelectorAll('.lang-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.lang-card-btn').forEach(b => {
          b.classList.remove('selected');
          const checkSpan = b.querySelector('span:last-child');
          if (checkSpan) checkSpan.textContent = '';
        });
        const target = e.currentTarget;
        target.classList.add('selected');
        const checkSpan = target.querySelector('span:last-child');
        if (checkSpan) checkSpan.textContent = '✓';
        const lang = target.getAttribute('data-lang');
        this.applyLanguage(lang);
      });
    });

    // Voice "बोलो भाव" Speech
    const speakBtn = document.getElementById('btnSpeakPrices');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => this.speakPrices());
    }

    // Navigation Buttons
    document.querySelectorAll('.b-nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetScreen = e.currentTarget.getAttribute('data-target');
        this.switchScreen(targetScreen);
      });
    });

    // Quick Add Lot Button on Home
    const btnGoCreate = document.getElementById('btnGoToCreateLot');
    if (btnGoCreate) {
      btnGoCreate.addEventListener('click', () => this.switchScreen('screen-create'));
    }

    const btnCancelCreate = document.getElementById('btnCancelCreate');
    if (btnCancelCreate) {
      btnCancelCreate.addEventListener('click', () => this.switchScreen('screen-home'));
    }

    // Camera Box & File Upload
    const cameraBox = document.getElementById('cameraDropBox');
    const cameraInput = document.getElementById('cameraFileInput');
    if (cameraBox && cameraInput) {
      cameraBox.addEventListener('click', () => cameraInput.click());
      cameraInput.addEventListener('change', (e) => this.handleImageCaptured(e));
    }

    // Manual Category Buttons
    document.querySelectorAll('.cat-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-select-btn').forEach(b => b.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const catId = parseInt(target.getAttribute('data-id'), 10);
        this.selectCategory(catId);
      });
    });

    // Weight Stepper & Slider
    const weightSlider = document.getElementById('weightSlider');
    const btnPlus = document.getElementById('btnWeightPlus');
    const btnMinus = document.getElementById('btnWeightMinus');

    if (weightSlider) {
      weightSlider.addEventListener('input', (e) => {
        this.setWeight(parseFloat(e.target.value));
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        this.setWeight(this.currentLot.approx_weight_kg + 0.5);
      });
    }

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        this.setWeight(Math.max(0.5, this.currentLot.approx_weight_kg - 0.5));
      });
    }

    // Find Recycler Button
    const btnFindRec = document.getElementById('btnFindRecycler');
    if (btnFindRec) {
      btnFindRec.addEventListener('click', () => this.findRecyclerMatches());
    }

    // Manual Sync Button
    const btnSync = document.getElementById('btnManualSync');
    if (btnSync) {
      btnSync.addEventListener('click', () => this.syncOfflineQueue());
    }

    // Simulation / Quick Recycler Confirmation button
    const btnSim = document.getElementById('btnSimulateRecyclerScan');
    if (btnSim) {
      btnSim.addEventListener('click', () => this.simulateRecyclerConfirmation());
    }
  }

  switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.activeScreen = screenId;
    }

    document.querySelectorAll('.b-nav-item').forEach(b => {
      if (b.getAttribute('data-target') === screenId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(msg, duration = 2800) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, duration);
  }

  toggleNetworkState() {
    this.isOnline = !this.isOnline;
    const netBtn = document.getElementById('networkToggleBtn');
    const netLabel = document.getElementById('networkLabel');
    const texts = I18N[this.currentLang] || I18N.mr;

    if (this.isOnline) {
      netBtn.className = 'network-pill online';
      netLabel.textContent = texts.networkOnline;
      this.showToast(texts.onlineMsg);
      this.syncOfflineQueue();
    } else {
      netBtn.className = 'network-pill offline';
      netLabel.textContent = texts.networkOffline;
      this.showToast(texts.offlineMsg);
    }
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('kc_preferred_lang', lang);
    const texts = I18N[lang] || I18N.mr;

    const setTxt = (id, str) => {
      const el = document.getElementById(id);
      if (el) el.textContent = str;
    };

    setTxt('currentLangLabel', texts.langLabel);
    setTxt('networkLabel', this.isOnline ? texts.networkOnline : texts.networkOffline);
    setTxt('txtGreeting', texts.greeting);
    setTxt('txtGreetingSub', texts.greetingSub);
    setTxt('txtHeroTag', texts.heroTag);
    setTxt('lblTotalEarned', texts.totalEarned);
    setTxt('lblPendingDues', texts.pendingDues);
    setTxt('txtSpeakRates', texts.speakRates);
    setTxt('txtPriceBoardTitle', texts.priceBoardTitle);
    setTxt('txtPriceSource', texts.priceSource);
    setTxt('txtBtnCreateLot', texts.btnCreateLot);
    setTxt('txtCreateLotTitle', texts.createLotTitle);
    setTxt('txtPhotoPrompt', texts.photoPrompt);
    setTxt('txtPhotoSub', texts.photoSub);
    setTxt('aiCatNote', texts.aiIncorrectHint);
    setTxt('txtSelectCat', texts.selectCat);
    setTxt('txtWeightLabel', texts.weightLabel);
    setTxt('txtEstValueLabel', texts.estValueLabel);
    setTxt('txtEstSubLabel', texts.estSubLabel);
    setTxt('txtBtnFindRecycler', texts.btnFindRecycler);
    setTxt('txtMatchesTitle', texts.matchesTitle);
    setTxt('txtMatchesDesc', texts.matchesDesc);
    setTxt('txtHandoverTitle', texts.handoverTitle);
    setTxt('txtHandoverSub', texts.handoverSub);
    setTxt('txtWaitingConfirm', texts.waitingConfirm);
    setTxt('txtLedgerTitle', texts.ledgerTitle);
    setTxt('txtTotalEarnedTitle', texts.totalEarnedTitle);
    setTxt('txtPendingTitle', texts.pendingTitle);
    setTxt('txtTxHistory', texts.txHistory);

    setTxt('lblHandoverRefCode', texts.refLabel);
    setTxt('lblSelectedRec', texts.selectedRecLabel);
    setTxt('lblWeightCat', texts.weightCatLabel);
    setTxt('lblGpsLocation', texts.gpsLabel);
    setTxt('txtBtnSimulateScan', texts.btnSimulateScan);
    setTxt('bonusHighlightText', texts.bonusIncludedTag);
    setTxt('txtPendingSub', texts.pendingVerificationNote);
    setTxt('txtSyncBtnLabel', lang === 'mr' ? 'सिंक' : (lang === 'hi' ? 'सिंक' : 'Sync'));

    // Bottom Navigation Items
    setTxt('navHome', texts.navHome);
    setTxt('navCreate', texts.navCreate);
    setTxt('navLedger', texts.navLedger);

    // Update Category Selection Buttons on Create Screen
    document.querySelectorAll('.cat-select-btn').forEach(btn => {
      const catId = parseInt(btn.getAttribute('data-id'), 10);
      const catTrans = CATEGORY_TRANSLATIONS[catId]?.[lang] || CATEGORY_TRANSLATIONS[catId]?.mr;
      const labelEl = btn.querySelector('.cat-btn-label');
      if (labelEl && catTrans) {
        labelEl.textContent = catTrans.name;
      }
    });

    // Update active category text in currentLot
    const currentTrans = CATEGORY_TRANSLATIONS[this.currentLot.category_id]?.[lang];
    if (currentTrans) {
      this.currentLot.category_name = currentTrans.name;
    }

    // Update language selection buttons active state
    document.querySelectorAll('.lang-card-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('selected');
        const checkSpan = btn.querySelector('span:last-child');
        if (checkSpan) checkSpan.textContent = '✓';
      } else {
        btn.classList.remove('selected');
        const checkSpan = btn.querySelector('span:last-child');
        if (checkSpan) checkSpan.textContent = '';
      }
    });

    this.renderPriceBoard();
    this.renderLedger();
  }

  speakPrices() {
    if (!('speechSynthesis' in window)) {
      alert(I18N[this.currentLang].speechRates);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = I18N[this.currentLang].speechRates;
    const utter = new SpeechSynthesisUtterance(textToSpeak);

    if (this.currentLang === 'mr') utter.lang = 'mr-IN';
    else if (this.currentLang === 'hi') utter.lang = 'hi-IN';
    else utter.lang = 'en-IN';

    utter.rate = 0.92;
    window.speechSynthesis.speak(utter);
    this.showToast('🔊 ' + I18N[this.currentLang].speakRates);
  }

  async refreshData() {
    if (this.isOnline) {
      try {
        const pricesRes = await fetch(`${API_BASE}/api/prices`);
        if (pricesRes.ok) {
          this.prices = await pricesRes.json();
        }

        const recRes = await fetch(`${API_BASE}/api/recyclers`);
        if (recRes.ok) {
          this.recyclers = await recRes.json();
        }

        const ledgerRes = await fetch(`${API_BASE}/api/collectors/col-ramesh-01/ledger`);
        if (ledgerRes.ok) {
          this.ledger = await ledgerRes.json();
        }
      } catch (err) {
        console.warn('Network call failed, relying on offline local storage:', err);
      }
    }
  }

  renderPriceBoard() {
    const container = document.getElementById('priceCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;
    const texts = I18N[lang] || I18N.mr;

    this.prices.forEach(p => {
      const card = document.createElement('div');
      card.className = 'price-card';
      const avgPrice = Math.round((p.price_min + p.price_max) / 2);

      let trendClass = p.trend || 'stable';
      let trendSymbol = trendClass === 'up' ? '▲' : (trendClass === 'down' ? '▼' : '▬');

      // Localized name & sub
      const catTrans = CATEGORY_TRANSLATIONS[p.category_id]?.[lang] || CATEGORY_TRANSLATIONS[p.category_id]?.mr;
      const displayName = catTrans ? catTrans.name : p.category_name;
      const displaySub = catTrans ? catTrans.sub : `₹${p.price_min} - ₹${p.price_max} / kg`;

      card.innerHTML = `
        <div class="price-cat-info">
          <div class="price-cat-icon">${p.icon_ref || '📦'}</div>
          <div>
            <div class="price-cat-name">${displayName}</div>
            <div class="price-cat-sub">${displaySub}</div>
          </div>
        </div>
        <div class="price-rates-col">
          <div class="price-val">₹${avgPrice}</div>
          <span class="price-trend-tag ${trendClass}">
            ${trendSymbol} ${Math.abs(p.change_pct || 0)}%
          </span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectCategory(p.category_id);
        this.switchScreen('screen-create');
      });

      container.appendChild(card);
    });
  }

  async handleImageCaptured(event) {
    const file = event.target.files[0];
    if (!file) return;

    const previewImg = document.getElementById('cameraPreviewImg');
    const promptContent = document.getElementById('cameraPromptContent');
    const aiBadge = document.getElementById('aiResultBadge');
    const texts = I18N[this.currentLang] || I18N.mr;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      previewImg.src = dataUrl;
      previewImg.style.display = 'block';
      if (promptContent) promptContent.style.display = 'none';

      this.currentLot.photoData = dataUrl;

      // Run Hero On-Device Classifier
      const img = new Image();
      img.onload = async () => {
        this.showToast('🤖 On-Device AI: Classifying...');
        const result = await MaterialClassifier.classify(img);

        const catTrans = CATEGORY_TRANSLATIONS[result.categoryId]?.[this.currentLang];
        const localizedCatName = catTrans ? catTrans.name : result.categoryName;

        if (aiBadge) {
          aiBadge.style.display = 'block';
          document.getElementById('aiConfidenceBadge').textContent = `${result.confidencePct}% ${texts.accuracy}`;
          document.getElementById('aiCatName').textContent = localizedCatName;
          document.getElementById('aiCatIcon').textContent = MaterialClassifier.categories.find(c => c.id === result.categoryId)?.icon || '📦';
        }

        this.selectCategory(result.categoryId);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  selectCategory(catId) {
    this.currentLot.category_id = catId;
    const catTrans = CATEGORY_TRANSLATIONS[catId]?.[this.currentLang] || CATEGORY_TRANSLATIONS[catId]?.mr;
    this.currentLot.category_name = catTrans ? catTrans.name : 'E-Waste';

    // Highlight active button in grid
    document.querySelectorAll('.cat-select-btn').forEach(btn => {
      if (parseInt(btn.getAttribute('data-id'), 10) === catId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.calculateEstimatedPrice();
  }

  setWeight(weight) {
    this.currentLot.approx_weight_kg = parseFloat(weight.toFixed(1));
    const disp = document.getElementById('displayWeightNum');
    const slider = document.getElementById('weightSlider');
    if (disp) disp.textContent = this.currentLot.approx_weight_kg.toFixed(1);
    if (slider) slider.value = this.currentLot.approx_weight_kg;
    this.calculateEstimatedPrice();
  }

  calculateEstimatedPrice() {
    const cat = this.prices.find(p => p.category_id === this.currentLot.category_id) || this.prices[0];
    const avgRate = (cat.price_min + cat.price_max) / 2.0;
    const totalEst = Math.round(avgRate * this.currentLot.approx_weight_kg);
    this.currentLot.estimated_value = totalEst;

    const el = document.getElementById('displayEstimatedPrice');
    if (el) el.textContent = `₹${totalEst.toLocaleString('en-IN')}`;
  }

  async findRecyclerMatches() {
    this.showToast('🔍 Finding optimal recyclers...');
    this.currentLot.lot_id = this.currentLot.lot_id || `lot-${Date.now()}`;

    await LocalStore.saveLotLocal({
      lot_id: this.currentLot.lot_id,
      category_id: this.currentLot.category_id,
      category_name: this.currentLot.category_name,
      approx_weight_kg: this.currentLot.approx_weight_kg,
      estimated_value: this.currentLot.estimated_value,
      status: 'quoted',
      created_at: new Date().toISOString()
    });

    let matches = [];

    if (this.isOnline) {
      try {
        const lotRes = await fetch(`${API_BASE}/api/lots`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lot_id: this.currentLot.lot_id,
            category_id: this.currentLot.category_id,
            approx_weight_kg: this.currentLot.approx_weight_kg,
            estimated_value: this.currentLot.estimated_value
          })
        });

        if (lotRes.ok) {
          const mRes = await fetch(`${API_BASE}/api/lots/${this.currentLot.lot_id}/match`, { method: 'POST' });
          if (mRes.ok) {
            matches = await mRes.json();
          }
        }
      } catch (err) {
        console.warn('Online matching failed, computing locally:', err);
      }
    }

    if (!matches || matches.length === 0) {
      matches = this.computeLocalRecyclerMatches();
    }

    this.renderRecyclerMatches(matches);
    this.switchScreen('screen-matches');
  }

  computeLocalRecyclerMatches() {
    return this.recyclers.map((r, idx) => {
      const offeredRate = (r.offered_rates && r.offered_rates[String(this.currentLot.category_id)]) || 320;
      const dist = (idx + 1) * 3.8;
      const score = Math.round(88 - (idx * 5.5));
      return {
        recycler: r,
        distance_km: dist,
        offered_rate: offeredRate,
        total_score: score,
        score_breakdown: {
          distance: 26.5,
          price: 27.0,
          authorization: 25.0,
          pickup: 15.0
        },
        pickup_available: r.pickup_available,
        is_authorized: r.authorization_status === 'authorized'
      };
    });
  }

  renderRecyclerMatches(matches) {
    const container = document.getElementById('recyclerListContainer');
    if (!container) return;
    container.innerHTML = '';

    const texts = I18N[this.currentLang] || I18N.mr;

    matches.forEach((m, idx) => {
      const r = m.recycler;
      const card = document.createElement('div');
      card.className = `recycler-card ${idx === 0 ? 'top-pick' : ''}`;

      card.innerHTML = `
        ${idx === 0 ? `<div class="top-badge">${texts.topPickBadge}</div>` : ''}
        <div class="rec-title-row">
          <div>
            <div class="rec-name">${r.name}</div>
            <div class="rec-auth-tag">${texts.authorizedTag}</div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${m.total_score}</span>
            <span style="font-size: 0.72rem; color: var(--text-muted);">/100</span>
          </div>
        </div>

        <div class="score-weights-row">
          <span class="weight-chip">📍 <b>${m.distance_km} km</b> (30% ${texts.distTag})</span>
          <span class="weight-chip">💰 <b>₹${m.offered_rate}/kg</b> (30% ${texts.rateTag})</span>
          <span class="weight-chip">🛡️ <b>${texts.authTag}</b> (25%)</span>
          <span class="weight-chip">🚚 <b>${m.pickup_available ? texts.pickupAvail : texts.pickupDrop}</b> (15%)</span>
        </div>

        <div class="rec-action-row">
          <div>
            <span style="font-size: 0.76rem; color: var(--text-muted);">${texts.estTotalPayout}</span>
            <div class="rec-rate">₹${Math.round(m.offered_rate * this.currentLot.approx_weight_kg)}</div>
          </div>
          <button class="btn-select-rec" type="button">
            ${texts.btnSelectRec}
          </button>
        </div>
      `;

      card.querySelector('.btn-select-rec').addEventListener('click', () => {
        this.selectRecyclerAndGenerateHandover(r, m.offered_rate);
      });

      container.appendChild(card);
    });
  }

  async selectRecyclerAndGenerateHandover(recycler, rate) {
    this.currentLot.matched_recycler = recycler;
    this.showToast('🏷️ Generating physical-digital handover code...');

    const shortHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const handoverRef = `KC-${shortHex}`;
    this.currentLot.handover_ref = handoverRef;

    await LocalStore.saveHandoverLocal({
      handover_ref: handoverRef,
      lot_id: this.currentLot.lot_id,
      recycler_id: recycler.recycler_id,
      recycler_name: recycler.name,
      weight_kg: this.currentLot.approx_weight_kg,
      category_id: this.currentLot.category_id,
      category_name: this.currentLot.category_name,
      offered_rate: rate,
      gps_lat: 18.5204,
      gps_lng: 73.8567,
      created_at: new Date().toISOString()
    });

    if (this.isOnline) {
      try {
        await fetch(`${API_BASE}/api/lots/${this.currentLot.lot_id}/handover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lot_id: this.currentLot.lot_id,
            recycler_id: recycler.recycler_id,
            handover_ref: handoverRef
          })
        });
      } catch (err) {
        console.warn('Online handover call failed, stored locally:', err);
      }
    }

    const texts = I18N[this.currentLang] || I18N.mr;
    document.getElementById('displayHandoverRef').textContent = handoverRef;
    document.getElementById('txtHandoverRecName').textContent = recycler.name;
    document.getElementById('txtHandoverWeightCat').textContent = `${this.currentLot.approx_weight_kg} kg • ${this.currentLot.category_name}`;

    // Reset banner to waiting state
    const banner = document.getElementById('handoverStatusBanner');
    if (banner) {
      banner.style.background = '#fef3c7';
      banner.style.color = '#92400e';
      banner.innerHTML = `<span>⏳</span> <span id="txtWaitingConfirm">${texts.waitingConfirm}</span>`;
    }

    // Render offline QR code
    const qrContainer = document.getElementById('handoverQrHolder');
    const qrPayload = `SCRAP-SETU|REF:${handoverRef}|LOT:${this.currentLot.lot_id}|WEIGHT:${this.currentLot.approx_weight_kg}`;
    QRCodeUtil.renderQR(qrPayload, qrContainer, 190);

    this.switchScreen('screen-handover');
  }

  async simulateRecyclerConfirmation() {
    this.showToast('⚡ Simulating Recycler QR Scan & Confirmation...');

    const ref = this.currentLot.handover_ref || 'KC-9F31A2';
    const weight = this.currentLot.approx_weight_kg;
    const texts = I18N[this.currentLang] || I18N.mr;

    let confResult = null;

    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/api/handover/${ref}/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            handover_ref: ref,
            weight_confirmed_kg: weight,
            payment_mode: 'cash'
          })
        });
        if (res.ok) {
          confResult = await res.json();
        }
      } catch (err) {
        console.warn('Online confirm failed, confirming locally:', err);
      }
    }

    if (!confResult) {
      const catRate = 330.0;
      const formalBonus = Math.round(22.0 * weight);
      const totalAmount = Math.round(catRate * weight + formalBonus);
      confResult = {
        success: true,
        final_price: totalAmount,
        formal_bonus: formalBonus,
        collector_total_earned: this.ledger.total_earned + totalAmount
      };
    }

    // Update Banner state with active language
    const banner = document.getElementById('handoverStatusBanner');
    if (banner) {
      banner.style.background = '#dcfce7';
      banner.style.color = '#15803d';
      banner.innerHTML = `<span>✓</span> <b>${texts.confirmedBanner} ₹${confResult.final_price} (${texts.bonusLabel} ₹${confResult.formal_bonus})</b>`;
    }

    // Update Ledger State
    this.ledger.total_earned += confResult.final_price;
    this.ledger.transactions.unshift({
      transaction_id: `tx-${Date.now()}`,
      category_name: this.currentLot.category_name,
      weight_kg: weight,
      base_price: confResult.final_price - confResult.formal_bonus,
      formal_bonus: confResult.formal_bonus,
      total_amount: confResult.final_price,
      recycler_name: this.currentLot.matched_recycler ? this.currentLot.matched_recycler.name : 'EcoRecycle Hub Hadapsar',
      handover_ref: ref,
      payment_status: 'paid',
      payment_mode: 'cash',
      date: new Date().toISOString()
    });

    this.renderLedger();

    setTimeout(() => {
      this.showToast('🎉 ' + texts.paidTag);
      this.switchScreen('screen-ledger');
    }, 1400);
  }

  renderLedger() {
    const texts = I18N[this.currentLang] || I18N.mr;

    const valEarned = document.getElementById('valLedgerEarned');
    const valPending = document.getElementById('valLedgerPending');
    const valHomeT = document.getElementById('valHomeTotal');
    const valHomeP = document.getElementById('valHomePending');

    if (valEarned) valEarned.textContent = `₹${Math.round(this.ledger.total_earned).toLocaleString('en-IN')}`;
    if (valPending) valPending.textContent = `₹${Math.round(this.ledger.pending_dues).toLocaleString('en-IN')}`;
    if (valHomeT) valHomeT.textContent = `₹${Math.round(this.ledger.total_earned).toLocaleString('en-IN')}`;
    if (valHomeP) valHomeP.textContent = `₹${Math.round(this.ledger.pending_dues).toLocaleString('en-IN')}`;

    const txContainer = document.getElementById('txListContainer');
    if (!txContainer) return;
    txContainer.innerHTML = '';

    const txs = this.ledger.transactions.length > 0 ? this.ledger.transactions : [
      {
        category_name: CATEGORY_TRANSLATIONS[1][this.currentLang]?.name || 'PCB',
        weight_kg: 8.5,
        base_price: 2660.5,
        formal_bonus: 187.0,
        total_amount: 2847.5,
        recycler_name: 'EcoRecycle Hub Hadapsar',
        handover_ref: 'KC-4A82F1',
        payment_status: 'paid',
        payment_mode: 'cash',
        date: '2026-09-22'
      },
      {
        category_name: CATEGORY_TRANSLATIONS[2][this.currentLang]?.name || 'Cables',
        weight_kg: 4.0,
        base_price: 1612.0,
        formal_bonus: 88.0,
        total_amount: 1700.0,
        recycler_name: 'EcoRecycle Hub Hadapsar',
        handover_ref: 'KC-9F31A2',
        payment_status: 'pending',
        payment_mode: 'cash',
        date: '2026-09-26'
      }
    ];

    txs.forEach(t => {
      const item = document.createElement('div');
      item.className = 'tx-item';
      const isPaid = t.payment_status === 'paid';

      item.innerHTML = `
        <div class="tx-header">
          <div>
            <div class="tx-cat">${t.category_name} (${t.weight_kg} kg)</div>
            <div style="font-size: 0.74rem; color: var(--text-muted); font-family: monospace;">Ref: ${t.handover_ref}</div>
          </div>
          <div style="text-align: right;">
            <div class="tx-amount">₹${Math.round(t.total_amount)}</div>
            <span style="font-size: 0.72rem; font-weight: 800; color: ${isPaid ? '#047857' : '#d97706'};">
              ${isPaid ? texts.paidTag : texts.pendingTag}
            </span>
          </div>
        </div>

        <div class="tx-sub-row" style="margin-top: 8px;">
          <span>${t.recycler_name}</span>
          <span class="bonus-highlight-pill">
            🎁 +₹${t.formal_bonus} ${texts.bonusIncludedTag}
          </span>
        </div>
      `;
      txContainer.appendChild(item);
    });
  }

  async syncOfflineQueue() {
    this.showToast('↻ Syncing records with server...');
    const queue = await LocalStore.getPendingSyncQueue();

    if (queue.length === 0) {
      this.showToast('✓ ' + (this.currentLang === 'mr' ? 'सर्व नोंदी अद्ययावत आहेत.' : (this.currentLang === 'hi' ? 'सभी विवरण अद्यतित हैं।' : 'All records are up to date.')));
      return;
    }

    try {
      const lotsToSync = queue.filter(q => q.entity_type === 'lot').map(q => q.payload);
      const handoversToSync = queue.filter(q => q.entity_type === 'handover').map(q => q.payload);

      const res = await fetch(`${API_BASE}/api/sync/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collector_id: 'col-ramesh-01',
          lots: lotsToSync,
          handover_records: handoversToSync
        })
      });

      if (res.ok) {
        await LocalStore.clearSyncQueue();
        await this.refreshData();
        this.showToast('✓ ' + (this.currentLang === 'mr' ? 'सिंक यशस्वी! सर्व्हर अपडेट झाला.' : (this.currentLang === 'hi' ? 'सिंक सफल! सर्वर अपडेट हो गया।' : 'Sync complete! Server updated.')));
      }
    } catch (err) {
      console.warn('Sync failed:', err);
      this.showToast('⚠️ Sync will retry automatically.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new CollectorApp();
  window.app.init();

  // Listen for language sync messages from portal
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_LANGUAGE') {
      window.app.applyLanguage(event.data.lang);
    }
  });
});
