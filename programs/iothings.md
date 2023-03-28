---
title: Internet of Things - Control TV's and power outlets
layout: program
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
which starts after you login. This is a bash script stored
in your `~/.config/autostart` directory.

To power off electric lights when you shut down or suspend
your computer the `/etc/NetworkManager/dispatcher.d/pre-down.d`
directory contains the bash script `smartplug_off`.

When resuming from system sleep (waking up your laptop)
the `/lib/systemd/system-sleep` directory contains the
bash scripts. Of particular note is:

- A bug in Pulse Audio 8 sets the output sound to the
Laptop speakers when system goes to sleep. The system sound 
device doesn't default to HDMI
when the system wakes up / resumes from suspend.
The `sound` script enables sound for the HDMI stereo system.

A variety of scripts are provided to make life
convenient. 

The bash script `light-tog` toggles the wall outlet power
behind the main TV (Sony). In this case the power controls a
lamp to provide back lighting which reduces eye strain.

The bash script `light-tog2` toggles the wall outlet power
behind the second TV (TCL). In this case the power controls a
lamp to provide back lighting which reduces eye strain.

There are four bash scripts to control a Sony TV screen:

- `pictureoff.sh` Turns off the Sony TV screen but leaves sound on
- `pictureon.sh` Turns on the Sony TV screen which consumes 100 watts
- `picturetog.sh` Toggles Sony TV screen off and on
- `picturetog` same as `picturetog.sh` but resides in path

To assist with setting up your "Internet of Things" (IoT)
the program `ssh-setup` is used to document the devices
attached to your LAN and/or Wi-Fi router.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# `tvpowered` Sony Bravia TV Controller

{% include image.html src="/assets/img/iothings/tv remote off.gif"
   alt="tv remote off.gif"
   style="float: right; width: 50%; margin: .25rem 0px 1rem 1rem;"
   caption="Use TV remote to power off system"
%}


The `tvpowered` bash script is the heart of the
IoT (Internet of Things) system provided by {{ site.title }}.
The script is loaded when you sign on because it
is stored in the `~/.config/autostart` directory.

`tvpowered` automatically establishes communication
with your Sony TV and displays a desktop notification
when successful.

## 'tvpowered' Key Features

There are some unique "bells & whistles":

- When volume is changed via TV remote control, the
volume level is displayed in desktop notification.
- The desktop notification is instantly updated
when consecutive volume changes are made. The usual
five or ten second delay is overriden for instant
feedback.
- When TV is powered off via TV remote control,
the power outlet for the light behind the TV
and secondary TV is turned off and your system
is put to sleep or shutdown.
- You are reminded if communication between the TV
and your computer isn't working.
- When your computer system wakes up from sleep /
resumes from suspend, the Sony TV picture is turned
off to save electricity but the sound system remains
energized.

