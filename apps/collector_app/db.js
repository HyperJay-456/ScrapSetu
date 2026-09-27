/**
 * Offline-First Local Store & Synchronization Engine
 * Uses IndexedDB with localStorage fallback.
 * Every write starts local, then appends to sync_queue.
 */

const LocalStore = {
  DB_NAME: 'scrapsetu_collector_db',
  DB_VERSION: 1,
  db: null,

  async init() {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('lots')) {
          const lotStore = db.createObjectStore('lots', { keyPath: 'lot_id' });
          lotStore.createIndex('status', 'status', { unique: false });
          lotStore.createIndex('created_at', 'created_at', { unique: false });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'sync_id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('prices')) {
          db.createObjectStore('prices', { keyPath: 'category_id' });
        }
        if (!db.objectStoreNames.contains('handovers')) {
          db.createObjectStore('handovers', { keyPath: 'handover_ref' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = () => {
        console.warn('IndexedDB unavailable, falling back to LocalStorage');
        resolve(null);
      };
    });
  },

  async saveLotLocal(lot) {
    lot.updated_at = new Date().toISOString();
    lot.synced = lot.synced || false;

    // 1. Save in local lots store
    if (this.db) {
      await this.idbPut('lots', lot);
      // 2. Add to sync queue if not synced
      if (!lot.synced) {
        await this.idbPut('sync_queue', {
          entity_type: 'lot',
          entity_id: lot.lot_id,
          payload: lot,
          created_at: new Date().toISOString()
        });
      }
    } else {
      const lots = JSON.parse(localStorage.getItem('kc_lots') || '[]');
      const idx = lots.findIndex(l => l.lot_id === lot.lot_id);
      if (idx >= 0) lots[idx] = lot;
      else lots.unshift(lot);
      localStorage.setItem('kc_lots', JSON.stringify(lots));

      if (!lot.synced) {
        const q = JSON.parse(localStorage.getItem('kc_sync_queue') || '[]');
        q.push({ entity_type: 'lot', entity_id: lot.lot_id, payload: lot, created_at: new Date().toISOString() });
        localStorage.setItem('kc_sync_queue', JSON.stringify(q));
      }
    }
    return lot;
  },

  async getLotsLocal() {
    if (this.db) {
      return await this.idbGetAll('lots');
    } else {
      return JSON.parse(localStorage.getItem('kc_lots') || '[]');
    }
  },

  async saveHandoverLocal(handover) {
    if (this.db) {
      await this.idbPut('handovers', handover);
      await this.idbPut('sync_queue', {
        entity_type: 'handover',
        entity_id: handover.handover_ref,
        payload: handover,
        created_at: new Date().toISOString()
      });
    } else {
      const handovers = JSON.parse(localStorage.getItem('kc_handovers') || '[]');
      handovers.push(handover);
      localStorage.setItem('kc_handovers', JSON.stringify(handovers));
    }
  },

  async getPendingSyncQueue() {
    if (this.db) {
      return await this.idbGetAll('sync_queue');
    } else {
      return JSON.parse(localStorage.getItem('kc_sync_queue') || '[]');
    }
  },

  async clearSyncQueue() {
    if (this.db) {
      const tx = this.db.transaction('sync_queue', 'readwrite');
      tx.objectStore('sync_queue').clear();
    } else {
      localStorage.setItem('kc_sync_queue', '[]');
    }
  },

  // Helper IDB operations
  idbPut(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  idbGetAll(storeName) {
    return new Promise((resolve) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }
};

window.LocalStore = LocalStore;
