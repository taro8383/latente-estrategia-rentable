import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PersonalizationProvider, usePersonalization, onPersonalizationReady } from "@/context/PersonalizationProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ExpiredOffer } from "@/components/ExpiredOffer";
import { RedirectHandler } from "@/components/RedirectHandler";
import InvitationRequired from "@/components/InvitationRequired";
import { ScrollProgress } from "@/components/ScrollProgress";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');

    // Handle direct short URLs (e.g., latente.net/ABC123)
    const path = window.location.pathname;
    const hash = window.location.hash;

    // If path is a short code (not existing routes) and no hash, redirect to proper format
    if (path.length > 1 &&
        !path.startsWith('/invite/') &&
        !path.startsWith('/exclusive/') &&
        !path.startsWith('/strategy/') &&
        !path.startsWith('/expired') &&
        !path.startsWith('/invitation-required') &&
        !path.startsWith('/r/') &&
        !hash.includes('/invite/')) {

      const possibleShortCode = path.slice(1); // Remove leading '/'

      // Check if it looks like a short code (alphanumeric, reasonable length)
      if (/^[a-zA-Z0-9]{3,10}$/.test(possibleShortCode)) {
        // Redirect to the redirect handler route
        window.location.replace(`/#/r/${possibleShortCode}`);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PersonalizationProvider>
          <ScrollProgress />
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<IndexWithExpirationCheck />} />
              <Route path="/invite/:uniqueCode" element={<IndexWithExpirationCheck />} />
              <Route path="/exclusive/:uniqueCode" element={<IndexWithExpirationCheck />} />
              <Route path="/strategy/:uniqueCode" element={<IndexWithExpirationCheck />} />
              <Route path="/expired" element={<ExpiredOffer />} />
              <Route path="/invitation-required" element={<InvitationRequired />} />
              {/* NEW: Redirect handler for short URLs */}
              <Route path="/r/:shortCode" element={<RedirectHandler />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </PersonalizationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Wrapper component to handle expiration and personalization redirect - defined inside App component
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
        // Error reading incoming_personalization_payload from localStorage
      }
      
      // Redirect to invitation-required page if no personalization data
      return <Navigate to="/invitation-required" replace />;
    }
    
    // Check if invitation has expired
    if (isExpired) {
      return <Navigate to="/expired" replace />;
    }
    
    // User has valid personalization, show the landing page
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

export default App;
