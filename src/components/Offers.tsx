import { CheckCircle2, Gift, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: 1,
    name: "El Diagnóstico de Ganancias",
    icon: Gift,
    price: "GRATIS",
    priceDetail: "Sin costo, sin obligación",
    description: "Una sesión de diagnóstico de ganancias de 60 minutos con mucha información. Revisaremos tus principales actividades. Esto nos ayudará a encontrar las mejores oportunidades para aumentar las ganancias de tu negocio que aún no has usado.",
    cta: "Agendar diagnóstico gratis",
    highlighted: false,
    benefits: [
      {
        title: "Sin costo, sin obligación",
        description: "La característica más importante. No te cuesta nada."
      },
      {
        title: "Claridad sobre tu oportunidad #1 de ganancias",
        description: "No te damos una lista genérica. Señalamos la palanca más grande y te mostramos exactamente cómo usarla."
      },
      {
        title: "Un 'Mapa de Ganancias' que explica todo",
        description: "Este documento te muestra qué hacer, cuánto podría costar o ganar, y qué necesitas para tener éxito."
      },
      {
        title: "Sin presión de venta",
        description: "Este es un diagnóstico, no un discurso de ventas."
      }
    ]
  },
  {
    id: 2,
    name: "El Proyecto Acelerador de Ganancias",
    icon: Rocket,
    price: "30%",
    priceDetail: "de los primeros $100,000 en ganancias anuales que generemos",
    description: "Prometemos un programa enfocado de 90 días donde encontramos y abrimos una forma específica de mejorar tus ganancias. Esta forma traerá al menos $100,000 en ganancias cada año.",
    cta: "Iniciar proyecto",
    highlighted: true,
    benefits: [
      {
        title: "Incluye todo lo del Nivel 1"
      },
      {
        title: "Nosotros hacemos el trabajo",
        description: "Nuestro equipo lidera la implementación. Tú proporcionas acceso, no trabajo."
      },
      {
        title: "Te prometemos que ganarás $100,000",
        description: "Prometemos por escrito que encontraremos formas para que ganes al menos $100,000 más cada año. Si no te ayudamos a ganar ese dinero extra, no tienes que pagarnos."
      },
      {
        title: "Gerente del proyecto",
        description: "Esta persona es tu contacto principal y se encarga de todo el proyecto de 90 días por ti."
      },
      {
        title: "Reuniones semanales de revisión",
        description: "Estas son reuniones breves de 30 minutos cada semana. Revisamos información, ajustamos planes si es necesario, y seguimos avanzando."
      },
      {
        title: "Plan para crecer después del proyecto",
        description: "Un plan para ganar el doble de dinero con esta nueva forma en el próximo año."
      }
    ]
  },
  {
    id: 3,
    name: "La Sociedad Completa de Rentabilidad",
    icon: Crown,
    price: "20%",
    priceDetail: "de todas las ganancias netas nuevas durante los primeros 24 meses",
    description: "Un año completo trabajando juntos donde nuestro equipo se convierte en tu equipo especial de ganancias. No solo buscamos una forma de ganar dinero; cambiamos todo tu negocio para ganar mucho más dinero.",
    cta: "Solicitar sociedad",
    highlighted: false,
    benefits: [
      {
        title: "Incluye todo lo de los Niveles 1 y 2"
      },
      {
        title: "Tu equipo de ganancias",
        description: "Tendrás un equipo con un estratega, un analista y un gerente de implementación."
      },
      {
        title: "Aumentar las ganancias de todo tu negocio",
        description: "Nos enfocamos en mejorar tus ganancias de todas las formas posibles. Esto significa vender más productos, gastar menos en manejar tu negocio, y encontrar nuevas formas de ganar dinero."
      },
      {
        title: "Promesa de 'solucionador de problemas'",
        description: "Prometemos ahorrarte al menos 15 horas de tu tiempo cada semana en los primeros 3 meses."
      },
      {
        title: "Panel de ganancias en tiempo real",
        description: "Un panel que se actualiza cada semana para mostrarte la cantidad exacta de ganancias obtenidas."
      },
      {
        title: "Primer acceso a todos los nuevos marcos de Latente",
        description: "Obtienes nuestras formas más nuevas de ganar más dinero y herramientas antes que nadie."
      },
      {
        title: "Reuniones de negocios cada tres meses",
        description: "Estas reuniones con nuestros mejores socios te ayudarán a planear cómo convertirte en el mejor negocio de tu mercado."
      },
      {
        title: "El bono 'eliminador de obstáculos'",
        description: "Si no te ahorramos al menos 15 horas a la semana en los primeros 90 días, te ayudaremos a negociar tus 5 contratos principales con proveedores sin cobrarte dinero extra."
      }
    ]
  }
];

export const Offers = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="text-accent font-semibold">Elige tu nivel</span>
          </div>
          
          <h2 className="mb-6">
            Nuestra <span className="text-accent">oferta irresistible</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tres formas de empezar. Todas diseñadas para que tú ganes.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 transition-smooth ${
                  tier.highlighted
                    ? 'bg-primary text-primary-foreground shadow-strong scale-105 border-2 border-accent'
                    : 'bg-card border border-border shadow-medium hover:shadow-strong'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 accent-gradient text-white text-sm font-bold rounded-full shadow-medium">
                    MÁS POPULAR
                  </div>
                )}

                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4 ${
                      tier.highlighted 
                        ? 'bg-accent/20' 
                        : 'bg-accent/10'
                    }`}>
                      <Icon className={`w-8 h-8 ${tier.highlighted ? 'text-accent' : 'text-accent'}`} />
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${
                      tier.highlighted ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {tier.name}
                    </h3>
                    
                    <div className="mb-4">
                      <p className={`text-4xl font-bold mb-1 ${
                        tier.highlighted ? 'text-accent' : 'text-accent'
                      }`}>
                        {tier.price}
                      </p>
                      <p className={`text-sm ${
                        tier.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {tier.priceDetail}
                      </p>
                    </div>

                    <p className={`text-sm leading-relaxed ${
                      tier.highlighted ? 'text-primary-foreground/90' : 'text-muted-foreground'
                    }`}>
                      {tier.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="flex-1 space-y-4 mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? 'text-accent' : 'text-accent'
                        }`} />
                        <div>
                          <p className={`font-semibold text-sm ${
                            tier.highlighted ? 'text-primary-foreground' : 'text-foreground'
                          }`}>
                            {benefit.title}
                          </p>
                          {benefit.description && (
                            <p className={`text-xs mt-1 ${
                              tier.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={scrollToContact}
                    size="lg"
                    className={`w-full ${
                      tier.highlighted
                        ? 'accent-gradient text-white hover:scale-105 shadow-medium'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    } transition-bounce`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-card border border-border shadow-soft">
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">¿No estás seguro cuál elegir?</strong>
            <br />
            Comienza con el diagnóstico gratuito. Te diremos exactamente qué nivel tiene más sentido para tu situación.
          </p>
        </div>
      </div>
    </section>
  );
};
