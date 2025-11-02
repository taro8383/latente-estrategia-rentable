import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PersonalizationData, PersonalizationContextType } from '@/types/personalization';
import { VariableReplacer } from '@/utils/variableReplacer';
import { useExpirationCheck } from '@/hooks/useExpirationCheck';
import { LogoStorage } from '@/utils/logoStorage';

const PersonalizationContext = createContext<PersonalizationContextType | null>(null);

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};

interface PersonalizationProviderProps {
  children: ReactNode;
}

// State synchronization mechanism to prevent race conditions
let personalizationReady = false;
let personalizationReadyCallbacks: (() => void)[] = [];

// Function to register callbacks that should be called when personalization is ready
export const onPersonalizationReady = (callback: () => void) => {
  // If personalization is already ready, invoke immediately to avoid missed notifications
  if (personalizationReady) {
    try {
      callback();
    } catch (err) {
      console.error('onPersonalizationReady callback error:', err);
    }
    return;
  }
  personalizationReadyCallbacks.push(callback);
};

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ children }) => {
  const [data, setData] = useState<PersonalizationData>({});
  const [replacer, setReplacer] = useState<VariableReplacer | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { isExpired, isLoading, timeRemaining, uniqueCode } = useExpirationCheck();

  useEffect(() => {
    // Shortened retry window for faster perceived redirects.
    // This keeps robustness but reduces waiting from ~1.2s to ~300ms.
    const RETRY_MAX_ATTEMPTS = 6;
    const RETRY_INTERVAL_MS = 50;
    const parsePersonalizationData = () => {
      try {
        // Handle both hash routing and query parameters
        let encodedData = null;

        // Try hash routing first (for GitHub Pages)
        // Note: RedirectHandler may persist a payload into localStorage under
        // 'incoming_personalization_payload' and navigate to the invite path without the ?data
        // query. We attempt decoding from hash/search first, then fall back to that localStorage key.
        let usedIncomingPayload = false;
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

        // Helper: process an encoded payload string (from URL or localStorage fallback)
        const processEncodedPayload = (payload: string, usedFallback: boolean) => {
          try {
            if (!payload) {
              console.warn('processEncodedPayload called with empty payload');
              return;
            }
            // mark whether we used the fallback so we can clear it later
            usedIncomingPayload = usedFallback;
            // Best-effort safe decode pipeline:
            let safeBase64: string | null = null;
            try {
              safeBase64 = decodeURIComponent(payload);
            } catch (uriErr) {
              safeBase64 = payload;
            }

            let parsedData: PersonalizationData | null = null;

            // 1) UTF-8 safe decode (atob -> percent-escape -> decodeURIComponent)
            try {
              const binary = atob(safeBase64 as string);
              const uri = Array.prototype.map
                .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('');
              parsedData = JSON.parse(decodeURIComponent(uri));
            } catch (utfErr) {

              // 2) URL-safe base64 variant (replace - _ -> + /)
              try {
                const alt = (safeBase64 as string).replace(/-/g, '+').replace(/_/g, '/');
                parsedData = JSON.parse(atob(alt));
              } catch (urlErr) {
                // 3) Plain atob
                try {
                  parsedData = JSON.parse(atob(safeBase64 as string));
                } catch (plainErr) {
                  console.error('Failed to decode personalization payload (all strategies):', payload, plainErr);
                  parsedData = null;
                }
              }
            }

            if (!parsedData) {
              console.warn('Could not parse personalization payload, aborting parse');
              setReplacer(new VariableReplacer({}));
              setIsPersonalized(false);
              return;
            }

            // Handle logo retrieval: accept either a direct base64, companyLogoId or legacy logoId
            // Defer logo lookup so we don't block the initial render.
            let deferredLogoCandidate: string | null = null;
            if ((parsedData as any).companyLogo) {
            } else {
              deferredLogoCandidate =
                (parsedData as any).companyLogoId ||
                (parsedData as any).logoId ||
                (parsedData as any).logoIdLegacy ||
                null;
              if (!deferredLogoCandidate) {
                // Clean up legacy keys if none present
                delete (parsedData as any).companyLogoId;
                delete (parsedData as any).logoId;
                delete (parsedData as any).logoIdLegacy;
              }
            }

            // Validate data structure
            if (parsedData && typeof parsedData === 'object' && parsedData !== null) {
              const hasRequiredFields = parsedData.readerInfo || parsedData.brandInfo || parsedData.customMessages;
              if (!hasRequiredFields) {
                console.warn('Personalization data missing required structure, but proceeding anyway');
              }
              setData(parsedData);
              const newReplacer = new VariableReplacer(parsedData);
              setReplacer(newReplacer);
              setIsPersonalized(true);

              // Optimized: Use object URLs for instant rendering instead of base64 decoding
              if (typeof deferredLogoCandidate === 'string' && deferredLogoCandidate) {
                  // Try to get object URL first for instant rendering
                  const objectUrl = LogoStorage.getLogo(deferredLogoCandidate as string);
                  if (objectUrl && objectUrl.startsWith('blob:')) {
                    setData(prev => ({ ...(prev as any), companyLogo: objectUrl, companyLogoId: deferredLogoCandidate }));
                  } else if (objectUrl && objectUrl.startsWith('data:')) {
                    // Object URL not available, but we have base64 - use it directly
                    setData(prev => ({ ...(prev as any), companyLogo: objectUrl, companyLogoId: deferredLogoCandidate }));
                  } else {
                    // No logo data available at all
                    console.warn('No logo data found for:', deferredLogoCandidate);
                  }
                }

              try {
                sessionStorage.setItem('personalization_active', '1');
                sessionStorage.setItem('personalization_active_expires', String(Date.now() + 15000)); // 15s
                const currentHash = window.location.hash || '#/';
                localStorage.setItem('last_good_hash', currentHash);

                personalizationReady = true;
                personalizationReadyCallbacks.forEach(callback => {
                  try {
                    callback();
                  } catch (err) {
                    console.error('Error in personalization ready callback:', err);
                  }
                });
                personalizationReadyCallbacks.length = 0;
              } catch (sessErr) {
                console.warn('Could not set personalization active session markers', sessErr);
              }

              // If we consumed the RedirectHandler fallback, remove it to avoid reuse
              try {
                if (usedIncomingPayload) {
                  localStorage.removeItem('incoming_personalization_payload');
                }
              } catch (rmErr) {
                console.warn('Failed to remove incoming_personalization_payload', rmErr);
              }

            } else {
              console.warn('Invalid personalization data structure');
              setReplacer(new VariableReplacer({}));
              setIsPersonalized(false);
            }
          } catch (procErr) {
            console.error('Error processing encoded payload', procErr);
            setReplacer(new VariableReplacer({}));
            setIsPersonalized(false);
          }
        };

        // Final fallback: RedirectHandler may have stored the encoded payload in localStorage
        // under 'incoming_personalization_payload' to avoid timing issues with hash parsing.
        if (!encodedData) {
          // If RedirectHandler attempted to write a payload it will set a writer marker.
          // Fast path: check once immediately and otherwise rely on the incoming_personalization_written
          // event dispatched by RedirectHandler to re-run parsing. This avoids visible delay caused
          // by long polling while keeping a reliable handshake.
          try {
            const writer = localStorage.getItem('incoming_personalization_writer');
            const ts = localStorage.getItem('incoming_personalization_payload_ts');
            console.debug('🔍 PERSONALIZATION DEBUG: No encodedData from URL. writer marker:', writer, 'ts:', ts);
          } catch (dbgErr) {
            console.debug('🔍 PERSONALIZATION DEBUG: unable to read writer marker', dbgErr);
          }

          try {
            const incoming = localStorage.getItem('incoming_personalization_payload');
            if (incoming) {
              processEncodedPayload(incoming, true);
              return;
            }
          } catch (e) {
            console.warn('🔍 PERSONALIZATION DEBUG: error reading incoming_personalization_payload in fast path', e);
          }

          // Do not start long polling; return and wait for incoming_personalization_written event to trigger parse.
          return;
        }

        // If we have encodedData from url/hash, process it synchronously
        if (encodedData) {
          processEncodedPayload(encodedData, false);
        }
      } catch (error) {
        console.error('Error parsing personalization data:', error);
        // Fallback to defaults
        setReplacer(new VariableReplacer({}));
        setIsPersonalized(false);
      }
    };

    const onHashChange = () => {

      // Guard: if personalization was just loaded (short-lived), prevent noisy navigation
      // to the generic /invitation-required route which causes the personalized page to flash and disappear.
      try {
        const active = sessionStorage.getItem('personalization_active');
        const expiry = Number(sessionStorage.getItem('personalization_active_expires') || '0');
        const now = Date.now();
        if (active && now < expiry) {
          if (window.location.hash.includes('/invitation-required')) {
            const last = localStorage.getItem('last_good_hash') || '';
            console.warn('Preventing navigation to /invitation-required because personalization is active. Restoring last_good_hash=', last);
            if (last) {
              // Replace the hash without adding a new history entry
              history.replaceState(null, '', last);
            }
            return;
          }
        }
      } catch (guardErr) {
        console.warn('Hash-change guard failed', guardErr);
      }

      if (!isLoading) parsePersonalizationData();
    };

    if (!isLoading) {
      parsePersonalizationData();

      // Set personalization as ready after initial parse attempt
      // This prevents infinite loops when there's no data to parse
      // If we're landing via a short URL (hash starting with #/r/) allow a longer grace period
      const readyTimeout = (window.location.hash && window.location.hash.startsWith('#/r/'))
        ? 2000
        : (RETRY_MAX_ATTEMPTS * RETRY_INTERVAL_MS + 100);
  
      setTimeout(() => {
        if (!personalizationReady) {
          personalizationReady = true;
  
          // Notify any waiting callbacks
          personalizationReadyCallbacks.forEach(callback => {
            try {
              callback();
            } catch (err) {
              console.error('Error in personalization ready callback:', err);
            }
          });
  
          // Clear callbacks after notification
          personalizationReadyCallbacks.length = 0;
        }
      }, readyTimeout); // Wait for retry window before marking ready
    } else {
    }

    // Listen for incoming_personalization_written events dispatched by RedirectHandler
    // so we can immediately re-run parsing without waiting for the polling window.
    const onIncomingWritten = () => {
      try {
        console.debug('🔍 PERSONALIZATION DEBUG: incoming_personalization_written event received - re-running parse');
        // Re-run the parsing flow which will check URL and localStorage and process payload if present.
        parsePersonalizationData();
      } catch (e) {
        console.warn('🔍 PERSONALIZATION DEBUG: incoming_personalization_written handler error', e);
      }
    };

    window.addEventListener('incoming_personalization_written', onIncomingWritten);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('incoming_personalization_written', onIncomingWritten);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [isLoading]);

  const value: PersonalizationContextType = {
    data,
    replacer: replacer || new VariableReplacer({}),
    isPersonalized,
    isExpired,
    timeRemaining,
    isLoading,
    uniqueCode,
    gender: data.genderInfo?.gender,
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

  // Show loading state while checking expiration
  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-white/90">Verificando tu invitación...</p>
        </div>
      </div>
    );
  }

  // Show expired state - don't return null, let router handle redirect
  // This prevents blank page when expired

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};