import { CheckCircle2 } from "lucide-react";
import solutionPartnership from "@/assets/solution-partnership.jpg";

const benefits = [
  "Identificamos las fugas de dinero que no ves",
  "Optimizamos cada área para máxima rentabilidad",
  "Liberamos tu tiempo de lo operativo",
  "Atraemos y retenemos al mejor talento",
  "Actualizamos tu marketing para que convierta",
  "Automatizamos procesos que te drenan energía",
  "Te damos claridad total sobre tus números",
  "Creamos sistemas que escalan sin ti",
  "Convertimos tu negocio en una máquina de generar valor",
  "Te posicionamos como líder indiscutible de tu mercado"
];

export const Solution = () => {
  return (
    <section id="solucion" className="py-24 md:py-32 subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="text-accent font-semibold">La solución existe</span>
          </div>
          
          <h2 className="mb-6">
            No necesitas otro consultor.
            <br />
            Necesitas un <span className="text-accent">socio estratégico</span> con piel en el juego.
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            Somos Latente. No somos consultores tradicionales que cobran sus honorarios y se van.
            <br />
            <strong className="text-foreground">Solo ganamos cuando tú ganas.</strong>
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Partnership Image */}
          <div className="mb-12 rounded-3xl overflow-hidden shadow-strong max-w-4xl mx-auto">
            <img 
              src={solutionPartnership} 
              alt="Socios de negocios cerrando acuerdo exitoso"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="solution-bg text-primary-foreground rounded-3xl p-8 md:p-12 shadow-strong">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl md:text-4xl text-white">
                Tú te enfocas en dirigir.
                <br />
                <span className="text-accent">Nosotros en multiplicar tu rentabilidad.</span>
              </h3>
              
              <p className="text-xl text-white/90">
                Analizamos tu negocio completo. Encontramos oportunidades que no sabías que existían.
                Implementamos mejoras que generan resultados medibles.
              </p>

              <div className="pt-4">
                <p className="text-2xl font-bold text-white">
                  Y solo cobramos del incremento que generamos.
                </p>
                <p className="text-lg text-white/80 mt-2">
                  Si no hay resultados, no hay pago. Así de simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
