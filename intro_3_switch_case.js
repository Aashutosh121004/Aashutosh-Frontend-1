// switch case statement
// switch case is used to execute one block of code among many blocks of code based on the condition
// it is similar to if-else statement but more readable and efficient for multiple conditions

let fruit = prompt("Enter a fruit name");
switch (fruit.toLowerCase()) {
    case "apple":
        console.log("You like apple.");
        break;
    case "banana":
        console.log("You like banana.");
        break;
    case "orange":
        console.log("You like orange.");
        break;
    case "grape":
        console.log("You like grape.");
        break;
    default:
        console.log("Fruit are not your favorite.");
}

// have to use break statement to stop the execution of the switch case otherwise it will executue all the statements 
// we can also use the nested case inside case statement for better operations while developing the code
