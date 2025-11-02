# Modal Improvements Plan

Based on user feedback, here are the three small changes needed:

## 1. Countdown Number Size Consistency
**File**: `src/components/EnhancedUrgencyTimer.tsx`
**Issue**: Seconds numbers are larger than other time units
**Fix**: Make all time unit numbers the same size
- Change line ~58: `text-3xl font-bold animate-pulse` to `text-xl font-bold animate-pulse`
- Ensure consistent `text-xl font-semibold` for all time values

## 2. Remove Double Cross Symbols
**File**: `src/components/PersonalizedWelcomeModal.tsx`
**Issue**: Two close buttons (one from Dialog, one custom)
**Fix**: Remove custom close button, use only Dialog's built-in close
- Remove lines ~18-23: Custom close button
- Keep Dialog's default close functionality

## 3. Simplify Time Icons
**File**: `src/components/EnhancedUrgencyTimer.tsx`
**Issue**: Three different icons (Clock, AlertTriangle, Timer) are excessive
**Fix**: Use only Clock icon consistently
- Remove AlertTriangle and Timer icons
- Keep only Clock icon for all urgency states
- Simplify the icon logic

## Implementation Order
1. Fix EnhancedUrgencyTimer number sizes
2. Simplify EnhancedUrgencyTimer icons
3. Fix PersonalizedWelcomeModal close button

## Expected Outcome
- Consistent number sizing across all time units
- Single, clean close button
- Simplified, less cluttered timer display