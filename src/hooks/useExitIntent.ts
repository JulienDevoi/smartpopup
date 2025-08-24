'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseExitIntentOptions {
  threshold?: number; // pixels from top of screen
  delay?: number; // minimum time on page before showing (ms)
  cookieExpiry?: number; // days before showing again
  cookieName?: string;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const {
    threshold = 50,
    delay = 5000,
    cookieExpiry = 1,
    cookieName = 'exitIntentShown'
  } = options;

  const [showPopup, setShowPopup] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  // Check if popup was already shown
  const hasShownBefore = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieName}=`)) !== undefined;
  }, [cookieName]);

  // Set cookie to remember popup was shown
  const setCookie = useCallback(() => {
    if (typeof window === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (cookieExpiry * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=true; expires=${date.toUTCString()}; path=/`;
  }, [cookieName, cookieExpiry]);

  // Handle mouse leave event
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse leaves from the top and user has been on page long enough
    if (e.clientY <= threshold && timeOnPage >= delay && !hasShownBefore()) {
      setShowPopup(true);
      setCookie();
    }
  }, [threshold, delay, timeOnPage, hasShownBefore, setCookie]);

  // Handle mobile scroll to top (alternative exit intent for mobile)
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // If user scrolls back to very top quickly, consider it exit intent
    if (window.scrollY === 0 && timeOnPage >= delay && !hasShownBefore()) {
      // Add a small delay to avoid false positives
      setTimeout(() => {
        if (window.scrollY === 0) {
          setShowPopup(true);
          setCookie();
        }
      }, 500);
    }
  }, [delay, timeOnPage, hasShownBefore, setCookie]);

  // Track time on page
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Desktop: mouse leave detection
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Mobile: scroll to top detection
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseLeave, handleScroll]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const resetPopup = useCallback(() => {
    if (typeof window === 'undefined') return;
    // Remove cookie to allow popup to show again (useful for testing)
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setShowPopup(false);
  }, [cookieName]);

  return {
    showPopup,
    closePopup,
    resetPopup,
    timeOnPage
  };
};
