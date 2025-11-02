import { useState, useEffect } from 'react';

export const useExpirationCheck = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [uniqueCode, setUniqueCode] = useState<string>('');

            useEffect(() => {
  // Central timer reference so we can clear and restart when location changes
  let timer: ReturnType<typeof setInterval> | null = null;

  const runCheck = () => {
    // Clear previous timer if any
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    try {
      // Handle both hash routing and query parameters
      let encodedData: string | null = null;

      // Try hash routing first (for GitHub Pages)
      if (window.location.hash && window.location.hash.includes('?data=')) {
        const hashParams = window.location.hash.split('?data=');
        if (hashParams.length > 1) {
          encodedData = hashParams[1];
        }
      }

      // Fallback to query parameters (for local development)
      if (!encodedData && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        encodedData = urlParams.get('data');
      }

      if (!encodedData) {
        // No personalization data present
        setTimeRemaining('');
        setIsLoading(false);
        setIsExpired(false);
        setUniqueCode('');
        return;
      }

      // Decode URL-encoded base64 (some flows URL-encode the base64 payload)
      const safeBase64 = typeof encodedData === 'string' ? decodeURIComponent(encodedData) : encodedData;
      let decodedData: any = null;
      try {
        // Try standard Base64 decode
        decodedData = JSON.parse(atob(safeBase64 as string));
      } catch (err1) {
        try {
          // Try URL-safe base64 variant (replace - _ -> + /)
          const alt = (safeBase64 as string).replace(/-/g, '+').replace(/_/g, '/');
          decodedData = JSON.parse(atob(alt));
        } catch (err2) {
          try {
            // Fallback: UTF-8 safe decode (handles non-ASCII characters)
            const binary = atob(safeBase64 as string);
            const uri = Array.prototype.map
              .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('');
            decodedData = JSON.parse(decodeURIComponent(uri));
          } catch (err3) {
            console.error('Failed to decode personalization payload in expiration check:', encodedData, err3);
            setIsLoading(false);
            return;
          }
        }
      }

      const { expiration } = decodedData || {};

      if (!expiration?.expiresAt) {
        setTimeRemaining('');
        setIsLoading(false);
        return;
      }

      const expiresAt = new Date(expiration.expiresAt);
      const now = new Date();

      if (now > expiresAt) {
        setIsExpired(true);
        setTimeRemaining('0s');
        setIsLoading(false);
        return;
      }

      // Set unique code from hash or query params
      let urlCode = '';
      if (window.location.hash) {
        // Extract from hash path: #/invite/abc123
        const hashPath = window.location.hash.split('?')[0].replace('#/', '').split('/');
        urlCode = hashPath[hashPath.length - 1] || '';
      } else {
        // Extract from pathname: /invite/abc123
        urlCode = window.location.pathname.split('/').pop() || '';
      }
      setUniqueCode(urlCode || expiration.uniqueCode || '');

      // Calculate time remaining and keep updating it
      const updateTimeRemaining = () => {
        const currentNow = new Date();
        const timeDiff = expiresAt.getTime() - currentNow.getTime();

        if (timeDiff <= 0) {
          setIsExpired(true);
          setTimeRemaining('0s');
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else if (minutes > 0) {
          setTimeRemaining(`${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining(`${seconds}s`);
        }
      };

      // Initial calculation and start the interval
      updateTimeRemaining();
      setIsLoading(false);
      timer = setInterval(updateTimeRemaining, 1000);
    } catch (error) {
      console.error('Error checking expiration:', error);
      setIsLoading(false);
    }
  };

  // Run once on mount
  runCheck();

  // Re-run when hash or history changes so timers activate after redirects
  window.addEventListener('hashchange', runCheck);
  window.addEventListener('popstate', runCheck);

  // Also listen for storage changes in case logo/urls are written by another tab
  window.addEventListener('storage', runCheck);

  return () => {
    window.removeEventListener('hashchange', runCheck);
    window.removeEventListener('popstate', runCheck);
    window.removeEventListener('storage', runCheck);
    // Clear any running timer (runCheck maintains an internal timer variable)
    try {
      // nothing to do here because runCheck clears its timer on each invocation
    } catch (e) {
      // ignore
    }
  };
}, []);

  return { 
    isExpired, 
    isLoading, 
    timeRemaining, 
    uniqueCode,
    isExpiringSoon: () => {
      if (!timeRemaining) return false;
      // Consider "soon" as less than 24 hours
      return !timeRemaining.includes('d') && parseInt(timeRemaining) < 24;
    },
    isVeryUrgent: () => {
      if (!timeRemaining) return false;
      // Consider "very urgent" as less than 1 hour
      return !timeRemaining.includes('d') && !timeRemaining.includes('h') && parseInt(timeRemaining) < 60;
    },
    getSecondsRemaining: () => {
      if (!timeRemaining) return 0;
      const parts = timeRemaining.split(' ');
      const secondsPart = parts.find(part => part.includes('s'));
      return secondsPart ? parseInt(secondsPart.replace('s', '')) : 0;
    }
  };
};