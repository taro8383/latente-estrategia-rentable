import { useScrollProgress } from '@/hooks/useScrollAnimation';

export const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-16 left-0 right-0 h-1 bg-border z-40">
      <div
        className="h-full accent-gradient transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};