---
layout:       post
title:        Can BASH display in systray as application indicator?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/882420
type:         Answer
tags:         unity bash scripts system-tray eyesome multi-timer
created_date: 2017-02-11 23:34:13
edit_date:    2021-12-12 22:34:32
votes:        6
favorites:    
views:        1,883
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# System Monitor Indicator

The best method I've found is **Sysmonitor Indicator** from this article on the **WEB UPD8** website:

- [Ubuntu AppIndicator That Displays Bash Scripts Output On The Panel: Sysmonitor Indicator][1].

It displays text on the Ubuntu System Tray (Systray) / Application Indicator Bar that your bash script updates with a single `echo` command.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Different Desktop Environments

The above article is targeted to Ubuntu 14.04 to 20.04 with the **Unity Desktop**. If you don't have Unity Desktop installed for Ubuntu 20.04 see [these instructions](https://linuxconfig.org/ubuntu-20-04-unity-desktop). 

For more information on Xubuntu, Gnome-Shell + app-indicator extension, and Budgie, go to the Developers website: [fossfreedom / indicator-sysmonitor][2]. Also visit the site for more detailed installation and configuration instructions.

# Install and Configure `indicator-sysmonitor`

To install **System Monitor Indicator** you need to first specify the PPA where `indicator-sysmonitor` can be found:

``` 
sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor
sudo apt-get update
sudo apt-get install indicator-sysmonitor

```

Now run the "indicator-sysmonitor" GUI from Unity Dash (<kbd>Alt</kbd>+<kbd>F2</kbd> or <kbd>⊞ Super</kbd> aka <kbd>⊞ Win</kbd> key). If you are using GNOME use <kbd>⊞ Super</kbd>+<kbd>A</kbd> to open Show Applications instead of Dash.

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


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Sysmonitor Indicator in action

This `.gif` shows how it looks when Ubuntu’s Unity System Tray is updated.

[![multi-timer sysmonitor indicator.gif][3]][3]

- At the beginning of the animation the Systray output contains "Brightness: 3000". **Note:** As of July 6, 2020 the script was changed to display "eyesome: 99%" where 99 is the percentage of sunlight based on time of day. A link to `eyesome` is provided below.
- Then `multi-timer` (link below) is started and steps through multiple timers.
- A spinning pizza appears along with a count down of time remaining for the current timer.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Sysmonitor Indicator BASH script

Create a script similar to the following script called `indicator-sysmonitor-display`. Assign the script's filename to the variable `{Custom}` in **Sysmonitor Indicator**:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# UPDT: May 30 2018 - Cohesion with new multi-timer and old lock-screen-timer.
#       July 6 2020 - New eyesome sunlight percentage.

if [ -f ~/.lock-screen-timer-remaining ]; then
    text-spinner
    Spinner=$(cat ~/.last-text-spinner) # read last text spinner used
    String=$(cat ~/.lock-screen-timer-remaining)
    systray="$Spinner  $String"
else
    systray=""
fi

if [ -f /usr/local/bin/.eyesome-percent ]; then
    Brightness=$(cat /usr/local/bin/.eyesome-percent)
    systray="$systray  eyesome: $Brightness"
else
    systray="$systray  eyesome: OFF"
fi

# Below for AU answer: https://askubuntu.com/questions/1024866/is-it-possible-to-show-ip-address-on-top-bar-near-the-time
# default_interface=$(route -n | awk '$1 == "0.0.0.0" {print $8; exit}')
# ip_address=$(ifconfig "$default_interface" | awk 'sub(/.* inet addr:/, "") {print $1}')
# systray="$systray  $ip_address"
        
echo "$systray" # sysmon-indidicator will put echo string into systray for us.

exit 0
```

After telling ***Sysmonitor Indicator*** the name of your bash script by setting the `{Custom}` variable it runs every refresh interval. Whatever your bash script outputs via `echo` command appears in Ubuntu's System Tray.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Three bash scripts that output to Systray

The `indicator-sysmonitor-display` script displays *Time Remaining* and *Display Brightness Level* values. These values are set by other scripts documented within **Ask Ubuntu**:  

- [Application that will lock screen after a set amount of time for Ubuntu][4]
- [Set of countdown timers with alarm][5]
- [Automatically adjust display brightness based on sunrise and sunset][6]

These three bash scripts illustrate how multiple scripts can output to the Systray concurrently and share the same script file (`indicator-sysmonitor-display`) that updates the display.

# Spinning pizza--`text-spinner` BASH script

The `text-spinner` bash script creates a spinning pizza effect by cycling through the characters `|`, `/`, `─` and `\`. This effect highlights the fact something is "working" or "thinking". To get the "spinning effect" you want to change the **Sysmonitor Indicator** refresh interval from the default `2` seconds to be about `0.30` seconds. 

Here is the `text-spinner` bash script:

{% include copyHeader.html %}
``` 
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
  [4]: https://pippim.github.io/2016/10/14/Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu.html
  [5]: https://askubuntu.com/questions/1039357/a-timer-to-set-up-different-alarms-simultaneosly
  [6]: https://pippim.github.io/2017/03/19/Automatically-adjust-display-brightness-based-on-sunrise-and-sunset.html


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

