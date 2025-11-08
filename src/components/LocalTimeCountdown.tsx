import { Clock, AlertTriangle } from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { useMemo } from "react";

export const LocalTimeCountdown = () => {
  const { data, isPersonalized } = usePersonalization();

  const countdownData = useMemo(() => {
    if (!isPersonalized || !data?.expiration?.expiresAt) {
      return null;
    }

    try {
      // Get user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Parse expiration date
      const expirationDate = new Date(data.expiration.expiresAt);
      
      // Validate date
      if (isNaN(expirationDate.getTime())) {
        return null;
      }

      // Spanish day names
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      
      // Format day and month
      const dayName = dayNames[expirationDate.getDay()];
      const dayNumber = expirationDate.getDate();
      const monthName = monthNames[expirationDate.getMonth()];
      
      // Format time
      const timeString = expirationDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: userTimezone
      });

      // Calculate next day for decision message
      const tomorrow = new Date(expirationDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowName = dayNames[tomorrow.getDay()];

      // Calculate urgency based on time remaining
      const now = new Date();
      const timeDiff = expirationDate.getTime() - now.getTime();
      const hoursUntilExpiration = Math.floor(timeDiff / (1000 * 60 * 60));
      const isVeryUrgent = hoursUntilExpiration < 24;
      const isCritical = hoursUntilExpiration < 2;

      return {
        dayName,
        dayNumber,
        monthName,
        timeString,
        tomorrowName,
        isVeryUrgent,
        isCritical,
        timeDiff
      };
    } catch (error) {
      console.error('Error calculating countdown:', error);
      return null;
    }
  }, [isPersonalized, data?.expiration?.expiresAt]);

  if (!countdownData) return null;

  const {
    dayName,
    dayNumber,
    monthName,
    timeString,
    tomorrowName,
    isVeryUrgent,
    isCritical
  } = countdownData;

  return (
    <div className={`
      bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto
      transition-all duration-300
      ${isCritical 
        ? 'bg-destructive/30 border-destructive/50 animate-pulse shadow-lg shadow-destructive/30' 
        : isVeryUrgent 
        ? 'bg-orange-500/20 border-orange-500/40 shadow-lg shadow-orange-500/10'
        : 'bg-orange-500/10 border-orange-500/30'
      }
    `}>
      <div className="flex items-center justify-center gap-3 mb-3">
        <Clock className={`w-6 h-6 ${isCritical ? 'text-white animate-pulse' : 'text-white'}`} />
        <AlertTriangle className={`w-6 h-6 ${isCritical ? 'text-white animate-bounce' : 'text-white'}`} />
      </div>
      
      <p className={`
        font-bold mb-2
        ${isCritical
          ? 'text-white animate-pulse'
          : 'text-white'
        }
      `}
      style={{fontSize: 'clamp(1.25rem, 2vw, 1.5rem)'}}
      >
        ⏳ La ventana cierra el {dayName} {dayNumber} de {monthName}
      </p>
      
      <p className={`
        font-medium
        ${isCritical 
          ? 'text-white/90' 
          : 'text-white/80'
        }
      `}>
        A las {timeString}, el nuevo número uno se decidirá el {tomorrowName}.
      </p>
      
      {isCritical && (
        <div className="mt-4 pt-4 border-t border-white/30">
          <p className="text-white/80 text-center italic font-medium" style={{fontSize: '0.75rem'}}>
            "Las decisiones históricas se toman en minutos. No esperes."
          </p>
        </div>
      )}
    </div>
  );
};