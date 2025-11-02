import React, { useEffect, useState } from 'react';

export const DebugDisplay: React.FC = () => {
    const [debugLog, setDebugLog] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check for debug log in sessionStorage (not localStorage - it survives redirects)
        const storedLog = sessionStorage.getItem('redirect_debug_log');
        if (storedLog) {
            try {
                const parsed = JSON.parse(storedLog);
                setDebugLog(Array.isArray(parsed) ? parsed : [parsed]);
            } catch (e) {
                console.error('Failed to parse debug log:', e);
            }
        }

        // Check for personalization data
        const personalizationData = localStorage.getItem('incoming_personalization_payload');
        const timestamp = localStorage.getItem('incoming_personalization_payload_ts');
        
        if (personalizationData || timestamp) {
            console.log('🔍 DEBUG DISPLAY: Found personalization data:', {
                hasData: !!personalizationData,
                dataLength: personalizationData ? personalizationData.length : 0,
                timestamp: timestamp
            });
        }
    }, []);

    const clearDebugLog = () => {
        localStorage.removeItem('redirect_handler_debug_log');
        setDebugLog([]);
    };

    if (!isVisible) {
        return (
            <div 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999,
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    maxWidth: '300px'
                }}
                onClick={() => setIsVisible(true)}
                title="Show Debug Info"
            >
                🔍 DEBUG
            </div>
        );
    }

    return (
        <div 
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                width: '400px',
                maxHeight: '80vh',
                background: 'rgba(0, 0, 0, 0.95)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '11px',
                zIndex: 10000,
                overflow: 'auto',
                border: '1px solid #333',
                fontFamily: 'monospace'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#4f46e5' }}>🔍 Redirect Handler Debug</h3>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    ✕
                </button>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <strong>Personalization Data:</strong>
                <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '5px', marginTop: '5px' }}>
                    {localStorage.getItem('incoming_personalization_payload') ? 
                        `✅ Present (${localStorage.getItem('incoming_personalization_payload')?.length} chars)` : 
                        '❌ Missing'
                    }
                </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <strong>Debug Log:</strong>
                <button 
                    onClick={clearDebugLog}
                    style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '10px',
                        marginLeft: '10px'
                    }}
                >
                    Clear Log
                </button>
            </div>
            
            <div style={{ 
                background: 'rgba(0, 0, 0, 0.5)', 
                padding: '10px', 
                borderRadius: '4px',
                maxHeight: '300px',
                overflow: 'auto'
            }}>
                {debugLog.length > 0 ? (
                    debugLog.map((entry, index) => (
                        <div key={index} style={{ 
                            borderBottom: '1px solid #333', 
                            paddingBottom: '5px',
                            marginBottom: '5px'
                        }}>
                            {entry}
                        </div>
                    ))
                ) : (
                    <div style={{ color: '#888', fontStyle: 'italic' }}>No debug log entries</div>
                )}
            </div>
        </div>
    );
};