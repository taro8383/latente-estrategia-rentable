import { Users, Eye, Target, Crown, TrendingUp } from "lucide-react";
import marketingPlan from "@/assets/Marketing-Plan.png";
import { AnimatedElement, StaggeredAnimation } from "@/components/ui/scroll-animations";

// Import only confirmed existing carousel logos
import logo1 from "@/assets/carousel/logo1.png";
import logo2 from "@/assets/carousel/logo2.png";
import logo3 from "@/assets/carousel/logo3.png";
import logo5 from "@/assets/carousel/logo5.png";
import logo6 from "@/assets/carousel/logo6.png";
import logo7 from "@/assets/carousel/logo7.png";
import logo8 from "@/assets/carousel/logo8.png";
import logo9 from "@/assets/carousel/logo9.png";
import optimoWorkforce from "@/assets/carousel/Optimo Workforce - Horizontal Logo Standard Mode.png";
import otamatone from "@/assets/carousel/otamatone-header-logo.png";
import pat from "@/assets/carousel/PAT_Logo_FA.png";
import andaru from "@/assets/carousel/ANDARU_COL-logo_color_640x640.png";
import baristart from "@/assets/carousel/BARISTART-logo_color_640x640.png";
import ck from "@/assets/carousel/CK-logo_color_640x640.png";
import doublebee from "@/assets/carousel/DOUBLEBEE_logo_color_640x640-01.png";
import ffi from "@/assets/carousel/FFI_logo_color_640x640-01.png";
import kota88 from "@/assets/carousel/KOTA88_logo_color_640x640-01.png";
import tomo from "@/assets/carousel/TOMO_logo_color_640x640_01.png";
import toscana from "@/assets/carousel/TOSCANA_logo_color_640x640-1.png";
import ultimo from "@/assets/carousel/ULTIMO_logo_color_640x640-01.png";
import snp from "@/assets/carousel/SNP_logo_color_640x640-01.png";
import rbc from "@/assets/carousel/RBC-logo_color_640x640_01.png";
import genericLogo from "@/assets/carousel/97b909d530e526a15a9721aa33572992.png";

const insiderDifference = [
  {
    icon: Users,
    title: "No llegamos con diagnósticos desde afuera",
    description: "Estuvimos en la trinchera, tomando las mismas decisiones que tú tomas hoy:"
  },
  {
    icon: Eye,
    title: "Conocemos la realidad brutal de la ejecución",
    description: "Las decisiones que nadie te cuenta en los cursos de MBA:"
  }
];

const brutalRealities = [
  "¿Qué sistema implementar primero?",
  "Cómo manejar la resistencia del equipo", 
  "Cómo escalar sin romper la operación"
];

const proofPoints = [
  {
    icon: Target,
    title: "Sistemas forjados en batalla",
    description: "Hace 10 años, estábamos adentro de una empresa joyera, no como consultores, sino como parte del equipo. Vimos que su mensaje de 'calidad' se perdía en el ruido."
  },
  {
    icon: TrendingUp,
    title: "Resultados, no teoría",
    description: "Implementamos nuestro sistema de propuesta de valor único. El resultado no fue un 'incremento'. Fue un dominio del mercado. Las ventas aumentaron un 150%."
  }
];

