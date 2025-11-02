import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { URLShortener } from '@/utils/urlShortener';

export const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [redirectStatus, setRedirectStatus] = useState('Iniciando redirección...');
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState<string | null>(null);

  // Debug URL parsing immediately
  console.log('🔍 REDIRECT DEBUG: Component mounted');
  console.log('🔍 REDIRECT DEBUG: window.location.href:', window.location.href);
  console.log('🔍 REDIRECT DEBUG: window.location.hash:', window.location.hash);
  console.log('🔍 REDIRECT DEBUG: useParams result:', shortCode);
  console.log('🔍 REDIRECT DEBUG: Expected shortCode from URL:', window.location.hash.split('/')[2]);
  console.log('🔍 REDIRECT DEBUG: Browser navigation type:', performance.navigation.type);
  console.log('🔍 REDIRECT DEBUG: Is redirect:', performance.navigation.type === 1);
  console.log('🔍 REDIRECT DEBUG: Referrer:', document.referrer);

  useEffect(() => {
    // Check if shortCode is available
    if (!shortCode) {
      console.log('🔍 REDIRECT DEBUG: No shortCode provided');
      setError('Código de redirección no proporcionado');
      setIsRedirecting(false);
      return;
    }

    const performRedirect = async () => {
      try {
        setRedirectStatus('Buscando enlace...');

        // Use the async getLongUrl method to fetch from GitHub Pages
        const longUrl = await URLShortener.getLongUrl(shortCode);

        console.log('🔍 REDIRECT DEBUG: ShortCode:', shortCode);
        console.log('🔍 REDIRECT DEBUG: LongUrl result:', longUrl);
        console.log('🔍 REDIRECT DEBUG: Current URL:', window.location.href);
        console.log('🔍 REDIRECT DEBUG: Current origin:', window.location.origin);

        if (longUrl) {
          console.log('🔍 REDIRECT DEBUG: About to redirect to:', longUrl);
          setRedirectStatus('Redirigiendo...');

          // Simple direct redirect to avoid URL malformation
          setTimeout(() => {
            console.log('🔍 REDIRECT DEBUG: Executing window.location.replace with:', longUrl);
            window.location.replace(longUrl);
          }, 1000);
        } else {
          console.log('🔍 REDIRECT DEBUG: No longUrl found, setting error');
          setError('Enlace no encontrado o expirado');
          setIsRedirecting(false);
        }
      } catch (error) {
        console.error('Error during redirect:', error);
        setError('Error al procesar el enlace');
        setIsRedirecting(false);
      }
    };

    // Start countdown and perform redirect
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

  if (!isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Enlace Inválido</h1>
          <p className="text-xl text-white/90 mb-8">{error || 'El enlace que buscas no existe o ha expirado.'}</p>
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 text-lg font-semibold"
          >
            <ExternalLink className="w-5 h-5" />
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        {/* Main loading animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-accent rounded-full animate-spin mx-auto"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Redirigiendo...
        </h1>

        <div className="flex items-center justify-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-accent" />
          <span className="text-xl text-white/90">{redirectStatus}</span>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <p className="text-lg text-white/90 mb-3">
            Serás redirigido en <span className="font-bold text-accent text-2xl mx-2">{countdown}</span> segundos
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white/70">Código:</span>
            <code className="bg-black/30 px-3 py-1 rounded-lg text-accent font-mono text-sm">
              {shortCode || 'N/A'}
            </code>
          </div>
        </div>

        <div className="text-white/60 text-sm">
          Por favor espera mientras te redirigimos a tu página personalizada...
        </div>
      </div>
    </div>
  );
};