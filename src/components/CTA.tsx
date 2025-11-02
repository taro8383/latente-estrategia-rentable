import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CTA = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6">
              ¿Listo para dejar de ser <span className="text-accent">el eterno segundo</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Agenda una llamada estratégica sin compromiso. Analizaremos tu situación y te diremos exactamente cómo podríamos ayudarte.
            </p>
            <p className="text-lg font-semibold text-foreground">
              Si no vemos potencial para duplicar tus ganancias, te lo diremos de frente.
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-strong border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email corporativo *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@tuempresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-semibold text-foreground">
                  Empresa y sector *
                </label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Ej: Cadena de gimnasios, Consultoría legal, etc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  Cuéntanos tu situación (opcional)
                </label>
                <Textarea
                  id="message"
                  placeholder="¿Cuál es tu mayor desafío ahora mismo? ¿Por qué estás buscando ayuda?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-32 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full accent-gradient text-white hover:scale-105 transition-bounce shadow-medium text-base sm:text-lg py-6 group"
              >
                <span className="block sm:hidden">Agendar</span>
                <span className="hidden sm:inline">Agendar llamada estratégica</span>
                <ArrowRight className="ml-0 sm:ml-2 mt-2 sm:mt-0 group-hover:translate-x-1 transition-smooth w-5 h-5 flex-shrink-0" />
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                No spam. No ventas agresivas. Solo una conversación honesta sobre si podemos ayudarte.
              </p>
            </form>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">2-4x</p>
              <p className="text-sm text-muted-foreground">Incremento promedio primer año</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">0% riesgo</p>
              <p className="text-sm text-muted-foreground">Solo pagas por resultados</p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">100% tuyo</p>
              <p className="text-sm text-muted-foreground">Tu negocio actual intacto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
