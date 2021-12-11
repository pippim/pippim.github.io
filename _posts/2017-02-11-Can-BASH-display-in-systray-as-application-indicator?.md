---
layout:       post
title:        Can BASH display in systray as application indicator?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/882420
type:         Answer
tags:         unity bash scripts system-tray multi-timer
created_date: 2017-02-11 23:34:13
edit_date:    2020-06-12 14:37:07
votes:        6
favorites:    
views:        1,817
accepted:     Accepted
uploaded:     2021-12-11 11:42:20
toc:          false
navigation:   true
clipboard:    true
---

The best method I've found is **System Monitor Indicator** from this article: [webupd8.org - Ubuntu application indicator that displays bash][1]. It displays text on the Unity system tray / application indicator bar that your bash script "echos".

The above article is targeted to Ubuntu 16.04 with Unity. For more information on Xubuntu, Gnome-Shell + app-indicator extension, and Budgie, go to the Developers website: [fossfreedom / indicator-sysmonitor][2]. Also visit the site for more detailed installation and configuration instructions.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Install and Configure `indicator-sysmonitor`

To install **System Monitor Indicator** you need to first specify the PPA where `indicator-sysmonitor` can be found:

``` 
sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor
sudo apt-get update
sudo apt-get install indicator-sysmonitor

```

Now run the "indicator-sysmonitor" GUI from Dash (<kbd>Alt</kbd>+<kbd>F2</kbd>).

- Click on the systray area that appears with "cpu: 99% mem: 99%"
- Select "Preferences"
- The "General" tab is initially active, click the "Run on startup" box
- Select the "Advanced" tab
- Click <kbd>New</kbd> button to add a new control
- In Sensor field enter `custom`
- In Description field type `Bash Indicator`
_ In Command field type name of your bash script, ie `/mnt/e/bin/indicator-sysmonitor-display`
- Save your new custom indicator
- Highlight the `custom` line and click the <kbd>Add</kbd> button to activate it.
- You can remove the default variables for "CPU" and "Mem" which might not be helpful to you.
- I changed the refresh time interval from `2` seconds to `.3` second. To support "spinning pizza" explained below.
- Now click the <kbd>Save</kbd> button.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# Sysmonitor Indicator in action

This `.gif` shows how it looks when Ubuntu’s Unity System Tray is updated.

[![multi-timer sysmonitor indicator.gif][3]][3]

- At the beginning of the animation our systray output contains "Brightness: 3000".
- Then `multi-timer` (link below) is started and steps through multiple timers.
- A spinning pizza appears along with a count down of remaining time.

**NOTE:** System Monitor Indicator also displays "Brightness: 3000". This is the daytime setting for my Intel Backlight hardware brightness level (link below).


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Sysmonitor Indicator BASH script

Create a script similar to the following and assign it to the variable `{Custom}` in **Sysmonitor Indicator**:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# UPDT: May 30 2018 - Cohesion with new multi-timer and old lock-screen-timer.

if [ -f ~/.lock-screen-timer-remaining ]; then
    text-spinner
    Spinner=$(cat ~/.last-text-spinner) # read last text spinner used
    String=$(cat ~/.lock-screen-timer-remaining)
    systray="$Spinner  $String"
else
    systray=""
fi

if [ -f /tmp/display-current-brightness ]; then
    Brightness=$(cat /tmp/display-current-brightness)
    systray="$systray  Brightness: $Brightness"
else
    systray="$systray  Brightness: OFF"
fi

# Below for AU answer: https://askubuntu.com/questions/1024866/is-it-possible-to-show-ip-address-on-top-bar-near-the-time
# default_interface=$(route -n | awk '$1 == "0.0.0.0" {print $8; exit}')
# ip_address=$(ifconfig "$default_interface" | awk 'sub(/.* inet addr:/, "") {print $1}')
# systray="$systray  $ip_address"
        
echo "$systray" # sysmon-indidicator will put echo string into systray for us.

exit 0

```

After telling ***Sysmonitor Indicator*** the name of your bash script by setting the `{Custom}` variable it runs every refresh interval. Whatever your bash script outputs via `echo` command appears in Ubuntu's System Tray.

**NOTE:** The script displays *Time Remaining* and *Display Brightness Level* values. These value are set by scripts documented in **Ask Ubuntu**:  [Application that will lock screen after a set amount of time for Ubuntu][4], [A timer to set up different alarms simultaneosly][5] and [Automatically adjust display brightness based on sunrise and sunset][6] respectively.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Spinning pizza--`text-spinner` BASH script

The `text-spinner` bash script creates a spinning pizza effect by cycling through the characters `|`, `/`, `─` and `\`. This effect highlights the fact something is "working" or "thinking". To get the "spinning effect" you want to change the **Sysmonitor Indicator** refresh interval from the default `2` seconds to be about `0.30` seconds. 

Here is the `text-spinner` bash script:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# return '|', '/', '─', '\' sequentially with each call to this script.
# Use ~/.last-text-spinner to store last used

FILE=~/.last-text-spinner

if ! [ -f $FILE ]; then
    echo '|' > $FILE
    exit 124 # ASCII equivalent for '|'. Bash doesn't allow character return codes
fi

LAST=$(cat $FILE) # read last character used

if [[ $LAST == '|' ]]; then
    echo '/' > $FILE
    exit 47 # ASCII equivalent of "/"
elif [[ $LAST == '/' ]]; then  # NOTE: you must have spaces around " == " else code breaks
    echo '─' > $FILE
    exit 9472 # ASCII equivalent
elif [[ $LAST == '─' ]]; then
    echo '\' > $FILE # NOTE: must use single quote because double quote BASH reinterprets
    exit 92 # ASCII
else
    echo '|' > $FILE
    exit 124 # ASCII
fi

```


  [1]: http://www.webupd8.org/2014/05/ubuntu-appindicator-that-displays-bash.html
  [2]: https://github.com/fossfreedom/indicator-sysmonitor
  [3]: https://i.stack.imgur.com/zdDGs.gif
  [4]: https://askubuntu.com/questions/837078/application-that-will-lock-screen-after-a-set-amount-of-time-for-ubuntu/837115#837115
  [5]: https://askubuntu.com/questions/1039357/a-timer-to-set-up-different-alarms-simultaneosly
  [6]: https://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a></div>
