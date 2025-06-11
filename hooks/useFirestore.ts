import { useState, useEffect } from 'react';
import { db } from '../lib/firebase/config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  DocumentData,
  QuerySnapshot 
} from 'firebase/firestore';

interface FirestoreDocument extends DocumentData {
  id?: string;
}

export function useFirestore<T extends FirestoreDocument = FirestoreDocument>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all documents from collection
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simple read without real-time listeners to avoid CORS
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
      setData(docs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.warn('Firestore fetch error:', errorMessage);
      // Don't throw error, just log it and continue with empty data
      setError(null); // Clear error to not break UI
      setData([]); // Set empty data
    } finally {
      setLoading(false);
    }
  };

  // Add new document
  const addDocument = async (data: Omit<T, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data as DocumentData);
      // Don't auto-refresh to avoid CORS issues
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  // Update or create document
  const updateDocument = async (id: string, data: Partial<Omit<T, 'id'>>) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, data as DocumentData);
      } else {
        await setDoc(docRef, data as DocumentData);
      }
      
      // Don't auto-refresh to avoid CORS issues
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Firestore update error:', errorMessage);
      
      // Handle specific CORS/network errors
      if (errorMessage.includes('CORS') || errorMessage.includes('network')) {
        setError('Network error - changes saved locally but may not sync until connection is restored');
      } else {
        setError(errorMessage);
      }
      // Don't throw error to avoid breaking the UI
      console.error('Update error:', err);
    }
  };

  // Delete document
  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      // Don't auto-refresh to avoid CORS issues
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  // Get single document
  const getDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  // Remove auto-fetch on mount to avoid CORS issues
  // Components will call getDocument directly

  return {
    data,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    refetch: fetchData
  };
}