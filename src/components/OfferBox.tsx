import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, AlertTriangle, Crown } from "lucide-react";
import logo from "/LoDi-logo.svg";

export const OfferBox = () => {
  const scrollToSection1 = () => {
    document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="oferta-especial" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main offer container */}
          <div className="relative rounded-3xl overflow-hidden shadow-strong border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-accent/5">
            
            {/* Top accent bar */}
            <div className="h-2 accent-gradient"></div>
            
            <div className="p-8 md:p-12">
              {/* Company Logo */}
              <div className="flex justify-center mb-8">
                <img
                  src={logo}
                  alt="LoDi Logo"
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                  <Crown className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-sm">INVITACIÓN EXCLUSIVA</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Esta alianza es para vos sí:
                </h2>
              </div>

              {/* Qualification checklist */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-border">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Ya tenés calidad, operación y presencia <span className="text-accent">(vos lo sabés)</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Estás listo para actuar en 72 horas <span className="text-muted-foreground">(no "cuando pueda")</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantee section */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 mb-8 border border-accent/30">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-accent flex-shrink-0" />
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Nuestra garantía inquebrantable
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xl text-foreground leading-relaxed">
                    Si en 90 días no ves <span className="text-accent font-bold text-2xl">$5M nuevos</span> en tu cuenta…
                  </p>
                  
                  <div className="bg-background/80 rounded-xl p-4 border border-accent/20">
                    <p className="text-lg text-foreground italic">
                      …nosotros no solo te pagamos esa suma.
                    </p>
                    <p className="text-lg text-foreground font-semibold mt-2">
                      Te enviamos una carta manuscrita pidiendo disculpas… y cerramos nuestra oficina ese día. 
                      Porque si no podemos coronarte rey, no merecemos estar en el juego.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="text-center space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="font-medium">Sin costos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="font-medium">Sin riesgo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="font-medium">Solo resultados compartidos</span>
                  </div>
                </div>

                {/* Urgency timer */}
                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-white" />
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-white mb-2">
                    ⏳ La ventana cierra el Jueves 30 de Octubre
                  </p>
                  <p className="text-foreground font-medium">
                    A las 23:59, el nuevo número uno se decidirá el Viernes.
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={scrollToSection1}
                  size="lg"
                  className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-lg px-8 py-6 group"
                >
                  Aceptar la invitación y construir mi legado
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};