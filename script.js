/*
  To-Do List with Calendar
  Student Project
  Focus: DOM Manipulation, Event Handling, localStorage
*/

// ---------- DOM ELEMENTS ----------
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");
const calendarList = document.getElementById("calendarList");

// ---------- LOAD DATA ON PAGE LOAD ----------
document.addEventListener("DOMContentLoaded", loadTasks);

// ---------- EVENT LISTENERS ----------
addBtn.addEventListener("click", addTask);

// Keyboard support (Enter key)
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Clear completed tasks
clearBtn.addEventListener("click", clearAllTasks);

// ---------- ADD TASK ----------
function addTask() {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    // Input validation
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Task object
    const task = {
        text: taskText,
        deadline: deadline,
        completed: false
    };

    const tasks = getTasksFromStorage();
    tasks.push(task);

    // Sort tasks by deadline (earliest first)
    tasks.sort(sortByDate);

    saveTasksToStorage(tasks);
    renderTasks(tasks);

    // Clear inputs
    taskInput.value = "";
    deadlineInput.value = "";
}

// ---------- RENDER TASKS ----------
function renderTasks(tasks) {
    // Clear existing UI
    taskList.innerHTML = "";
    calendarList.innerHTML = "";

    tasks.forEach((task, index) => {
        // Create task item
        const li = document.createElement("li");

        // Completed styling
        if (task.completed) {
            li.classList.add("completed");
        }

        // Overdue styling
        if (task.deadline && !task.completed && new Date(task.deadline) < new Date()) {
            li.classList.add("overdue");
        }

        // Task row
        const taskRow = document.createElement("div");
        taskRow.className = "task-row";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // Toggle completed state
        taskText.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasksToStorage(tasks);
            renderTasks(tasks);
        });

        // Delete button (single task)
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasksToStorage(tasks);
            renderTasks(tasks);
        });

        taskRow.appendChild(taskText);
        taskRow.appendChild(deleteBtn);
        li.appendChild(taskRow);

        // Deadline display
        if (task.deadline) {
            const deadlineText = document.createElement("div");
            deadlineText.className = "deadline";
            deadlineText.textContent = "Due: " + task.deadline;
            li.appendChild(deadlineText);

            // Add only pending tasks to calendar
            if (!task.completed) {
                const calItem = document.createElement("li");
                calItem.textContent = `${task.deadline} - ${task.text}`;
                calendarList.appendChild(calItem);
            }
        }

        taskList.appendChild(li);
    });
}

// ---------- CLEAR COMPLETED TASKS ----------
function clearAllTasks() {
    const confirmClear = confirm("Remove all completed tasks?");
    if (!confirmClear) return;

    let tasks = getTasksFromStorage();

    // Keep only pending tasks
    const pendingTasks = tasks.filter(task => !task.completed);

    saveTasksToStorage(pendingTasks);
    renderTasks(pendingTasks);
}

// ---------- SORT TASKS BY DATE ----------
function sortByDate(a, b) {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
}

// ---------- LOAD TASKS ----------
function loadTasks() {
    const tasks = getTasksFromStorage();
    renderTasks(tasks);
}

// ---------- STORAGE HELPERS ----------
function getTasksFromStorage() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
