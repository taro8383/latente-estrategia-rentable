import { Navigate } from "react-router-dom";
import { usePersonalization, onPersonalizationReady } from "@/context/PersonalizationProvider";
import { useState, useEffect } from "react";
import Index from "../pages/Index";

// Wrapper component to handle expiration and personalization redirect
const IndexWithExpirationCheck = () => {
    try {
    const { isExpired, isPersonalized, isLoading, data, replacer } = usePersonalization();

    // State to track if we're waiting for personalization
    const [waitingForPersonalization, setWaitingForPersonalization] = useState(true);

    // Register callback to be notified when personalization is ready
    useEffect(() => {
      onPersonalizationReady(() => {
                setWaitingForPersonalization(false);
      });
    }, []);

    // Show loading state while checking personalization
    if (isLoading || waitingForPersonalization) {
      return (
        <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-white/90">Verificando tu invitación...</p>
          </div>
        </div>
      );
    }

    // Check if user has personalization data
    // Only redirect if we're sure personalization is complete and there's no data
    // Also check if we have personalization data in the context as a fallback
    const hasPersonalizationData = Object.keys(data).length > 0 ||
                                (replacer && Object.keys(replacer.getAvailableVariables()).length > 0);

    
    if (!isPersonalized && !waitingForPersonalization && !isLoading && !hasPersonalizationData) {
      // If the RedirectHandler just wrote the encoded payload into localStorage, the provider may still be parsing it.
      // Detect that case and show a short loading state instead of immediately redirecting to /invitation-required.
      try {
        const incomingPayload = localStorage.getItem('incoming_personalization_payload');
        if (incomingPayload) {
                    return (
            <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xl text-white/90">Preparing your personalized page...</p>
              </div>
            </div>
          );
        }
      } catch (e) {
        console.warn('Error reading incoming_personalization_payload from localStorage', e);
      }

      // Personalization data is available - continue to landing page

      // Redirect to invitation-required page if no personalization data
      return <Navigate to="/invitation-required" replace />;
    }

    
    // Check if invitation has expired
    if (isExpired) {
      return <Navigate to="/expired" replace />;
    }

    // User has valid personalization, show the landing page

    // Clean up the temporary personalization payload now that we're rendering the main page
    try {
      const incomingPayload = localStorage.getItem('incoming_personalization_payload');
      if (incomingPayload) {
                localStorage.removeItem('incoming_personalization_payload');
      }
    } catch (e) {
          }

        return <Index />;
  } catch (error) {
    console.error('Error in IndexWithExpirationCheck:', error);
    return (
      <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white/90">Error al cargar la página</p>
        </div>
      </div>
    );
  }
};

export default IndexWithExpirationCheck;