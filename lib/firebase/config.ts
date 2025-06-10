// Firebase configuration for VBV website CMS
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAn9qExsnwgx38Pp0qgQlvFyMbCdH3nSOU",
  authDomain: "vb-site-5abf7.firebaseapp.com",
  projectId: "vb-site-5abf7",
  storageBucket: "vb-site-5abf7.firebasestorage.app",
  messagingSenderId: "363795475195",
  appId: "1:363795475195:web:0b8ad8f4cd4198866e5e5e",
  measurementId: "G-F4GZT8D30Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;