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
import { DebugDisplay } from "@/components/DebugDisplay";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PersonalizationProvider>
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
          <DebugDisplay />
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
        console.log('Personalization ready callback triggered in IndexWithExpirationCheck');
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
          console.log('Incoming personalization payload detected in localStorage; deferring redirect and showing loading state');
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

      console.log('🚨 REDIRECT WOULD HAPPEN HERE - BUT DISABLED FOR DEBUGGING');
      console.log('🚨 Debug info:');
      console.log('  - isPersonalized:', isPersonalized);
      console.log('  - waitingForPersonalization:', waitingForPersonalization);
      console.log('  - isLoading:', isLoading);
      console.log('  - hasPersonalizationData:', hasPersonalizationData);
      console.log('  - data keys:', Object.keys(data));
      console.log('  - data:', data);
      console.log('  - replacer exists:', !!replacer);
      console.log('  - replacer variables:', replacer ? Object.keys(replacer.getAvailableVariables()) : []);
      console.log('  - current URL:', window.location.href);
      console.log('  - hash:', window.location.hash);
      console.log('  - search:', window.location.search);
      
      // Check localStorage for any stored data
      try {
        const incomingPayload = localStorage.getItem('incoming_personalization_payload');
        console.log('  - incoming_personalization_payload in localStorage:', !!incomingPayload);
        if (incomingPayload) {
          console.log('  - payload preview:', incomingPayload.substring(0, 100));
        }
      } catch (e) {
        console.log('  - error reading localStorage:', e);
      }
      
      // Check sessionStorage
      try {
        const personalizationActive = sessionStorage.getItem('personalization_active');
        console.log('  - personalization_active in sessionStorage:', personalizationActive);
      } catch (e) {
        console.log('  - error reading sessionStorage:', e);
      }
      
      // Redirect to invitation-required page if no personalization data
      return <Navigate to="/invitation-required" replace />;
    }
    
    // Debug logging to track state
    console.log('IndexWithExpirationCheck state:', {
      isPersonalized,
      isExpired,
      isLoading,
      waitingForPersonalization,
      hasPersonalizationData,
      dataKeys: Object.keys(data),
      availableVars: replacer ? replacer.getAvailableVariables() : []
    });
    
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
