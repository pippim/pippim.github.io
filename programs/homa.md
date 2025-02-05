---
title: Home Automation
layout: program
canonical_url: 'https://www.pippim.com/programs/homa.html'
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

**HomA** (Home Automation) automatically searches LAN, WiFi and Bluetooth.
It allows you to turn devices on and off from your computer. Devices such as:

- Televisions
- Smart plugs (ideally controlling Bias Lights behind TVs)
- Bluetooth LED light strips

<video src="/assets/img/HomA/HomA Breathing stats.mp4"
data-canonical-src="/assets/img/HomA/HomA Breathing stats.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

***NOTE:*** After clicking play on video, move the mouse off the video
in order to see the color changing button bar in **HomA**.


| Field                  | Description                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dimmest value          | Lowest LED value used is 4. Range is 0 to 255.                                                                                                                                      |
| Brightest value        | Highest LED value used is 30. Range is 0 to 255.                                                                                                                                    |
| Dimmest hold seconds   | Number of seconds to hold dimmest value used is 1.5 seconds.                                                                                                                        |
| Brightest hold seconds | Number of seconds to hold brightest value used is 0.5 seconds.                                                                                                                      |
| Breathe duration       | How much time is spent moving from dimmest to brightest.                                                                                                                            |
| Step duration          | How much time is spent on each color change. Value 0.275.                                                                                                                           |
| Step count             | Calculated by Breathe duration (6.0) / Step duration (0.275)                                                                                                                        |
| Step value             | Calculated by Breathe duration (6.0) / Step count (21)                                                                                                                              |
| Red                    | Current red value of LED. 0 = Off.                                                                                                                                                  |
| Green                  | Current green value of LED. 0 = Off.                                                                                                                                                |
| Blue                   | Current blue value of LED. 0 = Off.                                                                                                                                                 |
| Sunlight Percentage    | Range 0% (nighttime) to 100% (full sunlight). Controlled by<br>GNOME Nightlight or Pippim Eyesome. Percentage boosts the<br>the number of steps so step values are boosted instead. |
| Set LED Color          | Time spent setting LED colors.                                                                                                                                                      |
| Set LED Sleep          | After setting LED color, how much time sleeping before next.                                                                                                                        |
| Regular Refresh        | This refresh allows screen updating and mouse input.                                                                                                                                |
| Fast Refresh           | This refresh appears to "freeze" HomA but keeps CPU use low.                                                                                                                        |
| LED Failures           | How many times Bluetooth lost communication for 1 second.                                                                                                                           |
| MAX_FAIL               | How many sequential LED failures until Breathing quits.                                                                                                                             |

---

The first five fields are parameters you can control:

| Field                  | Internal argument name                                         |
|------------------------|----------------------------------------------------------------|
| Dimmest value          | `low` value is 4. If too low light will be off.                |
| Brightest value        | `high` value is 30. Max is 255 but is way to bright.           |
| Dimmest hold seconds   | `bots` value is 1.5. Abbreviation is for "bottom seconds".     |
| Brightest hold seconds | `tops` value is 0.5. Abbreviation is for "top seconds".        |
| Breathe duration       | `span` value is 6.0. Longer span allows gradual color change.  |
| Step duration          | `step` value is 0.275. Longer step allows regular refresh.     |

<br><br><!-- Next line sucked into table -->

```python
# homa.py - BluetoothLedLightStrip(DeviceCommonSelf) class - breathColors() method:
def breatheColors(self, low=4, high=30, span=6.0, step=0.275, bots=1.5, tops=0.5):
```

## Under Construction
{:.no_toc}

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Under Construction.png"
   style="float: right; width: 50%; margin: .5rem 2rem 1rem 2rem;"
   caption="Under Construction.png"
%}

**HomA** is still under construction. Installation requires
manually downloading files from GitHub and installing any
missing dependencies with `apt get install` in Debian/Ubuntu
or `pip install` on other Operating Systems.


> ***IMPORTANT NOTES:*** 
> 
> - **HomA** was primarily tested with Linux, specifically 
Ubuntu 16.04 LTS ECM/Plus and Python 2.7.12.
> 
> - You *"should"* be able to toggle between Pyhon 2.7.x and 
Python 3.x by changing the *"shebang"* at the top of each `.py`. 
Currently, **HomA** *"should"* run with the default Python version.
Testing on Python 3.x will begin prior to next major **HomA** upgrade.
> 
> - Current plans are to upgrade to Ubuntu 24.04 LTS and Python 3.12 
in year 2025. A "lite" Ubuntu 16.04 version running Unity may be 
created as some sort of virtual machine. It's already been announced 
that Ubuntu 24.04 (via Debian) will not ship with Python 2.7 anymore.


