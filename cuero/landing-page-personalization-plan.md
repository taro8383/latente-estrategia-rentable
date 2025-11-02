# Landing Page Personalization Implementation Plan

## Overview
This plan outlines the implementation of a dynamic personalization system for the landing page that will automatically replace variables in square brackets based on URL parameters containing encoded JSON data.

## Architecture

### 1. URL Parameter Structure
We'll use a single `data` parameter containing base64-encoded JSON:
```
https://your-domain.com/?data=eyJicmFuZEluZm8iOnsibmFtZSI6IkNvYWNoIiwiaW5kdXN0cnkiOiJsdXh1cnktZmFzaGlvbiJ9LCJyZWFkZXJJbmZvIjp7Im5hbWUiOiJKb2huIiwiY29tcGFueSI6Ikx1eHVyeSBIb2xkaW5ncyJ9LCJjdXN0b21LZXl3b3JkcyI6WyJwcmVtaXVtIGJhZ2d5IiwiaGFuZGNyYWZ0ZWQgbGVhdGhlciIsImV4Y2x1c2l2ZSBkZXNpZ24iXX0=
```

### 2. JSON Data Structure
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
  }
}
```

### 3. Technical Implementation

#### 3.1 Core Components to Create

1. **PersonalizationProvider** (`src/context/PersonalizationProvider.tsx`)
   - React Context Provider for personalization data
   - Handles URL parsing and data extraction
   - Provides fallback values

2. **usePersonalization** Hook (`src/hooks/usePersonalization.ts`)
   - Custom hook to access personalization data
   - Provides variable replacement functionality

3. **VariableReplacer** Utility (`src/utils/variableReplacer.ts`)
   - Core function to replace [variables] with actual values
   - Handles nested object access
   - Provides fallback mechanisms

#### 3.2 File Structure
```
src/
├── context/
│   └── PersonalizationProvider.tsx
├── hooks/
│   └── usePersonalization.ts
├── utils/
│   └── variableReplacer.ts
├── types/
│   └── personalization.ts
└── components/
    └── PersonalizedText.tsx
```

### 4. Implementation Steps

#### Phase 1: Core Infrastructure
1. Create TypeScript interfaces for personalization data
2. Implement URL parameter parsing and base64 decoding
3. Create PersonalizationProvider with React Context
4. Develop usePersonalization hook
5. Build VariableReplacer utility

#### Phase 2: Component Integration
1. Update Hero.tsx with personalization variables
2. Update Problems.tsx with industry-specific keywords
3. Update Solution.tsx with brand-specific references
4. Update FinalCTA.tsx with reader name and brand name
5. Create PersonalizedText component for easy variable replacement

#### Phase 3: Testing & Documentation
1. Test with various personalization scenarios
2. Implement error handling for malformed data
3. Create documentation for email marketers
4. Build URL generator tool for marketing team

### 5. Variable Replacement Examples

#### Before Personalization:
```jsx
<h1>El segundo lugar es el primer perdedor</h1>
<p>"¿Eso es de [brand name]? Mi abuelo tenía uno igual…"</p>
```

#### After Personalization (with brand name "Coach"):
```jsx
<h1>El segundo lugar es el primer perdedor</h1>
<p>"¿Eso es de Coach? Mi abuelo tenía uno igual…"</p>
```

### 6. Components to Update

#### Hero Component
- Replace `[brand name]` in the quote section
- Add `[reader name]` in personalized sections
- Industry-specific messaging based on `[industry]`

#### Problems Component
- Insert `[industry keywords]` in problem descriptions
- Customize examples based on `[product type]`
- Tailor solutions to `[target audience]`

#### Solution Component
- Brand-specific success stories using `[brand name]`
- Industry-relevant case studies
- Custom benefit statements

#### FinalCTA Component
- Personalized calls-to-action with `[reader name]`
- Brand-specific urgency messaging
- Industry-tailored final statements

### 7. URL Generation Tool

Create a simple web tool for the marketing team to generate personalized URLs:

```javascript
// Example function for generating URLs
function generatePersonalizedUrl(personalizationData) {
  const encodedData = btoa(JSON.stringify(personalizationData));
  return `https://your-domain.com/?data=${encodedData}`;
}
```

### 8. Error Handling & Fallbacks

- Graceful degradation when personalization data is missing
- Default values for all variables
- Error logging for debugging
- Validation of personalization data structure

### 9. Performance Considerations

- Parse URL parameters only once on app initialization
- Cache parsed personalization data
- Minimize re-renders with React.memo where appropriate
- Use useMemo for expensive variable replacements

### 10. Security Considerations

- Sanitize all personalization data
- Validate JSON structure
- Prevent XSS attacks through proper escaping
- Limit variable length to prevent abuse

## Implementation Timeline

1. **Week 1**: Core infrastructure (Provider, Hook, Utilities)
2. **Week 2**: Component integration and testing
3. **Week 3**: Documentation, URL generator tool, and final testing

## Success Metrics

- Increased conversion rates on personalized landing pages
- Higher engagement metrics (time on page, scroll depth)
- Improved email campaign performance
- Positive feedback from sales team on lead quality