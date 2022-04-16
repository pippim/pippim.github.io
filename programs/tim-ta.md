---
title: Tim-ta (Timed Tasks) - Run Set of Alarms Consecutively
layout: program
---

<!-- javascript for Tim-ta Sounds -->
<script type="text/javascript" src="/assets/js/sound.js" ></script>
<!-- javascript for Tim-ta -->
<script type="text/javascript" src="/assets/js/tim-ta.js" ></script>

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/tim-ta/Tim-ta Introduction.png"
   alt="Tim-ta Introduction.png"
   style="float: none; width: 100%; margin: 1rem 0 1rem;"
   caption="Tim-ta webpage header"
%}

*Tim-ta* (**Tim**ed-**ta**sks) gives a countdown timer
where each task is always a predetermined amount of time.
For example, when doing the laundry it might be:

- 16 minutes and 30 seconds for the wash cycle
- 13 minutes and 15 seconds for the rinse cycle
- 58 minutes and 40 seconds for the dryer

With Tim-ta you arrive at the washer and dryer the exact
second you need to be there. You'll Never miss the rinse
cycle fabric softener to eliminate static cling. You'll 
never have wrinkled clothes from being left overnight in
the dryer. It doesn't stop you from mixing red and white
fabrics in hot water to end up with PINK clothes though!

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Tim-ta Under Construction.png"
   style="float: left; width: 75%; margin: 2rem 1rem 1rem 0px;"
   caption="Tim-ta Under Construction.png"
%}
<style>
.img-class {
   background-color: #159957;  /* For Cayman (don't use //) */
   background-image: linear-gradient(120deg, #155799, #159957)
}
</style>
# Work In Progress

Tim-ta development started April 11, 2022. A budget of two months
has been given to this project.

Initially all the features in 
[Multi-Timer](https://www.pippim.com/programs/mt.html)
will be provided. After that, new features will be added. 

> NOTE: Some Multi-timer features such as locking the screen
> cannot be done from a web browser.

As of April 14, 2022 these features have been developed:

- Three Sound files are saved to local storage. This saves bandwidth when they are played.

As a four day week-end starts on April 15, 2022, lots
of development should occur!

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Test Sound Files

Click the filenames below to hear their sound. The first section
lists stock sound files. The second section lists sound files
you have uploaded

## Stock Sound Files

<style> audio { vertical-align:middle } </style>

These are Tim-ta stock sound files you can use when a timer task ends:
<br>
- **Alarm_01.wav** &emsp;&emsp;<audio controls="true" id="Alarm_01.wav"></audio>
<br><br>
- **Alarm_01.mp3** &emsp;&emsp;<audio controls="true" id="Alarm_01.mp3"></audio>
<br><br>
- **Alarm_03.mp3** &emsp;&emsp;<audio controls="true" id="Alarm_03.mp3"></audio>
<br><br>
- **Alarm_05.mp3** &emsp;&emsp;<audio controls="true" id="Alarm_05.mp3"></audio>
<br><br>
- **Alarm_12.mp3** &emsp;&emsp;<audio controls="true" id="Alarm_12.mp3"></audio>

## Uploaded Sound Files

Future placeholder to drag and drop your own sound files here.

---

<a id='hdr5'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Tim-ta Projects

Here you can Create, Run, Update and Delete Tim-ta projects.
Generically, these actions are grouped together under the
name **CRUD** (**C**reate **R**ead
**U**pdate **D**elete).

A project is a set of tasks (countdown timers). You
can create as many projects as you like. Each project
can have as many timers needed.

<!-- Modal from: https://www.freecodecamp.org/news/
                 learn-crud-operations-in-javascript-by-building-todo-app/
-->
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

<!-- Style from: https://www.freecodecamp.org/news/
                 learn-crud-operations-in-javascript-by-building-todo-app/
-->
<style>
body {
  font-family: sans-serif;
  margin: 0 50px;
  background-color: #e5e5e5;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.app {
  background-color: #fff;
  width: 300px;
  height: 500px;
  border: 5px solid #abcea1;
  border-radius: 8px;
  padding: 15px;
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

let acceptData = () => {
  // Other codes are here

  createTasks();
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

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
