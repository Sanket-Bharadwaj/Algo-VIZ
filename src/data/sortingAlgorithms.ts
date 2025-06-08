
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
- Stability: Stable (maintains relative order of equal elements)`
};

export const selectionSortCode = {
  python: `def selection_sort(arr):
    """
    Selection Sort Algorithm - Python Implementation
    Time Complexity: O(n²), Space Complexity: O(1)
    """
    n = len(arr)
    
    # One by one move boundary of unsorted subarray
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
numbers = [64, 25, 12, 22, 11]
sorted_numbers = selection_sort(numbers.copy())
print(f"Sorted array: {sorted_numbers}")`,

  java: `public class SelectionSort {
    /**
     * Selection Sort Algorithm - Java Implementation
     * Time Complexity: O(n²), Space Complexity: O(1)
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in remaining unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        selectionSort(numbers);
        
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,

  c: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, minIdx, temp;
    
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n - 1; i++) {
        // Find the minimum element in remaining unsorted array
        minIdx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int numbers[] = {64, 25, 12, 22, 11};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    selectionSort(numbers, n);
    printf("Sorted array: ");
    printArray(numbers, n);
    
    return 0;
}`,

  javascript: `function selectionSort(arr) {
    const n = arr.length;
    
    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in remaining unsorted array
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    return arr;
}

// Example usage
const numbers = [64, 25, 12, 22, 11];
console.log('Sorted array:', selectionSort([...numbers]));`,

  pseudocode: `ALGORITHM: Selection Sort
INPUT: Array arr of n elements
OUTPUT: Sorted array arr

BEGIN
    FOR i = 0 TO n-2 DO
        minIdx = i
        
        FOR j = i+1 TO n-1 DO
            IF arr[j] < arr[minIdx] THEN
                minIdx = j
            END IF
        END FOR
        
        SWAP arr[i] AND arr[minIdx]
    END FOR
    
    RETURN arr
END

COMPLEXITY ANALYSIS:
- Time Complexity: O(n²) in all cases
- Space Complexity: O(1)
- Stability: Not stable (may change relative order)`
};

export const insertionSortCode = {
  python: `def insertion_sort(arr):
    """
    Insertion Sort Algorithm - Python Implementation
    Time Complexity: O(n²), Space Complexity: O(1)
    """
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr

# Example usage
numbers = [12, 11, 13, 5, 6]
sorted_numbers = insertion_sort(numbers.copy())
print(f"Sorted array: {sorted_numbers}")`,

  java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements that are greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {12, 11, 13, 5, 6};
        insertionSort(numbers);
        
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,

  c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    int i, key, j;
    
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        
        // Move elements that are greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int numbers[] = {12, 11, 13, 5, 6};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    insertionSort(numbers, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    
    return 0;
}`,

  javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        // Move elements that are greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    
    return arr;
}

// Example usage
const numbers = [12, 11, 13, 5, 6];
console.log('Sorted array:', insertionSort([...numbers]));`,

  pseudocode: `ALGORITHM: Insertion Sort
INPUT: Array arr of n elements
OUTPUT: Sorted array arr

BEGIN
    FOR i = 1 TO n-1 DO
        key = arr[i]
        j = i - 1
        
        WHILE j >= 0 AND arr[j] > key DO
            arr[j + 1] = arr[j]
            j = j - 1
        END WHILE
        
        arr[j + 1] = key
    END FOR
    
    RETURN arr
END

COMPLEXITY ANALYSIS:
- Best Case: O(n) when array is already sorted
- Average Case: O(n²)
- Worst Case: O(n²)
- Space Complexity: O(1)
- Stability: Stable`
};

export const mergeSortCode = {
  python: `def merge_sort(arr):
    """
    Merge Sort Algorithm - Python Implementation
    Time Complexity: O(n log n), Space Complexity: O(n)
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0
    
    # Compare elements and merge
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example usage
numbers = [38, 27, 43, 3, 9, 82, 10]
sorted_numbers = merge_sort(numbers)
print(f"Sorted array: {sorted_numbers}")`,

  java: `public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        // Create temp arrays for the two subarrays
        int[] leftArr = new int[mid - left + 1];
        int[] rightArr = new int[right - mid];
        
        // Copy data to temp arrays
        for (int i = 0; i < leftArr.length; i++) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < rightArr.length; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }
        
        // Merge the temp arrays back
        int i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(numbers, 0, numbers.length - 1);
        
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,

  c: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    int* leftArr = (int*)malloc(n1 * sizeof(int));
    int* rightArr = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temp arrays
    for (i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back
    i = 0; j = 0; k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
    
    free(leftArr);
    free(rightArr);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int numbers[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    mergeSort(numbers, 0, n - 1);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    
    return 0;
}`,

  javascript: `function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    // Merge the sorted halves
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    
    // Compare elements and merge
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log('Sorted array:', mergeSort([...numbers]));`,

  pseudocode: `ALGORITHM: Merge Sort
INPUT: Array arr of n elements
OUTPUT: Sorted array arr

BEGIN
    IF length of arr <= 1 THEN
        RETURN arr
    END IF
    
    mid = length of arr / 2
    left = mergeSort(arr[0...mid-1])
    right = mergeSort(arr[mid...n-1])
    
    RETURN merge(left, right)
END

PROCEDURE merge(left, right):
    result = empty array
    i = 0, j = 0
    
    WHILE i < length of left AND j < length of right DO
        IF left[i] <= right[j] THEN
            ADD left[i] to result
            i = i + 1
        ELSE
            ADD right[j] to result
            j = j + 1
        END IF
    END WHILE
    
    ADD remaining elements of left to result
    ADD remaining elements of right to result
    
    RETURN result

COMPLEXITY ANALYSIS:
- Time Complexity: O(n log n) in all cases
- Space Complexity: O(n)
- Stability: Stable`
};

export const quickSortCode = {
  python: `def quick_sort(arr, low=0, high=None):
    """
    Quick Sort Algorithm - Python Implementation
    Time Complexity: O(n log n) average, O(n²) worst, Space Complexity: O(log n)
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """Partition function using last element as pivot"""
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
numbers = [10, 7, 8, 9, 1, 5]
sorted_numbers = quick_sort(numbers.copy())
print(f"Sorted array: {sorted_numbers}")`,

  java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1); // Index of smaller element
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Place pivot in correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] numbers = {10, 7, 8, 9, 1, 5};
        quickSort(numbers, 0, numbers.length - 1);
        
        System.out.print("Sorted array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,

  c: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int numbers[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    quickSort(numbers, 0, n - 1);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    
    return 0;
}`,

  javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Example usage
const numbers = [10, 7, 8, 9, 1, 5];
console.log('Sorted array:', quickSort([...numbers]));`,

  pseudocode: `ALGORITHM: Quick Sort
INPUT: Array arr, indices low and high
OUTPUT: Sorted array arr

BEGIN
    IF low < high THEN
        pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    END IF
END

PROCEDURE partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    FOR j = low TO high-1 DO
        IF arr[j] <= pivot THEN
            i = i + 1
            SWAP arr[i] AND arr[j]
        END IF
    END FOR
    
    SWAP arr[i + 1] AND arr[high]
    RETURN i + 1

COMPLEXITY ANALYSIS:
- Best/Average Case: O(n log n)
- Worst Case: O(n²) when pivot is always smallest/largest
- Space Complexity: O(log n) due to recursion
- Stability: Not stable`
};
