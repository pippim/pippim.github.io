---
title: Tim-ta (Timed Tasks)
layout: program
---

<!-- javascript for Tim-ta Sounds -->
<script type="text/javascript" src="/assets/js/sound.js" ></script>
<!-- javascript for Tim-ta -->
<script type="text/javascript" src="/assets/js/tim-ta.js" ></script>

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>

<div id="PaintedTable"></div>

<script>
   parentElm = document.getElementById("PaintedTable");
   ttaRunConfiguration(parentElm);
</script>

<div id="sample_laundry_div">
A sample project for doing Laundry appears when you have
no projects defined. After adding
your own project(s), you can delete the sample project.
</div>

You can have an unlimited number of projects.
Each project can have an unlimited number of Tasks.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

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

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

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

As of April 28, 2022, these features have been developed:

- Sound files are saved to local storage. This saves bandwidth when they are played.
- Configuration, Projects, Tasks and Run Timers tables / forms are complete.
- Work has begun on advanced window alert/prompt system. It should take 2 weeks to complete.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Test Sound Files

Click the filenames below to hear their sound. The first section
lists stock sound files. The second section lists sound files
you have uploaded

## Stock Sound Files

<style> audio { vertical-align:middle } </style>

<!-- WARNING: Do not delete these <audio> tags, simply hide them -->

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

<!-- <form method="post" action="http://example.com/"> -->
<form>
  <input type="file"><input id="fileDragName"><input id="fileDragSize"><input id="fileDragType"><input id="fileDragData">
  <br><p><font size='+2'></font></p><br>
  <div id="holder" style="width: 100%; height: 200px; border: 10px dashed #ccc"></div>
</form>

<div id="drop-area">
    <form class="my-form">
        <p>Sound Screening in Memory (not saved yet)</p>
        <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
        <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
        <label class="button" for="fileElem">Select some files</label>
    </form>
    <div id="gallery"></div>
    <progress id="progress-bar" max=100 value=0></progress>

</div>

<style>
#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 480px;
  font-family: sans-serif;
  margin: 100px auto;
  padding: 20px;
}

#drop-area.highlight {
  border-color: purple;
}

/*
p {
  margin-top: 0;
}
*/

.my-form {
  margin-bottom: 10px;
}

#gallery {
  margin-top: 10px;
}

#gallery img {
  width: 150px;
  margin-bottom: 10px;
  margin-right: 10px;
  vertical-align: middle;
}

.button {
  display: inline-block;
  padding: 10px;
  background: #ccc;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button:hover {
  background: #ddd;
}

#fileElem {
  display: none;
}
</style>

<script>
let dropArea = document.getElementById('drop-area')
  dropArea.addEventListener('dragenter', handlerFunction, false)
  dropArea.addEventListener('dragleave', handlerFunction, false)
  dropArea.addEventListener('dragover', handlerFunction, false)
  dropArea.addEventListener('drop', handlerFunction, false)

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  ([...files]).forEach(uploadFile)
}

function uploadFile(file) {
  let url = 'YOUR URL HERE'
  let formData = new FormData()

  formData.append('file', file)

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(() => { /* Done. Inform the user */ })
  .catch(() => { /* Error. Inform the user */ })
}

function uploadFile(file) {
  var url = 'YOUR URL HERE'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file)
  xhr.send(formData)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

function handleFiles(files) {
    files = [...files]
    files.forEach(uploadFile)
    files.forEach(previewFile)
}

let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numfiles) {
  progressBar.value = 0
  filesDone = 0
  filesToDo = numfiles
}

function progressDone() {
  filesDone++
  progressBar.value = filesDone / filesToDo * 100
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length) // <- Add this line
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function uploadFile(file) {
  let url = 'YOUR URL HERE'
  let formData = new FormData()

  formData.append('file', file)

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(progressDone) // <- Add `progressDone` call here
  .catch(() => { /* Error. Inform the user */ })
}

let uploadProgress = []

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}

function uploadFile(file, i) { // <- Add `i` parameter
  var url = 'YOUR URL HERE'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file)
  xhr.send(formData)
}

</script>



---

<a id='hdr5'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Future Buttons of Tim-ta

Below are proposed buttons for Tim-ta. Some are already in use. 

An option may provided in future for user to pick which button is more
suitable for device/web browser in use.

---

## Media Player Buttons

