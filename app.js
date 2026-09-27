const langs = {
  mr: {
    code: 'मराठी',
    voice: 'mr-IN',
    hello: 'नमस्ते, Ramesh 👋',
    homeTitle: 'आजची कमाई वाढवा.',
    homeSub: 'फक्त फोटो काढा. योग्य भाव मिळवा.',
    monthlyEarnings: 'या महिन्याची कमाई',
    earningsGrowth: '+₹820 मागील महिन्यापेक्षा',
    marketRates: 'आजचे बाजार भाव',
    viewAll: 'सर्व पहा →',
    dontBurnBattery: 'बॅटरी जाळू नका',
    safetyTeaser: 'आग व विषारी धूर टाळा. सुरक्षित हाताळणी पहा.',
    activeLots: 'तुमचे चालू लॉट',
    placeDate: 'पुणे • थेट बाजारभाव',
    thisWeek: 'या आठवड्यात',
    pricesStable: 'भाव स्थिर आहेत',
    trendSummary: 'PCB आणि तांब्याला चांगली मागणी आहे.',
    priceSource: 'भाव परिसरातील अधिकृत रिसायकलर्सच्या ऑफरवर आधारित आहेत.',
    myLots: 'माझा माल',
    lotsDescription: 'फोटोसह नोंदवलेला सर्व माल',
    nearbyRecyclers: 'जवळचे रिसायकलर',
    verifiedFacilities: 'अधिकृत सुविधा • पुणे',
    yourLocation: 'तुमचे ठिकाण',
    earningsLedger: 'कमाई खाते',
    ledgerSub: 'तुमचे व्यवहार आणि पैसे',
    totalEarnings: 'एकूण कमाई',
    pending: 'मिळणे बाकी',
    transactions: 'व्यवहार',
    download: 'डाउनलोड ↓',
    safeWork: 'सुरक्षित काम',
    forHealth: 'तुमच्या आरोग्यासाठी',
    dontBurnWaste: 'ई-कचरा जाळू नका',
    burnWarning: 'धूर तुमच्या फुफ्फुसांना आणि कुटुंबाला हानी पोहोचवतो.',
    home: 'घर',
    prices: 'भाव',
    recyclers: 'रिसायकलर',
    wallet: 'खाते',
    newLot: 'नवीन माल',
    addYourMaterial: 'तुमचा माल जोडा',
    takePhoto: 'फोटो काढा किंवा जोडा',
    photoHelp: 'फोटोमुळे योग्य माल ओळखण्यास मदत होते',
    chooseMaterial: 'मालाचा प्रकार — ऐकण्यासाठी स्पीकर दाबा',
    weightLabel: 'अंदाजे वजन (किलो)',
    estimatedValue: 'अंदाजे किंमत',
    fairPrice: 'स्थानिक बाजारभावावर आधारित योग्य किंमत',
    createLot: 'लॉट तयार करा',
    addMaterial: '＋ नवीन माल जोडा',
    matching: 'मॅच शोधत आहे',
    complete: 'पूर्ण',
    pendingText: 'प्रलंबित',
    received: 'मिळाले',
    verified: '✓ अधिकृत',
    offerRate: 'ऑफर केलेला दर',
    match: 'मॅच करा',
    today: 'आज',
    all: 'सर्व',
    ewaste: 'ई-कचरा',
    cable: 'केबल',
    battery: 'बॅटरी',
    safety: [
      ['🔋', 'बॅटरी वेगळी ठेवा', 'सूर्य व पाण्यापासून दूर, प्लास्टिकच्या डब्यात ठेवा.'],
      ['📺', 'CRT उघडू नका', 'काच फुटल्यास शिसे धूळ पसरू शकते.'],
      ['🔥', 'तार जाळू नका', 'तांब्यासाठी केबल अधिकृत रिसायकलरकडे द्या.']
    ],
    roleCollector: 'Collector',
    roleRecycler: 'Recycler',
    roleAdmin: 'Admin',
    incomingLots: 'येणारे लॉट',
    incomingLotsSub: 'मॅच केलेला संकलन माल',
    confirmHandover: 'हस्तांतरण निश्चित करा',
    confirmHandoverSub: 'संकलकाचा संदर्भ तपासा',
    handoverRefLabel: 'हस्तांतरण संदर्भ क्रमांक (Ref ID)',
    handoverInputHelp: 'संदर्भ प्रविष्ट करा किंवा खालील प्रलंबित बॅच निवडा:',
    confirmReceivedBtn: '✓ मिळाले - निश्चित करा',
    recyclerVerification: 'रिसायकलर पडताळणी',
    recyclerVerificationSub: 'सुविधा अधिकृतता व्यवस्थापन',
    flaggedTransactions: 'संशयास्पद व्यवहार',
    flaggedTransactionsSub: 'बाजारभावापेक्षा ±२५% विचलित लॉट',
    anomalyRuleTitle: 'किंमत पडताळणी नियम',
    anomalyRuleDesc: 'प्रमाणित दर × वजनापेक्षा २५% जास्त/कमी असल्यास ध्वजांकित केले जाते.',
    navIncoming: 'येणारे लॉट',
    navConfirm: 'पडताळणी',
    navVerify: 'रिसायकलर्स',
    navFlags: 'फ्लॅग्स',
    viewDetails: 'तपशील',
    accept: 'स्वीकारा',
    lotDetailsKicker: 'मालाची तपासणी',
    lotDetailsTitle: 'लॉट तपासणी तपशील'
  },
  hi: {
    code: 'हिंदी',
    voice: 'hi-IN',
    hello: 'नमस्ते, Ramesh 👋',
    homeTitle: 'आज अपनी कमाई बढ़ाइए।',
    homeSub: 'बस फोटो लें। सही दाम पाएँ।',
    monthlyEarnings: 'इस महीने की कमाई',
    earningsGrowth: '+₹820 पिछले महीने से',
    marketRates: 'आज के बाजार भाव',
    viewAll: 'सभी देखें →',
    dontBurnBattery: 'बैटरी मत जलाइए',
    safetyTeaser: 'आग और जहरीले धुएँ से बचें। सुरक्षित तरीके देखें।',
    activeLots: 'आपके सक्रिय लॉट',
    placeDate: 'पुणे • आज के भाव',
    thisWeek: 'इस सप्ताह',
    pricesStable: 'भाव स्थिर हैं',
    trendSummary: 'PCB और तांबे की अच्छी माँग है।',
    priceSource: 'भाव स्थानीय अधिकृत रिसाइक्लरों के प्रस्तावों पर आधारित हैं।',
    myLots: 'मेरा माल',
    lotsDescription: 'फोटो के साथ दर्ज किया गया सारा माल',
    nearbyRecyclers: 'पास के रिसाइक्लर',
    verifiedFacilities: 'अधिकृत सुविधाएँ • पुणे',
    yourLocation: 'आपका स्थान',
    earningsLedger: 'कमाई खाता',
    ledgerSub: 'आपके लेन-देन और भुगतान',
    totalEarnings: 'कुल कमाई',
    pending: 'बकाया',
    transactions: 'लेन-देन',
    download: 'डाउनलोड ↓',
    safeWork: 'सुरक्षित काम',
    forHealth: 'आपके स्वास्थ्य के लिए',
    dontBurnWaste: 'ई-कचरा मत जलाइए',
    burnWarning: 'धुआँ आपके फेफड़ों और परिवार को नुकसान पहुँचाता है।',
    home: 'होम',
    prices: 'भाव',
    recyclers: 'रिसाइक्लर',
    wallet: 'खाता',
    newLot: 'नया लॉट',
    addYourMaterial: 'अपना माल जोड़ें',
    takePhoto: 'फोटो लें या जोड़ें',
    photoHelp: 'फोटो सही माल पहचानने में मदद करता है',
    chooseMaterial: 'माल चुनें — सुनने के लिए स्पीकर दबाएँ',
    weightLabel: 'अनुमानित वजन (किलो)',
    estimatedValue: 'अनुमानित मूल्य',
    fairPrice: 'स्थानीय बाजार भाव पर आधारित उचित कीमत',
    createLot: 'लॉट बनाएँ',
    addMaterial: '＋ नया माल जोड़ें',
    matching: 'मैच खोज रहे हैं',
    complete: 'पूर्ण',
    pendingText: 'बकाया',
    received: 'प्राप्त',
    verified: '✓ अधिकृत',
    offerRate: 'प्रस्तावित दर',
    match: 'मैच करें',
    today: 'आज',
    all: 'सभी',
    ewaste: 'ई-कचरा',
    cable: 'केबल',
    battery: 'बैटरी',
    safety: [
      ['🔋', 'बैटरी अलग रखें', 'धूप और पानी से दूर प्लास्टिक के डिब्बे में रखें।'],
      ['📺', 'CRT न खोलें', 'काँच टूटने पर सीसे की धूल फैल सकती है।'],
      ['🔥', 'तार न जलाएँ', 'तांबे के लिए केबल अधिकृत रिसाइक्लर को दें।']
    ],
    roleCollector: 'Collector',
    roleRecycler: 'Recycler',
    roleAdmin: 'Admin',
    incomingLots: 'आने वाले लॉट',
    incomingLotsSub: 'कलेक्टर से जुड़ी सामग्री',
    confirmHandover: 'हस्तांतरण की पुष्टि करें',
    confirmHandoverSub: 'कलेक्टर का संदर्भ जांचें',
    handoverRefLabel: 'हस्तांतरण संदर्भ आईडी',
    handoverInputHelp: 'संदर्भ संख्या दर्ज करें या नीचे से चुनें:',
    confirmReceivedBtn: '✓ प्राप्त हुआ - पुष्टि करें',
    recyclerVerification: 'रिसाइक्लर सत्यापन',
    recyclerVerificationSub: 'सुविधा प्राधिकरण की समीक्षा',
    flaggedTransactions: 'ध्वजांकित लेन-देन',
    flaggedTransactionsSub: 'बाजार मूल्य से ±२५% विचलित लॉट',
    anomalyRuleTitle: 'विसंगति पहचान नियम',
    anomalyRuleDesc: 'मानक दर × वजन से २५% विचलन होने पर ध्वजांकित किया जाता है।',
    navIncoming: 'आवक लॉट',
    navConfirm: 'पुष्टि',
    navVerify: 'सत्यापन',
    navFlags: 'फ्लैग',
    viewDetails: 'विवरण',
    accept: 'स्वीकार करें',
    lotDetailsKicker: 'ट्रेसेबल निरीक्षण',
    lotDetailsTitle: 'लॉट निरीक्षण विवरण'
  },
  en: {
    code: 'English',
    voice: 'en-IN',
    hello: 'Hello, Ramesh 👋',
    homeTitle: 'Earn more today.',
    homeSub: 'Take a photo. Get a fair price.',
    monthlyEarnings: 'Earnings this month',
    earningsGrowth: '+₹820 from last month',
    marketRates: 'Today’s market rates',
    viewAll: 'View all →',
    dontBurnBattery: 'Do not burn batteries',
    safetyTeaser: 'Avoid fires and toxic smoke. See safe handling.',
    activeLots: 'Your active lots',
    placeDate: 'Pune • Live market rates',
    thisWeek: 'This week',
    pricesStable: 'Prices are steady',
    trendSummary: 'PCB and copper are in good demand.',
    priceSource: 'Rates are based on offers from nearby authorised recyclers.',
    myLots: 'My materials',
    lotsDescription: 'All material recorded with photos',
    nearbyRecyclers: 'Nearby recyclers',
    verifiedFacilities: 'Authorised facilities • Pune',
    yourLocation: 'Your location',
    earningsLedger: 'Earnings ledger',
    ledgerSub: 'Your transactions and payments',
    totalEarnings: 'Total earnings',
    pending: 'Pending dues',
    transactions: 'Transactions',
    download: 'Download ↓',
    safeWork: 'Work safely',
    forHealth: 'For your health',
    dontBurnWaste: 'Do not burn e-waste',
    burnWarning: 'Smoke harms your lungs and your family.',
    home: 'Home',
    prices: 'Prices',
    recyclers: 'Recyclers',
    wallet: 'Wallet',
    newLot: 'New lot',
    addYourMaterial: 'Add your material',
    takePhoto: 'Take or add a photo',
    photoHelp: 'A photo helps identify the material correctly',
    chooseMaterial: 'Choose material — tap speaker to hear the price',
    weightLabel: 'Approx. weight (kg)',
    estimatedValue: 'Estimated value',
    fairPrice: 'Fair value based on local market rates',
    createLot: 'Create lot',
    addMaterial: '＋ Add new material',
    matching: 'Finding match',
    complete: 'Complete',
    pendingText: 'Pending',
    received: 'Received',
    verified: '✓ Authorised',
    offerRate: 'Offered rate',
    match: 'Match now',
    today: 'Today',
    all: 'All',
    ewaste: 'E-waste',
    cable: 'Cable',
    battery: 'Battery',
    safety: [
      ['🔋', 'Keep batteries separate', 'Store away from sun and water in a plastic container.'],
      ['📺', 'Do not open CRTs', 'Broken glass can spread lead dust.'],
      ['🔥', 'Do not burn cables', 'Give cables to an authorised recycler for copper recovery.']
    ],
    roleCollector: 'Collector',
    roleRecycler: 'Recycler',
    roleAdmin: 'Admin',
    incomingLots: 'Incoming lots',
    incomingLotsSub: 'Matched collector material',
    confirmHandover: 'Confirm handover',
    confirmHandoverSub: 'Verify collector reference',
    handoverRefLabel: 'Handover reference ID',
    handoverInputHelp: 'Enter reference or tap a pending batch below:',
    confirmReceivedBtn: '✓ Confirm received',
    recyclerVerification: 'Recycler verification',
    recyclerVerificationSub: 'Review facility authorization',
    flaggedTransactions: 'Flagged transactions',
    flaggedTransactionsSub: 'Values outside ±25% market threshold',
    anomalyRuleTitle: 'Price Verification Rule',
    anomalyRuleDesc: 'Lots deviating >25% from standard rate × weight are flagged for audit.',
    navIncoming: 'Incoming',
    navConfirm: 'Confirm',
    navVerify: 'Verify',
    navFlags: 'Flags',
    viewDetails: 'View details',
    accept: 'Accept',
    lotDetailsKicker: 'Traceable inspection',
    lotDetailsTitle: 'Lot details'
  }
};

