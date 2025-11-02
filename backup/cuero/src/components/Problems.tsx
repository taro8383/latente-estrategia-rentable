import { useState } from "react";
import { AlertCircle, Clock, TrendingDown, Users, Brain, Target, DollarSign, Zap, Lock, Flame, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import problemsStress from "@/assets/problems-stress.jpg";
import marketingPlan from "@/assets/Marketing-Plan.png";

const allProblems = [
  {
    icon: Clock,
    title: "Atrapado en lo operativo crítico",
    before: "Pasás las noches apagando 'incendios' que en realidad son decisiones estratégicas que solo vos podés tomar… pero postergás porque 'no hay tiempo'.",
    after: "Tus martes y jueves están libres, no porque delegaste, sino porque ya no hay incendios. Solo motores de crecimiento que giran solos mientras vos revisás el diseño de tu próxima colección en un café de Palermo.",
    result: "Ahora eres el estratega, no el bombero."
  },
  {
    icon: TrendingDown,
    title: "Competencia que innova más rápido",
    before: "Tu catálogo sigue igual desde 2021, mientras tu competidor lanza ofertas que parecen de otro planeta.",
    after: "Tu último lanzamiento se agotó en 9 minutos, y ahora tu competidor vende una imitación en Mercado Libre… con tus clientes dejando reseñas: 'No es lo mismo que [tu marca]'.",
    result: "Ahora vos marcás la tendencia. Ellos solo la persiguen."
  },
  {
    icon: Users,
    title: "Talento que se estanca",
    before: "Le pedís a tu equipo que 'piense fuera de la caja'… y todos miran el piso.",
    after: "Tu jefe de producción entra a tu oficina con una idea que duplica el margen usando cuero reciclado… y ya tiene un prototipo en tu escritorio.",
    result: "Ahora no tenés empleados. Tenés game-changers entrenados para ganar."
  },
  {
    icon: Brain,
    title: "Métricas que no revelan oportunidades",
    before: "Mirás reportes y ves números. Pero no ves palancas.",
    after: "Sabés exactamente qué mover para generar $180K extra este trimestre, sin gastar un peso más… y ya lo programaste en tu calendario para ejecutar el lunes a las 10 a.m.",
    result: "Tus métricas ya no informan. Te dan órdenes de batalla."
  },
  {
    icon: Target,
    title: "Marketing que se commoditiza",
    before: "Tu mensaje suena igual que todos: 'artesanal', 'hecho a mano', 'diseño argentino'.",
    after: "Tus clientes te describen como 'el Rolls-Royce del cuero sudamericano'… y cuando alguien pregunta '¿dónde lo compraste?', no necesitan esperar realmente la respuesta, ya lo intuyen.",
    result: "Ya no vendes producto. Vendes estatus. Y eso no se compite… se domina."
  },
  {
    icon: Zap,
    title: "Crecimiento que requiere más esfuerzo",
    before: "Cada nuevo cliente te cuesta más que el anterior.",
    after: "El 63% de tus ventas vienen de referidos y ventas ascendentes automáticas… y tu WhatsApp de atención está más quieto que nunca, porque tus clientes traen a los suyos.",
    result: "Ahora creces exponencialmente… no por esfuerzo, sino por sistema."
  },
  {
    icon: DollarSign,
    title: "Consultores que dan teoría",
    before: "Un consultor te entrega un PDF de 47 páginas… y desaparece.",
    after: "Estamos en tu fábrica, ajustando el funnel en vivo mientras tu equipo empaca pedidos… y al mediodía ya vimos el primer pico de conversión subir un 22%.",
    result: "No vendemos teoría. Implementamos victorias reales."
  },
  {
    icon: Lock,
    title: "Dependencia operativa",
    before: "El negocio se traba si vos te tomás una semana de vacaciones.",
    after: "Vuelves de Iguazú, descansado por primera vez en siete años, y encuentras que las ventas subieron un 12%… y tu equipo te recibió con una cena y una botella de Malbec edición limitada: '¡El rey ha vuelto!'",
    result: "El sistema corre solo. Vos solo lo dirigís."
  },
  {
    icon: Flame,
    title: "Burnout estratégico",
    before: "Sabes que estás cerca del #1… pero das vueltas como un león enjaulado.",
    after: "Rompiste la jaula. Y el mercado ya tiene un nuevo rey: cuando alguien menciona 'cuero premium en Argentina', tu nombre es el primero—y el único—que suena.",
    result: "Ese rey sos vos."
  }
];

export const Problems = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleProblems = isExpanded ? allProblems : allProblems.slice(0, 3);

  return (
    <section id="problemas" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Image Banner */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong">
          <img 
            src={problemsStress} 
            alt="Empresario de cuero trabajando en su estrategia"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold text-sm">Calidad del producto ✓</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold text-sm">Posición en el mercado ✓</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold text-sm">Operaciones que funcionan ✓</span>
              </div>
            </div>
          </div>
          
          <h2 className="mb-6">
            Entonces… ¿Por qué seguís atrapado en el{" "}
            <span className="text-accent">segundo pelotón?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            No es suerte. Es que estás jugando con las reglas equivocadas.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="max-w-6xl mx-auto space-y-6">
          {visibleProblems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-smooth shadow-soft hover:shadow-medium"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {problem.title}
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Antes:</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {problem.before}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-accent uppercase tracking-wider">Después:</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {problem.after}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground uppercase tracking-wider">Resultado:</p>
                        <p className="text-foreground font-medium leading-relaxed">
                          {problem.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand/Collapse Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group border-accent/30 hover:border-accent hover:bg-accent/5 transition-smooth px-8 py-4"
          >
            <span className="text-lg font-medium">
              {isExpanded ? "Mostrar menos problemas" : "¿Más problemas? Más soluciones"}
            </span>
            {isExpanded ? (
              <ChevronUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-smooth" />
            ) : (
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-smooth" />
            )}
          </Button>
        </div>

        {/* Final Section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              La diferencia que se amplía
            </h3>
            
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mb-6">
              <p className="text-lg text-foreground leading-relaxed text-center">
                Y mientras vos leés esto…
              </p>
              <div className="space-y-3 mt-4">
                <p className="text-muted-foreground text-center">
                  El actual #1 no está celebrando.
                </p>
                <p className="text-muted-foreground text-center">
                  Se está consolidando.
                </p>
                <p className="text-muted-foreground text-center">
                  Se está expandiendo.
                </p>
                <p className="text-muted-foreground text-center">
                  Está intentando asegurarse de que nadie más suba al trono.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl text-foreground mb-4">
                La diferencia no son los fundamentos.
              </p>
              <p className="text-2xl font-bold text-accent">
                Es el acceso a optimizaciones avanzadas que solo conocen quienes ya llegaron ahí.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
