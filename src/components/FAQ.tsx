import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalizedText } from "@/components/PersonalizedText";

const faqData = [
  {
    id: "faq-1",
    question: "¿Cómo puede funcionar este modelo sin inversión inicial? ¿Cuál es la trampa?",
    answer: "No hay trampa. Nosotros invertimos más de 300 horas de trabajo antes de ver un peso porque confiamos en nuestros sistemas probados. Solo ganamos cuando generamos ganancias netas nuevas para tu negocio. Si no creamos valor real y medible, no cobramos. Es un modelo de riesgo 100% compartido donde nuestro éxito depende completamente del tuyo."
  },
  {
    id: "faq-2",
    question: "Ya contraté consultores antes y solo me dieron PDFs que nunca implementé. ¿En qué se diferencian ustedes?",
    answer: "La diferencia fundamental es que no somos consultores externos - somos socios operativos. Mientras los consultores tradicionales diagnostican desde afuera y se van, nosotros trabajamos desde adentro de tu negocio, implementando cada cambio junto a tu equipo. Nuestro dinero y reputación están en juego igual que los tuyos. No vendemos teoría, ejecutamos victorias reales."
  },
  {
    id: "faq-3",
    question: "¿Cómo pueden garantizar 20% en 90 días? Eso suena demasiado bueno para ser verdad.",
    answer: "Nuestra garantía se basa en datos reales: hemos implementado estos mismos sistemas en más de 47 empresas con resultados consistentes. Si no cumplimos, no solo no cobramos - personalmente volaremos a tu ciudad y te entregaremos un cheque por 20 millones de pesos junto con un análisis de por qué fallamos. Es una garantía respaldada por contrato, no una promesa vacía."
  },
  {
    id: "faq-4",
    question: "Mi negocio es muy diferente a otros. ¿Cómo sé que sus sistemas funcionarán en mi industria específica?",
    answer: "Los tres sistemas principales (Protocolo de Elección Obvia, Hidratación Rentable y Matriz de Ingresos Ocultos) son agnósticos a la industria. Ya los hemos aplicado exitosamente en joyería (+150% en ventas), salud (-35% en costos), manufactura y muchos otros en distintos paises inclusive. Los principios de dominio de mercado, optimización de flujo de caja y activación de ingresos ocultos aplican igual en cualquier negocio con operaciones complejas."
  },
  {
    id: "faq-5",
    question: "¿Qué significa exactamente \"participación en las ganancias\"? ¿Cuánto se llevan ustedes?",
    answer: "Compartimos únicamente las ganancias NUEVAS que generamos juntos - nunca tocamos tus ingresos actuales. El porcentaje específico se determina caso por caso según el potencial de crecimiento y la inversión de tiempo requerida, pero siempre es justo y transparente. Solo ganamos sobre el valor adicional que creamos, no sobre lo que ya tienes."
  },
  {
    id: "faq-6",
    question: "Soy el cuello de botella en mi negocio. ¿Cómo puedo involucrarme en esto si ya no tengo tiempo?",
    answer: "Precisamente por eso existe esta alianza. Nuestro primer objetivo es liberarte del día a día operativo. Implementamos sistemas que te permiten delegar estratégicamente, no solo operativamente. En las primeras semanas, necesitaremos algunas horas tuyas para entender tu negocio, pero rápidamente nos enfocamos en crear motores de crecimiento que funcionen sin tu intervención diaria."
  },
  {
    id: "faq-7",
    question: "¿Qué pasa si mi equipo se resiste a los cambios? Ya tengo suficientes problemas con el personal.",
    answer: "Tenemos protocolos específicos para manejar la resistencia al cambio porque lo hemos vivido desde adentro. No llegamos como 'consultores externos' imponiendo cambios - trabajamos junto a tu equipo, haciéndolos parte del proceso de transformación. Convertimos a los escépticos en campeones del cambio mostrándoles cómo estos sistemas también los benefician a ellos."
  },
  {
    id: "faq-8",
    question: "¿Cuánto tiempo real requiere la implementación? Necesito resultados rápidos.",
    answer: "Los primeros resultados tangibles se ven en la mayoria de los casos en 7-14 días. La implementación completa de los tres sistemas toma 12 meses, pero está diseñada para generar victorias rápidas desde el inicio. Cada sistema se implementa en fases que generan valor inmediato mientras construimos hacia el dominio total del mercado."
  },
  {
    id: "faq-9",
    question: "¿Qué tipo de acceso necesitan a mi negocio y mis números?",
    answer: "Necesitamos acceso completo a tus métricas financieras y operativas para identificar las oportunidades ocultas. Firmamos acuerdos de confidencialidad estrictos y trabajamos con la máxima discreción. Recuerda: tu información es nuestra información - si la comprometemos, nos comprometemos a nosotros mismos."
  },
  {
    id: "faq-10",
    question: "¿Por qué solo 72 horas para decidir? Necesito tiempo para pensar una decisión tan importante.",
    answer: "El límite de tiempo existe porque solo trabajamos con un negocio por sector en cada región para evitar conflictos de interés. Si no tomas la oportunidad, tu competidor podría hacerlo. Además, la velocidad de decisión es un indicador clave de si estás listo para el tipo de transformación agresiva que requiere llegar al #1. Los reyes no dudan - actúan."
  }
];

