import { useState } from "react";
import { AlertCircle, Clock, TrendingDown, Users, Brain, Target, DollarSign, Zap, Lock, Flame, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import problemsStress from "@/assets/problems-stress.jpg";
import marketingPlan from "@/assets/Marketing-Plan.png";
import { PersonalizedText } from "@/components/PersonalizedText";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

const allProblems = [
  {
    icon: Clock,
    title: "Padecés el 'Síndrome del Fundador Prisionero'", // This will be wrapped in PersonalizedText where it's rendered
    before: "Tu expertise operativa te convirtió en el mejor bombero, pero te mantiene como rehén de tu propia empresa. Sin un sistema de delegación estratégica (no operativa), cada nuevo éxito solo significa más incendios que apagar - te estás ahogando en tu propio crecimiento.",
    after: "Tus martes y jueves están libres, no porque delegaste, sino porque ya no hay incendios. Solo motores de crecimiento que giran solos mientras vos disfrutas de tu exito en un café de [ubicacion].",
    result: "Ahora eres el estratega, no el bombero."
  },
  {
    icon: TrendingDown,
    title: "Tu competidor no es más inteligente, tiene acceso al 'manual de dominio' que vos no.",
    before: "Mientras vos peleás por mejorar tu producto en un 10%, ellos están redefiniendo las reglas del mercado. Sin este manual, estás condenado a jugar siempre a alcanzarlos.",
    after: "Tu último lanzamiento se agotó en 9 minutos, y ahora tu competidor vende una imitación en Mercado Libre… con tus clientes dejando reseñas: 'No es lo mismo que [tu marca]'.",
    result: "Ahora vos marcás la tendencia. Ellos solo la persiguen."
  },
  {
    icon: Users,
    title: "Tu equipo no está roto - está mal cableado",
    before: "Contrataste implementadores cuando necesitabas innovadores. El problema no es su capacidad, es tu sistema de gestión que premia el cumplimiento y castiga el riesgo. Sin recablear este sistema, seguirás teniendo empleados que obedecen en lugar de gente que cambia las reglas",
    after: "[inovacion]",
    result: "Ahora no tenés empleados. Tenés game-changers entrenados para ganar."
  },
  {
    icon: Brain,
    title: "Sufrís de 'Ceguera Métrica'",
    before: "Tus reportes te muestran qué pasó, pero no qué hacer mañana. La diferencia entre datos e inteligencia es un sistema de decodificación que transforma números en órdenes de batalla específicas - y ese sistema no se encuentra en ningún software, solo en protocolos probados.",
    after: "Sabés exactamente qué mover para generar $12M extra este trimestre, sin gastar un peso más… y ya lo programaste en tu calendario para ejecutar el lunes a las 10 a.m.",
    result: "Tus métricas ya no informan. Te dan órdenes de batalla."
  },
  {
    icon: Target,
    title: "Tu mensaje se diluye porque competís en atributos cuando deberías dominar por posicionamiento",
    before: "[malPosicionamiento] son la moneda de cambio de los perdedores. Sin un framework de posicionamiento radical, sos solo otro producto caro en un mar de similares.",
    after: "Tus clientes te describen como '[Rolls-Royce]'… y cuando alguien pregunta '¿dónde lo compraste?', no necesitan esperar realmente la respuesta, ya lo intuyen.",
    result: "Ya no vendes producto. Vendes estatus. Y eso no se compite… se domina."
  },
  {
    icon: Zap,
    title: "Estás atrapado en la 'Trampa del Esfuerzo Lineal'",
    before: "Cada nuevo cliente exige más trabajo porque tu modelo de crecimiento depende de tu sudor, no de sistemas automatizados de adquisición y retención. Sin motores de crecimiento escalables, tu éxito te estrangulará",
    after: "El 63% de tus ventas vienen de referidos y ventas ascendentes automáticas… y tu WhatsApp de atención está más quieto que nunca, porque tus clientes traen a los suyos.",
    result: "Ahora creces exponencialmente… no por esfuerzo, sino por sistema."
  },
  {
    icon: DollarSign,
    title: "Los consultores tradicionales te fallan porque diagnostican desde afuera sin vivir las consecuencias de sus recomendaciones",
    before: "Te venden mapas de territorios que nunca han pisado. La única consultoría que funciona es la que tiene su dinero y reputación en la línea junto a la tuya.",
    after: "Estamos en tu fábrica, ajustando el funnel en vivo mientras tu equipo empaca pedidos… y al mediodía ya vimos el primer pico de conversión subir un 22%.",
    result: "No vendemos teoría. Implementamos victorias reales."
  },
  {
    icon: Lock,
    title: "Tu negocio no es un activo - es un empleo disfrazado de empresa",
    before: "Si el motor sos vos, no tenés un negocio, tenés un trabajo muy demandante. Sin sistemas de autonomía probados, tu empresa vale cero sin tu presencia diaria",
    after: "Vuelves de Iguazú, descansado por primera vez en siete años, y encuentras que las ventas subieron un 12%… y tu equipo te recibió con una cena y una botella de Malbec edición limitada: '¡El rey ha vuelto!'",
    result: "El sistema corre solo. Vos solo lo dirigís."
  },
  {
    icon: Flame,
    title: "No estás quemado - estás estratégicamente hambriento", // This will be wrapped in PersonalizedText where it's rendered
    before: "Sabés que hay un rey en vos esperando salir, pero carecés del mapa de ruta y la munición específica para tomar el trono. La frustración no viene de falta de ambición, sino de falta de acceso a las palancas de dominio que los número uno guardan celosamente.",
    after: "Rompiste la jaula. Y el mercado ya tiene un nuevo rey: cuando alguien menciona '[frase descriptiva]', tu nombre es el primero—y el único—que suena.",
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
        <AnimatedElement animation="fade-down" delay={100}>
          <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong">
            <img
              src={problemsStress}
              alt="Empresario de cuero trabajando en su estrategia"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </AnimatedElement>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <AnimatedElement animation="fade-up" delay={200}>
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-4 mb-6 mobile-center-flex mobile-stack">
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 mobile-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-accent font-semibold" style={{fontSize: '0.875rem'}}>Calidad del producto ✓</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 mobile-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-accent font-semibold" style={{fontSize: '0.875rem'}}>Posición en el mercado ✓</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20 mobile-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-accent font-semibold" style={{fontSize: '0.875rem'}}>Operaciones que funcionan ✓</span>
                </div>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={300}>
            <PersonalizedText as="h2" className="mb-6 mobile-center-text">
              Entonces… ¿Por qué seguís atrapado en el{" "}
              <span className="text-accent">segundo pelotón?</span>
            </PersonalizedText>
            <p className="text-muted-foreground mb-4 mobile-center-text" style={{fontSize: '1.25rem'}}>
              No es suerte. Es que estás jugando con las reglas equivocadas.
            </p>
          </AnimatedElement>
        </div>

        {/* Problems Grid */}
        <div className="max-w-6xl mx-auto space-y-6">
          <StaggeredAnimation staggerDelay={150} animation="fade-up">
            {visibleProblems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-smooth shadow-soft hover:shadow-medium scroll-glow"
                >
                  <div className="flex items-start gap-6 md:items-start mobile-stack mobile-center">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth mobile-center-block">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1 space-y-4 mobile-center-text">
                      <PersonalizedText as="h3" className="font-bold text-foreground mobile-center-text" style={{fontSize: '1.5rem'}}>
                        {problem.title}
                      </PersonalizedText>

                      <div className="grid md:grid-cols-3 gap-6 mobile-stack">
                        <div className="space-y-2 mobile-center-text">
                          <p className="font-semibold text-muted-foreground uppercase tracking-wider mobile-center-text" style={{fontSize: '0.875rem'}}>Antes:</p>
                          <PersonalizedText as="p" className="text-muted-foreground leading-relaxed mobile-center-text" style={{fontSize: '1rem'}}>
                            {problem.before}
                          </PersonalizedText>
                        </div>

                        <div className="space-y-2 mobile-center-text">
                          <p className="font-semibold text-accent uppercase tracking-wider mobile-center-text" style={{fontSize: '0.875rem'}}>Después:</p>
                          <PersonalizedText as="p" className="text-muted-foreground leading-relaxed mobile-center-text" style={{fontSize: '1rem'}}>
                            {problem.after}
                          </PersonalizedText>
                        </div>

                        <div className="space-y-2 mobile-center-text">
                          <p className="font-semibold text-foreground uppercase tracking-wider mobile-center-text" style={{fontSize: '0.875rem'}}>Resultado:</p>
                          <PersonalizedText className="text-foreground font-medium leading-relaxed mobile-center-text">
                            {problem.result}
                          </PersonalizedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggeredAnimation>
        </div>

      {/* Expand/Collapse Button */}
      <AnimatedElement animation="fade-up" delay={600}>
        <div className="text-center mt-12 mobile-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              group
              relative
              accent-gradient
              text-white
              border-2
              border-transparent
              hover:border-accent/30
              hover:scale-105
              hover:shadow-strong
              transition-all
              duration-300
              px-4 sm:px-6 md:px-8
              py-3 sm:py-4 md:py-5
              font-semibold
              glow-pulse
              button-attention
              icon-bounce-hover
              rounded-xl
              min-w-[300px]
              md:min-w-[400px]
              mobile-center-block
              mobile-button-lg
              enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation
            `}
            style={{minHeight: '3rem'}}
          >
            <div className="flex items-center justify-center w-full gap-2">
              <span className="relative z-10 text-center flex-1">
                {isExpanded ? "Mostrar menos problemas" : "¿Más problemas? Más soluciones"}
              </span>
              {isExpanded ? (
                <ChevronUp className="flex-shrink-0 w-6 h-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
              ) : (
                <ChevronDown className="flex-shrink-0 w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-y-1" />
              )}
            </div>
          </Button>
        </div>
      </AnimatedElement>

      {/* Final Section */}
      <AnimatedElement animation="scale-up" delay={700} duration={800}>
        <div className="max-w-4xl mx-auto mt-16 space-y-8 mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center scroll-glow">
            <h3 className="font-bold text-foreground mb-6 text-center mobile-center-text" style={{fontSize: '2rem'}}>
              La diferencia que se amplía
            </h3>

            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mb-6 mobile-center">
              <p className="text-foreground leading-relaxed text-center mobile-center-text" style={{fontSize: '1.125rem'}}>
                Mientras lees esto, tu competidor número uno no solo está ganando... está redefiniendo las reglas del juego para asegurarse de que tu marca quede permanentemente relegada a la categoría de 'una alternativa mas del monton'.
              </p>
              <div className="space-y-3 mt-4 mobile-center-text">
                <p className="text-muted-foreground text-center" style={{fontSize: '1rem'}}>
                  Cada día que esperas, él está levantando la barrera de entrada al numero uno, usando una nueva técnica de marketing, o firmando un contrato de exclusividad con tu proveedor más confiable.
                </p>
                <p className="text-muted-foreground text-center" style={{fontSize: '1rem'}}>
                  No se trata solamente de ganar.
                </p>
                <p className="text-muted-foreground text-center" style={{fontSize: '1rem'}}>
                  Se trata de no ser borrado del mapa.
                </p>
              </div>
            </div>

            <div className="text-center mobile-center">
              <p className="text-foreground mb-4 mobile-center-text" style={{fontSize: '1.25rem'}}>
                La diferencia no son los fundamentos.
              </p>
              <p className="font-bold text-accent mobile-center-text" style={{fontSize: '1.5rem'}}>
                Es el acceso a optimizaciones avanzadas que solo conocen quienes ya llegaron ahí.
              </p>
            </div>
          </div>
        </div>
      </AnimatedElement>
      </div>
    </section>
  );
};
