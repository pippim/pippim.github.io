---
layout:       post
title:        >
    How do I restrict my kids' computing time?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1018106
type:         Answer
tags:         software-recommendation bash parental-controls
created_date: 2018-03-22 01:06:16
edit_date:    2021-12-04 21:51:58
votes:        "2 "
favorites:    
views:        "58,747 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          true
navigation:   true
clipboard:    true
---




<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Lock Screen Timer


[![systray.gif][1]][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Create your own Screen Lock Timer instead of 3rd Party applications



Although there are 3rd Party applications to do this, you can create your own. Summary of steps:

 - Use `gedit` to create script `lock-screen-timer`
 - Copy and paste code from this window to `lock-screen-timer`
 - Mark `lock-screen-timer` as an executable
 - Test it!
 - Configure Nautilus to execute bash scripts
 - Create desktop shortcut link
 - Monitor time remaining


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Use `gedit` to create script `lock-screen-timer`


Open the `Terminal` using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type:

``` bash
gedit lock-screen-timer

```

## Copy and paste code from window below to `lock-screen-timer`


Toggle back to this screen and copy the following code by highlighting it and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: lock-screen-timer
# PATH: $HOME/bin
# DESC: Lock screen in x minutes
# CALL: Place on Desktop or call from Terminal with "lock-screen-timer 99"
# DATE: Created Nov 19, 2016. Last revision Nov 13, 2021.

# UPDT: Updated to support WSL (Windows Subsystem for Linux)
#       Remove hotplugtv. Replace ogg with paplay.
#       May 30 2018 - Cohesion with multi-timer. New sysmonitor indicator style.
#       Nov 13 2021 - Wrap long lines with \ continuation. Shorten comments.

# NOTE: Time defaults to 30 minutes.
#       If previous version is sleeping it is killed.
#       Zenity is used to pop up entry box to get number of minutes.
#       If zenity is closed with X or Cancel, no screen lock timer is launched.
#       Pending lock warning displayed at set intervals.
#       Write time remaining to ~/.lock-screen-timer-remaining

MINUTES="$1" # Optional parameter 1 when invoked from terminal.

# if no parameters set default MINUTES to 30
if [ $# == 0 ]; then
    MINUTES=30
fi

DEFAULT="$MINUTES" # When looping, minutes count down to zero. 
                   # Save deafult for subsequent timers.

# Check if lock screen timer already running
pID=$(pgrep -f "${0##*/}") # All PIDs matching lock-screen-timer name
PREVIOUS=$(echo "$pID" | grep -v ^"$$") # Strip out this running copy ($$$)
if [ "$PREVIOUS" != "" ]; then
    kill "$PREVIOUS"
    rm ~/.lock-screen-timer-remaining
    zenity --info --title="Lock screen timer already running" \
        --text="Previous lock screen timer has been terminated."
fi

# Running under WSL (Windows Subsystem for Linux)?
if cat /proc/version | grep Microsoft; then
    WSL_running=true
else
    WSL_running=false
fi


while true ; do # loop until cancel

    # Get number of minutes until lock from user
    MINUTES=$(zenity --entry --title="Lock screen timer" \
        --text="Set number of minutes until lock" --entry-text="$DEFAULT")

    RESULT=$? # Zenity return code
    if [ $RESULT != 0 ]; then
        break ; # break out of timer lock screen loop and end this script.
    fi

    DEFAULT="$MINUTES" # Save deafult for subsequent timers.
    if [[ $MINUTES == 0 ]] || [[ $MINUTES == "" ]]; then
        break ; # zero minutes considered cancel.
    fi

    # Loop for X minutes, testing each minute for alert message.
    (( ++MINUTES )) 
    while (( --MINUTES > 0 )); do
        case $MINUTES in 1|2|3|5|10|15|30|45|60|120|480|960|1920)
	        notify-send --urgency=critical \
	        --icon=/usr/share/icons/gnome/256x256/status/appointment-soon.png \
	        "Locking screen in ""$MINUTES"" minute(s)." ;
            if [[ $WSL_running == true ]]; then  
                powershell.exe -c '(New-Object Media.SoundPlayer \
                "C:\Windows\Media\notify.wav").PlaySync();'
            else
	           paplay /usr/share/sounds/freedesktop/stereo/complete.oga ;
            fi
	       ;;
        esac;

        # Record number of minutes remaining to file other processes can read.
        echo "Lock screen in: $MINUTES Minutes" > ~/.lock-screen-timer-remaining

        sleep 60

    done

    rm ~/.lock-screen-timer-remaining # Remove countdown work file

    if [[ $WSL_running == true ]]; then  
        # Call lock screen for Windows 10
        rundll32.exe user32.dll,LockWorkStation
    else
        # Call screen saver lock for Unbuntu versions > 14.04.
        dbus-send --type=method_call --dest=org.gnome.ScreenSaver \
            /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock
    fi

done # End of while loop getting minutes to next lock screen

exit 0 # Closed dialog box or "Cancel" selected.
```

Then toggle back to the empty `gedit` window and paste the code using <kbd>Ctrl</kbd>+<kbd>V</kbd>. Save the file and exit the editor back to the command prompt.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Mark `lock-screen-timer` as an executable


Now we need to make the script executable by typing:

``` bash
chmod +x lock-screen-timer

```

## Test It!


Before calling the script from the GUI, we'll call it from the terminal so we can see if any error messages are displayed:

``` bash
~/lock-screen-timer

```

You are prompted for the number of minutes:

[![Lock Screen Timer][2]][2]

Set the desired number of minutes and click OK to start the timer. When there are 15, 10, 5, 3, 2 and 1 minute(s) left a system sound is heard and a message bubble appears advising when the screen will be locked. After the screen is locked you need to enter your password to unlock the screen. 


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# Configure Nautilus to execute bash scripts

Nautilus defines what happens when we double click on an executable script when it's the files display window or a link on on the desktop. Normal behavior is to edit the script using `gedit`. We want to change this behavior such that it is executed.

Start Nautilus and navigate to directory containing `lock-screen-timer`. Left click on it once to give it focus. Hover mouse over top menu bar until "File Edit..." menu appears, use:

 1. Click `Edit` drop-down menu
 2. Click `Properties` option
 3. Click `Behavior` tab
 4. Observe the radio option buttons under `Executable Text Files`
 5. Check radio button `Run executable text files when they are opened`

# Create desktop shortcut link

From previous section `lock-screen-timer` still has focus. If not, navigate to the script and left click on it once to give it focus. Then use:

 - Right click on the file and the context-menu options appear.
 - From the menu select `Make Link`.
 - A new icon appears called `Link to lock-screen-timer`.
 - Left click on the new icon and drag it from Nautilus to your desktop.

Now you can double click on the desktop shortcut link and the script is run. A dialog box appears to get the number minutes. Two buttons are presented <kbd>Cancel</kbd> and <kbd>OK</kbd>. If you click the `X` to close the window it is the same as selecting <kbd>Cancel</kbd>.

After the timer is running and you double click on it again the first running copy is "killed". You can now start a new scren lock countdown or click <kbd>Cancel</kbd> for no countdown.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

# Display Time Remaining in systray / notification area

While lock screen timer is running it records how many minutes are remaining into the file `~/.lock-screen-timer-remaining`. You can look at this file with the `watch` command or display it on Ubuntu's system tray / application indicator bar as shown at the top of this answer. To display time remaining in the notification area, follow the instructions in this Q&A: [Can BASH display in systray as application indicator?]({% post_url /2017/2017-02-11-Can-BASH-display-in-systray-as-application-indicator? %}).


  [1]: https://i.stack.imgur.com/N0gb6.gif
  [2]: https://i.stack.imgur.com/0jBz6.png


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