From: https://stackoverflow.com/a/27053825/6929343

- 23E9 ⏩︎ fast forward
- 23EA ⏪︎ rewind, fast backwards
- 23EB ⏫︎ fast increase
- 23EC ⏬︎ fast decrease
- 23ED ⏭︎ skip to end, next
- 23EE ⏮︎ skip to start, previous
- 23EF ⏯︎ play/pause toggle
- 23F1 ⏱︎ stopwatch
- 23F2 ⏲︎ timer clock
- 23F3 ⏳︎ hourglass
- 23F4 ⏴︎ reverse, back
- 23F5 ⏵︎ forward, next, play
- 23F6 ⏶︎ increase
- 23F7 ⏷︎ decrease
- 23F8 ⏸︎ pause
- 23F9 ⏹︎ stop
- 23FA ⏺︎ record 

---

Listen symbol 1. Unicode #x1F50A
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x1F50A;</span>

---

Listen symbol 2. Unicode #9835 (Decimal)
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#9835;</span>

---

Settings symbol. Unicode #x2699
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x2699;</span>

---

Plus symbol. Unicode #x2B
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x2B;</span>

---

Back symbol. Unicode #x232B
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x232B;</span>

---

Hamburger symbol. Unicode #x2630
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x2630;</span>

---

Edit symbol. Unicode #x270D
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x270D;</span>

---

Trash symbol. Unicode #x1f5d1
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x1f5d1;</span>

---

Run symbol 1. Unicode #127939 (Decimal)
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#127939;</span>

---

Run symbol 2. (Refresh) Could be used to "run" project. Unicode #x1f5d8
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x1f5d8;</span>

---

Run symbol 3. Could be used to "run" project. Unicode #x27f3
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x27f3;</span>

---

Run symbol 4. Traditional "Play" button. Unicode #x25b6
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x25b6;</span>
<br>
Advantage of this symbol is common audio control button. Also eases
transition to future buttons for: Pause, Rewind x seconds,
Fast forward x seconds, Restart and Skip to end.

---

Stop symbol 4. Unicode #x23F9
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x23F9;</span>
 
---

White Up Arrow from Bar symbol. Move task up project. Unicode #x21ea
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x21ea;</span>

---

White Down Arrow from Bar symbol. Move task down project. Unicode #x21ea + flip
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;
transform: scale(1, -1);'>
&#x21ea;</span>

---

White Up Arrow. Move task up project. Unicode #x21E7
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x21E7;</span>

---

White Down Arrow. Move task down project. Unicode #x21e9
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x21e9;</span>

---

Move Up List symbol 2. Unicode #x21A5
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x21A5;</span>

---

Move Down List symbol 2. Unicode #x21A7
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x21A7;</span>

---

OK symbol 1. Unicode #x2713
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x2713;</span>

---

OK symbol 2. Unicode #x2714
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x2714;</span>

---

OK symbol 3.
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
OK</span>

---

Cancel symbol 1. Unicode #x1f5d9
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
&#x1f5d9;</span>

---

Cancel symbol 2.
&emsp;<span class='hdr-btn' style='font-size:25px; vertical-align:middle;'>
Cancel</span>

---

<a id='hdr6'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# localStorage Object

