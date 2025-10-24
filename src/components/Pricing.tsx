import { Shield, TrendingUp, Handshake } from "lucide-react";
import successCelebration from "@/assets/success-celebration.jpg";

export const Pricing = () => {
  return (
    <section id="modelo" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Success Image */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong border-4 border-accent/30">
          <img 
            src={successCelebration} 
            alt="Equipo celebrando éxito empresarial"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-white">
            El modelo que cambia <span className="text-accent">todo el juego</span>
          </h2>
          <p className="text-xl text-white/90">
            No es un gasto. Es una inversión con retorno garantizado.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50">
            <Shield className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-white">Cero riesgo</h3>
            <p className="text-white/80">
              Solo pagas por resultados reales y medibles. Si no generamos más dinero, no nos debes nada.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50">
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-white">Incentivos alineados</h3>
            <p className="text-white/80">
              Nuestro éxito está directamente atado al tuyo. Cuanto más ganas, más ganamos. Simple.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50">
            <Handshake className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-white">Socios reales</h3>
            <p className="text-white/80">
              No somos un proveedor más. Somos tu copiloto con piel en el juego. Tu éxito es nuestro éxito.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-strong">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
              <span className="text-accent font-semibold">Nuestro modelo</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Genera 2x a 4x más en el primer año
            </h3>

            <div className="py-8 space-y-4">
              <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl font-bold">
                <span className="text-accent">75%</span>
                <span className="text-white">para ti</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xl md:text-2xl font-semibold text-white">
                <span>25%</span>
                <span>para nosotros</span>
              </div>
            </div>

            <p className="text-lg text-white max-w-2xl mx-auto">
              Del <strong className="text-white">incremento</strong> que generamos juntos. No de tus ganancias actuales.
              Solo del dinero nuevo que creamos para tu negocio.
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-xl font-semibold text-white mb-2">
                Ejemplo práctico:
              </p>
              <p className="text-white">
                Si hoy ganas $100k al mes y lo llevamos a $300k al mes, ese incremento de $200k mensuales se reparte: $150k para ti, $50k para nosotros.
                <br />
                <strong className="text-white">Tus $100k originales siempre son 100% tuyos.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-12 p-6 rounded-2xl bg-accent/10 border border-accent/30">
          <p className="text-lg font-semibold text-white">
            Este modelo solo funciona si nosotros realmente entregamos resultados.
            <br />
            Por eso puedes confiar en que <span className="text-accent">haremos todo lo posible para que funcione.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
