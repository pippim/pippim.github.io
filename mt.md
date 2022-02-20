---
title: Multi-Timer - Run Set of Alarms Consecutively
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr2" class="hdr-btn">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/mt/mt progress bars.gif"
   alt="Multi-Timer Progress Bars.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="Multi-Timer Application Indicator and Progress Bars"
%}

Do you have a job with a fixed set of tasks and, each task always takes the same amount of time?

Then ***Multi-Timer*** will help you get the job done with no wasted time!

Multi-Timer is called with `mt` from
the command line or a Desktop Shortcut that calls `mt`. 

The Multi-Timer program (`mt`) can be downloaded from the 
[Pippim Multi-Timer Repository 🔗](https://github.com/pippim/multi-timer/blob/main/src/mt).


> **IMPORTANT NOTE:**
>   
> Version 0.2.0 was released on
> February 19, 2022 and not tested with WSL
> (Windows Subsystem for Linux).

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr1" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr3" class="hdr-btn">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr2" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr4" class="hdr-btn">Skip</a></div>

# Running Multi-Timer

Running Multi-Timer is as easy as typing `mt` at the command line. Or simply
clicking a Desktop Shortcut linked to Multi-Timer.

## One-Time Configuration

{% include image.html src="/assets/img/mt/mt maximum number of timers.png"
   alt="Multi-Timer Maximum Number of Timers.png"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="Multi-Timer Maximum Number of Timers"
%}

The first time you run Multi-Timer you need to specify the
maximum number of timers (alarms) you will be using. The window
on the left greets you the very first time you run Multi-Timer.

Chances are you will never need more than
10 consecutive timers. However, you can can define up to 40
if, your screen size permits that many.

Once the maximum number of timers is set, you cannot change it.
Your only recourse is to remove the configuration file,
(using `rm ~/.config/mt.conf`), and start over again.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr3" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr5" class="hdr-btn">Skip</a></div>

{% include image.html src="/assets/img/mt/mt Main Configuration.png"
   alt="Multi-Timer Main Configuration.png"
   style="float: left; width: 65%; margin: 0px 1rem 0px 0px;"
   caption="Multi-Timer Main Configuration"
%}

## Main Configuration

The *Main Configuration* window, shown on the left,
greets you each time
you start Multi-Timer. From here you can change the
configuration. 

When done click <kbd>OK</kbd> to begin running timers
or, click <kbd>Cancel</kbd> to exit Multi-Timer.

To switch to the Timers
tab, click it at the top right. The Timers tab is
discussed in detail in the next section.

Although there are many options on the Main Configuration tab,
don't be intimidated. The options are pretty straight forward.

It is important to note two options are "greyed out"
and, cannot be changed. Those two options are;
*Multi-Timer Version Number* and *Maximum number of timers*.

As mentioned in the *One-Time Configuration* section above,
the only way to change the Maximum Number of Timers is to
erase the configuration file and start again.

The changeable options on this window are:

- **Timer duration units** - Choose between "Minutes" and "Seconds" as the unit of measure for timers.
- **Number of times to run set (all timers)** - Normally you just want to run a job once in a session. But you can repeat the same job multiple times with this option.
- **Progress Bar update every x seconds** - Number of seconds between updating timer progress bars. The default "`1`" is appropriate in most circumstances.
- **Sound Player filename** - Enter the command to play sounds. The default is `paplay` (PulseAudio) which is suitable for most Linux systems. On some Linux systems PulseAudio isn't installed so use the `aplay` command.
- **Alarm sound filename** - Choose a sound file at least 5 seconds long. About 7 seconds is best.
- **Icon image filename** - Choose the Icon which appears on windows and the task bar of running applicadtions.
- **Lock screen** - Choose whether or not the screen should lock. Generally this should be set to "Never".
- **Ask to begin each timer** - When checked, Multi-Timer prompts to start each timer. Usually, you want this checked.
- **Pop-up message when each timer ends** - When checked, a notification message (pop-up bubble message) is displayed. Usually, you leave this un-checked because an alarm already sounds. 
- **Sound alarm when each timer ends** - When checked, the alarm sound specified above is played. Usually, you want this checked.
- **Ask to begin each set (all timers)** - When checked, Multi-Timer prompts to start each set of timers. Usually, you want this un-checked.
- **Pop-up message when each set ends** - When checked, a notification message (pop-up bubble message) is displayed. Usually, you leave this un-checked. 
- **Sound alarm when each set ends** - When checked, the alarm sound specified above is played. Usually, you want this checked.
- **Interface to Sysmonitor Indicator** - When checked, Multi-Timer records time remaining to the `~/.lock-screen-timer-remaining` file. See interface to Sysmonitor Indicator below. 
- **Auto close progress bar display when all sets end** - When checked, Multi-Timer simply disappears when all timers end. If un-checked, the progress display remains on-screen at 100% until manually closed. 


---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr4" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr6" class="hdr-btn">Skip</a></div>


{% include image.html src="/assets/img/mt/mt Timers Configuration.png"
   alt="Multi-Timer Timers Configuration.png"
   style="float: left; width: 65%; margin: 0px 1rem 1rem 0px;"
   caption="Multi-Timer Timers Configuration"
%}

## Timers Configuration

When you click the *Timers Tab* a window similar to the
one on the left appears.

Initially all the *Aliases* are set to "Timer 1", "Timer 2",
"Timer 3", etc., all the way up to the Maximum Number of 
Timers.

The Alias that you enter is used in the Progress Display.

Initially, all the *Durations* are set to `0`. You can have
as many `0` durations as you like. However, there must be at
least one non-zero duration to make up a valid set of timers.

Any timers with a duration of "`0`" will not be displayed in
the progress bars.

You can key in the Duration number directly. Or, click 
<kbd>+</kbd> to increment by a value of 1 and, click
<kbd>-</kbd> to decrement by a value of 1.

In this example the first Alias is "`Wash`" and the Duration is
set to "`16`". In the Configuration Tab the units of measure
were set to "`Minutes`" so the duration of the "`Wash`" timer
is 16 minutes.

Next is the "`Rinse`" timer at 13 minutes. Finally, the
"`Dry`" timer is set to 58 minutes.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr5" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr7" class="hdr-btn">Skip</a></div>

# Multi-Timer Source Code

The source code (Bash Script) can easily be changed by anyone with
moderate knowledge of the Linux Shell.  You can view the full
source code [here](https://github.com/pippim/multi-timer/blob/main/src/mt),

If you wish to change the source code, here are the likely places you
want to change:

``` bash
# Running under WSL (Windows Subsystem for Linux)?
if grep -qE "(Microsoft|WSL)" /proc/version &> /dev/null ; then
    fWindows10=TRUE
    SoundPlayer=""
    DefaultSound="C:\Windows\media\Ring05.wav"
    TitlePrefix="Windows 10"
else
    fWindows10=FALSE
    SoundPlayer="/usr/bin/paplay"
    DefaultSound="/usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga"
    TitlePrefix="Linux"
fi

DefaultIcon="/usr/share/icons/gnome/48x48/status/appointment-soon.png"
sIconFilename="$DefaultIcon"    # Give default until configuration read in
MAX_TIMERS=10                   # Default when creating configuration
```

> **IMPORTANT NOTE:**
>   
> Version 0.2.0 was released on
> February 19, 2022 and not tested with WSL
> (Windows Subsystem for Linux).

---

# Dependencies

Here are the dependencies you ned to install for `mt`.

``` shell
sudo apt update
sudo apt install yad
sudo apt install libnotify-bin
```

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr2" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr8" class="hdr-btn">Skip</a></div>

# Next section

Here are the

---

<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr7" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr16" class="hdr-btn">Skip</a></div>

# Last section


<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr15" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a></div>