const materials = [
  { id: 'pcb', icon: '▦', rate: 195, trend: '↑ 8%', n: ['मिश्रित PCB', 'मिश्रित PCB', 'Mixed PCB'], s: ['उच्च दर्जा', 'उच्च ग्रेड', 'High grade'] },
  { id: 'cable', icon: '⌁', rate: 510, trend: '↑ 4%', n: ['कॉपर केबल', 'कॉपर केबल', 'Copper cable'], s: ['स्वच्छ', 'साफ़', 'Clean'] },
  { id: 'battery', icon: '▱', rate: 82, trend: '↑ 12%', n: ['लिथियम बॅटरी', 'लिथियम बैटरी', 'Lithium battery'], s: ['वेगळी ठेवलेली', 'अलग रखी हुई', 'Separated'] },
  { id: 'lcd', icon: '▣', rate: 38, trend: '↓ 2%', n: ['LCD पॅनेल', 'LCD पैनल', 'LCD panel'], s: ['कार्यरत', 'काम करने वाला', 'Working'] },
  { id: 'motor', icon: '◉', rate: 115, trend: '↑ 3%', n: ['मोटर आणि मॅग्नेट', 'मोटर और मैग्नेट', 'Motor & magnet'], s: ['मिश्रित', 'मिश्रित', 'Mixed'] }
];

