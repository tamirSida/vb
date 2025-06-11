import { useState } from 'react';
import { db } from '../lib/firebase/config';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';

// Simple Firestore hook without real-time listeners to avoid CORS
export function useSimpleFirestore(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get single document
  const getDocument = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      console.warn('Firestore read error:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update or create document
  const updateDocument = async (id: string, data: DocumentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, data, { merge: true });
      
      console.log('Document updated successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save data';
      console.warn('Firestore write error (may be CORS related):', errorMessage);
      
      // Don't show error for CORS issues - just log them
      if (errorMessage.includes('CORS') || errorMessage.includes('access control')) {
        console.warn('CORS error detected - data may not persist until deployed');
        setError(null);
      } else {
        setError(errorMessage);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDocument,
    updateDocument
  };
}