---
title: Internet of Things - Control TV's and power outlets
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

This page describes how to **Control TV's and power outlets.**
The control programs are designed for Linux and have
been tested in Ubuntu. The coding is done in Bash.

At the heart of the system is the `tvpowered` program
which starts after you login. This is a bash script stored
in your `~/.config/autostart` directory.

To assist with setting up your "Internet of Things" (IoT)
the program `ssh-setup` is called to document the devices
attached to your LAN and/or Wi-Fi router.

To power off electric lights when you shut down or suspend
your computer the `/etc/NetworkManager/dispatcher.d/pre-down.d`
directory contains the bash script `smartplug_off`.

When resuming from system sleep (waking up your laptop)
the `/lib/systemd/system-sleep` directory contains the
bash scripts:

- `sound` Enables sound for nVidia GeForce
GTX 970M HDMI output. On Linux there is a bug where
there is no sound over HDMI channel. The program
`nvhda` is called to enable sound.
- `sonytv` Turns Sony TV picture off and leaves sound on.

The bash script `fliptv` toggles the wall outlet power
behind the main TV (Sony). In this case the power controls a
lamp to provide back lighting which reduces eye strain.

The bash script `fliptv2` toggles the wall outlet power
behind the second TV (TCL). In this case the power controls a
lamp to provide back lighting which reduces eye strain.

There are four bash scripts to control a Sony TV screen:

- `pictureoff.sh` Turns off the Sony TV screen but leaves sound on
- `pictureon.sh` Turns on the Sony TV screen which consumes 100 watts
- `picturetog.sh` Toggles Sony TV screen off and on
- `picturetog` same as `picturetog.sh` but resides in path

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# `tvpowered` Sony Bravia TV Controller

The `tvpowered` bash script is the heart of the
IoT (Internet of Things) system provided by {{ site.title }}.
The script is loaded when you sign on because it
is stored in the `~/.config/autostart` directory.

`tvpowered` automatically establishes communication
with your Sony TV and displays a desktop notification
when successful.

## `tvpowered` Key Features

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
   alt="Stack Exchange Data Explorer Download CSV"
   style="float: right; width: 25%; margin: 3em 0px 1rem 1rem;"
   caption="Notification when TV volume is changed"
%}

## Change TV Volume

Because the main TV (Sony) picture is normally turned off you
have no idea what the sound system current volume level is. The
`tvpowered` script will display a notification on whatever
monitor you are currently working on when the volume is changed
using the TV's remote control.

## `tvpowered` Bash Script

Below is the Bash script you can copy to your system:

```bash
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
                log "System powered back up. Checking if TV powered on. '$0'."
                sleep 10                        # Time to wake from suspend
                TenMinuteSpam                   # Wait for network connection
                /home/rick/sony/pictureoff.sh   # Picture off energy saving
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

There are four lines you need to configure to your system:

```bash
SCTL=suspend        # systemctl parameter: 'suspend' or 'poweroff'
IP=192.168.0.19     # IP address for Sony TV on LAN
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)
  ...
