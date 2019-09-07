

// let arr = [1,2,3,4,5];
//
// let index = arr.length;//Custom Iterator
//
// let reversedIterator = {
//   next  () {
//     index--;
//     return {
//       done : index < 0,
//       value : arr[index]
//     }
//   }
// };
//
// reversedIterator[Symbol.iterator] = function() {
//   return this;
// };
//
// for (let i of reversedIterator) {
//   console.log(i); //outputs 5,4,3,2,1
// }



console.log(Object.entries([1,2,3]));
