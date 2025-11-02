# Enhanced Personalization Plan with URL Expiration

## New Features Added

### 1. Custom URL Path Structure
Instead of serving the landing page at the root domain (`/`), we'll use a custom path that can be easily tracked and managed:

```
https://your-domain.com/invite/[unique-code]
https://your-domain.com/exclusive/[unique-code]
https://your-domain.com/strategy/[unique-code]
```

### 2. 72-Hour Link Expiration System
Links will automatically expire after 72 hours from creation, displaying a custom "expired offer" page.

## Updated Architecture

### Enhanced JSON Data Structure
```json
{
  "brandInfo": {
    "name": "Coach",
    "industry": "luxury-fashion",
    "productType": "leather goods",
    "targetAudience": "affluent professionals"
  },
  "readerInfo": {
    "name": "John",
    "company": "Luxury Holdings",
    "position": "CEO",
    "location": "New York"
  },
  "industryKeywords": [
    "premium baggy",
    "handcrafted leather",
    "exclusive design"
  ],
  "customMessages": {
    "heroHeadline": "El segundo lugar es el primer perdedor",
    "customOffer": "Exclusive partnership opportunity"
  },
  "expiration": {
    "createdAt": "2024-01-15T10:00:00Z",
    "expiresAt": "2024-01-18T10:00:00Z",
    "uniqueCode": "abc123xyz789"
  }
}
```

### Updated URL Structure
```
https://your-domain.com/invite/abc123xyz789?data=eyJicmFuZEluZm8iOnsibmFtZSI6IkNvYWNoIn0sInJlYWRlckluZm8iOnsibmFtZSI6IkpvaG4ifSwiZXhwaXJhdGlvbiI6eyJjcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDEwOjAwOjAwWiIsImV4cGlyZXNBdCI6IjIwMjQtMDEtMThUMTA6MDA6MDBaIiwidW5pcXVlQ29kZSI6ImFiYzEyM3h5ejc4OSJ9fQ==
```

## Technical Implementation Updates

