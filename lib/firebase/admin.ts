// Firebase Admin SDK configuration for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: "vb-site-5abf7",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

// Initialize Firebase Admin (avoid reinitializing)
const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);

export default app;