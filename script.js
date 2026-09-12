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

// <<----<< Add task >>---->>
addBtnEl.addEventListener("click", addTask);

// <<----<< For save task >>---->>
const saveTask = []

// <<----<< Expand with a mouse click on the button >>---->>
function addTask() {
  const inputValue = inpEl.value;

  if (inputValue.trim()) {
    inpEl.classList.remove("inpErr");

    const newTask = $.createElement("li");

    newTask.innerHTML = `
      <p>${inputValue}</p>
      <div class="buttons">
        <button class="checkbox" onclick="doneTask(event)"></button>
        <button class="trash-icon" onclick="delUserTask(event)"><i class="bi bi-trash3"></i></button>
      </div>
    `;

    newTask.classList.add("user-task");

    tasksBoxEl.prepend(newTask);

    inpEl.value = "";
  } else {
    inpEl.classList.add("inpErr");
  }

  saveTask.push ({
    task: inputValue,
    status: "new",
  })

  savaTask()
}

// <<----<< Save task in localStorage >>---->>
function savaTask(){
  localStorage.setItem('userTask', JSON.stringify(saveTask))
}

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
