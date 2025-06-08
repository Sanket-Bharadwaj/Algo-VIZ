
import { bubbleSortCode, selectionSortCode, insertionSortCode, mergeSortCode, quickSortCode } from './sortingAlgorithms';
import { linearSearchCode, binarySearchCode } from './searchingAlgorithms';
import { bfsCode, dfsCode } from './graphAlgorithms';

export interface AlgorithmInfo {
  name: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable?: string;
  inPlace?: string;
  description: string;
  code: {
    python: string;
    java: string;
    c: string;
    javascript: string;
    pseudocode: string;
  };
}

export const algorithmCategories = {
  sorting: 'Sorting Algorithms',
  searching: 'Searching Algorithms', 
  graph: 'Graph Algorithms',
  recursion: 'Recursion & Dynamic Programming',
  number: 'Number Theory'
};

export const algorithms: Record<string, AlgorithmInfo> = {
  'bubble-sort': {
    name: 'Bubble Sort',
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: 'Yes',
    inPlace: 'Yes',
    description: 'Simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    code: bubbleSortCode
  },
  'selection-sort': {
    name: 'Selection Sort',
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: 'No',
    inPlace: 'Yes',
    description: 'Sorts by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.',
    code: selectionSortCode
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: 'Yes',
    inPlace: 'Yes',
    description: 'Builds the final sorted array one item at a time, inserting each element into its correct position.',
    code: insertionSortCode
  },
  'merge-sort': {
    name: 'Merge Sort',
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stable: 'Yes',
    inPlace: 'No',
    description: 'Divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.',
    code: mergeSortCode
  },
  'quick-sort': {
    name: 'Quick Sort',
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    stable: 'No',
    inPlace: 'Yes',
    description: 'Efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around it.',
    code: quickSortCode
  },
  'linear-search': {
    name: 'Linear Search',
    category: 'searching',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Sequential search that checks every element in the list until the target is found or the list ends.',
    code: linearSearchCode
  },
  'binary-search': {
    name: 'Binary Search',
    category: 'searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Efficient search algorithm for sorted arrays that repeatedly divides the search interval in half.',
    code: binarySearchCode
  },
  'bfs': {
    name: 'Breadth-First Search',
    category: 'graph',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level.',
    code: bfsCode
  },
  'dfs': {
    name: 'Depth-First Search',
    category: 'graph',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    code: dfsCode
  }
};

export const getAlgorithmsByCategory = (category: string) => {
  return Object.entries(algorithms)
    .filter(([_, algorithm]) => algorithm.category === category)
    .map(([key, algorithm]) => ({ key, ...algorithm }));
};

export const getAllAlgorithms = () => {
  return Object.entries(algorithms).map(([key, algorithm]) => ({ key, ...algorithm }));
};
