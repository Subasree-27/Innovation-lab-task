let x = 100;
let name = "Simple Demo";
const pi = 3.14;

console.log(x);
console.log(name);
document.write("X: " + x + "<br>Name: " + name + "<br>PI: " + pi + "<br><br>");

function add(a, b) {
    console.log("Add: " + (a + b));
    document.write("Add: " + (a + b) + "<br>");
}

function subtract(a, b) {
    console.log("Subtract: " + (a - b));
    document.write("Subtract: " + (a - b) + "<br>");
}

function multiply(a, b) {
    console.log("Multiply: " + (a * b));
    document.write("Multiply: " + (a * b) + "<br>");
}

function divide(a, b) {
    if (b === 0) {
        console.log("Divide: Error - by zero");
        document.write("Divide: Error - by zero<br>");
    } else {
        console.log("Divide: " + (a / b));
        document.write("Divide: " + (a / b) + "<br>");
    }
}

add(4, 5);
subtract(10, 3);
multiply(6, 7);
divide(20, 4);
divide(15, 0);

let num1 = parseInt(prompt("Enter first number:"));
let num2 = parseInt(prompt("Enter second number:"));

if (isNaN(num1) || isNaN(num2)) {
    alert("Invalid input!");
    console.log("Invalid input from user.");
} else {
    alert("Add: " + (num1 + num2));
    console.log("User Add: " + (num1 + num2));
    document.write("User Add: " + (num1 + num2) + "<br>");

    alert("Subtract: " + (num1 - num2));
    console.log("User Subtract: " + (num1 - num2));
    document.write("User Subtract: " + (num1 - num2) + "<br>");

    alert("Multiply: " + (num1 * num2));
    console.log("User Multiply: " + (num1 * num2));
    document.write("User Multiply: " + (num1 * num2) + "<br>");

    if (num2 === 0) {
        alert("Divide: Error - by zero");
        console.log("User Divide: Error - by zero.");
        document.write("User Divide: Error - by zero<br>");
    } else {
        alert("Divide: " + (num1 / num2));
        console.log("User Divide: " + (num1 / num2));
        document.write("User Divide: " + (num1 / num2) + "<br>");
    }
}
