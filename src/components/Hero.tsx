import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative hero-gradient text-primary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20 mb-4">
            <span className="text-accent font-semibold">Para líderes que quieren serlo de verdad</span>
          </div>
          
          <h1 className="leading-tight">
            ¿Segundo lugar?{" "}
            <span className="text-accent">Eso no es éxito.</span>
            <br />
            Es una tortura cara.
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Trabajas más que nadie. Ganas bien. Tienes prestigio. <br />
            Pero ese <strong>número uno</strong> en tu mercado te roba el sueño cada noche.
          </p>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            No viniste a ser "el otro negocio exitoso". Viniste a <strong>dominar</strong>. <br />
            Y mientras sigues atrapado en lo operativo, el reloj corre... y el legado que querías dejar se desvanece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-lg px-8 py-6 group"
            >
              Quiero recuperar mi tiempo y multiplicar ganancias
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/70 pt-4">
            Sin riesgo. Solo pagas por resultados reales.
          </p>
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
