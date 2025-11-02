import { Search, Map, Shield, Users, Crown, CheckCircle2, ArrowRight, Clock, TrendingUp } from "lucide-react";
import strategicPartnersImage from "@/assets/Stategic-Partnership.png";
import { Button } from "@/components/ui/button";

const partnershipSteps = [
  {
    number: "1",
    icon: Search,
    title: "Descubrir si tu empresa es una mina de oro sin explotar",
    subtitle: "¿Eres campeón? → Evaluación en 12 min",
    description: "La evaluación no es una entrevista. Es un algoritmo de 12 minutos que analiza tu capacidad real de dominio, basado en datos reales de +47 empresas que ya lo usaron."
  },
  {
    number: "2", 
    icon: Map,
    title: "El mapa detallado hacia el #1",
    subtitle: "Mapa al #1 → 3–5 palancas reales (gratis)",
    description: "Te entregamos un plan estratégico personalizado con las palancas exactas que necesitas activar para dominar tu mercado."
  },
  {
    number: "3",
    icon: Shield,
    title: "La oportunidad de activar el sistema sin tocar tu billetera",
    subtitle: "Sin riesgo → Ganamos solo si tú ganas",
    description: "No hay inversión inicial. No hay honorarios. Solo compartimos los resultados que generamos juntos."
  },
  {
    number: "4",
    icon: Users,
    title: "Ejecución conjunta",
    subtitle: "Ejecutamos juntos → Nosotros implantamos, vos liderás",
    description: "Trabajamos codo a codo implementando cada sistema. Nosotros encargamos de la ejecución técnica, vos de la visión estratégica."
  }
];

export const StrategicPartners = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="socios-estrategicos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Strategic Partners Image */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
          <img
            src={strategicPartnersImage}
            alt="Expertos en cuero trabajando en estrategia de dominio"
            className="w-full h-64 md:h-96 object-cover mobile-center-block"
          />
        </div>
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
            <span className="text-accent font-semibold">ALIANZA ESTRATÉGICA CON RIESGO COMPARTIDO</span>
          </div>
          
          <h2 className="mb-6 mobile-center-text">
            ¿Cómo funciona una <span className="text-accent">sociedad con Latente</span>?
          </h2>

          <p className="text-xl text-muted-foreground mobile-center-text">
            Esto no es un servicio. Es una alianza estratégica con riesgo compartido.
          </p>
        </div>

        {/* Partnership Steps */}
        <div className="max-w-6xl mx-auto space-y-8 mb-16">
          {partnershipSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-smooth group mobile-stack mobile-center"
              >
                <div className="flex-shrink-0 mobile-center">
                  <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-medium mobile-center-block">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center md:hidden mobile-center">
                    <span className="text-xl font-bold text-accent">{step.number}</span>
                  </div>
                </div>

                <div className="flex-1 mobile-center-text">
                  <div className="flex items-center gap-4 mb-3 md:items-center mobile-stack mobile-center">
                    <span className="hidden md:block text-4xl font-bold text-accent/20">{step.number}</span>
                    <h3 className="text-2xl font-bold text-foreground mobile-center-text">{step.title}</h3>
                  </div>
                  <div className="mb-3 mobile-center">
                    <span className="inline-block px-3 py-1 bg-accent/10 rounded-full border border-accent/20 mobile-center-block">
                      <span className="text-accent font-semibold text-sm">{step.subtitle}</span>
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mobile-center-text">
                    {step.description}
                  </p>
                </div>

                {index < partnershipSteps.length - 1 && (
                  <div className="hidden md:block absolute left-8 -bottom-8 w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Model Differentiator */}
        <div className="max-w-5xl mx-auto mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="text-center space-y-8 mobile-center">
              <Crown className="w-16 h-16 text-accent mx-auto mobile-center-block" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mobile-center-text">
                El modelo que cambia todo
              </h3>

              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mobile-center">
                <p className="text-xl text-foreground mb-4 mobile-center-text">
                  Mientras los consultores cobran cientos de miles por adelantado y desaparecen…
                </p>
                <p className="text-2xl font-bold text-accent mobile-center-text">
                  Nosotros invertimos más de 300 horas antes de ver un solo peso.
                </p>
              </div>

              <div className="space-y-4 mobile-center">
                <p className="text-xl font-bold text-foreground mobile-center-text">
                  Somos los únicos en Latinoamérica que trabajamos así.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mobile-stack mobile-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20 mobile-center">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-foreground font-medium">No hay honorarios</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20 mobile-center">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-foreground font-medium">No hay contratos de servicio</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full border border-destructive/20 mobile-center">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span className="text-foreground font-medium">No hay pagos por adelantado</span>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30 mobile-center">
                <p className="text-2xl font-bold text-white mobile-center-text">
                  Si no hay crecimiento exponencial, No hay sociedad.
                </p>
                <p className="text-lg text-foreground mt-2 mobile-center-text">
                  Así de simple.
                </p>
              </div>

              <Button
                onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-6 whitespace-normal break-words text-center group mt-6 mobile-center-block"
              >
                <span className="block sm:inline">Quiero ser socio estratégico de Latente</span>
                <ArrowRight className="ml-0 sm:ml-2 mt-2 sm:mt-0 group-hover:translate-x-1 transition-smooth w-5 h-5 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};