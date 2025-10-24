# Header Navigation Bar Implementation Plan

## Overview
This document outlines the implementation plan for adding a header navigation bar to the landing page with a placeholder logo aligned to the left and navigation links to different sections.

## Component Structure

### Header Component (`src/components/Header.tsx`)
The Header component will be a responsive navigation bar with:
- A placeholder logo aligned to the left
- Navigation links to all landing page sections
- Mobile-friendly hamburger menu for smaller screens
- Smooth scrolling behavior when clicking navigation links

### Navigation Links
Based on the landing page sections identified, the navigation will include links to:
1. Hero (Home)
2. Problems
3. Solution
4. HowItWorks (¿Cómo funciona?)
5. Pricing
6. Offers
7. Contacto (CTA section)

## Implementation Details

### Component Code
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import placeholderLogo from "../assets/placeholder.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Problemas", href: "#problemas" },
    { name: "Solución", href: "#solucion" },
    { name: "Cómo Funciona", href: "#como-funciona" },
    { name: "Modelo", href: "#modelo" },
    { name: "Ofertas", href: "#ofertas" },
    { name: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
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
            <a href="#hero" className="flex items-center space-x-2" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}>
              <img 
                src={placeholderLogo} 
                alt="Latente Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-foreground">Latente</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-accent transition-smooth font-medium"
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('#contacto')}
              className="accent-gradient text-white hover:scale-105 transition-bounce"
            >
              Agendar Llamada
            </Button>
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
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-foreground hover:text-accent transition-smooth font-medium py-2"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('#contacto')}
                className="accent-gradient text-white hover:scale-105 transition-bounce w-full mt-2"
              >
                Agendar Llamada
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
```

### Section IDs
To make the navigation links work properly, each section needs to have a corresponding ID. We'll need to add these IDs to the existing components:

1. Hero section: `id="hero"`
2. Problems section: `id="problemas"`
3. Solution section: `id="solucion"`
4. HowItWorks section: `id="como-funciona"`
5. Pricing section: `id="modelo"`
6. Offers section: `id="ofertas"`
7. CTA section: `id="contacto"` (already exists)

### Integration with Index.tsx
The Header component needs to be imported and added to the Index.tsx file:

```tsx
import { Header } from "@/components/Header";
// ... other imports

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header /> {/* Add this line */}
      <Hero />
      <Problems />
      <Solution />
      <HowItWorks />
      <Pricing />
      <Offers />
      <CTA />
      <Footer />
    </main>
  );
};
```

## Styling Considerations
- The header will use a sticky position to remain visible when scrolling
- It will have a semi-transparent background with backdrop blur for a modern look
- The active navigation state could be enhanced with scroll spy functionality in a future iteration
- The mobile menu will slide down from the header
- The "Agendar Llamada" button will use the accent gradient to match the overall design

## Implementation Steps
1. Create the Header component file
2. Add the necessary IDs to each section component
3. Import and use the Header component in Index.tsx
4. Test the navigation links and smooth scrolling behavior
5. Adjust styling as needed to match the overall design theme