// ===== Task Manager Module =====

// Global array to store tasks
let taskList = [];

// 1) Function to add a task and call a callback after adding (using arrow function)
const addTask = (task, callback) => {
    let localMessage = `Task "${task}" is being added.`; // local scoped variable
    console.log(localMessage);
    taskList.push(task);
    callback(); // Call the callback function
};

// 2) Callback function to print all current tasks (using function expression)
const printTasks = function () {
    console.log("=== Current Tasks ===");
    taskList.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
};

// 4) Function to add multiple tasks using arbitrary arguments (rest parameter)
const addMultipleTasks = (...tasks) => {
    console.log(`Adding ${tasks.length} tasks...`);
    tasks.forEach(task => taskList.push(task));
    printTasks(); // Show tasks after adding
};

// 5) Illustrate variable scope
let globalMessage = "This is a global message."; // Global scope

function demonstrateScope() {
    let localMessage = "This is a local message."; // Local scope
    console.log("Inside function - localMessage:", localMessage);
    console.log("Inside function - globalMessage:", globalMessage);
}

console.log("Outside function - globalMessage:", globalMessage);
// The following line would cause an error because localMessage is not in global scope
// console.log("Outside function - localMessage:", localMessage);

// ===== Demonstration =====

// Add single tasks using addTask with a callback
addTask("Buy groceries", printTasks);
addTask("Clean the room", printTasks);

// Add multiple tasks at once
addMultipleTasks("Walk the dog", "Do laundry", "Write report");

// Show variable scope in action
demonstrateScope();
