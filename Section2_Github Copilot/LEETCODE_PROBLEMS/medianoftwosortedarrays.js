/*
Median of Two Sorted Arrays
*/

// Path: MEDIANOFTWOSORTEDARRAYS\medianoftwosortedarrays.js
/*
Median of Two Sorted Arrays

There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays.
*/

function findMedianSortedArrays(nums1, nums2) {
    let arr = nums1.concat(nums2).sort((a,b) => a-b);
    let mid = Math.floor(arr.length/2);
    return arr.length % 2 === 0 ? (arr[mid] + arr[mid-1])/2 : arr[mid];
}

// Test cases
console.log(findMedianSortedArrays([1,3], [2])); // 2
console.log(findMedianSortedArrays([1,2], [3,4])); // 2.5
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7,8,9,10,11,12])); // 6.5
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7,8,9,10,11])); // 6
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7,8,9,10])); // 5.5
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7,8,9])); // 5
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7,8])); // 4.5
console.log(findMedianSortedArrays([1,2,3,4,5,6], [7])); // 4
console.log(findMedianSortedArrays([1,2,3,4,5,6], [])); // 3.5
