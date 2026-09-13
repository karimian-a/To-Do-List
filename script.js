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
// const taskNotFound = $.querySelector(".task-not-found");

// To save the task to local storage
let saveTask = [];

// if(saveTask = []) taskNotFound.classList.add('test')

// <<----<< Show previous tasks >>---->>
window.onload = function () {
  if (JSON.parse(localStorage.getItem("userTask"))) {
    saveTask = JSON.parse(localStorage.getItem("userTask"));
    creatTaskEl();
  }
};

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

  // Reset input
  inpEl.value = "";
}

// <<----<< Save task to local storage >>---->>
function savaTask() {
  localStorage.setItem("userTask", JSON.stringify(saveTask));
}

// <<----<< Create a new tag for a new task >>---->>
function creatTaskEl() {
  tasksBoxEl.innerHTML = `<p class="task-not-found">No tasks registered.</p>`;

  saveTask.forEach(function (savedTask, i) {
    const newTaskEl = $.createElement("li");

    newTaskEl.innerHTML = `
      <p class="task-text">${savedTask.task}</p>
      <div class="buttons">
        <button class="checkbox" onclick="doneTask(${i})"></button>
        <button class="trash-icon" onclick="delUserTask(${i})"><i class="bi bi-trash3"></i></button>
      </div>
    `;

    newTaskEl.classList.add("user-task");

    if (saveTask[i].status === "done") newTaskEl.classList.add("done");

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
function doneTask(i) {
  if (saveTask[i].status === "new") {
    saveTask[i].status = "done";
  } else {
    saveTask[i].status = "new";
  }

  savaTask();
  creatTaskEl();
}

// <<----<< Delete >>---->>
function delUserTask(i) {
  const userTask = event.target.closest(".user-task");
  userTask.remove();

  saveTask.splice(i, 1);
  savaTask();
  creatTaskEl();
}
