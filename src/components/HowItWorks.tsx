import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Auditoría profunda",
    description: "Analizamos cada aspecto de tu negocio. Operaciones, finanzas, equipo, marketing, procesos. Encontramos exactamente dónde está el dinero que dejas sobre la mesa."
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Estrategia personalizada",
    description: "No hay soluciones genéricas. Diseñamos un plan específico para tu negocio, tu mercado, tu situación. Con acciones concretas y resultados medibles."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Implementación contigo",
    description: "No te dejamos solo con un PDF. Trabajamos codo a codo implementando cada mejora. Ajustamos sobre la marcha. Nos aseguramos de que funcione."
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Resultados sostenibles",
    description: "Creamos sistemas que siguen funcionando cuando ya no estamos. Tu negocio se vuelve más rentable, más eficiente, más escalable. Y tú recuperas tu tiempo."
  }
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">
            ¿Cómo funciona <span className="text-accent">Latente</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Un proceso probado que genera resultados predecibles
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-smooth group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-medium">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center md:hidden">
                    <span className="text-xl font-bold text-accent">{step.number}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="hidden md:block text-4xl font-bold text-accent/20">{step.number}</span>
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-8 -bottom-8 w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16 p-8 rounded-2xl bg-card border border-accent/30 shadow-medium">
          <p className="text-xl font-semibold text-foreground mb-4">
            El proceso completo está diseñado para una cosa:
          </p>
          <p className="text-2xl md:text-3xl font-bold text-accent">
            Generarte de 2x a 4x más ganancias en el primer año
          </p>
        </div>
      </div>
    </section>
  );
};
