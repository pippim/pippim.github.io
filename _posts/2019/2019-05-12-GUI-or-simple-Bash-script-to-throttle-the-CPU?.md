---
layout:       post
title:        >
    GUI or simple Bash script to throttle the CPU?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142671
type:         Answer
tags:         power-management cpu 19.04 frequency cpuf conky yad
created_date: 2019-05-12 17:09:10
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "8,565 "
accepted:     Accepted
uploaded:     2022-01-09 10:02:40
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# cpuf - Simple Bash GUI to set CPU Min/Max Frequency

<!-- Language-all: lang-bash -->


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Demonstration

In this demo `cpuf` window is on left and `conky` system information is on right side. This is how the demo progresses:

- Demo starts whilst youtube video is already running
- Default CPU min/max frequencies are `800` / `3500`
- Override CPU min/max to `800` / `800` and CPU usage jumps to 20%
- Override CPU min/max to `3500` / `3500` and CPU usage drops to 10%
- Demo loops back and starts again

[![cpuf-demo.gif][1]][1]

With three monitors `cpuf` can appear 10 feet away, so use parameter 1 `--geometry` option to put it close to `conky`:

``` 
sudo cpuf --geometry="450x450+4720+80" /home/rick/Pictures/icons/cpu-intel-128.svg

```

- Parameter 1 `--geometry` is Window Width x Height + Width Offset + Height Offset
- Parameter 2 can be your own icon (in this case Intel CPU image) otherwise it defaults to computer icon


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## `cpuf` Bash script

This section requires you to open a terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>.

### How to setup

In order to function, `cpuf` bash script requires:

``` 
sudo apt install yad         # from the repository universe
sudo apt install coreutils   # installed by default in most distros

```

It's easiest when you place `cpuf` script into a root-owned directory within your search path. For example: `/usr/local/bin`.

To create `cpuf` script open the editor with `sudo -H gedit /usr/local/bin/cpuf`.

- Highlight the lines in section below
- Right click and select "Copy"
- Toggle back to your editor
- Right click and select "Paste"
- From the editor menu select "Save" and then "Exit"

Make the script executable with `sudo chmod a+x /usr/local/bin/cpuf`.

### `cpuf` code to copy to your editor

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: cpuf (Pronounced SEA-PUFF)
# CALL: sudo cpuf
# PARM: $1 = --geometry=WidthxHeight+VertOffset+HorizOffset
#       $2 = Optional image icon

# DESC: Simple GUI script to set CPU Min and Max Frequency.
#       For Ask Ubuntu Question: https://askubuntu.com/q/1141605/307523
# DATE: May 12, 2019.
# UPDT: No updates yet.
# NOTE: No notes yet.

### Dependancies ###

command -v yad >/dev/null 2>&1 || { echo >&2 \
        "yad package required but it is not installed.  Aborting."; \
        exit 1; }

command -v nproc >/dev/null 2>&1 || { echo >&2 \
        "coreutils package required but it is not installed.  Aborting."; \
        exit 2; }

if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo >&2 Must be called with sudo powers
    exit 3
fi

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical \
    "$0 cannot be run from GUI without TERM environment variable."
    exit 4
fi

### Program constants ###

## Yad Window parameters
# Hard code Height & Width to suit your screen resolution and scaling factor
GEOMETRY="--width 400 --height 500"
# Pass Parameter 1 with ---geometry="WidxHgt+WidOff+HgtOff" to override
[[ "$1" == --geometry=* ]] && GEOMETRY="$1"

TITLE="cpuf"
TEXT="Set CPU Min/Max Frequencies"
ICON="/usr/share/icons/Adwaita/48x48/devices/computer.png"
# Pass Parameter 2 with icon for window image
# Intel CPU comes from: https://www.gnome-look.org/p/1107932/
[[ ! -z "$2" ]] && ICON="$2"

## Virtual File System directories
      CPU0_DIR=/sys/devices/system/cpu/cpu0/cpufreq
    PSTATE_DIR=/sys/devices/system/cpu/intel_pstate
 CURR_MIN_FREQ="$CPU0_DIR/scaling_min_freq"
 CURR_MAX_FREQ="$CPU0_DIR/scaling_max_freq"
ALLOW_MIN_FREQ="$CPU0_DIR/cpuinfo_min_freq"
ALLOW_MAX_FREQ="$CPU0_DIR/cpuinfo_max_freq"

OLD_IFS=$IFS            # Save current Input File Separtor (IFS)
declare -a Arr          # Array for YAD Window input
NumCPU=$(nproc --all)   # Number of CPUs (nproc from coreutils)

### Error Message Functions ###

Abend () {
    # Abnormal Ending - Parameter 1 = message to display, Parameter 2=exit code

    yad --image "dialog-error" --image-on-top --title "$TITLE - Fatal Error" \
        "$GEOMETRY" --button=gtk-ok:0 --text "$1" 2>/dev/null
    exit "$2"
   
} # Abend

ErrMsg () {
    # Parmater 1 = message to display

    yad --image "dialog-error" --title "$TITLE - Logical Error" \
        "$GEOMETRY" --button=gtk-ok:0 --text "$1" 2>/dev/null

    fErrMsgForceContinue=true
 
} # ErrMsg

### Initialize Variables ###

