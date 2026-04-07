"use strict";

/*
Author: Alex d.
Purpose: Smart Task Management System
Features: CRUD, priority, status, dashboard, localStorage
Date last modified: 2026-04-04
*/

const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const assignedToInput = document.getElementById("assignedTo");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const statusInput = document.getElementById("status");
const taskList = document.getElementById("task-list");

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
purpose: suggest a priority based on due date
parameters: date
returns: priority string
*/
function getSmartPriority(date) {
  const today = new Date();
  const due = new Date(date);
  const difference = due - today;
  const daysLeft = difference / (1000 * 60 * 60 * 24);

  if (daysLeft <= 1) {
    return "High";
  } else if (daysLeft <= 3) {
    return "Medium";
  } else {
    return "Low";
  }
}

/*
purpose: create a task object
parameters: title, assignedTo, dueDate, priority, status
returns: task object
*/
function createTask(title, assignedTo, dueDate, priority, status) {
  return {
    id: Date.now(),
    title: title,
    assignedTo: assignedTo,
    dueDate: dueDate,
    priority: priority,
    status: status
  };
}

/*
purpose: show dashboard counts
parameters: none
returns: none
*/
function renderDashboard() {
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(function (task) {
    return task.status === "To Do";
  }).length;
  const progressTasks = tasks.filter(function (task) {
    return task.status === "In Progress";
  }).length;
  const completedTasks = tasks.filter(function (task) {
    return task.status === "Completed";
  }).length;

  document.getElementById("total").textContent = totalTasks;
  document.getElementById("todo").textContent = todoTasks;
  document.getElementById("progress").textContent = progressTasks;
  document.getElementById("completed").textContent = completedTasks;
}

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

    const buttonBox = document.createElement("div");
    buttonBox.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editTask(task.id);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteTask(task.id);
    };

    buttonBox.appendChild(editBtn);
    buttonBox.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(assigned);
    card.appendChild(due);
    card.appendChild(priority);
    card.appendChild(status);
    card.appendChild(buttonBox);

    taskList.appendChild(card);
  }

  renderDashboard();
}

/*
purpose: delete a task by id
parameters: id
returns: none
*/
function deleteTask(id) {
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

/*
purpose: edit a task
parameters: id
returns: none
*/
function editTask(id) {
  const task = tasks.find(function (item) {
    return item.id === id;
  });

  if (task) {
    titleInput.value = task.title;
    assignedToInput.value = task.assignedTo;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    statusInput.value = task.status;

    deleteTask(id);
  }
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let priorityValue = priorityInput.value;

  if (priorityValue === "") {
    priorityValue = getSmartPriority(dueDateInput.value);
  }

  const task = createTask(
    titleInput.value,
    assignedToInput.value,
    dueDateInput.value,
    priorityValue,
    statusInput.value
  );

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskForm.reset();
});

renderTasks();