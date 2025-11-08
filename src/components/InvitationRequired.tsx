import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Phone, MessageCircle } from 'lucide-react';
import LoDiLogo from '/LoDi-logo.svg';

const InvitationRequired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure favicon is properly set
    const faviconLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = '/favicon.svg';
    }

    // Also set shortcut icon
    let shortcutIcon = document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement;
    if (!shortcutIcon) {
      shortcutIcon = document.createElement('link');
      shortcutIcon.rel = 'shortcut icon';
      document.head.appendChild(shortcutIcon);
    }
    shortcutIcon.href = '/favicon.ico';
  }, []);

  return (
    <div className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={LoDiLogo}
            alt="LoDi Logo"
            className="w-32 h-32 mx-auto mb-4"
          />
        </div>
        
        {/* Main Content Card */}
        <Card className="bg-black/20 backdrop-blur-sm border border-white/10 text-white">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-accent" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Invitación Requerida
            </CardTitle>
            <CardDescription className="text-lg text-white/80">
              Esta es una sociedad exclusiva por invitación
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Explanation */}
            <div className="text-center space-y-3">
              <p className="text-white/90">
                Nuestra oferta está disponible únicamente para invitados seleccionados.
              </p>
              <p className="text-white/80">
                Si ha recibido una invitación, por favor utilice el enlace proporcionado en su correo electrónico.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                ¿Desea solicitar una invitación?
              </h3>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm text-white/80">
                    <strong>Email:</strong><br />
                    invitacion@latente.net
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm text-white/80">
                    <strong>Teléfono:</strong><br />
                    +54 (9)379 422-1474
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm text-white/80">
                    <strong>WhatsApp:</strong><br />
                    +54 (9)379 422-1474
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/90 mb-2">
                🔒 Seguridad y Exclusividad
              </h4>
              <ul className="text-xs text-white/70 space-y-1">
                <li>• Las invitaciones son personales y no transferibles, si usted desea solicitar una invitacion debe informarnos sobre quien lo refirio.</li>
                <li>• Cada enlace de invitacion tiene validez limitada de 72 horas por cupos limitados</li>
                <li>• El contenido es específico para cada invitado</li>
                <li>• Mantenemos los más altos estándares de privacidad</li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() => window.location.href = 'mailto:invitacion@latente.net?subject=Solicitud%20de%20Invitación&body=Estoy%20interesado%20en%20recibir%20una%20invitación%20para%20acceder%20a%20la%20plataforma%20Latente.'}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5"
                style={{minHeight: '3rem'}}
              >
                <div className="flex items-center justify-center w-full gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center flex-1">Solicitar Invitación</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>© 2025 Latente - Sociedad Exclusiva por Invitación</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationRequired;