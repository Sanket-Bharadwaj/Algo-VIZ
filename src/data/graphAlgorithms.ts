
export const bfsCode = {
  python: `from collections import deque

def bfs(graph, start):
    """
    Breadth-First Search Algorithm - Python Implementation
    Time Complexity: O(V + E), Space Complexity: O(V)
    """
    visited = set()
    queue = deque([start])
    result = []
    
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        # Visit all unvisited neighbors
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Example usage with adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("BFS traversal:", bfs(graph, 'A'))`,

  java: `import java.util.*;

public class BFS {
    public static List<String> bfs(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        List<String> result = new ArrayList<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            String vertex = queue.poll();
            result.add(vertex);
            
            // Visit all unvisited neighbors
            for (String neighbor : graph.get(vertex)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D", "E"));
        graph.put("C", Arrays.asList("A", "F"));
        graph.put("D", Arrays.asList("B"));
        graph.put("E", Arrays.asList("B", "F"));
        graph.put("F", Arrays.asList("C", "E"));
        
        System.out.println("BFS traversal: " + bfs(graph, "A"));
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct {
    int items[MAX_VERTICES];
    int front;
    int rear;
} Queue;

void initQueue(Queue* q) {
    q->front = -1;
    q->rear = -1;
}

bool isEmpty(Queue* q) {
    return q->front == -1;
}

void enqueue(Queue* q, int value) {
    if (q->rear == MAX_VERTICES - 1) return;
    
    if (q->front == -1) q->front = 0;
    q->rear++;
    q->items[q->rear] = value;
}

int dequeue(Queue* q) {
    if (isEmpty(q)) return -1;
    
    int item = q->items[q->front];
    q->front++;
    
    if (q->front > q->rear) {
        q->front = q->rear = -1;
    }
    
    return item;
}

void bfs(int graph[][MAX_VERTICES], int vertices, int start) {
    bool visited[MAX_VERTICES] = {false};
    Queue q;
    initQueue(&q);
    
    visited[start] = true;
    enqueue(&q, start);
    
    printf("BFS traversal: ");
    
    while (!isEmpty(&q)) {
        int vertex = dequeue(&q);
        printf("%d ", vertex);
        
        // Visit all unvisited neighbors
        for (int i = 0; i < vertices; i++) {
            if (graph[vertex][i] == 1 && !visited[i]) {
                visited[i] = true;
                enqueue(&q, i);
            }
        }
    }
    printf("\\n");
}

int main() {
    int vertices = 6;
    int graph[MAX_VERTICES][MAX_VERTICES] = {
        {0, 1, 1, 0, 0, 0},
        {1, 0, 0, 1, 1, 0},
        {1, 0, 0, 0, 0, 1},
        {0, 1, 0, 0, 0, 0},
        {0, 1, 0, 0, 0, 1},
        {0, 0, 1, 0, 1, 0}
    };
    
    bfs(graph, vertices, 0);
    
    return 0;
}`,

  javascript: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        // Visit all unvisited neighbors
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// Example usage with adjacency list
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log('BFS traversal:', bfs(graph, 'A'));`,

  pseudocode: `ALGORITHM: Breadth-First Search (BFS)
INPUT: Graph G and starting vertex start
OUTPUT: BFS traversal order

BEGIN
    visited = empty set
    queue = empty queue
    result = empty list
    
    ADD start to visited
    ENQUEUE start to queue
    
    WHILE queue is not empty DO
        vertex = DEQUEUE from queue
        ADD vertex to result
        
        FOR each neighbor of vertex DO
            IF neighbor not in visited THEN
                ADD neighbor to visited
                ENQUEUE neighbor to queue
            END IF
        END FOR
    END WHILE
    
    RETURN result
END

COMPLEXITY ANALYSIS:
- Time Complexity: O(V + E) where V = vertices, E = edges
- Space Complexity: O(V) for visited set and queue
- Applications: Shortest path in unweighted graphs, level-order traversal`
};

export const dfsCode = {
  python: `def dfs_recursive(graph, start, visited=None):
    """
    Depth-First Search (Recursive) - Python Implementation
    Time Complexity: O(V + E), Space Complexity: O(V)
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    # Visit all unvisited neighbors
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
    
    return result

def dfs_iterative(graph, start):
    """
    Depth-First Search (Iterative) - Python Implementation
    """
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            # Add neighbors to stack (reverse order for correct traversal)
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("DFS (Recursive):", dfs_recursive(graph, 'A'))
print("DFS (Iterative):", dfs_iterative(graph, 'A'))`,

  java: `import java.util.*;

public class DFS {
    public static List<String> dfsRecursive(Map<String, List<String>> graph, 
                                          String start, Set<String> visited) {
        if (visited == null) {
            visited = new HashSet<>();
        }
        
        visited.add(start);
        List<String> result = new ArrayList<>();
        result.add(start);
        
        // Visit all unvisited neighbors
        for (String neighbor : graph.get(start)) {
            if (!visited.contains(neighbor)) {
                result.addAll(dfsRecursive(graph, neighbor, visited));
            }
        }
        
        return result;
    }
    
    public static List<String> dfsIterative(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        Stack<String> stack = new Stack<>();
        List<String> result = new ArrayList<>();
        
        stack.push(start);
        
        while (!stack.isEmpty()) {
            String vertex = stack.pop();
            
            if (!visited.contains(vertex)) {
                visited.add(vertex);
                result.add(vertex);
                
                // Add neighbors to stack (reverse order)
                List<String> neighbors = new ArrayList<>(graph.get(vertex));
                Collections.reverse(neighbors);
                for (String neighbor : neighbors) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D", "E"));
        graph.put("C", Arrays.asList("A", "F"));
        graph.put("D", Arrays.asList("B"));
        graph.put("E", Arrays.asList("B", "F"));
        graph.put("F", Arrays.asList("C", "E"));
        
        System.out.println("DFS (Recursive): " + dfsRecursive(graph, "A", null));
        System.out.println("DFS (Iterative): " + dfsIterative(graph, "A"));
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct {
    int items[MAX_VERTICES];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

bool isStackEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, int value) {
    if (s->top == MAX_VERTICES - 1) return;
    s->items[++s->top] = value;
}

int pop(Stack* s) {
    if (isStackEmpty(s)) return -1;
    return s->items[s->top--];
}

void dfsRecursive(int graph[][MAX_VERTICES], int vertices, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("%d ", vertex);
    
    // Visit all unvisited neighbors
    for (int i = 0; i < vertices; i++) {
        if (graph[vertex][i] == 1 && !visited[i]) {
            dfsRecursive(graph, vertices, i, visited);
        }
    }
}

void dfsIterative(int graph[][MAX_VERTICES], int vertices, int start) {
    bool visited[MAX_VERTICES] = {false};
    Stack s;
    initStack(&s);
    
    push(&s, start);
    
    printf("DFS (Iterative): ");
    
    while (!isStackEmpty(&s)) {
        int vertex = pop(&s);
        
        if (!visited[vertex]) {
            visited[vertex] = true;
            printf("%d ", vertex);
            
            // Add neighbors to stack (reverse order)
            for (int i = vertices - 1; i >= 0; i--) {
                if (graph[vertex][i] == 1 && !visited[i]) {
                    push(&s, i);
                }
            }
        }
    }
    printf("\\n");
}

int main() {
    int vertices = 6;
    int graph[MAX_VERTICES][MAX_VERTICES] = {
        {0, 1, 1, 0, 0, 0},
        {1, 0, 0, 1, 1, 0},
        {1, 0, 0, 0, 0, 1},
        {0, 1, 0, 0, 0, 0},
        {0, 1, 0, 0, 0, 1},
        {0, 0, 1, 0, 1, 0}
    };
    
    bool visited[MAX_VERTICES] = {false};
    printf("DFS (Recursive): ");
    dfsRecursive(graph, vertices, 0, visited);
    printf("\\n");
    
    dfsIterative(graph, vertices, 0);
    
    return 0;
}`,

  javascript: `function dfsRecursive(graph, start, visited = new Set()) {
    visited.add(start);
    const result = [start];
    
    // Visit all unvisited neighbors
    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            result.push(...dfsRecursive(graph, neighbor, visited));
        }
    }
    
    return result;
}

function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const vertex = stack.pop();
        
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);
            
            // Add neighbors to stack (reverse order for correct traversal)
            const neighbors = [...graph[vertex]].reverse();
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

// Example usage
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log('DFS (Recursive):', dfsRecursive(graph, 'A'));
console.log('DFS (Iterative):', dfsIterative(graph, 'A'));`,

  pseudocode: `ALGORITHM: Depth-First Search (DFS) - Recursive
INPUT: Graph G and starting vertex start
OUTPUT: DFS traversal order

BEGIN
    visited = empty set
    result = empty list
    
    CALL dfsRecursive(start, visited, result)
    RETURN result
END

PROCEDURE dfsRecursive(vertex, visited, result):
    ADD vertex to visited
    ADD vertex to result
    
    FOR each neighbor of vertex DO
        IF neighbor not in visited THEN
            CALL dfsRecursive(neighbor, visited, result)
        END IF
    END FOR

ALGORITHM: DFS - Iterative
BEGIN
    visited = empty set
    stack = empty stack
    result = empty list
    
    PUSH start to stack
    
    WHILE stack is not empty DO
        vertex = POP from stack
        
        IF vertex not in visited THEN
            ADD vertex to visited
            ADD vertex to result
            
            FOR each neighbor of vertex (in reverse order) DO
                IF neighbor not in visited THEN
                    PUSH neighbor to stack
                END IF
            END FOR
        END IF
    END WHILE
    
    RETURN result
END

COMPLEXITY ANALYSIS:
- Time Complexity: O(V + E)
- Space Complexity: O(V) for recursion stack/explicit stack
- Applications: Topological sorting, cycle detection, pathfinding`
};
