
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;
}

interface GraphVisualizerProps {
  algorithm: 'bfs' | 'dfs';
  speed: number;
  onStepChange?: (step: number) => void;
  onAnimationChange?: (isAnimating: boolean) => void;
}

const GraphVisualizer = forwardRef<any, GraphVisualizerProps>(
  ({ algorithm, speed, onStepChange, onAnimationChange }, ref) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<number[][]>([]);
    const [visitedOrder, setVisitedOrder] = useState<number[]>([]);
    const [currentNode, setCurrentNode] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Initialize graph
    useEffect(() => {
      const graphNodes: Node[] = [
        { id: 0, x: 150, y: 50, visited: false, current: false },
        { id: 1, x: 100, y: 120, visited: false, current: false },
        { id: 2, x: 200, y: 120, visited: false, current: false },
        { id: 3, x: 50, y: 190, visited: false, current: false },
        { id: 4, x: 150, y: 190, visited: false, current: false },
        { id: 5, x: 250, y: 190, visited: false, current: false },
      ];
      
      const graphEdges = [
        [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5]
      ];

      setNodes(graphNodes);
      setEdges(graphEdges);
    }, []);

    useImperativeHandle(ref, () => ({
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      reset: () => {
        setNodes(prev => prev.map(node => ({ ...node, visited: false, current: false })));
        setVisitedOrder([]);
        setCurrentNode(-1);
        setIsPlaying(false);
        setCompleted(false);
        onStepChange?.(0);
        onAnimationChange?.(false);
      }
    }));

    useEffect(() => {
      if (!isPlaying || completed) return;

      const timer = setTimeout(() => {
        if (visitedOrder.length === 0) {
          // Start from node 0
          setCurrentNode(0);
          setVisitedOrder([0]);
          setNodes(prev => prev.map(node => 
            node.id === 0 ? { ...node, visited: true, current: true } : { ...node, current: false }
          ));
          onStepChange?.(1);
        } else {
          // Continue traversal based on algorithm
          const adjacencyList: number[][] = Array(nodes.length).fill(null).map(() => []);
          edges.forEach(([a, b]) => {
            adjacencyList[a].push(b);
            adjacencyList[b].push(a);
          });

          let nextNode = -1;
          
          if (algorithm === 'bfs') {
            // BFS: Use queue (breadth-first)
            const queue = [currentNode];
            const visited = new Set(visitedOrder);
            
            while (queue.length > 0) {
              const node = queue.shift()!;
              for (const neighbor of adjacencyList[node]) {
                if (!visited.has(neighbor)) {
                  nextNode = neighbor;
                  break;
                }
              }
              if (nextNode !== -1) break;
            }
          } else {
            // DFS: Use stack (depth-first)
            const stack = [currentNode];
            const visited = new Set(visitedOrder);
            
            while (stack.length > 0) {
              const node = stack.pop()!;
              for (const neighbor of adjacencyList[node]) {
                if (!visited.has(neighbor)) {
                  nextNode = neighbor;
                  break;
                }
              }
              if (nextNode !== -1) break;
            }
          }

          if (nextNode !== -1 && !visitedOrder.includes(nextNode)) {
            setCurrentNode(nextNode);
            setVisitedOrder(prev => [...prev, nextNode]);
            setNodes(prev => prev.map(node => ({
              ...node,
              visited: visitedOrder.includes(node.id) || node.id === nextNode,
              current: node.id === nextNode
            })));
            onStepChange?.(visitedOrder.length + 1);
          } else {
            setIsPlaying(false);
            setCompleted(true);
            onAnimationChange?.(false);
          }
        }
      }, 1500 - (speed * 12));

      return () => clearTimeout(timer);
    }, [isPlaying, visitedOrder, currentNode, algorithm, edges, nodes.length, speed, completed, onStepChange, onAnimationChange]);

    useEffect(() => {
      onAnimationChange?.(isPlaying);
    }, [isPlaying, onAnimationChange]);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {algorithm.toUpperCase()} Traversal
        </div>
        <div className="relative w-80 h-60 bg-background/20 rounded-lg">
          {/* Draw edges */}
          <svg className="absolute inset-0 w-full h-full">
            {edges.map(([a, b], index) => (
              <line
                key={index}
                x1={nodes[a]?.x}
                y1={nodes[a]?.y}
                x2={nodes[b]?.x}
                y2={nodes[b]?.y}
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              />
            ))}
          </svg>
          
          {/* Draw nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`
                absolute w-8 h-8 rounded-full flex items-center justify-center
                text-white font-bold text-sm transition-all duration-500
                ${node.current ? 'bg-yellow-400 animate-pulse' :
                  node.visited ? 'bg-green-400' : 'bg-blue-400'}
              `}
              style={{
                left: node.x - 16,
                top: node.y - 16,
              }}
            >
              {node.id}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Visited order: {visitedOrder.join(' → ')}
        </div>
      </div>
    );
  }
);

GraphVisualizer.displayName = 'GraphVisualizer';

export default GraphVisualizer;
