
export const bubbleSortCode = {
  python: `def bubble_sort(arr):
    """
    Bubble Sort Algorithm - Python Implementation
    Time Complexity: O(n²), Space Complexity: O(1)
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n - 1):
        # Flag to optimize - if no swapping occurs, array is sorted
        swapped = False
        
        # Last i elements are already in place
        for j in range(n - i - 1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no two elements were swapped, then the array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers.copy())
print(f"Sorted array: {sorted_numbers}")`,

  java: `public class BubbleSort {
    /**
     * Bubble Sort Algorithm - Java Implementation
     * Time Complexity: O(n²), Space Complexity: O(1)
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            // Flag to optimize - if no swapping occurs, array is sorted
            boolean swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Traverse the array from 0 to n-i-1
                // Swap if the element found is greater than the next element
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no two elements were swapped, then the array is sorted
            if (!swapped) {
                break;
            }
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(numbers);
        
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,

  c: `#include <stdio.h>
#include <stdbool.h>

/**
 * Bubble Sort Algorithm - C Implementation
 * Time Complexity: O(n²), Space Complexity: O(1)
 */
void bubbleSort(int arr[], int n) {
    // Traverse through all array elements
    for (int i = 0; i < n - 1; i++) {
        // Flag to optimize - if no swapping occurs, array is sorted
        bool swapped = false;
        
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no two elements were swapped, then the array is sorted
        if (!swapped) {
            break;
        }
    }
}

// Function to print array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// Example usage
int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Original array: ");
    printArray(numbers, n);
    
    bubbleSort(numbers, n);
    
    printf("Sorted array: ");
    printArray(numbers, n);
    
    return 0;
}`,

  javascript: `/**
 * Bubble Sort Algorithm - JavaScript Implementation
 * Time Complexity: O(n²), Space Complexity: O(1)
 */
function bubbleSort(arr) {
    const n = arr.length;
    
    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        // Flag to optimize - if no swapping occurs, array is sorted
        let swapped = false;
        
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1] using destructuring
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no two elements were swapped, then the array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// Alternative implementation using modern JavaScript
const bubbleSortModern = (arr) => {
    const sortedArray = [...arr]; // Create a copy to avoid mutation
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return sortedArray;
};

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original array:', numbers);

const sortedNumbers = bubbleSort([...numbers]);
console.log('Sorted array:', sortedNumbers);`,

  pseudocode: `ALGORITHM: Bubble Sort
INPUT: Array arr of n elements
OUTPUT: Sorted array arr

BEGIN
    FOR i = 0 TO n-2 DO
        swapped = FALSE
        
        FOR j = 0 TO n-i-2 DO
            IF arr[j] > arr[j+1] THEN
                SWAP arr[j] AND arr[j+1]
                swapped = TRUE
            END IF
        END FOR
        
        IF swapped = FALSE THEN
            BREAK  // Array is already sorted
        END IF
    END FOR
    
    RETURN arr
END

COMPLEXITY ANALYSIS:
- Best Case: O(n) when array is already sorted
- Average Case: O(n²)
- Worst Case: O(n²) when array is reverse sorted
- Space Complexity: O(1) - in-place sorting
- Stability: Stable (maintains relative order of equal elements)

CHARACTERISTICS:
- Simple implementation
- In-place sorting algorithm
- Stable sorting algorithm
- Adaptive (performs better on nearly sorted arrays)
- Online (can sort a list as it receives it)`
};
