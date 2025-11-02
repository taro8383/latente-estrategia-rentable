# Personalization Implementation Technical Guide

## Code Examples & Implementation Details

### 1. TypeScript Interfaces

```typescript
// src/types/personalization.ts
export interface BrandInfo {
  name: string;
  industry: string;
  productType: string;
  targetAudience: string;
}

export interface ReaderInfo {
  name: string;
  company: string;
  position: string;
  location: string;
}

export interface CustomMessages {
  heroHeadline?: string;
  customOffer?: string;
  urgencyMessage?: string;
}

export interface PersonalizationData {
  brandInfo?: BrandInfo;
  readerInfo?: ReaderInfo;
  industryKeywords?: string[];
  customMessages?: CustomMessages;
}
```

### 2. Variable Replacer Utility

```typescript
// src/utils/variableReplacer.ts
import { PersonalizationData } from '@/types/personalization';

export class VariableReplacer {
  private data: PersonalizationData;
  private defaults: Record<string, string>;

  constructor(data: PersonalizationData) {
    this.data = data;
    this.defaults = {
      'brand name': 'tu marca',
      'reader name': 'estimado empresario',
      'industry': 'tu industria',
      'product type': 'productos',
      'target audience': 'clientes',
      'company': 'tu empresa',
      'position': 'líder',
      'location': 'tu ciudad'
    };
  }

  replace(text: string): string {
    if (!text) return text;
    
    // Replace variables in [variable] format
    return text.replace(/\[([^\]]+)\]/g, (match, variablePath) => {
      const trimmedPath = variablePath.trim();
      const value = this.getValue(trimmedPath);
      return value || this.defaults[trimmedPath] || `[${trimmedPath}]`;
    });
  }

  private getValue(path: string): string | undefined {
    // Handle nested paths like "brandInfo.name"
    const parts = path.split('.');
    let current: any = this.data;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    
    return typeof current === 'string' ? current : String(current);
  }

  // Handle industry keywords replacement
  replaceIndustryKeywords(text: string): string {
    if (!this.data.industryKeywords?.length) return text;
    
    const keywords = this.data.industryKeywords;
    let result = text;
    
    // Replace [industry keyword 1], [industry keyword 2], etc.
    keywords.forEach((keyword, index) => {
      const placeholder = `[industry keyword ${index + 1}]`;
      result = result.replace(new RegExp(placeholder, 'g'), keyword);
    });
    
    // Replace generic [industry keywords] with first keyword
    result = result.replace(/\[industry keywords\]/g, keywords[0] || 'productos premium');
    
    return result;
  }
}
```

### 3. Personalization Provider

```typescript
// src/context/PersonalizationProvider.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PersonalizationData } from '@/types/personalization';
import { VariableReplacer } from '@/utils/variableReplacer';

interface PersonalizationContextType {
  data: PersonalizationData;
  replacer: VariableReplacer;
  isPersonalized: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextType | null>(null);

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};

interface PersonalizationProviderProps {
  children: ReactNode;
}

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ children }) => {
  const [data, setData] = useState<PersonalizationData>({});
  const [replacer, setReplacer] = useState<VariableReplacer | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    const parsePersonalizationData = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');
        
        if (encodedData) {
          // Decode base64 and parse JSON
          const decodedData = atob(encodedData);
          const parsedData: PersonalizationData = JSON.parse(decodedData);
          
          setData(parsedData);
          setReplacer(new VariableReplacer(parsedData));
          setIsPersonalized(true);
          
          console.log('Personalization data loaded:', parsedData);
        } else {
          // No personalization data, use defaults
          setReplacer(new VariableReplacer({}));
          setIsPersonalized(false);
        }
      } catch (error) {
        console.error('Error parsing personalization data:', error);
        // Fallback to defaults
        setReplacer(new VariableReplacer({}));
        setIsPersonalized(false);
      }
    };

    parsePersonalizationData();
  }, []);

  const value: PersonalizationContextType = {
    data,
    replacer: replacer!,
    isPersonalized
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};
```

### 4. Personalized Text Component

```typescript
// src/components/PersonalizedText.tsx
import React from 'react';
import { usePersonalization } from '@/context/PersonalizationProvider';

interface PersonalizedTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const PersonalizedText: React.FC<PersonalizedTextProps> = ({ 
  children, 
  className,
  as: Component = 'span'
}) => {
  const { replacer, isPersonalized } = usePersonalization();
  
  if (!replacer) return <Component className={className}>{children}</Component>;
  
  const processedText = replacer.replaceIndustryKeywords(replacer.replace(children));
  
  return (
    <Component className={className}>
      {processedText}
    </Component>
  );
};
```

### 5. Updated App.tsx Integration

```typescript
// src/App.tsx (updated)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { PersonalizationProvider } from "@/context/PersonalizationProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
    // Force a re-render to ensure dark mode is applied
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PersonalizationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.PROD ? "/latente-estrategia-rentable/" : "/"}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PersonalizationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
```

### 6. Example Component Updates

#### Hero Component with Personalization

