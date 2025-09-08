// Function in js:
// there are 2 types of functions in js:
// 1. in built functions: these are the functions that are already defined in js, we can use them directly.
// 2. user defined functions: these are the functions that we define ourselves to perform a specific task.

/*
1. Function Declaration: function funcname()
2. Function Expression: let funcname = function() {}
3. Anonymous Function: function()  without name
5. immediately invoked function expression (IIFE): (function() {})() - one time execution -DOM event handling
6. callback function: a function passed as an argument to another function argument - DOM , Adv js , react
7. closure: a function that has access to its own scope, the outer function's scope, and the global scope - DOM event handling, Adv js, react
8. arrow function: a shorter syntax for writing functions introduced in ES6 - Adv js, react



*/


// function greet(n){
//     for (let i = 0; i < n; i++) {
//         console.log("Hello, World! "); 
        
//     }
// }
// let m = prompt("Enter a number to greet: ")
// greet(m)


/*
wap to reverse a string using function
function reverseString(str) {
    return str.split('').reverse().join('')
}


*/



// Hoisting (before es6): to pull thr function declaration / variable declaration 
greet();
function greet(){
    console.log("Hello, World! ");
}


// Function Expression/ Anonymous Function
let great = function(){
    console.log("Hello, manly boy , hows your attitude! ");
}
// now great will work as function
great();
// yaha hoisting nhi hoga


// immediately invoked function expression (IIFE)- TO CALLED ONE TIME
// ek baar hi call hoga
(function(){
    console.log("IIFE function executed");
})();




