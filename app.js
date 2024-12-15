//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".add-item__button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");
  listItem.className = "task";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  const label = document.createElement("label");
  label.className = "task__label";
  label.innerText = taskString;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task__input";

  const editButton = document.createElement("button");
  editButton.className = "task__edit";
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "task__delete";
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove-btn";
  deleteButtonImg.className = "task__delete-icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = () => {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__label");
  const editButton = listItem.querySelector(".task__edit");
  const isEditMode = listItem.classList.contains("task--edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("task--edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__edit");
  const deleteButton = taskListItem.querySelector(".task__delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

Array.from(incompleteTaskHolder.children).forEach((child) => {
  bindTaskEvents(child, taskCompleted);
});

Array.from(completedTasksHolder.children).forEach((child) => {
  bindTaskEvents(child, taskIncomplete);
});

addButton.addEventListener("click", addTask);
