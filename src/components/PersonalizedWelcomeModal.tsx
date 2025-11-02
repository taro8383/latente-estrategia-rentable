import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EnhancedUrgencyTimer } from "@/components/EnhancedUrgencyTimer";
import { usePersonalization } from "@/context/PersonalizationProvider";

interface PersonalizedWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizedWelcomeModal = ({ isOpen, onClose }: PersonalizedWelcomeModalProps) => {
  const { data } = usePersonalization();

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
              <PersonalizedText>
                Bienvenido, <span className="text-accent">{data?.readerInfo?.name || 'Invitado'}</span>
              </PersonalizedText>
            </DialogTitle>
          </DialogHeader>
  
          {/* Background gradient overlay */}
          <div className="absolute inset-0 hero-gradient opacity-95 modal-backdrop-blur"></div>
          
          {/* Content container */}
          <div className="relative z-10 p-3 sm:p-4 md:p-6 text-center space-y-3 sm:space-y-4 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto">
            {/* Welcome message */}
            <div className="space-y-2 sm:space-y-3">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Tu oportunidad exclusiva de convertirte en el <span className="text-accent font-semibold">#1 absoluto</span> está lista.
            </p>
          </div>

          {/* Company Logo */}
          <div className="flex justify-center py-2 sm:py-3">
            <CompanyLogo
              logoData={data?.companyLogo}
              brandName={data?.brandInfo?.name}
              className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain"
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