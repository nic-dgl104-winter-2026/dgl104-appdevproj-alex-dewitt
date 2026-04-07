[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/R5_Sso5O)
# DGL 104 - Task Management System (TMS)

## Overview

This project is a Smart Task Management System built using HTML, CSS, and JavaScript.

The goal of this project is to create a simple system where users can:
- create tasks
- assign tasks
- track progress
- manage deadlines and priorities

Instead of overcomplicating things, I focused on making a clean, working front-end version that still shows all the main ideas from the assignment.


## Features

### Basic Features
- Add tasks
- Edit tasks
- Delete tasks
- Assign tasks to a user
- Set due dates
- Set priority (Low, Medium, High)
- Set status (To Do, In Progress, Completed)

### Extra Features
- Dashboard showing:
  - total tasks
  - tasks in each status
- Smart priority suggestion (automatic if not selected)
- Tasks saved using localStorage (so they don’t disappear on refresh)


## How It Works

1. User fills out the form
2. A task object gets created in JavaScript
3. The task is added to an array
4. The array is saved in localStorage
5. The task list and dashboard update automatically
6. When the page reloads, tasks are loaded back from localStorage


## Tech Used

- HTML for structure
- CSS for styling
- JavaScript for logic
- localStorage for saving data


## Design Patterns

### Factory Pattern
I used a function (createTask) to create tasks in a consistent way.

### Strategy Pattern
The app decides task priority automatically based on due date using a function (getSmartPriority)

### Observer
Whenever tasks change, the app re-renders:
- task list
- dashboard

So the UI always stays updated.


## Smart Feature

There is a simple “smart” system that suggests priority if the user doesn’t choose one.

- due in 1 day = High
- due in 3 days = Medium
- later = Low

It’s not real AI, but it shows logic-based decision making.

## How to Run

1. Download the project
2. Open the folder
3. Open the index.html


## Why I Built It This Way

I chose to use HTML, CSS, and JavaScript only because:
- that’s what I’ve learned in class
- it’s easier to understand

Instead of adding a backend or database, I used localStorage to keep things simple but still functional.


## What I Would Add Next

If I had more time, I would add:
- login system
- drag and drop tasks
- backend with Node.js
