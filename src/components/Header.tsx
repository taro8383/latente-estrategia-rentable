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
    { name: "#1", href: "#1", isButton: true },
  ];

  const scrollToSection = (href: string) => {
    // Use getElementById for section "1" since CSS IDs cannot start with numbers
    const element = href === '#1' ? document.getElementById('1') : document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isButton ? (
                <Button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="accent-gradient text-white hover:scale-105 transition-bounce"
                >
                  {link.name}
                </Button>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground hover:text-accent transition-smooth font-medium"
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
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
                    className="accent-gradient text-white hover:scale-105 transition-bounce w-full mt-2"
                  >
                    {link.name}
                  </Button>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-foreground hover:text-accent transition-smooth font-medium py-2"
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