import { CheckCircle2, Crown, Target, TrendingUp, ArrowRight, Zap, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import solutionPartnership from "@/assets/Hands.png";

const systems = [
  {
    number: "01",
    icon: Crown,
    title: "Cómo convertirte en la opción obvia",
    subtitle: "(y duplicar ventas en 12 meses)",
    description: "Este no es 'mejorar tu Instagram'. Es como Borsalino en los años 30 hizo que un sombrero no fuera un accesorio… sino un símbolo de poder.",
    benefits: [
      "Tu cliente ideal ya no es 'hombre de 40 años con ingresos altos'. Es Martín de Recoleta que no compra un portafolio. Compra el derecho a sacarlo en la reunión donde decide el futuro de su empresa… y que todos sepan: este hombre no pide permiso. Lo concede.",
      "Tu propuesta de valor ya no dice 'artesanal'. Expone la mentira de tu competidor: 'Ellos venden cueros. Nosotros vendemos la última pieza que tu abuelo hubiera usado… y tu nieto heredará.'",
      "Tu mensaje no 'atrae curiosos'… Filtra a los débiles: Si tu cliente no está dispuesto a pagar un 30% más por algo que dure 30 años, no es tu cliente.",
      "Tus alianzas ya no son 'colaboraciones con influencers'… Son alianzas con bancos privados que regalan tu billetera a sus clientes premium… porque tú les das estatus, no cuero.",
      "Tus métricas ya no miden 'likes'… Miden cuántos clientes llaman a su madre para mostrar lo que compraron."
    ]
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Cómo liberar un 30% de flujo de caja",
    subtitle: "(sin despedir a nadie)",
    description: "Esto no es 'recortar gastos'. Es como una fábrica de calzados en León, México, que pasó de ahogarse en costos a financiar su expansión con su propia operación.",
    benefits: [
      "Automatizas no para ahorrar, sino para liberar tu mente de lo trivial —así puedes enfocarte en diseñar tu próximo lanzamiento icónico.",
      "Reestructuras tu fiscalidad, no para 'pagar menos', sino para convertir cada peso en una bala de dominio: reinvertís en alianzas exclusivas, no en publicidad genérica.",
      "Tu equipo no 'trabaja más', trabaja en lo que solo ellos pueden hacer: tu maestro curtidor ya no empaca cajas… entrena a jóvenes artesanos bajo tu sello.",
      "Tus proveedores no 'bajan precios'… Firman acuerdos de lealtad: te reservan el 20% mejor cuero del lote… a cambio de volumen garantizado por 3 años."
    ]
  },
  {
    number: "03",
    icon: Zap,
    title: "Cómo descubrir fuentes de ingresos",
    subtitle: "que tus competidores ni siquiera saben que existen",
    description: "Aquí es donde el #1 se financia a sí mismo… mientras los demás mendigan en Instagram.",
    benefits: [
      "Tus máquinas infrautilizadas no 'cuestan'… Generan $8,000/mes alquiladas a startups de moda sostenible que necesitan capacidad… pero no quieren invertir.",
      "Tus clientes no 'compran una vez'… Entran en tu Círculo de Legado: pagan una membresía anual y reciben piezas exclusivas… y el 10% de lo que generan al referir a otros.",
      "Tus procesos internos no son 'secretos'… Son licenciables: ese método tuyo para curtir sin químicos? Lo vendes como 'Sistema Argento' a talleres en Chile y Uruguay… con tu logo en cada pieza que hagan."
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
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong">
          <img 
            src={solutionPartnership} 
            alt="Expertos en cuero trabajando en estrategia de dominio"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <span className="text-accent font-semibold">No es inspiración. Es ingeniería de dominio.</span>
            </div>
          </div>
          
          <h2 className="mb-6">
            Durante 15 años no estuvimos en salas de conferencias. Estuvimos en talleres, fábricas y salas de guerra ejecutivas.
          </h2>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8 text-center">
          Allí descubrimos algo brutal:
        </p>
        
        <div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/30 mb-8">
          <p className="text-lg text-foreground font-medium leading-relaxed text-center">
            El <span className="text-accent font-bold">#1 no gana por tener mejores productos.</span> Gana por operar con tres sistemas que el resto ni imagina.
          </p>
        </div>
        
        {/* Systems - Accordion Style */}
        <div className="max-w-5xl mx-auto space-y-6">
          {systems.map((system, index) => {
            const Icon = system.icon;
            const isSelected = selectedSystem === system.number;
            
            return (
              <div key={index} className="border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30">
                {/* Accordion Header - Always Visible */}
                <div 
                  className="p-6 cursor-pointer bg-card/50 hover:bg-card/80 transition-colors duration-200"
                  onClick={() => handleSystemClick(system.number)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl solution-bg text-white text-2xl font-bold">
                          {system.number}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon className="w-8 h-8 text-accent" />
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {system.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {system.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <ChevronUp className="w-6 h-6 text-accent transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Accordion Content - Conditionally Rendered */}
                {isSelected && (
                  <div className="px-6 pb-6 border-t border-border/50">
                    <div className="pt-6">
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        {system.description}
                      </p>
                      
                      <div className="space-y-4">
                        {system.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-accent/30 transition-smooth">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-foreground leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA Section */}
        <div className="max-w-5xl mx-auto mt-20 space-y-8">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  ¿Podrías construir esto solo?
                </h3>
                <p className="text-xl text-muted-foreground">
                  Sí. Con 10–15 años de errores que cuestan millones… y la suerte de sobrevivir.
                </p>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-accent">
                  O podríamos implantarlo juntos en 12 meses.
                </h3>
                <p className="text-xl text-foreground">
                  Usando sistemas que ya crearon +150% en joyería, -35% en costos en salud, y dominio absoluto en manufactura.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <p className="text-xl font-bold text-accent">
                  Y ese número 1 no está disponible para cualquiera.
                </p>
                <p className="text-2xl font-bold text-accent">
                  Es el acceso a optimizaciones avanzadas que solo conocen quienes ya llegaron ahí.
                </p>
              </div>
            </div>
            
            <div className="text-center">
            <Button
              onClick={() => document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-lg px-8 py-6 group mt-6"
            >
              Quiero ser el #1 en mi mercado
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth w-5 h-5" />
            </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
