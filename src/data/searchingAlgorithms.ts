
export const linearSearchCode = {
  python: `def linear_search(arr, target):
    """
    Linear Search Algorithm - Python Implementation
    Time Complexity: O(n), Space Complexity: O(1)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index if found
    return -1  # Return -1 if not found

# Example usage
numbers = [2, 3, 4, 10, 40]
target = 10
result = linear_search(numbers, target)

if result != -1:
    print(f"Element found at index: {result}")
else:
    print("Element not found")`,

  java: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }
        return -1; // Return -1 if not found
    }
    
    public static void main(String[] args) {
        int[] numbers = {2, 3, 4, 10, 40};
        int target = 10;
        int result = linearSearch(numbers, target);
        
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`,

  c: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

int main() {
    int numbers[] = {2, 3, 4, 10, 40};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int target = 10;
    
    int result = linearSearch(numbers, n, target);
    
    if (result != -1) {
        printf("Element found at index: %d\\n", result);
    } else {
        printf("Element not found\\n");
    }
    
    return 0;
}`,

  javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage
const numbers = [2, 3, 4, 10, 40];
const target = 10;
const result = linearSearch(numbers, target);

if (result !== -1) {
    console.log(\`Element found at index: \${result}\`);
} else {
    console.log('Element not found');
}`,

  pseudocode: `ALGORITHM: Linear Search
INPUT: Array arr of n elements, target value
OUTPUT: Index of target or -1 if not found

BEGIN
    FOR i = 0 TO n-1 DO
        IF arr[i] = target THEN
            RETURN i
        END IF
    END FOR
    
    RETURN -1  // Element not found
END

COMPLEXITY ANALYSIS:
- Time Complexity: O(n)
- Space Complexity: O(1)
- Best Case: O(1) when element is at first position
- Worst Case: O(n) when element is at last position or not present`
};

export const binarySearchCode = {
  python: `def binary_search(arr, target):
    """
    Binary Search Algorithm - Python Implementation
    Time Complexity: O(log n), Space Complexity: O(1)
    Note: Array must be sorted
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        # Check if target is present at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    return -1  # Element not found

# Recursive implementation
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            return binary_search_recursive(arr, target, mid + 1, right)
        else:
            return binary_search_recursive(arr, target, left, mid - 1)
    
    return -1

# Example usage
numbers = [2, 3, 4, 10, 40]  # Must be sorted
target = 10
result = binary_search(numbers, target)

if result != -1:
    print(f"Element found at index: {result}")
else:
    print("Element not found")`,

  java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Check if target is present at mid
            if (arr[mid] == target) {
                return mid;
            }
            
            // If target is greater, ignore left half
            if (arr[mid] < target) {
                left = mid + 1;
            }
            // If target is smaller, ignore right half
            else {
                right = mid - 1;
            }
        }
        
        return -1; // Element not found
    }
    
    // Recursive implementation
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            }
            
            if (arr[mid] < target) {
                return binarySearchRecursive(arr, target, mid + 1, right);
            }
            
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] numbers = {2, 3, 4, 10, 40}; // Must be sorted
        int target = 10;
        int result = binarySearch(numbers, target);
        
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`,

  c: `#include <stdio.h>

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // Check if target is present at mid
        if (arr[mid] == target) {
            return mid;
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}

// Recursive implementation
int binarySearchRecursive(int arr[], int left, int right, int target) {
    if (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            return binarySearchRecursive(arr, mid + 1, right, target);
        }
        
        return binarySearchRecursive(arr, left, mid - 1, target);
    }
    
    return -1;
}

int main() {
    int numbers[] = {2, 3, 4, 10, 40}; // Must be sorted
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int target = 10;
    
    int result = binarySearch(numbers, 0, n - 1, target);
    
    if (result != -1) {
        printf("Element found at index: %d\\n", result);
    } else {
        printf("Element not found\\n");
    }
    
    return 0;
}`,

  javascript: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        // Check if target is present at mid
        if (arr[mid] === target) {
            return mid;
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}

// Recursive implementation
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        }
        
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
    
    return -1;
}

// Example usage
const numbers = [2, 3, 4, 10, 40]; // Must be sorted
const target = 10;
const result = binarySearch(numbers, target);

if (result !== -1) {
    console.log(\`Element found at index: \${result}\`);
} else {
    console.log('Element not found');
}`,

  pseudocode: `ALGORITHM: Binary Search
INPUT: Sorted array arr of n elements, target value
OUTPUT: Index of target or -1 if not found

BEGIN
    left = 0
    right = n - 1
    
    WHILE left <= right DO
        mid = left + (right - left) / 2
        
        IF arr[mid] = target THEN
            RETURN mid
        ELSE IF arr[mid] < target THEN
            left = mid + 1
        ELSE
            right = mid - 1
        END IF
    END WHILE
    
    RETURN -1  // Element not found
END

COMPLEXITY ANALYSIS:
- Time Complexity: O(log n)
- Space Complexity: O(1) iterative, O(log n) recursive
- Prerequisite: Array must be sorted
- Best Case: O(1) when element is at middle`
};
