import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Code2, Zap, Brain, Moon, Sun, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import ThreeBackground from '@/components/ThreeBackground';
import BubbleSortVisualizer from '@/components/BubbleSortVisualizer';
import LinearSearchVisualizer from '@/components/LinearSearchVisualizer';
import BinarySearchVisualizer from '@/components/BinarySearchVisualizer';
import GraphVisualizer from '@/components/GraphVisualizer';
import CodeViewer from '@/components/CodeViewer';
import { algorithms, algorithmCategories, getAlgorithmsByCategory } from '@/data/algorithmMapping';

type BackgroundEffect = 'particles' | 'waves' | 'geometric' | 'neural';

const Index = () => {
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [arraySize, setArraySize] = useState([10]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [selectedCategory, setSelectedCategory] = useState('sorting');
  const [array, setArray] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgEffect, setBgEffect] = useState<BackgroundEffect>('particles');
  const visualizerRef = useRef<any>(null);

  const currentAlgorithm = algorithms[selectedAlgorithm];

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const generateRandomArray = () => {
    const size = arraySize[0];
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setCurrentStep(0);
  };

  const handlePlay = () => {
    if (visualizerRef.current) {
      if (isPlaying) {
        visualizerRef.current.pause();
      } else {
        visualizerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (visualizerRef.current) {
      visualizerRef.current.reset();
      setIsPlaying(false);
      setCurrentStep(0);
    }
    generateRandomArray();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const algorithmsInCategory = getAlgorithmsByCategory(category);
    if (algorithmsInCategory.length > 0) {
      setSelectedAlgorithm(algorithmsInCategory[0].key);
    }
  };

  const handleBgEffectChange = (value: string) => {
    setBgEffect(value as BackgroundEffect);
  };

  const renderVisualizer = () => {
    switch (selectedAlgorithm) {
      case 'linear-search':
        return (
          <LinearSearchVisualizer
            ref={visualizerRef}
            array={array}
            speed={speed[0]}
            onStepChange={setCurrentStep}
            onAnimationChange={setIsAnimating}
          />
        );
      case 'binary-search':
        return (
          <BinarySearchVisualizer
            ref={visualizerRef}
            array={array}
            speed={speed[0]}
            onStepChange={setCurrentStep}
            onAnimationChange={setIsAnimating}
          />
        );
      case 'bfs':
        return (
          <GraphVisualizer
            ref={visualizerRef}
            algorithm="bfs"
            speed={speed[0]}
            onStepChange={setCurrentStep}
            onAnimationChange={setIsAnimating}
          />
        );
      case 'dfs':
        return (
          <GraphVisualizer
            ref={visualizerRef}
            algorithm="dfs"
            speed={speed[0]}
            onStepChange={setCurrentStep}
            onAnimationChange={setIsAnimating}
          />
        );
      default:
        if (selectedCategory === 'sorting') {
          return (
            <BubbleSortVisualizer
              ref={visualizerRef}
              array={array}
              speed={speed[0]}
              onStepChange={setCurrentStep}
              onAnimationChange={setIsAnimating}
            />
          );
        }
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="animate-pulse">Visualization for {currentAlgorithm?.name} coming soon!</p>
          </div>
        );
    }
  };

  if (!showVisualizer) {
    return (
      <div className="min-h-screen relative overflow-hidden transition-all duration-700 ease-out">
        <ThreeBackground effect={bgEffect} isDarkMode={isDarkMode} />
        
        {/* Top Controls Bar - Better mobile layout */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
          <div className="flex items-center justify-center gap-3 bg-background/20 backdrop-blur-md rounded-full px-4 py-3 border border-white/10">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode}
                className="scale-75 sm:scale-90"
              />
              <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-white/20"></div>
            
            {/* Background Effect Selector */}
            <Select value={bgEffect} onValueChange={(value: string) => setBgEffect(value as BackgroundEffect)}>
              <SelectTrigger className="w-[100px] sm:w-[120px] bg-transparent border-white/20 text-xs sm:text-sm h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md">
                <SelectItem value="particles">Particles</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
                <SelectItem value="geometric">Geometric</SelectItem>
                <SelectItem value="neural">Neural Net</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center">
            <div className="animate-fade-in">
              {/* Main Title - Now below the controls */}
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 hover:scale-[1.02] transition-transform duration-500 ease-out mt-20 sm:mt-16">
                Algorithm Visualizer
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-90 hover:opacity-100 transition-opacity duration-500">
                Learn data structures and algorithms through beautiful, interactive visualizations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 ease-out hover:scale-[1.05] group"
                  onClick={() => setShowVisualizer(true)}
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Start Visualizing
                </Button>
                
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-background/30 transition-all duration-500 hover:scale-[1.02] border border-white/10">
                    <Brain className="h-4 w-4 animate-pulse" />
                    9+ Algorithms
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-background/30 transition-all duration-500 hover:scale-[1.02] border border-white/10">
                    <Code2 className="h-4 w-4" />
                    Multi-Language
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { title: "Sorting Algorithms", desc: "Bubble, Selection, Insertion, Merge, Quick Sort" },
                  { title: "Search Algorithms", desc: "Linear Search, Binary Search" },
                  { title: "Graph Algorithms", desc: "BFS, DFS, and pathfinding algorithms" }
                ].map((item, index) => (
                  <Card key={index} className="bg-background/10 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.03] hover:bg-background/20 group cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-center text-lg group-hover:text-primary transition-colors duration-500">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {item.desc}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Credits at bottom with glassmorphism */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
            <div className="glassmorphism rounded-full px-6 py-3 border border-white/20 shadow-lg backdrop-blur-lg bg-background/30 hover:bg-background/40 transition-all duration-500 hover:scale-105">
              <p className="text-sm text-muted-foreground">
                Made with ❤️ by{' '}
                <a 
                  href="https://github.com/Sanket-Bharadwaj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-300 inline-flex items-center gap-1 font-medium"
                >
                  Sanket Bharadwaj
                  <Github className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 transition-all duration-700 ease-out">
      <div className="container mx-auto px-4 py-6">
        {/* Header - Better mobile layout */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowVisualizer(false)}
              className="hover:bg-background/50 transition-all duration-500 hover:scale-[1.02]"
            >
              ← Back to Home
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-500">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(algorithmCategories).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-500">
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                {getAlgorithmsByCategory(selectedCategory).map(({ key, name }) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlay}
                className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-[1.02]"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-background/80 backdrop-blur-sm hover:bg-secondary transition-all duration-500 hover:scale-[1.02]"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="xl:col-span-1 space-y-4">
            <Card className="bg-background/50 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 animate-spin-slow" />
                  Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Animation Speed</label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>{speed[0]}%</span>
                    <span>Fast</span>
                  </div>
                </div>

                {(selectedCategory === 'sorting' || selectedCategory === 'searching') && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Array Size</label>
                    <Slider
                      value={arraySize}
                      onValueChange={setArraySize}
                      max={50}
                      min={5}
                      step={1}
                      className="w-full hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5</span>
                      <span>{arraySize[0]} elements</span>
                      <span>50</span>
                    </div>
                  </div>
                )}

                {(selectedCategory === 'sorting' || selectedCategory === 'searching') && (
                  <Button 
                    onClick={generateRandomArray} 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                  >
                    Generate New Array
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Algorithm Info */}
            <Card className="bg-background/50 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>{currentAlgorithm?.name || 'Algorithm Info'}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentAlgorithm && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors duration-500">
                      {currentAlgorithm.description}
                    </p>
                    <div className="flex justify-between hover:bg-background/30 p-2 rounded transition-all duration-500">
                      <span className="text-sm text-muted-foreground">Time Complexity:</span>
                      <span className="text-sm font-mono text-primary">{currentAlgorithm.timeComplexity}</span>
                    </div>
                    <div className="flex justify-between hover:bg-background/30 p-2 rounded transition-all duration-500">
                      <span className="text-sm text-muted-foreground">Space Complexity:</span>
                      <span className="text-sm font-mono text-secondary-foreground">{currentAlgorithm.spaceComplexity}</span>
                    </div>
                    {currentAlgorithm.stable && (
                      <div className="flex justify-between hover:bg-background/30 p-2 rounded transition-all duration-500">
                        <span className="text-sm text-muted-foreground">Stable:</span>
                        <span className="text-sm">{currentAlgorithm.stable}</span>
                      </div>
                    )}
                    {currentAlgorithm.inPlace && (
                      <div className="flex justify-between hover:bg-background/30 p-2 rounded transition-all duration-500">
                        <span className="text-sm text-muted-foreground">In-place:</span>
                        <span className="text-sm">{currentAlgorithm.inPlace}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Visualization Area */}
          <div className="xl:col-span-2 space-y-4">
            <Card className="bg-background/50 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle>Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background/30 rounded-lg p-4 min-h-[400px] flex items-center justify-center hover:bg-background/40 transition-all duration-500">
                  {renderVisualizer()}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Code Viewer for mobile */}
            <Card className="bg-background/50 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 animate-pulse" />
                  Code Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentAlgorithm && <CodeViewer code={currentAlgorithm.code} />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
