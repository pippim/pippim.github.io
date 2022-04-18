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

As of April 14, 2022 these features have been developed:

- Three Sound files are saved to local storage. This saves bandwidth when they are played.

As a four day week-end starts on April 15, 2022, lots
of development should occur!

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

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
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Future Buttons of Tim-ta

Below are proposed buttons for Tim-ta.

---

Plus symbol. Unicode #x2B
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x2B;</span>

---

Edit symbol. Unicode #x270D
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x270D;</span>

---

Trash symbol. Unicode #x1f5d1
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x1f5d1;</span>

---

Run symbol 1. Unicode #127939 (Decimal)
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#127939;</span>

---

Run symbol 2. (Refresh) Could be used to "run" project. Unicode #x1f5d8
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x1f5d8;</span>

---

Run symbol 3. Could be used to "run" project. Unicode #x27f3
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x27f3;</span>

---

Run symbol 4. Traditional "Play" button. Unicode #x25b6
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x25b6;</span>
<br>
Advantage of this symbol is common audio control button. Also eases
transition to future buttons for: Pause, Rewind x seconds,
Fast forward x seconds, Restart and Skip to end.

---

White Up Arrow from Bar symbol. Move task up project. Unicode #x21ea
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x21ea;</span>

---

White Down Arrow from Bar symbol. Move task down project. Unicode #x21ea + flip
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;
transform: scale(1, -1);'>
&#x21ea;</span>

---

Move Up List symbol 2. Unicode #x21A5
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x21A5;</span>

---

Move Down List symbol 2. Unicode #x21A7
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x21A7;</span>

---

OK symbol 1. Unicode #x2713
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x2713;</span>

---

OK symbol 2. Unicode #x2714
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x2714;</span>

---

OK symbol 3.
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
OK</span>

---

Cancel symbol 1. Unicode #x1f5d9
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
&#x1f5d9;</span>

---

Cancel symbol 2.
&emsp;<span class='hdr-btn' style='font-size:35px; vertical-align:middle;'>
Cancel</span>

---

<a id='hdr6'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Tim-ta Projects

Here you can Create, Run, Update and Delete Tim-ta projects.
Generically, these actions are grouped together under the
name **CRUD** (**C**reate **R**un
**U**pdate **D**elete).

A project is a set of tasks (countdown timers). You
can create as many projects as you like. Each project
can have as many tasks (timers) as needed.

<div id="PaintedTable"></div>

<script>
   id = document.getElementById("PaintedTable");
   paintProjectsTable(id);
</script>

---


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a></div>
