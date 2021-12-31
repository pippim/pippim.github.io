---
layout:       post
title:        4 clicks to shut down Ubuntu - can we reduce this?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1248665
type:         Answer
tags:         20.04 shutdown gnome-shell
created_date: 2020-06-09 23:16:55
edit_date:    2020-12-31 17:51:16
votes:        2
favorites:    
views:        15,322
accepted:     
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Sony TV remote suspends laptop via network control

`tvpowered` (TV controls power to the computer) is a bash script that automatically suspends laptop when Sony Bravia TV is powered off. Additionally it will:

- Turn off picture of TV to save power when you are not watching movies on TV.
- Display pop-up bubble when you change volume of TV used for listening to music.


Please note this **only works with Sony Bravia TVs**.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Overview

When TV is turned off `tvpowered` automatically suspends, hibernates or powers off the laptop. Change the setting of `SCTL` global variable to control which action is taken.

`tvpowered` should be run as a normal user and called in Startup Applications.

Program design is straight forward:

1. Wait for TV to be powered on.
2. Begin fully active operation.
3. Check if TV is powered off. If off go to step 5.
4. Sleep for 3 seconds and repeat step 3.
5. Suspend or Poweroff system when TV is powered off.
6. If resuming from suspend go back to step 1.

In between these steps pop-up bubble messages appear on Desktop and are also logged to `journalctl`:

<!-- Language-all: lang-bash -->

``` 
$ journalctl -xe | grep tvpower

Jun 11 18:11:20 tvpowered[27398]: TV is powered on. 'tvpowered' is now waiting for TV to power off.
Jun 11 18:11:47 tvpowered[28229]: TV Powered off. 'systemctl suspend' being called.
Jun 11 18:11:47 tvpowered[28238]: System powered back up. Checking if TV powered on. './tvpowered'.
Jun 11 18:12:26 tvpowered[31672]: TV is powered on. 'tvpowered' is now waiting for TV to power off.
```


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## `tvpowered` script

Copy and paste the script into a file on your computer and mark it executable with:

``` 
chmod a+x /path/to/tvpowered

```

Where `/path/to/` is the directory name you created the file in.

You can also user your file manager (like Nautilus) to make the file executable.

In the script below there are a few constants you will need to set:

``` 
SCTL=suspend        # systemctl paramater: suspend or poweroff
IP=192.168.0.16     # IP address for Sony TV
PWRD=123            # Password for Sony TV IP Connect
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## `tvpowered` complete bash script


{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: tvpowered
#
#       Original name slave2tv announced as politically incorrect after one day:
#       https://www.rt.com/news/491343-microsoft-coding-blacklists-slaves/
#
# DESC: When TV is powered off automatically suspend the laptop.
# DATE: June 9, 2020. Modified December 31, 2020
#
# NOTE: Written for Ask Ubuntu question:
#       https://askubuntu.com/questions/1247484/
#       4-clicks-to-shut-down-ubuntu-can-we-reduce-this

# UPDT: Jun 10 2020: Make name politically correct for Microsoft guidelines.
#       Change name from 'slave2tv' to 'tvpowered'. Abandon approach of polling
#       i2c, drm, i915, nvidia, xrandr, etc to see if monitor turned off. Setup
#       WiFi on TV instead and use Sony REST API to communicate TV status.

#       Jun 11 2020: Add pop-up bubble status messages. Add dependencies.
#       Add TenMinuteSpam. Add WaitUserSignOn. Add $SCTL constant. Convert
#       in-line code to mainline format.

#       Oct 03 2020: If ethernet disconnected we don't want to suspend.
#       Add TenMinuteSpam. Add WaitUserSignOn. Add $SCTL constant. Convert
#       in-line code to mainline format.

#       Oct 18 2020: If WiFi disconnected we don't want to suspend.

#       Dec 23 2020: After resume turn off picture with power savings.

#       Dec 31 2020: Fast popping bubble messages when volume changes.

# Sources:

# https://gist.github.com/kalleth/e10e8f3b8b7cb1bac21463b0073a65fb#cec-sonycec
# https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/audio/v1_0/setAudioVolume/index.html
# https://developer.sony.com/develop/audio-control-api/get-started/http-example#tutorial-step-2
# https://en.wikipedia.org/wiki/CURL
# https://stackoverflow.com/questions/7172784/how-do-i-post-json-data-with-curl
# https://stackoverflow.com/questions/2829613/how-do-you-tell-if-a-string-contains-another-string-in-posix-sh

SCTL=suspend        # systemctl paramater: suspend or poweroff
IP=192.168.0.16     # IP address for Sony TV
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)

# Must have curl package.
command -v curl >/dev/null 2>&1 || { echo >&2 \
        "'curl' package required but it is not installed.  Aborting."; \
        exit 2; }

# Must have notify-send from libnotify-bin package
command -v notify-send >/dev/null 2>&1 || { echo >&2 \
        "libnotify-bin package required but it is not installed.  Aborting."; \
        exit 3; }

cURLit () {

    # $1 = JSON String in pretty format converted to file for cURL --data.
    # $2 = Sony subsystem to talk to, eg accessControl, audio, system, etc.
    # 3  = variable name to receive reply from TV

    local TEMP Result ReturnState

    # Declare mathres as reference to argument 3 provided (Bash 4.3 or greater)
    declare -n Result=$3  # ERROR: declare: `': not a valid identifier

    # Create temporary file in RAM for curl command
    TEMP=$(mktemp --tmpdir json.XXXXXXXX)
    echo "$1" > "$TEMP"

    # -s = silent
    Result=$(curl -s -H "Content-Type: application/json; charset=UTF-8" \
             -H "X-Auth-PSK: $PWRD" \
             --data @"$TEMP" \
             http://$IP/sony/"$2")
#echo "Result: $Result"    # Remove leading # for debugging
    ReturnState="$?"
    # TO-DO: check $? and if non-zero pop up dialog with $TEMP contents
    rm "$TEMP"

} # cURLit