### 1. React Router Configuration
```typescript
// src/App.tsx (updated)
<Routes>
  <Route path="/invite/:uniqueCode" element={<Index />} />
  <Route path="/exclusive/:uniqueCode" element={<Index />} />
  <Route path="/strategy/:uniqueCode" element={<Index />} />
  <Route path="/expired" element={<ExpiredOffer />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Expiration Validation Hook
```typescript
// src/hooks/useExpirationCheck.ts
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useExpirationCheck = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkExpiration = () => {
      try {
        const encodedData = searchParams.get('data');
        if (!encodedData) {
          setIsLoading(false);
          return;
        }

        const decodedData = JSON.parse(atob(encodedData));
        const { expiration } = decodedData;

        if (!expiration?.expiresAt) {
          setIsLoading(false);
          return;
        }

        const expiresAt = new Date(expiration.expiresAt);
        const now = new Date();
        
        if (now > expiresAt) {
          setIsExpired(true);
          navigate('/expired');
          return;
        }

        // Calculate time remaining
        const timeDiff = expiresAt.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeRemaining(`${hours}h ${minutes}m`);
        setIsLoading(false);

        // Set up timer to check every minute
        const timer = setInterval(() => {
          const newNow = new Date();
          if (newNow > expiresAt) {
            setIsExpired(true);
            navigate('/expired');
            clearInterval(timer);
          } else {
            const newTimeDiff = expiresAt.getTime() - newNow.getTime();
            const newHours = Math.floor(newTimeDiff / (1000 * 60 * 60));
            const newMinutes = Math.floor((newTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeRemaining(`${newHours}h ${newMinutes}m`);
          }
        }, 60000);

        return () => clearInterval(timer);

      } catch (error) {
        console.error('Error checking expiration:', error);
        setIsLoading(false);
      }
    };

    checkExpiration();
  }, [searchParams, navigate]);

  return { isExpired, isLoading, timeRemaining };
};
```

### 3. Expired Offer Component
```typescript
// src/components/ExpiredOffer.tsx
import { Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExpiredOffer = () => {
  const handleContactSupport = () => {
    // Redirect to support or contact page
    window.location.href = 'mailto:support@yourdomain.com?subject=Expired Invitation Link';
  };

  return (
    <section className="min-h-screen hero-gradient text-primary-foreground flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Warning Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Esta invitación ha expirado
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Las invitaciones exclusivas tienen una vigencia de 72 horas.
            <br />
            La oportunidad de convertirte en el #1 ha pasado.
          </p>

          {/* Explanation Box */}
          <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-accent/20">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  ¿Por qué expiran las invitaciones?
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Mantenemos nuestras invitaciones limitadas en el tiempo para asegurar
                  que solo los líderes verdaderamente comprometidos con el dominio
                  accedan a esta oportunidad. El trono espera, pero no para siempre.
                </p>
              </div>
            </div>

            <div className="border-t border-accent/20 pt-6">
              <p className="text-lg text-white/90 italic">
                "El mercado no perdona a los que dudan. Los que toman decisiones
                rápidas dominan. Los que vacilan, se quedan atrás."
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <p className="text-lg text-white/80">
              Si crees que esto es un error o necesitas una nueva consideración,
              contacta directamente con nuestro equipo.
            </p>

            <Button
              onClick={handleContactSupport}
              size="lg"
              className="accent-gradient text-white hover:scale-105 transition-bounce shadow-strong text-lg px-8 py-6 group"
            >
              Solicitar reconsideración
            </Button>

            <p className="text-sm text-white/60">
              Nota: Las reconsideraciones se evalúan individualmente y no están garantizadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### 4. Updated PersonalizationProvider
```typescript
// src/context/PersonalizationProvider.tsx (updated)
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PersonalizationData } from '@/types/personalization';
import { VariableReplacer } from '@/utils/variableReplacer';
import { useExpirationCheck } from '@/hooks/useExpirationCheck';

// ... (previous code remains the same)

export const PersonalizationProvider: React.FC<PersonalizationProviderProps> = ({ children }) => {
  const [data, setData] = useState<PersonalizationData>({});
  const [replacer, setReplacer] = useState<VariableReplacer | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { isExpired, isLoading, timeRemaining } = useExpirationCheck();

  useEffect(() => {
    const parsePersonalizationData = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');
        
        if (encodedData) {
          const decodedData = atob(encodedData);
          const parsedData: PersonalizationData = JSON.parse(decodedData);
          
          setData(parsedData);
          setReplacer(new VariableReplacer(parsedData));
          setIsPersonalized(true);
          
          console.log('Personalization data loaded:', parsedData);
        } else {
          setReplacer(new VariableReplacer({}));
          setIsPersonalized(false);
        }
      } catch (error) {
        console.error('Error parsing personalization data:', error);
        setReplacer(new VariableReplacer({}));
        setIsPersonalized(false);
      }
    };

    if (!isLoading && !isExpired) {
      parsePersonalizationData();
    }
  }, [isLoading, isExpired]);

  const value: PersonalizationContextType = {
    data,
    replacer: replacer!,
    isPersonalized,
    isExpired,
    timeRemaining,
    isLoading
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {!isLoading && !isExpired ? children : null}
    </PersonalizationContext.Provider>
  );
};
```

### 5. Urgency Timer Component
```typescript
// src/components/UrgencyTimer.tsx
import { Clock, AlertTriangle } from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationProvider";

export const UrgencyTimer = () => {
  const { timeRemaining, isPersonalized } = usePersonalization();

  if (!isPersonalized || !timeRemaining) return null;

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 max-w-md mx-auto mb-6">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Clock className="w-5 h-5 text-white" />
        <AlertTriangle className="w-5 h-5 text-white" />
      </div>
      <p className="text-lg md:text-xl font-bold text-white mb-1">
        ⏳ Tu invitación expira en: {timeRemaining}
      </p>
      <p className="text-sm text-white/80">
        Después de esto, la oportunidad de ser el #1 desaparecerá para siempre.
      </p>
    </div>
  );
};
```

## URL Generation Tool Updates

### Enhanced URL Generator
```javascript
// Updated URL generator with expiration
function generatePersonalizedUrl(personalizationData, hoursValid = 72) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (hoursValid * 60 * 60 * 1000));
  const uniqueCode = generateUniqueCode();
  
  const dataWithExpiration = {
    ...personalizationData,
    expiration: {
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      uniqueCode
    }
  };
  
  const encodedData = btoa(JSON.stringify(dataWithExpiration));
  return `https://your-domain.com/invite/${uniqueCode}?data=${encodedData}`;
}

function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
```

## Implementation Benefits

1. **Enhanced Exclusivity**: Time-limited offers create urgency
2. **Better Tracking**: Unique codes allow precise campaign tracking
3. **Clean URLs**: Professional-looking custom paths
4. **Graceful Expiration**: User-friendly expired offer page
5. **Scalability**: Easy to manage multiple campaign types

## Updated Implementation Timeline

1. **Week 1**: Core infrastructure + expiration system
2. **Week 2**: Component integration + timer components
3. **Week 3**: Expired page + URL generator + testing

## Security Considerations

- Validate unique codes to prevent guessing
- Rate limit URL generation
- Secure the expiration time validation
- Prevent manipulation of timestamps