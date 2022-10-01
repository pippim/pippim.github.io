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

**KEY FEATURES:**

- You can have an unlimited number of projects.
- Each project can have an unlimited number of Tasks.
- Optional Alarms, Desktop Notifications and Prompts when task ends.
- All tasks can be repeated in what is called a set.
- Prompts to begin each task and each (if any) set repetitions.
- Alarm sounds and message is displayed when task timer ends.
- Upload custom sound files or choose from stock alarm sound files.
- Download Tim-ta Configuration for backup or to send to other devices.
- Upload Tim-ta Configuration from other devices or from friends.
- Launch timers in new window (under development).
- Progress bars for each task.

---

<!-- TABLE OF CONTENTS -->

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Upload Custom Sound Files

<!-- From: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/  -->

<span id="customSelect"><font size='+2'>Selected Sounds in Memory</font></span>

<div id="drop-area">
    <form class="my-form">
        <p>Upload Tim-ta JSON files with the file dialog or by dragging and dropping files onto the dashed region</p>
        <input type="file" id="fileElem" multiple accept="audio/*" onchange="handleFiles(this.files)">
        <label class="page-header-button" for="fileElem">Select some files</label>
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

<span id="customSounds">Below are custom sound files that 
have been uploaded. If no custom sounds have been uploaded,
then you will only see a solid line.</span>


<div id="uploadedSounds"></div>

**NOTE:** 
> The Firefox Web Browser limits localStorage to
> 5MB. This doesn't allow for many custom sound files. 
> The other web browsers have a larger quota. To increase quota
> in Firefox, follow these steps:
>   
> Enter "about:config" in the address bar -> search for 
> "dom.storage.default_quota" -> edit value and enter larger 
> value (e.g. 25120) (default is 5120).


**WARNING:**
> Firefox doesn't support `.wav` files very well. It is recommended
> you convert them to `.mp3` or similar format before uploading.
>  
> `ffmpeg -i track01.wav -acodec mp3 track01.mp3`
>   
> Or use an free online conversion service.  

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Stock Sound Files

The following sound files are always available direct from
the {{ site.title }} Website.


<!-- WARNING: Do not delete these <audio> tags, simply hide them if you don't
want them visible to user. This is because the ID is referenced by sound.js -->

These are Tim-ta stock sound files you can use when a timer task ends:
<br>
<div id="stock-sound-files-area">
    <ul><b>
    <li>Alarm_01.mp3 &emsp;<audio controls="true" id="Alarm_01.mp3"></audio>
    <br><br>
    <li>Alarm_02.mp3 &emsp;<audio controls="true" id="Alarm_02.mp3"></audio>
    <br><br>
    <li>Alarm_03.mp3 &emsp;<audio controls="true" id="Alarm_03.mp3"></audio>
    <!-- June 12/22: Non-display filenames no longer distributed (in localStorage) -->
    <audio id="Alarm_01.wav"></audio>
    <audio id="Alarm_05.mp3"></audio>
    <audio id="Alarm_12.mp3"></audio>
    </b>
    </ul>
</div>

---

<a id='hdr6'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>
<a id='Download'></a>

# Download Tim-ta Configuration

Download your TIm-ta Configuration from Local Storage to back it up.
You can also send the download to another device or browser.

<button id="download-config-button" class="page-header-button" 
        title="Download Settings, Projects and Tasks"  
        onclick="ttaExportConfig()"
        >Download Tim-ta Configuration to JSON file
</button>

---

<a id='Upload'></a>
# Upload Tim-ta Configuration

Upload TIm-ta Configuration to Local Storage. New Projects
and new Tasks will be added. Existing Projects and Tasks
will be updated.

***Projects and Tasks are never be deleted.***

***Imported Sound filenames are ignored because they may not exist.***

<span id="configSelect"><font size='+2'>Selected Configuration in Memory</font></span>

<div id="config-drop-area">
    <form class="my-form">
        <p>Upload multiple files with the file dialog or by dragging
            and dropping files onto the dashed region</p>
        <input type="file" id="configFileElem" multiple accept="application/json"
            onchange="configHandleFiles(this.files)">
        <label class="page-header-button" for="configFileElem">Select some files</label>
    </form>
    <div id="configGallery"></div>
    <div id="configButtonGroup" >
        <div class="leftFoot">
            <button id="configBtnCancel" class="tta-btn" title="Clear list of files" 
                type="button" onclick="configClickCancel()" >&#x232B;</button>
            Remove files
        </div>
        <div class="rightFoot">
            <button id="configBtnUpload" class="tta-btn" 
                title="Update Projects and Tasks from selected files" 
                type="button" onclick="configClickUpload()" >&#x2b;</button>
            Upload files
        </div>
    </div>
</div>

---

<a id='hdr7'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Tim-ta Under Construction.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
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

## Tim-ta Version 1.1

### September 16, 2022 Update

- Running timers can appear in popup windows that launch when 
large screen (>1007 pixels) is active.
- When you move or resize a popup window it restarts the same 
way the next time that Project is run.
- There are limitations with browsers being able to move to 
far right and far bottom positions.
- Running timer task name and remaining time appears in window title bar.
- "Override" button for task timer to restart/end, 
+/- time remaining, play/pause.
- When switching on Desktop Notifications, immediately check if 
browser permission has been granted.
- A new enhancement has begun to convert version 1.0 of Tim-ta
with saved popup window locations and sizes in version 1.1.

### September 24, 2022 Update

- Tim-ta conversion to version 1.1 is complete.
- Development has begun on a dark theme for the popup window.

## Tim-ta Version 1.0 Development History

### May 8, 2022 Update

