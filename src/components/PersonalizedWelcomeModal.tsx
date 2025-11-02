import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EnhancedUrgencyTimer } from "@/components/EnhancedUrgencyTimer";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { useState, useEffect, useRef } from "react";

interface PersonalizedWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizedWelcomeModal = ({ isOpen, onClose }: PersonalizedWelcomeModalProps) => {
  const { data, replacer } = usePersonalization();
  const [modalMaxHeight, setModalMaxHeight] = useState<string>('50vh');
  const logoContainerRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic modal height based on content
  useEffect(() => {
    if (!isOpen) return;

    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80; // Approximate header height
      const footerHeight = 120; // Approximate footer/action area height
      const padding = 40; // Total padding
      const urgencyTimerHeight = 80; // Approximate urgency timer height
      const trustIndicatorsHeight = 60; // Approximate trust indicators height

      // Reserve space for other elements
      const reservedSpace = headerHeight + footerHeight + padding + urgencyTimerHeight + trustIndicatorsHeight;

      // Calculate available height for logo and content
      const availableHeight = viewportHeight - reservedSpace;

      // Ensure minimum height for small screens and maximum for larger screens
      const calculatedMaxHeight = Math.max(Math.min(availableHeight, viewportHeight * 0.8), 300);

      // Convert to vh for responsive behavior
      const maxHeightInVh = (calculatedMaxHeight / viewportHeight) * 100;

      setModalMaxHeight(`${maxHeightInVh}vh`);
    };

    calculateHeight();

    // Recalculate on resize
    const handleResize = () => {
      calculateHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="
          w-full p-0 overflow-hidden
          transform transition-all duration-500 ease-out
          data-[state=open]:animate-modal-fade-in
          data-[state=closed]:animate-modal-fade-out
          data-[state=open]:animate-modal-scale-in
          data-[state=closed]:animate-modal-scale-out
          data-[state=open]:animate-modal-slide-in-from-top
          data-[state=closed]:animate-modal-slide-out-to-top
        ">
          <DialogHeader className="relative z-10 p-3 sm:p-4 md:p-6 pb-2 sm:pb-4">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight text-center">
              {replacer ? replacer.replace('Bienvenido, [reader name]') : 'Bienvenido, Invitado'}
            </DialogTitle>
          </DialogHeader>
  
          {/* Background gradient overlay */}
          <div className="absolute inset-0 hero-gradient opacity-95 modal-backdrop-blur"></div>
          
          {/* Content container */}
          <div
            className="relative z-10 p-3 sm:p-4 md:p-6 text-center space-y-3 sm:space-y-4 overflow-y-auto"
            style={{ maxHeight: modalMaxHeight }}
          >
            {/* Welcome message */}
            <div className="space-y-2 sm:space-y-3">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Tu oportunidad exclusiva de <span className="text-accent font-semibold">{replacer ? replacer.replace('convertirte en el #1 absoluto') : 'convertirte en el #1 absoluto'}</span> está lista.
            </p>
          </div>

          {/* Company Logo */}
          <div className="flex justify-center py-2 sm:py-3" ref={logoContainerRef}>
            <CompanyLogo
              logoData={data?.companyLogo}
              brandName={data?.brandInfo?.name}
              className="max-h-24 sm:max-h-32 md:max-h-40 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Enhanced Urgency Timer */}
          <EnhancedUrgencyTimer />

          {/* Action Button */}
          <div className="pt-2 sm:pt-3">
            <Button
              onClick={onClose}
              size="lg"
              className="w-full accent-gradient text-white hover:scale-105 transition-all duration-300 shadow-strong text-sm sm:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 group touch-manipulation"
            >
              <span className="text-center">Comenzar mi experiencia #1</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="space-y-2 pt-2 border-t border-white/20">
            <p className="text-xs text-white/70 text-center">
              <span className="text-accent font-semibold">⚡ Invitación personalizada y única</span>
            </p>
            <p className="text-xs text-white/60 text-center">
              Sin compromiso. Solo resultados extraordinarios.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};