// FUNCTION IN JAVASCRIPT

// Functions in JavaScript are reusable blocks of code designed to perform specific tasks. They allow you to organize, reuse, and modularize code. It can take inputs, perform actions, and return outputs.
function greet(name) {   // 'name' is a parameter
  console.log("Hello " + name);
}

greet("Alice");  // "Alice" is the argument
// OUTPUT - Hello Alice



//Default Parameters
// Default parameters are used when no argument is provided during the function call.
// If no value is passed, the function automatically uses the default value.
function greet(name = "Aashutosh") {
  console.log("Hello, " + name);
}

greet();
greet("Aman");



//Return Statement
// The return statement is used to send a result back from a function.
// When return executes, the function stops running at that point.
// The returned value can be stored in a variable or used directly.

function add(a, b) {
  return a + b; // returns the sum
}

let result = add(5, 10);
console.log(result); // OUTPUT - 15



// Type of Functions
// Here are all the main types of functions in JavaScript:


// 1. Named Function
// A function that has its own name when declared. It’s easy to reuse and debug because the name shows up
//  in error messages or stack traces.

function greet(){
    return "Hello, World!";
}

console.log(greet()); // OUTPUT - Hello, World!

// 2. Anonymous Function
// A function that does not have a name. 
// It is usually assigned to a variable or used as a callback. Since it has no name, it cannot be called directly.

const greet = function() {
  return "Hi there!";
};
console.log(greet()); // OUTPUT - Hi there!

// callbacks are very important part in this project making journey , and in that we use this type of function a lot.





//3. Function Expression
// When you assign a function (can be named or anonymous) to a variable. The function can then be used by calling that variable.
const add = function(a, b) {
  return a + b;
};
console.log(add(2, 3));




//4. Arrow Function (ES6)
// A new way to write functions using the => syntax. They are shorter and do not have their own this binding, 
// which makes them useful in some cases.

const square = n => n * n;
console.log(square(4)); // OUTPUT - 16




//5. Immediately Invoked Function Expression (IIFE)
// IIFE functions are executed immediately after their definition. They are often used to create isolated scopes.
(function () {
    console.log("This runs immediately!");
})();





//6. Callback Functions
// A callback function is passed as an argument to another function and is executed after the completion of that function.

function num(n, callback) {
    return callback(n);
}

const double = (n) => n * 2;

console.log(num(5, double));












