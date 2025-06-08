
import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback } from 'react';

interface BubbleSortVisualizerProps {
  array: number[];
  speed: number;
  onStepChange: (step: number) => void;
  onAnimationChange: (isAnimating: boolean) => void;
}

export interface BubbleSortVisualizerRef {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

const BubbleSortVisualizer = forwardRef<BubbleSortVisualizerRef, BubbleSortVisualizerProps>(
  ({ array, speed, onStepChange, onAnimationChange }, ref) => {
    const [currentArray, setCurrentArray] = useState<number[]>(array);
    const [comparing, setComparing] = useState<number[]>([]);
    const [swapping, setSwapping] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    const animationRef = useRef<NodeJS.Timeout>();
    const stepsRef = useRef<any[]>([]);

    // Generate bubble sort steps
    const generateSteps = useCallback((arr: number[]) => {
      const steps = [];
      const workingArray = [...arr];
      const n = workingArray.length;
      
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          // Compare step
          steps.push({
            type: 'compare',
            array: [...workingArray],
            comparing: [j, j + 1],
            swapping: [],
            sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
          });
          
          if (workingArray[j] > workingArray[j + 1]) {
            // Swap step
            [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
            steps.push({
              type: 'swap',
              array: [...workingArray],
              comparing: [],
              swapping: [j, j + 1],
              sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
            });
          }
        }
      }
      
      // Final step - all sorted
      steps.push({
        type: 'complete',
        array: [...workingArray],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k)
      });
      
      return steps;
    }, []);

    // Initialize steps when array changes
    React.useEffect(() => {
      stepsRef.current = generateSteps(array);
      setCurrentArray([...array]);
      setCurrentStep(0);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
    }, [array, generateSteps]);

    const executeStep = useCallback(() => {
      if (currentStep >= stepsRef.current.length) {
        setIsPlaying(false);
        onAnimationChange(false);
        return;
      }

      const step = stepsRef.current[currentStep];
      setCurrentArray(step.array);
      setComparing(step.comparing);
      setSwapping(step.swapping);
      setSorted(step.sorted);
      
      onStepChange(currentStep);
      setCurrentStep(prev => prev + 1);
    }, [currentStep, onStepChange]);

    // Animation loop
    React.useEffect(() => {
      if (isPlaying) {
        const delay = Math.max(50, 1000 - (speed * 10));
        animationRef.current = setTimeout(executeStep, delay);
      }
      
      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
        }
      };
    }, [isPlaying, executeStep, speed]);

    useImperativeHandle(ref, () => ({
      play: () => {
        setIsPlaying(true);
        onAnimationChange(true);
      },
      pause: () => {
        setIsPlaying(false);
        onAnimationChange(false);
      },
      reset: () => {
        setIsPlaying(false);
        onAnimationChange(false);
        setCurrentStep(0);
        setCurrentArray([...array]);
        setComparing([]);
        setSwapping([]);
        setSorted([]);
      }
    }));

    const getBarColor = (index: number) => {
      if (sorted.includes(index)) return 'bg-green-500';
      if (swapping.includes(index)) return 'bg-red-500';
      if (comparing.includes(index)) return 'bg-yellow-500';
      return 'bg-primary';
    };

    const maxValue = Math.max(...currentArray);

    return (
      <div className="w-full h-full flex items-end justify-center gap-1 p-4">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className={`${getBarColor(index)} transition-all duration-300 rounded-t-lg relative min-w-[8px] hover:opacity-80`}
            style={{
              height: `${(value / maxValue) * 300}px`,
              width: `${Math.max(800 / currentArray.length, 8)}px`,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-foreground">
              {value}
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              {index}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

BubbleSortVisualizer.displayName = 'BubbleSortVisualizer';

export default BubbleSortVisualizer;
