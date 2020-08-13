//add event listener to DOM content loaded
//add to local storage
//append ul list from local storage
//delete item from local storage
//clear items from local storage

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-tasks");
const taskList = document.querySelector(".collection");

loadEventListeners();

function loadEventListeners() {
  //DOM loading event listener
  document.addEventListener('DOMContentLoaded', getTasks)

  form.addEventListener("submit", addTask);

  taskList.addEventListener("click", removeTask);

  clearBtn.addEventListener("click", clearTasks);

  filter.addEventListener("keyup", filterTasks);
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  taskList.childNodes.forEach((task) => {
    const item = task.textContent.toLowerCase();

    if (item.indexOf(text) != -1) {
      task.classList.add("d-flex");
      task.classList.remove("d-none");
    } else {
      task.classList.add("d-none");
      task.classList.remove("d-flex");
    }
  });
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LS
  clearTasksFromLocalStorage();
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Enter New Task");
  } else {
    //create li
    const li = document.createElement("li");
    //add class
    li.className =
      "list-group-item d-flex justify-content-between collection-item";
    //add task text
    li.appendChild(document.createTextNode(taskInput.value));
    //create a tag for delete button
    const link = document.createElement("a");
    //link class
    link.className = "delete-item";
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value)

    //clear taskInput
    taskInput.value = "";
  }
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    //remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }
}

//Store in local storage
function storeTaskInLocalStorage(task) {
let tasks;
if(localStorage.getItem('tasks') === null){
  tasks = []
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.push(task)

localStorage.setItem('tasks', JSON.stringify(tasks))

}

//get tasks from LS
function getTasks(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => { 
    //create li
    const li = document.createElement("li");
    //add class
    li.className =
      "list-group-item d-flex justify-content-between collection-item";
    //add task text
    li.appendChild(document.createTextNode(task));
    //create a tag for delete button
    const link = document.createElement("a");
    //link class
    link.className = "delete-item";
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append to ul
    taskList.appendChild(li);
  })


}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task,index) => {
    if(task === taskItem.textContent){
      tasks.splice(index,1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

}

//Clear Tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear()
}
