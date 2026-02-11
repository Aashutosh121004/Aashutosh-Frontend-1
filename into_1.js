let array = ["HTML", "CSS", "JS", "React JS"];
let array2 = [1,2,3,4,5,6,7,8,9,10];
console.log(array) // used to print in console
console.log(array2)
console.log(array[2]); // Accessing third element- JS

let array3= ["HTML", "CSS", "JS", "React JS",[1,2]];
console.log(array3)
console.log(array3[4][0])

//pushing new element to the end of the array
array.push("Angular");
console.log(array)

//pushing new element to the beginning of the array
array.unshift("Python");
console.log(array)

//removing last element from the array
array.pop();
console.log(array)// removing angular

//removing first element from the array
array.shift();
console.log(array)// removing python

// using splice method for inserting, updating, and deleting elements
array.splice(2,1)
console.log(array)// deleting element at index 2

array.splice(2,0,"Node JS")// inserting element at index 2
console.log(array)

array.splice(3,1,"nextjs")//updating element at index 3
console.log(array)

//concatenating two arrays
let newArray = array.concat(array2);
console.log(newArray)

let newarray1 = array2.concat(array, array3);
console.log(newarray1)
