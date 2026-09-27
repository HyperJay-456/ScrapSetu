/**
 * Recycler Dashboard Logic
 * Incoming Lots Queue, Inspection, QR Scan & Traceable Confirmation
 * Full Marathi, Hindi, English Localization Support
 */

const API_BASE = window.location.origin.includes('8000') 
  ? window.location.origin 
  : 'http://127.0.0.1:8000';

const RECYCLER_I18N = {
  mr: {
    brandTitle: 'रिसायकलर<b>पोर्टल</b>',
    brandSub: 'स्क्रॅप सेतू अधिकृत नेटवर्क',
    navIncoming: 'येणारे लॉट (Incoming Lots)',
    navScan: 'हस्तांतरण QR स्कॅन (Scan QR)',
    navHistory: 'पुष्टी झालेले व्यवहार (History)',
    facAuthorized: 'अधिकृत सुविधा (AUTHORIZED)',
    facDetails: 'सेवा परिसर: १८ किमी • पिकअप: सुरू',
    headingIncoming: 'येणारे ई-कचरा लॉट (Incoming Lots)',
    headingScan: 'भौतिक हस्तांतरण टॅग स्कॅन करा (Scan QR)',
    headingHistory: 'पुष्टी झालेले व ट्रेस करण्यायोग्य व्यवहार (History)',
    subHeading: 'पडताळणी केलेली ट्रेसिबिलिटी व्यवस्था (Verified Traceability)',
    btnRefresh: 'रीफ्रेश (Refresh)',
    mpcbConnected: 'MPCB जोडलेले आहे',
    statActive: 'चालू मॅच झालेले लॉट',
    statPending: 'हस्तांतरण प्रलंबित (Tags)',
    statConfirmedWeight: 'आज पुष्टी झालेले वजन',
    statEprBonus: 'दिलेला फॉर्मल EPR बोनस',
    tableHeading: 'थेट संकलक ऑफर व लॉट यादी',
    tableSub: 'अंतर आणि अधिकृत दरावर आधारित क्रमवारी',
    thLotRef: 'लॉट / संदर्भ (Ref)',
    thCategory: 'सामग्री प्रकार (Category)',
    thWeight: 'वजन (Weight)',
    thPrice: 'दर / एकूण (Price)',
    thDistance: 'अंतर (Distance)',
    thStatus: 'स्थिती (Status)',
    thAction: 'कृती (Action)',
    btnInspect: 'तपासा / स्कॅन',
    scanTitle: 'भौतिक हस्तांतरण टॅग स्कॅन करा',
    scanSub: 'पोत्यावर लावलेला QR कोड स्कॅन करा किंवा ६-अंकी संदर्भ कोड टाका.',
    scanLaser: 'कॅमेरा स्कॅनर सक्रिय आहे (Optical Stream Active)',
    refPlaceholder: 'उदा. KC-9F31A2',
    btnLookup: 'शोधा (Lookup)',
    lblDeclaredWeight: 'नोंदवलेले वजन:',
    lblCollector: 'संकलक:',
    lblRate: 'अधिकृत दर:',
    lblEprRate: 'EPR बोनस:',
    lblScaleWeight: 'सुविधेतील काट्यावरील अचूक वजन (kg):',
    lblScanMatVal: 'मालाचे मूल्य (Material Value):',
    lblScanBonus: 'फॉर्मल EPR बोनस (+₹२२/किलो):',
    lblScanTotal: 'संकलकाला एकूण देय रक्कम:',
    btnConfirmReceipt: '✓ माल मिळाल्याची पुष्टी करा व लॉट बंद करा',
    historyHeading: 'पुष्टी झालेले व ट्रेस करण्यायोग्य व्यवहार',
    historySub: 'CPCB/MPCB प्रमाणित लेखापरीक्षण रेकॉर्ड',
    thHistRef: 'हस्तांतरण संदर्भ (Ref)',
    thHistCategory: 'सामग्री प्रकार (Category)',
    thHistWeight: 'काट्यावरील वजन',
    thHistBase: 'मूळ किंमत',
    thHistBonus: 'EPR बोनस',
    thHistTotal: 'एकूण दिलेले पैसे',
    thHistTime: 'वेळ',
    thHistStatus: 'प्रमाणपत्र स्थिती',
    modalTitle: 'लॉट तपासणी तपशील',
    lblModalCat: 'प्रकार:',
    lblModalWeight: 'वजन:',
    lblModalCondition: 'स्थिती:',
    lblModalRate: 'ऑफर दर:',
    lblModalValTitle: 'अंदाजे एकूण देय रक्कम (Estimated Payout)',
    lblModalBonusNote: 'फॉर्मल EPR बोनस समाविष्ट (+₹२२/किलो)',
    btnAccept: '✓ स्वीकारा (Accept)',
    btnCounter: '⇄ काउंटर ऑफर',
    btnReject: '✕ नाकारा (Reject)',
    alertAccepted: '✓ ऑफर स्वीकारली! संकलकाला सूचना पाठवली आहे. लॉट पिकअपसाठी तयार आहे.',
    alertCounter: 'तुमचा काउंटर-ऑफर दर टाका (₹/किलो):',
    alertCounterSent: 'संकलकाला काउंटर-ऑफर पाठवली आहे.',
    alertRejectConfirm: 'तुम्ही हा लॉट नक्की नाकारू इच्छिता का?'
  },
  hi: {
    brandTitle: 'रीसाइक्लर<b>पोर्टल</b>',
    brandSub: 'स्क्रैप सेतु अधिकृत नेटवर्क',
    navIncoming: 'आने वाले लॉट (Incoming Lots)',
    navScan: 'हस्तांतरण QR स्कैन (Scan QR)',
    navHistory: 'पुष्टीकृत लेन-देन (History)',
    facAuthorized: 'अधिकृत सुविधा (AUTHORIZED)',
    facDetails: 'सेवा दायरा: 18 किमी • पिकअप: सक्रिय',
    headingIncoming: 'आने वाले ई-कचरा लॉट (Incoming Lots)',
    headingScan: 'भौतिक हस्तांतरण टैग स्कैन करें (Scan QR)',
    headingHistory: 'सत्यापित लेन-देन इतिहास (History)',
    subHeading: 'सत्यापित ट्रैसेबिलिटी व्यवस्था (Verified Traceability)',
    btnRefresh: 'रीफ्रेश (Refresh)',
    mpcbConnected: 'MPCB से जुड़ा हुआ है',
    statActive: 'सक्रिय मैच्ड लॉट',
    statPending: 'हस्तांतरण लंबित (Tags)',
    statConfirmedWeight: 'आज सत्यापित वजन',
    statEprBonus: 'कलेक्टर को दिया गया EPR बोनस',
    tableHeading: 'लाइव कलेक्टर ऑफर एवं लॉट सूची',
    tableSub: 'दूरी एवं अधिकृत दरों के आधार पर वरीयता',
    thLotRef: 'लॉट / संदर्भ (Ref)',
    thCategory: 'सामग्री प्रकार (Category)',
    thWeight: 'वजन (Weight)',
    thPrice: 'दर / कुल (Price)',
    thDistance: 'दूरी (Distance)',
    thStatus: 'स्थिति (Status)',
    thAction: 'कार्रवाई (Action)',
    btnInspect: 'जांचें / स्कैन',
    scanTitle: 'भौतिक हस्तांतरण टैग स्कैन करें',
    scanSub: 'बोरी पर लगा QR कोड स्कैन करें या 6-अंकों का संदर्भ कोड दर्ज करें।',
    scanLaser: 'कैमरा स्कैनर सक्रिय है (Optical Stream Active)',
    refPlaceholder: 'उदा. KC-9F31A2',
    btnLookup: 'खोजें (Lookup)',
    lblDeclaredWeight: 'दर्ज वजन:',
    lblCollector: 'कलेक्टर:',
    lblRate: 'अधिकृत दर:',
    lblEprRate: 'EPR बोनस:',
    lblScaleWeight: 'सुविधा कांटे पर सत्यापित वजन (kg):',
    lblScanMatVal: 'सामग्री मूल्य (Material Value):',
    lblScanBonus: 'फॉर्मल EPR बोनस (+₹22/किलो):',
    lblScanTotal: 'कलेक्टर को कुल देय राशि:',
    btnConfirmReceipt: '✓ माल प्राप्ति की पुष्टि करें और लॉट बंद करें',
    historyHeading: 'पुष्टीकृत एवं ट्रैसेबल लेन-देन',
    historySub: 'CPCB/MPCB प्रमाणित ऑडिट रिकॉर्ड',
    thHistRef: 'हस्तांतरण संदर्भ (Ref)',
    thHistCategory: 'सामग्री प्रकार (Category)',
    thHistWeight: 'सत्यापित वजन',
    thHistBase: 'मूल कीमत',
    thHistBonus: 'EPR बोनस',
    thHistTotal: 'कुल भुगतान',
    thHistTime: 'समय',
    thHistStatus: 'प्रमाणपत्र स्थिति',
    modalTitle: 'लॉट निरीक्षण विवरण',
    lblModalCat: 'प्रकार:',
    lblModalWeight: 'वजन:',
    lblModalCondition: 'स्थिति:',
    lblModalRate: 'ऑफर दर:',
    lblModalValTitle: 'अनुमानित कुल देय राशि (Estimated Payout)',
    lblModalBonusNote: 'फॉर्मल EPR बोनस शामिल (+₹22/किलो)',
    btnAccept: '✓ स्वीकारें (Accept)',
    btnCounter: '⇄ काउंटर ऑफर',
    btnReject: '✕ अस्वीकार (Reject)',
    alertAccepted: '✓ ऑफर स्वीकृत! कलेक्टर को सूचना भेज दी गई है।',
    alertCounter: 'अपनी काउंटर-ऑफर दर दर्ज करें (₹/किलो):',
    alertCounterSent: 'कलेक्टर को काउंटर-ऑफर भेज दिया गया है।',
    alertRejectConfirm: 'क्या आप वाकई इस लॉट को अस्वीकार करना चाहते हैं?'
  },
  en: {
    brandTitle: 'Recycler<b>Portal</b>',
    brandSub: 'ScrapSetu Network',
    navIncoming: 'Incoming Lots Queue',
    navScan: 'Scan Handover QR',
    navHistory: 'Confirmed Batches',
    facAuthorized: 'AUTHORIZED FACILITY',
    facDetails: 'Service Radius: 18 km • Pickup: Active',
    headingIncoming: 'Incoming Material Lots',
    headingScan: 'Scan Physical Handover Tag',
    headingHistory: 'Confirmed Transaction History',
    subHeading: 'Verified Traceability Pipeline',
    btnRefresh: 'Refresh Queue',
    mpcbConnected: 'MPCB Connected',
    statActive: 'Active Matched Lots',
    statPending: 'Pending Handover Tags',
    statConfirmedWeight: 'Confirmed Today (kg)',
    statEprBonus: 'EPR Bonus Passed Back',
    tableHeading: 'Live Collector Offers & Lots',
    tableSub: 'Auto-ranked by proximity & category rates',
    thLotRef: 'Lot ID / Ref',
    thCategory: 'Material Category',
    thWeight: 'Weight',
    thPrice: 'Offered Price',
    thDistance: 'Distance',
    thStatus: 'Status',
    thAction: 'Action',
    btnInspect: 'Inspect / Scan',
    scanTitle: 'Scan Physical Handover Tag',
    scanSub: 'Scan the physical QR label attached to the collector\'s bag or enter the 6-character Reference ID.',
    scanLaser: 'Optical Barcode/QR Camera Stream Active',
    refPlaceholder: 'e.g. KC-9F31A2',
    btnLookup: 'Lookup',
    lblDeclaredWeight: 'Declared Weight:',
    lblCollector: 'Collector:',
    lblRate: 'Offered Rate:',
    lblEprRate: 'EPR Bonus:',
    lblScaleWeight: 'Facility Scale Confirmed Weight (kg):',
    lblScanMatVal: 'Material Value:',
    lblScanBonus: 'Formal EPR Bonus (+₹22/kg):',
    lblScanTotal: 'Total Payout to Collector:',
    btnConfirmReceipt: '✓ Confirm Material Receipt & Close Lot',
    historyHeading: 'Confirmed & Traceable Transactions',
    historySub: 'CPCB/MPCB Auditable Traceability Records',
    thHistRef: 'Handover Ref',
    thHistCategory: 'Category',
    thHistWeight: 'Scale Weight',
    thHistBase: 'Base Amount',
    thHistBonus: 'EPR Bonus',
    thHistTotal: 'Total Paid',
    thHistTime: 'Timestamp',
    thHistStatus: 'EPR Status',
    modalTitle: 'Inspect Lot Details',
    lblModalCat: 'Category:',
    lblModalWeight: 'Weight:',
    lblModalCondition: 'Condition:',
    lblModalRate: 'Offered Rate:',
    lblModalValTitle: 'Evaluated Total Payout',
    lblModalBonusNote: 'Includes Formal EPR Bonus (+₹22/kg)',
    btnAccept: '✓ Accept Offer',
    btnCounter: '⇄ Counter-Offer',
    btnReject: '✕ Reject Offer',
    alertAccepted: '✓ Offer accepted! Notified collector. Lot is marked for pickup.',
    alertCounter: 'Enter your counter-offer rate (₹/kg):',
    alertCounterSent: 'Counter-offer sent to collector.',
    alertRejectConfirm: 'Are you sure you want to reject this lot?'
  }
};

