// let a="10";
// let b="20";
// let c= Number(a) + Number(b);
// console.log(c); // 30




// let a = 10;
// let b=20;
// let c= String(a);
// let d= String(b);
// console.log(c + d); // 1020

// import { question } from 'readline-sync';
// const userName = question('May I know your name? ');
// console.log(`Welcome, ${userName}!`);
// const userAge = question('May I know your age? ');

// // Convert the input to a number
// const userAgeNumber = Number(userAge);

// // Check if the conversion was successful
// if (!isNaN(userAgeNumber)) {
//     const currentYear = new Date().getFullYear();
//     const birthYear = currentYear - userAgeNumber;
//     console.log(`You were born in the year ${birthYear}.`);
// } else {
//     console.log('Please enter a valid number for age.');
// }






// Take input from user on dialog box , then showing output and functionality.
const userName = prompt("May I know your name?");
// Print a welcome message using template literals
// ${userName} inserts the value inside the string
console.log(`Welcome, ${userName}!`);
// Ask the user for their age
// The input will be stored as a STRING by default
const userAge = prompt('May I know your age?');
// Convert the age (string) into a number
// Number() tries to convert the string into a numeric value
const userAgeNumber = Number(userAge);
// Check if the conversion was successful
// isNaN() means "is Not a Number"
// If the value is NOT NaN → it means conversion worked
if (!isNaN(userAgeNumber)) {

    // Get the current year using JavaScript Date object
    const currentYear = new Date().getFullYear();

    // Calculate birth year by subtracting age from current year
    const birthYear = currentYear - userAgeNumber;

    // Print the birth year using template literal
    console.log(`You were born in the year ${birthYear}.`);

} else {

    // If conversion failed (user entered text instead of number)
    // Show error message
    console.log('Please enter a valid number for age.');
}





// if - elseif - else - conditonal statement
const temp = 25;
if (temp > 30) {
    console.log("It's hot.");
} else if (temp >= 20) {
    console.log("It's warm.");
} else {
    console.log("It's cold.");
}

// output - Its Warm




//switch case statement
const day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of the week.");
        break;
    case "Friday":
        console.log("End of the workweek.");
        break;
    default:
        console.log("It's a regular day.");
}

// output - Start of the week.







// javascript ternary operator - conditional operator
let a=10;
console.log(a===5 ? "a is equal to 5":"a is not equal to 5");
// output - a is not equal to 5
// first thing is the comparison , if a===5 is yes then it will execute the first statement otherwise it will execute the second statement.




// LOOPS


// for loop
// JavaScript for loop is a control flow statement that allows code to be executed repeatedly based on a condition. It consists of three parts: initialization, condition, and increment/decrement.

// Syntax

//              for (statement 1 ; statement 2 ; statement 3){    code here...}
// Statement 1: It is the initialization of the counter. It is executed once before the execution of the code block.
// Statement 2: It defines the testing condition for executing the code block
// Statement 3: It is the increment or decrement of the counter & executed (every time) after the code block has been executed.
// Now let's understand this with the help of an example

for(let x=1; x<=5; x++)
{
    console.log("value of is x:" + x);

}





//MORE LOOPS IN JAVASCRIPT

// JavaScript has different kinds of loops in Java. Some of the loops are:
// Loop	Description
// for loop	A loop that repeats a block of code a specific number of times based on a conditional expression.
// while loop	A loop that repeats a block of code as long as a specified condition is true.
// do-while loop	A loop that executes a block of code at least once, then repeats the block as long as a specified condition is true.
// for...of loop	Iterates over the values of an iterable object (like arrays, strings, maps, sets, etc.)
// for...in loop	Iterates over the enumerable properties of an object (including inherited properties).
// Learn and master JavaScript with Practice Questions. JavaScript Exercises provides many JavaScript Exercise questions to practice and test your JavaScript skills.



// WHILE LOOP
//The while loop executes a block of code as long as a specified condition is true. In JavaScript, this loop evaluates the condition before each iteration and continues running as long as the condition remains true.

let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}

// Using While Loop to find Traverse an Array

let arr= [10, 20, 30, 40, 50];
let i=0;
while(i<arr.length)
{
    console.log(arr[i]);
    i++;
}





// DO WHILE LOOP 
//A Do-While loop is another type of loop in JavaScript that is similar to the while loop, but with one key difference: the do-while loop guarantees that the block of code inside the loop will be executed at least once, regardless of whether the condition is initially true or false .

let count2 = 1;
do {
  console.log(count2);
  count2++;
} while (count2 <= 5);