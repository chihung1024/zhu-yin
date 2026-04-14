import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 封裝 Firebase 初始化邏輯
const initFirebase = () => {
  try {
    // 取得環境變數或使用預設的空設定
    const config = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
      // 若您未來有自己的 Firebase 專案，可以將設定金鑰貼在這裡
    };
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'kids-words-app';
    
    if (Object.keys(config).length > 0) {
      const app = initializeApp(config);
      return { auth: getAuth(app), db: getFirestore(app), appId };
    }
    return { auth: null, db: null, appId };
  } catch (error) {
    console.error('Firebase init error', error);
    return { auth: null, db: null, appId: 'kids-words-app' };
  }
};

// 匯出 auth, db, appId 供其他元件使用
export const { auth, db, appId } = initFirebase();

// ==========================================
// 安全的 LocalStorage 存取工具 (統一放在這裡管理)
// ==========================================
export const safeGetStorage = (key) => {
  try { return localStorage.getItem(key); } catch (e) { return null; }
};

export const safeSetStorage = (key, val) => {
  try { localStorage.setItem(key, val); } catch (e) { console.warn('Storage blocked'); }
};

export const safeRemoveStorage = (key) => {
  try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
};
