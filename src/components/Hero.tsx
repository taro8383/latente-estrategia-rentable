import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroLeader from "@/assets/hero-leader.jpg";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 order-1 md:order-1">
          <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20 mb-2 sm:mb-3 md:mb-4">
            <span className="text-accent font-semibold text-xs sm:text-sm md:text-base text-white">Para líderes que quieren serlo de verdad</span>
          </div>
          
          <h1 className="leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
            ¿Segundo lugar?{" "}
            <span className="text-accent">Eso no es éxito.</span>
            <br />
            Es una tortura cara.
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Trabajas más que nadie. Ganas bien. Tienes prestigio. <br className="hidden sm:block" />
            Pero ese <strong>número uno</strong> en tu mercado te roba el sueño cada noche.
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0">
            No viniste a ser "el otro negocio exitoso". Viniste a <strong>dominar</strong>. <br className="hidden sm:block" />
            Y mientras sigues atrapado en lo operativo, el reloj corre... y el legado que querías dejar se desvanece.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center pt-4 sm:pt-6 md:pt-8">
            <Button
              size="default"
              onClick={scrollToContact}
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 group max-w-xs sm:max-w-none mx-auto sm:mx-0"
            >
              <span className="text-center hidden sm:inline">Quiero recuperar mi tiempo y multiplicar ganancias</span>
              <span className="text-center sm:hidden">Recuperar tiempo y ganancias</span>
              <ArrowRight className="ml-1 sm:ml-2 flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-white/70 pt-2 sm:pt-3 md:pt-4">
            Sin riesgo. Solo pagas por resultados reales.
          </p>
        </div>

        {/* Image */}
        <div className="order-2 md:order-2">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-strong aspect-[4/5] sm:aspect-[3/4] md:aspect-[5/4] lg:aspect-[4/3]">
            <img
              src={heroLeader}
              alt="Líder de negocios exitoso y confiado"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
