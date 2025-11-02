# Mobile Button Font Size Fixes Plan

## Problem Analysis
The user identified that button text fonts are too large on mobile devices. Current implementation uses inconsistent font sizing across components without rem units for proper scalability.

## Current Issues
1. **Inconsistent font sizing**: Different components use different font size classes
2. **Mobile font sizes too large**: Many buttons use `text-base` or larger on mobile
3. **No rem unit usage**: Using Tailwind classes instead of rem units
4. **Touch target concerns**: Need to maintain 44px minimum touch targets

## Solution Strategy

### 1. Mobile-Specific Button Font Size Classes
Add to `src/index.css`:
```css
@media (max-width: 640px) {
  .mobile-button-sm {
    font-size: 0.875rem !important; /* 14px */
    line-height: 1.25rem !important;
  }
  
  .mobile-button-md {
    font-size: 1rem !important; /* 16px */
    line-height: 1.5rem !important;
  }
  
  .mobile-button-lg {
    font-size: 1.125rem !important; /* 18px */
    line-height: 1.75rem !important;
  }
  
  .mobile-button-xl {
    font-size: 1.25rem !important; /* 20px */
    line-height: 1.75rem !important;
  }
}
```

### 2. Button Component Updates
Update `src/components/ui/button.tsx` to include mobile font size variants:
- Add mobile font size classes to button variants
- Ensure proper touch targets (minimum 44px)
- Maintain desktop font sizes unchanged

### 3. Component-Specific Button Fixes

#### Hero Component
- Current: `text-sm sm:text-base md:text-lg`
- Fix: Apply `mobile-button-md` class

#### Problems Component  
- Current: `text-lg` on expand button
- Fix: Apply `mobile-button-lg` class

#### Solution Component
- Current: `text-base sm:text-lg`
- Fix: Apply `mobile-button-md` class

#### Offers Component
- Current: `size="lg"` with default sizing
- Fix: Apply `mobile-button-md` class

#### OfferBox Component
- Current: `text-base sm:text-lg`
- Fix: Apply `mobile-button-md` class

#### FinalCTA Component
- Current: `text-base sm:text-lg`
- Fix: Apply `mobile-button-md` class

#### Pricing Component
- Current: `text-sm sm:text-lg`
- Fix: Apply `mobile-button-md` class

#### StrategicPartners Component
- Current: `text-base sm:text-lg`
- Fix: Apply `mobile-button-md` class

### 4. Implementation Steps
1. Add mobile font size utilities to CSS
2. Update button component with mobile variants
3. Apply mobile font size classes to all component buttons
4. Test on various mobile screen sizes
5. Verify desktop layout remains unchanged

### 5. Testing Checklist
- [ ] Buttons readable on mobile devices
- [ ] Touch targets maintain 44px minimum
- [ ] Font sizes consistent across components
- [ ] Desktop layout unchanged
- [ ] Text wrapping works properly on mobile
- [ ] Button height appropriate for mobile

### 6. Font Size Guidelines
- **Secondary/Outline buttons**: 0.875rem (14px)
- **Primary/Default buttons**: 1rem (16px)
- **Hero/CTA buttons**: 1.125rem (18px)
- **Special emphasis buttons**: 1.25rem (20px)

## Expected Outcome
- Consistent button font sizes across all mobile components
- Better readability and user experience on mobile
- Maintained desktop layout and functionality
- Proper touch targets for mobile interaction
- Scalable font sizing using rem units