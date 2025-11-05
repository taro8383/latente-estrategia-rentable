import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EnhancedUrgencyTimer } from "@/components/EnhancedUrgencyTimer";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { PersonalizedText } from "@/components/PersonalizedText";

interface PersonalizedWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizedWelcomeModal = ({ isOpen, onClose }: PersonalizedWelcomeModalProps) => {
  const { data } = usePersonalization();

  // Simple direct gender replacement
  const gender = data?.genderInfo?.gender || 'male';
  const isFemale = gender === 'female';
  console.log('Welcome modal - Gender:', gender, 'IsFemale:', isFemale);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="
          left-0 right-0 sm:left-1/2 sm:right-auto mx-0 my-0 p-0 overflow-hidden
          transform transition-all duration-500 ease-out
          data-[state=open]:animate-modal-fade-in
          data-[state=closed]:animate-modal-fade-out
          data-[state=open]:animate-modal-scale-in
          data-[state=closed]:animate-modal-scale-out
          data-[state=open]:animate-modal-slide-in-from-top
          data-[state=closed]:animate-modal-slide-out-to-top
          !max-w-[95vw] sm:!max-w-lg md:!max-w-xl
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
          <div className="relative z-10 p-4 sm:p-6 md:p-8 text-center space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Welcome message */}
            <div className="px-2 sm:px-4">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Tu oportunidad exclusiva de convertirte en <span className="text-accent font-semibold">{isFemale ? 'la #1 absoluta' : 'el #1 absoluto'}</span> está lista.
              </p>
            </div>

            {/* Company Logo */}
            <div className="flex justify-center py-4 sm:py-6">
              <CompanyLogo
                logoData={data?.companyLogo}
                brandName={data?.brandInfo?.name}
                className="max-h-20 sm:max-h-24 md:max-h-32 w-auto object-contain"
              />
            </div>

            {/* Enhanced Urgency Timer */}
            <div className="flex justify-center py-2">
              <EnhancedUrgencyTimer />
            </div>

            {/* Action Button */}
            <div className="pt-4 px-2 sm:px-4">
              <Button
                onClick={onClose}
                size="lg"
                className="w-full accent-gradient text-white hover:scale-105 transition-all duration-300 shadow-strong text-sm sm:text-base px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 group touch-manipulation"
              >
                <span className="text-center">Comenzar mi experiencia #1</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="space-y-3 pt-4 border-t border-white/20 px-2 sm:px-4">
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