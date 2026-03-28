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

  console.log(tasks);

  taskForm.reset();
});
