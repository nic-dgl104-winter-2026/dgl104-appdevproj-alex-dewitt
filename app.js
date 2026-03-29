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

const tasks = [];

/*
purpose: create a task object
parameters: title, assignedTo, dueDate
returns: task object
*/
function createTask(title, assignedTo, dueDate) {
  return {
    id: Date.now(),
    title: title,
    assignedTo: assignedTo,
    dueDate: dueDate
  };
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = createTask(
    titleInput.value,
    assignedToInput.value,
    dueDateInput.value
  );

  tasks.push(task);
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
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    taskCard.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
    `;

    taskList.appendChild(taskCard);
  }
}