GetPowerStatus () {

    local Reply ReturnState

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerStatus/index.html
    JSONstr='{
                "method": "getPowerStatus",
                "id": 50,
                "params": [],
                "version": "1.0"
             }'

    cURLit "$JSONstr" "system" Reply    # No $ for Reply variable! pass pointer
    ReturnState="$?"

#echo "Reply: $Reply"    # Remove leading # for debugging
    # Reply: {"result":[{"status":"active"}],"id":50}
    #    or: {"result":[{"status":"standby"}],"id":50}

    # Does 'active' substring exist in TV's reply?
    [[ "${Reply#*active}" != "$Reply" ]] && return 0

    # TV is turned off
    # Might want timer tests to make sure we aren't repeatedly turning off
    return 1
    
} # GetPowerStatus

GetVolume () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/audio/v1_0/getVolumeInformation/index.html
    JSONstr='{
                "method": "getVolumeInformation",
                "id": 33,
                "params": [],
                "version": "1.0"
             }'
    
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "audio" Reply

    # Sample output:
    #   Volume:, {"result":[[{"target":"speaker","volume":44,"mute":false,
    #   "maxVolume":100,"minVolume":0},{"target":"headphone","volume":15,
    #   "mute":false,"maxVolume":100,"minVolume":0}]],"id":33}

    Start="${Reply:41:4}"
    Volume=${Start%,*}

    return $Volume

} # GetVolume


log () {
    logger --id=$$ -t "tvpowered" "$1"
} # log


WaitForSignOn () {

    # tvpowered might be loaded during boot. The user name is required
    # for sending popup bubble messages and dialogs to screen. We must
    # wait until user signs on to get .Xauthority file settings.

    # code lifted from eyesome.sh
    SpamOn=10       # Causes 10 iterations of 2 second sleep
    SpamContext="Login"
    TotalWait=0

    # Wait for user to sign on then get Xserver access for xrandr calls
    UserName=""
    while [[ $UserName == "" ]]; do

        # Find UserName currently logged in.
        UserName="$(who -u | grep -F '(:0)' | head -n 1 | awk '{print $1}')"
        [[ $UserName != "" ]] && break

        sleep "$SpamLength"
        TotalWait=$(( TotalWait + SpamLength ))
    done

    if [[ $TotalWait != "0" ]] ; then
        log "Waited $TotalWait seconds for $UserName to login."
        xhost local:root
        export XAUTHORITY="/home/$UserName/.Xauthority"
    fi

} # WaitForSignOn


LastVolume=0
CurrVolume=0


