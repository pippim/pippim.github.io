---
title: TV Remote Turns Off Five "Things"
layout: program
canonical_url: 'https://www.pippim.com/programs/iothings.html'
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

{% include image.html src="/assets/img/iothings/volume change.gif"
   alt="volume change.gif"
   style="float: right; width: 50%; margin: 3rem 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}

# Introduction

This page describes how to **Control TV's and power outlets.**
The process is called "Internet of Things" (IoT).
The IoT programs here are designed for Linux and have
been tested in Ubuntu. The coding is done in Bash.

At the heart of the system is the `tvpowered` program
which starts after you login. A configuration file is required
in your `~/.config/autostart` directory to launch it. 

Press the power button on your computer and then:

- **tvpowered** script wakes up from sleep
- Sony TV turns on
- Bias light behind Sony TV (a.k.a. Primary TV or TV #1)
turns on
- Bias light behind TCL TV (a.k.a. Google TV, Secondary TV or TV #2)
turns on
- TCL / Google TV turns on

Press the power button on Sony TV remote control and then:

- Sony TV will be shut off (which power button does anyway)
- TCL/Google Android TV will be shut off
- Bias light behind the Sony TV will be shut off
- Bias light behind the TCL / Google TV will be shut off
- Computer will be put to sleep or shutdown
- **tvpowered** script continues when system wakes up


A variety of independent scripts are provided to make life
convenient. 

The bash script `light-tog` toggles the wall outlet power
behind the main TV (Sony). In this case the power controls a
lamp to provide bias lighting which reduces eye strain.

The bash script `light-tog2` toggles the wall outlet power
behind the second TV (TCL). In this case the power controls a
lamp to provide bias lighting which reduces eye strain.

To power off the bias lights behind the TVs, the script 
`/etc/NetworkManager/dispatcher.d/pre-down.d/smartplug_off`
can be run. See below for details on setting up script.
Note the same functionality is provided by `tvpowered`
when the system is turned off with the TV remote.
There are five additional bash scripts to control a Sony TV screen:

- `pictureoff.sh` Turns off the Sony TV screen but leaves sound on
- `pictureoff` same as **pictureoff.sh** but resides in path
- `pictureon.sh` Turns on the Sony TV screen which consumes 100 watts
- `picturetog.sh` Toggles Sony TV screen off and on
- `picturetog` same as **picturetog.sh** but resides in path

To assist with setting up your "Internet of Things" (IoT)
the program **ssh-setup** is used to document the devices
attached to your LAN and/or Wi-Fi router.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# **'tvpowered'** Sony Bravia TV Controller

{% include image.html src="/assets/img/iothings/tv remote off.gif"
   alt="tv remote off.gif"
   style="float: right; width: 50%; margin: .25rem 0px 1rem 1rem;"
   caption="Use TV remote to power off system"
%}


The **tvpowered** bash script is the heart of the
IoT (Internet of Things) system provided by {{ site.title }}.
The script is loaded when you sign on because it
is stored in the `~/.config/autostart` directory.

**tvpowered** automatically establishes communication
with your Sony TV and displays a desktop notification
when successful.

## **'tvpowered'** Key Features

There are some unique "bells & whistles":

- When volume is changed via TV remote control, the
volume level is displayed in desktop notification.
- The desktop notification is instantly updated
when consecutive volume changes are made. The usual
five or ten second delay is overriden for instant
feedback.
- When Sony TV is powered off via TV remote control,
the power outlet for the light behind the TV
and secondary TV is turned off and your system
is put to sleep or shutdown. The TCL / Google TV is
also powered off.
- You are reminded if communication between the TV
and your computer isn't working.
- When your computer system wakes up from sleep /
resumes from suspend, the lights behind the 
Sony TV and TCL / Google TV are turned on.
- Work in Progress is to turn on Sony TV and Google
TV as well.

{% include image.html src="/assets/img/iothings/volume change.gif"
   alt="volume change.gif"
   style="float: right; width: 50%; margin: 2rem 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}

## Change Primary TV Volume

When the main TV (Sony) picture is normally turned off, you
have no idea what the sound system current volume level is. The
**tvpowered** script will display a notification on whatever
monitor you are currently working on when the volume is changed
using the TV's remote control.  The notification message includes
a progress bar from 0 (TV muted) to 100 (TV maximum volume).

If you are interested in the Bash code to make a progress bar,
the relevant code is below:

```bash
VolumeBar () {

    Bar=""                      # Progress Bar / Volume level
    Len=25                      # Length of Progress Bar / Volume level
    Div=4                       # Divisor into Volume for # of full blocks
    Fill="▒"                    # Fill background up to $Len
    Parts=8                     # Divisor into  Volume for # of part blocks
    # UTF-8 left blocks: 1, 1/8, 1/4, 3/8, 1/2, 5/8, 3/4, 7/8
    Arr=("█" "▏" "▎" "▍" "▌" "▋" "▊" "█")

    FullBlock=$((${1} / Div))   # Number of full blocks
    PartBlock=$((${1} % Parts)) # Size of partial block (array index)

    while [[ $FullBlock -gt 0 ]]; do
        Bar="$Bar${Arr[0]}"     # Add 1 full block into Progress Bar
        (( FullBlock-- ))       # Decrement full blocks counter
    done

    # If remainder zero no partial block, else append character from array
    if [[ $PartBlock -gt 0 ]]; then
        Bar="$Bar${Arr[$PartBlock]}"
    fi

    while [[ "${#Bar}" -lt "$Len" ]]; do
        Bar="$Bar$Fill"         # Pad Progress Bar with fill character
    done

} # VolumeBar
```

## **'tvpowered'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: tvpowered
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin) OR /mnt/e/bin/
#
# DESC: When TV is powered off automatically suspend the laptop.
# DATE: June 9, 2020.  Modified January 13, 2024.
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
#       Jan 09 2021: Improve performance and reduce system resources.
#       Jan 31 2021: Switch from /tmp to /run/user/1000 (RAM).
#       Mar 13 2023: New IP address 19 after power outage.
#       Mar 26 2023: Change volume partial UTF-8 ticks from 4 to 8.
#       Mar 28 2023: Change call to `pictureoff`
#       Mar 30 2023: Google TV to sleep (TV Remote Power Off).
#       May 28 2023: Turn on TVs and lights behind TVs on resume.
#       Jun 10 2023: Use nmap to verify TCL/Google TV on-line.
#       Jan 13 2024: Notes on TCL/Google TV debug options.

#       Sep 29 2024: Create TurnGtvOn() and TurnGtvOff()
#       Embed code - No longer requires light-tog and light-tog2 or
#       /etc/NetworkManager/dispatcher.d/pre-down.d/smartplug_off
#       Replace nmap with adb connect using timeout

# TODO: Plan iotc and iotd (Internet of Things Client/Daemon) in Python that
#       will turn devices on/off in parallel. iotc can communicate with iotd.
#       iotd runs with sudo powers.

# adb will hang if Google TV is off so use ping to see if TV is on:

# $ time sudo ping 192.168.0.17 -c1 -W1
# PING 192.168.0.17 (192.168.0.17) 56(84) bytes of data.
# 64 bytes from 192.168.0.17: icmp_seq=1 ttl=64 time=0.696 ms

# --- 192.168.0.17 ping statistics ---
# 1 packets transmitted, 1 received, 0% packet loss, time 0ms
# rtt min/avg/max/mdev = 0.696/0.696/0.696/0.000 ms

# real	0m0.007s
# user	0m0.000s
# sys	0m0.006s

# To prevent adb hanging, use linux timeout command:

# $ timeout 0.1 adb connect 192.168.0.17
# already connected to 192.168.0.17:5555


# Sources:

# https://gist.github.com/kalleth/e10e8f3b8b7cb1bac21463b0073a65fb#cec-sonycec
# https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/audio/v1_0/setAudioVolume/index.html
# https://developer.sony.com/develop/audio-control-api/get-started/http-example#tutorial-step-2
# https://en.wikipedia.org/wiki/CURL
# https://stackoverflow.com/questions/7172784/how-do-i-post-json-data-with-curl
# https://stackoverflow.com/questions/2829613/how-do-you-tell-if-a-string-contains-another-string-in-posix-sh

SCTL=suspend        # systemctl parameter: 'suspend' or 'poweroff'
STV_IP=192.168.0.19 # IP address for Sony TV on LAN
GTV_IP=192.168.0.17 # IP address for Google TV on LAN for Android Debug Bridge
GTV_Online=""       # Google TV is not turned on
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)
# TCL / Goggle TV MAC address for wake on lan. No effect if TV already on.
GTV_MAC="c0:79:82:41:2f:1f"
# 2024-09-30 - If problems revoke USB, turn off USB debugging, click build 7 times
# RSA key fingerprint: a7:ad:1f:82:66:16:15:eb:bc:54:85:56:ce:ad:d4:2b
# ~/.android/adbkey.pub - holds a lot more complicated key 700+ characters

# Nighttime bias lights
SLI_IP="192.168.0.15"  # Sony TV bias light
GLI_IP="192.168.0.20"  # TCL/Google TV bias light


# Must have curl package.
command -v curl >/dev/null 2>&1 || { echo >&2 \
        "'curl' package required but it is not installed.  Aborting."; \
        exit 2; }

# Must have notify-send from libnotify-bin package
command -v notify-send >/dev/null 2>&1 || { echo >&2 \
        "'libnotify-bin' package required but it is not installed.  Aborting."; \
        exit 3; }

# Must have adb (Android Debug Bridge) package
# TODO: Test when needed and skip code if not installed
command -v adb >/dev/null 2>&1 || { echo >&2 \
        "'adb' package required but it is not installed.  Aborting."; \
        exit 4; }

# Must have nmap package
#command -v nmap >/dev/null 2>&1 || { echo >&2 \
#        "'nmap' package required but it is not installed.  Aborting."; \
#        exit 5; }

cURLit () {

    # $1 = JSON String in pretty format converted to file for cURL --data.
    # $2 = Sony subsystem to talk to, eg accessControl, audio, system, etc.
    # 3  = variable name to receive reply from TV

    local TEMP Result ReturnState

    # Declare mathres as reference to argument 3 provided (Bash 4.3 or greater)
    declare -n Result=$3  # ERROR: declare: `': not a valid identifier

    # Create temporary file in RAM for curl command
    TEMP=$(mktemp --tmpdir=/run/user/1000 tvpowered.XXXXXXXX)
    echo "$1" > "$TEMP"

    # -s = silent
    Result=$(curl -s -H "Content-Type: application/json; charset=UTF-8" \
             -H "X-Auth-PSK: $PWRD" \
             --data @"$TEMP" \
             http://$STV_IP/sony/"$2")
    # echo "Result: $Result"    # Remove leading # for debugging
    ReturnState="$?"
    # TO-DO: check $? and if non-zero pop up dialog with $TEMP contents
    rm "$TEMP"

    # Test string
#curl -s -H "Content-Type: application/json; charset=UTF-8" -H "X-Auth-PSK: 123" --data "{ "method": "getPowerStatus", "id": 50, "params": [], "version": "1.0" }" http://192.168.0.16sony/system
} # cURLit

TurnGtvOn() {

    # TODO: WORK IN PROGRESS - Just notes as of 2024-09-29

# 1a) No adb (android debugging bridge) connection implies TV is turned off
#     Takes 10 seconds when no connection
  
#     adb connect "192.168.0.17"
# unable to connect to 192.168.0.17:5555

# 1b) Run `nmap` to test host up
#     Takes 3 seconds when no connection

#     nmap "192.168.0.17"
# Starting Nmap 7.01 ( https://nmap.org ) at 2024-09-29 09:45 MDT
# Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
# Nmap done: 1 IP address (0 hosts up) scanned in 3.03 seconds


# 2) Wake up google tv

#    wakeonlan c0:79:82:41:2f:1f
# Sending magic packet to 255.255.255.255:9 with c0:79:82:41:2f:1f

# 3) Connect adb (android debugging bridge)

#    adb connect "192.168.0.17"
# already connected to 192.168.0.17:5555

# 4) Run `nmap` to test host up
#    Takes .11 seconds when there IS a connection

#    nmap "192.168.0.17"
# Starting Nmap 7.01 ( https://nmap.org ) at 2024-09-28 14:07 MDT
# Nmap scan report for TCL.LAN (192.168.0.17)
# Host is up (0.0065s latency).
# Not shown: 995 closed ports
# PORT     STATE SERVICE
# 5555/tcp open  freeciv
# 8008/tcp open  http
# 8009/tcp open  ajp13
# 8443/tcp open  https-alt
# 9000/tcp open  cslistener
# Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds

# 5) Check if screen is on - https://stackoverflow.com/a/27406141/6929343
# If TV is turned off command hangs forever

#    adb shell dumpsys power | grep "Display Power" | cut -d'=' -f2
# Display Power: state=ON


# 6) Send signal to turn TV on

#    adb shell input keyevent 26

# >>>> Now Google TV is successfully turn on


# NOTE: adb will hang up when TV is turned off and adb server is still running:

#    adb devices
# List of devices attached
# 192.168.0.17:5555	device

#    adb shell dumpsys input_method
# ^C

#    adb shell dumpsys activity services
# ^C

#    adb kill-server && adb server

#    adb devices
# List of devices attached

#    adb shell dumpsys activity services
# error: device '(null)' not found


    # Must have adb (Android Debug Bridge) package
    command -v adb >/dev/null 2>&1 || { echo >&2 \
            "'adb' package required but it is not installed.  Skipping."; \
            return 4; }

    # Must have nmap package
    #command -v nmap >/dev/null 2>&1 || { echo >&2 \
    #        "'nmap' package required but it is not installed.  Skipping."; \
    #        return 5; }

} # TurnGtvOn

TurnGtvOff () {

    # Send signal to turn TV on:
    #    adb shell input keyevent 26

    # Must have adb (Android Debug Bridge) package
    command -v adb >/dev/null 2>&1 || { echo >&2 \
            "'adb' package required but it is not installed.  Skipping."; \
            return 4; }

    echo adb Power off TCL / Google TV on "$GTV_IP"
    adb shell input keyevent KEYCODE_SLEEP &  # Google TV off (remote power toggle)
    adb disconnect              # Will reconnect on resume

} # TurnGtvOff

TurnSonyOn () {

    local Reply ReturnState

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/setPowerStatus/index.html
    JSONstr='{
                 "method": "setPowerStatus",
                 "id": 55,
                 "params": [{"status": true}],
                 "version": "1.0"
             }'

    cURLit "$JSONstr" "system" Reply    # No $ for Reply variable! pass pointer
    ReturnState="$?"                    # Usually '6', not checked.

    #echo "ReturnState: $ReturnState Reply: $Reply"    # Remove # for debugging
    # Reply: { "result": [], "id": 55 }
    echo ReturnState from TurnSonyOn function: "$ReturnState"
    
} # TurnSonyOn

TurnSonyOff () {

    local Reply ReturnState

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/setPowerStatus/index.html
    JSONstr='{
                 "method": "setPowerStatus",
                 "id": 55,
                 "params": [{"status": false}],
                 "version": "1.0"
             }'

    cURLit "$JSONstr" "system" Reply    # No $ for Reply variable! pass pointer
    ReturnState="$?"                    # Usually '6', not checked.

    #echo "ReturnState: $ReturnState Reply: $Reply"    # Remove # for debugging
    # Reply: { "result": [], "id": 55 }
    echo ReturnState from TurnSonyOn function: "$ReturnState"
    
} # TurnSonyOff

ForceLight() {
    # $1 plugname
    # $2 "ON" or "OFF"
    # NOTE: hs100.sh must be installed for hs100 tp-link power plug.
    #       https://developer.gnome.org/NetworkManager/stable/NetworkManager.html

    # Must have hs100.sh
    command -v hs100.sh >/dev/null 2>&1 || { echo >&2 \
            "'hs100.sh' required but it is not installed.  Skipping."; \
            return 6; }

    PlugName="$1"  # Sony TV bias light or Google TV bias light
    Force="$2"  # "ON" or "OFF"
    TvName="$3"  # "Sony TV" or "Google TV"
    echo Set "$TvName" Bias Light "$PlugName" to "$Force".
    log Set "$TvName" Bias Light "$PlugName" to "$Force".

    status=$(hs100.sh -i "$PlugName" check | cut -f2)
    if [ -z "$status" ]; then
        echo "Error: 'hs100.sh -i $PlugName check' returned null for $TvName."
        log "Error hs100.sh 'check' returned null for IP $PlugName."
        return 7
    fi

    if [ $status == "$Force" ] ; then
        echo "$TvName" Bias Light "$PlugName" status is already "$status".
        log "$TvName" Bias Light "$PlugName" status is already "$status".
        return 0  # Nothing to do already correct state
    fi

    if [ $status == "OFF" ] ; then
        hs100.sh -i "$PlugName" on
    elif [ $status == "ON" ] ; then
        hs100.sh -i "$PlugName" off
    else
        echo Error hs100.sh not responding check connection and IP "$PlugName".
        log Error hs100.sh not responding check connection and IP "$PlugName".
    fi

} # ForceLight

TurnLightsOn() {
    # TODO: If sunlight == 100% return
    ForceLight "$SLI_IP" ON "Sony TV"
    ForceLight "$GLI_IP" ON "TCL / Google TV"
} # TurnLightsOn

TurnLightsOff() {
    ForceLight "$SLI_IP" OFF "Sony TV"
    ForceLight "$GLI_IP" OFF "TCL / Google TV"
} # TurnLightsOff

GtvPowerStatus () {
    # Return 0 if power on, 1 if power off
    local Reply

    Reply=$(timeout 0.1 adb connect "$GTV_IP")
    if [ -z "$Reply" ] ; then
        GTV_Online=""
        return 1  # Reply = <null> string
    else
        GTV_Online="host up"
        return 0  # Reply = "already connected to 192.168.0.17:5555"
    fi
} # GtvPowerStatus

SonyPowerStatus () {
    # Return 0 if power on, 1 if power off

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
    ReturnState="$?"                    # Usually '6', not checked.

    #echo "ReturnState: $ReturnState Reply: $Reply"    # Remove # for debugging
    # Reply: {"result":[{"status":"active"}],"id":50}
    #    or: {"result":[{"status":"standby"}],"id":50}

    # Does 'active' substring exist in TV's reply?
    [[ "${Reply#*active}" != "$Reply" ]] && return 0

    # TV is turned off (standby) or no network (blank)
    return 1
    
} # SonyPowerStatus


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


Bar=""                          # Global Volume Level bar

VolumeBar () {

    Bar=""                      # Progress Bar / Volume level
    Len=25                      # Length of Progress Bar / Volume level
    Div=4                       # Divisor into Volume for # of full blocks
    Fill="▒"                    # Fill background up to $Len
    Parts=8                     # Divisor into  Volume for # of part blocks
    # UTF-8 left blocks: 1, 1/8, 1/4, 3/8, 1/2, 5/8, 3/4, 7/8
    Arr=("█" "▏" "▎" "▍" "▌" "▋" "▊" "█")

    FullBlock=$((${1} / Div))   # Number of full blocks
    PartBlock=$((${1} % Parts)) # Size of partial block (array index)

    while [[ $FullBlock -gt 0 ]]; do
        Bar="$Bar${Arr[0]}"     # Add 1 full block into Progress Bar
        (( FullBlock-- ))       # Decrement full blocks counter
    done

    # If remainder zero no partial block, else append character from array
    if [[ $PartBlock -gt 0 ]]; then
        Bar="$Bar${Arr[$PartBlock]}"
    fi

    while [[ "${#Bar}" -lt "$Len" ]]; do
        Bar="$Bar$Fill"         # Pad Progress Bar with fill character
    done

} # VolumeBar


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

    Cnt=1
    while : ; do

        if SonyPowerStatus ; then
            log "TV is powered on. 'tvpowered' is now waiting for TV to power off."
            break
        else
            echo Waking up Sony TV - attempt number: "$Cnt"
            TurnSonyOn

            # Spam user every 60 seconds
            (( $(( Cnt % 60 )) == 0 )) && \
                notify-send --urgency=critical "tvpowered" \
                    -h string:x-canonical-private-synchronous:startup \
                    --icon=/usr/share/icons/gnome/48x48/devices/display.png \
                    "TV not communicating.\n Checking TV again..."
        fi
        sleep 1  # 2024-09-29 - shorten sleep from 3 to 1 second
        (( Cnt++ ))
    done
    
    #GTV_Online=$(nmap "$GTV_IP" | grep 'host up')
    GtvPowerStatus  # Set GTV_Online
    echo 'GTV_Online for Ten Minute Span Start:' "$GTV_Online"
    GetVolume
    LastVolume="$?"
    VolumeBar $LastVolume
    notify-send --urgency=critical "tvpowered" \
        --icon=/usr/share/icons/gnome/48x48/devices/display.png \
        "Fully activated.\n System will $SCTL when TV powered off. Volume: $LastVolume $Bar"

    # 2024-09-29 - Deprecate light-tog and light-tog2
    #if command -v light-tog >/dev/null 2>&1 ; then
    #    echo Turning on Sony TV Bias Light
    #    light-tog                   # Turn on bias light behind TV 1
    #fi
    #if command -v light-tog2 >/dev/null 2>&1 ; then
    #    echo Turning on TCL TV Bias Light
    #    light-tog2                  # Turn on bias light behind TV 2
    #fi
    TurnLightsOn  # Turn on Sony and Google TV's bias lights if < 100% sunlight

    Cnt=1
    if command -v wakeonlan >/dev/null 2>&1 ; then
        while [[ "$GTV_Online" == "" ]]; do
            echo Waking up TCL/Google TV - attempt number: "$Cnt"
            wakeonlan "$GTV_MAC"        # Turn on google TV
            #GTV_Online=$(nmap "$GTV_IP" | grep 'host up')
            # nmap run time takes 3 seconds fail and .1 second to succeed
            sleep 1
            GtvPowerStatus  # Takes .1 second using timeout adb connect
            (( Cnt++ ))
            if (( $Cnt >= 60 )); then
                echo "Attempted to wakeup TCL/Google TV for 1 minute. Skipping"
                log "Attempted to wakeup TCL/Google TV for 1 minute. Skipping"
                break
            fi
        done
        echo GTV_Online status: "$GTV_Online"
        log GTV_Online status: "$GTV_Online"
        # Reset GTV developer options switched ON:
        # 0. Remove existing authorized adb keys on device
        # 1. Enable developer options (click settings/build version - 7 times)
        # 2. USB Debugging
        # 3. Verify apps over USB
        # 4. Mobile data always active
        # 5. Select USB Configuration = "Charging"
        # 6. Turn off WiFi and only use ethernet?
        # GTV Network & Internet options switched ON:
        # 1. Network Standby
    fi
    if command -v adb >/dev/null 2>&1 ; then
        echo "Connecting to ADB (Android Debugging Bridge) on: $GTV_IP"
        log "Connecting to ADB (Android Debugging Bridge) on: $GTV_IP"
        # adb connect "$GTV_IP"  # Connect to Google TV.
        # 2024-09-29 - Already connected by GtvPowerStatus

        # Below tests work but add a second or, run forever if TV is off
        #ADB_AWAKE=$(adb shell dumpsys activity | grep mWakefulness | cut -d'=' -f2)
        #ADB_POWER=$(adb shell dumpsys power | grep "Display Power" | cut -d'=' -f2)
        #echo "GTV Status: ADB_AWAKE='$ADB_AWAKE' ADB_POWER='$ADB_POWER'"
        # 2024-09-29 - Instead of KEYCODE_WAKEUP can use 26 to toggle power
        adb shell input keyevent KEYCODE_WAKEUP &
    fi
    return 0

} # TenMinuteSpam

