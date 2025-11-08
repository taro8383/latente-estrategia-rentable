import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState, useMemo } from "react";
import heroLeader from "@/assets/hero-leader.jpg";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { AnimatedElement } from "@/components/ui/scroll-animations";

const HeroQuote = () => {
  const { replacer, data } = usePersonalization();
  
  // Memoize the entire quote content to prevent re-renders
  const quoteContent = useMemo(() => {
    if (!replacer) {
      return {
        __html: `"Imagina esto: tu hijo, en 2045, entra a una reunión en Nueva York. Alguien ve su portafolio y dice, en voz baja:
        '¿Eso es de <span className="text-accent font-semibold">tu marca</span>? Mi abuelo tenía uno igual… lo enterraron con él.'
        Eso no es un producto. <span className="text-accent font-bold">Es un legado.</span> Y el legado se construye ahora mismo."`
      };
    }

    const quoteText = '[historia]';
    
    // First apply variable replacement, then add HTML styling
    const processedQuote = replacer.replaceIndustryKeywords(replacer.replace(quoteText));
    
    // Get actual brand name to highlight it properly
    const brandName = data?.brandInfo?.name || '[brand name]';
    
    return {
      __html: processedQuote
        .replace(brandName, `<span className="text-accent font-semibold">${brandName}</span>`)
        .replace('Es un legado', '<span className="text-accent font-bold">Es un legado</span>')
    };
  }, [replacer, data?.brandInfo?.name]);
  
  return (
    <p
      className="text-white/90 italic leading-relaxed"
      style={{fontSize: '1rem'}}
      dangerouslySetInnerHTML={quoteContent}
    />
  );
};

export const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoUrl = "https://streamable.com/ku7cqt";
  const { data } = usePersonalization();

  // Simple direct gender replacement
  const gender = data?.genderInfo?.gender || 'male';
  const isFemale = gender === 'female';
  console.log('Hero component - Gender:', gender, 'IsFemale:', isFemale);

  const scrollToSection1 = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative hero-gradient text-primary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 sm:opacity-15">
        <div className="absolute top-6 right-2 w-24 h-24 sm:w-32 sm:h-32 sm:right-4 sm:top-8 md:w-40 md:h-40 md:right-6 md:top-10 lg:right-10 lg:top-20 lg:w-72 lg:h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-6 left-2 w-28 h-28 sm:w-36 sm:h-36 sm:left-4 sm:bottom-8 md:w-48 md:h-48 md:left-6 md:bottom-10 lg:left-10 lg:bottom-20 lg:w-80 lg:h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 order-1 md:order-1 mobile-center">
            <AnimatedElement animation="fade-down" delay={200}>
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20 mb-2 sm:mb-3 md:mb-4 mobile-center-block">
                <PersonalizedText as="span" className="text-accent font-semibold text-white" style={{fontSize: '0.875rem'}}>
                  Menos del 0.01% de las [calificador] reciben esta invitación
                </PersonalizedText>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={300} duration={1000}>
              <h1 className="leading-tight text-white" style={{fontSize: '3.5rem'}}>
                El segundo lugar es{" "}
                <span className="text-accent">el primer perdedor</span>
              </h1>
              <p className="leading-tight text-white mt-4" style={{fontSize: '3.5rem'}}>
                Bien. Estás aquí.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={500}>
              <PersonalizedText as="p" className="text-white/90 max-w-3xl mx-auto lg:mx-0 leading-relaxed mobile-center-text" style={{fontSize: '1.5rem'}}>
                Si estás leyendo esto, [reader name], es porque ves algo que el 99.7% de tus competidores todavía se niegan a ver,
                pero vos con tu instinto, <strong>lo sentiste incluso antes de abrir el email que te envié</strong>.
              </PersonalizedText>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={700}>
              <div className="text-white/80 max-w-2xl mx-auto mb-4 text-center mobile-center-text" style={{fontSize: '1.25rem'}}>
                El mercado no recompensa la calidad. <br className="hidden sm:block" />
                Recompensa {isFemale ? <>a la que <strong>se declara reina</strong></> : <>a el que <strong>se declara rey</strong></>}, y está {isFemale ? 'lista' : 'listo'} tomar ese lugar.
              </div>
            </AnimatedElement>

            <AnimatedElement animation="scale-up" delay={900} duration={600}>
              <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent/20 mb-6 mobile-center-block pulse-glow">
                <HeroQuote />
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={1100}>
              <PersonalizedText as="p" className="text-white/80 max-w-2xl mx-auto text-center mobile-center-text" style={{fontSize: '1.25rem'}}>
                Sospechas que tu empresa de [industria] tiene lo necesario para ser la <strong>#1 absoluta</strong>.<br className="hidden sm:block" />
                Tienes razón. El problema no es tu potencial... es el camino.
              </PersonalizedText>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={1300}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 md:pt-8 mobile-center-flex">
                <Button
                  size="lg"
                  onClick={scrollToSection1}
                  className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 whitespace-normal break-words text-center group font-semibold touch-manipulation pulse-glow"
                  style={{minHeight: '3.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)', lineHeight: '1.2'}}
                >
                  <div className="flex items-center justify-center w-full gap-2" style={{minHeight: '2.5rem'}}>
                    <span className="flex-1 text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2rem'}}>
                      <span className="hidden sm:inline" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Quiero construir mi legado como el #1</span>
                      <span className="sm:hidden" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>Construir mi legado #1</span>
                    </span>
                    <ArrowRight className="flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={1500}>
              <div className="space-y-2 pt-2 sm:pt-3 md:pt-4 mobile-center-text">
                <p className="text-white/70 text-center" style={{fontSize: '0.875rem'}}>
                  <span className="text-accent font-semibold">⚠ Esta conversación no está abierta al público.</span>
                </p>
                <p className="text-white/70 text-center" style={{fontSize: '0.875rem'}}>
                  Solo llegaste aquí por invitación directa.
                </p>
                <p className="text-white/60 text-center font-medium" style={{fontSize: '0.875rem'}}>
                  Sin riesgo. Sin pagos. Solo compartimos los resultados.
                </p>
              </div>
            </AnimatedElement>
          </div>

          {/* Image */}
          <div className="order-2 md:order-2 mobile-center">
            <AnimatedElement animation="fade-right" delay={400} duration={1000}>
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-strong aspect-[4/5] sm:aspect-[3/4] md:aspect-[5/4] lg:aspect-[4/3] cursor-pointer group mobile-center-block floating"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  src={heroLeader}
                  alt="Empresario de cuero visionario y exitoso"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  {...({ fetchpriority: "high" } as any)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 rounded-full p-4 sm:p-6 shadow-strong transform scale-95 group-hover:scale-100 transition-transform animate-pulse sm:animate-none pulse-glow">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white fill-white" />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
      
      {/* Video Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
      />
    </section>
  );
};
