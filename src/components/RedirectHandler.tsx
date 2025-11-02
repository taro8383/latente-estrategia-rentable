import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { URLShortener } from '@/utils/urlShortener';
import logo from "/LoDi-logo.svg";

export const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [redirectStatus, setRedirectStatus] = useState('Iniciando redirección...');
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if shortCode is available
    if (!shortCode) {
      setError('Código de redirección no proporcionado');
      setIsRedirecting(false);
      return;
    }

    const performRedirect = async () => {
      try {
        setRedirectStatus('Buscando enlace...');

        // Use the async getLongUrl method to fetch from GitHub Pages
        const longUrl = await URLShortener.getLongUrl(shortCode);

        if (longUrl) {
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
      <section className="relative hero-gradient text-primary-foreground min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative elements matching landing page */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 right-2 w-24 h-24 sm:w-32 sm:h-32 sm:right-4 sm:top-8 md:w-40 md:h-40 md:right-6 md:top-10 lg:right-10 lg:top-20 lg:w-72 lg:h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-6 left-2 w-28 h-28 sm:w-36 sm:h-36 sm:left-4 sm:bottom-8 md:w-48 md:h-48 md:left-6 md:bottom-10 lg:left-10 lg:bottom-20 lg:w-80 lg:h-80 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-md w-full px-4">
          <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-8 border border-accent/20">
            {/* Company Logo */}
            <img
              src={logo}
              alt="LoDi Logo"
              className="h-12 w-auto mx-auto mb-6"
            />

            <AlertCircle className="w-20 h-20 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Enlace Inválido</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {error || 'El enlace que buscas no existe o ha expirado.'}
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent/20 backdrop-blur-sm text-white rounded-xl hover:bg-accent/30 transition-all duration-300 border border-accent/20 text-lg font-semibold"
            >
              <ExternalLink className="w-5 h-5" />
              Volver al inicio
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative hero-gradient text-primary-foreground min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative elements matching landing page */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 right-2 w-24 h-24 sm:w-32 sm:h-32 sm:right-4 sm:top-8 md:w-40 md:h-40 md:right-6 md:top-10 lg:right-10 lg:top-20 lg:w-72 lg:h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 left-2 w-28 h-28 sm:w-36 sm:h-36 sm:left-4 sm:bottom-8 md:w-48 md:h-48 md:left-6 md:bottom-10 lg:left-10 lg:bottom-20 lg:w-80 lg:h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl w-full px-4">
        <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-8 border border-accent/20">
          {/* Company Logo */}
          <img
            src={logo}
            alt="LoDi Logo"
            className="h-12 w-auto mx-auto mb-8"
          />

          {/* Main loading animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-accent rounded-full animate-spin mx-auto"></div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Redirigiendo...
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-accent" />
            <span className="text-xl text-white/90">{redirectStatus}</span>
          </div>

          <div className="bg-accent/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-accent/20">
            <p className="text-lg text-white/90 mb-3 leading-relaxed">
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
    </section>
  );
};