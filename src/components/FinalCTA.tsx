import { Crown, Clock, Mail, AlertTriangle, CheckCircle2, Target } from "lucide-react";
import undisputedImage from "@/assets/Undisputed.png";
import { Button } from "@/components/ui/button";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

export const FinalCTA = () => {
  const scrollToContact = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-1" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* Undisputed Image */}
        <AnimatedElement animation="fade-down" delay={100}>
          <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
            <img
              src={undisputedImage}
              alt="Expertos en cuero trabajando en estrategia de dominio"
              className="w-full h-64 md:h-96 object-cover mobile-center-block"
            />
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={200}>
          <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
            <AnimatedElement animation="scale-up" delay={300}>
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold text-white" style={{fontSize: '1rem'}}>¿CUMPLES CON EL PERFIL?</span>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="bounce-in" delay={400}>
              <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4 mobile-center-block" />
            </AnimatedElement>

            <h2 className="mb-6 text-white mobile-center-text" style={{fontSize: '2rem'}}>
              Si llegaste aquí por invitación directa…
            </h2>
          </div>
        </AnimatedElement>

        {/* Main Content */}
        <AnimatedElement animation="scale-up" delay={500} duration={800}>
          <div className="max-w-6xl mx-auto space-y-12 mobile-center">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
              <div className="text-center space-y-8 mobile-center">
                <AnimatedElement animation="bounce-in" delay={600}>
                  <Crown className="w-16 h-16 text-accent mx-auto mb-6 mobile-center-block" />
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={700}>
                  <h3 className="font-bold text-white mb-8 mobile-center-text" style={{fontSize: '2.5rem'}}>
                    Si tu empresa ya tiene calidad, operación y presencia…
                  </h3>
                </AnimatedElement>

                <div className="space-y-6 mobile-center">
                  <AnimatedElement animation="fade-up" delay={800}>
                    <PersonalizedText className="text-white/90 leading-relaxed mobile-center-text" style={{fontSize: '1.25rem'}}>
                      Y si estás listo para dejar de competir y empezar a dominar…
                    </PersonalizedText>
                  </AnimatedElement>

                  <AnimatedElement animation="scale-up" delay={900}>
                    <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mobile-center">
                      <AnimatedElement animation="bounce-in" delay={1000}>
                        <PersonalizedText as="p" className="font-bold text-accent mb-4 mobile-center-text" style={{fontSize: '1.5rem'}}>
                          Responde "CORONA" al email que te trajo aquí.
                        </PersonalizedText>
                      </AnimatedElement>

                      <StaggeredAnimation staggerDelay={100} animation="fade-up">
                        <div className="space-y-4 mobile-center">
                          <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                            Este no es un 'servicio'. Es una coronación.
                          </p>

                          <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                            Y solo hay un trono.
                          </p>

                          <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                            Tu competidor ya está probándose la corona.
                          </p>

                          <PersonalizedText as="p" className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                            ¿Vas a dejar que se la quede… o vas a responder 'CORONA' y reclamar lo que es tuyo, [reader name]?
                          </PersonalizedText>
                        </div>
                      </StaggeredAnimation>
                    </div>
                  </AnimatedElement>
                </div>

                <AnimatedElement animation="scale-up" delay={1300}>
                  <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30 mobile-center">
                    <p className="font-bold text-white mb-4 mobile-center-text" style={{fontSize: '1.5rem'}}>
                      Si no actúas en 72 horas, no es que ''solo pierdas la oportunidad''. </p>
                    <p className="font-bold text-white mb-4 mobile-center-text" style={{fontSize: '1.5rem'}}>
                      Es que le entregas el cetro.
                    </p>

                    <StaggeredAnimation staggerDelay={100} animation="fade-up">
                      <div className="space-y-4 mobile-center">
                        <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          No te pedimos un centavo.
                        </p>

                        <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          No te pedimos fe.
                        </p>

                        <PersonalizedText className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Solo necesitamos 12 minutos para estar seguros de podes ser el próximo rey.
                        </PersonalizedText>

                        <PersonalizedText className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Por que si eres seleccionado y no generamos un 20% en ganancias nuevas en 90 días. Seremos nosotros los que te paguen $20 Millones de pesos.
                        </PersonalizedText>

                        <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Eso no es promesa.
                        </p>

                        <p className="text-white/90 mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Es un contrato.
                        </p>
                      </div>
                    </StaggeredAnimation>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Bottom Section */}
        <AnimatedElement animation="scale-up" delay={1400} duration={600}>
          <div className="max-w-4xl mx-auto mobile-center">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-accent/30 mobile-center">
              <div className="text-center space-y-6 mobile-center">
                <AnimatedElement animation="scale-up" delay={1500}>
                  <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                    <span className="text-accent font-semibold" style={{fontSize: '1rem'}}>LA INVITACIÓN FUE SOLO EL PRIMER FILTRO</span>
                  </div>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={1600}>
                  <h3 className="font-bold text-foreground mb-8 mobile-center-text" style={{fontSize: '2.5rem'}}>
                    Recuerda: Estar aquí no garantiza la sociedad.
                  </h3>
                </AnimatedElement>

                <div className="space-y-4 mobile-center">
                  <StaggeredAnimation staggerDelay={200} animation="slide-left">
                    <div className="flex items-center gap-4 pt-4 mobile-stack mobile-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                        <AlertTriangle className="w-5 h-5 text-accent" />
                        <span className="text-foreground font-medium" style={{fontSize: '1rem'}}>Tiempo limitado</span>
                      </div>
                      <p className="text-muted-foreground mobile-center-text">El trono está siendo disputado ahora mismo.</p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 mobile-stack mobile-center">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                        <Target className="w-5 h-5 text-accent" />
                        <span className="text-foreground font-medium" style={{fontSize: '1rem'}}>Oportunidad única</span>
                      </div>
                      <PersonalizedText className="text-muted-foreground mobile-center-text">El próximo rey será decidido en las próximas 72 horas.</PersonalizedText>
                    </div>
                  </StaggeredAnimation>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* CTA Button */}
        <AnimatedElement animation="bounce-in" delay={1700}>
          <div className="max-w-4xl mx-auto text-center mt-12 mobile-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 whitespace-normal break-words text-center group mobile-center-block font-semibold touch-manipulation pulse-glow"
              style={{minHeight: '3.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)', lineHeight: '1.2'}}
            >
              <div className="flex items-center justify-center w-full gap-2" style={{minHeight: '2.5rem'}}>
                <span className="flex-1 text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2rem'}}>
                  <span className="hidden sm:inline" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>
                    <PersonalizedText as="span">Responder "CORONA" y reclamar mi trono.</PersonalizedText>
                  </span>
                  <span className="sm:hidden" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>
                    <PersonalizedText as="span">Reclamar mi trono con "CORONA"</PersonalizedText>
                  </span>
                </span>
                <Mail className="flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};