``` javascript
// Configuration & Container for all Tim-ta Projects
// Default below for creation, overwritten when retrieved from localStorage
// The order arrProjects names appear is order they are displayed
var tta_store = {
    arrProjects: [],
    objProjects: {},
    task_prompt: "true",
    task_end_alarm: "true",
    task_end_filename: "Alarm_03.mp3",
    task_end_notification: "false",
    run_set_times: 1,
    set_prompt: "false",
    set_end_alarm: "false",
    set_end_filename: "Alarm_05.mp3",
    set_end_notification: "false",
    all_sets_prompt: "false",
    all_sets_end_alarm: "false",
    all_sets_end_filename: "Alarm_12.mp3",
    all_sets_end_notification: "false",
    progress_bar_update_seconds: 1,
    confirm_delete_phrase: "y"
}

// SINGLE Tim-ta Project
// When value is "default" it is inherited from Configuration
// The order arrTasks names appear is order they are displayed
var tta_project = {
    project_name: null,
    arrTasks: [],
    objTasks: {},
    task_prompt: "default",
    task_end_alarm: "default",
    task_end_filename: "default",
    task_end_notification: "default",
    run_set_times: "default",
    set_prompt: "default",
    set_end_alarm: "default",
    set_end_filename: "default",
    set_end_notification: "default",
    all_sets_prompt: "default",
    all_sets_end_alarm: "default",
    all_sets_end_filename: "default",
    all_sets_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

// SINGLE Timer within a Tim-ta Project
// When value is "default" it is inherited from Project
var tta_task = {
    task_name: null,
    hours: null,
    minutes: null,
    seconds: null,
    task_prompt: "default",
    task_end_alarm: "default",
    task_end_filename: "default",
    task_end_notification: "default",
    progress_bar_update_seconds: "default",
    confirm_delete_phrase: "default"
}

var data_dictionary = {
    project_name: "Project Name|text|non-blank",
    task_name: "Task Name|text|non-blank",
    hours: "Hours|number|0|1000",
    minutes: "Minutes|number|0|1000",
    seconds: "Seconds|number|0|1000",
    task_prompt: "Prompt to begin Task?|switch",
    task_end_alarm: "Play sound when Task ends?|switch",
    task_end_filename: "Task ending sound filename|select|sound_filenames",
    task_end_notification: "Desktop notification when Task ends?|switch",
    run_set_times: "Number of times to run Set|number|1|1000",
    set_prompt: "Prompt to begin Set?|switch",
    set_end_alarm: "Play sound when Set ends?|switch",
    set_end_filename: "Set ending sound filename|select|sound_filenames",
    set_end_notification: "Desktop notification when Set ends?|switch",
    all_sets_prompt: "Prompt to begin All Sets?|switch",
    all_sets_end_alarm: "Play sound when All Sets end?|switch",
    all_sets_end_filename: "All Sets ending sound filename|select|sound_filenames",
    all_sets_end_notification: "Desktop notification when All Sets end?|switch",
    progress_bar_update_seconds: "Seconds between countdown updates|number|1|1000",
    fail_test_1: "Hello World",
    fail_test_2: "Good-bye Cruel World...|text|lower|upper|No such place!",
    confirm_delete_phrase: "Text to confirm delete action|text"
}

var dd_field = {
    name: "",
    label: "",
    type: "",
    lower: "",
    upper: ""
}

function get_dd_field (name) {
    /* Extract dd_field from data_dictionary for easier referencing
       NOTE: lower is generic term, it can be "non-blank" for keys and
             there is no upper. If numeric and lower or upper is blank
             they are converted to 0. If select it contains all the
             possible values.
    */
    const raw = data_dictionary[name];
    if (raw == null) {
        alert("Critical Error. Data dictionary field doesn't exist: " + name);
        console.trace();
        return false;
    }
    const arr = raw.split('|')
    if (arr.length < 2) {
        alert("Critical Error. Data dictionary field has < 3 parts: " + name);
        console.trace();
        return false;
    }
    dd_field.name = name;       // Used programmatically as field name
    dd_field.label = arr[0];    // Used for labels on forms & tables
    dd_field.type = arr[1];     // Used for <table> <input> type="dd_field.type"
    if (arr.length >= 3) { dd_field.lower = arr[2]; }
    else dd_field.lower = "";   // See top of function comments
    if (arr.length >= 4) { dd_field.upper = arr[3]; }
    else dd_field.upper = "";
    if (arr.length > 4 && dd_field.type != "select") {       // See top of function comments
        alert("Critical Error. Non-Select field has > 4 parts: " + name);
        console.trace();
        return false;
    }
    return true;
}

/* UNIT TESTING
    get_dd_field("haha")
    get_dd_field("fail_test_1")
    get_dd_field("fail_test_2")
*/

function updateRadioSounds () {
    /* Called on load and after drag & drop sound files */
    // Convert array of sound filenames to string delineated by |
    var replaceString = "";
    for (var i = 0; i < stockNames.length; i++) {
        if (i != 0) { replaceString += "/"; }  // Add | if not first in array
        replaceString += stockNames[i];
    }

    for (const key of Object.keys(data_dictionary)) {
        if (key.startsWith("fail_test")) { continue; }
        get_dd_field(key);
        if (dd_field.type == "select" && dd_field.lower == "sound_filenames") {
            // Update data dictionary key with list of REAL filenames
            data_dictionary[key] = dd_field.name + "|select|" + replaceString;
         }
    }
}

updateRadioSounds();
```

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a></div>
