//lista oppgavene skal inn i
let tasks = [];

//En oppgave
function Task(whatTask) {
  this.whatTask = whatTask;
}

//legger til nye oppgaver
function addNewTask(whatTask) {
  let newTask = new Task(whatTask);
  tasks.push(newTask);
}

//fjerner oppgaver
function removeTask(index) {
  tasks.splice(index, 1);
}
//finner frem oppgaven
function getTask(index) {
  return tasks[index];
}

//listen der oppgavene vises
let index = 0;

function taskList() {
  let i;
  for (i = index; i < tasks.length; i++) {
    let task = tasks[i];
    let whatTask = task.whatTask;
    let output = document.getElementById("myList");
    output.innerHTML +=
      "<li>" +
      whatTask +
      '<button class="button button2" onclick="Delete(this);">Remove</button></li>';
    console.log(task);
  }
  index = i;
}
function Delete(currentEl) {
  currentEl.parentNode.parentNode.removeChild(currentEl.parentNode);
}

//legger til oppgaver
function addTask() {
  let whatTask = document.getElementById("input").value;
  if (whatTask === "") {
    alert("Add a task!");
  } else {
    addNewTask(whatTask);
    taskList();
    
  }
}

//Krysser av oppgaver
let completeTask = document.querySelector("ul");
completeTask.addEventListener('click', function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    }
  },
  false
);

//lar brukeren benytte "enter"-knappen
let input = document.getElementById("input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("newTask").click();
  }
});