InitVars () {

    [[ ! -e "$ALLOW_MIN_FREQ" ]] && Abend "$ALLOW_MIN_FREQ not found" 11
    AllowMinFreq=$(cat "$ALLOW_MIN_FREQ")
    AllowMinFreq="${AllowMinFreq::-3}"  # Chop off three decimals at end

    [[ ! -e "$ALLOW_MAX_FREQ" ]] && Abend "$ALLOW_MAX_FREQ not found" 12
    AllowMaxFreq=$(cat "$ALLOW_MAX_FREQ")
    AllowMaxFreq="${AllowMaxFreq::-3}"

    [[ ! -e "$CURR_MIN_FREQ" ]] && Abend "$CURR_MIN_FREQ not found" 13
    CurrMinFreq=$(cat "$CURR_MIN_FREQ")
    CurrMinFreq="${CurrMinFreq::-3}"
    NewMinFreq="$CurrMinFreq"

    [[ ! -e "$CURR_MAX_FREQ" ]] && Abend "$CURR_MAX_FREQ not found" 14
    CurrMaxFreq=$(cat "$CURR_MAX_FREQ")
    CurrMaxFreq="${CurrMaxFreq::-3}"
    NewMaxFreq="$CurrMaxFreq"

    if [[ -e "$PSTATE_DIR" ]] ; then
        NumPstates=$(cat "$PSTATE_DIR/num_pstates")
        if [[ $(cat "$PSTATE_DIR/no_turbo") -eq 0 ]] ; then
            TurboBoost="Enabled"
        else
            TurboBoost="Disabled"
        fi
    else
        NumPstates="Not found"
        TurboBoost="Not found"
    fi

    if [[ -e "$CPU0_DIR/scaling_governor" ]] ; then
        Governor=$(cat "$CPU0_DIR/scaling_governor")
    else
        Governor="Not found"
    fi

    if [[ -e "$CPU0_DIR/scaling_cur_freq" ]] ; then
        CurrFreq=$(cat "$CPU0_DIR/scaling_cur_freq")
        # Chop off three decimals at end
        CurrFreq="${CurrFreq::-3}"
    else
        CurrFreq="Not found"
    fi

} # InitVars

### Paint / repaint window and get new frequencies ###

GetParameters () {

    # +------------------------------------------+
    # |  cpuf - Set CPU Min/Max Frequencies      |
    # +------------------------------------------+
    # |                                          |
    # |  Turbo Boost:            Enabled         |
    # |                                          |
    # |  Number of pstates:      99              |
    # |  Speed Governor Used:    powersave       |
    # |  Current CPU0 frequency: 9999 Mhz        |
    # |                                          |
    # |  Current Minimum Freq.:  9999 Mhz        |
    # |  Current Maximum Freq.:  9999 Mhz        |
    # |                                          |
    # |  New Minimum Frequency   9999            |
    # |  New Maximum Frequency   9999            |
    # |                                          |
    # +------------------------------------------+

    IFS="|"
    Arr=($(yad "$GEOMETRY" --form \
        --title "$TITLE" --text "$TEXT" \
        --window-icon="$ICON" --image="$ICON" \
        --field="Turbo Boost:":RO "$TurboBoost" \
        --field="Number of pstates:":RO "$NumPstates" \
        --field="Speed Governor:":RO "$Governor" \
        --field="Current Frequency:":RO "$CurrFreq MHz" \
        --field="Allowable Minimum Frequency:":RO "$AllowMinFreq MHz" \
        --field="Allowable Maximum Frequency:":RO "$AllowMaxFreq MHz" \
        --field="Current Minimum Frequency:":RO "$CurrMinFreq MHz" \
        --field="Current Maximum Frequency:":RO "$CurrMaxFreq MHz" \
        --field="New Minimum Frequency" "$NewMinFreq" \
        --field="New Maximum Frequency" "$NewMaxFreq" 2>/dev/null))

    Return="$?"
    NewMinFreq="${Arr[8]}"
    NewMaxFreq="${Arr[9]}"

} # GetParameters

###################################
#            MAINLINE             #
###################################

ALL_PREFIX="/sys/devices/system/cpu/cpu"
MIN_SUFFIX="/cpufreq/scaling_min_freq"
MAX_SUFFIX="/cpufreq/scaling_max_freq"

while true ; do

    InitVars
    GetParameters
    [[ ! "$Return" -eq 0 ]] && break ; # Exit on Cancel=1 or Close Window=252

    # Sanity checks
    fErrMsgForceContinue=false
    [[ $NewMinFreq -lt $AllowMinFreq ]] && ErrMsg "Minimum frequency too low"
    [[ $NewMaxFreq -gt $AllowMaxFreq ]] && ErrMsg "Maximum frequency too high"
    [[ $NewMinFreq -gt $NewMaxFreq ]]   && ErrMsg "Minimum frequency greater than Maximum Frequency"
    [[ $fErrMsgForceContinue == true ]] && continue
    
    # Set new Min/Max frequencies
    for (( i=0 ; i<NumCPU ; i++ )) ; do
        # If New Min > Curr Max, set Max first then Min
        if [[ $NewMinFreq -gt $CurrMaxFreq ]] ; then
            echo "$NewMaxFreq""000" > "$ALL_PREFIX$i$MAX_SUFFIX"
            echo "$NewMinFreq""000" > "$ALL_PREFIX$i$MIN_SUFFIX"
        else
            echo "$NewMinFreq""000" > "$ALL_PREFIX$i$MIN_SUFFIX"
            echo "$NewMaxFreq""000" > "$ALL_PREFIX$i$MAX_SUFFIX"
        fi
    done
    

done

IFS="$OLD_IFS"
exit 0

```

  [1]: https://i.stack.imgur.com/2lHSD.gif


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