{% include image.html src="/assets/img/iothings/volume change.gif"
   alt="volume change.gif"
   style="float: right; width: 50%; margin: 2rem 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}

## Change Primary TV Volume

Because the main TV (Sony) picture is normally turned off, you
have no idea what the sound system current volume level is. The
`tvpowered` script will display a notification on whatever
monitor you are currently working on when the volume is changed
using the TV's remote control.

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

## 'tvpowered' Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: tvpowered
# PATH: /usr/bin/ OR ~/bin (/home/USERNAME/bin) OR /mnt/e/bin/
# DESC: When TV is powered off automatically suspend the laptop.
# DATE: June 9, 2020.  Modified March 28, 2023.
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

# Sources:

# https://gist.github.com/kalleth/e10e8f3b8b7cb1bac21463b0073a65fb#cec-sonycec
# https://pro-bravia.sony.net/develop/integrate/rest-api/spec/service/audio/v1_0/setAudioVolume/index.html
# https://developer.sony.com/develop/audio-control-api/get-started/http-example#tutorial-step-2
# https://en.wikipedia.org/wiki/CURL
# https://stackoverflow.com/questions/7172784/how-do-i-post-json-data-with-curl
# https://stackoverflow.com/questions/2829613/how-do-you-tell-if-a-string-contains-another-string-in-posix-sh

SCTL=suspend        # systemctl paramater: suspend or poweroff
# 192.168.0.21 (-0.087s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
# 192.168.0.16    android-47cdabb50f83a5ee  Sony Bravia 18:4F:32:8D:AA:97
IP=192.168.0.19     # IP address for Sony TV
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
    TEMP=$(mktemp --tmpdir=/run/user/1000 tvpowered.XXXXXXXX)
    echo "$1" > "$TEMP"

    # -s = silent
    Result=$(curl -s -H "Content-Type: application/json; charset=UTF-8" \
             -H "X-Auth-PSK: $PWRD" \
             --data @"$TEMP" \
             http://$IP/sony/"$2")
    # echo "Result: $Result"    # Remove leading # for debugging
    ReturnState="$?"
    # TO-DO: check $? and if non-zero pop up dialog with $TEMP contents
    rm "$TEMP"

    # Test string
#curl -s -H "Content-Type: application/json; charset=UTF-8" -H "X-Auth-PSK: 123" --data "{ "method": "getPowerStatus", "id": 50, "params": [], "version": "1.0" }" http://192.168.0.16sony/system
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
    ReturnState="$?"                    # Usually '6', not checked.

    #echo "ReturnState: $ReturnState Reply: $Reply"    # Remove # for debugging
    # Reply: {"result":[{"status":"active"}],"id":50}
    #    or: {"result":[{"status":"standby"}],"id":50}

    # Does 'active' substring exist in TV's reply?
    [[ "${Reply#*active}" != "$Reply" ]] && return 0

    # TV is turned off (standby) or no network (blank)
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


Bar=""                          # Global Volume Level bar

VolumeBar () {

    Bar=""                      # Progress Bar / Volume level
    Len=25                      # Length of Progress Bar / Volume level
    Div=4                       # Divisor into Volume for # of blocks
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

    Cnt=0
    while : ; do

        if GetPowerStatus ; then
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
    VolumeBar $LastVolume
    notify-send --urgency=critical "tvpowered" \
        --icon=/usr/share/icons/gnome/48x48/devices/display.png \
        "Fully activated.\n System will $SCTL when TV powered off.  Volume: $LastVolume $Bar"
    
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
    VolumeCnt=0             # TV Remote changed volume, so shorter sleep

    while : ; do

        if ! GetPowerStatus; then

            # START FROM ABOVE: 
            # This was causing 2% CPU drain with Network Manager and
            # debus-daemon. So move from above GetPowerStatus to below.

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
                echo "Unexpected disconnect, aborting suspend."
            else
                log "TV Powered off. 'systemctl $SCTL' being called."
                systemctl "$SCTL"
                # systemctl will suspend. When resuming we hit next line
                log "System powered back up. Checking if TV powered on. '$0'."
                sleep 10                        # Time to wake from suspend
                TenMinuteSpam                   # Wait for network connection
                pictureoff                      # Picture off energy saving
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

There are three lines near the top of the script you may need to

configure to your system:

```bash
SCTL=suspend        # systemctl parameter: 'suspend' or 'poweroff'
IP=192.168.0.19     # IP address for Sony TV on LAN
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)
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

## 'tvpowered' prerequisites

This program only works with Sony Bravia TVs. The Sony
REST API is required. For more details visit
[Sony Bravia IP Control 🔗](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html 
"Sony Bravia IP Control Overview Section"){:target="_blank"}

A LAN or Wi-Fi connection is required for both your TV
and your computer.

The IP address assigned to your Sony TV must be entered
into the file `~/.config/iothings/tvip`.

Linux is required and preferably the Ubuntu distribution. 
The following Linux programs are required:

- `curl` - Linux package
- `libnotify-bin` - Linux package
- `pictureoff - Bash Script provided below
- `smartplug_off` - Bash Script provided below

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# `smartplug_off` Smart Plugs Turn Off Lights

{% include image.html src="/assets/img/iothings/conybrown-lights-off.gif"
   alt="conybrown-lights-off.gif"
   style="float: right; width: 40%; margin: .25rem 0px 1rem 1rem;
          text-align: center;"
   caption="Smart Plug Control"
%}

The `smartplug_off` bash script is called whenever the
computer system is shutdown or suspended.

The script needs to be created with `sudo` powers in the
`/etc/NetworkManager/dispatcher.d/pre-down.d/` directory.


## 'smartplug_off' Key Features

Called by Network Manager when the network is going down.
The Network is always brought down when computer system is
shutting down or being suspended. This makes the Network
Manager a convenient way to shut off power to wall outlet
smart plugs behind the TV that control the nighttime 
back lighting. 

## 'smartplug_off' Bash Script

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

PlugName="192.168.0.15"  # Sony TV backlight

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    : # Nothing to do already off
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding check connection and IP "$PlugName".
fi


PlugName="192.168.0.17"  # Google TV backlight

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
PlugName="192.168.0.15"  # Sony TV backlight
...
PlugName="192.168.0.17"  # Google TV backlight
```

The first `PlugName` is 1/3rd of the way in the file.
The second `PlugName` is 2/3rds of the way in the file.

## 'smarplug_off' Prerequisites

`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# `sound` Switch System Sound Output to HDMI

{% include image.html src="/assets/img/iothings/volume change.gif"
   alt="volume change.gif"
   style="float: right; width: 50%; margin: 2rem 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}


The `sound` bash script is called whenever the
computer system resumes from suspend / wakes from sleep.

The script needs to be created with `sudo` powers in the
`/lib/systemd/system-sleep/` directory.

## 'sound' Key Features

A bug in Pulse Audio 8 sets the output sound device to
Laptop when system goes to sleep.
The system sound device doesn't default to HDMI
when the system wakes up / resumes from suspend.

To solve this problem the Pulse Audio settings are
modified.

## 'sound' Bash Script

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

## 'sound' Prerequisites

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
TCL TV. Both lamps are controlled by Kasa TP-Link Smart Plugs.

The Sony TV has a sound system with subwoofer that is used
all the time. The Sony TV picture is only used occasionally
for viewing movies and YouTube. On the Sony TV you can see
that YouTube is currently running.

The TCL TV is 4K which allows four screen sizes of full HD.
Consequently this TV is where most of the work is done. You
can comfortably have 10 windows open on a 4K screen. This is
also a good monitor for stashing all your Desktop Icons for
Shortcuts. The program `iconic` is used to move desktop icons
to the middle monitor.

The Alienware 17" laptop screen is where the file manager,
web browser and music player playlist windows reside.

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# `light-tog` Toggle Light Behind Primary (Sony) TV

{% include image.html src="/assets/img/iothings/Toggle Desktop Shortcuts.png"
   alt="Toggle Desktop Shortcuts.png"
   style="float: right; width: 40%; margin: 1rem 0px 1rem 1rem;"
   caption="Sample Desktop Icons"
%}

The `light-tog` bash script is used whenever you
want to toggle the light behind your TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## 'light-tog' Key Features

A light behind your TV is hard to reach. The `light-tog`
script makes it easy to turn the light off and on.

## 'light-tog' Desktop Shortcut

Instead of typing `light-tog` in the command line, it
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

## 'light-tog' Bash Script

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

hitronhub.home (192.168.0.1) (0.00073s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
hs100 (192.168.0.15) (0.00084s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
HS103.hitronhub.home (192.168.0.17) (-0.066s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
sony (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
hs103 (192.168.0.20) (0.21s latency). MAC: FC:D4:36:EA:82:36 (Unknown)
GoogleTV7781.hitronhub.home (192.168.0.21) (-0.067s latency). MAC: C0:79:82:41:2F:1F (Unknown)
192.168.0.254 (0.00045s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## 'light-tog' Prerequisites


`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# `light-tog2` Toggle Light Behind Second TV

{% include image.html src="/assets/img/iothings/Light Off On.gif"
   alt="Light Off On.gif"
   style="float: right; width: 40%; margin: 1rem 0px 1rem 1rem;
          text-align: center;"
   caption="Smart Plug Controls Light"
%}

The `light-tog2` bash script is called whenever you
want to toggle the light behind your second TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## 'light-tog2' Key Features

The light behind your second TV is hard to reach. 
The `light-tog2` script makes it easy to turn the light 
off and on.

## 'light-tog2' Desktop Shortcut

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

## 'light-tog2' Bash Script

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

PlugName="192.168.0.17"  # hs103 Wi-Fi smart plug in kitchen behind TCL TV.

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
PlugName="192.168.0.17"  # hs103 Wi-Fi smart plug in kitchen behind TCL TV.
```

Change the IP address to what your network assigned it. See the
`ssh-setup` script output. For example:

```text
==========  nmap -sn 192.168.0/24  ============================================

hitronhub.home (192.168.0.1) (0.00073s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
hs100 (192.168.0.15) (0.00084s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
HS103.hitronhub.home (192.168.0.17) (-0.066s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
sony (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
hs103 (192.168.0.20) (0.21s latency). MAC: FC:D4:36:EA:82:36 (Unknown)
GoogleTV7781.hitronhub.home (192.168.0.21) (-0.067s latency). MAC: C0:79:82:41:2F:1F (Unknown)
192.168.0.254 (0.00045s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## 'light-tog2' Prerequisites


`/usr/bin/hs100.sh` must be installed to control Smart Plugs. 
See [TP-Link Wi-Fi Smart Plug HS100 🔗](https://github.com/benlye/hs100
"Visit GitHub Page for more details"){:target="_blank"} 
for more information.

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>


# `picturetog` Toggle Sony TV picture Off and On

The `picturetog` bash script toggles the Sony TV picture
(screen) off and on. When the picture is turned off this
is known as "Power Savings Mode On". The reason being
that 100 watts of power is saved. The sound system and
all other TV functions like volume change still work.

## 'picturetog' Key Features

When your system is turned on or you resume from suspend /
wake from sleep the Sony TV (Primary) picture is turned
off automatically. The `picturetog` script is used to turn
the Sony TV picture back on so you can watch a movie or
whatever.

## 'picturetog' Desktop Shortcut

Instead of typing `picturetog` in the command line, it
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

## 'picturetog' Bash Script

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

hitronhub.home (192.168.0.1) (0.00073s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
hs100 (192.168.0.15) (0.00084s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
HS103.hitronhub.home (192.168.0.17) (-0.066s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
sony (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
hs103 (192.168.0.20) (0.21s latency). MAC: FC:D4:36:EA:82:36 (Unknown)
GoogleTV7781.hitronhub.home (192.168.0.21) (-0.067s latency). MAC: C0:79:82:41:2F:1F (Unknown)
192.168.0.254 (0.00045s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## 'picturetog' Prerequisites

A Sony Bravia TV or Professional Display is required. The
Linux package `curl` must also be installed.

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# `pictureoff` Turn Off Sony TV Picture

{% include image.html src="/assets/img/iothings/tv picture off.gif"
   alt="tv remote off.gif"
   style="float: right; width: 50%; margin: .25rem 0px 1rem 1rem;"
   caption="Turn Sony Bravia TV Picture Off"
%}

The `pictureoff` bash script is called when the computer
is turned on, rebooted or resumes from suspend (wakes from sleep).

## 'pictureoff' Key Features

`pictureoff` is automatically called by `tvpowered` script
after it establishes communication
with your Sony TV.


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

hitronhub.home (192.168.0.1) (0.00073s latency). MAC: A8:4E:3F:82:98:B2 (Unknown)
hs100 (192.168.0.15) (0.00084s latency). MAC: 50:D4:F7:EB:41:35 (Unknown)
HS103.hitronhub.home (192.168.0.17) (-0.066s latency). MAC: 50:D4:F7:EB:46:7C (Unknown)
sony (192.168.0.19) (-0.100s latency). MAC: AC:9B:0A:DF:3F:D9 (Sony)
hs103 (192.168.0.20) (0.21s latency). MAC: FC:D4:36:EA:82:36 (Unknown)
GoogleTV7781.hitronhub.home (192.168.0.21) (-0.067s latency). MAC: C0:79:82:41:2F:1F (Unknown)
192.168.0.254 (0.00045s latency). MAC: 00:05:CA:00:00:09 (Hitron Technology)
alien (192.168.0.12) LOCAL NETWORK CARD
```

## 'pictureoff' Prerequisites

A Sony Bravia TV or Professional Display is required. The
Linux package `curl` must also be installed.

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# TP-Link Wi-Fi Smart Plug `hs100.sh` Script


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

## 'hs100.sh' Bash Script

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

---


# `nvhda` Enable nVidia GeForce GTX 970M Sound

https://github.com/hhfeuer/nvhda#install-using-dkms
https://bugs.freedesktop.org/show_bug.cgi?id=75985#c37

## 'nvhda' Key Features

Due to a bug between nVidia and Linux (perhaps caused by TLP)
there is no sound when the system is powered up.

To solve this problem the `nvhda` C program is used. Whenever
you install a new Linux Kernel version the program is
automatically recompiled by DKMS.
