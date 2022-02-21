---
layout:       post
title:        >
    Automatically adjust display brightness based on sunrise and sunset
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/894470
type:         Answer
tags:         display laptop brightness backlight eyesome conky
created_date: 2017-03-19 01:10:27
edit_date:    2019-02-07 01:43:56
votes:        "8 "
favorites:    
views:        "5,330 "
accepted:     Accepted
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-19-Automatically-adjust-display-brightness-based-on-sunrise-and-sunset.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Updated Post from 2019 - Eyesome

Eyesome is a bash script running as a deamon and sleeping most of the time 24/7. It automatically adjusts screen brightness (and optionally gamma too) for your laptop display via hardware interface and up to two other monitors using xrandr's software control.

At sunrise (the time is automatically obtained from the internet each day), your screen brightness (and optionally gamma too) is adjusted gradually. The gradual adjustment is defined by you but, 120 minutes works for me. To keep the adjustments unnoticeable set a sleep interval between adjustments. Anywhere between 15 and 60 seconds is probably best and the default is 60.

Eyesome daemon sleeps many hours until sunset transition starts. Inversely to sunrise transition, the sunset transition gradually decreases screen brightness (and optionally gamma too) so it is unnoticeable. 90 minutes before sunset is recommended but you can set any period you like.

During sunset transition gamma may be defined to increase. For example Red gamma may be defined as 1.0 during day and 1.2 during night to reduce eye strain. Blue gamma in turn may be defined as 1.0 during day and .8 during night so it will decrease instead.

To reduce resources, eyesome sleeps the entire period between sunset and sunrise transitions. There are one time exceptions when resuming from suspend or hot plugging external monitors. It depends on where you live and the season of the year but, the average sleep will be 12 hours.

You can download [Eyesome from Github][1]

----------


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Original Post from 2017

### Introduction

This a bash solution with no need to install additional programs. It requires an Internet connection (if you are reading this you have one) to automatically get sunrise and sunset times each day. It provides a user-friendly configuration screen. It starts up automatically with `cron` and requires no user interaction.

This answer is divided into multiple parts

 - Automatically get sunrise and sunset times each day with `cron`
 - Configure brightness settings and transition time
 - Main script to adjust brightness based on time of day
 - Start display-auto-brightness automatically every boot with `cron`
 - Instant/transparent brightness adjustment resuming from suspend
 - Summary


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Automatically get sunrise and sunset times each day with cron

