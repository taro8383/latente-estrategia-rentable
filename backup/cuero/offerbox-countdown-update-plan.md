# OfferBox Countdown Update Plan

## Goal
Replace the static countdown in OfferBox component (lines 113-124) with dynamic LocalTimeCountdown that calculates based on user's local time and shows specific day/time when invitation expires.

## Current OfferBox Countdown (Lines 113-124)
```jsx
<div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto">
  <div className="flex items-center justify-center gap-3 mb-3">
    <Clock className="w-6 h-6 text-white" />
    <AlertTriangle className="w-6 h-6 text-white" />
  </div>
  <p className="text-xl md:text-2xl font-bold text-white mb-2">
    ⏳ La ventana cierra el Jueves 30 de Octubre
  </p>
  <p className="text-foreground font-medium">
    A las 23:59, el nuevo número uno se decidirá el Viernes.
  </p>
</div>
```

## Implementation Strategy

### 1. Update OfferBox Component
**File**: `src/components/OfferBox.tsx`
**Changes**:
- Import LocalTimeCountdown component
- Replace static countdown (lines 113-124) with `<LocalTimeCountdown />`
- Maintain same styling and positioning
- Keep responsive design intact

### 2. Integration Requirements
- **Import**: Add LocalTimeCountdown import
- **Replacement**: Replace entire countdown div with LocalTimeCountdown component
- **Styling**: Ensure LocalTimeCountdown matches OfferBox design
- **Layout**: Maintain existing layout structure

### 3. Expected Result
- **Dynamic Calculation**: Based on user's local timezone
- **Spanish Formatting**: "La ventana cierra el [Día] [Número] de [Mes]"
- **Time Display**: "A las [HH:MM], el nuevo número uno se decidirá el [SiguienteDía]"
- **Urgency Levels**: Different styling for critical vs normal urgency
- **Responsive Design**: Works on mobile, tablet, desktop

## Technical Implementation

### Component Replacement
```jsx
// OLD (lines 113-124):
<div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto">
  <div className="flex items-center justify-center gap-3 mb-3">
    <Clock className="w-6 h-6 text-white" />
    <AlertTriangle className="w-6 h-6 text-white" />
  </div>
  <p className="text-xl md:text-2xl font-bold text-white mb-2">
    ⏳ La ventana cierra el Jueves 30 de Octubre
  </p>
  <p className="text-foreground font-medium">
    A las 23:59, el nuevo número uno se decidirá el Viernes.
  </p>
</div>

// NEW:
<LocalTimeCountdown />
```

### Import Addition
```jsx
// Add to imports:
import { LocalTimeCountdown } from "@/components/LocalTimeCountdown";
```

## Benefits of This Change

### 1. **Dynamic Time Calculation**
- Calculates based on user's actual timezone
- Shows correct local time for expiration
- Handles different regions automatically

### 2. **Accurate Deadlines**
- Shows specific day when window closes
- Displays exact time when decision happens
- Updates in real-time as expiration approaches

### 3. **Spanish Localization**
- Proper Spanish day/month names
- Natural language phrasing
- Culturally appropriate messaging

### 4. **Urgency Indicators**
- Visual warnings for critical timeframes
- Animated effects for immediate attention
- Color-coded urgency levels

## Implementation Steps

1. **Add Import**: Import LocalTimeCountdown in OfferBox
2. **Replace Countdown**: Replace static div with LocalTimeCountdown component
3. **Test Integration**: Verify styling matches OfferBox design
4. **Test Timezones**: Ensure correct local time display
5. **Test Edge Cases**: Invalid dates, missing data, etc.

## Success Criteria

✅ Countdown shows specific expiration day in Spanish
✅ Displays exact time when window closes
✅ Calculates based on user's local timezone
✅ Maintains OfferBox styling and layout
✅ Responsive design works on all devices
✅ Urgency indicators function correctly
✅ Integration with personalization data seamless
✅ No breaking changes to other OfferBox features

## Files to Modify

- `src/components/OfferBox.tsx` - Replace static countdown with LocalTimeCountdown
- No changes needed to LocalTimeCountdown (already implemented)
- No changes needed to PersonalizationProvider (already has expiration data)

This is a simple replacement that will make the OfferBox countdown dynamic and timezone-aware while maintaining the exact same visual appearance.