const priceHistory = {
  pcb: [181, 184, 188, 186, 190, 193, 195],
  cable: [486, 492, 498, 495, 503, 507, 510],
  battery: [72, 74, 77, 75, 79, 80, 82],
  lcd: [41, 40, 40, 39, 39, 38, 38],
  motor: [108, 110, 109, 112, 113, 114, 115]
};

const initialRecyclers = [
  { name: 'EcoLoop Recyclers', distance: 3.2, authorised: true, pickup: true, offers: { pcb: 205, cable: 518, battery: 86, lcd: 40, motor: 119 } },
  { name: 'Green Circle E-Waste', distance: 5.8, authorised: true, pickup: true, offers: { pcb: 201, cable: 525, battery: 84, lcd: 39, motor: 117 } },
  { name: 'Maha Reclaim Facility', distance: 8.1, authorised: true, pickup: false, offers: { pcb: 210, cable: 514, battery: 88, lcd: 42, motor: 121 } },
  { name: 'Pune Circular Works', distance: 4.6, authorised: true, pickup: false, offers: { pcb: 198, cable: 520, battery: 85, lcd: 41, motor: 118 } },
  { name: 'Urban Metal Recovery', distance: 11.4, authorised: false, pickup: true, offers: { pcb: 214, cable: 530, battery: 90, lcd: 43, motor: 124 } }
];