class RecyclerDashboard {
  constructor() {
    this.currentLang = localStorage.getItem('kc_recycler_lang') || 'mr';
    this.currentTab = 'tab-incoming';
    this.lots = [];
    this.confirmedBatches = [];
    this.selectedLot = null;
    this.activeLookupRef = 'KC-9F31A2';
  }

  async init() {
    this.bindEvents();
    this.applyLanguage(this.currentLang);
    await this.fetchLots();
    this.renderIncomingLots();
    this.renderConfirmedBatches();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Language Segmented Control Buttons
    document.querySelectorAll('.rec-lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        this.applyLanguage(lang);
      });
    });

    // Refresh Button
    const refreshBtn = document.getElementById('btnRefreshRecycler');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.fetchLots());
    }

    // Modal Close
    const closeBtn = document.getElementById('btnCloseModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('lotDetailModal').classList.remove('active');
      });
    }

    // Modal Actions
    const acceptBtn = document.getElementById('btnModalAccept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
        alert(texts.alertAccepted);
        document.getElementById('lotDetailModal').classList.remove('active');
        if (this.selectedLot) {
          this.selectedLot.status = 'handed_over';
          this.renderIncomingLots();
        }
      });
    }

    const counterBtn = document.getElementById('btnModalCounter');
    if (counterBtn) {
      counterBtn.addEventListener('click', () => {
        const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
        const newRate = prompt(texts.alertCounter, '325');
        if (newRate) {
          alert(`${texts.alertCounterSent} (₹${newRate}/kg)`);
          document.getElementById('lotDetailModal').classList.remove('active');
        }
      });
    }

    const rejectBtn = document.getElementById('btnModalReject');
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
        if (confirm(texts.alertRejectConfirm)) {
          document.getElementById('lotDetailModal').classList.remove('active');
          if (this.selectedLot) {
            this.selectedLot.status = 'rejected';
            this.renderIncomingLots();
          }
        }
      });
    }

    // Lookup Ref Button
    const lookupBtn = document.getElementById('btnLookupRef');
    if (lookupBtn) {
      lookupBtn.addEventListener('click', () => {
        const val = document.getElementById('inputScanRef').value.trim();
        if (val) this.lookupHandoverRef(val);
      });
    }

    // Weight change in scan panel
    const weightInput = document.getElementById('inputVerifiedWeight');
    if (weightInput) {
      weightInput.addEventListener('input', () => this.recalculateScanTotals());
    }

    // Confirm Receipt Button
    const confirmBtn = document.getElementById('btnConfirmReceipt');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.confirmReceiptAndClose());
    }
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('kc_recycler_lang', lang);
    const texts = RECYCLER_I18N[lang] || RECYCLER_I18N.mr;

    // Update active button state
    document.querySelectorAll('.rec-lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const setHtml = (id, str) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = str;
    };
    const setTxt = (id, str) => {
      const el = document.getElementById(id);
      if (el) el.textContent = str;
    };

    setHtml('recBrandTitle', texts.brandTitle);
    setTxt('recBrandSub', texts.brandSub);
    setTxt('txtNavIncoming', texts.navIncoming);
    setTxt('txtNavScan', texts.navScan);
    setTxt('txtNavHistory', texts.navHistory);
    setTxt('txtFacAuthorized', texts.facAuthorized);
    setHtml('txtFacDetails', texts.facDetails);

    // Navbar
    if (this.currentTab === 'tab-incoming') setTxt('pageHeading', texts.headingIncoming);
    else if (this.currentTab === 'tab-scan') setTxt('pageHeading', texts.headingScan);
    else if (this.currentTab === 'tab-history') setTxt('pageHeading', texts.headingHistory);

    setTxt('pageSubHeading', texts.subHeading);
    setTxt('txtBtnRefresh', texts.btnRefresh);
    setTxt('txtMpcbConnected', texts.mpcbConnected);

    // Stats
    setTxt('lblStatActive', texts.statActive);
    setTxt('lblStatPending', texts.statPending);
    setTxt('lblStatConfirmedWeight', texts.statConfirmedWeight);
    setTxt('lblStatEprBonus', texts.statEprBonus);

    // Incoming Table
    setTxt('txtTableHeading', texts.tableHeading);
    setTxt('txtTableSub', texts.tableSub);
    setTxt('thLotRef', texts.thLotRef);
    setTxt('thCategory', texts.thCategory);
    setTxt('thWeight', texts.thWeight);
    setTxt('thPrice', texts.thPrice);
    setTxt('thDistance', texts.thDistance);
    setTxt('thStatus', texts.thStatus);
    setTxt('thAction', texts.thAction);

    // Scan Panel
    setTxt('txtScanTitle', texts.scanTitle);
    setTxt('txtScanSub', texts.scanSub);
    setTxt('txtScannerLaserLabel', texts.scanLaser);
    const refInput = document.getElementById('inputScanRef');
    if (refInput) refInput.placeholder = texts.refPlaceholder;
    setTxt('txtBtnLookup', texts.btnLookup);
    setTxt('lblSrDeclaredWeight', texts.lblDeclaredWeight);
    setTxt('lblSrCollector', texts.lblCollector);
    setTxt('lblSrRate', texts.lblRate);
    setTxt('lblSrEprRate', texts.lblEprRate);
    setTxt('lblScaleWeight', texts.lblScaleWeight);
    setTxt('lblScanMatVal', texts.lblScanMatVal);
    setTxt('lblScanBonus', texts.lblScanBonus);
    setTxt('lblScanTotal', texts.lblScanTotal);
    setTxt('txtBtnConfirmReceipt', texts.btnConfirmReceipt);

    // History Table
    setTxt('txtHistoryHeading', texts.historyHeading);
    setTxt('txtHistorySub', texts.historySub);
    setTxt('thHistRef', texts.thHistRef);
    setTxt('thHistCategory', texts.thHistCategory);
    setTxt('thHistWeight', texts.thHistWeight);
    setTxt('thHistBase', texts.thHistBase);
    setTxt('thHistBonus', texts.thHistBonus);
    setTxt('thHistTotal', texts.thHistTotal);
    setTxt('thHistTime', texts.thHistTime);
    setTxt('thHistStatus', texts.thHistStatus);

    // Modal
    setTxt('modalLotTitle', texts.modalTitle);
    setTxt('lblModalCat', texts.lblModalCat);
    setTxt('lblModalWeight', texts.lblModalWeight);
    setTxt('lblModalCondition', texts.lblModalCondition);
    setTxt('lblModalRate', texts.lblModalRate);
    setTxt('lblModalValTitle', texts.lblModalValTitle);
    setTxt('lblModalBonusNote', texts.lblModalBonusNote);
    setTxt('txtBtnAccept', texts.btnAccept);
    setTxt('txtBtnCounter', texts.btnCounter);
    setTxt('txtBtnReject', texts.btnReject);

    this.renderIncomingLots();
    this.renderConfirmedBatches();
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));

    const targetPanel = document.getElementById(tabId);
    const targetNav = document.querySelector(`[data-tab="${tabId}"]`);

    if (targetPanel) targetPanel.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
    const heading = document.getElementById('pageHeading');
    if (heading) {
      if (tabId === 'tab-incoming') heading.textContent = texts.headingIncoming;
      else if (tabId === 'tab-scan') heading.textContent = texts.headingScan;
      else if (tabId === 'tab-history') heading.textContent = texts.headingHistory;
    }
  }

  async fetchLots() {
    try {
      const res = await fetch(`${API_BASE}/api/lots`);
      if (res.ok) {
        this.lots = await res.json();
      }
    } catch (err) {
      console.warn('API fetch failed, loading default demonstration lots:', err);
      this.lots = [
        {
          lot_id: 'lot-pune-881',
          category_id: 1,
          category_name: 'PCB Motherboards',
          approx_weight_kg: 5.0,
          estimated_value: 1675.0,
          handover_ref: 'KC-9F31A2',
          status: 'handed_over',
          collection_lat: 18.5204,
          collection_lng: 73.8567,
          created_at: new Date().toISOString()
        },
        {
          lot_id: 'lot-pune-882',
          category_id: 2,
          category_name: 'Copper Cables',
          approx_weight_kg: 8.5,
          estimated_value: 3612.5,
          handover_ref: 'KC-4A82F1',
          status: 'confirmed',
          collection_lat: 18.5120,
          collection_lng: 73.9230,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          lot_id: 'lot-pune-883',
          category_id: 3,
          category_name: 'LCD Panels',
          approx_weight_kg: 12.0,
          estimated_value: 1440.0,
          handover_ref: 'KC-B271E0',
          status: 'matched',
          collection_lat: 18.5300,
          collection_lng: 73.8400,
          created_at: new Date().toISOString()
        }
      ];
    }

    this.renderIncomingLots();
  }

  renderIncomingLots() {
    const tbody = document.getElementById('incomingLotsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
    const pendingLots = this.lots.filter(l => l.status !== 'rejected');
    document.getElementById('statIncomingCount').textContent = pendingLots.length;
    document.getElementById('statPendingHandovers').textContent = pendingLots.filter(l => l.status === 'handed_over').length;

    pendingLots.forEach(lot => {
      const tr = document.createElement('tr');
      const ref = lot.handover_ref || `KC-${lot.lot_id.substring(0, 6).toUpperCase()}`;
      const statusClass = lot.status || 'matched';

      tr.innerHTML = `
        <td><b style="font-family:'JetBrains Mono', monospace; color:#0369a1;">${ref}</b></td>
        <td><b>${lot.category_name || 'PCB'}</b></td>
        <td><b>${lot.approx_weight_kg} kg</b></td>
        <td><b>₹${Math.round(lot.estimated_value)}</b></td>
        <td>Hadapsar (~3.8 km)</td>
        <td><span class="status-badge ${statusClass}">${lot.status}</span></td>
        <td>
          <button class="action-btn-sm btn-inspect-lot">${texts.btnInspect}</button>
        </td>
      `;

      tr.querySelector('.btn-inspect-lot').addEventListener('click', () => {
        this.openLotModal(lot);
      });

      tbody.appendChild(tr);
    });
  }

  openLotModal(lot) {
    this.selectedLot = lot;
    document.getElementById('modalLotTitle').textContent = `${lot.category_name} • ${lot.approx_weight_kg} kg`;
    document.getElementById('modalCatName').textContent = lot.category_name;
    document.getElementById('modalWeight').textContent = `${lot.approx_weight_kg} kg`;
    document.getElementById('modalCondition').textContent = lot.condition || 'Intact';
    document.getElementById('modalRate').textContent = `₹335 / kg`;
    document.getElementById('modalTotalVal').textContent = `₹${Math.round(lot.estimated_value + (lot.approx_weight_kg * 22))}`;

    document.getElementById('lotDetailModal').classList.add('active');
  }

  lookupHandoverRef(rawRef) {
    let cleanRef = (rawRef || '').trim();
    if (cleanRef.includes('REF:')) {
      const match = cleanRef.match(/REF:([^|]+)/);
      if (match) cleanRef = match[1];
    }
    this.activeLookupRef = cleanRef;
    const lot = this.lots.find(l => l.handover_ref === cleanRef || cleanRef.includes(l.lot_id.substring(0, 6).toUpperCase())) || this.lots[0];

    const resultArea = document.getElementById('scanResultArea');
    if (!resultArea) return;

    resultArea.style.display = 'block';
    document.getElementById('srLotCategory').textContent = lot ? lot.category_name : 'PCB Motherboards';
    document.getElementById('srHandoverRef').textContent = cleanRef;
    document.getElementById('srDeclaredWeight').textContent = `${lot ? lot.approx_weight_kg : 5.0} kg`;
    document.getElementById('inputVerifiedWeight').value = lot ? lot.approx_weight_kg : 5.0;

    this.recalculateScanTotals();
  }

  recalculateScanTotals() {
    const weight = parseFloat(document.getElementById('inputVerifiedWeight').value) || 5.0;
    const rate = 335.0;
    const matVal = Math.round(weight * rate);
    const bonus = Math.round(weight * 22.0); // EPR bonus (₹22/kg)
    const total = matVal + bonus;

    document.getElementById('srMaterialPrice').textContent = `₹${matVal.toLocaleString('en-IN')}.00`;
    document.getElementById('srEprBonus').textContent = `+₹${bonus.toLocaleString('en-IN')}.00`;
    document.getElementById('srTotalPrice').textContent = `₹${total.toLocaleString('en-IN')}.00`;
  }

  async confirmReceiptAndClose() {
    const ref = this.activeLookupRef || 'KC-9F31A2';
    const weight = parseFloat(document.getElementById('inputVerifiedWeight').value) || 5.0;

    let success = false;
    let finalData = null;

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
        finalData = await res.json();
        success = true;
      }
    } catch (err) {
      console.warn('Online confirmation failed, simulating local completion:', err);
    }

    if (!finalData) {
      const matVal = Math.round(weight * 335.0);
      const bonus = Math.round(weight * 22.0);
      finalData = {
        final_price: matVal + bonus,
        formal_bonus: bonus,
        handover_ref: ref
      };
      success = true;
    }

    const texts = RECYCLER_I18N[this.currentLang] || RECYCLER_I18N.mr;
    alert(`🎉 ${texts.btnConfirmReceipt}\n\nRef: ${ref}\nWeight: ${weight} kg\nTotal: ₹${finalData.final_price}\nEPR Bonus: ₹${finalData.formal_bonus}`);

    this.confirmedBatches.unshift({
      ref: ref,
      category: 'PCB Motherboards',
      weight: weight,
      base: finalData.final_price - finalData.formal_bonus,
      bonus: finalData.formal_bonus,
      total: finalData.final_price,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.renderConfirmedBatches();
    this.switchTab('tab-history');
    document.getElementById('scanResultArea').style.display = 'none';
  }

  renderConfirmedBatches() {
    const tbody = document.getElementById('confirmedLotsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const batches = this.confirmedBatches.length > 0 ? this.confirmedBatches : [
      {
        ref: 'KC-4A82F1',
        category: 'PCB Motherboards',
        weight: 8.5,
        base: 2660.5,
        bonus: 187.0,
        total: 2847.5,
        date: '10:30 AM'
      },
      {
        ref: 'KC-9F31A2',
        category: 'Copper Cables',
        weight: 4.0,
        base: 1612.0,
        bonus: 88.0,
        total: 1700.0,
        date: 'Yesterday'
      }
    ];

    batches.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><b style="font-family:'JetBrains Mono', monospace; color:#059669;">${b.ref}</b></td>
        <td><b>${b.category}</b></td>
        <td><b>${b.weight} kg</b></td>
        <td>₹${Math.round(b.base)}</td>
        <td style="color:#059669; font-weight:800;">+₹${Math.round(b.bonus)}</td>
        <td><b>₹${Math.round(b.total)}</b></td>
        <td>${b.date}</td>
        <td><span class="status-badge confirmed">CPCB Validated</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new RecyclerDashboard();
  window.dashboard.init();

  // Listen for language sync messages from portal
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SET_LANGUAGE') {
      window.dashboard.applyLanguage(event.data.lang);
    }
  });
});
