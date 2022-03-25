---
title: The Cookie Machine
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

*The Cookie Machine*, commonly abbreviated as **TCM**,
is accessed using a transparent button at the top of
every {{ site.title }} web page.

TCM is new technology that repurposes "Cookies". Cookies
were historically used to track your activity on the
the internet. With TCM, cookies are used to
save, share and quickly import configurations from other
browsers, users and devices.

Development began on February 25, 2022 and should take 
about six months to complete.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Accessing The Cookie Machine (TCM)

There is a transparent button you can click to access 
*The Cookie Machine* (TCM). This button is not available
on Smart Phones because the screen size is too small.

As the `.gif` animation shows the transparent button is
located to the far right of the regular buttons. It is
the same height as the regular buttons and about 5
characters wide.

## Draggable Window

When you open *The Cookie Machine* (TCM for short), a draggable
window appears:

Click and hold the title bar and drag the window anywhere on your screen.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

## TCM Window Buttons

The buttons brighten as you hover over them.

### TCM Window Buttons

<table id="tcm_window_table" class="hrb_table">
   <tr><th>Buttons</th>
       <th>Usage</th>
   </tr>

   <tr><td><button id="tcm_display_home" class="tcm_documentation" type="button" 
   height="50px" 
   title="The Cookie Machine Home Page" ></button></td>
   <td>Displays site wide global Jekyll Front Matter such as; 
   URLs, number of views, number of posts, etc.</td></tr> 
   
   <tr><td><button id="tcm_display_cloud" class="tcm_documentation" type="button" 
   title="Cloud storage - Display website tree" ></button></td> 
   <td>Displays {{ site.title }} website directory tree</td></tr> 
   
   <tr><td><button id="tcm_display_local" class="tcm_documentation" type="button" 
   title="Local storage - Display cookies and cache" ></button></td> 
   <td>Change cookies used for option settings such as;
   Less/More front matter and TCM Button.</td></tr>
   
   <tr><td><button id="tcm_hyperlink_recipe" class="tcm_documentation" type="button" 
   title="Hyperlink Recipe Baker" ></button></td> 
   <td>Used to create hyperlinks in HTML or Markdown format
   See the
   [complete documentation](https://pippim.github.io/hyperlink.html# "Hyperlink Recipe Baker Complete Instructions").
   </td></tr>
   
   <tr><td><button id="tcm_webpage_info" class="tcm_documentation" type="button" 
   title="Webpage Name and Front Matter" ></button></td>
   <td>Display Jekyll Front Matter for current webpage</td></tr>

</table>

<style>
  #tcm_window_table table { table-layout: fixed; width: 100%; }
  #tcm_window_table table tr th:nth-child(1){ width: 10rem; }
  #tcm_window_table td { padding: 0 1rem; }
  #tcm_window_table td+td { width: auto; }
</style>


---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

## On/Off Slider Switch

The *On/Off Slider Switch* control

ID switch1 follows:

<input type="checkbox" id="switch1" class="switch"/>

ID switch2 follows:

<input type="checkbox" id="switch2" class="switch"/>

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
- **Icon image filename** - Choose the Icon which appears on windows and the task bar of running applications.
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
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>


{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
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
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Installing Multi-Timer

You can download the [Source Code](https://github.com/pippim/multi-timer)
from GitHub but that is a complicated process for a single file.

The easiest way is to
[open the raw code](https://raw.githubusercontent.com/pippim/multi-timer/main/src/mt)
on GitHub.

Then use:

- <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text
- <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy all text to clipboard
- Open the terminal with <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>
- Run `gedit mt`
- <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste text from clipboard
- Save the file and exit gedit.
- Flag the file as executable using `chmod a+x mt`

Voila! You have just installed `mt` to your home directory.

Now to run Multi-Timer you need to always specify the program
is located in your home directory. See the next section to move
Multi-Timer to a directory in your path so you do not have to
specify where `mt` is located.


---


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Move Multi-Timer into PATH

In order to call Multi-Timer from any directory with the `mt` command
you will want to move the program into your path.

A good place for all users is `/usr/bin`.

A good place to use Multi-Timer just for yourself
is `~/bin`. Because `~` is shorthand for `/home/<YOUR USER NAME>`,
the `~/bin` directory under your home user name. By default,
you do not have a `~/bin` directory under your home user name. So you
will need to use:

```shell
mkdir ~/bin
```

> NOTE:
>
> After creating the `~/bin` directory you will need to
> close the terminal and reopen it.

To verify the new directory is in your path use:

```shell
echo $PATH
```

The very first directory will be `/home/<YOUR USER NAME>/bin`.

Now move the `mt` program from `~/mt` to `~/bin/mt` using:

``` shell
mv ~/mt ~/bin/mt
```

Now you are all set to call `mt` from any directory!

----


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Optionally Modify Multi-Timer Source Code

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


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# Dependencies

Here are the dependencies you ned to install for `mt`.

``` shell
sudo apt update
sudo apt install yad
sudo apt install libnotify-bin
```

---


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>



# Create a Second Configuration File

Lets say you want a second Multi-Timer Configuration file
for another project.  Enter these commands from the terminal (The `#`
comments are not necessary but will not effect operations):

```shell
cd ~/.config                  # Go to user's configuration directory
cp mt.conf mt_laundry.conf    # Copy Multi-Timer configuration file
rm mt.conf                    # Remove Multi-Timer configuration file
mt                            # Run Multi-Timer as if first time
```

This saves the current configuration as `mt_laundry.conf` and runs
Multi-Timer as if it were the first time.

The copy command (`cp`) and remove command (`rm`) can be combined into
a single move command (`mv`) to rename the configuration file:

```shell
cd ~/.config                  # Go to user's configuration directory
mv mt.conf mt_laundry.conf    # Rename Multi-Timer configuration file
```

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# Increasing Maximum Number of Timers

Lets say you created your configuration with the
*Maximum Number of Timers* for your laundry job set to 3 for:

- Wash
- Rinse
- Dry

Then you decided you wanted to add another timer for folding
your clothes. The conventional method is to simply delete the
configuration file (as described in the previous section) and
create a new configuration.

There is another option though. YOu can actually edit the
configuration file using `gedit` or another editor. For example,
type `gedit ~/.config/mt.conf` and you will see:

0.2.0|Minutes|1|1|/usr/bin/paplay|/usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga|/usr/share/icons/gnome/48x48/status/appointment-soon.png|Each set end|TRUE|FALSE|TRUE|FALSE|FALSE|FALSE|TRUE|TRUE|3|Wash|Rinse|Dry|16|13|58

The pipe character (`|`) separates fields in the configuration file.

Notice the end of the line contains:

    TRUE|3|Wash|Rinse|Dry|16|13|58

The `3` indicates the maximum number of timers. This is followed
by the timer aliases: `Wash`, `Rinse` and `Dry`. Next comes
the timer durations in minutes: `16`, `13` and `58`.

To change to four timers you would change them to:

    TRUE|4|Wash|Rinse|Dry|Fold|16|13|58|10

The `4` indicates the maximum number of timers. This is followed
by the timer aliases: `Wash`, `Rinse`, `Dry` and `Fold`. Next comes
the timer durations in minutes: `16`, `13`, `58` and `10`.

But while you are add it why not add some extra spare fields?

    TRUE|6|Timer 1|Wash|Rinse|Dry|Fold|Timer 6|0|16|13|58|10|0

You've just successfully created timer aliases `Timer 1` and
`Timer 6` with a duration of `0` minutes which means they
will never display and never get executed. If you ever want to
activate them just use the regular Main Configuration Tab in
Multi-Timer program.

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Future Plans

A web version where you can run Multi-Timer on any web browser on any
platform anywhere in the world.

The configuration file is stored on your web browser local storage in
the form of a Cookie.

A function to copy and paste your cookie into an email. Then send it
to yourself and receive it. Then paste the cookie onto another web
browser on your device. Or paste the cookie into a different device.
Or share your e-amil cookie with a friend / colleague and they can
run your Set of Timers.

Perhaps some day {{ site.title }} will have a special page of the
most popular Multi-Timer cookies that people can run.

Gone will be the notion of *Maximum Number of Timers*. You can have
an infinite amount depending on RAM. You can scroll and insert a
new timer anywhere in the set. You can highlight a timer and click
the Trash Bin. After confirmation all timers below simply move up
the list.

It will be easier to let you link the timer alarm to a YouTube
video instead of just a simple audio file.

The future can be revolutionary... or at the vary least evolutionary
because Cookies have existed for a long time, just never something
end-users were allowed to use for their own personal gain.

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