## **HomA** Installation

**HomA** (Home Automation) is written in Python.
The main program is called `homa.py` and can be found in the 
[HomA GitHub Repository ⧉ 🔗](https://github.com/pippim/HomA/blob/main/src/homa.py 
"View HomA Python source code"){:target="_blank"}. 

Copy all the files (including the subdirectories) 
in the GitHub `src` folder to a new directory on your computer. 
For example, `<HOME>/HomA` for Linux, Mac, Chrome OS or 
Windows Subsystem for Linux (WSL). Unless you are running Ubuntu 16.04
LTS under Extended Security Maintenance (ESM), you may have to make
changes to `homa.py` and the programs it calls. 

For Windows, the installation directory would be  `<HOME>\HomA`
As of {{ site.refreshed | date: "%B %e, %Y" }}
**HomA** will not run under Windows without modification.

`homa.py` is called with `m` from the command line or a 
desktop shortcut. It is recommended you start using **HomA**
from the command line to see any error messages that might
appear.

`homa-indicator.py` is a Python script that allows access 
to **HomA** from the taskbar of any monitor.

`homa-indicator.py` and `homa.py` do not need to be added to your path.
You can call them with `/path/to/homa-indicator.py` or `/path/to/homa.py` 
from the command line. If you followed the installation tip 
above, it would be `<HOME>/HomA/homa-indicator.py` for Linux-like machines, 
or `<HOME>\HomA\homa-indicator.py` for Windows. As of August 30, 2023, 
**HomA** will not run under Windows without modification.

---

<!--  TABLE OF CONTENTS  -->
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---
playing favorites from where it left off.

---

## Dropdown Menus

The top-left corner of *HomA's* window contains 
four dropdown menus; ***File***, ***Edit***, ***View*** and ***Tools***. 
Click on the name and the dropdown menu options appear:

### *File* Dropdown Menu
{:.no_toc}

Some options will be disabled out when they are not applicable. For example,
the *Save Playlist* and *Close Playlist* options are disabled (greyed
out) until a Playlist is opened.

- ***Rediscover now*** - Rediscovery happens every minute but you can force
immediate rediscovery with this option.
- ***Minimize*** - Duplicates the `Minimize` button at the bottom of the 
window. The **HomA** window is minimized with this option. 
- ***Suspend*** - Duplicates the `Suspend` button at the bottom of the 
window. All devices are powered off and the computer suspends. 
- ***Exit*** - **HomA** shuts down.

### *Edit* Dropdown Menu
{:.no_toc}

- ***Preferences*** - Settings to control **HomA** operation. 

### *View* Dropdown Menu
{:.no_toc}

- ***Sensors*** - Displays CPU and GPU temperature and fan speeds. The 
network devices view is closed. 
- ***Nnetwork devices*** - Displays Network devices and status. The 
sensors view is closed. 
- ***Bluetooth devices*** - Displays all bluetooth devices (including your
neighbours or people walking by your location). Helpful to identify your
Bluetooth LED Light Strips. Provides option to "kill" abandoned gatttool
jobs and/or jobs taking more than 10% of a CPU single core. 
- ***Discovery timings*** - Display how long it takes to communicate with
devices to tweak Preference time-outs.
- ***Discovery errors*** - Display errors communicating with
devices to tweak Preference time-outs.
- ***Breathing stats*** - While Bluetooth LED lights are "breathing colors",
display statistics to help tweak Preference settings.


### *Tools* Dropdown Menu
{:.no_toc}

- ***Big Number Calculator*** - 
<a href="#big-number-calculator-sample-video">Indispensable calculator</a>
for math equations using **MB** (Megabytes), **GB** (Gigabytes), 
**TB** (Terabytes), etc.
- ***Timer 600 seconds*** - Run a timer and display large digit countdown.
Alarm sounds when timer ends. "600 seconds" changed in Preferences.
- ***Forget sudo password*** - If you had entered your sudo password
to control laptop display or reset Bluetooth you can use this option to
"forget" the password. That said, it is automatically encrypted and
reused on the next boot so you don't have to reenter it.

---

## Right-Click Popup Menus