###################################
#            MAINLINE             #
###################################

Main () {

    echo "$0: tvpowered Initialization. Ensuring TV is powered on before starting."
    TenMinuteSpam
    echo "$0: Fully activated. Waiting for TV to power off and then will $SCTL."
    echo "$0: LastVolume: $LastVolume"

    Cnt=0
    FirstTime=true
    VolumeCnt=0             # TV Remote changed volume, so shorter sleep

    while : ; do

        if ! SonyPowerStatus; then

            # START FROM ABOVE: 
            # This was causing 2% CPU drain with Network Manager and
            # debus-daemon. So move from above SonyPowerStatus to below.

            # If network down then wait for it to come up. 
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

            # END FROM ABOVE: If network down then wait for it to come up


            state=$(nmcli -f STATE -t g)        # Network manager takes .5 CPU
            if [[ $state == disconnected ]] ; then
                echo "Unexpected Network disconnect, aborting suspend."
            else
                log "TV Powered off. 'systemctl $SCTL' being called."
                # /etc/NetworkManager/dispatcher.d/pre-down.d/smartplug_off

                TurnLightsOff  # Trun off Sony and Google TVs' bias lights

                if command -v adb >/dev/null 2>&1 ; then
                    # TODO: If TV already powered off skip step
                    echo ADB Power off TCL / Google TV on "$GTV_IP"
                    adb shell input keyevent KEYCODE_SLEEP  # Google TV off
                    #adb shell input keyevent 26 # Google TV off
                    adb disconnect              # Will reconnect on resume
                fi

                echo /etc/NetworkManager/dispatcher.d/pre-down.d/smartplug_off
                #echo "Turning off Sony TV just in case abnormal suspend."
                #TurnSonyOff
                systemctl "$SCTL"               # Turn computer off or sleep
                sleep 2  # Without sleep, TenMinuteSpam starts during suspend

                # systemctl will suspend. When resuming we hit next line
                log "System powered back up. Checking if TV powered on. '$0'."
                echo
                echo "System powered back up. Checking if TV powered on. '$0'."
                TenMinuteSpam                   # Wait for network connection
                # May 28, 2023 only turn picture off during work hours
                # pictureoff                    # Picture off energy saving
            fi
        fi

        GetVolume
        CurrVolume="$?"
        # echo CurrVolume: $CurrVolume LastVolume: $LastVolume

        if [[ "$CurrVolume" != "$LastVolume" ]] ; then
            # Make volume bar using progress bar methods
            VolumeBar $CurrVolume
            # Ask Ubuntu: https://askubuntu.com/a/871207/307523
            notify-send --urgency=critical "tvpowered" \
                -h string:x-canonical-private-synchronous:volume \
                --icon=/usr/share/icons/gnome/48x48/devices/audio-speakers.png \
                "Volume: $CurrVolume $Bar"
            LastVolume=$CurrVolume
            VolumeCnt=100  # For 1 second, faster checks for volume change
            # TODO: Process VolumeCnt internally in loop instead of larger loop
        fi

        if [[ $VolumeCnt > 0 ]]; then
            (( VolumeCnt-- ))
            SleepTime=.01
        else
            SleepTime=.75
        fi

        sleep $SleepTime

        # Next iteration
        FirstTime=false
    done

    exit 0

} # Main

