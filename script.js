"use strict";

// <<----<< Select Elements >>---->>
const $ = document;

const inpEl = $.querySelector("input");
const addBtnEl = $.querySelector("button");
const tasksBoxEl = $.querySelector(".tasks");
const userTaskEl = $.querySelector(".user-task");
const checkBoxEl = $.querySelector(".checkbox");
const checkedEl = $.querySelector("#checked");
const trashBtn = $.querySelector(".trash-icon");
const taskNotFound = $.querySelector(".task-not-found");

// To save the task to local storage
const saveTask = [];

// <<----<< Add task >>---->>
function addTask() {
  const inputValue = inpEl.value;

  // If the input was empty
  if (!inputValue.trim()) {
    inpEl.classList.add("inpErr");
    return;
  }
  inpEl.classList.remove("inpErr");

  // Save task to local storage
  saveTask.push({
    task: inputValue,
    status: "new",
  });

  savaTask();

  creatTaskEl();

  inpEl.value = "";
}

// <<----<< Save task to local storage >>---->>
function savaTask() {
  localStorage.setItem("userTask", JSON.stringify(saveTask));
}

// <<----<< Create a new tag for a new task >>---->>
function creatTaskEl() {
  tasksBoxEl.innerHTML = "";
  
  saveTask.forEach(function (savedTask) {
    const newTaskEl = $.createElement("li");
    console.log(savedTask.task);

    newTaskEl.innerHTML = `
      <p class="task-text">${savedTask.task}</p>
      <div class="buttons">
        <button class="checkbox" onclick="doneTask(event)"></button>
        <button class="trash-icon" onclick="delUserTask(event)"><i class="bi bi-trash3"></i></button>
      </div>
    `;

    newTaskEl.classList.add("user-task");

    tasksBoxEl.prepend(newTaskEl);
  });
}

// <<----<< Expand with a mouse click on the button >>---->>
addBtnEl.addEventListener("click", addTask);

// <<----<< Expand with the Enter key >>---->>
inpEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// <<----<< Done >>---->>
function doneTask(event) {
  const checkBox = event.target;
  checkBox.classList.toggle("checked");

  const userTask = event.target.closest(".user-task");
  userTask.classList.toggle("done");
}

// <<----<< Delete >>---->>
function delUserTask(event) {
  const userTask = event.target.closest(".user-task");
  userTask.remove();
}