- Sound files are saved to local storage. This saves bandwidth when they are played.
- Configuration, Projects, Tasks and Run Timers tables / forms are complete.
- Advanced draggable window alert/prompt technology is complete.
- Upload Alarm Custom Sound Files has begun.

### May 14, 2022 Update

- Upload Custom Sound Files has been completed. Take note how to increase Local Storage quota from 5 MB (Megabytes). 
- Global Pippim Website redesign for mobile screens begins shortly.
- Then media controls for running timers will be moved from separate window to the footer section of Run Project. 
- Then a mechanism for exporting and importing Tim-ta Projects will be started. 

### May 27, 2022 Update

- New design for mobile complete.
- New copy code button implemented.
- Exporting (download) and importing (upload) Tim-ta Projects has begun. 

### May 31, 2022 Update

- Exporting (download) Tim-ta configuration went very quickly (a few hours).
- Importing (upload) Tim-ta Projects and Tasks has taken a few days so far and it is only half done. 

### June 12, 2022 Update

- Importing (upload) Tim-ta Projects and Tasks completed.
- New stock sound files (Alarm_01.mp3, Alarm_02.mp3 and Alarm_03.mp3) uploaded.

### June 25, 2022 Update

- When alarm sounds, image of shaking alarm clock appears. Close window to end alarm sound early.
- New code (HTML & CSS) for system wide buttons. 

---

<a id='hdr8'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

{% include image.html src="/assets/img/tim-ta/alarm-clock.jpg"
   alt="Tim-ta Alarm Clock Image"
   style="float: left; width: 50%; margin: 2rem 1rem 1rem;"
   caption="Tim-ta alarm-clock.jpg"
%}

# Introduction

*Tim-ta* (**Tim**ed-**ta**sks) gives a countdown timer
where each task is always a predetermined amount of time.
For example, when doing the laundry it might be:

15 minutes and 30 seconds for the wash cycle

13 minutes and 15 seconds for the rinse cycle

58 minutes for the dryer

With Tim-ta you arrive at the washer and dryer the exact
second you need to be there. You'll Never miss the rinse
cycle fabric softener to eliminate static cling. You'll
never have wrinkled clothes from being left overnight in
the dryer.

There are other examples where you can use Tim-ta:

- Cooking food
- Working out
- Education class time for different topics
- Sharing computer time between siblings

---

<a id='hdr9'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

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
Δ</span>&emsp; Override currently running Task's time remaining.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x21E7;</span>&emsp; Move a Project or Task up in list.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x21e9;</span>&emsp; Move a Project or Task down in list.

---

<a id='hdr10'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

## Timer Countdown Override Buttons

While a Task Timer is counting down, you can click on the
progress bar and the task timer override box appears. You
can also click the Delta ("Δ" Override) button and the
currently running progress bar is automatically selected.

{% include image.html src="/assets/img/tim-ta/Open task override.gif"
   alt="Open task override.gif"
   style="float: none; width: 718px; height: 464px; margin: 0px 0px 0px 20px;"
%}

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23EE;</span>&emsp; Restart Task timer.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
−</span>&emsp; Rewind Task timer 10 seconds.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23EF;</span>&emsp; If playing, then pause. If paused, then play.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
+</span>&emsp; Fast forward Task timer 10 seconds.

---

<span class='tta-btn' style='font-size:25px; vertical-align:middle;'>
&#x23ED;</span>&emsp; Go to Task timer end.

---

<a id='hdr11'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# Tim-ta Configuration Kept in Local Storage

A single file called `ttaConfig` is used to store
Tim-ta information for Configuration settings,
Projects and Tasks. You should back this file up. 
See <a href="#Download">Download</a> section. The
backup can be used on another device or browser. 
See <a href="#Upload">Upload</a> section.

`ttaConfig` is kept in "***Local Storage***". 
Local Storage is also used to store every stock
alarm sound file and custom sound file. Each
of your devices and browsers will keep it's
own copy of local storage. To transfer data
between two browsers or different devices use
the Upload/Download linked in the previous
paragraph.

To view Local Storage (from Chrome and Firefox browsers):

- Use <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>i</kbd>
to open "***Developer Tools***"
- Select the "***Storage***" tab in Developer Tools
- Scroll down to the "***Local Storage***" section and expand the details

---

<a id="hdr12"></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Running Project Timers in a Popup Window

On large monitors, or on multiple-monitor systems, you can run
Project Task Timers in a popup window. The smaller popup window
can then be mostly covered up by other working windows.

When the smaller popup window sounds an alarm it will move above
the other working windows.

## Browser Permissions

In order to allow popup windows, go to Firefox settings:

{% include image.html src="/assets/img/tim-ta/pippim website allow popups.png"
   alt="Tim-ta Under Construction.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="pippim website allow popups.png"
%}

Notice how popups are allowed for the `pippim.com` website. 
This allows the popup window to gain focus when alarm sounds. 
If you don't set this then popup window still runs but, it
doesn't steal focus when alarm sounds. EG it stays in the 
background behind other windows when the alarm sounds.

<div id="BrowserPopupWindowPermissions"></div>

## Popup Window Geometry Saved Settings

When you close a popup window the last position and size is saved.
The next time you run the timer the popup window appears at the
last saved location.

Each project has it's own popup window location saved. So from two
different browser tabs you can have two popup windows running
simultaneously.

As of September 18, 2022 browsers have limitations on multiple
monitor setups. Namely on some monitors the popup window will
refuse to open at the far right or far bottom. It will be moved
by the browser further left or further up accordingly. The browser
companies are currently working on upgrades for better support
of multiple-monitor setups.




<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
