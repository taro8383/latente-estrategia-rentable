import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URLShortener } from '@/utils/urlShortener';

interface RedirectHandlerProps {
  navigate: (path: string, options?: { replace?: boolean }) => void;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({ navigate }) => {
    const { shortCode } = useParams<{ shortCode: string }>();
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

        const performRedirect = async () => {
            try {
                // Clear any existing personalization data that might interfere with fresh processing
                try {
                    const existingPayload = localStorage.getItem('incoming_personalization_payload');
                    if (existingPayload) {
                        localStorage.removeItem('incoming_personalization_payload');
                        localStorage.removeItem('personalization_active');
                    }
                } catch (e) {
                    console.warn('🔍 REDIRECT DEBUG: Failed to clear existing data:', e);
                }

                // Add persistent debug logging that survives redirect
                const debugLog = [];
                debugLog.push(`🔍 REDIRECT DEBUG: Starting redirect for shortCode: ${shortCode}`);
                debugLog.push(`🔍 REDIRECT DEBUG: Current URL: ${window.location.href}`);
                debugLog.push(`🔍 REDIRECT DEBUG: Current hash: ${window.location.hash}`);

                // Store debug info in sessionStorage to survive redirect
                try {
                    sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                    sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                  } catch (e) {
                    console.error('🔍 REDIRECT DEBUG: Failed to store debug log in sessionStorage:', e);
                }

  
                // Try to get mapping from GitHub-hosted JSON file first
                let longUrl = null;
                try {
                    // Get the base URL to construct the mappings file URL
                    let mappingsUrl;
                    if (window.location.hostname.includes('github.io')) {
                        const pathname = window.location.pathname;
                        const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
                        const repoName = pathSegments.length > 0 ? pathSegments[0] : '';
                        mappingsUrl = `https://${window.location.hostname}/${repoName}/url-mappings.json`;
                    } else {
                        // Local development or other hosting
                        mappingsUrl = `${window.location.origin}/url-mappings.json`;
                    }

    
                    const response = await fetch(mappingsUrl);
                    if (response.ok) {
                        const mappingsData = await response.json();
                        // Look for the short code in mappings
                        if (mappingsData.mappings && mappingsData.mappings[shortCode]) {
                            const mapping = mappingsData.mappings[shortCode];

                            // Check if mapping has expired
                            if (Date.now() <= mapping.expiresAt) {
                                longUrl = mapping.longUrl;
                            } else {
                                debugLog.push(`Mapping expired for shortCode: ${shortCode}`);
                            }
                        } else {
                            debugLog.push(`Short code not found: ${shortCode}`);
                        }
                    } else {
                        debugLog.push(`Failed to fetch mappings: ${response.status}`);
                    }
                } catch (error) {
                    console.error('🔍 REDIRECT DEBUG: Error fetching mappings:', error);
                    debugLog.push(`🔍 REDIRECT DEBUG: Error fetching mappings: ${error.message}`);
                }

                // REMOVED: localStorage fallback for cross-device compatibility
                // The system must use server-side storage (GitHub JSON) only
                // localStorage is browser-specific and breaks cross-device functionality

                // Update debug log
                try {
                    sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                    sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                } catch (e) {
                    console.error('🔍 REDIRECT DEBUG: Failed to update debug log:', e);
                }

                if (!longUrl) {
                    console.error('🔍 REDIRECT DEBUG: CRITICAL - No longUrl found for shortCode:', shortCode);
                    console.error('🔍 REDIRECT DEBUG: This means data extraction will NOT happen');
                    console.error('🔍 REDIRECT DEBUG: POSSIBLE CAUSES:');
                    console.error('  1. GitHub Actions workflow failed to run');
                    console.error('  2. URL-mappings.json file does not exist or is not accessible');
                    console.error('  3. The shortCode does not exist in the server-side storage');
                    console.error('  4. The mapping has expired');
                    debugLog.push(`🔍 REDIRECT DEBUG: CRITICAL - No mapping found for: ${shortCode}`);
                    debugLog.push(`🔍 REDIRECT DEBUG: CHECK GITHUB ACTIONS WORKFLOW STATUS`);

                    // Update debug log one final time
                    try {
                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                    } catch (e) {
                        console.error('🔍 REDIRECT DEBUG: Failed to update final debug log:', e);
                    }
                }

                if (longUrl) {
                    // Defer navigation to the next macrotask to avoid React "setState in render" warnings
                    
                    setTimeout(() => {
                        try {
                            setRedirectStatus('Procesando datos...');
                            const isSameOrigin = longUrl.startsWith(window.location.origin);
                            const hashIndex = longUrl.indexOf('#');

                            if (isSameOrigin && hashIndex !== -1) {
                                // Extract the part after the "#" (e.g. /invite/abc?data=...)
                                const hashPart = longUrl.substring(hashIndex + 1);
                                console.log('Using hash navigation for internal invite route:', hashPart);
    
                                // If the hash contains a data= payload, extract and persist it to localStorage
                                // so the SPA can read it reliably on initial mount. We write it under a short-lived
                                // key and remove it after the provider parses it.
                                try {
                                    const qIndex = hashPart.indexOf('?');

                                    if (qIndex !== -1) {
                                        const pathOnly = hashPart.substring(0, qIndex); // /invite/abc
                                        const queryString = hashPart.substring(qIndex + 1); // data=...

                                        const params = new URLSearchParams(queryString);

                                        const encodedData = params.get('data');
    
                                        if (encodedData) {
                                            console.log('About to store encoded personalization payload');
                                                
                                                try {
                                                    
                                                    // Ensure we store the exact raw string the provider expects.
                                                    // Some storage backends store URL-encoded values; preserve as-is.
                                                    localStorage.setItem('incoming_personalization_payload', encodedData);
                                                    
                                                    // Mark which component wrote the payload for troubleshooting races
                                                    try {
                                                        // writer marker will be set after verification (moved later)
                                                    } catch (writerErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to write incoming_personalization_writer marker:', writerErr);
                                                    }
                                                    
                                                    console.log('Personalization payload stored successfully');
                                                    
                                                    // Verify data was stored successfully before proceeding
                                                    const verifyStored = localStorage.getItem('incoming_personalization_payload');
                                                    const writerMarker = localStorage.getItem('incoming_personalization_writer');
                                                                                                
                                                    if (!verifyStored || verifyStored !== encodedData) {
                                                        console.error('FAILED TO VERIFY STORED PERSONALIZATION PAYLOAD');
                                                        setError('Error al procesar el enlace - datos no guardados');
                                                        setIsRedirecting(false);
                                                        return;
                                                    }
                                              
                                                    // Write writer marker AFTER successful verification to avoid writer-only races
                                                    try {
                                                        localStorage.setItem('incoming_personalization_writer', `redirectHandler:${Date.now()}`);
                                                                                                    } catch (writerErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to write incoming_personalization_writer marker after verify:', writerErr);
                                                    }
        
                                                    // Also store a marker indicating when we wrote it for debugging and expiry handling
                                                    const timestamp = String(Date.now());
                                                    try {
                                                        localStorage.setItem('incoming_personalization_payload_ts', timestamp);
                                                                                                      } catch (tsErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to store timestamp marker:', tsErr);
                                                    }
                                                    // Handshake: notify the SPA immediately that payload was written so the provider
                                                    // can process it without waiting for the polling window.
                                                    try {
                                                        const evt = new CustomEvent('incoming_personalization_written', { detail: { writer: localStorage.getItem('incoming_personalization_writer'), ts: timestamp } });
                                                        window.dispatchEvent(evt);
                                                                                                        } catch (evtErr) {
                                                        console.warn('🔍 REDIRECT DEBUG: Failed to dispatch incoming_personalization_written event', evtErr);
                                                    }
                                                    
                                                    // Final verification - read back all stored data
                                                    const finalCheck = localStorage.getItem('incoming_personalization_payload');
                                                                                                  
                                                    // Update persistent debug log with writer info
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage SUCCESS - length: ${encodedData ? encodedData.length : 0} writer:${writerMarker}`);
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Verification PASSED - timestamp:${timestamp}`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                                                                    } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage after storage success:', e);
                                                    }
                                                    // Store debug info in sessionStorage to survive redirect
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage SUCCESS - length: ${encodedData.length}`);
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Final verification PASSED`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                                                                      } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage:', e);
                                                    }
                                                    
                                                } catch (lsErr) {
                                                    console.error('FAILED TO PERSIST INCOMING PAYLOAD:', lsErr);
                                                    
                                                    // Store error info in sessionStorage to survive redirect
                                                    try {
                                                        debugLog.push(`🔍 REDIRECT DEBUG: Data storage FAILED - error: ${lsErr.message}`);
                                                        sessionStorage.setItem('redirect_debug_log', JSON.stringify(debugLog));
                                                        sessionStorage.setItem('redirect_debug_timestamp', String(Date.now()));
                                                                                                        } catch (e) {
                                                        console.error('🔍 REDIRECT DEBUG: Failed to update debug log in sessionStorage:', e);
                                                    }
                                                    
                                                    setError('Error al procesar el enlace - fallo de almacenamiento');
                                                    setIsRedirecting(false);
                                                    return;
                                                }
    
                                            // Data successfully stored - now perform the hash change to the invite route
                                            try {
                                                setRedirectStatus('Redirigiendo a página personalizada...');
                                                console.debug('Data stored successfully - performing navigation to invite route');

                                                // Perform the navigation to the invite route using React Router
                                                // The personalization data is already in localStorage, so no parsing loop
                                                navigate(pathOnly, { replace: true });

                                                // Set isRedirecting to false after the navigation
                                                setTimeout(() => {
                                                    setIsRedirecting(false);
                                                                                                }, 100);
                                            } catch (hErr) {
                                                console.warn('🔍 REDIRECT DEBUG: Final redirect handling failed:', hErr);
                                                setIsRedirecting(false);
                                                                                          }
                                            return;
                                        } else {
                                                                                    }
                                    } else {
                                                                            }
                                } catch (extractErr) {
                                    console.warn('Failed extracting data from hashPart, falling back to hash navigation:', extractErr);
                                }
                                
                                // Fallback: Check if data was passed directly in URL parameters
                                                                
                                const urlParams = new URLSearchParams(window.location.search);
                                const directData = urlParams.get('data');
                                
                                if (directData) {
                                                                    try {
                                        localStorage.setItem('incoming_personalization_payload', directData);
                                        const timestamp = String(Date.now());
                                        localStorage.setItem('incoming_personalization_payload_ts', timestamp);
                                                                            } catch (err) {
                                        console.error('🔍 REDIRECT DEBUG: Failed to store direct data:', err);
                                    }
                                }
    
                                // If no data payload found or extraction failed, navigate to the full URL.
                                try {
                                    navigate('/' + hashPart, { replace: true });
                                                                    } catch (hErr) {
                                    console.warn('🔍 REDIRECT DEBUG: navigation failed, falling back to direct hash change', hErr);
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
                            <h3 className="text-white font-medium mb-2">Causas posibles:</h3>
                            <ul className="text-white/70 text-sm space-y-1">
                                <li>• El enlace ha expirado (vigencia de 72 horas)</li>
                                <li>• El sistema de almacenamiento no está disponible temporalmente</li>
                                <li>• El código es incorrecto o está dañado</li>
                                <li>• El enlace ya fue utilizado</li>
                                <li>• Problemas técnicos temporales en el servidor</li>
                            </ul>
                            <div className="mt-3 p-2 bg-red-500/10 rounded border border-red-500/30">
                                <p className="text-red-300 text-xs font-medium">💡 NOTA: Los enlaces funcionan en cualquier dispositivo. Si funciona en un navegador pero no en otro, espere 1-2 minutos para que los servidores se sincronicen.</p>
                            </div>
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