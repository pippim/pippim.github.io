<!-- Modal from:
https://www.freecodecamp.org/news/learn-crud-operations-in-javascript-by-building-todo-app/
-->

<h2>Tim-ta Project</h2>

<div class="tta">
<div class="app">
  <h4 class="mb-3">Laundry App</h4>

  <div id="addNew" data-bs-toggle="modal" data-bs-target="#form">
    <span>Add New Task</span>
    <span class="fas fa-plus">&#x2B;</span>
  </div>
</div>

<h5 class="text-center my-3">Tasks</h5>

<div id="tasks"></div>

<form
  class="modal fade"
  id="form"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <p>Task Title</p>
        <input type="text" class="form-control" name="" id="textInput" />
        <div id="msg"></div>
        <br />
        <p>Due Date</p>
        <input type="date" class="form-control" name="" id="dateInput" />
        <br />
        <p>Description</p>
        <textarea
          name=""
          class="form-control"
          id="textarea"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" id="add" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</form>
</div>

<!-- Style from: https://www.freecodecamp.org/news/
                 learn-crud-operations-in-javascript-by-building-todo-app/
-->
<style>
.tta {
    font-family: sans-serif;
    margin: 0 50px;
    /* background-color: #e5e5e5; */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    max-height: 90vh;
    max-width: 90vw;
}
.app {
    background-color: #fff;
    width: 80vw;
    height: 80vh;
    border: 5px solid #abcea1;
    border-radius: 8px;
    padding: 15px;
}

#form {
    visibility: hidden;
}
#addNew {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(171, 206, 161, 0.35);
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.fa-plus {
    background-color: #abcea1;
    font-size: 25px;
    padding: 3px;
    border-radius: 3px;
}
#msg {
    color: red;
}
#tasks {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

#tasks div {
    border: 3px solid #abcea1;
    background-color: #e2eede;
    border-radius: 6px;
    padding: 5px;
    display: grid;
    gap: 4px;
}
#tasks div .options {
    justify-self: center;
    display: flex;
    gap: 20px;
}

#tasks div .options i {
    cursor: pointer;
}

</style>

<!-- Script from: https://www.freecodecamp.org/news/
                  learn-crud-operations-in-javascript-by-building-todo-app/
-->
<script>
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    
    (() => {
        add.setAttribute("data-bs-dismiss", "");
    })();
    }
};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    
    localStorage.setItem("data", JSON.stringify(data));
    
    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
    
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
    });
    
    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    
    data.splice(e.parentElement.parentElement.id, 1);
    
    localStorage.setItem("data", JSON.stringify(data));
    
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    
    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();

</script>

<!-- End of /_includes/tim-ta-common-code.js -->