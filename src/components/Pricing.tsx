import { Crown, Target, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import successCelebration from "@/assets/success-celebration.jpg";
import logoDi from "/LoDi-logo.svg";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

const uniqueCombination = [
  {
    icon: Target,
    title: "Dominio técnico de estos tres sistemas",
    description: "No son teoría de libros. Son sistemas forjados en la trinchera, probados en batallas reales de mercado."
  },
  {
    icon: Crown,
    title: "Experiencia real de implementación desde adentro",
    description: "No llegamos con PowerPoint. Llegamos con las cicatrices de haber tomado las mismas decisiones que tú tomas hoy."
  },
  {
    icon: TrendingUp,
    title: "Un modelo donde solo ganamos si tú generas ganancias netas nuevas",
    description: "Tu éxito es nuestro único ingreso. Si no creamos valor real, no cobramos. Simple."
  }
];

export const Pricing = () => {
  const { data } = usePersonalization();

  // Simple direct gender replacement
  const gender = data?.genderInfo?.gender || 'male';
  const isFemale = gender === 'female';
  console.log('Pricing component - Gender:', gender, 'IsFemale:', isFemale);

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="modelo" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Success Image */}
        <AnimatedElement animation="fade-down" delay={100}>
          <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong border-4 border-accent/30 mobile-center">
            <img
              src={successCelebration}
              alt="Socios de Latente celebrando el dominio del mercado"
              className="w-full h-64 md:h-80 object-cover mobile-center-block"
            />
          </div>
        </AnimatedElement>

        {/* Header */}
        <AnimatedElement animation="fade-up" delay={200}>
          <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
            <AnimatedElement animation="scale-up" delay={300}>
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold text-white" style={{fontSize: '1rem'}}>LA DIFERENCIA QUE NOS HACE ÚNICOS</span>
              </div>
            </AnimatedElement>

            <h2 className="mb-6 text-white mobile-center-text" style={{fontSize: '2rem'}}>
              En toda Latinoamérica, <span className="text-accent">nadie combina.</span>
            </h2>
          </div>
        </AnimatedElement>

        {/* Unique Combination Grid */}
        <StaggeredAnimation staggerDelay={150} animation="scale-up">
          {uniqueCombination.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-smooth mobile-center">
                <div className="flex flex-col items-center text-center space-y-4 mobile-center">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mobile-center-block">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-white mobile-center-text" style={{fontSize: '1.25rem'}}>{item.title}</h3>
                  <p className="text-white/80 leading-relaxed mobile-center-text" style={{fontSize: '1rem'}}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </StaggeredAnimation>

        {/* Latente Identity Section */}
        <AnimatedElement animation="fade-up" delay={600}>
          <div className="max-w-5xl mx-auto mb-16 mobile-center">
            <div className="bg-black rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
              <div className="text-center space-y-6 mobile-center">
                <AnimatedElement animation="scale-up" delay={700}>
                  <h3 className="font-bold text-white mb-8 mobile-center-text" style={{fontSize: '2.5rem'}}>
                    Somos Latente.
                  </h3>
                </AnimatedElement>

                {/* Logo INSIDE container, BELOW "Somos Latente." and ABOVE "No tenemos clientes, solo socios." */}
                <AnimatedElement animation="bounce-in" delay={800}>
                  <div className="w-full h-auto max-w-md mx-auto mb-8 mobile-center">
                    <img
                      src={logoDi}
                      alt="LoDi Logo"
                      className="w-full h-auto mobile-center-block"
                    />
                  </div>
                </AnimatedElement>

                <div className="space-y-4 mobile-center">
                  <AnimatedElement animation="fade-up" delay={900}>
                    <p className="text-white/90 mobile-center-text" style={{fontSize: '1.25rem'}}>
                      No tenemos clientes, solo <span className="text-accent font-bold">socios.</span>
                    </p>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={1000}>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={1100}>
                    <p className="font-bold text-white mobile-center-text" style={{fontSize: '1.5rem'}}>
                      No "analizamos tu negocio".
                    </p>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={1200}>
                    <p className="text-white/90 leading-relaxed mobile-center-text" style={{fontSize: '1.25rem'}}>
                      Construimos motores de crecimiento que generan ingresos nuevos… y compartimos las ganancias.
                    </p>
                  </AnimatedElement>
                </div>

                {/* Risk-Free Benefits */}
                <StaggeredAnimation staggerDelay={100} animation="scale-up">
                  <div className="flex flex-wrap justify-center gap-6 pt-6 mobile-stack mobile-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-white font-medium" style={{fontSize: '1rem'}}>Sin inversión inicial</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-white font-medium" style={{fontSize: '1rem'}}>Sin honorarios</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-white font-medium" style={{fontSize: '1rem'}}>Sin riesgo</span>
                    </div>
                  </div>
                </StaggeredAnimation>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* The Question Section */}
        <AnimatedElement animation="scale-up" delay={1400} duration={600}>
          <div className="max-w-4xl mx-auto mobile-center">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-accent/30 mobile-center">
              <div className="text-center space-y-6 mobile-center">
                <AnimatedElement animation="scale-up" delay={1500}>
                  <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                    <span className="text-accent font-semibold" style={{fontSize: '1rem'}}>LA ÚNICA PREGUNTA QUE IMPORTA</span>
                  </div>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={1600}>
                  <h3 className="font-bold text-foreground mb-8 mobile-center-text" style={{fontSize: '2.5rem'}}>
                    ¿Tienes lo que se necesita para ser <span className="text-accent">{isFemale ? 'la #1 absoluta' : 'el #1 absoluto'}</span>?
                  </h3>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={1700}>
                  <p className="text-muted-foreground leading-relaxed mb-8 mobile-center-text" style={{fontSize: '1.25rem'}}>
                    Eso es lo que necesitamos evaluar.
                  </p>
                </AnimatedElement>

                <AnimatedElement animation="bounce-in" delay={1800}>
                  <Button
                    onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                    size="lg"
                    className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 whitespace-normal break-words text-center group font-semibold touch-manipulation pulse-glow"
                    style={{minHeight: '3.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)', lineHeight: '1.2'}}
                  >
                    <div className="flex items-center justify-center w-full gap-2" style={{minHeight: '2.5rem'}}>
                      <span className="flex-1 text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2rem'}}>
                        <span className="hidden sm:inline" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Evaluar si tengo lo necesario para dominar mi mercado</span>
                        <span className="sm:hidden" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Evaluar mi potencial de dominio</span>
                      </span>
                      <ArrowRight className="flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </Button>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={1900}>
                  <p className="text-muted-foreground mt-6 mobile-center-text" style={{fontSize: '0.875rem'}}>
                    Sin compromiso. Solo una conversación honesta sobre tu potencial de dominio.
                  </p>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Bottom Trust Message */}
        <AnimatedElement animation="fade-up" delay={2000}>
          <div className="max-w-3xl mx-auto text-center mt-12 p-6 rounded-2xl bg-accent/10 border border-accent/30 mobile-center">
            <p className="font-semibold text-white mobile-center-text" style={{fontSize: '1.125rem'}}>
              Esta alianza no es para cualquiera.
              <br />
              Es para quienes entienden que <span className="text-accent">el segundo lugar es el primer perdedor.</span>
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};
