import { Users, Eye, Target, Crown, TrendingUp } from "lucide-react";
import marketingPlan from "@/assets/Marketing-Plan.png";

const insiderDifference = [
  {
    icon: Users,
    title: "No llegamos con diagnósticos desde afuera",
    description: "Estuvimos en la trinchera, tomando las mismas decisiones que tú tomas hoy:"
  },
  {
    icon: Eye,
    title: "Conocemos la realidad brutal de la ejecución",
    description: "Las decisiones que nadie te cuenta en los cursos de MBA:"
  }
];

const brutalRealities = [
  "¿Qué sistema implementar primero?",
  "Cómo manejar la resistencia del equipo", 
  "Cómo escalar sin romper la operación"
];

const proofPoints = [
  {
    icon: Target,
    title: "Sistemas forjados en batalla",
    description: "Hace 10 años, estábamos adentro de una empresa joyera, no como consultores, sino como parte del equipo. Vimos que su mensaje de 'calidad' se perdía en el ruido."
  },
  {
    icon: TrendingUp,
    title: "Resultados, no teoría",
    description: "Implementamos nuestro sistema de propuesta de valor único. El resultado no fue un 'incremento'. Fue un dominio del mercado. Las ventas aumentaron un 150%."
  }
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Marketing Plan Image */}
        <div className="max-w-6xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
          <img
            src={marketingPlan}
            alt="Plan de marketing para dominio de mercado"
            className="w-full h-64 md:h-96 object-cover mobile-center-block"
          />
        </div>
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
            <span className="text-accent font-semibold">Confidencialidad total. Resultados reales.</span>
          </div>
          
          <h2 className="mb-6 mobile-center-text">
            Los consultores externos ven tu negocio como un{" "}
            <span className="text-accent">PowerPoint.</span>{" "}
            Nosotros lo vemos como nuestro{" "}
            <span className="text-accent">legado.</span>
          </h2>
        </div>

        {/* Main Difference Section */}
        <div className="max-w-6xl mx-auto mb-16 mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="grid md:grid-cols-2 gap-8 mb-12 mobile-stack mobile-center">
              {insiderDifference.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 mobile-stack mobile-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mobile-center-block">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="mobile-center-text">
                      <h3 className="text-xl font-bold text-foreground mb-2 mobile-center-text">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mobile-center-text">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Brutal Realities */}
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mobile-center">
              <h4 className="text-lg font-bold text-foreground mb-4 text-center mobile-center-text">
                Por eso nuestros sistemas no son teoría. Son herramientas forjadas.
              </h4>
              <div className="space-y-3 mobile-center">
                {brutalRealities.map((reality, index) => (
                  <div key={index} className="flex items-center justify-center gap-3 mobile-stack mobile-center">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mobile-center-block"></div>
                    <p className="text-foreground text-center flex-1 mobile-center-text">{reality}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proof Section */}
        <div className="max-w-6xl mx-auto space-y-8 mb-16 mobile-center">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-smooth mobile-stack mobile-center"
              >
                <div className="flex-shrink-0 mobile-center">
                  <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-medium mobile-center-block">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 mobile-center-text">
                  <h3 className="text-2xl font-bold text-foreground mb-3 mobile-center-text">
                    {point.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mobile-center-text">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto text-center mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <Crown className="w-12 h-12 text-accent mx-auto mb-6 mobile-center-block" />
           
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 mobile-center-text">
              Esta experiencia desde adentro nos convirtió en algo único.
            </h3>
           
            <p className="text-xl text-muted-foreground leading-relaxed mobile-center-text">
              Eso es lo que pasa cuando sabes qué botones presionar, desde adentro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
