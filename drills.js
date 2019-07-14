const LinkedList = require("./linkedlist");

// 1. Understanding merge sort
// Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

// What is the resulting list that will be sorted after 3 recursive calls to mergesort?
//left = mergesort([21, 1, 26, 45, 29, 18, 2, 9])
//left = mergesort([21, 1, 26, 45])
// left = mergesort([21, 1])

// What is the resulting list that will be sorted after 16 recursive calls to mergesort?

// right = mergesort([16, 49, 39, 27, 43, 34, 36, 40])

// What are the first 2 lists to be merged?

//21, 1

// Which two lists would be merged on the 7th merge?

//[1, 21, 26, 45] and [2, 9, 28, 29]

// 2. Understanding quicksort
// 1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order.
//  After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20.
//  Which of the following statements is correct about the partition step? Explain your answer.

//a. The pivot could have been 17, but could not have been 14
//b. The pivot could have been either 14 or 17 <-- true, bc everything to the left of 14 is < 14, and everything to the right of 17 is > 17.
//c. Neither 14 nor 17 could have been the pivot
//d. The pivot could have been 14, but could not have been 17

// 2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
// show the resulting list after the second partitioning according to the quicksort algorithm.

// When using the last item on the list as a pivot
//[ 3, 9, 10, 12, 19, 14, 17, 16, 13, 15 ]

// When using the first item on the list as a pivot
// [14, 13, 10, 3, 9, 12, 15, 16, 19, 17];

// 3. Implementing quicksort

function swap(array, i, j) {
  //swap function swaps values at two indices
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  //   console.log(array);

  //   You partition the array into 2 halves around a pivot value.
  // All of the values which are less than the pivot value go to 1 half of the array,
  //  and all of the values which are greater than the pivot go to the other half of the array.
  // You then recursively sort the 2 halves of the array until the halves are of length 0 or 1.
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
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

function makeArray(nums) {
  const newNums = nums.split(" ").map(num => parseInt(num));
  return newNums;
}

let array = makeArray(
  "89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5"
);

qSort(array);

//4.  Implementing merge sort

function mSort(array) {
  //if array has 0 or 1 elements...it is already sorted, so return it
  if (array.length <= 1) {
    return array;
  }

  //cut array in half and sort recursively calling mergeSort
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
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
  //   console.log("merged:" + array);
  return array;
}

mSort(array);

// 5. Sorting a linked list using merge sort

function main() {
  const ll = new LinkedList();
  ll.insertFirst(4);
  ll.insertFirst(3);
  ll.insertFirst(9);
  ll.insertFirst(1);
  console.log(ll);
}

main();

//TODO: finish q 5

//6. Bucket sort
// Write an O(n) algorithm to sort an array of integers, where you know in advance what the lowest and highest values are.
// You can't use arr.splice(), shift() or unshift() for this exercise.

function bucketSort(arr, lowest, highest) {
  //????? - bucket sort usually means splitting array into buckets, then using another algorithm to sort the buckets before merging them again?
  let firstBucket = [];
  let secondBucket = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < (highest + lowest) / 2) {
      firstBucket.push(arr[i]);
    } else {
      secondBucket.push(arr[i]);
    }
  }

  mSort(firstBucket);
  mSort(secondBucket);
  console.log(firstBucket.concat(secondBucket));
}

bucketSort([32, 1, 82, 26, 24, 99, 3, 2], 1, 99);

//TODO: q 7, q 8