Main "$@"

```

## Configuring Bash Script

There are five lines near the top of the script you need to
configure for your system:

```bash
SCTL=suspend        # systemctl parameter: 'suspend' or 'poweroff'
STV_IP=192.168.0.19 # IP address for Sony TV on LAN
GTV_IP=192.168.0.17 # IP address for Google TV on LAN for Android Debug Bridge
GTV_Online=""       # Google TV is not turned on
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)
# TCL / Goggle TV MAC address for wake on lan. No effect if TV already on.
GTV_MAC="c0:79:82:41:2f:1f"
# 2024-09-30 - If problems revoke USB, turn off USB debugging, click build 7 times
# RSA key fingerprint: a7:ad:1f:82:66:16:15:eb:bc:54:85:56:ce:ad:d4:2b
# ~/.android/adbkey.pub - holds a lot more complicated key 700+ characters

# Nighttime bias lights
SLI_IP="192.168.0.15"  # Sony TV bias light
GLI_IP="192.168.0.20"  # TCL/Google TV bias light
```

## Automatically Start Bash Script

In your `~/.config/autostart` directory create the file
`tvpowered.desktop`. The file needs to contain:

```bash
[Desktop Entry]
Type=Application
Exec=tvpowered
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name[en_CA]=tvpowered
Name=tvpowered
Comment[en_CA]=Powering off Sony TV suspends system
Comment=Powering off Sony TV suspends system
```

## **'tvpowered'** prerequisites

This program only works with Sony Bravia TVs. The Sony
REST API is required. For more details visit
[Sony Bravia IP Control 🔗](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html 
"Sony Bravia IP Control Overview Section"){:target="_blank"}

A LAN or Wi-Fi connection is required for both your TV
and your computer.

Linux is required and preferably the Ubuntu distribution. 
The following programs are required:

- `adb` - Linux package for powering off TCL / Google TV
- `curl` - Linux package for communicating with Sony TV
- `libnotify-bin` - Linux package For popup messages
- `wakeonlan` - Linux application to wakeup TCL / Google TV

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# **'smartplug_off'** Smart Plugs Turn Off Lights

{% include image.html src="/assets/img/iothings/conybrown-lights-off.gif"
   alt="conybrown-lights-off.gif"
   style="float: right; width: 40%; margin: .25rem 0px 1rem 1rem;
          text-align: center;"
   caption="Smart Plug Control"
%}

The `smartplug_off` bash script functionality is duplicated in
`tvpowered`when the computer system is shutdown or suspended.

The script needs to be created with `sudo` powers in the
`/etc/NetworkManager/dispatcher.d/pre-down.d/` directory.


## **'smartplug_off'** Key Features

Called by Network Manager when the network is going down.
The Network is always brought down when computer system is
shutting down or being suspended. This makes the Network
Manager a convenient way to shut off power to wall outlet
smart plugs behind the TV that control the nighttime 
bias lighting. 

## **'smartplug_off'** Bash Script

Below is the Bash script that needs to placed in the
`/etc/NetworkManager/dispatcher.d/pre-down.d/` directory:

```bash
#!/bin/bash

# NAME: smartplug_off
# PATH: /etc/NetworkManager/dispatcher.d/pre-down.d
# DESC: Turn off Smart Plug controlled lights behind TVs.
# DATE: March 7, 2020.  Modified: March 28, 2023.

