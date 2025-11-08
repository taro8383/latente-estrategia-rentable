import { usePersonalization } from "@/context/PersonalizationProvider";
import { Clock } from "lucide-react";

export const EnhancedUrgencyTimer = () => {
  const { timeRemaining, isPersonalized, isVeryUrgent, getSecondsRemaining, data } = usePersonalization();

  if (!isPersonalized || !timeRemaining) return null;

  // Simple direct gender replacement
  const gender = data?.genderInfo?.gender || 'male';
  const isFemale = gender === 'female';

  const isUrgent = !timeRemaining.includes('d') && parseInt(timeRemaining) < 24;
  const veryUrgent = isVeryUrgent();
  const seconds = getSecondsRemaining();

  // Extract time parts for display
  const timeParts = timeRemaining.split(' ');
  const hasDays = timeRemaining.includes('d');
  const hasHours = timeRemaining.includes('h');
  const hasMinutes = timeRemaining.includes('m');
  const hasSeconds = timeRemaining.includes('s');

  return (
    <div className={`
      rounded-2xl p-6 max-w-md mx-auto border transition-all duration-300
      ${veryUrgent 
        ? 'bg-destructive/30 border-destructive/50 animate-pulse shadow-lg shadow-destructive/20' 
        : isUrgent 
        ? 'bg-orange-500/20 border-orange-500/40 shadow-lg shadow-orange-500/10'
        : 'bg-orange-500/10 border-orange-500/30'
      }
    `}>
      <div className="flex items-center justify-center gap-3 mb-4">
      </div>
      
      <div className="text-center mb-3">
        <p className={`
          font-bold leading-tight mb-2
          ${veryUrgent ? 'text-white' : isUrgent ? 'text-orange-100' : 'text-orange-100'}
        `}
        style={{
          fontSize: veryUrgent ? '1.25rem' : isUrgent ? '1.125rem' : '1rem'
        }}>
          {veryUrgent ? '⚠️ ¡TIEMPO CRÍTICO! ' : isUrgent ? '⏳ Tiempo agotándose: ' : '⏳ '}
          <span className="block mt-2">
            {timeParts.map((part, index) => {
              const value = parseInt(part);
              const unit = part.replace(value.toString(), '');
              const isSeconds = unit === 's';
              
              return (
                <span key={index} className="inline-block mx-1">
                  <span className={`
                    font-semibold
                    ${isSeconds
                      ? 'animate-pulse'
                      : ''
                    }
                    ${veryUrgent
                      ? 'text-white'
                      : isUrgent
                      ? 'text-orange-200'
                      : 'text-orange-100'
                    }
                  `}
                  style={{fontSize: '1.25rem'}}>
                    {value}
                  </span>
                  <span className={`
                    font-medium ml-1
                    ${veryUrgent
                      ? 'text-white/90'
                      : isUrgent
                      ? 'text-orange-300'
                      : 'text-orange-200'
                    }
                  `}
                  style={{fontSize: '0.875rem'}}>
                    {unit}
                  </span>
                </span>
              );
            })}
          </span>
        </p>
      </div>
      
      <p className={`
        text-center leading-relaxed
        ${veryUrgent
          ? 'text-white/90 font-semibold'
          : isUrgent
          ? 'text-orange-200/90'
          : 'text-orange-200/80'
        }
      `}
      style={{fontSize: '0.875rem'}}>
        {veryUrgent
          ? '¡SEGUNDOS para que tu oportunidad desaparezca para siempre!'
          : isUrgent
          ? 'Tu invitación expira pronto. Actúa ahora o pierde para siempre.'
          : `Después de esto, la oportunidad de ser ${isFemale ? 'la #1' : 'el #1'} desaparecerá.`
        }
      </p>
      
      {veryUrgent && (
        <div className="mt-4 pt-4 border-t border-white/30">
          <p className="text-white/80 text-center italic font-medium" style={{fontSize: '0.75rem'}}>
            "Los líderes no esperan. Los segundos deciden el destino."
          </p>
        </div>
      )}
      
      {isUrgent && !veryUrgent && (
        <div className="mt-3 pt-3 border-t border-orange-500/30">
          <p className="text-orange-300/80 text-center italic" style={{fontSize: '0.75rem'}}>
            "El tiempo no perdona a quienes dudan."
          </p>
        </div>
      )}
    </div>
  );
};