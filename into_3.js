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



// Import the readline-sync package
// This package allows us to take input from the user in the terminal (synchronously)
const readlineSync = require('readline-sync');


// Ask the user for their name
// .question() displays the message and waits for user input
const userName = readlineSync.question('May I know your name? ');

// Print a welcome message using template literals
// ${userName} inserts the value inside the string
console.log(`Welcome, ${userName}!`);


// Ask the user for their age
// The input will be stored as a STRING by default
const userAge = readlineSync.question('May I know your age? ');


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