/home/"$UserName"/sony/pictureoff.sh   # Picture off energy saving
```

Note the last tine is buried deep inside the program. Change
the path `/home/"$UserName"/sony/` to the directory where you 
placed the `pictureoff.sh` bash script. 

## Automatically Start Bash Script

In your `~/.config/autostart` directory create the file
`tvpowered.desktop`. The file needs to contain:

```bash
[Desktop Entry]
Type=Application
Exec=/home/rick/sony/tvpowered
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name[en_CA]=tvpowered
Name=tvpowered
Comment[en_CA]=Powering off Sony TV suspends system
Comment=Powering off Sony TV suspends system
```

Change the line with `/home/rick/sony/`
to the directory where the `tvpowered` script is
stored.

## `tvpowered` prerequisites

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
- `pictureoff.sh` - Bash Script provided below
- `smartplug_off` - Bash Script provided below

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# `smartplug_off` Power Off Wall Outlet Smartplugs

The `smartplug_off` bash script is called whenever the
computer system is shutdown or suspended.

The script needs to be created with `sudo` powers
because it is located in the
`/etc/NetworkManager/dispatcher.d/pre-down.d/` directory.

The script `tvpowered` can lose communications at any
time so it cannot be used for `smartplug_off` function.

## `smartplug_off` Key Features

Called by Network Manager when the network is going down.
The Network is always brought down when computer system is
shutting down or being suspended. This makes the Network
Manager a convenient way to shut off power to wall outlet
smart plugs behind the TV that control the nighttime 
back lighting. 

## `smartplug_off` Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: smartplug_off
# PATH: /etc/NetworkManager/dispatcher.d/pre-down.d
# DESC: Turn off smartplug light power for TV light
# DATE: March 7, 2020.

# CALL: Called by Network Manager before going down. Network manager in turn
#       is called by systemd during suspend/hibernate/shutdown

# NOTE: myisp.sh and hs100.sh must be installed for hs100 tp-link power plug.
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

## `smarplug_off` Prerequisites

`myisp.sh` and `hs100.sh` must be installed to control 
the hs100 tp-link power plug.

---


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# `sound` Switch System Sound Output to HDMI

The `sound` bash script is called whenever the
computer system resumes from suspend / wakes from sleep.

The script needs to be created with `sudo` powers
because it is located in the
`/lib/systemd/system-sleep/` directory.

## `sound` Key Features

A bug in Pulse Audio 8 sets the output sound device to
Laptop when system goes to sleep.
The system sound device doesn't default to HDMI
when the system wakes up / resumes from suspend.

To solve this problem the Pulse Audio settings are
modified.

## `sound` Bash Script

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

There are two lines you need to configure to your system:

```bash
export PULSE_RUNTIME_PATH="/run/user/1000/pulse/"
sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo
```

If your User Number is the standard "1000" then no changes
are needed for the first line.

In the second line replace `rick` with your Username.

## `sound` Prerequisites

It is assumed you are running Pulse Audio in Linux. 

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Primary TV (Sony) and Second TV (TCL) Setup

Here is what the system setup looks like:

{% include image.html src="/assets/img/iothings/Multiple Monitors Manager.png"
   alt="Multiple Monitors Manager.png"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
   caption="mmm Overview of Monitors"
%}

- Top Left is Sony 50" Full HD TV
- Top Right is TCL 43" 4K TV
- Bottom Right is Alienware 17" Full HD laptop

There are lamps behind the Sony TV and TCL TVs which are
powered by Kasa TP-Link Smartplugs.

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

# `fliptv` Toggle Light Behind Primary TV

The `fliptv` bash script is called whenever you
want to toggle the light behind your TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## `fliptv` Key Features

A light behind your TV is hard to reach. The `fliptv`
script makes it easy to turn the light off and on.

## `fliptv` Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: fliptv
# PATH: /mnt/e/bin
# DESC: Flip light power for TV light
# DATE: Janauary 20, 2020. Modified March 26, 2023.

# CALL: fliptv

# NOTE: myisp.sh and hs100.sh must be installed for hs100 tp-link power plug.

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

## `fliptv` Prerequisites

The bash script `/usr/bin/hs100.sh` 
needs to be installed. This script communicates between
your computer and the Kasa TP-Link Smart Plug.

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# `fliptv2` Toggle Light Behind Second TV

The `fliptv2` bash script is called whenever you
want to toggle the light behind your second TV off or on.
Generally during the day the light is turned off
and during night the light is turned on.

## `fliptv2` Key Features

The light behind your second TV is hard to reach. 
The `fliptv2` script makes it easy to turn the light 
off and on.

## `fliptv2` Bash Script

Below is the Bash script you can copy to your system:

```bash
#!/bin/bash

# NAME: fliptv2
# PATH: /mnt/e/bin
# DESC: Flip power for Kitchen light behind TCL TV
# DATE: September 4, 2022.  Modified March 26, 2023.

# CALL: flipkitchen

# NOTE: myisp.sh and hs100.sh must be installed for hs100 tp-link power plug.

# UPDT: Septmber 29, 2022. After power outage IP changed from 20 to 19.
#       March 14, 2023. After power outage IP changed from 19 to 20.
#       March 23, 2023. After power outage IP changed from 20 to 17.
#       March 25, 2023. Name chnage flipkitchen to fliptv2

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

## `fliptv2` Prerequisites

The bash script `/usr/bin/hs100.sh` 
needs to be installed. This script communicates between
your computer and the Kasa TP-Link Smart Plug.

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

---


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

---


# `nvhda` Enable nVidia GeForce GTX 970M HDMI Sound

The `sound` bash script is called whenever the
computer system resumes from suspend / wakes from sleep.

The script needs to be created with `sudo` powers
because it is located in the
`/lib/systemd/system-sleep/` directory.

## `nvhda` Key Features

Due to a bug between nVidia and Linux there is no sound
when the system is powered up. The bug can be avoided
if you boot with windows first and then reboot into
Ubuntu.

To solve this problem the `nvhda` C program is used. Whenever
you install a new Linux Kernel version the program is
automatically recompiled by DKMS.
