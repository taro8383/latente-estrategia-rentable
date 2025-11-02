import { Clock, AlertTriangle, Timer } from "lucide-react";
import { usePersonalization } from "@/context/PersonalizationProvider";

export const UrgencyTimer = () => {
  const { timeRemaining, isPersonalized } = usePersonalization();

  if (!isPersonalized || !timeRemaining) return null;

  // Check if time is less than 24 hours
  const isUrgent = !timeRemaining.includes('d') && parseInt(timeRemaining) < 24;

  return (
    <div className={`
      rounded-2xl p-4 max-w-md mx-auto mb-6 border transition-all duration-300
      ${isUrgent 
        ? 'bg-destructive/20 border-destructive/40 animate-pulse' 
        : 'bg-orange-500/10 border-orange-500/30'
      }
    `}>
      <div className="flex items-center justify-center gap-3 mb-3">
        <Clock className={`w-6 h-6 ${isUrgent ? 'text-white' : 'text-orange-400'}`} />
        {isUrgent && <AlertTriangle className="w-6 h-6 text-white animate-bounce" />}
        {!isUrgent && <Timer className="w-6 h-6 text-orange-400" />}
      </div>
      
      <p className={`
        text-center font-bold leading-tight mb-2
        ${isUrgent ? 'text-white text-lg' : 'text-orange-100 text-base'}
      `}>
        {isUrgent ? '⚠️ ' : '⏳ '}
        Tu invitación expira en: <span className="text-xl">{timeRemaining}</span>
      </p>
      
      <p className={`
        text-center text-sm leading-relaxed
        ${isUrgent ? 'text-white/90' : 'text-orange-200/80'}
      `}>
        {isUrgent 
          ? '¡El tiempo se agota! Esta oportunidad desaparecerá para siempre.'
          : 'Después de esto, la oportunidad de ser el #1 desaparecerá.'
        }
      </p>
      
      {isUrgent && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-white/70 text-center italic">
            "Los líderes no esperan. Los que dudan, pierden para siempre."
          </p>
        </div>
      )}
    </div>
  );
};