export const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section id="preguntas-frecuentes" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
            <span className="text-accent font-semibold">RESOLUCIÓN DE DUDAS</span>
          </div>
          
          <HelpCircle className="w-16 h-16 text-accent mx-auto mb-6 mobile-center-block" />
          
          <h2 className="mb-6 mobile-center-text">
            Preguntas Frecuentes
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 mobile-center-text">
            Las respuestas que necesitas para tomar la decisión más importante de tu carrera
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-5xl mx-auto space-y-6">
          {faqData.map((item, index) => {
            const isExpanded = expandedItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className={`
                  border border-border rounded-2xl overflow-hidden transition-all duration-300
                  ${isExpanded ? 'border-accent/50 shadow-medium' : 'hover:border-accent/30'}
                  ${!isExpanded ? 'glow-pulse' : ''}
                `}
              >
                {/* Question Header */}
                <div
                  className={`
                    p-6 cursor-pointer transition-all duration-300
                    ${isExpanded
                      ? 'bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent'
                      : 'bg-card/50 hover:bg-card/80 hover:shadow-soft button-attention'
                    }
                  `}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center justify-between mobile-stack mobile-center">
                    <div className="flex items-start gap-4 mobile-stack mobile-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl accent-gradient flex items-center justify-center shadow-medium mobile-center-block">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <h3 className={`
                        text-lg md:text-xl font-bold leading-relaxed transition-all duration-300 mobile-center-text
                        ${isExpanded ? 'text-foreground' : 'text-foreground hover:text-accent'}
                      `}>
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 mobile-center">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-accent transition-transform duration-200 scale-110" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground transition-all duration-200 hover:text-accent hover:scale-110 icon-bounce-hover" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Answer Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border/50">
                    <div className="pt-6">
                      <p className="text-lg text-muted-foreground leading-relaxed mobile-center-text">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 space-y-8 mobile-center">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
            <div className="text-center space-y-6 mobile-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 mobile-center-text">
                ¿Todavía tienes dudas?
              </h3>
              
              <PersonalizedText className="text-xl text-muted-foreground leading-relaxed mb-8 mobile-center-text">
                Los reyes no se paralizan por el análisis. Actúan con información suficiente y dominio.
              </PersonalizedText>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mb-8 mobile-center">
                <p className="text-lg text-foreground leading-relaxed text-center mobile-center-text">
                  Si llegaste hasta aquí, ya tienes toda la información que necesitas. 
                  La única pregunta real es: <span className="text-accent font-bold">¿vas a dejar que tu competidor tome el trono?</span>
                </p>
              </div>
              
              <div className="text-center mobile-center">
                <Button
                  onClick={() => document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-base sm:text-lg w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-6 group mobile-center-block"
                >
                  <span className="block sm:inline">Reclamar mi trono ahora</span>
                  <ArrowRight className="ml-0 sm:ml-2 mt-2 sm:mt-0 group-hover:translate-x-1 transition-smooth w-5 h-5 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};