---
title: Tim-ta (Timed Tasks)
layout: program
---

<!-- javascript for Tim-ta Sounds -->
<script type="text/javascript" src="/assets/js/sound.js" ></script>
<!-- javascript for Tim-ta -->
<script type="text/javascript" src="/assets/js/tim-ta.js" ></script>

<div id="PaintedTable"></div>

<script>
   parentElm = document.getElementById("PaintedTable");
   ttaRunConfiguration(parentElm);
</script>

<div id="sample_laundry_div">
A sample project for doing Laundry appears above when you have
no projects defined. After adding
your own project(s), you can delete the sample project.
</div>

---

<!-- Define hdr1 id. No "ToS" button -->
<a id="hdr1"></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

<div id="alarm-clock-image">
{% include image.html src="/assets/img/tim-ta/alarm-clock.jpg"
   alt="Tim-ta Alarm Clock Image"
   style="float: left; width: 50%; margin: 2rem 1rem 1rem;"
   caption="Move mouse here for alarm simulation"
%}
</div>

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

Here are other examples where you can use Tim-ta:

- Cooking food (bake, flip and bake some more)
- Working out
- Education class time for different topics
- Limiting computer time then taking a break

**KEY FEATURES:**

- Enter new projects, or *Drag and Drop* new projects.
- Use stock alarm sounds, or *Drag and Drop* new custom sound files.
- Share projects with other browsers, devices and users.
- Projects stored in local storage and not a website.
- Unlimited number of projects and project tasks.
- Optional repeat a project's tasks multiple times in what is called a set.
- Prompts to begin each task and each set (when more than 1).
- Alarm sounds and messages are displayed when task timer ends.
- Backup Tim-ta projects and tasks (Configuration) for sharing.
- Upload Tim-ta Configuration from other browsers, devices or users.
- Run project timers in a separate, smaller, pop-up window.
- Progress bars for each task and project total time.
- Pause running task timer or increase / decrease running time.

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
        <p>Upload sound files with the file dialog ("Select some files") or by dragging and dropping files onto the dashed region</p>
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

<div id="stock-sound-files-area"><ul>
    <br>
    <li><b>Alarm_01.mp3</b>&emsp;<audio controls="true" id="Alarm_01.mp3"></audio>
    </li><br>
    <li><b>Alarm_02.mp3</b>&emsp;<audio controls="true" id="Alarm_02.mp3"></audio>
    </li><br>
    <li><b>Alarm_03.mp3</b>&emsp;<audio controls="true" id="Alarm_03.mp3"></audio>
    </li>
    <!-- June 12/22: Non-display filenames no longer distributed (in localStorage) -->
    <audio id="Alarm_01.mp3"></audio>
    <audio id="Alarm_05.mp3"></audio>
    <audio id="Alarm_12.mp3"></audio>
</ul></div>

---

<a id='hdr6'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>
<a id='Download'></a>

# Download Tim-ta Configuration

Download your TIm-ta Configuration from your browser's Local Storage.
You can send the download to another device or browser. You can attach
the file to an email message to yourself to serve as a backup.

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
        <p>Upload Tim-ta JSON files with the file dialog ("Select some files")
            or by dragging and dropping files onto the dashed region</p>
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
<a id='hdr8'></a>
<a id='hdr9'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

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
{:.no_toc}

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

A single file called `ttaConfig` stores
Configuration settings,
Projects and Tasks. You should backup this file! 
See the <a href="#Download">Download</a> section
to create a backup. The
backup can be used on another device or browser.
For example you can create projects in FireFox,
make a backup and restore it in Chrome Browser.
See the <a href="#Upload">Upload</a> section to
restore a backup or add new projects another
person sent you.

`ttaConfig` is kept in "***Local Storage***". 
Local Storage is also used to store stock
alarm sound file and custom sound files. Each
of your devices and browsers will keep it's
own copy of local storage. To transfer data
between two browsers or different devices use
the Upload/Download discussed in the previous
paragraph.

One advantage of Local Storage is your ISP can't
see your projects. Websites, including this 
{{ site.title }} website, can't see your projects,
and any internet traffic hackers can't see your
projects. Although the **Tim-ta** application is
"in the clouds", your project data is not stored
"in the clouds" and never transmitted.

Another advantage of Local Storage is it's many
times faster than the internet because it simply
sits on your device and isn't transmitted over
external wires into your building.

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
{:.no_toc}

In order to allow popup windows, go to Firefox settings:

{% include image.html src="/assets/img/tim-ta/pippim website allow popups.png"
   alt="Pippim website allow popups.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Pippim website allow popups.png"
%}

Notice how popups are allowed for the `pippim.com` website. 
This allows the popup window to gain focus when alarm sounds. 
If you don't set this then popup window still runs but, it
doesn't steal focus when alarm sounds. EG it stays in the 
background behind other windows when the alarm sounds.

<div id="BrowserPopupWindowPermissions"></div>

## Popup Window Geometry Saved Settings
{:.no_toc}

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
