import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "/LoDi-logo.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Problemas", href: "#problemas" },
    { name: "Solución", href: "#solucion" },
    { name: "Cómo Funciona", href: "#como-funciona" },
    { name: "Modelo", href: "#modelo" },
    { name: "Socios Estratégicos", href: "#socios-estrategicos" },
    { name: "Preguntas Frecuentes", href: "#preguntas-frecuentes" },
    { name: "#1", href: "#1", isButton: true },
  ];

  const scrollToSection = (href: string) => {
    // Map '#1' anchor to actual element id 'section-1' (IDs cannot start with numbers)
    const element = href === '#1' ? document.getElementById('section-1') : document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-webkit-sticky shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 relative">
          {/* Mobile Menu Button - Left side on mobile, hidden on desktop */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation"
              style={{minHeight: '3rem'}}
            >
              {isMenuOpen ? <X className="h-6 w-6 flex-shrink-0" /> : <Menu className="h-6 w-6 flex-shrink-0" />}
            </Button>
          </div>

          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none md:flex-1">
            <a href="#hero" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}>
              <img
                src={logo}
                alt="LoDi Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation - Hidden on mobile, visible on desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isButton ? (
                <Button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="accent-gradient text-white hover:scale-105 transition-bounce enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 font-semibold"
                  style={{minHeight: '3rem'}}
                >
                  <div className="flex items-center justify-center w-full gap-2">
                    <span className="text-center flex-1">{link.name}</span>
                  </div>
                </Button>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground hover:text-accent transition-smooth font-medium"
                  style={{fontSize: '1rem'}}
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>

          </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                link.isButton ? (
                  <Button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="accent-gradient text-white hover:scale-105 transition-bounce w-full mt-2 enhanced-button-mobile sm:enhanced-button-tablet md:enhanced-button-desktop touch-manipulation px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5"
                    style={{minHeight: '3rem'}}
                  >
                    <div className="flex items-center justify-center w-full gap-2">
                      <span className="text-center flex-1">{link.name}</span>
                    </div>
                  </Button>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-foreground hover:text-accent transition-smooth font-medium py-2"
                    style={{fontSize: '1rem'}}
                  >
                    {link.name}
                  </button>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};