const initialLots = [
  {
    id: 'pcb',
    weight: 12,
    value: 2340,
    status: 'handed_over',
    date: '10:30 AM',
    handover: {
      referenceId: 'KC-7F9A2B',
      recycler: 'EcoLoop Recyclers',
      location: { lat: 18.5204, lng: 73.8567 },
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'battery',
    weight: 15,
    value: 1230,
    status: 'matching',
    date: '11:15 AM'
  },
  {
    id: 'cable',
    weight: 8,
    value: 4080,
    status: 'completed',
    date: '02 Sep',
    handover: {
      referenceId: 'KC-4B1C9D',
      recycler: 'Green Circle E-Waste',
      location: { lat: 18.5312, lng: 73.8445 },
      timestamp: '2026-09-02T14:15:00.000Z'
    }
  },
  {
    id: 'pcb',
    weight: 10,
    value: 3600, // Expected 1950. +85% deviation!
    status: 'matching',
    date: 'Yesterday'
  }
];

let recyclers = JSON.parse(localStorage.getItem('kc-recyclers') || 'null') || initialRecyclers;
let lots = JSON.parse(localStorage.getItem('kc-lots') || 'null') || initialLots;

// Ensure sample lots have reference IDs if handed over and anomalous sample exists
if (!lots.some(l => l.handover?.referenceId === 'KC-7F9A2B')) {
  lots = initialLots;
  localStorage.setItem('kc-lots', JSON.stringify(lots));
}

let lang = localStorage.getItem('kc-language') || 'mr';
let role = localStorage.getItem('kc-role') || 'collector';
let selected = 'pcb';
let pendingPhoto = '';
let activeHandover = null;
let ledgerFilter = 'all';
let adminFilter = 'all';
let expandedLedger = null;

const roleNames = { collector: 'Collector', recycler: 'Recycler', admin: 'Admin' };
const roleIcons = { collector: '👤', recycler: '♻', admin: '🛡' };
const roleViews = {
  collector: ['home', 'prices', 'lots', 'recyclers', 'wallet', 'safety'],
  recycler: ['incoming', 'confirm'],
  admin: ['admin-recyclers', 'admin-flags']
};

const money = n => '₹' + Number(n).toLocaleString('en-IN');
const t = k => (langs[lang] && langs[lang][k]) || (langs.en && langs.en[k]) || k;
const mi = () => (lang === 'mr' ? 0 : lang === 'hi' ? 1 : 2);
const m = id => materials.find(x => x.id === id) || materials[0];

const isReceived = l => l.status === 'completed' || l.status === 'complete';

const persistLots = () => localStorage.setItem('kc-lots', JSON.stringify(lots));
const persistRecyclers = () => localStorage.setItem('kc-recyclers', JSON.stringify(recyclers));

const referenceId = () => {
  let id;
  do {
    id = `KC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  } while (lots.some(l => l.handover?.referenceId === id));
  return id;
};

const simulatedLocation = () => ({
  lat: +(18.5204 + (Math.random() - 0.5) * 0.03).toFixed(6),
  lng: +(73.8567 + (Math.random() - 0.5) * 0.03).toFixed(6)
});

const formatTime = iso =>
  new Date(iso).toLocaleString(lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

function updateClock() {
  let clockEl = document.querySelector('#deviceTime');
  if (clockEl) {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let mins = now.getMinutes().toString().padStart(2, '0');
    clockEl.textContent = `${hours}:${mins}`;
  }
}

const handoverCopy = () =>
  lang === 'en'
    ? { title: 'Confirm handover', kicker: 'Traceable handover', location: 'Simulated GPS location', time: 'Timestamp', recycler: 'Recycler', confirm: 'Confirm handover', done: 'Handover recorded', ref: 'Verification reference', close: 'Done', handed: 'Handed over', photo: 'Lot photo retained' }
    : lang === 'hi'
    ? { title: 'हस्तांतरण की पुष्टि करें', kicker: 'ट्रेसेबल हैंडओवर', location: 'सिम्युलेटेड GPS स्थान', time: 'समय', recycler: 'रिसाइक्लर', confirm: 'हस्तांतरण की पुष्टि करें', done: 'हस्तांतरण दर्ज हो गया', ref: 'सत्यापन संदर्भ', close: 'पूरा', handed: 'सौंप दिया गया', photo: 'लॉट फोटो संलग्न है' }
    : { title: 'हस्तांतरण निश्चित करा', kicker: 'ट्रेसेबल हँडओव्हर', location: 'सिम्युलेटेड GPS ठिकाण', time: 'वेळ', recycler: 'रिसायकलर', confirm: 'हस्तांतरण निश्चित करा', done: 'हस्तांतरण नोंदवले गेले', ref: 'पडताळणी संदर्भ', close: 'पूर्ण', handed: 'सोपवले' };

const statusLabel = l => (isReceived(l) ? t('complete') : l.status === 'handed_over' ? handoverCopy().handed : t('matching'));

function checkAnomaly(lot) {
  let mat = m(lot.id);
  let expected = Math.round(mat.rate * lot.weight);
  if (!expected || expected <= 0) return null;
  let deviation = (lot.value - expected) / expected;
  let absDev = Math.abs(deviation);
  if (absDev > 0.25) {
    let percent = Math.round(absDev * 100);
    let isAbove = deviation > 0;
    let dirEn = isAbove ? 'above' : 'below';
    let dirMr = isAbove ? 'जास्त' : 'कमी';
    let dirHi = isAbove ? 'अधिक' : 'कम';
    let reason =
      lang === 'en'
        ? `${percent}% ${dirEn} benchmark (${money(lot.value)} vs expected ${money(expected)})`
        : lang === 'hi'
        ? `मानक से ${percent}% ${dirHi} (${money(lot.value)} की जगह अपेक्षित ${money(expected)})`
        : `प्रमाणित दरापेक्षा ${percent}% ${dirMr} (${money(lot.value)} ऐवजी अपेक्षित ${money(expected)})`;
    return {
      deviation: absDev,
      percent,
      isAbove,
      expected,
      actual: lot.value,
      reason
    };
  }
  return null;
}

function applyRole() {
  let roleBtn = document.querySelector('#roleButton');
  document.querySelector('#roleLabel').textContent = roleNames[role];
  document.querySelector('#roleIcon').textContent = roleIcons[role];

  if (roleBtn) {
    roleBtn.classList.remove('role-collector', 'role-recycler', 'role-admin');
    roleBtn.classList.add(`role-${role}`);
  }

  document.querySelectorAll('[data-roles]').forEach(node => {
    node.classList.toggle('role-hidden', !node.dataset.roles.split(' ').includes(role));
  });

  let active = document.querySelector('.view.active')?.id.replace('view-', '');
  if (!roleViews[role].includes(active)) {
    navigate(roleViews[role][0]);
  }
}

const ledgerCopy = () =>
  lang === 'en' ? ['All', 'Pending', 'Received'] : lang === 'hi' ? ['सभी', 'बकाया', 'प्राप्त'] : ['सर्व', 'प्रलंबित', 'मिळाले'];

function rankRecyclers(materialId) {
  let verified = recyclers.filter(r => r.authorised);
  if (!verified.length) return [];
  let maxRate = Math.max(...verified.map(r => r.offers[materialId] || 1));
  let maxDistance = Math.max(...verified.map(r => r.distance || 1));
  return verified
    .map(r => ({
      ...r,
      score: (r.offers[materialId] / maxRate) * 55 + (1 - r.distance / maxDistance) * 30 + (r.pickup ? 15 : 0)
    }))
    .sort((a, b) => b.score - a.score);
}

function renderTrend(materialId) {
  let values = priceHistory[materialId] || priceHistory.pcb;
  let min = Math.min(...values);
  let max = Math.max(...values);
  let range = max - min || 1;
  let points = values.map((value, index) => `${8 + index * 27},${69 - ((value - min) / range) * 48}`).join(' ');
  let x = m(materialId);
  let chart = document.querySelector('#priceChart');
  if (chart) {
    chart.setAttribute('aria-label', `Seven-day ${x.n[mi()]} price trend: ${values.join(', ')}`);
    chart.innerHTML =
      '<line x1="8" y1="70" x2="170" y2="70" stroke="#8bb9a2" stroke-width="1.5" stroke-dasharray="3 3"/>' +
      '<polyline points="' +
      points +
      '" fill="none" stroke="#087254" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      values.map((value, index) => '<circle cx="' + (8 + index * 27) + '" cy="' + (69 - ((value - min) / range) * 48) + '" r="3.5" fill="#087254" stroke="#ffffff" stroke-width="1.5"/>').join('');
  }
}

const fileAsDataUrl = file =>
  new Promise(resolve => {
    if (!file) return resolve(null);
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  let u = new SpeechSynthesisUtterance(text);
  u.lang = langs[lang].voice;
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

function sayPrice(x) {
  let unit = lang === 'en' ? 'rupees per kilogram' : 'रुपये प्रति किलो';
  let name = x.n[mi()];
  let text =
    lang === 'en'
      ? `${name} is ${x.rate} ${unit}.`
      : lang === 'hi'
      ? `${name} का आज का उचित भाव ${x.rate} ${unit} है।`
      : `${name} चा आजचा योग्य भाव ${x.rate} ${unit} आहे.`;
  speak(text);
}

function row(x) {
  return (
    '<article class="price-row">' +
    '<div class="material-icon" aria-hidden="true">' +
    x.icon +
    '</div>' +
    '<div class="price-meta"><strong>' +
    x.n[mi()] +
    '</strong><small>' +
    money(x.rate) +
    '/kg • ' +
    x.s[mi()] +
    '</small></div>' +
    '<button class="row-speak shadow-press" type="button" data-speak="' +
    x.id +
    '" aria-label="Hear price for ' +
    x.n[mi()] +
    '">🔊</button>' +
    '<div class="rate"><b>' +
    money(x.rate) +
    '</b><small class="' +
    (x.trend.includes('↓') ? '' : 'up') +
    '">' +
    x.trend +
    '</small></div>' +
    '</article>'
  );
}

function lot(l) {
  let x = m(l.id);
  let visual = l.photo ? '<img src="' + l.photo + '" alt="">' : x.icon;
  let reference = l.handover ? '<small class="handover-id">Ref: ' + l.handover.referenceId + '</small>' : '';
  return (
    '<article class="lot-card">' +
    '<div class="lot-image" aria-hidden="true">' +
    visual +
    '</div>' +
    '<div class="lot-body">' +
    '<div class="lot-header-row">' +
    '<h3>' +
    x.n[mi()] +
    '</h3>' +
    '<span class="state ' +
    (isReceived(l) ? 'complete' : '') +
    '">' +
    statusLabel(l) +
    '</span>' +
    '</div>' +
    '<p>' +
    l.weight +
    ' kg • ' +
    l.date +
    '</p>' +
    '<span class="lot-meta">' +
    t('estimatedValue') +
    ' ' +
    money(l.value) +
    '</span>' +
    reference +
    '</div>' +
    '</article>'
  );
}

function toast(s) {
  let x = document.querySelector('#toast');
  if (!x) return;
  x.textContent = s;
  x.classList.add('show');
  setTimeout(() => x.classList.remove('show'), 2800);
}

function updateConfirmPreview() {
  let input = document.querySelector('#handoverReference');
  let preview = document.querySelector('#confirmLotPreview');
  if (!input || !preview) return;
  let ref = input.value.trim().toUpperCase();
  if (!ref) {
    preview.innerHTML = '<div class="preview-empty">Enter reference ID or tap a pending batch above to preview.</div>';
    return;
  }
  let target = lots.find(l => l.handover?.referenceId === ref);
  if (!target) {
    preview.innerHTML = '<div class="preview-empty" style="color:#b91c1c;border-color:#fecaca;background:#fef2f2">No matching lot found for reference: <b>' + ref + '</b></div>';
    return;
  }
  let x = m(target.id);
  let visual = target.photo ? '<img src="' + target.photo + '" alt="">' : x.icon;
  let statusBadge = isReceived(target) ? '<span class="preview-badge" style="color:#047857;background:#ecfdf5">✓ Already Completed</span>' : '<span class="preview-badge">✓ Ready to confirm</span>';
  preview.innerHTML =
    '<div class="preview-card">' +
    '<div class="lot-image" style="width:44px;height:44px;font-size:20px">' +
    visual +
    '</div>' +
    '<div>' +
    '<h3>' +
    x.n[mi()] +
    ' (' +
    target.weight +
    ' kg)</h3>' +
    '<p>' +
    money(target.value) +
    ' • Collector reference ' +
    ref +
    '</p>' +
    '</div>' +
    statusBadge +
    '</div>';
}

function openLotDetails(lotIndex) {
  let target = lots[lotIndex];
  if (!target) return;
  let x = m(target.id);
  let modal = document.querySelector('#lotDetailsModal');
  let content = document.querySelector('#lotDetailsContent');
  let actionBtn = document.querySelector('#lotDetailsActionBtn');
  let visual = target.photo ? '<img class="handover-photo" src="' + target.photo + '" alt="">' : '<div class="handover-photo">' + x.icon + '</div>';

  content.innerHTML =
    '<div class="handover-evidence">' +
    '<div class="handover-lot">' +
    visual +
    '<div><h3>' +
    x.n[mi()] +
    '</h3><p>' +
    target.weight +
    ' kg • ' +
    money(target.value) +
    '</p></div>' +
    '</div>' +
    '<div class="evidence-row"><span>Status</span><b>' +
    statusLabel(target) +
    '</b></div>' +
    '<div class="evidence-row"><span>Benchmark rate</span><b>' +
    money(x.rate) +
    '/kg</b></div>' +
    '<div class="evidence-row"><span>Recorded date</span><b>' +
    target.date +
    '</b></div>' +
    (target.handover
      ? '<div class="evidence-row"><span>Handover ref</span><b style="font-family:var(--font-mono)">' +
        target.handover.referenceId +
        '</b></div>' +
        '<div class="evidence-row"><span>Assigned recycler</span><b>' +
        (target.handover.recycler || 'EcoLoop Recyclers') +
        '</b></div>' +
        '<div class="evidence-row"><span>GPS location</span><b>' +
        target.handover.location.lat +
        ', ' +
        target.handover.location.lng +
        '</b></div>'
      : '') +
    '</div>';

  if (target.handover?.referenceId) {
    actionBtn.textContent = 'Proceed to Confirm Handover';
    actionBtn.onclick = () => {
      modal.close();
      let input = document.querySelector('#handoverReference');
      if (input) input.value = target.handover.referenceId;
      navigate('confirm');
      updateConfirmPreview();
    };
  } else {
    actionBtn.textContent = 'Accept for Pickup';
    actionBtn.onclick = () => {
      modal.close();
      let ref = referenceId();
      target.handover = {
        referenceId: ref,
        recycler: 'EcoLoop Recyclers',
        location: simulatedLocation(),
        timestamp: new Date().toISOString()
      };
      target.status = 'handed_over';
      persistLots();
      render();
      toast('Lot accepted! Reference ID: ' + ref);
    };
  }
  modal.showModal();
}

function renderRoleViews() {
  // 1. Recycler - Incoming lots
  let incoming = lots.filter(l => l.status === 'matching' || l.status === 'handed_over');
  let incomingEl = document.querySelector('#incomingLots');
  if (incomingEl) {
    incomingEl.innerHTML = incoming.length
      ? incoming
          .map(l => {
            let idx = lots.indexOf(l);
            let x = m(l.id);
            let visual = l.photo ? '<img src="' + l.photo + '" alt="">' : x.icon;
            let refText = l.handover?.referenceId ? '<small class="handover-id">Ref: ' + l.handover.referenceId + '</small>' : '';
            return (
              '<article class="incoming-card">' +
              '<div class="incoming-top">' +
              '<div class="lot-image" aria-hidden="true">' +
              visual +
              '</div>' +
              '<div class="incoming-info">' +
              '<div class="incoming-header-row">' +
              '<h3>' +
              x.n[mi()] +
              '</h3>' +
              '<span class="state ' +
              (l.status === 'handed_over' ? '' : 'matching') +
              '">' +
              statusLabel(l) +
              '</span>' +
              '</div>' +
              '<p>' +
              l.weight +
              ' kg • ' +
              l.date +
              '</p>' +
              '<span class="lot-meta">' +
              money(l.value) +
              '</span>' +
              refText +
              '</div>' +
              '</div>' +
              '<div class="incoming-actions">' +
              '<button type="button" class="btn-details shadow-press" data-view-details="' +
              idx +
              '">' +
              t('viewDetails') +
              '</button>' +
              '<button type="button" class="btn-accept shadow-press" data-accept-lot="' +
              idx +
              '">' +
              t('accept') +
              '</button>' +
              '</div>' +
              '</article>'
            );
          })
          .join('')
      : '<p class="source-note">No incoming lots yet.</p>';
  }

  // 2. Recycler - Confirm handover chips
  let chipsEl = document.querySelector('#quickReferenceChips');
  if (chipsEl) {
    let pendingHandoverLots = lots.filter(l => l.status === 'handed_over' && l.handover?.referenceId);
    chipsEl.innerHTML = pendingHandoverLots.length
      ? pendingHandoverLots
          .map(
            l =>
              '<button type="button" class="quick-chip shadow-press" data-fill-ref="' +
              l.handover.referenceId +
              '">' +
              l.handover.referenceId +
              ' (' +
              m(l.id).n[mi()] +
              ' • ' +
              l.weight +
              'kg)</button>'
          )
          .join('')
      : '<small style="color:var(--muted);font-size:10px">No pending handover references found.</small>';
  }
  updateConfirmPreview();

  // 3. Admin - Recycler verification
  let adminRecyclersEl = document.querySelector('#adminRecyclers');
  let adminStatsEl = document.querySelector('#adminRecyclerStats');
  let verifiedCount = recyclers.filter(r => r.authorised).length;
  let pendingCount = recyclers.length - verifiedCount;
  if (adminStatsEl) {
    adminStatsEl.innerHTML = `
      <div class="stat-item">
        <small>Facilities</small>
        <strong>${recyclers.length}</strong>
      </div>
      <div class="stat-item">
        <small>Verified</small>
        <strong class="verified-stat">${verifiedCount}</strong>
      </div>
      <div class="stat-item">
        <small>Pending</small>
        <strong class="pending-stat">${pendingCount}</strong>
      </div>
    `;
  }

  let filteredRecyclers = recyclers
    .map((r, index) => ({ r, index }))
    .filter(({ r }) => adminFilter === 'all' || (adminFilter === 'verified' ? r.authorised : !r.authorised));

  if (adminRecyclersEl) {
    adminRecyclersEl.innerHTML = filteredRecyclers
      .map(({ r, index }) => {
        let isAuth = r.authorised;
        return (
          '<article class="recycler-card">' +
          '<div class="recycler-top">' +
          '<div class="recycler-logo">♻</div>' +
          '<div>' +
          '<h3>' +
          r.name +
          '</h3>' +
          '<p>' +
          r.distance +
          ' km • ' +
          (r.pickup ? 'Pickup available' : 'Drop-off only') +
          '</p>' +
          '</div>' +
          '<span class="verified ' +
          (isAuth ? '' : 'admin-pending') +
          '">' +
          (isAuth ? 'Verified' : 'Pending') +
          '</span>' +
          '</div>' +
          '<div class="recycler-details">' +
          '<span><b>' +
          (isAuth ? 'Authorised facility' : 'Verification required') +
          '</b></span>' +
          '<button class="admin-toggle shadow-press ' +
          (isAuth ? 'toggle-pending' : 'toggle-verified') +
          '" type="button" data-admin-recycler="' +
          index +
          '">' +
          'Mark ' +
          (isAuth ? 'pending' : 'verified') +
          '</button>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  // 4. Admin - Flagged transactions
  let flags = lots.map((lot, index) => ({ lot, index, flag: checkAnomaly(lot) })).filter(x => x.flag);
  let adminFlagsEl = document.querySelector('#adminFlags');
  if (adminFlagsEl) {
    adminFlagsEl.innerHTML = flags.length
      ? flags
          .map(({ lot, index, flag }) => {
            let x = m(lot.id);
            let visual = lot.photo ? '<img src="' + lot.photo + '" alt="">' : x.icon;
            return (
              '<article class="flag-card">' +
              '<div class="flag-header-row">' +
              '<div class="flag-title-wrap">' +
              '<h3>' +
              x.n[mi()] +
              ' (' +
              lot.weight +
              ' kg)</h3>' +
              '<span class="flag-date">' +
              lot.date +
              ' • ' +
              statusLabel(lot) +
              '</span>' +
              '</div>' +
              '<span class="flag-badge">⚑ Anomaly (' +
              flag.percent +
              '%)</span>' +
              '</div>' +
              '<div class="flag-comparison-box">' +
              '<div><span>Recorded:</span> <b style="color:#b91c1c">' +
              money(lot.value) +
              '</b></div>' +
              '<div><span>Benchmark:</span> <b>' +
              money(flag.expected) +
              '</b></div>' +
              '</div>' +
              '<div class="flag-reason-box">' +
              '<span>⚠️</span><span>' +
              flag.reason +
              '</span>' +
              '</div>' +
              '<div class="flag-actions">' +
              '<button class="btn-dismiss shadow-press" type="button" data-dismiss-flag="' +
              index +
              '">Recalibrate</button>' +
              '<button class="btn-approve shadow-press" type="button" data-approve-flag="' +
              index +
              '">Approve Exception</button>' +
              '</div>' +
              '</article>'
            );
          })
          .join('')
      : '<p class="source-note">No transactions are outside the ±25% threshold.</p>';
  }
}

function render() {
  document.documentElement.lang = lang;
  document.querySelector('#langCode').textContent = t('code');
  document.querySelectorAll('[data-i18n]').forEach(e => {
    e.textContent = t(e.dataset.i18n);
  });
  document.querySelectorAll('.language-option').forEach(e => {
    e.classList.toggle('selected', e.dataset.lang === lang);
  });

  updateClock();

  // Calculate dynamic wallet balances
  let receivedTotal = lots.filter(l => isReceived(l)).reduce((s, l) => s + (Number(l.value) || 0), 0);
  let pendingTotal = lots.filter(l => !isReceived(l)).reduce((s, l) => s + (Number(l.value) || 0), 0);

  let homeEarningsEl = document.querySelector('#homeEarnings');
  if (homeEarningsEl) homeEarningsEl.textContent = Number(receivedTotal).toLocaleString('en-IN');
  let walletTotalEl = document.querySelector('#walletTotal');
  if (walletTotalEl) walletTotalEl.textContent = money(receivedTotal);
  let walletPendingEl = document.querySelector('#walletPending');
  if (walletPendingEl) walletPendingEl.textContent = money(pendingTotal);

  // Active lot preview
  let activeLot = lots.find(l => l.status === 'matching') || lots.find(l => l.status === 'handed_over') || lots[0];
  let activeMaterial = activeLot?.id || selected;

  document.querySelector('#miniPrices').innerHTML = materials.slice(0, 3).map(row).join('');
  document.querySelector('#fullPrices').innerHTML = materials.map(row).join('');
  document.querySelector('#activeLot').innerHTML = lot(activeLot);
  document.querySelector('#lotsList').innerHTML = lots.map(lot).join('');
  document.querySelector('#recyclerList').innerHTML = rankRecyclers(activeMaterial)
    .map(
      r =>
        '<article class="recycler-card">' +
        '<div class="recycler-top">' +
        '<div class="recycler-logo">♻</div>' +
        '<div><h3>' +
        r.name +
        '</h3><p>' +
        r.distance +
        ' km • Pune' +
        (r.pickup ? ' • Pickup' : '') +
        '</p></div>' +
        '<span class="verified">' +
        t('verified') +
        '</span>' +
        '</div>' +
        '<div class="recycler-details">' +
        '<span><b>' +
        money(r.offers[activeMaterial]) +
        '/kg</b><br>' +
        t('offerRate') +
        '</span>' +
        '<button class="match shadow-press" type="button" data-recycler="' +
        r.name +
        '">' +
        t('match') +
        '</button>' +
        '</div>' +
        '</article>'
    )
    .join('');

  let labels = ledgerCopy();
  document.querySelectorAll('[data-ledger-filter]').forEach((button, index) => {
    button.textContent = labels[index];
    button.classList.toggle('selected', button.dataset.ledgerFilter === ledgerFilter);
  });

  document.querySelector('#ledger').innerHTML = lots
    .map((item, index) => ({ lot: item, index }))
    .filter(({ lot }) => ledgerFilter === 'all' || (ledgerFilter === 'received' ? isReceived(lot) : !isReceived(lot)))
    .map(({ lot, index }) => {
      let x = m(lot.id);
      let received = isReceived(lot);
      let expanded = expandedLedger === index;
      let recycler = lot.handover?.recycler || '—';
      let reference = lot.handover?.referenceId || '—';
      return (
        '<article class="ledger-item ' +
        (expanded ? 'expanded' : '') +
        '">' +
        '<button class="ledger-toggle" type="button" data-ledger="' +
        index +
        '" aria-expanded="' +
        expanded +
        '">' +
        '<span class="ledger-icon" aria-hidden="true">₹</span>' +
        '<span><b>' +
        x.n[mi()] +
        '</b><small>' +
        lot.date +
        ' • ' +
        (received ? statusLabel(lot) : t('pendingText')) +
        '</small></span>' +
        '<strong class="' +
        (received ? '' : 'pending') +
        '">' +
        money(lot.value) +
        '</strong>' +
        '<span aria-hidden="true">⌄</span>' +
        '</button>' +
        (expanded
          ? '<div class="ledger-detail">' +
            '<span>Material <b>' +
            x.n[mi()] +
            '</b></span>' +
            '<span>Weight <b>' +
            lot.weight +
            ' kg</b></span>' +
            '<span>Recycler <b>' +
            recycler +
            '</b></span>' +
            '<span>Reference <b style="font-family:var(--font-mono)">' +
            reference +
            '</b></span>' +
            '</div>'
          : '') +
        '</article>'
      );
    })
    .join('');

  document.querySelector('#safetyGuide').innerHTML = t('safety')
    .map(a => '<article><span>' + a[0] + '</span><div><h3>' + a[1] + '</h3><p>' + a[2] + '</p></div></article>')
    .join('');

  renderTrend(activeMaterial);
  choices();
  estimate();
  renderRoleViews();
}

function choices() {
  document.querySelector('#materialChoices').innerHTML = materials
    .map(
      x =>
        '<button type="button" class="material-choice shadow-press ' +
        (x.id === selected ? 'selected' : '') +
        '" data-material="' +
        x.id +
        '" aria-pressed="' +
        (x.id === selected) +
        '">' +
        '<span aria-hidden="true">' +
        x.icon +
        '</span><b>' +
        x.n[mi()] +
        '</b><small>' +
        money(x.rate) +
        '/kg</small>' +
        '<i data-lot-speak="' +
        x.id +
        '" aria-hidden="true">🔊</i>' +
        '</button>'
    )
    .join('');
}

function estimate() {
  let x = m(selected);
  let w = Math.max(0.1, +document.querySelector('#weight').value || 0);
  document.querySelector('#estimate').textContent = money(Math.round(w * x.rate * 0.92)) + ' – ' + money(Math.round(w * x.rate * 1.05));
}

function navigate(view, trigger) {
  if (!roleViews[role].includes(view)) {
    view = roleViews[role][0];
  }
  document.querySelectorAll('.view').forEach(x => {
    let active = x.id === 'view-' + view;
    x.classList.toggle('active', active);
    x.setAttribute('aria-hidden', String(!active));
  });
  document.querySelectorAll('.nav-item').forEach(x => {
    let active = x.dataset.nav === view;
    x.classList.toggle('active', active);
    active ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current');
  });
  if (view === 'confirm') updateConfirmPreview();
  if (trigger) trigger.focus();
}

function openHandover(recycler) {
  let lot = lots.find(l => l.status === 'matching');
  if (!lot) {
    toast(lang === 'en' ? 'No available lot to hand over.' : lang === 'hi' ? 'सौंपने के लिए कोई लॉट उपलब्ध नहीं है।' : 'सोपवण्यासाठी कोणताही लॉट उपलब्ध नाही.');
    return;
  }
  let timestamp = new Date().toISOString();
  let location = simulatedLocation();
  let x = m(lot.id);
  let copy = handoverCopy();
  activeHandover = { lot, recycler, timestamp, location };
  document.querySelector('#handoverKicker').textContent = copy.kicker;
  document.querySelector('#handoverTitle').textContent = copy.title;
  let confirmButton = document.querySelector('#confirmHandover');
  confirmButton.textContent = copy.confirm;
  confirmButton.onclick = confirmHandover;
  let visual = lot.photo ? '<img class="handover-photo" src="' + lot.photo + '" alt="">' : '<div class="handover-photo" aria-hidden="true">' + x.icon + '</div>';
  document.querySelector('#handoverContent').innerHTML =
    '<div class="handover-evidence">' +
    '<div class="handover-lot">' +
    visual +
    '<div><h3>' +
    x.n[mi()] +
    '</h3><p>' +
    lot.weight +
    ' kg • ' +
    money(lot.value) +
    '</p></div></div>' +
    '<div class="evidence-row"><span>' +
    copy.recycler +
    '</span><b>' +
    recycler +
    '</b></div>' +
    '<div class="evidence-row"><span>' +
    copy.location +
    '</span><b>' +
    location.lat +
    ', ' +
    location.lng +
    '</b></div>' +
    '<div class="evidence-row"><span>' +
    copy.time +
    '</span><b>' +
    formatTime(timestamp) +
    '</b></div>' +
    '</div>';
  document.querySelector('#handoverModal').showModal();
}

function confirmHandover() {
  if (!activeHandover) return;
  let { lot, recycler, timestamp, location } = activeHandover;
  let ref = referenceId();
  let handover = { referenceId: ref, recycler, location, timestamp, photo: lot.photo || null };
  lot.status = 'handed_over';
  lot.handover = handover;
  persistLots();
  render();
  let copy = handoverCopy();
  document.querySelector('#handoverKicker').textContent = copy.kicker;
  document.querySelector('#handoverTitle').textContent = copy.done;
  document.querySelector('#handoverContent').innerHTML =
    '<div class="handover-success">' +
    '<div class="success-mark" aria-hidden="true">✓</div>' +
    '<h3>' +
    copy.done +
    '</h3>' +
    '<div class="handover-reference">' +
    '<small>' +
    copy.ref +
    '</small>' +
    '<strong>' +
    ref +
    '</strong>' +
    '</div>' +
    '<small>' +
    formatTime(timestamp) +
    ' • ' +
    location.lat +
    ', ' +
    location.lng +
    '</small>' +
    '</div>';
  let button = document.querySelector('#confirmHandover');
  button.textContent = copy.close;
  button.onclick = () => {
    document.querySelector('#handoverModal').close();
    activeHandover = null;
    button.onclick = confirmHandover;
  };
  toast(lang === 'en' ? 'Handover saved with reference: ' + ref : lang === 'hi' ? 'हस्तांतरण संदर्भ के साथ दर्ज हुआ: ' + ref : 'हँडओव्हर संदर्भासह जतन झाले: ' + ref);
}

// Event Listeners Initialization
document.querySelector('#roleButton').onclick = () => {
  let roles = ['collector', 'recycler', 'admin'];
  role = roles[(roles.indexOf(role) + 1) % roles.length];
  localStorage.setItem('kc-role', role);
  applyRole();
  render();
  toast('Switched workspace: ' + roleNames[role]);
};

// Lot Creation form handler
document.querySelector('#lotForm').onsubmit = async e => {
  e.preventDefault();
  let x = m(selected);
  let w = +document.querySelector('#weight').value;
  let photo = await fileAsDataUrl(document.querySelector('#photo').files[0]);
  lots.unshift({
    id: x.id,
    weight: w,
    value: Math.round(w * x.rate),
    status: 'matching',
    date: t('today'),
    photo: photo || pendingPhoto || null
  });
  persistLots();
  pendingPhoto = '';
  document.querySelector('#photo').value = '';
  document.querySelector('#lotModal').close();
  render();
  toast(lang === 'en' ? 'Lot created. Finding nearby recyclers.' : lang === 'hi' ? 'लॉट बन गया। पास के रिसाइक्लर खोजे जा रहे हैं।' : 'लॉट तयार झाला! जवळचे रिसायकलर शोधत आहोत.');
};

// Recycler: Confirm Received
document.querySelector('#confirmReceived').onclick = () => {
  let refInput = document.querySelector('#handoverReference');
  let reference = refInput.value.trim().toUpperCase();
  if (!reference) {
    toast('Please enter or scan a reference ID.');
    return;
  }
  let lot = lots.find(l => l.handover?.referenceId === reference);
  if (!lot) {
    toast('Reference ID not found.');
    return;
  }
  if (isReceived(lot)) {
    toast('This lot was already confirmed.');
    return;
  }
  lot.status = 'completed';
  persistLots();
  refInput.value = '';
  render();
  toast('Lot ' + reference + ' confirmed received! Updated collector wallet.');
  navigate('incoming');
};

// Scan simulated reference with interactive animation
document.querySelector('#scanReferenceBtn').onclick = () => {
  let btn = document.querySelector('#scanReferenceBtn');
  let originalHtml = btn.innerHTML;
  btn.innerHTML = 'Scanning...';
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    let pendingHandoverLot = lots.find(l => l.status === 'handed_over' && l.handover?.referenceId);
    let input = document.querySelector('#handoverReference');
    if (pendingHandoverLot) {
      input.value = pendingHandoverLot.handover.referenceId;
      toast('Reference scanned: ' + input.value);
    } else {
      input.value = 'KC-7F9A2B';
      toast('Scanned reference: KC-7F9A2B');
    }
    updateConfirmPreview();
  }, 350);
};

// Reference Input dynamic preview
document.querySelector('#handoverReference').oninput = updateConfirmPreview;

// Admin: Simulate anomaly lot
document.querySelector('#simulateFlagBtn').onclick = () => {
  let testMat = materials[Math.floor(Math.random() * materials.length)];
  let w = 12;
  let standardVal = w * testMat.rate;
  let inflatedVal = Math.round(standardVal * 1.6); // +60% deviation
  lots.unshift({
    id: testMat.id,
    weight: w,
    value: inflatedVal,
    status: 'matching',
    date: 'Just now',
    flagged: true
  });
  persistLots();
  render();
  toast('Simulated anomaly lot created: ' + testMat.n[mi()] + ' at ' + money(inflatedVal));
};

// Delegated click handlers
document.addEventListener('click', e => {
  // Ledger filters
  let filter = e.target.closest('[data-ledger-filter]');
  if (filter) {
    ledgerFilter = filter.dataset.ledgerFilter;
    expandedLedger = null;
    render();
    return;
  }

  // Ledger item expansion
  let toggle = e.target.closest('[data-ledger]');
  if (toggle) {
    let index = +toggle.dataset.ledger;
    expandedLedger = expandedLedger === index ? null : index;
    render();
    return;
  }

  // Recycler view details
  let detailsBtn = e.target.closest('[data-view-details]');
  if (detailsBtn) {
    openLotDetails(+detailsBtn.dataset.viewDetails);
    return;
  }

  // Recycler accept lot
  let acceptBtn = e.target.closest('[data-accept-lot]');
  if (acceptBtn) {
    let lot = lots[+acceptBtn.dataset.acceptLot];
    if (lot.handover?.referenceId) {
      document.querySelector('#handoverReference').value = lot.handover.referenceId;
      navigate('confirm');
      updateConfirmPreview();
    } else {
      let ref = referenceId();
      lot.handover = {
        referenceId: ref,
        recycler: 'EcoLoop Recyclers',
        location: simulatedLocation(),
        timestamp: new Date().toISOString()
      };
      lot.status = 'handed_over';
      persistLots();
      render();
      document.querySelector('#handoverReference').value = ref;
      navigate('confirm');
      updateConfirmPreview();
      toast('Lot accepted! Reference: ' + ref);
    }
    return;
  }

  // Quick chip fill
  let chip = e.target.closest('[data-fill-ref]');
  if (chip) {
    let input = document.querySelector('#handoverReference');
    input.value = chip.dataset.fillRef;
    updateConfirmPreview();
    toast('Loaded reference ' + input.value);
    return;
  }

  // Admin toggle recycler verification
  let adminRecycler = e.target.closest('[data-admin-recycler]');
  if (adminRecycler) {
    let recycler = recyclers[+adminRecycler.dataset.adminRecycler];
    recycler.authorised = !recycler.authorised;
    persistRecyclers();
    render();
    toast(recycler.name + (recycler.authorised ? ' marked as Verified' : ' marked as Pending'));
    return;
  }

  // Admin filter recyclers
  let adminFilterChip = e.target.closest('[data-admin-filter]');
  if (adminFilterChip) {
    adminFilter = adminFilterChip.dataset.adminFilter;
    document.querySelectorAll('[data-admin-filter]').forEach(b => b.classList.toggle('selected', b === adminFilterChip));
    renderRoleViews();
    return;
  }

  // Admin dismiss flag
  let dismissBtn = e.target.closest('[data-dismiss-flag]');
  if (dismissBtn) {
    let index = +dismissBtn.dataset.dismissFlag;
    let lot = lots[index];
    lot.value = Math.round(m(lot.id).rate * lot.weight); // adjusted back to standard rate
    persistLots();
    render();
    toast('Flag calibrated: lot value set to standard benchmark rate.');
    return;
  }

  // Admin approve exception
  let approveBtn = e.target.closest('[data-approve-flag]');
  if (approveBtn) {
    let index = +approveBtn.dataset.approveFlag;
    let lot = lots[index];
    lot.approvedException = true;
    toast('Exception approved for ' + m(lot.id).n[mi()] + ' batch.');
    return;
  }

  // Material speak
  if (e.target.dataset.speak) {
    sayPrice(m(e.target.dataset.speak));
    return;
  }

  // Recycler match
  if (e.target.classList.contains('match')) {
    openHandover(e.target.dataset.recycler);
    return;
  }
});

// Photo selection preview
document.querySelector('#photo').onchange = e => {
  let file = e.target.files[0];
  if (!file) {
    pendingPhoto = '';
    return;
  }
  let reader = new FileReader();
  reader.onload = () => (pendingPhoto = reader.result);
  reader.readAsDataURL(file);
};

// Modal controls & General setup
document.querySelectorAll('.view').forEach(x => x.setAttribute('aria-hidden', String(!x.classList.contains('active'))));
document.querySelectorAll('[data-nav]').forEach(b => (b.onclick = () => navigate(b.dataset.nav, b)));
document.querySelectorAll('#createLot,#createLot2,#createLotHeader,#scanNav').forEach(b => (b.onclick = () => document.querySelector('#lotModal').showModal()));
document.querySelector('#closeLot').onclick = () => document.querySelector('#lotModal').close();
document.querySelector('#closeLotDetails').onclick = () => document.querySelector('#lotDetailsModal').close();
document.querySelector('#langButton').onclick = () => document.querySelector('#languageModal').showModal();
document.querySelector('#closeLanguage').onclick = () => document.querySelector('#languageModal').close();
document.querySelectorAll('.language-option').forEach(b => {
  b.onclick = () => {
    lang = b.dataset.lang;
    localStorage.setItem('kc-language', lang);
    document.querySelector('#languageModal').close();
    render();
  };
});

document.querySelector('#weight').oninput = estimate;
document.querySelector('#materialChoices').onclick = e => {
  let id = e.target.dataset.lotSpeak || e.target.closest('[data-material]')?.dataset.material;
  if (!id) return;
  if (e.target.dataset.lotSpeak) return sayPrice(m(id));
  selected = id;
  choices();
  estimate();
};

document.querySelector('#speakPrices').onclick = () => sayPrice(materials[0]);
document.querySelector('#speakSafety').onclick = () =>
  speak(
    lang === 'en'
      ? 'Do not burn batteries, cables, or e-waste.'
      : lang === 'hi'
      ? 'बैटरी, तार या ई-कचरा न जलाएँ।'
      : 'बॅटरी, तार किंवा ई-कचरा जाळू नका.'
  );

document.querySelector('#networkButton').onclick = e => {
  let b = e.currentTarget;
  b.classList.toggle('offline');
  let offline = b.classList.contains('offline');
  b.setAttribute('aria-pressed', String(offline));
  b.setAttribute('aria-label', 'Network status: ' + (offline ? 'offline' : 'online'));
  document.querySelector('#networkText').textContent = offline ? 'Offline' : 'Live';
  toast(offline ? 'Offline mode: changes will sync later.' : 'Back online. Real-time rates connected.');
};

document.querySelector('#closeHandover').onclick = () => {
  document.querySelector('#handoverModal').close();
  activeHandover = null;
};

// Initial setup
setInterval(updateClock, 10000);
applyRole();
render();
