<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>To-Do List with Storage</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 30px;
    }
    h1 {
      color: #333;
    }
    .task {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
    .task.completed span {
      text-decoration: line-through;
      color: gray;
    }
    button {
      margin-left: 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>To-Do List ✅</h1>

  <form id="taskForm">
    <input type="text" id="taskInput" placeholder="Enter a task" required />
    <button type="submit">Add Task</button>
  </form>

  <div id="taskList"></div>

  <script>
    // -------------------------------
    // 1. Retrieve saved tasks from Local Storage
    // -------------------------------
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // -------------------------------
    // 2. Render tasks on the page
    // -------------------------------
    function renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task" + (task.completed ? " completed" : "");
        
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // Mark complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleTask(index);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(completeBtn);
        taskDiv.appendChild(deleteBtn);
        taskList.appendChild(taskDiv);
      });
    }

    // -------------------------------
    // 3. Add new task
    // -------------------------------
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("taskInput");
      const newTask = {
        text: input.value,
        completed: false
      };
      tasks.push(newTask);

      // Save tasks to Local Storage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Clear input + session storage
      input.value = "";
      sessionStorage.removeItem("tempTask");

      renderTasks();
    });

    // -------------------------------
    // 4. Save typing progress in Session Storage
    // -------------------------------
    document.getElementById("taskInput").addEventListener("input", (e) => {
      sessionStorage.setItem("tempTask", e.target.value);
    });

    // Restore temp text if session not ended
    window.onload = () => {
      const savedInput = sessionStorage.getItem("tempTask");
      if (savedInput) {
        document.getElementById("taskInput").value = savedInput;
      }
      renderTasks();
    };

    // -------------------------------
    // 5. Mark task complete/incomplete
    // -------------------------------
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }

    // -------------------------------
    // 6. Delete task
    // -------------------------------
    function deleteTask(index) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  </script>
</body>
</html>