TenMinuteSpam () {

    # If TV not powered up Spam user for 10 minutes that 'tvpowered' is running
    # and will shut down / suspend system

    WaitForSignOn   # Might be called by root during boot before user signed on.

    Cnt=0
    while : ; do

        GetPowerStatus
        if [[ "$?" == "0" ]] ; then
            log "TV is powered on. 'tvpowered' is now waiting for TV to power off."
            break
        else
            # Spam user every 60 seconds
            (( $(( Cnt % 20 )) == 0 )) && \
                notify-send --urgency=critical "tvpowered" \
                    -h string:x-canonical-private-synchronous:startup \
                    --icon=/usr/share/icons/gnome/48x48/devices/display.png \
                    "TV not communicating.\n Checking TV again..."
        fi
        sleep 3
        (( Cnt++ ))
    done
    
    GetVolume
    LastVolume="$?"
    notify-send --urgency=critical "tvpowered" \
        --icon=/usr/share/icons/gnome/48x48/devices/display.png \
        "Fully activated.\n System will $SCTL when TV powered off.  Volume: $LastVolume"
    
    return 0

} # TenMinuteSpam

###################################
#            MAINLINE             #
###################################

Main () {

    echo "$0: Initialization. Ensuring TV is powered on before starting."
    TenMinuteSpam
    echo "$0: Fully activated. Waiting for TV to powered off and then $SCTL."
    echo "$0: LastVolume: $LastVolume"

    Cnt=0
    FirstTime=true
    VolumeCnt=0             # TV Remote changed volume, so shrorter sleep

    while : ; do
        #etherup=$(cat /sys/class/net/e*/carrier) # Returns 1 even disconnected
        #wifi_up=$(cat /sys/class/net/w*/carrier)
        #if [[ $etherup <> "1" && $wifi_up <> "1" ]] ; then
        state=$(nmcli -f STATE -t g)            # Network manager takes .5 CPU
        if [[ $state == disconnected ]] ; then
            # Spam user every 60 * Cot seconds
            notify-send --urgency=critical "tvpowered" \
                -h string:x-canonical-private-synchronous:startup \
                --icon=/usr/share/icons/gnome/48x48/devices/display.png \
                "Internet not up.\nChecking Ethernet and/or  WiFi state again..."
            sleep $((Cnt * 60))
            (( Cnt++ ))
            continue
        else
            Cnt=0                               # Reset timer for next loop
        fi

        GetPowerStatus
        if [[ "$?" != "0" ]] ; then
            state=$(nmcli -f STATE -t g)        # Network manager takes .5 CPU
            if [[ $state == disconnected ]] ; then
                echo "Unexpected disconnect, aborting suspend."
            else
                log "TV Powered off. 'systemctl $SCTL' being called."
                systemctl "$SCTL"
                log "System powered back up. Checking if TV powered on. '$0'."
                sleep 10 #  Give system time to wake from suspend
                TenMinuteSpam
                /home/rick/sony/pictureoff.sh
            fi
        fi

        GetVolume
        CurrVolume="$?"
        # echo CurrVolume: $CurrVolume LastVolume: $LastVolume

        if [[ "$CurrVolume" != "$LastVolume" ]] ; then
            # Ask Ubuntu: https://askubuntu.com/a/871207/307523
            notify-send --urgency=critical "tvpowered" \
                -h string:x-canonical-private-synchronous:volume \
                --icon=/usr/share/icons/gnome/48x48/devices/audio-speakers.png \
                "Volume: $CurrVolume"
            LastVolume=$CurrVolume
            VolumeCnt=10
            # TODO: Process VolumeCnt internally in loop instead of larger loop
        fi

        if [[ $VolumeCnt > 0 ]]; then
            (( VolumeCnt-- ))
            SleepTime=.01
        else
            SleepTime=2.5
        fi

        sleep $SleepTime

        # Next iteration
        FirstTime=false
    done

    exit 0

} # Main

Main "$@"
```

----------


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Summary

I was inspired by OP's question and never realized how cumbersome and time-consuming my end of day suspend process used to be:

1. Find where the cursor is on on one of three monitors
2. Navigate to top right of whichever monitor and left click Cog menu
3. Pull mouse down to suspend option
4. Click suspend (being careful not to click shutdown next to it!)
5. Power off Sony TV
6. Power off Toshiba TV

`tvpowered` has eliminated time consuming steps 1. through 4.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