```typescript
// src/components/Hero.tsx (updated sections)
import { PersonalizedText } from "@/components/PersonalizedText";

// In the quote section:
<div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent/20 mb-6">
  <p className="text-base sm:text-lg md:text-xl text-white/90 italic leading-relaxed">
    "Imagina esto: tu hijo, en 2045, entra a una reunión en Nueva York. Alguien ve su portafolio y dice, en voz baja:
    '¿Eso es de <span className="text-accent font-semibold">[brand name]</span>? Mi abuelo tenía uno igual… lo enterraron con él.'
    Eso no es un producto. <span className="text-accent font-bold">Es un legado.</span> Y el legado se construye ahora mismo."
  </p>
</div>

// Updated with PersonalizedText:
<div className="bg-accent/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent/20 mb-6">
  <PersonalizedText as="p" className="text-base sm:text-lg md:text-xl text-white/90 italic leading-relaxed">
    "Imagina esto: tu hijo, en 2045, entra a una reunión en Nueva York. Alguien ve su portafolio y dice, en voz baja:
    '¿Eso es de <span className="text-accent font-semibold">[brand name]</span>? Mi abuelo tenía uno igual… lo enterraron con él.'
    Eso no es un producto. <span className="text-accent font-bold">Es un legado.</span> Y el legado se construye ahora mismo."
  </PersonalizedText>
</div>

// Personalized greeting:
<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
  Si estás leyendo esto, [reader name], es porque ves algo que el 99.7% de tus competidores todavía se niegan a ver,
  pero vos con tu instinto, <strong>lo sentiste incluso antes de abrir el email que te envié</strong>.
</p>
```

### 7. URL Generation Tool

```javascript
// public/url-generator.html (simple tool for marketing team)
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personalized URL Generator</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .result { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; word-break: break-all; }
    </style>
</head>
<body>
    <h1>Personalized URL Generator</h1>
    <form id="generatorForm">
        <div class="form-group">
            <label for="brandName">Brand Name:</label>
            <input type="text" id="brandName" value="Coach">
        </div>
        <div class="form-group">
            <label for="readerName">Reader Name:</label>
            <input type="text" id="readerName" value="John">
        </div>
        <div class="form-group">
            <label for="industry">Industry:</label>
            <input type="text" id="industry" value="luxury-fashion">
        </div>
        <div class="form-group">
            <label for="keywords">Industry Keywords (comma-separated):</label>
            <input type="text" id="keywords" value="premium baggy, handcrafted leather, exclusive design">
        </div>
        <div class="form-group">
            <label for="company">Company:</label>
            <input type="text" id="company" value="Luxury Holdings">
        </div>
        <button type="submit">Generate URL</button>
    </form>
    <div id="result" class="result" style="display: none;">
        <h3>Generated URL:</h3>
        <div id="generatedUrl"></div>
    </div>

    <script>
        document.getElementById('generatorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const data = {
                brandInfo: {
                    name: document.getElementById('brandName').value,
                    industry: document.getElementById('industry').value,
                    productType: 'leather goods',
                    targetAudience: 'affluent professionals'
                },
                readerInfo: {
                    name: document.getElementById('readerName').value,
                    company: document.getElementById('company').value,
                    position: 'CEO',
                    location: 'New York'
                },
                industryKeywords: document.getElementById('keywords').value.split(',').map(k => k.trim())
            };
            
            const encodedData = btoa(JSON.stringify(data));
            const baseUrl = window.location.origin + '/latente-estrategia-rentable/';
            const fullUrl = baseUrl + '?data=' + encodedData;
            
            document.getElementById('generatedUrl').textContent = fullUrl;
            document.getElementById('result').style.display = 'block';
        });
    </script>
</body>
</html>
```

### 8. Testing Examples

```typescript
// Example URLs for testing:

// Basic personalization:
// ?data=eyJicmFuZEluZm8iOnsibmFtZSI6IkNvYWNoIn0sInJlYWRlckluZm8iOnsibmFtZSI6IkpvaG4ifX0=

// Full personalization:
// ?data=eyJicmFuZEluZm8iOnsibmFtZSI6IkxvdWlzVnVpdHRvbiIsImluZHVzdHJ5IjoibHV4dXJ5LWZhc2hpb24iLCJwcm9kdWN0VHlwZSI6ImxlYXRoZXIgZ29vZHMiLCJ0YXJnZXRBdWRpZW5jZSI6ImFmZmx1ZW50IHByb2Zlc3Npb25hbHMifSwicmVhZGVySW5mbyI6eyJuYW1lIjoiTWFyaWEiLCJjb21wYW55IjoiUHJlbWl1bSBIb2xkaW5ncyIsInBvc2l0aW9uIjoiQ0VPIiwibG9jYXRpb24iOiJCdWVub3MgQWlyZXMifSwiaW5kdXN0cnlLZXl3b3JkcyI6WyJwcmVtaXVtIGJhZ2d5IiwiaGFuZGNyYWZ0ZWQgbGVhdGhlciIsImV4Y2x1c2l2ZSBkZXNpZ24iXX0=

// Test with different values:
const testData = {
  brandInfo: {
    name: "Louis Vuitton",
    industry: "luxury-fashion",
    productType: "leather goods",
    targetAudience: "affluent professionals"
  },
  readerInfo: {
    name: "Maria",
    company: "Premium Holdings",
    position: "CEO",
    location: "Buenos Aires"
  },
  industryKeywords: [
    "premium baggy",
    "handcrafted leather", 
    "exclusive design"
  ]
};
```

## Implementation Checklist

1. [ ] Create TypeScript interfaces
2. [ ] Implement VariableReplacer utility
3. [ ] Build PersonalizationProvider
4. [ ] Create PersonalizedText component
5. [ ] Update App.tsx with provider
6. [ ] Modify Hero component with variables
7. [ ] Update Problems component
8. [ ] Update Solution component
9. [ ] Update FinalCTA component
10. [ ] Create URL generator tool
11. [ ] Test with various data combinations
12. [ ] Document usage for marketing team