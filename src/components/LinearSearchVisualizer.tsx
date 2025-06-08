
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface LinearSearchVisualizerProps {
  array: number[];
  target?: number;
  speed: number;
  onStepChange?: (step: number) => void;
  onAnimationChange?: (isAnimating: boolean) => void;
}

const LinearSearchVisualizer = forwardRef<any, LinearSearchVisualizerProps>(
  ({ array, target = array[Math.floor(Math.random() * array.length)], speed, onStepChange, onAnimationChange }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [found, setFound] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completed, setCompleted] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      reset: () => {
        setCurrentIndex(-1);
        setFound(false);
        setIsPlaying(false);
        setCompleted(false);
        onStepChange?.(0);
        onAnimationChange?.(false);
      }
    }));

    useEffect(() => {
      if (!isPlaying || completed) return;

      const timer = setTimeout(() => {
        if (currentIndex < array.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          onStepChange?.(nextIndex + 1);

          if (array[nextIndex] === target) {
            setFound(true);
            setIsPlaying(false);
            setCompleted(true);
            onAnimationChange?.(false);
          }
        } else {
          setIsPlaying(false);
          setCompleted(true);
          onAnimationChange?.(false);
        }
      }, 1000 - (speed * 8));

      return () => clearTimeout(timer);
    }, [isPlaying, currentIndex, array, target, speed, completed, onStepChange, onAnimationChange]);

    useEffect(() => {
      onAnimationChange?.(isPlaying);
    }, [isPlaying, onAnimationChange]);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Searching for: <span className="font-bold text-primary">{target}</span>
        </div>
        <div className="flex gap-1 items-end">
          {array.map((value, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center transition-all duration-300
                ${index === currentIndex ? 'animate-pulse' : ''}
              `}
            >
              <div
                className={`
                  w-8 h-${Math.max(8, Math.floor(value / 10))} min-h-8 
                  flex items-end justify-center text-xs font-bold rounded-t
                  transition-all duration-300
                  ${index < currentIndex ? 'bg-red-400' : 
                    index === currentIndex ? 'bg-yellow-400' : 
                    found && array[index] === target ? 'bg-green-400' : 'bg-blue-400'}
                `}
                style={{ height: `${Math.max(32, value)}px` }}
              >
                <span className="text-white mb-1">{value}</span>
              </div>
              <span className="text-xs mt-1">{index}</span>
            </div>
          ))}
        </div>
        {completed && (
          <div className={`text-sm font-bold ${found ? 'text-green-500' : 'text-red-500'}`}>
            {found ? `Found at index ${currentIndex}!` : 'Not found!'}
          </div>
        )}
      </div>
    );
  }
);

LinearSearchVisualizer.displayName = 'LinearSearchVisualizer';

export default LinearSearchVisualizer;
