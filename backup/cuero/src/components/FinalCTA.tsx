import { Crown, Clock, Mail, AlertTriangle, CheckCircle2, Target } from "lucide-react";
import undisputedImage from "@/assets/Undisputed.png";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const scrollToContact = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="1" className="py-24 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* Undisputed Image */}
        <div className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong">
          <img 
            src={undisputedImage} 
            alt="Expertos en cuero trabajando en estrategia de dominio"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="text-accent font-semibold text-white">¿CUMPLES CON EL PERFIL?</span>
          </div>
          
          <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          
          <h2 className="mb-6 text-white">
            Si llegaste aquí por invitación directa…
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30">
            <div className="text-center space-y-8">
              <Crown className="w-16 h-16 text-accent mx-auto mb-6" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Si tu empresa ya tiene calidad, operación y presencia…
              </h3>
              
              <div className="space-y-6">
                <p className="text-xl text-white/90 leading-relaxed">
                  Y si estás listo para dejar de competir y empezar a dominar…
                </p>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
                  <p className="text-2xl font-bold text-accent mb-4">
                    Responde "CORONA" al email que te trajo aquí.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-white/90">
                      Este no es un 'servicio'. Es una coronación.
                    </p>
                    
                    <p className="text-lg text-white/90">
                      Y solo hay un trono.
                    </p>
                    
                    <p className="text-lg text-white/90">
                      Tu competidor ya está probándose la corona.
                    </p>
                    
                    <p className="text-lg text-white/90">
                      ¿Vas a dejar que se la quede… o vas a responder 'CORONA' y reclamar lo que es tuyo?
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30">
                <p className="text-2xl font-bold text-white mb-4">
                  Si no actúas en 72 horas, no es que ''solo pierdas la oportunidad''. </p>
                  <p className="text-2xl font-bold text-white mb-4">
                  Es que le entregas el cetro.
                </p>
                
                <div className="space-y-4">
                  <p className="text-lg text-white/90">
                    No te pedimos un centavo.
                  </p>
                  
                  <p className="text-lg text-white/90">
                    No te pedimos fe.
                  </p>
                  
                  <p className="text-lg text-white/90">
                    Solo necesitamos 12 minutos para estar seguros de podes ser el próximo rey. 
                  </p>
                  
                  <p className="text-lg text-white/90">
                    Por que si no generamos $5M en ganancias nuevas en 90 días… seremos nosotros los que te paguen $5M.
                  </p>
                  
                  <p className="text-lg text-white/90">
                    Eso no es promesa.
                  </p>
                  
                  <p className="text-lg text-white/90">
                    Es un contrato.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-accent/30">
            <div className="text-center space-y-6">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                <span className="text-accent font-semibold">LA INVITACIÓN FUE SOLO EL PRIMER FILTRO</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Recuerda: Estar aquí no garantiza la sociedad.
              </h3>
              
              <div className="space-y-4">
    
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">Tiempo limitado</span>
                  </div>
                  <p className="text-muted-foreground">El trono está siendo disputado ahora mismo.</p>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">Oportunidad única</span>
                  </div>
                  <p className="text-muted-foreground">El próximo rey será decidido en las próximas 72 horas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-lg px-8 py-6 group"
          >
            Responder "CORONA" y reclamar mi trono
            <Mail className="ml-2 group-hover:translate-x-1 transition-smooth w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};