import { Clock } from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationProvider";

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
        <Clock className={`w-6 h-6 ${veryUrgent ? 'text-white animate-pulse' : isUrgent ? 'text-orange-300' : 'text-orange-400'}`} />
      </div>
      
      <div className="text-center mb-3">
        <p className={`
          font-bold leading-tight mb-2
          ${veryUrgent ? 'text-white text-xl' : isUrgent ? 'text-orange-100 text-lg' : 'text-orange-100 text-base'}
        `}>
          {veryUrgent ? '⚠️ ¡TIEMPO CRÍTICO! ' : isUrgent ? '⏳ Tiempo agotándose: ' : '⏳ '}
          <span className="block mt-2">
            {timeParts.map((part, index) => {
              const value = parseInt(part);
              const unit = part.replace(value.toString(), '');
              const isSeconds = unit === 's';
              
              return (
                <span key={index} className="inline-block mx-1">
                  <span className={`
                    text-xl font-semibold
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
                  `}>
                    {value}
                  </span>
                  <span className={`
                    text-sm font-medium ml-1
                    ${veryUrgent 
                      ? 'text-white/90' 
                      : isUrgent 
                      ? 'text-orange-300' 
                      : 'text-orange-200'
                    }
                  `}>
                    {unit}
                  </span>
                </span>
              );
            })}
          </span>
        </p>
      </div>
      
      <p className={`
        text-center text-sm leading-relaxed
        ${veryUrgent 
          ? 'text-white/90 font-semibold' 
          : isUrgent 
          ? 'text-orange-200/90' 
          : 'text-orange-200/80'
        }
      `}>
        {veryUrgent
          ? '¡SEGUNDOS para que tu oportunidad desaparezca para siempre!'
          : isUrgent
          ? 'Tu invitación expira pronto. Actúa ahora o pierde para siempre.'
          : `Después de esto, la oportunidad de ser ${isFemale ? 'la #1' : 'el #1'} desaparecerá.`
        }
      </p>
      
      {veryUrgent && (
        <div className="mt-4 pt-4 border-t border-white/30">
          <p className="text-xs text-white/80 text-center italic font-medium">
            "Los líderes no esperan. Los segundos deciden el destino."
          </p>
        </div>
      )}
      
      {isUrgent && !veryUrgent && (
        <div className="mt-3 pt-3 border-t border-orange-500/30">
          <p className="text-xs text-orange-300/80 text-center italic">
            "El tiempo no perdona a quienes dudan."
          </p>
        </div>
      )}
    </div>
  );
};