There are many websites to report sunrise and sunset times for your location. This script uses ([https://www.timeanddate.com/][2]) which has been a well-known site for a long time.

With sudo powers edit the file `/usr/local/bin/sun-hours` and paste this:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# Called daily from /etc/cron.daily/sun-hours
while true; do

### "-q"= quiet, "-O-" pipe output
echo $(wget -q -O- https://www.timeanddate.com/sun/canada/edmonton | grep -oE 'Sunrise Today.{35}' | awk -F\> '{print $3}' | tr --delete "<") > /tmp/sunrise
echo $(wget -q -O- https://www.timeanddate.com/sun/canada/edmonton | grep -oE 'Sunset Today.{35}' | awk -F\> '{print $3}' | tr --delete "<") > /tmp/sunset

## If network is down files will have one byte size
size1=$(wc -c < /tmp/sunrise)
size2=$(wc -c < /tmp/sunset)

if [ $size1 -gt 1 ] && [ $size2 -gt 1 ] ; then
    cp /tmp/sunrise /usr/local/bin/sunrise
    cp /tmp/sunset  /usr/local/bin/sunset
    chmod 666 /usr/local/bin/sunrise
    chmod 666 /usr/local/bin/sunset
    rm /tmp/sunrise
    rm /tmp/sunset
    exit 0
else
    logger "/etc/cron.daily/sun-hours: Network is down. Waiting 5 minutes to try again."
    sleep 300
fi

done
```

Before saving the script replace the two occurrences of `/canada/edmonton` with your own country and city. Visit the site `www.timeanddate.com` to get the exact name or number. For example, "Paris, USA" has dozens of names so they'll contain a number such as `/worldclock/@5205082` for "Paris, PA USA".


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Use cron to run sun-hours script each day

With sudo powers edit the file `/etc/cron.daily/sun-hours` and paste this:

``` sh
#!/bin/sh
#
# Each day /etc/cron.daily/sun-hours will get sunrise and sunset times.

sleep 60 # give time for network to come up.
/usr/local/bin/sun-hours
```

Mark both files as executable with `sudo chmod a+x ___/sun-hours` where "___" is the directory for each file.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Use Conky to monitor sunrise / sunset time changes each day

**Conky** is a popular tool for monitoring your system. Here are the commands for it to display sunrise, sunset and brightness setting:



``` text
${color orange}${voffset 2}${hr 1}
${color}${goto 5}Day: ${color green}${execpi 300 cat /usr/local/bin/sunrise}  ${color}Night: ${color green}${execpi 300 cat /usr/local/bin/sunset}  ${color}Level: ${color green}${execpi 10 cat cat /sys/class/backlight/intel_backlight/brightness}
${color orange}${voffset 2}${hr 1}
```

This is what it looks like:

[![display-auto-brightness conky][3]][3]

**Note:** this Conky code uses `intel_backlight` which you need to change depending on your display adapter as described in sections below.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

# Configure brightness settings and transition time

You don't want your display to change to full brightness on sunrise and full dimness on sunset. A transition period is needed. Additionally a configuration file is required to record the variables for full brightness and full dim. This is the configuration screen:

[![display-auto-brightness-config][4]][4]

The screen is built using standard **zenity** command and as such existing values are shown in labels with "(value)" tag and you key in new values if needed. Otherwise the existing files are kept when new values are blank.

Replace `intel_backlight` with your display driver if different. To find out your name use: `ls /sys/class/backlight/*/brightness`.
 
Using sudo powers create the file `/usr/local/bin/auto-brightness-config` and paste in this code:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# Read hidden configuration file with entries separated by " " into array
IFS=' ' read -ra CfgArr < /usr/local/bin/.auto-brightness-config

# Zenity form with current values in entry label
# because initializing multiple entry data fields not supported
output=$(zenity --forms --title="Display Auto Brightness Configuration" \
        --text="Enter new settings or leave entries blank to keep (existing) settings" \
   --add-entry="/sys/class/backlight/??????/brightness driver : (${CfgArr[0]})" \
   --add-entry="Day time maximum display brightness : (${CfgArr[1]})" \
   --add-entry="Transition minutes after sunrise to maximum : (${CfgArr[2]})" \
   --add-entry="Night time minimum display brightness : (${CfgArr[3]})" \
   --add-entry="Transition minutes before sunset to minimum : (${CfgArr[4]})")

IFS='|' read -a ZenArr <<<$output # Split zenity entries separated by "|" into array elements

# Update non-blank zenity array entries into configuration array
for i in ${!ZenArr[@]}; do
    if [[ ${ZenArr[i]} != "" ]]; then CfgArr[i]=${ZenArr[i]} ; fi
done

# write hidden configuration file using array (fields automatically separated by " ")
echo "${CfgArr[@]}" > /usr/local/bin/.auto-brightness-config
```

Mark the file as executable using:

``` bash
chmod a+x /usr/local/bin/auto-brightness-config
```


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# Main program `display-auto-brightness`
 
Using sudo powers create the file `/usr/local/bin/display-auto-brightness` and paste in this code:


{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: display-auto-brightness
# PATH: /usr/local/bin
# DESC: Set display brightness based on min/max values, sun rise/set time
#       and transition minutes.
# CALL: Called from cron on system startup with @reboot option.
# DATE: Feb 17, 2017. Modified: Dec 2, 2017.

# NOTE: Only sleep for 1 minute to make display brightness changes gradual.
#       Configuration file can change any time so variables reread when waking.
#       The file is maintained by /usr/local/bin/auto-brightness-config script.

#       Sunrise and sunset time obtained from www.dateandtime.com using
#       /usr/local/bin/sun-hours script. The script is called from cron using
#       /etc/cron.daily/cron-daily-sun-hours. Variables stored in am/pm format
#       in /usr/local/bin/sunrise and /usr/local/bin/sunset.

#       When suspending at 6 am it might be dark with setting at 300. When 
#       resuming at 4:30pm it might be full sun and setting needs to be 2000.
#       It will take between 1 and 59 seconds to adjust screen brightness with
#       sudden jump in brightness. To correct this create kill sleep command
#       during suspend with /lib/systemd/system-sleep/display-auto-brightness
#       script.

# TODO: Add support for external monitors connected via HDMI / DisplayPort.
#       xrandr --output HDMI-0  --brightness .799
#       xrandr --output DP-1-1  --brightness 1.15

if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo display-auto-brightness must be called with sudo powers
    exit 1
fi

# global variable
LastSetting=""

function set-and-sleep {
    if [[ "$1" != "$LastSetting" ]]; then
        sudo sh -c "echo $1 | sudo tee $backlight"
        echo "$1" > "/tmp/display-current-brightness"
        LastSetting="$1"
    fi
    sleep 60
}  

re='^[0-9]+$'   # regex for valid numbers

function calc-level-and-sleep {
    # Parms $1 = number of minutes for total transition
    #       $2 = number of seconds into transition

    secTotal=$(( $1 * 60 )) # Convert total transition minutes to seconds
    Adjust=$( bc <<< "scale=6; $transition_spread * ( $2 / $secTotal )" )
    Adjust=$( echo $Adjust | cut -f1 -d"." ) # Truncate number to integer

    if ! [[ $Adjust =~ $re ]] ; then
        Adjust=0   # When we get to last minute $Adjust can be non-numeric
    fi

    calc_bright=$(( $min_bright + $Adjust ))
    set-and-sleep "$calc_bright"
}


while true ; do

    # Although variables change once a day it could be weeks between reboots.
    sunrise=$(cat /usr/local/bin/sunrise)
    sunset=$(cat /usr/local/bin/sunset)

    # Read hidden configuration file with entries separated by " " into array
    IFS=' ' read -ra CfgArr < /usr/local/bin/.auto-brightness-config
    backlight="/sys/class/backlight/${CfgArr[0]}/brightness"
    max_bright="${CfgArr[1]}"
    after_sunrise="${CfgArr[2]}"
    min_bright="${CfgArr[3]}"
    before_sunset="${CfgArr[4]}"

    # Current seconds
    secNow=$(date +"%s")
    secSunrise=$(date --date="$sunrise today" +%s)
    secSunset=$(date --date="$sunset today" +%s)

    # Is it night time?
    if [ "$secNow" -gt "$secSunset" ] || [ "$secNow" -lt "$secSunrise" ]; then
        # MINIMUN: after sunset or before sunrise nightime setting
     	set-and-sleep "$min_bright"
    	continue
    fi

    # We're somewhere between sunrise and sunset
    secMaxCutoff=$(( $secSunrise + ( $after_sunrise * 60 ) ))
    secMinStart=$((  $secSunset  - ( $before_sunset * 60 ) ))

    # Is it full bright day time?
    if [ "$secNow" -gt "$secMaxCutoff" ] && [ "$secNow" -lt "$secMinStart" ]; then
    	# MAXIMUN: after sunrise transition AND before nightime transition
     	set-and-sleep "$max_bright"
        continue
    fi

    # Daytime - nightime = transition brightness levels
    transition_spread=$(( $max_bright - $min_bright ))

    # Are we between sunrise and full brightness?
    if [ "$secNow" -gt "$secSunrise" ] && [ "$secNow" -lt "$secMaxCutoff" ]; then
    	# Current time - Sunrise = progress through transition
    	secPast=$(( $secNow - $secSunrise ))
        calc-level-and-sleep $after_sunrise $secPast
        continue
    fi

    # Are we between beginning to dim and sunset (full dim)?
    if [ "$secNow" -gt "$secMinStart" ] && [ "$secNow" -lt "$secSunset" ]; then
    	# Sunset - Current time = progress through transition
    	secBefore=$(( $secSunset - $secNow ))
        calc-level-and-sleep $before_sunset $secBefore
        continue
    fi

    # At this stage brightness was set with manual override outside this program
    # or exactly at a testpoint, then it will change next minute so no big deal.
    sleep 60 # reset brightness once / minute.
        
done # End of forever loop
```

Mark the file as executable using:

``` bash
chmod a+x /usr/local/bin/display-auto-brightness
```

**NOTE:** Unsuccessfully revised August 26, 2017 to correct bug where program would stop when last brightness level was equal to minimum or maximum brightness and current minute's adjustment value is blank (zero). Successfully fixed December 2, 2017 but not published until February 17, 2018. Ooops!


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

# Start display-auto-brightness automatically every boot with `cron`

Cron is used to start the main application every boot. Create the file `/etc/cron.d/display-auto-brightness` with sudo powers and copy in this:

``` bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    /usr/local/bin/display-auto-brightness
```

# Instant brightness adjustment resuming from suspend

You can suspend your computer at 6 am when it before the sun rises and your setting is at 300. You can resume it at 4 pm when the sun is bright and the setting should be 2000 but you have to wait 1 to 59 seconds for `display-auto-brightness` to reset the display. When the display does reset the change is dramatic. To solve this a `systemd` script is needed. Create the file `/lib/systemd/system-sleep/display-auto-brightness` containing:

{% include copyHeader.html %}
``` sh
#!/bin/sh

# NAME: display-auto-brightness
# PATH: /lib/systemd/system-sleep/
# DESC: Restart display brightness when resuming from suspend
# CALL: Automatically called when system goes to sleep and wakes up
# DATE: August 2017. Modified: June 10, 2018.

# NOTE: Gives instant display brightness adjustment instead of waiting 1 to 59 seconds.

logger -t "logger -t "test" "\$0=$0, \$1=$1, \$2=$2" test" "\$0=$0, \$1=$1, \$2=$2"

case $1/$2 in
  pre/*)
    echo "/lib/systemd/system-sleep/display-auto-brightness: Going to $2..."
    ;;
  post/*)
    # March 28, 2018 On AW17R3 this script runs too fast
    sleep 2

    echo "/lib/systemd/system-sleep/display-auto-brightness: Resuming from $2..."

    # Find running tree processes containing "display-auto" AND "sleep"
    ProgramTree=$(pstree -g -p | grep display-auto | grep sleep)
    # echo's below will print in /var/log/syslog. Comment out with # to suppress
    echo "pstree -g -p | grep display-auto | grep sleep"
    echo "============================================="
    echo "$ProgramTree"

    # extract sleep program ID within `pstree`. eg we would want "16621" below:
    # |-cron(1198,1198)---cron(1257,1198)---sh(1308,1308)---display-auto-br(1321,1308)---sleep(16621,1308)
    pID=$(echo "$ProgramTree" | cut -f 6 -d '(' )
    pID=$(echo "$pID" | cut -f1 -d",")

    kill $pID  # kill sleep command forcing screen brightness to adjust immediately
    rm /tmp/display-current-brightness
    echo "display-auto-brightness: sleep pID: '$pID' has been killed."
    ;;
esac
```

Mark the file as executable using:

``` bash
chmod a+x /lib/systemd/system-sleep/display-auto-brightness
```


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr11" class ="hdr-btn">Skip</a></div>

# Summary

## Display current brightness level is systray

In addition to Conky example presented earlier, **indicator-sysmonitor** you can display the current brightness in the systray through bash:

[![display-auto-brightness systray][5]][5]

In this systray example brightness is set at `418` and it is about 20 minutes before sunset. At sunset the value will be 250 and the daytime full brightness is 1200. On this machine intel_backlight=4882 is possible but, if you are indoors with curtains open the screen is like staring into the sun.

The systray indicator is setup using this code:

{% include copyHeader.html %}
``` bash
#!/bin/bash

if [ -f ~/.lock-screen-timer-remaining ]; then
    text-spinner
    Spinner=$(cat ~/.last-text-spinner) # read last text spinner used
    Minutes=$(cat ~/.lock-screen-timer-remaining)
    systray=" $Spinner Lock screen in: $Minutes"
else
    systray=" Lock screen: OFF"
fi

if [ -f /tmp/display-current-brightness ]; then
    Brightness=$(cat /tmp/display-current-brightness)
    systray="$systray Brightness: $Brightness"
else
    systray="$systray Brightness: OFF"
fi

echo "$systray" # sysmon-indidicator will put echo string into systray for us.

exit 0
```

This Q&A ([Can BASH display in systray as application indicator?][6]) describes how to setup indicator-sysmonitor.


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr10" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr12" class ="hdr-btn">Skip</a></div>

## Future Enhancements

- Migrating bash scripts for this answer to github
- Adding support for external monitors using `xrandr`
- Adding support for more red/less blue using `xrandr`


  [1]: https://github.com/WinEunuuchs2Unix/eyesome
  [2]: https://www.timeanddate.com/
  [3]: https://i.stack.imgur.com/4njOT.png
  [4]: https://i.stack.imgur.com/CWjQ8.png
  [5]: https://i.stack.imgur.com/esEG1.png
  [6]: {% post_url /2017/2017-02-11-Can-BASH-display-in-systray-as-application-indicator_ %}


<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr11" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

