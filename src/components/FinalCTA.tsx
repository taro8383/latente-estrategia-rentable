import { Crown, Clock, Mail, AlertTriangle, CheckCircle2, Target } from "lucide-react";
import undisputedImage from "@/assets/Undisputed.png";
import { Button } from "@/components/ui/button";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";

export const FinalCTA = () => {
  const scrollToContact = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-1" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* Undisputed Image */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
          <img
            src={undisputedImage}
            alt="Expertos en cuero trabajando en estrategia de dominio"
            className="w-full h-64 md:h-96 object-cover mobile-center-block"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
            <span className="text-accent font-semibold text-white">¿CUMPLES CON EL PERFIL?</span>
          </div>
          
          <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4 mobile-center-block" />
          
          <h2 className="mb-6 text-white mobile-center-text">
            Si llegaste aquí por invitación directa…
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-12 mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="text-center space-y-8 mobile-center">
              <Crown className="w-16 h-16 text-accent mx-auto mb-6 mobile-center-block" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 mobile-center-text">
                Si tu empresa ya tiene calidad, operación y presencia…
              </h3>
              
              <div className="space-y-6 mobile-center">
                <PersonalizedText className="text-xl text-white/90 leading-relaxed mobile-center-text">
                  Y si estás listo para dejar de competir y empezar a dominar…
                </PersonalizedText>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mobile-center">
                  <PersonalizedText as="p" className="text-2xl font-bold text-accent mb-4 mobile-center-text">
                    Responde "CORONA" al email que te trajo aquí.
                  </PersonalizedText>
                  
                  <div className="space-y-4 mobile-center">
                    <p className="text-lg text-white/90 mobile-center-text">
                      Este no es un 'servicio'. Es una coronación.
                    </p>
                    
                    <p className="text-lg text-white/90 mobile-center-text">
                      Y solo hay un trono.
                    </p>
                    
                    <p className="text-lg text-white/90 mobile-center-text">
                      Tu competidor ya está probándose la corona.
                    </p>
                    
                    <PersonalizedText as="p" className="text-lg text-white/90 mobile-center-text">
                      ¿Vas a dejar que se la quede… o vas a responder 'CORONA' y reclamar lo que es tuyo, [reader name]?
                    </PersonalizedText>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30 mobile-center">
                <p className="text-2xl font-bold text-white mb-4 mobile-center-text">
                  Si no actúas en 72 horas, no es que ''solo pierdas la oportunidad''. </p>
                  <p className="text-2xl font-bold text-white mb-4 mobile-center-text">
                  Es que le entregas el cetro.
                </p>
                
                <div className="space-y-4 mobile-center">
                  <p className="text-lg text-white/90 mobile-center-text">
                    No te pedimos un centavo.
                  </p>
                  
                  <p className="text-lg text-white/90 mobile-center-text">
                    No te pedimos fe.
                  </p>
                  
                  <PersonalizedText className="text-lg text-white/90 mobile-center-text">
                    Solo necesitamos 12 minutos para estar seguros de podes ser el próximo rey.
                  </PersonalizedText>
                  
                  <PersonalizedText className="text-lg text-white/90 mobile-center-text">
                    Por que si eres seleccionado y no generamos un 20% en ganancias nuevas en 90 días. Seremos nosotros los que te paguen $20 Millones de pesos.
                  </PersonalizedText>
                  
                  <p className="text-lg text-white/90 mobile-center-text">
                    Eso no es promesa.
                  </p>
                  
                  <p className="text-lg text-white/90 mobile-center-text">
                    Es un contrato.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto mobile-center">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-accent/30 mobile-center">
            <div className="text-center space-y-6 mobile-center">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold">LA INVITACIÓN FUE SOLO EL PRIMER FILTRO</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8 mobile-center-text">
                Recuerda: Estar aquí no garantiza la sociedad.
              </h3>
              
              <div className="space-y-4 mobile-center">
     
                
                <div className="flex items-center gap-4 pt-4 mobile-stack mobile-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">Tiempo limitado</span>
                  </div>
                  <p className="text-muted-foreground mobile-center-text">El trono está siendo disputado ahora mismo.</p>
                </div>
                
                <div className="flex items-center gap-4 pt-4 mobile-stack mobile-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">Oportunidad única</span>
                  </div>
                  <PersonalizedText className="text-muted-foreground mobile-center-text">El próximo rey será decidido en las próximas 72 horas.</PersonalizedText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="max-w-4xl mx-auto text-center mt-12 mobile-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-6 whitespace-normal break-words text-center group mobile-center-block text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-semibold"
          >
            <PersonalizedText as="span" className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem]">
              Responder "CORONA" y reclamar mi trono.
            </PersonalizedText>
            <Mail className="ml-0 sm:ml-2 mt-2 sm:mt-0 group-hover:translate-x-1 transition-smooth w-5 h-5 flex-shrink-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};