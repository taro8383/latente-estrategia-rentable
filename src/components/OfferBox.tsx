import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, AlertTriangle, Crown } from "lucide-react";
import logo from "/LoDi-logo.svg";
import { LocalTimeCountdown } from "@/components/LocalTimeCountdown";
import { PersonalizedText } from "@/components/PersonalizedText";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

export const OfferBox = () => {
  const scrollToSection1 = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="oferta-especial" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main offer container */}
          <AnimatedElement animation="scale-up" delay={200} duration={800}>
            <div className="relative rounded-3xl overflow-hidden shadow-strong border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-accent/5">

              {/* Top accent bar */}
              <div className="h-2 accent-gradient"></div>
            
              <div className="p-8 md:p-12">
                {/* Company Logo */}
                <AnimatedElement animation="fade-down" delay={300}>
                  <div className="flex justify-center mb-8 mobile-center">
                    <img
                      src={logo}
                      alt="LoDi Logo"
                      className="h-16 w-auto mobile-center-block"
                    />
                  </div>
                </AnimatedElement>

                {/* Header */}
                <AnimatedElement animation="fade-up" delay={400}>
                  <div className="text-center mb-8 mobile-center">
                    <AnimatedElement animation="scale-up" delay={500}>
                      <div className="relative inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mx-auto mobile-center-block">
                        <div className="flex items-center justify-center">
                          <span className="text-accent font-bold relative z-10" style={{fontSize: '0.875rem', paddingLeft: '1.5rem'}}>
                            INVITACIÓN EXCLUSIVA
                          </span>
                          <Crown className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                        </div>
                      </div>
                    </AnimatedElement>

                    <h2 className="font-bold text-foreground mb-4 mobile-center-text" style={{fontSize: '3rem'}}>
                      Esta alianza es para vos sí:
                    </h2>
                  </div>
                </AnimatedElement>

              {/* Qualification checklist */}
              <AnimatedElement animation="fade-up" delay={600}>
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-border mobile-center">
                  <StaggeredAnimation staggerDelay={200} animation="slide-left">
                    <div className="space-y-4 mobile-center">
                      <div className="flex items-start gap-3 mobile-stack mobile-center">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 mobile-center-block">
                          <span className="text-white font-bold" style={{fontSize: '0.75rem'}}>✓</span>
                        </div>
                        <p className="text-foreground font-medium mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Ya tenés calidad, operación y presencia <span className="text-accent">(vos lo sabés)</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-3 mobile-stack mobile-center">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5 mobile-center-block">
                          <span className="text-white font-bold" style={{fontSize: '0.75rem'}}>✓</span>
                        </div>
                        <PersonalizedText className="text-foreground font-medium mobile-center-text" style={{fontSize: '1.125rem'}}>
                          Estás listo para actuar en 72 horas <span className="text-muted-foreground">(no "cuando pueda")</span>
                        </PersonalizedText>
                      </div>
                    </div>
                  </StaggeredAnimation>
                </div>
              </AnimatedElement>

              {/* Guarantee section */}
              <AnimatedElement animation="scale-up" delay={800} duration={600}>
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 mb-8 border border-accent/30 mobile-center">
                  <AnimatedElement animation="slide-right" delay={900}>
                    <div className="flex items-center gap-3 mb-4 mobile-stack mobile-center">
                      <Shield className="w-8 h-8 text-accent flex-shrink-0 mobile-center-block" />
                      <h3 className="font-bold text-foreground mobile-center-text" style={{fontSize: '2.5rem'}}>
                        Nuestra garantía inquebrantable
                      </h3>
                    </div>
                  </AnimatedElement>

                  <div className="space-y-4 mobile-center">
                    <AnimatedElement animation="fade-up" delay={1000}>
                      <p className="text-foreground leading-relaxed mobile-center-text" style={{fontSize: '1.5rem'}}>
                        Si en 90 días no ves <span className="text-accent font-bold" style={{fontSize: '2rem'}}>20% en ganancias adicionales</span> en tu cuenta…
                      </p>
                    </AnimatedElement>

                    <AnimatedElement animation="bounce-in" delay={1100}>
                      <div className="bg-background/80 rounded-xl p-4 sm:p-6 border border-accent/20 mobile-center max-w-sm mx-auto">
                        <p className="text-foreground italic text-center" style={{fontSize: '0.95rem', lineHeight: '1.5'}}>
                        No solo te pagamos <strong>$20 millones</strong> por hacerte perder el tiempo,
                        </p>
                        <p className="text-foreground font-semibold text-center mt-2" style={{fontSize: '0.95rem', lineHeight: '1.5'}}>
                        yo personalmente <strong>Matias Vallejos</strong> volaré a tu ciudad, me sentaré en tu oficina y te entregaré un cheque por esa suma.
                        </p>
                        <p className="text-foreground text-center mt-2" style={{fontSize: '0.95rem', lineHeight: '1.5'}}>
                        Luego despediremos a nuestro equipo por no cumplir con los estándares para un cliente de tu calibre.
                        </p>
                      </div>
                    </AnimatedElement>
                  </div>
                </div>
              </AnimatedElement>

              {/* Bottom section */}
              <AnimatedElement animation="fade-up" delay={1200}>
                <div className="text-center space-y-6 mobile-center">
                  <StaggeredAnimation staggerDelay={150} animation="fade-up">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground mobile-stack mobile-center">
                      <div className="flex items-center gap-2 mobile-center">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="font-medium" style={{fontSize: '1rem'}}>Sin costos</span>
                      </div>
                      <div className="flex items-center gap-2 mobile-center">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="font-medium" style={{fontSize: '1rem'}}>Sin riesgo</span>
                      </div>
                      <div className="flex items-center gap-2 mobile-center">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="font-medium" style={{fontSize: '1rem'}}>Solo resultados compartidos</span>
                      </div>
                    </div>
                  </StaggeredAnimation>

                  {/* Urgency timer */}
                  <AnimatedElement animation="scale-up" delay={1400}>
                    <LocalTimeCountdown />
                  </AnimatedElement>

                  {/* CTA Button */}
                  <AnimatedElement animation="bounce-in" delay={1500}>
                    <Button
                      onClick={scrollToSection1}
                      size="lg"
                      className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 whitespace-normal break-words text-center group mobile-center-block touch-manipulation pulse-glow"
                      style={{minHeight: '3.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)', lineHeight: '1.2'}}
                    >
                      <div className="flex items-center justify-center w-full gap-2" style={{minHeight: '2.5rem'}}>
                        <span className="flex-1 text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2rem'}}>
                          <span className="hidden sm:inline" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Aceptar la invitación y construir mi legado</span>
                          <span className="sm:hidden" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Aceptar invitación y construir mi legado</span>
                        </span>
                        <ArrowRight className="flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </Button>
                  </AnimatedElement>
                </div>
              </AnimatedElement>
            </div>
          </div>
      </AnimatedElement>
      </div>
      </div>
    </section>
  );
};
