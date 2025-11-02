import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URLShortener } from '@/utils/urlShortener';

export const RedirectHandler: React.FC = () => {
    const { shortCode } = useParams<{ shortCode: string }>();
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(3);
    const [redirectStatus, setRedirectStatus] = useState<string>('Procesando enlace...');

    useEffect(() => {
        if (!shortCode) {
            setError('Código corto no proporcionado');
            setIsRedirecting(false);
            return;
        }

        // Start countdown for better UX
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    setRedirectStatus('Redirigiendo...');
                    performRedirect();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const performRedirect = async () => {
            try {
                // Add persistent debug logging that survives redirect
                const debugLog = [];
                debugLog.push(`🔍 REDIRECT DEBUG: Starting redirect for shortCode: ${shortCode}`);
                debugLog.push(`🔍 REDIRECT DEBUG: Current URL: ${window.location.href}`);
                debugLog.push(`🔍 REDIRECT DEBUG: Current hash: ${window.location.hash}`);

                // Store debug info in sessionStorage to survive redirect
                try {
                    sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                    sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                    console.log('🔍 REDIRECT DEBUG: Stored debug log in sessionStorage for persistence');
                } catch (e) {
                    console.error('🔍 REDIRECT DEBUG: Failed to store debug log in sessionStorage:', e);
                }

                // DEBUG: Check localStorage state before lookup
                console.log('🔍 REDIRECT DEBUG: localStorage state before lookup:', {
                    url_mappings: localStorage.getItem('url_mappings'),
                    allKeys: Object.keys(localStorage),
                    shortCode: shortCode
                });

                // Primary lookup using utility (now async)
                console.log('🔍 REDIRECT DEBUG: Starting URL lookup for shortCode:', shortCode);
                console.log('🔍 REDIRECT DEBUG: localStorage available before lookup:', typeof localStorage !== 'undefined');

                let longUrl = await URLShortener.getLongUrl(shortCode);
                debugLog.push(`🔍 REDIRECT DEBUG: Lookup longUrl for shortCode: ${shortCode} => ${longUrl}`);
                console.log('🔍 REDIRECT DEBUG: Lookup longUrl for shortCode:', shortCode, '=>', longUrl);
                console.log('🔍 REDIRECT DEBUG: longUrl type:', typeof longUrl);
                console.log('🔍 REDIRECT DEBUG: longUrl is null:', longUrl === null);
                console.log('🔍 REDIRECT DEBUG: longUrl is undefined:', longUrl === undefined);
                
                // DEBUG: Check what URLShortener.getMappings() returns
                const allMappings = (URLShortener as any).getMappings();
                console.log('🔍 REDIRECT DEBUG: URLShortener.getMappings() returns:', allMappings);
                console.log('🔍 REDIRECT DEBUG: Mappings count:', Object.keys(allMappings || {}).length);
                console.log('🔍 REDIRECT DEBUG: ShortCode exists in mappings:', !!(allMappings || {})[shortCode]);
                
                // Store debug info in sessionStorage to survive redirect
                try {
                    sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                    sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                    console.log('🔍 REDIRECT DEBUG: Stored debug log in sessionStorage for persistence');
                } catch (e) {
                    console.error('🔍 REDIRECT DEBUG: Failed to store debug log in sessionStorage:', e);
                }

                // Fallback: direct localStorage inspection if utility returns nothing
                if (!longUrl) {
                    console.log('🔍 REDIRECT DEBUG: No longUrl found, checking localStorage fallback...');
                    try {
                        const raw = localStorage.getItem('url_mappings');
                        console.log('🔍 REDIRECT DEBUG: url_mappings raw:', raw);
                        console.log('🔍 REDIRECT DEBUG: url_mappings raw length:', raw ? raw.length : 0);
                        console.log('🔍 REDIRECT DEBUG: url_mappings is null:', raw === null);
                        
                        const mappings = raw ? JSON.parse(raw) : {};
                        console.log('🔍 REDIRECT DEBUG: parsed mappings:', mappings);
                        console.log('🔍 REDIRECT DEBUG: mappings type:', typeof mappings);
                        console.log('🔍 REDIRECT DEBUG: looking for shortCode:', shortCode, 'in mappings keys:', Object.keys(mappings));
                        console.log('🔍 REDIRECT DEBUG: shortCode in mappings keys:', Object.keys(mappings).includes(shortCode));
                        
                        if (mappings && mappings[shortCode]) {
                            longUrl = mappings[shortCode].longUrl;
                            console.log('🔍 REDIRECT DEBUG: Found direct match, longUrl:', longUrl);
                            console.log('🔍 REDIRECT DEBUG: Found mapping object:', mappings[shortCode]);
                        } else {
                            // Case-insensitive fallback
                            const foundKey = Object.keys(mappings || {}).find(k => k.toLowerCase() === (shortCode || '').toLowerCase());
                            console.log('🔍 REDIRECT DEBUG: Case-insensitive search - foundKey:', foundKey);
                            if (foundKey) {
                                longUrl = mappings[foundKey].longUrl;
                                console.log('🔍 REDIRECT DEBUG: Found case-insensitive match:', foundKey, 'longUrl:', longUrl);
                            }
                        }
                        console.log('🔍 REDIRECT DEBUG: Fallback localStorage lookup result for', shortCode, '=>', longUrl);
                        console.log('🔍 REDIRECT DEBUG: Final longUrl type:', typeof longUrl);
                        console.log('🔍 REDIRECT DEBUG: Final longUrl is null:', longUrl === null);
                    } catch (lookupError) {
                        console.error('🔍 REDIRECT DEBUG: Fallback mapping lookup failed:', lookupError);
                        console.error('🔍 REDIRECT DEBUG: Error name:', lookupError.name);
                        console.error('🔍 REDIRECT DEBUG: Error message:', lookupError.message);
                    }
                }

                // Add debugging to confirm if longUrl is found
                console.log('🔍 REDIRECT DEBUG: About to check if longUrl exists:', !!longUrl);
                console.log('🔍 REDIRECT DEBUG: longUrl value:', longUrl);
                console.log('🔍 REDIRECT DEBUG: longUrl type:', typeof longUrl);

                if (!longUrl) {
                    console.error('🔍 REDIRECT DEBUG: CRITICAL - No longUrl found for shortCode:', shortCode);
                    console.error('🔍 REDIRECT DEBUG: This means data extraction will NOT happen');
                    
                    // Show all available mappings for debugging
                    const allMappings = (URLShortener as any).getMappings();
                    console.error('🔍 REDIRECT DEBUG: Available mappings:', allMappings);
                    console.error('🔍 REDIRECT DEBUG: Available shortCodes:', Object.keys(allMappings));
                }

                if (longUrl) {
                    // Defer navigation to the next macrotask to avoid React "setState in render" warnings
                    console.log('🔍 REDIRECT DEBUG: Scheduling redirect to:', longUrl);
                    console.log('🔍 REDIRECT DEBUG: longUrl length:', longUrl.length);
                    console.log('🔍 REDIRECT DEBUG: longUrl contains data parameter:', longUrl.includes('?data='));
                    
                    setTimeout(() => {
                        try {
                            setRedirectStatus('Procesando datos...');
                            const isSameOrigin = longUrl.startsWith(window.location.origin);
                            const hashIndex = longUrl.indexOf('#');

                            console.log('🔍 REDIRECT DEBUG: longUrl=', longUrl);
                            console.log('🔍 REDIRECT DEBUG: isSameOrigin=', isSameOrigin, 'hashIndex=', hashIndex);

                            if (isSameOrigin && hashIndex !== -1) {
                                // Extract the part after the "#" (e.g. /invite/abc?data=...)
                                const hashPart = longUrl.substring(hashIndex + 1);
                                console.log('🔍 REDIRECT DEBUG: Extracted hashPart:', hashPart);
                                console.log('🔍 REDIRECT DEBUG: hashPart length:', hashPart.length);
                                console.log('🔍 REDIRECT DEBUG: hashPart contains ?data=:', hashPart.includes('?data='));
                                console.log('Using hash navigation for internal invite route:', hashPart);
    
                                // If the hash contains a data= payload, extract and persist it to localStorage
                                // so the SPA can read it reliably on initial mount. We write it under a short-lived
                                // key and remove it after the provider parses it.
                                try {
                                    console.log('🔍 REDIRECT DEBUG: Starting data extraction from hashPart:', hashPart);
                                    
                                    const qIndex = hashPart.indexOf('?');
                                    console.log('🔍 REDIRECT DEBUG: qIndex result:', qIndex);
                                    
                                    if (qIndex !== -1) {
                                        const pathOnly = hashPart.substring(0, qIndex); // /invite/abc
                                        const queryString = hashPart.substring(qIndex + 1); // data=...
                                        console.log('🔍 REDIRECT DEBUG: Extracted pathOnly=', pathOnly, 'queryString=', queryString);
                                        
                                        const params = new URLSearchParams(queryString);
                                        console.log('🔍 REDIRECT DEBUG: URLSearchParams created, params count:', params.toString().split('&').length);
                                        
                                        const encodedData = params.get('data');
                                        console.log('🔍 REDIRECT DEBUG: encodedData extracted:', encodedData ? `(len=${encodedData.length})` : null);
                                        console.log('🔍 REDIRECT DEBUG: encodedData preview:', encodedData ? encodedData.substring(0, 100) + '...' : 'null');
    
                                        if (encodedData) {
                                            console.log('🔍 REDIRECT DEBUG: About to store encoded personalization payload');
                                                console.log('🔍 REDIRECT DEBUG: localStorage available before storage:', typeof localStorage !== 'undefined');
                                                console.log('🔍 REDIRECT DEBUG: localStorage quota used:', JSON.stringify(localStorage).length, 'bytes');
                                                
                                                try {
                                                    // Verbose debug: record intent and preview before persisting
                                                    console.debug('🔍 REDIRECT DEBUG: Persisting incoming_personalization_payload. payload_len=', encodedData ? encodedData.length : 0, 'preview=', encodedData ? encodedData.substring(0,100) : null, 'location=', window.location.href);
                                                    
                                                    // Ensure we store the exact raw string the provider expects.
                                                    // Some storage backends store URL-encoded values; preserve as-is.
                                                    localStorage.setItem('incoming_personalization_payload', encodedData);
                                                    
                                                    // Mark which component wrote the payload for troubleshooting races
                                                    try {
                                                        // writer marker will be set after verification (moved later)
                                                    } catch (writerErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to write incoming_personalization_writer marker:', writerErr);
                                                    }
                                                    
                                                    console.log('🔍 REDIRECT DEBUG: localStorage.setItem completed');
                                                    console.debug('incoming_personalization_payload set (len=', encodedData ? encodedData.length : 0, ')', 'writer=', localStorage.getItem('incoming_personalization_writer'));
                                                    
                                                    // Verify data was stored successfully before proceeding
                                                    const verifyStored = localStorage.getItem('incoming_personalization_payload');
                                                    const writerMarker = localStorage.getItem('incoming_personalization_writer');
                                                    console.log('🔍 REDIRECT DEBUG: Verification - stored data length:', verifyStored ? verifyStored.length : 0, 'writer:', writerMarker);
                                                    console.log('🔍 REDIRECT DEBUG: Verification - data matches:', verifyStored === encodedData);
                                                    
                                                    if (!verifyStored || verifyStored !== encodedData) {
                                                        console.error('🔍 REDIRECT DEBUG: FAILED TO VERIFY STORED PERSONALIZATION PAYLOAD');
                                                        console.error('🔍 REDIRECT DEBUG: Expected length:', encodedData ? encodedData.length : 0, 'Got length:', verifyStored ? verifyStored.length : 0, 'writer:', writerMarker);
                                                        setError('Error al procesar el enlace - datos no guardados');
                                                        setIsRedirecting(false);
                                                        return;
                                                    }
                                                    console.debug('Verified personalization payload stored successfully');

                                                    // Write writer marker AFTER successful verification to avoid writer-only races
                                                    try {
                                                        localStorage.setItem('incoming_personalization_writer', `redirectHandler:${Date.now()}`);
                                                        console.debug('🔍 REDIRECT DEBUG: incoming_personalization_writer set (post-verify):', localStorage.getItem('incoming_personalization_writer'));
                                                    } catch (writerErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to write incoming_personalization_writer marker after verify:', writerErr);
                                                    }
        
                                                    // Also store a marker indicating when we wrote it for debugging and expiry handling
                                                    const timestamp = String(Date.now());
                                                    try {
                                                        localStorage.setItem('incoming_personalization_payload_ts', timestamp);
                                                        console.log('🔍 REDIRECT DEBUG: Timestamp stored:', timestamp);
                                                    } catch (tsErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to store timestamp marker:', tsErr);
                                                    }
                                                    // Handshake: notify the SPA immediately that payload was written so the provider
                                                    // can process it without waiting for the polling window.
                                                    try {
                                                        const evt = new CustomEvent('incoming_personalization_written', { detail: { writer: localStorage.getItem('incoming_personalization_writer'), ts: timestamp } });
                                                        window.dispatchEvent(evt);
                                                        console.debug('🔍 REDIRECT DEBUG: dispatched incoming_personalization_written event', evt.detail);
                                                    } catch (evtErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to dispatch incoming_personalization_written event', evtErr);
                                                    }
                                                    
                                                    // Final verification - read back all stored data
                                                    const finalCheck = localStorage.getItem('incoming_personalization_payload');
                                                    console.log('🔍 REDIRECT DEBUG: FINAL CHECK - Data in localStorage:', !!finalCheck, 'length:', finalCheck ? finalCheck.length : 0, 'writer:', localStorage.getItem('incoming_personalization_writer'));
                                                    
                                                    // Update persistent debug log with writer info
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage SUCCESS - length: ${encodedData ? encodedData.length : 0} writer:${writerMarker}`);
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Verification PASSED - timestamp:${timestamp}`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                        console.log('🔍 REDIRECT DEBUG: Updated debug log in sessionStorage after successful storage (with writer marker)');
                                                    } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage after storage success:', e);
                                                    }
                                                    // Store debug info in sessionStorage to survive redirect
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage SUCCESS - length: ${encodedData.length}`);
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Final verification PASSED`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                        console.log('🔍 REDIRECT DEBUG: Updated debug log in sessionStorage after successful storage');
                                                    } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage:', e);
                                                    }
                                                    
                                                } catch (lsErr) {
                                                    console.error('🔍 REDIRECT DEBUG: FAILED TO PERSIST INCOMING PAYLOAD:', lsErr);
                                                    console.error('🔍 REDIRECT DEBUG: Error name:', lsErr.name);
                                                    console.error('🔍 REDIRECT DEBUG: Error message:', lsErr.message);
                                                    
                                                    // Store error info in sessionStorage to survive redirect
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage FAILED - error: ${lsErr.message}`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                        console.log('🔍 REDIRECT DEBUG: Updated debug log in sessionStorage after storage failure');
                                                    } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage:', e);
                                                    }
                                                    
                                                    setError('Error al procesar el enlace - fallo de almacenamiento');
                                                    setIsRedirecting(false);
                                                    return;
                                                }
    
                                            // Navigate to the invite path without relying on query parsing quirks
                                            try {
                                                setRedirectStatus('Redirigiendo a página personalizada...');
                                                // Replace the hash without a full reload so the SPA handles the navigation
                                                // and the PersonalizationProvider can parse the payload reliably.
                                                history.replaceState(null, '', '#' + pathOnly);
                                                window.dispatchEvent(new Event('hashchange'));
                                                console.debug('🔍 REDIRECT DEBUG: replaced hash without reload:', '#' + pathOnly);
                                            } catch (hErr) {
                                                console.warn('🔍 REDIRECT DEBUG: hash replace failed, falling back to reload', hErr);
                                                window.location.hash = pathOnly;
                                                // Increased delay to ensure localStorage is properly written before reload
                                                setTimeout(() => window.location.reload(), 200);
                                            }
                                            return;
                                        } else {
                                            console.debug('No encodedData found in hashPart queryString');
                                        }
                                    } else {
                                        console.debug('No query string found in hashPart; hashPart=', hashPart);
                                    }
                                } catch (extractErr) {
                                    console.warn('Failed extracting data from hashPart, falling back to hash navigation:', extractErr);
                                }
                                
                                // Fallback: Check if data was passed directly in URL parameters
                                console.debug('No query string found in hashPart; checking for direct data access');
                                
                                const urlParams = new URLSearchParams(window.location.search);
                                const directData = urlParams.get('data');
                                
                                if (directData) {
                                    console.log('🔍 REDIRECT DEBUG: Found direct data in URL parameters');
                                    try {
                                        localStorage.setItem('incoming_personalization_payload', directData);
                                        const timestamp = String(Date.now());
                                        localStorage.setItem('incoming_personalization_payload_ts', timestamp);
                                        console.log('🔍 REDIRECT DEBUG: Stored direct data successfully');
                                    } catch (err) {
                                        console.error('🔍 REDIRECT DEBUG: Failed to store direct data:', err);
                                    }
                                }
    
                                // If no data payload found or extraction failed, set the full hash and reload.
                                try {
                                    history.replaceState(null, '', '#' + hashPart);
                                    window.dispatchEvent(new Event('hashchange'));
                                    console.debug('🔍 REDIRECT DEBUG: replaced hash without reload:', '#' + hashPart);
                                } catch (hErr) {
                                    console.warn('🔍 REDIRECT DEBUG: hash replace failed, falling back to set hash and reload', hErr);
                                    window.location.hash = hashPart;
                                    setTimeout(() => window.location.reload(), 50);
                                }
                            } else {
                                // External or non-hash URL - use replace
                                window.location.replace(longUrl);
                            }
                        } catch (navErr) {
                            console.warn('Primary navigation failed, falling back to replace:', navErr);
                            window.location.replace(longUrl);
                        }
                    }, 0);
                } else {
                    setError('Enlace expirado o inválido');
                    setIsRedirecting(false);
                }
            } catch (error) {
                console.error('Error during redirect:', error);
                setError('Error al procesar el enlace');
                setIsRedirecting(false);
            }
        };

        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [shortCode]);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleTryAgain = () => {
        window.location.reload();
    };

    if (isRedirecting) {
        return (
            <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-6"></div>
                        <h1 className="text-3xl font-bold text-white mb-2">Redirigiendo...</h1>
                        <p className="text-white/80 text-lg mb-4">
                            {countdown > 0 ? (
                                <>Serás redirigido en <span className="text-accent font-bold text-2xl">{countdown}</span> segundos</>
                            ) : (
                                <>Redirigiendo ahora...</>
                            )}
                        </p>
                        <p className="text-white/60 text-sm">
                            Por favor espera mientras procesamos tu enlace personalizado.
                        </p>
                    </div>
                    
                    <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
                        <h2 className="text-lg font-semibold text-white mb-3">📊 Información del Enlace</h2>
                        <div className="space-y-2 text-left">
                            <p className="text-white/80 text-sm">
                                <span className="font-medium">Código:</span> {shortCode}
                            </p>
                            <p className="text-white/80 text-sm">
                                <span className="font-medium">Estado:</span>
                                <span className="text-accent"> {redirectStatus}</span>
                            </p>
                            <p className="text-white/60 text-xs mt-3">
                                Los enlaces personalizados expiran después de un tiempo por seguridad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-red-400 mb-2">Error de Enlace</h1>
                        <p className="text-white/80 text-lg mb-4">{error}</p>
                        
                        <div className="space-y-3 text-left bg-black/20 rounded-lg p-4">
                            <h3 className="text-white font-medium mb-2">Posibles razones:</h3>
                            <ul className="text-white/70 text-sm space-y-1">
                                <li>• El enlace ha expirado (vigencia de 72 horas)</li>
                                <li>• El código es incorrecto o está dañado</li>
                                <li>• El enlace ya fue utilizado</li>
                                <li>• Problemas técnicos temporales</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <button
                            onClick={handleTryAgain}
                            className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium"
                        >
                            🔄 Intentar de nuevo
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
                        >
                            🏠 Ir a la página principal
                        </button>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            ¿Necesitas ayuda? Contacta a soporte para generar un nuevo enlace personalizado.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default RedirectHandler;