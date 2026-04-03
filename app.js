"use strict";

"use strict";

/*
Author: Alex d.
Purpose: Add task creation functionality
Date last modified: 2026-03-27
*/

const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const assignedToInput = document.getElementById("assignedTo");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const statusInput = document.getElementById("status");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
/*
purpose: save tasks in localStorage
parameters: none
returns: none
*/
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*
purpose: create a task object
parameters: title, assignedTo, dueDate
returns: task object
*/
function createTask(title, assignedTo, dueDate, priority, status) {
  return {
    id: Date.now(),
    title,
    assignedTo,
    dueDate,
    priority,
    status
  };
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

const task = createTask(
  titleInput.value,
  assignedToInput.value,
  dueDateInput.value,
  priorityInput.value,
  statusInput.value
);

  tasks.push(task);
  saveTasks();
  renderTasks();

  console.log(tasks);

  taskForm.reset();
  
});

const taskList = document.getElementById("task-list");

/*
purpose: display tasks on the page
parameters: none
returns: none
*/
function renderTasks() {
  taskList.innerHTML = "";

  for (const task of tasks) {
    const card = document.createElement("div");
    card.className = "task-card";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const assigned = document.createElement("p");
    assigned.textContent = "Assigned To: " + task.assignedTo;

    const due = document.createElement("p");
    due.textContent = "Due Date: " + task.dueDate;

    const priority = document.createElement("p");
    priority.textContent = "Priority: " + task.priority;

    const status = document.createElement("p");
    status.textContent = "Status: " + task.status;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(task.id);

    card.appendChild(title);
    card.appendChild(assigned);
    card.appendChild(due);
    card.appendChild(priority);
    card.appendChild(status);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    taskList.appendChild(card);
  }
}
/*
purpose: delete a task by id
parameters: id
returns: none
*/
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

renderTasks();