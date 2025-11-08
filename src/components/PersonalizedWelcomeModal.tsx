import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
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
          !mx-0 !my-0 !p-0
          !transform transition-all duration-500 ease-out
          data-[state=open]:animate-modal-fade-in
          data-[state=closed]:animate-modal-fade-out
          data-[state=open]:animate-modal-scale-in
          data-[state=closed]:animate-modal-scale-out
          data-[state=open]:animate-modal-slide-in-from-top
          data-[state=closed]:animate-modal-slide-out-to-top
          !max-w-[100vw] sm:!max-w-lg md:!max-w-xl
          !top-[50vh] !-translate-y-1/2
          !border-0 !bg-transparent
          !left-0 !right-0
          !max-h-[90vh] !overflow-y-auto
          sm:!left-1/2 sm:!right-auto
        " style={{
          position: 'fixed',
          top: '50vh',
          left: '0',
          transform: 'translateY(-50%)',
          width: '100vw',
          maxWidth: '100vw',
          margin: '0',
          borderRadius: '0'
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1"
            style={{minWidth: '44px', minHeight: '44px'}}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>

          <DialogHeader className="relative z-10 p-3 sm:p-4 md:p-6 pb-2 sm:pb-4">
            <DialogTitle className="[font-size:1.125rem] sm:[font-size:1.25rem] md:[font-size:1.5rem] font-bold text-white leading-tight text-center" style={{fontSize: '1.125rem'}}>
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
              <p className="text-white/90 leading-relaxed" style={{fontSize: '0.875rem'}}>
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
                className="w-full accent-gradient text-white hover:scale-105 transition-all duration-300 shadow-strong enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 group touch-manipulation font-semibold"
                style={{minHeight: '3rem'}}
              >
                <div className="flex items-center justify-center w-full gap-2">
                  <span className="text-center flex-1" style={{fontSize: '1rem'}}>Comenzar mi experiencia #1</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                </div>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="space-y-3 pt-4 border-t border-white/20 px-2 sm:px-4">
              <p className="text-white/70 text-center" style={{fontSize: '0.75rem'}}>
                <span className="text-accent font-semibold">⚡ Invitación personalizada y única</span>
              </p>
              <p className="text-white/60 text-center" style={{fontSize: '0.75rem'}}>
                Sin compromiso. Solo resultados extraordinarios.
              </p>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
};