import { CheckCircle2, Crown, Target, TrendingUp, ArrowRight, Zap, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import solutionPartnership from "@/assets/Hands.png";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

const systems = [
  {
    number: "01",
    icon: Crown,
    title: "El Protocolo de la «Elección Obvia»",
    subtitle: "(para duplicar ventas en 12 meses)",
    description: "Cómo reprogramar la percepción del mercado para que tus clientes vean a tus competidores como meras imitaciones baratas.",
    benefits: [
      <PersonalizedText key="avatar">[avatar]</PersonalizedText>,
      <PersonalizedText key="propuesta-pobre">Tu propuesta de valor ya no dice '[propuesta pobre]'. Expone la mentira de tu competidor: '[propuesta buena]'</PersonalizedText>,
      "Tu mensaje no 'atrae curiosos'… Filtra a los débiles: Si tu cliente no está dispuesto a pagar un 30% más por algo que dure 30 años, no es tu cliente.",
      "Tus alianzas ya no son 'colaboraciones con influencers'… Son alianzas con bancos privados que regalan tu billetera a sus clientes premium… porque tú les das estatus.",
      "Tus métricas ya no miden 'likes'… Miden cuántos clientes llaman a su madre para mostrar lo que compraron."
    ]
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "El sistema «Hidratación Rentable»",
    subtitle: "(para liberar un 30% de flujo de caja sin despedir a nadie)",
    description: "Cómo identificar y eliminar las 3-5 fugas silenciosas de capital que están drenando un 30% de tu flujo de caja (y no, no son los gastos obvios).",
    benefits: [
      <PersonalizedText key="automatizacion">Automatizas no para ahorrar, sino para liberar tu mente de lo trivial —así puedes enfocarte en '[automatizacion]'.</PersonalizedText>,
      "Reestructuras tu fiscalidad, no para 'pagar menos', sino para convertir cada peso en una bala de dominio: reinvertís en alianzas exclusivas, no en publicidad genérica.",
      <PersonalizedText key="trabajo-de-valor">Tu equipo no 'trabaja más', trabaja en lo que solo ellos pueden hacer: '[trabajo de valor]'.</PersonalizedText>,
      <PersonalizedText key="proveedor">Tus proveedores no 'bajan precios'… Firman acuerdos de lealtad: te reservan '[proveedor]'… a cambio de volumen garantizado por 3 años.</PersonalizedText>
    ]
  },
  {
    number: "03",
    icon: Zap,
    title: "La matriz de los «ingresos ocultos»",
    subtitle: "que tus competidores ni siquiera saben que existen",
    description: "Cómo activar flujos de ingresos ocultos que existen dentro de tu operación actual y que tus competidores son demasiado ciegos para ver, transformando gastos fijos en máquinas de hacer dinero.",
    benefits: [
      <PersonalizedText key="infrautilizado">Tus máquinas infrautilizadas no 'cuestan'… '[infrautilizado]'.</PersonalizedText>,
      <PersonalizedText key="membresia">Tus clientes no 'compran una vez'… '[membresia]'… y el 10% de lo que generan al referir a otros.</PersonalizedText>,
      <PersonalizedText key="metodo">Tus procesos internos no son 'secretos'… Son licenciables: '[metodo]'.</PersonalizedText>
    ]
  }
];

export const Solution = () => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const handleSystemClick = (systemNumber: string) => {
    setSelectedSystem(selectedSystem === systemNumber ? null : systemNumber);
  };

  return (
    <section id="solucion" className="py-24 md:py-32 subtle-gradient">
      <div className="container mx-auto px-4">
        {/* Partnership Image - Moved to Top */}
        <AnimatedElement animation="fade-down" delay={100}>
          <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
            <img
              src={solutionPartnership}
              alt="Expertos en cuero trabajando en estrategia de dominio"
              className="w-full h-64 md:h-96 object-cover mobile-center-block"
            />
          </div>
        </AnimatedElement>

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <AnimatedElement animation="fade-up" delay={200}>
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold" style={{fontSize: '1rem'}}>No es inspiración. Es ingeniería de dominio.</span>
              </div>
            </div>

            <h2 className="mb-6 mobile-center-text" style={{fontSize: '2rem'}}>
              Durante 15 años no estuvimos en salas de conferencias. Estuvimos en talleres, fábricas y salas de guerra ejecutivas.
            </h2>
          </AnimatedElement>
        </div>
        
        <AnimatedElement animation="fade-up" delay={300}>
          <p className="text-muted-foreground mb-8 text-center mobile-center-text" style={{fontSize: '1.25rem'}}>
            Allí descubrimos algo brutal:
          </p>
        </AnimatedElement>

        <AnimatedElement animation="scale-up" delay={400} duration={600}>
          <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/30 mb-8 mobile-center scroll-glow">
            <p className="text-foreground font-medium leading-relaxed text-center mobile-center-text" style={{fontSize: '1.125rem'}}>
              El <span className="text-accent font-bold">#1 no gana por tener mejores productos.</span> Gana por operar con tres sistemas que el resto ni imagina.
            </p>
          </div>
        </AnimatedElement>

        {/* Systems - Accordion Style */}
        <StaggeredAnimation staggerDelay={100} animation="fade-up">
          {systems.map((system, index) => {
            const Icon = system.icon;
            const isSelected = selectedSystem === system.number;

            return (
              <div key={index} className={`
                border border-border rounded-2xl overflow-hidden transition-all duration-300
                ${isSelected ? 'border-accent/50 shadow-medium' : 'hover:border-accent/30'}
                ${!isSelected ? 'glow-pulse' : ''}
              `}>
                {/* Accordion Header - Always Visible */}
                <div
                  className={`
                    p-6 cursor-pointer transition-all duration-300
                    ${isSelected
                      ? 'bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent'
                      : 'bg-card/50 hover:bg-card/80 hover:shadow-soft button-attention'
                    }
                  `}
                  onClick={() => handleSystemClick(system.number)}
                >
                  <div className="flex items-center justify-between md:items-center mobile-stack mobile-center">
                    <div className="flex items-center gap-4 md:items-center mobile-stack mobile-center">
                      <div className="flex-shrink-0 mobile-center-block">
                        <div className={`
                          flex items-center justify-center w-16 h-16 rounded-2xl font-bold transition-all duration-300
                          ${isSelected
                            ? 'accent-gradient text-white shadow-medium scale-105'
                            : 'solution-bg text-white hover:scale-105'
                          }
                        `} style={{fontSize: '1.5rem'}}>
                          {system.number}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:items-center mobile-stack mobile-center">
                        <Icon className={`
                          w-8 h-8 transition-all duration-300
                          ${isSelected ? 'text-accent scale-110' : 'text-accent hover:scale-110'}
                        `} />
                        <div className="mobile-center-text">
                          <h3 className={`
                            font-bold transition-all duration-300 mobile-center-text
                            ${isSelected ? 'text-foreground' : 'text-foreground hover:text-accent'}
                          `} style={{fontSize: '1.25rem'}}>
                            {system.title}
                          </h3>
                          <p className={`
                            transition-all duration-300 mobile-center-text
                            ${isSelected ? 'text-accent font-medium' : 'text-muted-foreground hover:text-accent/80'}
                          `} style={{fontSize: '1rem'}}>
                            {system.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mobile-center">
                      {isSelected ? (
                        <ChevronUp className="w-6 h-6 text-accent transition-transform duration-200 scale-110" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground transition-all duration-200 hover:text-accent hover:scale-110 icon-bounce-hover" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Accordion Content - Conditionally Rendered */}
                {isSelected && (
                  <div className="px-6 pb-6 border-t border-border/50">
                    <div className="pt-6">
                      <p className="text-muted-foreground leading-relaxed mb-6 italic" style={{fontSize: '1.125rem'}}>
                        {system.description}
                      </p>
                      
                      <div className="space-y-4">
                        {system.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-accent/30 transition-smooth mobile-stack mobile-center">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 mobile-center-block" />
                            <p className="text-foreground leading-relaxed mobile-center-text">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </StaggeredAnimation>
        
        {/* Bottom CTA Section */}
        <div className="max-w-5xl mx-auto mt-20 space-y-8 mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="text-center space-y-6 mobile-center">
              <div className="space-y-4 mobile-center">
                <PersonalizedText as="h3" className="font-bold text-foreground mobile-center-text" style={{fontSize: '2rem'}}>
                  ¿Podrías construir esto solo?
                </PersonalizedText>
                <p className="text-muted-foreground mobile-center-text" style={{fontSize: '1.25rem'}}>
                  Sí. Con 10–15 años de errores que cuestan millones… y la suerte de sobrevivir.
                </p>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              
              <div className="space-y-4 mobile-center">
                <h3 className="font-bold text-accent mobile-center-text" style={{fontSize: '2rem'}}>
                  O podríamos implantarlo juntos en 12 meses.
                </h3>
                <p className="text-foreground mobile-center-text" style={{fontSize: '1.25rem'}}>
                  Usando sistemas que ya crearon +150% en joyería, -35% en costos en salud, y dominio absoluto en manufactura.
                </p>
              </div>
              
              <div className="space-y-4 pt-4 mobile-center">
                <p className="font-bold text-accent mobile-center-text" style={{fontSize: '1.25rem'}}>
                  Y ese número 1 no está disponible para cualquiera.
                </p>
                <p className="font-bold text-accent mobile-center-text" style={{fontSize: '1.5rem'}}>
                  Es el acceso a optimizaciones avanzadas que solo conocen quienes ya llegaron ahí.
                </p>
              </div>
            </div>
            
            <div className="text-center mobile-center">
            <Button
              onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 whitespace-normal break-words text-center group font-semibold touch-manipulation pulse-glow"
              style={{minHeight: '3.5rem', fontSize: 'clamp(0.875rem, 3vw, 1rem)', lineHeight: '1.2'}}
            >
              <div className="flex items-center justify-center w-full gap-2" style={{minHeight: '2.5rem'}}>
                <span className="flex-1 text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2rem'}}>
                  <span className="hidden sm:inline" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>
                    <PersonalizedText>Quiero ser el #1 en mi mercado</PersonalizedText>
                  </span>
                  <span className="sm:hidden" style={{wordBreak: 'break-word', lineHeight: '1.2'}}>
                    <PersonalizedText>Ser el #1 en mi mercado</PersonalizedText>
                  </span>
                </span>
                <ArrowRight className="flex-shrink-0 group-hover:translate-x-1 transition-smooth w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
