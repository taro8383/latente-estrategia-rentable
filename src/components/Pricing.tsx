import { Crown, Target, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import successCelebration from "@/assets/success-celebration.jpg";
import logoDi from "/LoDi-logo.svg";

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
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="modelo" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Success Image */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong border-4 border-accent/30 mobile-center">
          <img
            src={successCelebration}
            alt="Socios de Latente celebrando el dominio del mercado"
            className="w-full h-64 md:h-80 object-cover mobile-center-block"
          />
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
            <span className="text-accent font-semibold text-white">LA DIFERENCIA QUE NOS HACE ÚNICOS</span>
          </div>
          
          <h2 className="mb-6 text-white mobile-center-text">
            En toda Latinoamérica, <span className="text-accent">nadie combina.</span>
          </h2>
        </div>

        {/* Unique Combination Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16 mobile-stack mobile-center">
          {uniqueCombination.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-smooth mobile-center">
                <div className="flex flex-col items-center text-center space-y-4 mobile-center">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mobile-center-block">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mobile-center-text">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed mobile-center-text">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Latente Identity Section */}
        <div className="max-w-5xl mx-auto mb-16 mobile-center">
          <div className="bg-black rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="text-center space-y-6 mobile-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 mobile-center-text">
                Somos Latente.
              </h3>
              
              {/* Logo INSIDE container, BELOW "Somos Latente." and ABOVE "No tenemos clientes, solo socios." */}
              <div className="w-full h-auto max-w-md mx-auto mb-8 mobile-center">
                <img
                  src={logoDi}
                  alt="LoDi Logo"
                  className="w-full h-auto mobile-center-block"
                />
              </div>
              
              <div className="space-y-4 mobile-center">
                <p className="text-xl text-white/90 mobile-center-text">
                  No tenemos clientes, solo <span className="text-accent font-bold">socios.</span>
                </p>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                
                <p className="text-2xl font-bold text-white mobile-center-text">
                  No "analizamos tu negocio".
                </p>
                
                <p className="text-xl text-white/90 leading-relaxed mobile-center-text">
                  Construimos motores de crecimiento que generan ingresos nuevos… y compartimos las ganancias.
                </p>
              </div>

              {/* Risk-Free Benefits */}
              <div className="flex flex-wrap justify-center gap-6 pt-6 mobile-stack mobile-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-white font-medium">Sin inversión inicial</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-white font-medium">Sin honorarios</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mobile-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-white font-medium">Sin riesgo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Question Section */}
        <div className="max-w-4xl mx-auto mobile-center">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-accent/30 mobile-center">
            <div className="text-center space-y-6 mobile-center">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold">LA ÚNICA PREGUNTA QUE IMPORTA</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8 mobile-center-text">
                ¿Tienes lo que se necesita para ser el <span className="text-accent">#1 absoluto</span>?
              </h3>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 mobile-center-text">
                Eso es lo que necesitamos evaluar.
              </p>

              <Button
                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-6 whitespace-normal break-words text-center group mobile-center-block"
              >
                <span className="block sm:inline">Evaluar si tengo lo necesario para dominar mi mercado</span>
                <ArrowRight className="ml-0 sm:ml-2 mt-2 sm:mt-0 group-hover:translate-x-1 transition-smooth w-5 h-5 flex-shrink-0" />
              </Button>

              <p className="text-sm text-muted-foreground mt-6 mobile-center-text">
                Sin compromiso. Solo una conversación honesta sobre tu potencial de dominio.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Message */}
        <div className="max-w-3xl mx-auto text-center mt-12 p-6 rounded-2xl bg-accent/10 border border-accent/30 mobile-center">
          <p className="text-lg font-semibold text-white mobile-center-text">
            Esta alianza no es para cualquiera.
            <br />
            Es para quienes entienden que <span className="text-accent">el segundo lugar es el primer perdedor.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
