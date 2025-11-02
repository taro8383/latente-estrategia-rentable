import React, { useState, useEffect } from 'react';
import { AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { URLShortener } from '@/utils/urlShortener';

interface RedirectHandlerProps {
  shortCode: string;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({ shortCode }) => {
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [redirectStatus, setRedirectStatus] = useState('Iniciando redirección...');
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performRedirect = async () => {
      try {
        setRedirectStatus('Buscando enlace...');

        // Use the async getLongUrl method to fetch from GitHub Pages
        const longUrl = await URLShortener.getLongUrl(shortCode);

        if (longUrl) {
          console.log('🔍 REDIRECT DEBUG: Found longUrl:', longUrl);
          setRedirectStatus('Redirigiendo...');

          // Simple direct redirect to avoid URL malformation
          setTimeout(() => {
            window.location.replace(longUrl);
          }, 1000);
        } else {
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
      <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card/10 backdrop-blur-sm rounded-xl border border-border/20 p-8 text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Enlace Inválido</h1>
          <p className="text-muted-foreground mb-6">{error || 'El enlace que buscas no existe o ha expirado.'}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card/10 backdrop-blur-sm rounded-xl border border-border/20 p-8 text-center">
        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-6"></div>

        <h1 className="text-3xl font-bold mb-4">Redirigiendo...</h1>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-lg">{redirectStatus}</span>
        </div>

        <p className="text-muted-foreground mb-2">
          Serás redirigido en <span className="font-bold text-accent">{countdown}</span> segundos
        </p>

        <div className="text-sm text-muted-foreground">
          Código: <code className="bg-black/20 px-2 py-1 rounded">{shortCode}</code>
        </div>
      </div>
    </div>
  );
};