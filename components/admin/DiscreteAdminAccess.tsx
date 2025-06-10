'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DiscreteAdminAccess() {
  const router = useRouter();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Secret key combination: Ctrl+Shift+A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        router.push('/admin');
        return;
      }

      // Konami-style sequence: up, up, down, down, left, right, left, right, a, d, m, i, n
      const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];
      
      const newSequence = [...keySequence, event.code].slice(-sequence.length);
      setKeySequence(newSequence);

      if (newSequence.length === sequence.length && 
          newSequence.every((key, index) => key === sequence[index])) {
        router.push('/admin');
        setKeySequence([]);
      }
    };

    const handleLogoClick = () => {
      const newCount = logoClicks + 1;
      setLogoClicks(newCount);
      
      // 7 clicks on logo = admin access
      if (newCount >= 7) {
        router.push('/admin');
        setLogoClicks(0);
      }
      
      // Reset counter after 3 seconds
      setTimeout(() => {
        setLogoClicks(0);
      }, 3000);
    };

    // Add logo click listener (only for header logo)
    const logo = document.querySelector('header img[alt*="Version Bravo"]');
    if (logo) {
      logo.addEventListener('click', handleLogoClick);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (logo) {
        logo.removeEventListener('click', handleLogoClick);
      }
    };
  }, [router, keySequence, logoClicks]);

  return null; // This component doesn't render anything
}

// You can also add URL-based access
export function useUrlAdminAccess() {
  const router = useRouter();
  
  useEffect(() => {
    // Secret URL parameter: ?vbv=admin
    if (router.query.vbv === 'admin') {
      router.push('/admin');
    }
    
    // Secret hash: #admin2024
    if (typeof window !== 'undefined' && window.location.hash === '#admin2024') {
      router.push('/admin');
    }
  }, [router]);
}