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
    console.log('🔄 RedirectHandler useEffect triggered - shortCode:', shortCode);
    console.log('🔄 CRITICAL DEBUG: Current URL:', window.location.href);

    // Check if shortCode is available
    if (!shortCode) {
      setError('Código de redirección no proporcionado');
      setIsRedirecting(false);
      return;
    }

    const performRedirect = async () => {
      try {
        setRedirectStatus('Buscando enlace...');

        // Get the URL and metadata from GitHub Pages (cross-device compatible)
        const urlResult = await URLShortener.getLongUrl(shortCode);

        if (urlResult) {
          setRedirectStatus('Redirigiendo...');
          const { url: longUrl, metadata } = urlResult;

          console.log('🔍 RedirectHandler: Retrieved URL and metadata');
          console.log('📏 URL from GitHub API:', longUrl.length, 'chars');
          console.log('📏 Metadata available:', metadata ? 'YES' : 'NO');
          if (metadata) {
            console.log('📏 Metadata size:', metadata.length, 'chars');
          }

          let urlToProcess = longUrl;
          let encodedData = null;

          // Method 1: Try to get the full URL from localStorage (same browser/device)
          const fullUrlWithEmbeddedData = localStorage.getItem(`full_url_${shortCode}`);
          if (fullUrlWithEmbeddedData) {
            urlToProcess = fullUrlWithEmbeddedData;
            console.log('✅ Using full URL from localStorage (same device)');
          }
          // Method 2: Try to recreate URL from metadata (cross-device fallback)
          else if (metadata) {
            console.log('🔍 DEBUG: Found metadata, attempting to recreate URL');
            console.log('🔍 DEBUG: Metadata length:', metadata.length);
            console.log('🔍 DEBUG: Metadata preview:', metadata.substring(0, 200) + '...');
            try {
              const personalizationData = JSON.parse(metadata);
              console.log('🔍 DEBUG: Successfully parsed metadata, keys:', Object.keys(personalizationData));
              const jsonData = JSON.stringify(personalizationData);
              console.log('🔍 DEBUG: JSON data length:', jsonData.length);
              encodedData = btoa(unescape(encodeURIComponent(jsonData)));
              console.log('🔍 DEBUG: Encoded data length:', encodedData.length);

              // Recreate the full URL with embedded data
              urlToProcess = `${longUrl}#/invite/${shortCode}?data=${encodedData}`;
              console.log('✅ Recreated URL from metadata (cross-device)');
              console.log('🔍 DEBUG: Final URL length:', urlToProcess.length);
            } catch (error) {
              console.error('❌ Failed to recreate URL from metadata:', error);
              console.error('❌ Error details:', error.message);
            }
          } else {
            console.log('🔍 DEBUG: No metadata found for shortCode:', shortCode);
          }

          // Extract encoded data from URL and store in localStorage for PersonalizationProvider
          try {
            if (!encodedData) {
              const url = new URL(urlToProcess);
              if (url.hash && url.hash.includes('?data=')) {
                // Handle multiple hash fragments by finding the LAST occurrence of ?data=
                const lastDataIndex = url.hash.lastIndexOf('?data=');
                if (lastDataIndex !== -1) {
                  // Extract everything after the last ?data=
                  const hashPart = url.hash.substring(lastDataIndex + 6); // +6 for '?data='
                  // Remove any trailing hash fragments (#/something) that might come after the data
                  const hashFragments = hashPart.split('#');
                  encodedData = hashFragments[0]; // Take only the first part after ?data=
                }
              }
            }

            if (encodedData) {
              // Store the encoded data in localStorage for PersonalizationProvider
              const writerData = JSON.stringify({
                timestamp: Date.now(),
                shortCode: shortCode,
                url: urlToProcess
              });
              localStorage.setItem('incoming_personalization_writer', writerData);
              localStorage.setItem('incoming_personalization_payload', encodedData);
              localStorage.setItem('incoming_personalization_payload_ts', Date.now().toString());
              console.log('📝 RedirectHandler: Stored encoded data in localStorage for', shortCode);
              console.log('📝 DEBUG: Writer data stored:', writerData);
              console.log('📝 DEBUG: Payload length stored:', encodedData.length);
              console.log('✅ Personalization data extracted successfully');
            } else {
              console.warn('⚠️ RedirectHandler: No encoded data found, redirecting without personalization');
              console.log('🔍 DEBUG: urlToProcess being checked:', urlToProcess.substring(0, 200) + '...');
            }
          } catch (error) {
            console.error('❌ RedirectHandler: Failed to extract/store URL data:', error);
          }

          // Redirect to the URL with personalization data
          setTimeout(() => {
            console.log('🔄 Redirecting to:', urlToProcess.substring(0, 100) + '...');
            window.location.replace(urlToProcess);
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