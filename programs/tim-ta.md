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

# Upload Alarm Sound Files

<!-- From: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/  -->

<span id="customSelect"><font size='+2'>Selected Sounds in Memory</font></span>

<div id="drop-area">
    <form class="my-form">
        <p>Upload multiple files with the file dialog or by dragging and dropping files onto the dashed region</p>
        <input type="file" id="fileElem" multiple accept="audio/*" onchange="handleFiles(this.files)">
        <label class="button" for="fileElem">Select some files</label>
    </form>
    <div id="gallery"></div>
    <div id="buttonGroup" >
        <div class="leftFoot">
            <button id="btnCancel" class="tta-btn" title="Clear list of files" 
                type="button" onclick="clickCancel()" >&#x232B;</button>
            Remove files
        </div>
        <div class="rightFoot">
            <button id="btnUpload" class="tta-btn" title="Upload to local storage" 
                type="button" onclick="clickUpload()" >&#x2b;</button>
            Upload files
        </div>
    </div>
</div>

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Custom Sound Files (Uploaded)

<span id="customSounds">These are all the custom sound files that 
have been uploaded so far.</span>


<div id="PaintedSounds"></div>
<script>
document.addEventListener("DOMContentLoaded", function(event){
   paintCustomSounds() 
})
</script>

> **NOTE:** The Firefox Web Browser limits localStorage to
> 5MB. This doesn't allow for many custom sound files. 
> The other web browsers have a larger quota. To increase quota
> in Firefox, follow these steps:
>   
> Enter "about:config" in the address bar -> search for 
> "dom.storage.default_quota" -> edit value and enter larger 
> value (e.g. 25120) (default is 5120).

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Stock Sound Files

The following sound files are always available direct from
the {{ site.title }} Website.

<style>
audio { vertical-align:middle }
</style>

<!-- WARNING: Do not delete these <audio> tags, simply hide them if you don't
want them visible to user. This is because the ID is referenced by javascript. -->

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

---

<a id='hdr6'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Tim-ta Under Construction.png"
   style="float: none; width: 100%; margin: 2rem 0px 1rem 0px;"
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

As of May 8, 2022, these features have been developed:

- Sound files are saved to local storage. This saves bandwidth when they are played.
- Configuration, Projects, Tasks and Run Timers tables / forms are complete.
- Advanced draggable window alert/prompt technology is complete.
- Upload Alarm Sound Files has begun.

---

<a id='hdr7'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

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

<a id='hdr8'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Tim-ta Buttons

These are the buttons used in Tim-ta.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#9835;</span>&emsp; Listen to sound file.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23F9;</span>&emsp; Stop listening to sound file.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x2699;</span>&emsp; In the footer, edit configuration settings. On
detail line for small screen, open more buttons control box.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x2B;</span>&emsp; Add a new project or a new task.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x232B;</span>&emsp; Go back one screen or cancel operation.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x2630;</span>&emsp; Display list of projects or list of tasks.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x270D;</span>&emsp; Edit a Project or Task.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x1f5d1;</span>&emsp; Delete a Project or Task.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x25b6;</span>&emsp; Run Project's Timed Tasks.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x21E7;</span>&emsp; Move a Project or Task up in list.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x21e9;</span>&emsp; Move a Project or Task down in list.

---

<a id='hdr9'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

## Timer Countdown Override Buttons

While a Task Timer is counting down, you can click on the
progress bar and an action/controls override box appears. 

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23EE;</span>&emsp; skip to Task start. If at start, go to previous Task.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23EA;</span>&emsp; If last button fast forward, fast backwards half
the fast forward amount. Otherwise, fast backwards 10%.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23EF;</span>&emsp; If playing, then pause. If paused, then play.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23E9;</span>&emsp; If last button fast backwards, then fast forward 
half the fast backwards amount. Otherwise, fast forward 10%

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23ED;</span>&emsp; Skip to next Task.

---

A note about alternating fast backward and fast forward button clicks:

- Assume you are at 50% progress
- You click fast forward and now you are at 60% because the default step amount is 10%.
- You click fast backward and now you are 55% (half the last fast forward is 5%).
- You click fast forward and now you are at 57.5% (half the last fast backward is 2.5%).
- You click fast backward and now you are at 56.25% (half the last fast forward is 1.25%).
- You click fast backward and now you are at 46.25% because the default step amount is 10%.
- You click fast backward and now you are at 36.25% because the default step amount is 10%.

---

<a id='hdr11'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# localStorage Object

{% include copyHeader.html %}
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

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a></div>
