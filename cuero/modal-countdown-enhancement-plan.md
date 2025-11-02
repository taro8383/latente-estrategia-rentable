# Modal Countdown Enhancement Plan

## Goal
Replicate the OfferBox countdown display (lines 113-124) in PersonalizedWelcomeModal, but calculate based on user's local time and show specific day/time when invitation expires.

## Current OfferBox Countdown Analysis
From `src/components/OfferBox.tsx` lines 113-124:
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

### 1. Create LocalTimeCountdown Component
**File**: `src/components/LocalTimeCountdown.tsx` (new)
**Purpose**: Calculate expiration based on user's local time
**Features**:
- Get user's timezone from browser
- Calculate expiration day/time dynamically
- Format in Spanish like OfferBox
- Show specific day and time
- Handle different urgency levels

### 2. Update PersonalizationProvider
**File**: `src/context/PersonalizationProvider.tsx`
**Enhancements**:
- Add expiration calculation based on user's local time
- Add formatted expiration string for display
- Handle timezone offset calculations
- Provide day name and time in Spanish

### 3. Replace EnhancedUrgencyTimer in Modal
**File**: `src/components/PersonalizedWelcomeModal.tsx`
**Changes**:
- Replace `<EnhancedUrgencyTimer />` with `<LocalTimeCountdown />`
- Maintain same styling as OfferBox
- Keep responsive design
- Ensure proper integration

## Technical Implementation Details

### Local Time Calculation Logic
```javascript
// Get user's timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Calculate expiration based on personalization data
const expirationDate = new Date(data?.expiration?.expiresAt);

// Format in Spanish
const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const dayName = dayNames[expirationDate.getDay()];

const timeString = expirationDate.toLocaleTimeString('es-ES', {
  hour: '2-digit',
  minute: '2-digit'
});
```

### Countdown Display Format
- **Normal**: "La ventana cierra el [Día] [Fecha] de [Mes]"
- **Time**: "A las [HH:MM], el nuevo número uno se decidirá el [SiguienteDía]."
- **Urgent**: Add warning styling and animations
- **Very Urgent**: Add pulsing effects and stronger warnings

### Component Structure
```jsx
<div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto">
  <div className="flex items-center justify-center gap-3 mb-3">
    <Clock className="w-6 h-6 text-white" />
    <AlertTriangle className="w-6 h-6 text-white" />
  </div>
  <p className="text-xl md:text-2xl font-bold text-white mb-2">
    ⏳ La ventana cierra el {formattedDay}
  </p>
  <p className="text-foreground font-medium">
    A las {formattedTime}, el nuevo número uno se decidirá el {nextDay}.
  </p>
</div>
```

## Integration Steps

1. **Create LocalTimeCountdown component**
   - Implement timezone detection
   - Add Spanish day/month formatting
   - Calculate next day for decision message
   - Add urgency styling logic

2. **Update PersonalizationProvider**
   - Add timezone-aware expiration calculation
   - Provide formatted strings for display
   - Handle edge cases (invalid dates, etc.)

3. **Update PersonalizedWelcomeModal**
   - Replace EnhancedUrgencyTimer with LocalTimeCountdown
   - Maintain modal styling and animations
   - Ensure responsive design

4. **Test Different Scenarios**
   - Various timezones
   - Different expiration dates
   - Urgent vs non-urgent states
   - Mobile vs desktop display

## Expected Outcome
- Modal shows exact expiration day/time in user's local timezone
- Spanish formatting matches OfferBox style
- Dynamic calculation based on personalization data
- Proper urgency indicators and styling
- Responsive design maintained

## Success Criteria
✅ Countdown displays specific day (e.g., "Jueves 30 de Octubre")
✅ Shows exact time (e.g., "A las 23:59")
✅ Uses user's local timezone for calculation
✅ Spanish formatting matches OfferBox style
✅ Urgency styling works correctly
✅ Responsive design maintained
✅ Integration with personalization data seamless