# CALL: Called by Network Manager before going down. Network manager in turn
#       is called by systemd during suspend/hibernate/shutdown

# NOTE: hs100.sh must be installed for hs100 TP-Link power plug.
#       https://developer.gnome.org/NetworkManager/stable/NetworkManager.html

PlugName="192.168.0.15"  # Sony TV bias light

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    : # Nothing to do already off
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding check connection and IP "$PlugName".
fi


PlugName="192.168.0.17"  # Google TV bias light

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    : # Nothing to do already off
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding check connection and IP "$PlugName".
fi
```

## Configuring Bash Script

There are two lines you need to configure to your system:

```bash
PlugName="192.168.0.15"  # Sony TV bias light
...
PlugName="192.168.0.21"  # Google TV bias light
```

The first **'PlugName'** is 1/3rd of the way in the file.
The second **'PlugName'** is 2/3rds of the way in the file.

## **'smarplug_off'** Prerequisites

`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# **'sound'** Switch System Sound Output to HDMI

{% include image.html src="/assets/img/iothings/volume change.gif"
   alt="volume change.gif"
   style="float: right; width: 50%; margin: 2rem 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}


The **'sound'** bash script is called whenever the
computer system resumes from suspend / wakes from sleep.

The script needs to be created with `sudo` powers in the
`/lib/systemd/system-sleep/` directory.

## **'sound'** Key Features

A bug in Pulse Audio 8 sets the output sound device to
Laptop when system goes to sleep.
The system sound device doesn't default to HDMI
when the system wakes up / resumes from suspend.

To solve this problem the Pulse Audio settings are
modified.

## **'sound'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/sh

# NAME: sound
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically

# DESC: PulseAudo 8 sets sound to laptop when going to sleep.
#       This script sets sound back to TV.

# DATE: Sep 23 2016. Modified: Dec 19 2020.

# NOTE: Test psmouse for askubuntu.com "Touchpad not working after suspending laptop"

# UPDT: Dec 19 2020 - Comment out sleep commands to speedup suspend/resume.

# Aug 5, 2018  -    Turn off executition bit. As per AU turn off automatic switching:
# https://askubuntu.com/questions/1061414/how-to-disable-pulseaudio-automatic-device-switch/1061578#1061578
#                   Turn execution bit back on as there is no sound at all.
case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    # Place your pre suspend commands here, or `exit 0` if no pre suspend action required
    #    modprobe -r psmouse
    # sleep 1                       # Dec 19 2020 - Sleep slows down suspend.
    ;;
  post/*)
    echo "$0: Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` if no post suspend action required
    # sleep 2                       # Dec 19 2020 - Sleep slows down resume.
    # modprobe psmouse
    export PULSE_RUNTIME_PATH="/run/user/1000/pulse/"
    sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo
    ;;
esac
```

## Configuring Bash Script

There are two lines (near the bottom of the file) that you need to configure to your system:

```bash
export PULSE_RUNTIME_PATH="/run/user/1000/pulse/"
sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo
```

The first line shows your User Number which is usually "1000". 
The User Number is assigned when you sign on. If `1000` is 
not your user number, then change it appropriately.

On the second line, replace `rick` with your Username.

## **'sound'** Prerequisites

It is assumed you are running Pulse Audio in Linux. 

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Primary TV (Sony) and Second TV (TCL) Setup

Here is what the system setup looks like:

{% include image.html src="/assets/img/iothings/Multiple Monitors Manager.png"
   alt="Multiple Monitors Manager.png"
   style="float: none; width: 100%; margin: 0px 0px 1rem 0px;"
   caption="mmm Overview of Monitors"
%}

- Top Left is a Sony 50" Full HD Android TV. 
The picture is usually turned off to save power but the
sound system is always on. 
- Top Right is a TCL 43" 4K Google TV. 
Because it is 4K, it has size of four Full HD screens.
- Bottom Right is an Alienware 17" Full HD laptop screen. The 
laptop has two HDMI channels. One channel is powered by a 
nVidia GeForce GTX 970M. The other channel is powered by an
Intel Core i-7 GPU using ThunderBolt 3 USB-C to HDMI converter.


There are two lamps. One behind the Sony TV and one behind the 
TCL TV. Each lamp is controlled by a Kasa TP-Link Smart Plug.
The lamps serve as "bias lights" to reduce eyestrain at night.

The Sony TV has a sound system with subwoofer that is used
all the time. The Sony TV picture is only used occasionally
for viewing movies and YouTube. On the Sony TV you can see
that YouTube is currently running.

For your computer to communicate with the Sony TV the REST
API needs to be configured.  **tvpowered** uses the following
Sony Bravia TV REST API functions:

- [Power on Sony TV 🔗](https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/setPowerStatus/index.html 
"Power on Sony TV using REST API"){:target="_blank"}.
- [Get TV Power Status 🔗](https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerStatus/index.html 
"Get Sony TV power status using REST API"){:target="_blank"}.
- [Get TV Volume Level 🔗](https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/audio/v1_0/getVolumeInformation/index.html 
"Get Sony TV volume level using REST API"){:target="_blank"}.

The TCL Google TV is 4K which allows four screen sizes of full HD.
Consequently this TV is where most of the work is done. You
can comfortably have 10 windows open on a 4K screen. This is
also a good monitor for stashing all your Desktop Icons for
Shortcuts. The program `iconic` is used to move desktop icons
to the middle monitor.

To communicate with the Google TV you need to enable
Android Developer mode. See 
[How to Set Up and Use ADB on Android TV 🔗](https://www.makeuseof.com/how-to-use-adb-on-android-tv/ 
"Turn on Google TV ADB (Android Debug Bridge)"){:target="_blank"}.
On March 30, 2023 work has begun to automatically power
off the TCL Google (Secondary) TV when the Sony (Primary)
TV remote is powered off. Use:

- `sudo apt install abd` To install *Android Bridge Debug*
- `adb connect 192.168.0.21` to connect TV at IP address 21.
- `adb shell input keyevent 26` to toggle the TV on/off.

The Alienware 17" laptop screen is where the file manager,
web browser and music player playlist windows reside.

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# **'light-tog'** Toggle Light Behind Primary (Sony) TV

{% include image.html src="/assets/img/iothings/Toggle Desktop Shortcuts.png"
   alt="Toggle Desktop Shortcuts.png"
   style="float: right; width: 40%; margin: 1rem 0px 1rem 1rem;"
   caption="Sample Desktop Icons"
%}

The `light-tog` bash script is used whenever you
want to toggle the light behind your TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## **'light-tog'** Key Features

A light behind your TV is hard to reach. The **'light-tog'**
script makes it easy to turn the light off and on.

## **'light-tog'** Desktop Shortcut

Instead of typing **'light-tog'** in the command line, it
is convenient to have a Desktop Shortcut you can click.

In your `~/Desktop/` directory, create the file `light-tog.desktop`
containing:

```bash
[Desktop Entry]
Name=Toggle Sony TV Light
GenericName=Toggle Sony TV Light
Comment=Toggle Sony TV Light
Exec=light-tog
Icon=preferences-desktop-screensaver
Terminal=false
Type=Application
Categories=Application;
```

## **'light-tog'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: light-tog
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin) OR /mnt/e/bin/
# DESC: Flip light power for TV light
# DATE: January 20, 2020.  Modified: March 28, 2023.

# CALL: light-tog

# NOTE: hs100.sh must be installed for hs100 TP-Link power plug.

PlugName="192.168.0.15"  # hs100 Wi-Fi smart plug behind Sony TV.

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    hs100.sh -i "$PlugName" on
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding. Check Sony TV smartplug and IP "$PlugName".
fi
```

## Configuring Bash Script

There is one line you need to configure to your system:

```bash
PlugName="192.168.0.15"  # hs100 Wi-Fi smart plug behind Sony TV.
```

Change the IP address to what your network assigned it. See the
`ssh-setup` script output. For example:

```text
==========  nmap -sn 192.168.0/24  ============================================

hitronhub.home (192.168.0.1) (0.0012s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
SONY.light (192.168.0.15) (0.010s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
TCL.LAN (192.168.0.17) (-0.100s latency). MAC: C0:79:82:41:2F:1F (Unknown)
SONY.LAN (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
TCL.light (192.168.0.21) (0.010s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
Router.Login (192.168.0.254) (-0.087s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## **'light-tog'** Prerequisites


`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# **'light-tog2'** Toggle Light Behind Second TV

{% include image.html src="/assets/img/iothings/Light Off On.gif"
   alt="Light Off On.gif"
   style="float: right; width: 40%; margin: 1rem 0px 1rem 1rem;
          text-align: center;"
   caption="Smart Plug Controls Light"
%}

The **'light-tog2'** bash script is called whenever you
want to toggle the light behind your second TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## **'light-tog2'** Key Features

The light behind your second TV is hard to reach. 
The **'light-tog2'** script makes it easy to turn the light 
off and on.

## **'light-tog2'** Desktop Shortcut

Instead of typing `light-tog2` in the command line, it
is convenient to have a Desktop Shortcut you can click.

In your `~/Desktop/` directory, create the file `light-tog2.desktop`
containing:

```bash
[Desktop Entry]
Name=Toggle TCL TV Light
GenericName=Toggle TCL TV Light
Comment=Toggle TCL TV Light
Exec=light-tog2
Icon=preferences-desktop-screensaver
Terminal=false
Type=Application
Categories=Application;
```

## **'light-tog2'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: light-tog2
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin) OR /mnt/e/bin/
# DESC: Flip power for Kitchen light behind TCL TV
# DATE: September 4, 2022.  Modified: March 28, 2023.

# CALL: light-tog2

# NOTE: hs100.sh must be installed for hs100 TP-Link power plug.

# UPDT: September 29, 2022. After power outage IP changed from 20 to 19.
#       March 14, 2023. After power outage IP changed from 19 to 20.
#       March 23, 2023. After power outage IP changed from 20 to 17.
#       March 25, 2023. Name change from flipkitchen to fliptv2.
#       March 27, 2023. Name change from fliptv2 to light-tog2.

PlugName="192.168.0.21"  # hs103 Wi-Fi smart plug in kitchen behind TCL TV.

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    hs100.sh -i "$PlugName" on
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding. Check TCL TV smartplug and IP "$PlugName".
fi
```

## Configuring Bash Script

There is one line you need to configure to your system:

```bash
PlugName="192.168.0.21"  # hs103 Wi-Fi smart plug in kitchen behind TCL TV.
```

Change the IP address to what your network assigned it. See the
`ssh-setup` script output. For example:

```text
==========  nmap -sn 192.168.0/24  ============================================

hitronhub.home (192.168.0.1) (0.0012s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
SONY.light (192.168.0.15) (0.010s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
TCL.LAN (192.168.0.17) (-0.100s latency). MAC: C0:79:82:41:2F:1F (Unknown)
SONY.LAN (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
TCL.light (192.168.0.21) (0.010s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
Router.Login (192.168.0.254) (-0.087s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## **'light-tog2'** Prerequisites


`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>


# **'picturetog'** Toggle Sony TV picture Off and On

The `picturetog` bash script toggles the Sony TV picture
(screen) off and on. When the picture is turned off this
is known as "Power Savings Mode On". The reason being
that 100 watts of power is saved. The sound system and
all other TV functions like volume change still work.

## **'picturetog'** Key Features

When your system is turned on or you resume from suspend /
wake from sleep the Sony TV (Primary) picture is turned
off automatically. The `picturetog` script is used to turn
the Sony TV picture back on so you can watch a movie or
whatever.

## **'picturetog'** Desktop Shortcut

Instead of typing **picturetog** in the command line, it
is convenient to have a Desktop Shortcut you can click.

In your `~/Desktop/` directory, create the file 
`picturetog.desktop` containing:

```bash
[Desktop Entry]
Name=Toggle Sony TV Picture
GenericName=Toggle Sony TV Picture
Comment=Toggle Sony TV Picture
Exec=picturetog
Icon=preferences-desktop-display
Terminal=false
Type=Application
Categories=Application;
```

## **'picturetog'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: picturetog
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin)
# DESC: Toggle Sony Bravia TV picture off/on but leave on sound.
# DATE: March 7, 2020. Modified March 28, 2023.

# CALL: Called by command line or Desktop Application Shortcut Icon.

# NOTE: A Sony Bravia TV or Sony Professional Display is required.
#       In Sony documentation (links below) turning the picture off
#       is called "Turning Power Savings Mode On". About 100 watts is saved.
#       https://pro-bravia.sony.net/develop/integrate/rest-api/spec/
#       https://developer.gnome.org/NetworkManager/stable/NetworkManager.html

# UPDT: March 23, 2023. Change Sony TV IP address from 16 to 19
#       March 28, 2023. Update documentation.

IP=192.168.0.19  # LAN IP address for Sony Bravia TV
PWRD=123         # Sony Bravia TV Password for Communicaations

cURLit () {

    # $1 = JSON String, $2 = Sony subsystem to talk to, eg accessControl,
    #   audio, system
    
    # Returns $Retn currently must be defined as global variable.

    # Create temporary file in RAM for curl command
    TEMP=$(mktemp --tmpdir json.XXXXXXXX)
    echo "$1" > "$TEMP"

    # -s = silent
    Retn=$(curl -s -H "Content-Type: application/json; charset=UTF-8" \
         -H "X-Auth-PSK: $PWRD" \
         --data @"$TEMP" \
         http://$IP/sony/"$2")

    # TO-DO: check $? and if non-zero pop up dialog with $TEMP contents
    rm "$TEMP"

} # cURLit

GetPowerStatus () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerStatus/index.html
    JSONstr='{
                "method": "getPowerStatus",
                "id": 50,
                "params": [],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # Retn: {"result":[{"status":"active"}],"id":50}
    #   or: {"result":[{"status":"standby"}],"id":50}
    [[ "${Retn#*active}" != "$Retn" ]] && return 0

    # TV is turned off
    # Might want timer tests to make sure we aren't repeatedly turning off
    return 1

} # GetPowerStatus

GetPowerSavingMode () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerSavingMode/index.html
    JSONstr='{
                "method": "getPowerSavingMode",
                "id": 51,
                "params": [],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # "off" - Power saving mode is disabled.
    # "low" - Power saving mode is enabled at a low level.
    # "high" - Power saving mode is enabled at a high level.
    # "pictureOff" - Power saving mode is enabled with the panel output off.

    echo $Retn
    return 0

} # GetPowerSavingMode

SetPowerSavingMode () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/setPowerSavingMode/index.html
    JSONstr='{
                "method": "setPowerSavingMode",
                "id": 52,
                "params": [{"mode": "'"${1}"'"}],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # "off" - Power saving mode is disabled.
    # "low" - Power saving mode is enabled at a low level.
    # "high" - Power saving mode is enabled at a high level.
    # "pictureOff" - Power saving mode is enabled with the panel output off.

    echo $Retn
    return 0

} # SetPowerSavingMode


###################################
#            MAINLINE             #
###################################

# Get current Power Saving Setting and toggle it.

if GetPowerStatus ; then
    GetPowerSavingMode
    # Try to strip out word "off" in current power saving status
    if [[ "${Retn#*off}" != "$Retn" ]] ; then
        # Current power saving mode is "off"
        SetPowerSavingMode "pictureOff"
    else
        # Current power saving mode is "pictureOff"
        SetPowerSavingMode "off"
    fi

fi
```

## Configuring Bash Script

There is one line you need to configure to your system:

```bash
IP=192.168.0.19  # LAN for Sony
```

Change the IP address to what your network assigned it. See the
`ssh-setup` script output. For example:

```text
==========  nmap -sn 192.168.0/24  ============================================

hitronhub.home (192.168.0.1) (0.0012s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
SONY.light (192.168.0.15) (0.010s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
TCL.LAN (192.168.0.17) (-0.100s latency). MAC: C0:79:82:41:2F:1F (Unknown)
SONY.LAN (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
TCL.light (192.168.0.21) (0.010s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
Router.Login (192.168.0.254) (-0.087s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## **'picturetog'** Prerequisites

A Sony Bravia TV or Professional Display is required. The
Linux package `curl` must also be installed.

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# **'pictureoff'** Turn Off Sony TV Picture

{% include image.html src="/assets/img/iothings/tv picture off.gif"
   alt="tv remote off.gif"
   style="float: right; width: 50%; margin: .25rem 0px 1rem 1rem;"
   caption="Turn Sony Bravia TV Picture Off"
%}

The `pictureoff` bash script is called when the computer
is turned on, rebooted or resumes from suspend (wakes from sleep).

## **'pictureoff'** Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: pictureoff
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin) OR /mnt/e/bin/
# DESC: Toggle Sony Bravia TV picture off/on but leave on sound.
# DATE: March 7, 2020. Modified March 28, 2023.

# CALL: Called by command line or .../bin/tvpowered

# NOTE: A Sony Bravia TV or Sony Professional Display is required.
#       In Sony documentation (links below) turning the picture off
#       is called "Turning Power Savings Mode On". About 100 watts is saved.
#       https://pro-bravia.sony.net/develop/integrate/rest-api/spec/
#       https://developer.gnome.org/NetworkManager/stable/NetworkManager.html

# UPDT: March 23, 2023. Change Sony TV IP address from 16 to 19
#       March 28, 2023. Update documentation.

IP=192.168.0.19  # LAN IP address for Sony Bravia TV
PWRD=123         # Sony Bravia TV Password for Communications

cURLit () {

    # $1 = JSON String, $2 = Sony subsystem to talk to, eg accessControl,
    #   audio, system
    
    # Returns $Retn currently must be defined as global variable.

    # Create temporary file in RAM for curl command
    TEMP=$(mktemp --tmpdir json.XXXXXXXX)
    echo "$1" > "$TEMP"

    # -s = silent
    Retn=$(curl -s -H "Content-Type: application/json; charset=UTF-8" \
         -H "X-Auth-PSK: $PWRD" \
         --data @"$TEMP" \
         http://$IP/sony/"$2")

    # TO-DO: check $? and if non-zero pop up dialog with $TEMP contents
    rm "$TEMP"

} # cURLit

GetPowerStatus () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerStatus/index.html
    JSONstr='{
                "method": "getPowerStatus",
                "id": 50,
                "params": [],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # Retn: {"result":[{"status":"active"}],"id":50}
    #   or: {"result":[{"status":"standby"}],"id":50}
    [[ "${Retn#*active}" != "$Retn" ]] && return 0

    # TV is turned off
    # Might want timer tests to make sure we aren't repeatedly turning off
    return 1

} # GetPowerStatus

GetPowerSavingMode () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/getPowerSavingMode/index.html
    JSONstr='{
                "method": "getPowerSavingMode",
                "id": 51,
                "params": [],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # "off" - Power saving mode is disabled.
    # "low" - Power saving mode is enabled at a low level.
    # "high" - Power saving mode is enabled at a high level.
    # "pictureOff" - Power saving mode is enabled with the panel output off.

    echo $Retn
    return 0

} # GetPowerSavingMode

SetPowerSavingMode () {

    # Copy and paste JSON strings from Sony website: 
    # https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/system/v1_0/setPowerSavingMode/index.html
    JSONstr='{
                "method": "setPowerSavingMode",
                "id": 52,
                "params": [{"mode": "'"${1}"'"}],
                "version": "1.0"
             }'

    # TO-DO: Make Retn passed parm instead of global var
    Retn=""
    # Then pass string to cURL for execution
    cURLit "$JSONstr" "system"

    # "off" - Power saving mode is disabled.
    # "low" - Power saving mode is enabled at a low level.
    # "high" - Power saving mode is enabled at a high level.
    # "pictureOff" - Power saving mode is enabled with the panel output off.

    echo $Retn
    return 0

} # SetPowerSavingMode


###################################
#            MAINLINE             #
###################################

# Get current Power Saving Setting and turn off picture.

if GetPowerStatus ; then
    SetPowerSavingMode "pictureOff"
    GetPowerSavingMode
fi
```

## Configuring Bash Script

There is one line you need to configure to your system:

```bash
IP=192.168.0.19  # LAN IP address for Sony Bravia TV
```

Change the IP address to what your network assigned it. See the
`ssh-setup` script output. For example:

```text
==========  nmap -sn 192.168.0/24  ============================================

hitronhub.home (192.168.0.1) (0.0012s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
SONY.light (192.168.0.15) (0.010s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
TCL.LAN (192.168.0.17) (-0.100s latency). MAC: C0:79:82:41:2F:1F (Unknown)
SONY.LAN (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
TCL.light (192.168.0.21) (0.010s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
Router.Login (192.168.0.254) (-0.087s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## **'pictureoff'** Prerequisites

A Sony Bravia TV or Professional Display is required. The
Linux package `curl` must also be installed. 

On your Sony TV go to "Settings", "Network", and then go to:

- Remote device settings section, turn on the
"Control Remotely" option. 
- Home Network, IP control section, set Authentication 
to "Normal and Pre-Shared Key". Also turn on the
"Simple IP control" option.

Do not try to reconfigure your Sony TV while `tvpowered`
script is already running. Your desktop manager may not
see the Sony TV as powered up and will rearrange windows.

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# TP-Link Wi-Fi Smart Plug **'hs100.sh'** Script

{% include image.html src="/assets/img/iothings/CNET Setup Smart Plug.jpg"
   alt="CNET Setup Smart Plug.jpg"
   style="float: right; width: 50%; margin: .25rem 0px 1rem 1rem;"
   caption="How to setup TP-Link / Kasa Smart Plug"
%}

The [CNET Tutorial 🔗](https://www.cnet.com/home/smart-home/set-up-your-new-smart-plug-in-minutes-heres-your-step-by-step-guide/
"Set up your new smart plug in minutes. Here's your step-by-step guide "){:target="_blank"}
will help you physically install your Smart Plug and connect it to your
network.

The bash script
`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

The Bash Script is listed below but you must visit GitHub Page
to get instructions.

## **'hs100.sh'** Bash Script

```bash
#!/bin/bash

set -o errexit

(( "$DEBUG" )) && set -o xtrace

here=$(cd $(dirname $BASH_SOURCE[0]); echo $PWD)

##
#  Switch the TP-LINK HS100 wlan smart plug on and off, query for status
#  Tested with firmware 1.0.8
#
#  Credits to Thomas Baust for the query/status/emeter commands
#
#  Author George Georgovassilis, https://github.com/ggeorgovassilis/linuxscripts

# encoded (the reverse of decode) commands to send to the plug

# encoded {"system":{"set_relay_state":{"state":1}}}
payload_on="AAAAKtDygfiL/5r31e+UtsWg1Iv5nPCR6LfEsNGlwOLYo4HyhueT9tTu36Lfog=="

# encoded {"system":{"set_relay_state":{"state":0}}}
payload_off="AAAAKtDygfiL/5r31e+UtsWg1Iv5nPCR6LfEsNGlwOLYo4HyhueT9tTu3qPeow=="

# encoded { "system":{ "get_sysinfo":null } }
payload_query="AAAAI9Dw0qHYq9+61/XPtJS20bTAn+yV5o/hh+jK8J7rh+vLtpbr"

# the encoded request { "emeter":{ "get_realtime":null } }
payload_emeter="AAAAJNDw0rfav8uu3P7Ev5+92r/LlOaD4o76k/6buYPtmPSYuMXlmA=="

# BSD base64 decode on osx has different options
# BSD od (octal dump) on osx has different options
od_offset=4
# BSD netcat on osx has different options
nc_timeout=2
NCOPTS=""
#NCOPTS+='-v' # verbose
case $OSTYPE in
   darwin*)
      BASE64DEC="-D"
      ODOPTS="-j $od_offset -A n -t u1"
      NCOPTS+=" -G $nc_timeout"
      ;;
   linux*)
      BASE64DEC="-d"
      ODOPTS="--skip-bytes=$od_offset --address-radix=n -t u1 --width=9999"
      NCOPTS+=" -w $nc_timeout"
      ;;
esac


# tools

error(){
   echo >&2 "$@"
   exit 2
}

quiet(){
   $@ >/dev/null 2>&1
}

mac_from_ip()
{
    # if you've contacted an IP recently, the arp cache has juicy info
    local ip=$1
    mac=$(arp -a \
            | grep "($ip)" \
            | egrep -o '(([0-9a-fA-F]{1,2}:){5}[0-9a-fA-F]{1,2})' )
    [ -z "$mac" ] && { echo 2>&1 "arp didn't find a MAC for $ip!"; return 1; }
    echo $mac
}

unique_hostname()
{
    # given a prefix and a MAC for a host, construct a unique name for the host
    local prefix=$1;    [ -n $prefix ] || return 1
    local mac=$2;       [ -n $mac ] || return 1

    # use the first 7 characters of the shasum as unique ID
    hash=$(echo $mac | shasum)
    hs100host=hs100${hash:0:7}
    echo $hs100host
}

host_entry()
{
    host=$1
    ip=$2
    printf "${ip}\t${host}\n" >> /etc/hosts
    echo plug $host has ip $ip
}

my_plugs()
{
    cat /etc/hosts | grep hs100 | awk '{ print $2 }'
}

check_dependency()
{
    dep=$1; shift
    message=$@
    quiet command -v "$dep" || error "$message"
}

check_dependencies() {
    check_dependency nc \
       "The nc programme for sending data over the network isn't" \
       "in the path, communication with the plug will fail"
    check_dependency base64 \
       "The base64 programme for decoding base64 encoded strings isn't" \
       "info the path, decoding of payloads will fail"
    check_dependency od \
        "The od programme for converting binary data to numbers isn't" \
        "in the path, the status and emeter commands will fail"
    check_dependency nmap \
        "The nmap programme for mapping networks isn't"\
        "in the path, the discover command will fail"
    check_dependency shasum \
        "The shasum programme for hashing strings isn't"\
        "in the path, the sudo discover command will fail"
    check_dependency arp \
        "The arp programme to access Address Resolution Protocol cache isn't"\
        "in the path, the sudo discover command will fail"
}

usage() {
   echo "Usage: $0 [-i IP] [-p PORT] COMMAND"
   echo "where COMMAND is one of: ${commands[@]}"
   exit 1
}

check_arg() {
   name="$1"
   value="$2"
   if [ -z "$value" ]; then
      echo "missing argument $name"
      usage
   fi
}

# Check for a single string in a list of space-separated strings.
# e.g. has "foo" "foo bar baz" is true, but has "f" "foo bar baz" is not.
# from https://chromium.googlesource.com/chromiumos/platform/crosutils/+/master/common.sh
has()
{ [[ " ${*:2} " == *" $1 "* ]]; }

check_command()
{ has "$1" "$commands"; }

send_to_plug() {
   ip="$1"
   port="$2"
   payload="$3"
   if ! echo -n "$payload" | base64 ${BASE64DEC} | nc $NCOPTS $ip $port
   then
      echo couldn''t connect to $ip:$port, nc failed with exit code $?
   fi
}

decode(){
   code=171
   input_num=`od $ODOPTS`
   IFS=' ' read -r -a array <<< "$input_num"
   args_for_printf=""
   for element in "${array[@]}"
   do
      output=$(( $element ^ $code ))
      args_for_printf="$args_for_printf\x$(printf %x $output)"
      code=$element
   done
   printf "$args_for_printf"
}

pretty_json()
{
    # read from stdin
    if quiet command -v python
    then
         python -m json.tool
    else
         cat
         echo
    fi
}

query_plug(){
   payload=$1
   check_dependency od \
       "The od programme for converting binary data to numbers isn't" \
       "in the path, the status and emeter commands will fail"
   check_arg "ip" $plugs
   check_arg "port" $port
   for ip in ${plugs[@]}
   do
        send_to_plug $ip $port "$payload" | decode | pretty_json
   done
}

# plug commands
cmd_discover(){
    check_arg "port" $port
    check_dependency nmap \
        "The nmap programme for mapping networks isn't"\
        "in the path, the discover command will fail"
    myip="`${here}/myip.sh`"
    subnet=$(echo $myip | egrep -o '([0-9]{1,3}\.){3}')
    subnet=${subnet}0-255
    declare -a hs100ip
    hs100ip=( $(nmap -Pn -p ${port} --open ${subnet} \
                | grep 'Nmap scan report for' \
                | egrep -o '(([0-9]{1,3}\.){3}[0-9]{1,3})' ) \
            ) \
        || error "Could not find any hs100 plugs"

    # if we can't write this to /etc/hosts, echo what we found and quit
    if ! [ -w /etc/hosts ]
    then
        echo HS100 plugs found: ${hs100ip[@]}
        return 0
    fi

    check_dependency shasum \
        "The shasum programme for hashing strings isn't"\
        "in the path, the sudo discover command will fail"
    check_dependency arp \
        "The arp programme to access Address Resolution Protocol cache isn't"\
        "in the path, the sudo discover command will fail"

    # remove existing hs100* hosts entries
    sed -i.bak /hs100/d /etc/hosts

    if [[ ${#hs100ip[@]} = 1 ]]
    then
        host_entry hs100 $hs100ip
        return 0
    fi

    # multiple HS100 plugs on the network, hash MAC address for unique hostname
    for ip in ${hs100ip[@]}
    do
        # since we just hit it with nmap, it should be in the arp cache
        mac=`mac_from_ip $ip`
        hs100host=`unique_hostname hs100 $mac`
        host_entry $hs100host $ip
    done
    return 0
}

cmd_print_plug_relay_state(){
   check_arg "ip" $plugs
   check_arg "port" $port
   for ip in ${plugs[@]}
   do
       printf "$ip\t"
       output=`send_to_plug $ip $port "$payload_query" \
               | decode \
               | egrep -o 'relay_state":[0,1]' \
               | egrep -o '[0,1]'`
       if (( output == 0 )); then
         echo OFF
       elif (( output == 1 )); then
         echo ON
       else
         echo Couldn''t understand plug response $output
       fi
   done
}

cmd_print_plug_status(){
   query_plug "$payload_query"
}

cmd_print_plug_consumption(){
   query_plug "$payload_emeter"
}

cmd_switch_on(){
   check_arg "ip" $plugs
   check_arg "port" $port
   for ip in ${plugs[@]}
   do
      send_to_plug $ip $port $payload_on > /dev/null
   done
}

cmd_switch_off(){
   check_arg "ip" $plugs
   check_arg "port" $port
   for ip in ${plugs[@]}
   do
       send_to_plug $ip $port $payload_off > /dev/null
   done
}

commands=" on off check status emeter discover list "

# run the Main progamme, if we are not being sourced
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then

# process args with getopt(1). See `man getopt`
args=`getopt qvi:p: $*` || { usage; exit 1; }
set -- $args

declare -a plugs;

for i #in $@
do
    case "$i" in
    -q) opt_quiet=yes; shift;;
    -v) set -o xtrace; shift;;
    -i) plugs=$2; shift; shift;;
    -p) port=$2; shift; shift;;
    --) shift; break;;
    #*)  error "Getopt broke! Found $i"
    esac
done

: ${plugs=`my_plugs`}
: ${port=9999}
cmd=$1

#check_dependencies

check_dependency nc \
   "The nc programme for sending data over the network isn't" \
   "in the path, communication with the plug will fail"
check_dependency base64 \
   "The base64 programme for decoding base64 encoded strings isn't" \
   "info the path, decoding of payloads will fail"

check_arg "command" $cmd
check_command $cmd

case "$cmd" in
  discover) cmd_discover;;
  list)     plugs=`my_plugs`; for p in ${plugs[@]}; do echo $p; done;;
  on)       cmd_switch_on;;
  off)      cmd_switch_off;;
  check)    cmd_print_plug_relay_state;;
  status)   cmd_print_plug_status;;
  emeter)   cmd_print_plug_consumption;;
  *)        usage;;
esac

fi # end main program
```

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# `nvhda` Enable nVidia GeForce GTX 970M Sound

Using DKMS (Dynamic Kernel Management System) the `nvhda`
C program is automatically compiled with each kernel update.

[`nvhda` - Install using DKMS 🔗](https://github.com/hhfeuer/nvhda#install-using-dkms
"GitHub instructions for installing `nvhda`"){:target="_blank"}

There is a [nVidia GTX 970M Bug Report 🔗](https://bugs.freedesktop.org/show_bug.cgi?id=75985#c121
"TLP might be powering off nVidia Sound Circuit"){:target="_blank"}
that suggests problems may be caused by Laptop Management Package
called `TLP`.

## `nvhda` Key Features

Due to a bug between nVidia and Linux (perhaps caused by TLP)
there is no sound when the system is powered up.

To solve this problem the `nvhda` C program is used. Whenever
you install a new Linux Kernel version, the program is
automatically recompiled by DKMS.

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr12" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr14" class="hdr-btn">Skip</a></div>

# Discover IP addresses With `ssh-setup`

``` bash
#!/bin/bash

# NAME: ssh-setup
# PATH: /mnt/e/bin
# DESC: Display network details needed to setup SSH or debug after setup.
# CALL: Called from terminal with `sudo` permissions.
# DATE: June 18, 2020. Modified: June 23, 2020.

# NOTE: When debugging script place terminal results in appropriate sections.

# UPDT: Jun 23 2020: Change 'sshd.config' to 'ssh_config'. Add route and arp.

# From: https://askubuntu.com/questions/628383/output-only-mac-address-on-ubuntu#comment892989_628387

export LANG=C       # Force english names for sed search. For example in
                    # another language HWaddr is direcciónHW

if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo >&2 "'$(basename $0)' must be called with 'sudo'"
    exit 1
fi

# Must have the nmap package.
command -v nmap >/dev/null 2>&1 || { echo >&2 \
        "'nmap' package required but it is not installed.  Aborting."; \
        exit 2; }

# Must have the lshw package.
command -v lshw >/dev/null 2>&1 || { echo >&2 \
        "'lshw' package required but it is not installed.  Aborting."; \
        exit 3; }

# OTHER PACKAGES CONSIDERED AND REJECTED:

# $ network-test
# The program 'network-test' is currently not installed. You can install it
# by typing: 'sudo apt install ifupdown-extra'
# Seems kind of lame and has md5 checksum error.

# $ netstat | wc -l
# 824
# Way to many lines to make use of. Might be good to track down specific addy.

# $ iwconfig
# wlp60s0   IEEE 802.11  ESSID:"XXXXXXXXXXXXXX"  
#           Mode:Managed  Frequency:5.22 GHz  Access Point: AE:20:2E:CC:94:50   
#           Bit Rate=6 Mb/s   Tx-Power=23 dBm
# Reveals router name (EESID) which is bad for neighbours to know us by....

echo
echo "Gathering system details - Will take 15 - 30 seconds"

Display () {

# $1 = command that was run (sometimes abridged version if lots of seds)
# $2 = output from command

echo " "
String1="==========  $1  "
String2="====================================================================="
String3="$String1$String2"
echo "${String3:0:79}"
echo " "
echo "$2"

} # Display

# What systemd network services are running?
NET_Service="" # Default no directory
NET_Service=$(systemctl status net*)
Display 'systemctl status net*' "$NET_Service"

: <<'END'
/* ------------ RESULTS -------------------------------------------------------

(ABRIDGED)

* network-online.target - Network is Online
* networking.service - Raise network interfaces
* network.target - Network
* network-pre.target - Network (Pre)
 
---------------------------------------------------------------------------- */
END
# Is SSH systemd service (aliased as sshd) running?
SSH_Service="" # Default no directory
SSH_Service=$(systemctl status ssh)
Display 'systemctl status ssh' "$SSH_Service"

: <<'END'
/* ------------ RESULTS -------------------------------------------------------

● ssh.service
   Loaded: not-found (Reason: No such file or directory)
   Active: inactive (dead)

---------------------------------------------------------------------------- */
END

# What SSH keys are already setup?
SSH_Keys="" # Default no directory
[[ -d ~/.ssh ]] && SSH_Keys=$(ls -l ~/.ssh | \
                              grep -v ^total)
                              # remove total line
Display '[[ -d ~/.ssh ]] && SSH_Keys=$(ls -l ~/.ssh)' "$SSH_Keys"

: <<'END'
/* ------------ RESULTS -------------------------------------------------------

id_rsa
id_rsa.pub
known_hosts

---------------------------------------------------------------------------- */
END

# What SSH packages are currently installed?
SSH_Installed="" # Default no SSH packages
SSH_Installed=$(apt list 2>/dev/null | grep ssh | grep installed | \
                     sed 's/ \[installed.*//')
                     # remove [installed] & [installed, automatic] strings

Display "apt list 2>/dev/null | grep ssh | grep installed" "$SSH_Installed"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

libssh-4/xenial-updates,xenial-security,now 0.6.3-4.3ubuntu0.5 amd64
libssh-gcrypt-4/xenial-updates,xenial-security,now 0.6.3-4.3ubuntu0.5 amd64
libssh2-1/xenial-updates,xenial-security,now 1.5.0-2ubuntu0.1 amd64
openssh-client/xenial-updates,xenial-security,now 1:7.2p2-4ubuntu2.8 amd64
sshfs/xenial,now 2.5-1ubuntu1 amd64

---------------------------------------------------------------------------- */
END

# What is the SSH configuration?
SSH_Config="" # Default no SSH packages
[[ -f /etc/ssh/ssh_config ]] && SSH_Config=$(cat /etc/ssh/ssh_config)
Display "cat /etc/ssh/ssh_config" "$SSH_Config"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------
---------------------------------------------------------------------------- */
END

# What IP address are on this machine?
LOCAL_IP_Addresses="" # Default machine has no network cards
LOCAL_IP_Addresses=$(ifconfig -a | grep -v ^' ' -A1 | \
                     grep -v '\-\-')
                     # grep to -v to remove extra lines
Display "ifconfig -a | grep -v ^' ' -A1" "$LOCAL_IP_Addresses"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

enp59s0   Link encap:Ethernet  HWaddr 28:f1:0e:2a:1a:ed  
          inet addr:192.168.0.12  Bcast:192.168.0.255  Mask:255.255.255.0

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0

wlp60s0   Link encap:Ethernet  HWaddr 9c:b6:d0:10:37:f7  
          inet addr:192.168.0.10  Bcast:192.168.0.255  Mask:255.255.255.0
 
---------------------------------------------------------------------------- */
END

# What IP address (potential servers/clients) are visible on network?
NET_IP_Addresses="" # Default LAN is not running
NET_IP_Addresses=$(nmap -sn 192.168.0/24 | \
                   sed '/^Starting Nmap/d' | \
                   sed '/^Nmap done/d' | \
                   sed -z 's/Nmap scan report for //g' | \
                   sed -z 's/\nHost is up\./ LOCAL NETWORK CARD/g' | \
                   sed -z 's/\nHost is up / /g' | \
                   sed -z 's/\nMAC Address: / MAC: /g' )
#                   sed 's/MAC.*(/(/g') # MAC makes line too long
                   # Use sed to remove line breaks making results lengthy
Display "nmap -sn 192.168.0/24" "$NET_IP_Addresses"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

hitronhub.home (192.168.0.1) (0.0011s latency). MAC: AC:20:2E:CC:94:52 (Unknown)
dell (192.168.0.13) (0.00026s latency). MAC: 5C:F9:DD:5C:9C:53 (Dell)
dell (192.168.0.14) (0.00026s latency). MAC: 5C:F9:DD:5C:9C:53 (Dell)
hs100 (192.168.0.15) (-0.078s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
android-47cdabb50f83a5ee (192.168.0.16) (-0.076s latency). MAC: 18:4F:32:8D:AA:97 (Hon Hai Precision Ind.)
192.168.0.254 (0.00045s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.10) LOCAL NETWORK CARD
alien (192.168.0.12) LOCAL NETWORK CARD

---------------------------------------------------------------------------- */
END

#What network cards are installed:
NetworkCards="" # Contents of /etc/hosts should contain all IP addresses on LAN
NetworkCards=$(lshw -c network | grep -Ei 'description|product|serial' | \
               sed 's/       description: //g' |  \
               sed -z 's/\n       product: /: /g' | \
               sed -z 's/\n       serial: / - /g')
Display "lshw -c network | grep -Ei 'description|product|serial'" "$NetworkCards"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

Ethernet interface: Killer E2400 Gigabit Ethernet Controller - 28:f1:0e:2a:1a:ed
Wireless interface: QCA6174 802.11ac Wireless Network Adapter - 9c:b6:d0:10:37:f7
 
---------------------------------------------------------------------------- */
END

# Email /etc/hosts file to yourself and update contents below on machine
STATIC_IP_Addresses="" # Contents of /etc/hosts should contain all IP addresses on LAN
STATIC_IP_Addresses=$(cat /etc/hosts | grep 192.168)
Display "cat /etc/hosts | grep 192.168" "$STATIC_IP_Addresses"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

192.168.0.10    alien  AW 17R3 WiFi                   9c:b6:d0:10:37:f7
192.168.0.12    alien  AW 17R3 Ethernet               28:f1:0e:2a:1a:ed
192.168.0.13    dell   Inspiron 17R-SE-7720 Ethernet  5c:f9:dd:5c:9c:53
192.168.0.14    dell   Inspiron 17R-SE-7720 WiFi      60:6c:66:86:de:bd
192.168.0.15    hs100  Sony TV Wall Light
192.168.0.16    android-47cdabb50f83a5ee  Sony Bravia TV KBL 50W800C

---------------------------------------------------------------------------- */
END

# Firewall
# Selecteend TLP stats that might prove helpful for debuggin.
ufw_stats="" # Contents of /etc/hosts should contain all IP addresses on LAN
ufw_stats=$(ufw status verbose)
Display "FIREWALL: ufw status verbose" "$ufw_stats"

echo "-------------- \
For above setting check that ports 9 & 22 allowed --------------"
echo "Port  9 is usually used for Wake On Lan (WOL)"
echo "Port 22 is usually used for remote terminal login"

: <<'END'
/* ------------ RESULTS -------------------------------------------------------

Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip
-------------- Any error messages below are coming from tlp-stat --------------
cat: /sys/class/power_supply/hidpp_battery_23/present: No such file or directory
cat: /sys/class/power_supply/hidpp_battery_24/present: No such file or directory

---------------------------------------------------------------------------- */
END

echo -------------- \
Any error messages below are coming from tlp-stat --------------
# Selected TLP stats that might prove helpful for debuggin.
TLP_stats="" # Contents of /etc/hosts should contain all IP addresses on LAN
command -v tlp-stat >/dev/null 2>&1 && \
    TLP_stats=$(tlp-stat | grep -E '^autosuspend|ENABLE|WOL')
Display "tlp-stat | grep -E '^autosuspend|ENABLE|WOL'" "$TLP_stats"
: <<'END'

/* ------------ RESULTS -------------------------------------------------------

TLP_ENABLE=1
WOL_DISABLE=Y
autosuspend        = enabled

---------------------------------------------------------------------------- */
END

: <<'END'
/* ------------------  WOL (Wake On LAN) General Comments  --------------------

*******************  UBUNTU 16.04  *******************

From: https://askubuntu.com/questions/764158/
      how-to-enable-wake-on-lan-wol-in-ubuntu-16-04

Also:  http://manpages.ubuntu.com/manpages/xenial/man8/NetworkManager.8.html

In Ubuntu 16.04 set WOL_DISABLE=N in /etc/default/tlp to avoid getting WOL 
disabled by TLP power management.

http://linrunner.de/en/tlp/docs/tlp-configuration.html

Add NETDOWN=no in /etc/default/halt to prevent powering off the network
card during shutdown

Enable Wake on LAN in /etc/network/interfaces when static network 
configuration is used.

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).
# The loopback network interface

auto lo
iface lo inet loopback
# The primary network interface

auto eth0
iface eth0 inet static
        address 192.168.0.10
        netmask 255.255.255.0
        gateway 192.168.0.1
        dns-nameservers 192.168.0.1
        up ethtool -s eth0 wol g

Enable wake on lan in BIOS, enter the BIOS setup and look for something
called "Wake up on PCI event", "Wake up on LAN" or similar. Change it so
that it is enabled. Save your settings and reboot.

https://help.ubuntu.com/community/WakeOnLan

Warning some motherboards / network controllers don't support WOL from the
cold boot (S5 state, where the power to the system is physically turned off 
and back on again). In that case, at least one power cycle (power up, 
shutdown) has to be performed. To mitigate to the problem, the BIOS can be 
configured to power up when AC is restored and schedule a shutdown inside 
Ubuntu afterwards. Refer to the motherboard's manual for further details.


*******************  UBUNTU 18.04  *******************


NOTE: In Ubuntu 18.04 /etc/network/interfaces maybe DEPRECATED
      You might have to create your own script for WOL in:
      /etc/NetworkManager/dispatcher.d/99-Xxxxxx
      
      See: https://askubuntu.com/a/1111656/307523
           https://wiki.archlinux.org/index.php/
           NetworkManager#Network_services_with_NetworkManager_dispatcher


---------------------------------------------------------------------------- */
END

# WOL from: https://wiki.debian.org/WakeOnLan
# apt install ethtool
# ethtool -s eth0 wol g

# Above is NOT PERSISTENT across suspend/resume cycle so issue upon resume
# not just boot. /etc/network/interfaces above has setup.

# Archwiki: https://wiki.archlinux.org/index.php/Wake-on-LAN
# apt install wakeonlan
# wol target_MAC_address

# From: https://www.thegeekstuff.com/2008/11/
# wol-wakeonlan-guide-remotely-turn-on-servers-without-physical-access/
# wakeonlan 5c:f9:dd:5c:9c:53

# Do we have 'NETDOWN=no' line present for machines that shutdown"?
HaltConfig="" # Default no file
[[ -f /etc/default/halt ]] && HaltConfig=$(cat /etc/default/halt)
Display 'cat /etc/default/halt' "$HaltConfig"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

# Default behaviour of shutdown -h / halt. Set to "halt" or "poweroff".
HALT=poweroff

---------------------------------------------------------------------------- */
END

# Do we have static IP addresses setup?
NetworkInterfaces="" # Default no file
[[ -f /etc/network/interfaces ]] && NetworkInterfaces=$(cat /etc/network/interfaces)
Display 'cat /etc/network/interfaces' "$NetworkInterfaces"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

# interfaces(5) file used by ifup(8) and ifdown(8)
# /etc/network/interfaces
# For Ubuntu 16.04 ONLY according to notes in ssh-setup
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
        address 192.168.0.10
        netmask 255.255.255.0
        gateway 192.168.0.1
        dns-nameservers 192.168.0.1
        up ethtool -s eth0 wol g


---------------------------------------------------------------------------- */
END

# Hide your router address below if publishing!
nmcliConnections="" # Default no file
nmcliConnections=$(nmcli -p connection show)
Display 'nmcli -p connection show' "$nmcliConnections"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

====================================================================================
                         NetworkManager connection profiles
====================================================================================
NAME                UUID                                  TYPE             DEVICE  
------------------------------------------------------------------------------------
Xxxx-Xxxxxx-Xx      cf8fda92-0e59-4d0e-8821-cedb4be10d26  802-11-wireless  wlp60s0 
Wired connection 1  378122bb-ad44-3ddd-a616-c93e1bf0f828  802-3-ethernet   enp59s0 
Xxxxxxxxx-5G        73c40a50-0f2e-431c-b12c-e4712b3abdb4  802-11-wireless  --      

---------------------------------------------------------------------------- */
END

EthernetInterface=$(ifconfig -a | grep ^'e' | cut -d' ' -f1)
Display "ifconfig -a | grep ^'e' | cut -d' ' -f1" \
"Ethernet Interface that could be used for WOL:   $EthernetInterface"
: <<'END'
/* ------------ RESULTS -------------------------------------------------------

Ethernet Interface that could be used for WOL:   enp59s0

---------------------------------------------------------------------------- */
END

# What WOL_Settings exist for Ethernet Interface?
WOL_Setting="'ethtool' not installed."
command -v ethtool >/dev/null 2>&1 && \
    WOL_Setting="$(ethtool $EthernetInterface | grep -i 'Wake-on:')"
Display "ethtool $EthernetInterface | grep -i 'Wake-on:'" "$WOL_Setting"
: <<'END'

/* ------------ RESULTS -------------------------------------------------------

Supports Wake-on: pumbag
Wake-on: g

---------------------------------------------------------------------------- */
END

# What WOL_Settings exist for Ethernet Interface?
Route="'ethtool' not installed."
Route="$(route)"
Display "route" "$Route"
: <<'END'

/* ------------ RESULTS -------------------------------------------------------

Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         hitronhub.home  0.0.0.0         UG    100    0        0 enp59s0
default         hitronhub.home  0.0.0.0         UG    600    0        0 wlp60s0
link-local      *               255.255.0.0     U     1000   0        0 enp59s0
192.168.0.0     *               255.255.255.0   U     100    0        0 enp59s0
192.168.0.0     *               255.255.255.0   U     600    0        0 wlp60s0

---------------------------------------------------------------------------- */
END

Arp="'apr' not installed."
Arp="$(arp)"
Display "arp" "$Arp"
: <<'END'

/* ------------ RESULTS -------------------------------------------------------

Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.0.4                      (incomplete)                              enp59s0
192.168.0.254            ether   00:05:ca:00:00:09   C                     enp59s0
hs100                    ether   50:d4:f7:eb:41:35   C                     enp59s0
dell                     ether   5c:f9:dd:5c:9c:53   C                     enp59s0
hitronhub.home           ether   ac:20:2e:cc:94:52   C                     enp59s0
android-47cdabb50f83a5e  ether   18:4f:32:8d:aa:97   C                     enp59s0
hitronhub.home           ether   ac:20:2e:cc:94:52   C                     wlp60s0
20.20.20.1               ether   ac:20:2e:cc:94:52   C                     enp59s0
dell                             (incomplete)                              enp59s0


---------------------------------------------------------------------------- */
END

Display 'END OF REPORT' ""

## TEST STUFF

#Spare:
: <<'END'
/* ------------ RESULTS -------------------------------------------------------
---------------------------------------------------------------------------- */
END

```

<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr13" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a></div>