In the Network Devices view, you can move the mouse over a device
and right click for a context-sensitive popup menu. 

### Sony Bravia Professional Display TV 
{:.no_toc}

When you click on a Sony Bravia Professional Display TV, 

#### Menu Options:
{:.no_toc}

- ***Picture On*** - If you had turned display off, turn it back on.
- ***Picture Off*** -  Turn display off but leave audio active.
- ***Turn On*** - If you had turned TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

### Google Android TV 
{:.no_toc}

When you click on a Google Android TV, 

#### Menu Options:
{:.no_toc}

- ***Turn On*** - If you had turned TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

### Bluetooth LED Light Strip 
{:.no_toc}

When you right-click on a Bluetooth LED Light Strip, 

#### Menu Options:
{:.no_toc}

- ***Set Bluetooth LED color*** - Set color and brightness. Remembers
your last selection.
- ***Nighttime*** - Set nighttime color.
- ***Breathing colors*** - Cycle colors between Red, Red & Green, Green,
Green & Blue, Blue and Blue & Red. Breathe in (make brighter) and Breathe
out (make dimmer) for each color combination.
- ***Reset Bluetooth*** - Use this from time to time if your computer's
bluetooth adapter goes offline.
- ***View Bluetooth Devices*** - Use this to view all Bluetooth devices
in your area. Helpful to find the MAC address of your Bluetooth LED
Light Strip. The MAC address must be entered into Preferences to control
your LED Light Strip.
- ***Turn On*** - Turn on the Bluetooth LED Light Strip.
- ***Turn Off*** - Turn off the Bluetooth LED Light Strip.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

---

## *Music Location Tree* Help Button

**HomA** windows contain "Help" buttons that:

- Open a new web browser window
- Open this web page
- Navigate down to the appropriate section on the web page

### Help Button Sample Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

#### Help Button Sample Video Highlights
{:.no_toc}

- The options for *File*, *Edit* and *View* dropdown menu are shown
- The mouse hovers over button bar at bottom of window 
- Tooltips for buttons appear after a short delay
- Tooltips gradually fade in, remain a short period, then gradually 
fade out
- The *Help* button is clicked and results appear


## Preferences
{:.no_toc}

**HomA** Preferences:

| Dictionary Key   | Description                                                   |
|------------------|---------------------------------------------------------------|
| TITLE            | Name of the Song                                              |
| ARTIST           | Name of band or solo artist                                   |
| ALBUM_ARTIST     | Same as ARTIST except for Compilations then "Various Artists" |
| ALBUM            | Name of the Album                                             |
| COPYRIGHT        | Date the Album (not the song) was released                    |
| DISC             | Disc Number. E.G. single CD is "1/1". 3 CD set could be "1/3" |
| TRACK_NUMBER     | E.G. When 12 tracks, first track "1/12", last track "12/12"   |
| DATE             | Song's first release date in YYYY format. NOT the Album Date! |
| GENRE            | E.G. "Rock", "Soundtrack", "Country", etc.                    |
| CREATION_TIME    | Date and time music file created (encoded)                    |
| COMPOSER         | When not specified, defaults to ARTIST                        |
| COMMENT          | One line comment                                              |
| COMPILATION      | When value is "1", folder is /Compilations/<ALBUM>            |
| GAPLESS_PLAYBACK | "0" = Off, "1" = On. However, **HomA** doesn't support it.  |
| ENCODER          | E.G. "HomA 3.4.3" or "iTunes 11.4.0.18"                     |
| DISCID           | CDDB Free Disc ID                                             |
| MUSICBRAINZ_DISC | MusicBrainz Disc ID                                           |


# Python Modules Dashboard

This dashboard is autogenerated when the website is refreshed.
There are more dashboards in 
[The Cookie Machine ⧉](https://www.pippim.com/programs/tcm.html#cloud-button
"TCM has Dashboards for Storage"){:target="_blank"} 
for global {{ site.title }} Website maintenance.

*Table was updated {{ site.refreshed | date: "%B %e, %Y" }}.*
The table is autogenerated when 
[`refresh.sh` ⧉ 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/refresh.sh
"View refresh.sh source code (Bash Script) on GitHub"){:target="_blank"}
calls 

There are also some Bash scripts:

---

<!-- Foot section doesn't have "skip" button -->
<a id="hdr20"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr19">ToS</a>  <a href="#hdr2">ToC</a></div>
