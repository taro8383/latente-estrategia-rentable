import React, { useState, useEffect, useRef } from 'react';
import { PersonalizationData } from '@/types/personalization';
import { LogoStorage } from '@/utils/logoStorage';
// LogoStorage removed - using inline base64 for cross-browser compatibility

interface CompanyLogoProps {
  logoData?: string;
  brandName?: string;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  logoData,
  brandName = 'Brand',
  className = ''
}) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(logoData || null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const logoIdRef = useRef<string | null>(null);
  const logoRequestTimeRef = useRef<number | null>(null);

  // If incoming prop changes (personalization payload arrives after mount),
  // update internal state so that component renders the provided inline logo.
  useEffect(() => {
    if (logoData) {
      // Debug: log presence and a short preview of the incoming data URI
      try {
      } catch (e) {
      }
      setLogoSrc(logoData);
      setHasError(false);
      setIsLoading(false);
    }
    // If logoData becomes undefined, we don't immediately clear logoSrc here;
    // allow the fallback effect below to set a text-based avatar when appropriate.
  }, [logoData]);

  useEffect(() => {
    if (!logoSrc && brandName) {
      // Generate text-based logo fallback using UI Avatars API
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=1a1a1a&color=ffffff&size=200&bold=true&font-size=0.5`;
      setLogoSrc(fallbackUrl);
      setIsLoading(false);
    } else if (logoSrc) {
      setIsLoading(false);
    }
  }, [logoSrc, brandName]);

  // Handle logo ID changes for object URL optimization
  useEffect(() => {
    // If inline base64 provided, don't try to look up by id
    if (logoData && typeof logoData === 'string' && logoData.startsWith('data:')) {
      return;
    }

    // Try to extract logo ID from various possible sources (structured payload)
    const possibleId = (logoData as any)?.companyLogoId ||
                       (logoData as any)?.logoId ||
                       (logoData as any)?.logoIdLegacy ||
                       (logoData as any)?.id;

    if (!possibleId) {
      return;
    }

    if (possibleId === logoIdRef.current) {
      // Already requested
      return;
    }

    // Revoke previous object URL if exists
    if (logoIdRef.current) {
      LogoStorage.revokeLogo(logoIdRef.current);
    }

    logoIdRef.current = possibleId;
    logoRequestTimeRef.current = performance.now();

    // Try to get logo (may return base64 immediately or cached objectUrl)
    const result = LogoStorage.getLogo(possibleId);

    if (result) {
      if ((result as string).startsWith('blob:')) {
        setLogoSrc(result as string);
        setHasError(false);
        setIsLoading(false);
      } else {
        setLogoSrc(result as string);
        setHasError(false);
        setIsLoading(false);
      }
    } else {
    }

    // Listen for async object-url ready event and upgrade image src when ready
    const onLogoReady = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail;
        if (!detail || detail.id !== possibleId) return;
        const objectUrl = detail.objectUrl as string;
        const elapsed = logoRequestTimeRef.current ? Math.round(performance.now() - logoRequestTimeRef.current) : null;
        if (objectUrl && objectUrl.startsWith('blob:')) {
          setLogoSrc(objectUrl);
          setHasError(false);
          setIsLoading(false);
        }
      } catch (err) {
      }
    };

    window.addEventListener('logoObjectUrlReady', onLogoReady as EventListener);

    // Cleanup listener on effect cleanup
    return () => {
      window.removeEventListener('logoObjectUrlReady', onLogoReady as EventListener);
    };
  }, [logoData]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (logoIdRef.current) {
        LogoStorage.revokeLogo(logoIdRef.current);
      }
    };
  }, []);

  const handleImageError = () => {
    console.warn('CompanyLogo: handleImageError called, current logoSrc length:', logoSrc ? (logoSrc.length) : 'null');
    if (!hasError) {
      setHasError(true);
      console.warn('Company logo failed to load, using fallback');

      // Try text-based fallback
      if (brandName) {
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=1a1a1a&color=ffffff&size=200&bold=true&font-size=0.5`;
        setLogoSrc(fallbackUrl);
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (!logoSrc && !brandName) {
    return null;
  }

  return (
    <div className={`company-logo-container ${className}`}>
      {isLoading && (
        <div className="company-logo-placeholder">
          <div className="w-16 h-16 bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
            <span className="text-gray-500 text-xs">Loading...</span>
          </div>
        </div>
      )}
      
      {!isLoading && logoSrc && (
        <img 
          src={logoSrc} 
          alt={`${brandName} logo`}
          className={`company-logo ${hasError ? 'opacity-75' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            maxWidth: '200px',
            maxHeight: '100px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '8px',
            border: '1px solid #374151',
            backgroundColor: '#1f2937'
          }}
        />
      )}
      
      {!isLoading && !logoSrc && brandName && (
        <div className="company-logo-text-fallback">
          <div 
            className="flex items-center justify-center w-32 h-16 bg-gray-800 rounded-lg border border-gray-600"
            style={{
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            <span className="text-center px-2">
              {brandName.length > 15 ? brandName.substring(0, 15) + '...' : brandName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;