
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface BinarySearchVisualizerProps {
  array: number[];
  target?: number;
  speed: number;
  onStepChange?: (step: number) => void;
  onAnimationChange?: (isAnimating: boolean) => void;
}

const BinarySearchVisualizer = forwardRef<any, BinarySearchVisualizerProps>(
  ({ array, target, speed, onStepChange, onAnimationChange }, ref) => {
    const sortedArray = [...array].sort((a, b) => a - b);
    const searchTarget = target || sortedArray[Math.floor(Math.random() * sortedArray.length)];
    
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(sortedArray.length - 1);
    const [mid, setMid] = useState(-1);
    const [found, setFound] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [step, setStep] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      reset: () => {
        setLeft(0);
        setRight(sortedArray.length - 1);
        setMid(-1);
        setFound(false);
        setIsPlaying(false);
        setCompleted(false);
        setStep(0);
        onStepChange?.(0);
        onAnimationChange?.(false);
      }
    }));

    useEffect(() => {
      if (!isPlaying || completed || left > right) return;

      const timer = setTimeout(() => {
        const midPoint = Math.floor((left + right) / 2);
        setMid(midPoint);
        setStep(s => s + 1);
        onStepChange?.(step + 1);

        if (sortedArray[midPoint] === searchTarget) {
          setFound(true);
          setIsPlaying(false);
          setCompleted(true);
          onAnimationChange?.(false);
        } else if (sortedArray[midPoint] < searchTarget) {
          setLeft(midPoint + 1);
        } else {
          setRight(midPoint - 1);
        }

        if (left >= right && sortedArray[midPoint] !== searchTarget) {
          setIsPlaying(false);
          setCompleted(true);
          onAnimationChange?.(false);
        }
      }, 1200 - (speed * 10));

      return () => clearTimeout(timer);
    }, [isPlaying, left, right, sortedArray, searchTarget, speed, completed, step, onStepChange, onAnimationChange]);

    useEffect(() => {
      onAnimationChange?.(isPlaying);
    }, [isPlaying, onAnimationChange]);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Searching for: <span className="font-bold text-primary">{searchTarget}</span>
        </div>
        <div className="flex gap-1 items-end">
          {sortedArray.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition-all duration-300"
            >
              <div
                className={`
                  w-8 min-h-8 flex items-end justify-center text-xs font-bold rounded-t
                  transition-all duration-500
                  ${index < left || index > right ? 'bg-gray-300 opacity-50' :
                    index === mid ? 'bg-yellow-400 animate-pulse' :
                    found && value === searchTarget ? 'bg-green-400' : 'bg-blue-400'}
                `}
                style={{ height: `${Math.max(32, value)}px` }}
              >
                <span className="text-white mb-1">{value}</span>
              </div>
              <span className="text-xs mt-1">{index}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 text-xs">
          <span>Left: {left}</span>
          <span>Mid: {mid >= 0 ? mid : '?'}</span>
          <span>Right: {right}</span>
        </div>
        {completed && (
          <div className={`text-sm font-bold ${found ? 'text-green-500' : 'text-red-500'}`}>
            {found ? `Found at index ${mid}!` : 'Not found!'}
          </div>
        )}
      </div>
    );
  }
);

BinarySearchVisualizer.displayName = 'BinarySearchVisualizer';

export default BinarySearchVisualizer;
