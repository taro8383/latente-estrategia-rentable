import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'rotate-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
  triggerOnce = true
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce, delay });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-[${duration}ms]`;

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-12`;
        case 'fade-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-12`;
        case 'fade-left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-12`;
        case 'fade-right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-12`;
        case 'scale-up':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case 'rotate-in':
          return `${baseClasses} ${durationClass} opacity-0 rotate-3`;
        default:
          return `${baseClasses} ${durationClass} opacity-0`;
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

interface StaggeredAnimationProps {
  children: ReactNode[];
  staggerDelay?: number;
  animation?: AnimatedElementProps['animation'];
  className?: string;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  staggerDelay = 100,
  animation = 'fade-up',
  className = ''
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedElement
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedElement>
      ))}
    </div>
  );
};

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateOffset = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', updateOffset);
    updateOffset();

    return () => window.removeEventListener('scroll', updateOffset);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = ''
}) => {
  const scrollProgress = useScrollProgress();

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-border z-50 ${className}`}>
      <div
        className="h-full accent-gradient transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

import { useRef, useState, useEffect } from 'react';