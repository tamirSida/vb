import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { AdminProvider } from '../contexts/AdminContext';
import AdminToggle from '../components/admin/AdminToggle';
import LoginForm from '../components/admin/LoginForm';
import { useAdmin } from '../contexts/AdminContext';
import { initializeFirestoreData } from '../lib/firebase/initializeData';

function AppContent({ Component, pageProps, router }: AppProps) {
  const { user, isAdmin, loading } = useAdmin();
  const [showLogin, setShowLogin] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowLogin(!user && window.location.pathname === '/admin');
    }
  }, [user]);

  // Initialize Firestore data on app start
  React.useEffect(() => {
    initializeFirestoreData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kizna-navy">
        <div className="text-kizna-electric">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Component {...pageProps} />
      {isAdmin && <AdminToggle />}
      {showLogin && <LoginForm />}
    </>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicons */}
        <link rel="icon" href="/images/favicon/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/images/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        
      </Head>
      <AdminProvider>
        <AppContent Component={Component} pageProps={pageProps} router={router} />
      </AdminProvider>
    </>
  );
}