// Array of company logos for the carousel - Only confirmed existing files
const companyLogos = [
  logo1, logo2, logo3, logo5, logo6, logo7, logo8, logo9, // Basic numbered logos
  optimoWorkforce, // Optimo Workforce - Horizontal Logo Standard Mode.png
  otamatone, // otamatone-header-logo.png
  pat, // PAT_Logo_FA.png
  andaru, // ANDARU_COL-logo_color_640x640.png
  baristart, // BARISTART-logo_color_640x640.png
  ck, // CK-logo_color_640x640.png
  doublebee, // DOUBLEBEE_logo_color_640x640-01.png
  ffi, // FFI_logo_color_640x640-01.png
  kota88, // KOTA88_logo_color_640x640-01.png
  tomo, // TOMO_logo_color_640x640_01.png
  toscana, // TOSCANA_logo_color_640x640-1.png
  ultimo, // ULTIMO_logo_color_640x640-01.png
  snp, // SNP_logo_color_640x640-01.png
  rbc, // RBC-logo_color_640x640_01.png
  genericLogo // 97b909d530e526a15a9721aa33572992.png
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Marketing Plan Image */}
        <AnimatedElement animation="fade-down" delay={100}>
          <div className="max-w-6xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-strong mobile-center">
            <img
              src={marketingPlan}
              alt="Plan de marketing para dominio de mercado"
              className="w-full h-64 md:h-96 object-cover mobile-center-block"
            />
          </div>
        </AnimatedElement>
        
        {/* Header */}
        <AnimatedElement animation="fade-up" delay={200}>
          <div className="max-w-4xl mx-auto text-center mb-16 mobile-center">
            <AnimatedElement animation="scale-up" delay={300}>
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 mobile-center-block">
                <span className="text-accent font-semibold" style={{fontSize: '1rem'}}>Confidencialidad total. Resultados reales.</span>
              </div>
            </AnimatedElement>

            <h2 className="mb-6 mobile-center-text" style={{fontSize: '2rem'}}>
              Los consultores externos ven tu negocio como un{" "}
              <span className="text-accent">PowerPoint.</span>{" "}
              Nosotros lo vemos como nuestro{" "}
              <span className="text-accent">legado.</span>
            </h2>
          </div>
        </AnimatedElement>

        {/* Main Difference Section */}
        <AnimatedElement animation="fade-up" delay={400}>
          <div className="max-w-6xl mx-auto mb-16 mobile-center">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
              <div className="grid md:grid-cols-2 gap-8 mb-12 mobile-stack mobile-center">
                <StaggeredAnimation staggerDelay={200} animation="fade-up">
                  {insiderDifference.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 mobile-stack mobile-center">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mobile-center-block">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="mobile-center-text">
                          <h3 className="font-bold text-foreground mb-2 mobile-center-text" style={{fontSize: '1.25rem'}}>
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mobile-center-text" style={{fontSize: '1rem'}}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </StaggeredAnimation>
              </div>

              {/* Brutal Realities */}
              <AnimatedElement animation="scale-up" delay={600} duration={600}>
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 mobile-center">
                  <h4 className="font-bold text-foreground mb-4 text-center mobile-center-text" style={{fontSize: '1.125rem'}}>
                    Por eso nuestros sistemas no son teoría. Son herramientas forjadas.
                  </h4>
                  <div className="space-y-3 mobile-center">
                    {brutalRealities.map((reality, index) => (
                      <div key={index} className="flex items-center justify-center gap-3 mobile-stack mobile-center">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mobile-center-block"></div>
                        <p className="text-foreground text-center flex-1 mobile-center-text">{reality}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedElement>

        {/* Proof Section */}
        <StaggeredAnimation staggerDelay={200} animation="fade-left">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-smooth mobile-stack mobile-center"
              >
                <div className="flex-shrink-0 mobile-center">
                  <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-medium mobile-center-block">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 mobile-center-text">
                  <h3 className="font-bold text-foreground mb-3 mobile-center-text" style={{fontSize: '1.5rem'}}>
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mobile-center-text" style={{fontSize: '1.125rem'}}>
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </StaggeredAnimation>

        {/* Bottom CTA */}
        <AnimatedElement animation="scale-up" delay={800} duration={600}>
          <div className="max-w-4xl mx-auto text-center mobile-center">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/30 mobile-center">
              <AnimatedElement animation="bounce-in" delay={900}>
                <Crown className="w-12 h-12 text-accent mx-auto mb-6 mobile-center-block" />
              </AnimatedElement>

              <h3 className="font-bold text-foreground mb-4 mobile-center-text" style={{fontSize: '2rem'}}>
                Esta experiencia desde adentro nos convirtió en algo único.
              </h3>

              <p className="text-muted-foreground leading-relaxed mobile-center-text" style={{fontSize: '1.25rem'}}>
                Eso es lo que pasa cuando sabes qué botones presionar, desde adentro.
              </p>
            </div>
          </div>
        </AnimatedElement>

        {/* Company Logos Carousel */}
        <AnimatedElement animation="fade-up" delay={1000}>
          <div className="max-w-6xl mx-auto mt-16 space-y-8 mb-16 mobile-center">
            <AnimatedElement animation="scale-up" delay={1100}>
              <div className="text-center mb-8 mobile-center">
                <h3 className="font-bold text-foreground mb-4 mobile-center-text" style={{fontSize: '1.75rem'}}>
                  Algunas de las empresas que se beneficiaron con nuestros sistemas
                </h3>
              </div>
            </AnimatedElement>

          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div className="flex animate-scroll-x">
              {/* First set of logos */}
              {companyLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center px-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-soft p-4 hover:shadow-medium transition-smooth">
                    <img
                      src={logo}
                      alt={`Company ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%)';
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%)';
                        e.currentTarget.style.opacity = '0.7';
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map((logo, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 flex items-center justify-center px-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-soft p-4 hover:shadow-medium transition-smooth">
                    <img
                      src={logo}
                      alt={`Company ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      style={{
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%)';
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%)';
                        e.currentTarget.style.opacity = '0.7';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </AnimatedElement>
      </div>
    </section>
  );
};
