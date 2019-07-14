//----------------bubble sort-----+++++=======
//the w o r s t
//keep iterating through array swapping adjacent values until entire array is sorted
//best case - array is already sorted - 0(n) linear
//worst and average cases - each value needs swapping with another - 0(n^2)

function swap(array, i, j) {
  //swap function swaps values at two indices
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function bubbleSort(array) {
  // looks through adjacent pairs of values in the array. If the values are in the wrong order then it swaps them around and increases the swaps counter
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  //   If the number of swaps was greater than 0 then the list definitely isn't in the correct order yet,
  // so you need to call bubbleSort again to keep sorting. Otherwise, you have a sorted array which you can return.
  if (swaps > 0) {
    return bubbleSort(array);
  }
  return array;
}

// ==========merge sort============
//divide and conquer
// Merge sort has a best, average, and worst-case performance of O(n log(n))

function mergeSort(array) {
  //if array has 0 or 1 elements...it is already sorted, so return it
  if (array.length <= 1) {
    return array;
  }

  //cut array in half and sort recursively calling mergeSort
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  //the two sorted halves are merged together using merge
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  //   To merge the 2 lists you just keep choosing the lowest value from the left or right arrays that hasn't already been added to the output array.
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  //   When 1 of the arrays is empty, you add all of the remaining values from the other array to it.
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

//===========quick sort==================
//divide and conquer
//best and average case 0(n log(n))
//worst case 0(n^2)
//more commonly used than merge sort bc can be performed in place
//more cache efficient

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  console.log(array);
  //   You partition the array into 2 halves around a pivot value.
  // All of the values which are less than the pivot value go to 1 half of the array,
  //  and all of the values which are greater than the pivot go to the other half of the array.
  // You then recursively sort the 2 halves of the array until the halves are of length 0 or 1.
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

//lumotos algorithm - common in-place partitioning algorithm
function partition(array, start, end) {
  // The pivot is the final value in the array.
  const pivot = array[end - 1];

  let j = start;
  //You loop through the array, swapping values as you go to put them on either side of the pivot point.
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  //   And finally, you put the pivot into the correct place in the array.
  swap(array, end - 1, j);
  return j;
}

