# OfferBox Component Fixes Implementation Plan

## Current Issues Identified

1. **Function Reference**: Line 7 still references `document.getElementById('contacto')` instead of `document.getElementById('1')`
2. **Icon Colors**: Lines 116-117 still use `text-destructive` class for Clock and AlertTriangle icons instead of `text-white`

## Required Changes

### 1. Fix Function Reference
**File**: `src/components/OfferBox.tsx`
**Line 7**: Change `document.getElementById('contacto')` to `document.getElementById('1')`

### 2. Fix Icon Colors
**File**: `src/components/OfferBox.tsx`
**Line 116**: Change `className="w-6 h-6 text-destructive"` to `className="w-6 h-6 text-white"`
**Line 117**: Change `className="w-6 h-6 text-destructive"` to `className="w-6 h-6 text-white"`

## Implementation Notes

- The function name was already changed to `scrollToSection1` but the function body still references the old ID
- The icons need to be white to match the design requirements
- These are the only remaining issues from the user's feedback

## Verification Steps

1. Confirm function now properly references section "1"
2. Confirm icons are now white instead of destructive color
3. Test that button properly navigates to section "1"
4. Ensure no TypeScript errors after changes