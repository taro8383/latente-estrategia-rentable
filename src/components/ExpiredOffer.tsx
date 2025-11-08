import { Clock, AlertTriangle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "/LoDi-logo.svg";

export const ExpiredOffer = () => {
  const handleContactSupport = () => {
    window.location.href = 'mailto:invitacion@latente.net?subject=Invitación Expirada - Solicitar Reconsideración';
  };

  return (
    <section className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center pt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo - Full Width */}
          <div className="mb-12 flex justify-center pt-8">
            <img
              src={logo}
              alt="LoDi Logo"
              className="h-16 md:h-20 w-auto"
            />
          </div>

          {/* Warning Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-destructive/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Clock className="w-16 h-16 text-destructive" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Esta invitación ha expirado
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Las invitaciones exclusivas tienen una vigencia de 72 horas.
            <br className="hidden sm:block" />
            La oportunidad de convertirte en el <span className="text-accent font-bold">#1</span> ha pasado.
          </p>

          {/* Explanation Box */}
          <div className="bg-card/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-8 border border-accent/20">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-3">
                  ¿Por qué expiran las invitaciones?
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  Mantenemos nuestras invitaciones limitadas en el tiempo para asegurar
                  que solo los líderes verdaderamente comprometidos con el dominio
                  accedan a esta oportunidad. El trono espera, pero no para siempre.
                </p>
              </div>
            </div>

            <div className="border-t border-accent/20 pt-6">
              <p className="text-xl text-white/90 italic leading-relaxed">
                "El mercado no perdona a los que dudan. Los que toman decisiones
                rápidas dominan. Los que vacilan, se quedan atrás para siempre."
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Si crees que esto es un error o necesitas una nueva consideración,
              contacta directamente con nuestro equipo de estrategia.
            </p>

            <div className="flex justify-center items-center">
              <Button
                onClick={handleContactSupport}
                size="lg"
                className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-base sm:text-lg w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 group enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation"
                style={{minHeight: '3rem'}}
              >
                <div className="flex items-center justify-center w-full gap-2">
                  <Mail className="flex-shrink-0 w-5 h-5" />
                  <span className="text-center flex-1">
                    <span className="block sm:hidden">Reconsiderar</span>
                    <span className="hidden sm:inline">Solicitar reconsideración</span>
                  </span>
                </div>
              </Button>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 max-w-2xl mx-auto border border-accent/30">
              <p className="text-sm text-white/70 leading-relaxed">
                <strong>Nota importante:</strong> Las reconsideraciones se evalúan individualmente 
                y no están garantizadas. Solo los líderes que demuestran compromiso 
                con el dominio reciben una segunda oportunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};