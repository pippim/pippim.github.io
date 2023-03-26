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

- `sound.sh` Enables sound for nVidia GeForce
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
    Fill="▒"                    # Fill up to $Len
    Arr=( "▉" "▎" "▌" "▊" )   # UTF-8 left blocks: 7/8, 1/4, 1/2, 3/4

    FullBlock=$((${1} / Div))   # Number of full blocks
    PartBlock=$((${1} % Div))   # Size of partial block (array index)

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
    VolumeCnt=0             # TV Remote changed volume, so shrorter sleep

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
            VolumeCnt=10
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

There are three lines you need to configure to your system:

```bash
SCTL=suspend        # systemctl parameter: 'suspend' or 'poweroff'
IP=192.168.0.19     # IP address for Sony TV on LAN
PWRD=123            # Password for Sony TV IP Connect (Pre-Shared key)
```


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

- curl
- libnotify-bin

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>


# `smartplug_off` Power Off Wall Outlets

The `smartplug_off` bash script is called whenever the
computer system is shutdown or suspended.

The script needs to be created with `sudo` powers
because it is located in the
`/etc/NetworkManager/dispatcher.d/pre-down.d/` directory.

The script `tvpowered` can lose communications at any
time so it cannot be used for
`smartplug_off` functionality.

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
fi```

## Configuring Bash Script

There are two lines you need to configure to your system:

```bash
PlugName="192.168.0.15"  # Sony TV backlight
...
PlugName="192.168.0.17"  # Google TV backlight
```

## `smarplug_off` prerequisites

`myisp.sh` and `hs100.sh` must be installed to control 
the hs100 tp-link power plug.

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Convert Stack Exchange to GitHub Pages

{% include image.html src="/assets/img/stack/stack-to-blog progress display.gif"
   alt="stack-to-blog.py"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
%}

Converting thousands of Stack Exchange Q&A in markdown format isn't as easy
as simply copying them over to GitHub Pages. The python program
`stack-to-blog.py` was used to convert Stack Exchange posts to
GitHub Pages Posts.
The full `stack-to-blog.py` program can be accessed on the
[Pippim Website repo 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/stack-to-blog.py){:target="_blank"}.

The program automatically:

- Creates Jekyll front matter on posts and front matter totals for site.
- Selects Stack Exchange Posts based on meeting minimum criteria such as up-votes or accepted answer status.
- If self-answered question, the answer is included and not the question.
- If self-answered question, the accepted answer alone doesn't qualify. Votes from other are the qualifier.
- Initial testing allows selecting small set of random record numbers to convert.
- Converts Stack Exchange Markdown formats to GitHub Pages Kramdown Markdown format.
- Creates hyperlinks to original Answer in Stack Exchange and Kramdown in GitHub Pages.
- Creates search word to URL indices excluding 50% of words like "a", "the", etc. to save space.
- Selectively inserts Table of Contents based on minimum criteria settings.
- Selectively inserts Section Navigation Buttons for: <kbd>Top</kbd> (Top of Page), <kbd>ToS</kbd> (Top of Section), <kbd>ToC</kbd> (Table of Contents) and <kbd>Skip</kbd> (Skip section).
- Selectively inserts "Copy Code Block to System Clipboard" button based on lines of code.
- Creates HTML with "Top Ten Answers" with the most votes.
- Creates powerful nested expandable/collapsible detail/summary HTML for many thousands of tags by post.
- Remaps hyperlinks in Stack Exchange Posts to {{ site.title }} website posts if they were converted.
- Fixes old broken `#header` Stack Exchange Markdown.
- Converts `< block quote` Stack Exchange Markdown into what works in Jekyll Kramdown.
- Convert Stack Exchange `<!-- language -->` tags to fenced code block language.
- When no fenced code block language is provided, uses shebang language first (if available).
- Converts older four-space indented code blocks to fenced code blocks.
- Converts Stack Exchange Hyperlinks where the website post title is implied and not explicit.
- Prints list of self-answered questions that were not accepted after the mandatory two day wait period.
- Prints list of Rouge Syntax Highlighting languages not supported in fenced code blocks.
- Prints summary totals when finished.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Stack Exchange Data Explorer

The **Stack Exchange Data Explorer** retrieves all your posts from the
Stack Exchange (SE) network into a CSV file (up to 10 MB) for downloading.

To download your SE posts you will need to:

- Click the link below
- Log in to the SE Data Explorer
- Search for the query: *"All my posts on the SE network"*
- Enter your network ID for the query parameter. E.G. 4775729
- After a few minutes, when the query completes, download the Query Results.

Each of these steps is described in detail in the following sections.

## First Step is to Log In

The first step in converting Stack Exchange posts to {{ site.title }}
website posts is to run a
[Stack Exchange Data Explorer Query 🔗](https://data.stackexchange.com/){:target="_blank"}.
After clicking the link you are presented with the Log In screen:

{% include image.html src="/assets/img/stack/stack exchange data explorer login.png"
   alt="Stack Exchange Data Explorer Log In Screen"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
%}

Click the <kbd>log in</kbd> button at the top right of the screen.
Then you can log in using **Google** or **Stack Overflow**. I use
the latter since Google already knows too much about us :)

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

{% include image.html src="/assets/img/stack/stack exchange data explorer search bar.png"
   alt="Stack Exchange Data Explorer Query Search Bar"
   style="float: right; width: 60%; margin: 3rem 0px 0px 1rem;"
%}

## Search For Query

After logging in, the top of the window provides a search bar to find a query.
Enter; *"All my posts on the SE network"* or copy with the button below
and, paste into the search bar.

``` text
All my posts on the SE network
```
