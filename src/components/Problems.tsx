import { AlertCircle, Clock, TrendingDown, Users, Brain, Target, DollarSign, Zap, Lock, Flame } from "lucide-react";
import problemsStress from "@/assets/problems-stress.jpg";

const problems = [
  {
    icon: Clock,
    title: "Eres el cuello de botella",
    description: "Atrapado en trivialidades operativas. Sabes que deberías estar construyendo estrategia, pero estás apagando incendios todo el día. Tu potencial está secuestrado por lo urgente."
  },
  {
    icon: TrendingDown,
    title: "El mercado te está dejando atrás",
    description: "Nuevos competidores con tecnología que no entiendes. Gurús de redes sociales robándote clientes. Estás compitiendo en precio con unos y en 'cool factor' con otros. Y perdiendo en ambos."
  },
  {
    icon: Users,
    title: "Tu equipo es 'bueno', no excelente",
    description: "Los mejores talentos se van con tu competencia o montan su propio negocio. Te quedas formando mediocres y gestionando drama. Ese desgaste no es sostenible."
  },
  {
    icon: Brain,
    title: "Vas a ciegas con tus números",
    description: "Sabes cuánto entra y cuánto sale en general. Pero hay fugas que no ves. Oportunidades de oro enterradas en tus datos. Y no tienes ni el tiempo ni la experiencia para encontrarlas."
  },
  {
    icon: Target,
    title: "Marketing que ya no convierte",
    description: "Lo que funcionaba hace dos años ahora es ruido. Gastas en publicidad como antes, pero los resultados no son los mismos. Tu mensaje se pierde en el mar de contenido."
  },
  {
    icon: DollarSign,
    title: "Consultores que solo facturan",
    description: "Ya probaste con 'expertos' que te cobraron una fortuna, te dieron un PDF hermoso... y cero resultados. Más gastos, mismos problemas. Desconfianza total."
  },
  {
    icon: Zap,
    title: "Crecimiento que se estancó",
    description: "Llegaste hasta aquí con esfuerzo brutal. Pero ahora cada punto de crecimiento requiere el doble de energía. Has tocado tu techo... o al menos eso parece."
  },
  {
    icon: Lock,
    title: "Atrapado cambiando tiempo por dinero",
    description: "Ganas bien, pero si dejas de trabajar dos semanas, todo se cae. El negocio no trabaja para ti. Tú trabajas para él. Y esa no era la idea cuando empezaste."
  },
  {
    icon: Flame,
    title: "El burnout está cerca",
    description: "Estás cansado. Física y mentalmente. Sacrificaste tiempo con tu familia, tu salud, tus hobbies. Y lo peor: no ves cuándo termina esto. La cinta no se detiene."
  },
  {
    icon: AlertCircle,
    title: "El legado que no será",
    description: "No querías solo 'un negocio exitoso'. Querías construir algo que importara. Algo que dejara huella. Pero cada día que pasas siendo el número dos, ese sueño se vuelve más lejano."
  }
];

export const Problems = () => {
  return (
    <section id="problemas" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Image Banner */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong">
          <img 
            src={problemsStress} 
            alt="Empresario estresado trabajando hasta tarde"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="mb-6">
            Si esto te suena familiar,
            <br />
            <span className="text-accent">no estás solo.</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Pero seguir así tiene un precio que cada día sube más...
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/50 transition-smooth shadow-soft hover:shadow-medium"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16 p-8 rounded-2xl bg-accent/5 border border-accent/20">
          <p className="text-lg md:text-xl font-semibold text-foreground">
            Lo más doloroso no es estar donde estás.
            <br />
            Es <span className="text-accent">saber que podrías estar mucho mejor</span> y no tener ni el tiempo, ni el equipo, ni las herramientas para llegar ahí.
          </p>
        </div>
      </div>
    </section>
  );
};
