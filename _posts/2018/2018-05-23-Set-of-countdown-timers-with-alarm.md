---
layout:       post
title:        >
    Set of countdown timers with alarm
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1039377
type:         Answer
tags:         software-recommendation multi-timer yad
created_date: 2018-05-23 11:14:12
edit_date:    2021-12-04 22:06:42
votes:        "11 "
favorites:    
views:        "4,151 "
accepted:     Accepted
uploaded:     2022-01-09 05:38:31
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Multi-timer

`multi-timer` is a bash script that works in all Ubuntu versions. It also works in Windows 10 with Ubuntu Desktop installed. `yad` is used for GUI setup and countdown progress bars.

[![peek wash cycle.png][1]][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Features

- Retains configuration between uses.
- Up to 19 timers run sequentially in a set.
- Progress bar for each timer.
- Set of timers can be run multiple times.
- Progress bar for set.
- Progress bar for all sets.
- Optional prompt to start each timer and/or set.
- Optional pop-up message when each timer and/or set ends.
- Optional alarm when each timer and/or set ends.
- Optional lock screen when each timer OR set OR all sets end.
- Optional interface to Sysmonitor Indicator so Systray shows countdowns.
- Optional close progress bar display when all sets of timers end.

Requires `yad` package `sudo apt install yad`


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Notebook Configuration Tab

`yad` (**Y**et **A**nother **D**ialog) has a feature that allows `multi-timer` fields to be divided between two separate panels accessed within one window via notebook tabs.

The ***Configuration Tab*** lets you:

- define time units in Seconds/Minutes
- define how many times to run set of timers.
- link to sound file used for timer alarms
- option to lock screen at end of each timer, set, or all sets
- additional options as illustrated below

[![multi-timer configuration.png][2]][2]


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Notebook Timers Tab

The ***Timers Tab*** allows you to:

- Define alias for each timer rather than Timer 1, Timer 2, etc.
- Set the number of seconds or minutes each timer runs.

[![multi-timer timers.png][3]][3]


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Progress Bar Display

As `multi-timer` counts down progress bars are used for:

- each ***active*** timer (zero duration timers are not shown)
- each set (if two or more active timers in set)
- all sets (if two or more sets run)

[![multi-timer progress bars.gif][4]][4]


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## Bash Script

Copy and paste the bash script below to filename `multi-timer`. I suggest the directory `/home/<your_user_name>/bin/`. Afterwards mark the script as executable using:

``` 
chmod a+x /home/<your_user_name>/bin/multi-timer

```

### Changing number of Timers

At line number 78, 79 and 80 you will see this:

``` 
# No. of timers default is 17 for 768 line screen and TMR_DURATION_NDX is 30
TMR_DURATION_NDX=30 # Set to 28 for 800x600 screen, 32 for 1920x1080 screen
MAX_TIMERS=17       # Set to 15 for 800x600 screen, 19 for 1920x1080 screen

```

Although 19 timers are supported, they might only fit on a 1920x1080 screen. About 17 (the default setting) will fit on the average 1024x768 screen. If you have Super VGA with 800x600 resolution you might only get 13 to 15 timers.

You must change the values on lines 85 & 86 at the same time:

``` 
Bash field name    ----------- Values to assign ---------
TMR_DURATION_NDX   23  24  25  26  27  28  29  30  31  32
MAX_TIMERS         10  11  12  13  14  15  16  17  18  19

```

eg If you want a maximum of 12 timers, set `TMR_DURATION_NDX=25` and `MAX_TIMERS=12`.

After changing the Index and Maximum save the `multi-timer` file. If you have already run the program once a configuration file may have been created and it will have to be deleted. Use this command to remove the old configuration file:

``` 
rm ~/.multi-timer

```

Note that `~/` is a short cut to your home directory, ie `/home/your_user_name/`.


### Requirements for `multi-timer`

Multi-timer requires the following packages to be installed:

``` 
sudo apt install yad
sudo apt install libnotify-bin

```

`yad` is required for the windows and `libnotify-bin` is required for optional pop up message when a timer ends.


### Bash code for `multi-timer`



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: multi-timer
# DESC: Multiple timers countdown with alarm.
#       https://askubuntu.com/questions/1039357
#       /a-timer-to-set-up-different-alarms-simultaneosly

# DATE: May 31, 2018. Modified Nov 21, 2021.

# UPDT: 2018-06-07 Add new index for check box: "automatically close
#           progress bar display when all Sets finish". Remove '~/.multi-timer'
#           to delete configuration file before running update.

#       2018-06-19 Set fWindows flag to TRUE/FALSE instead of true/false.

#       2018-11-04 Early exit call Cleanup ()? For some reason sysmon-indicator
#           still displays: '~/.lock-screen-timer-remaining'???
#           Alarm only sounding for first timer but pop-up appears for all???
#           See changes to /etc/pulse/default.pa below:
#### Automatically suspend sinks/sources that become idle for too long
# Nov 4, 2018 - causes 3 to 5 second delay if last sound was 30 seconds ago.
# So you get sound delayed unpausing video or miss multi-timer alerts. Add #
# load-module module-suspend-on-idle
#           Although this fixes delay when switching between sound sources,
#           still change default alarm to sound file over 5 seconds long.

#       2018-12-05 HDD LED indicator flashing constantly while progress bars
#           are updated / program sleeps. Make LastWakeMicroSeconds dependant
#           on lost time log enabled only.

#       2019-03-23 Change default number of timers from 17 to 10 which suits
#           Windows 10 better and is more realistic number for most users.
#           Change grep arguments for "fWindows10" flag.
#           Put "Linux" or "Windows 10" as title prefix.
#           Set Windows 10 Sound file default to C:\Windows\media\Ring05.wav.
#           Error when notify-send command installed (minimal Windows 10).
#	    Override "/mnt/c/Windows..." to "C:\Windows..." when invoked.

#       2019-05-22 Suppress Transient Parent messages

#       2019-08-07 When quiting timer progress display spinning pizza remains
#           in application indicator driven by indicator system monnitor.

#       2020-09-10 Add Geometry option initally limited to parameter 1.

#       2021-01-31 Use /run/user/1000 to prevent hard disk activity light flash

#       2021-09-07 Change KEY="12345" to random number. Allows restarting.

#       2021-09-13 Use /run/user/$UID for multi-user systems.

#       2021-11-21 Remove dbus-send and use "loginctl lock-session" which is
#           a more universal way of locking screen in Linux.

# NOTE: The following naming conventions are used:
#           Functions must be defined above point where they are called.
#           Yad style TRUE/FALSE instead of Bash true/false convention.
#           Variables beginning with- s is string
#                                   - i is integer
#                                   - f is TRUE/FALSE
#                                   - a is array
#                                   - cb is combobox

# Must have the yad package.
command -v yad >/dev/null 2>&1 || { echo >&2 \
        "yad package required but it is not installed.  Aborting."; \
        exit 99; }

# Must have notify-send from libnotify-bin package
command -v notify-send >/dev/null 2>&1 || { echo >&2 \
        "libnotify-bin package required but it is not installed.  Aborting."; \
        exit 99; }

# Running under WSL (Windows Subsystem for Linux)?
if grep -qE "(Microsoft|WSL)" /proc/version &> /dev/null ; then
    fWindows10=TRUE
    DefaultSound="C:\Windows\media\Ring05.wav"
    TitlePrefix="Windows 10"
else
    fWindows10=FALSE
    DefaultSound="/usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga"
    TitlePrefix="Linux"
fi

# On Skylake i7-6700HQ .467 seconds lost over 1200 second timer due to display.
if [[ "$1" == "-l" ]] || [[ "$1" == "--log-lost-time" ]] ; then
    fLog=TRUE
else
    fLog=FALSE
fi

# Geometry e.g.: -g=4365+76 sets to X=4356 and Y=76
if [[ "$1" == -g=* ]] || [[ "$1" == --geometry=* ]] ; then
    XY="${1#*=}"        # Grab =X+Y side
    WindowX="${XY%+*}"  # Grab X+ side
    WindowY="${XY#*+}"  # Grab +Y side
    GEOMETRY="--geometry=0x0+$WindowX+$WindowY"
else
    GEOMETRY="--center"
fi


# Key for tying Notebook tabs together. Cannot be same key twice.
KEY=$(echo $[($RANDOM % ($[10000 - 32000] + 1)) + 10000] )

OIFS=$IFS;      # Save current IFS (Input File Separator)
IFS="|";        # Yad fields and Bash array indices separated by `|`
aMulti=()       # Main array for storing configuration
# Temporary files for Notebook output
res1=$(mktemp --tmpdir=/run/user/$UID iface1.XXXXXXXX) # Notebook Configuraion
res2=$(mktemp --tmpdir=/run/user/$UID iface2.XXXXXXXX) # Notebook Timers

# Suppress Transient parent error spam
exec 2> >(grep -v 'GtkDialog mapped without a transient parent' >&2)

Cleanup () {
    rm -f "$res1" "$res2"               # Remove temporary files
    IFS=$OIFS;                          # Retore Input File Separator
    if [[ -f ~/.lock-screen-timer-remaining ]]; then
        # Remove Sysmonitor Indicator interface file.
        rm -f ~/.lock-screen-timer-remaining
    fi
} # Cleanup

# Comboboxes, constants and Index offsets
cbTimeUnits="Seconds!Minutes"
cbLockScreen="Never!Each timer end!Each set end!All sets end"

TIME_UNIT_NDX=0
SET_COUNT_NDX=1
PROGRESS_INTERVAL_NDX=2
ALARM_FILENAME_NDX=3
LOCK_SCREEN_NDX=4
PROMPT_BEFORE_TIMER_NDX=5
END_TIMER_MESSAGE_NDX=6
END_TIMER_ALARM_NDX=7
PROMPT_BEFORE_SET_NDX=8
END_SET_MESSAGE_NDX=9
END_SET_ALARM_NDX=10
SYSMONITOR_INDICATOR_NDX=11
CLOSE_PROGRAM_AT_END_NDX=12
TMR_ALIAS_NDX=13
# No. of timers default is 17 for 768 line screen and TMR_DURATION_NDX is 30
TMR_DURATION_NDX=23 # Set to 28 for 800x600 screen, 32 for 1920x1080 screen
MAX_TIMERS=10       # Set to 15 for 800x600 screen, 19 for 1920x1080 screen

ReadConfiguration () {

    if [[ -s ~/.multi-timer ]]; then
        read -ra aMulti < ~/.multi-timer
        for (( i=0; i<MAX_TIMERS; i++ )); do
            aAlias[i]="${aMulti[ i+TMR_ALIAS_NDX ]}"
            aDuration[i]="${aMulti[ i+TMR_DURATION_NDX ]}"
        done
        # Set Combobox default with ^ prefix
        Str="${aMulti[TIME_UNIT_NDX]}"
        cbTimeUnits="${cbTimeUnits/$Str/\^$Str}"
        Str="${aMulti[LOCK_SCREEN_NDX]}"
        cbLockScreen="${cbLockScreen/$Str/\^$Str}"
    else
        # Create new file
        aMulti[TIME_UNIT_NDX]="Seconds"
        aMulti[SET_COUNT_NDX]=1
        aMulti[PROGRESS_INTERVAL_NDX]=1
        aMulti[ALARM_FILENAME_NDX]="$DefaultSound"
        aMulti[LOCK_SCREEN_NDX]="Never"
        aMulti[PROMPT_BEFORE_TIMER_NDX]="FALSE"
        aMulti[END_TIMER_MESSAGE_NDX]="FALSE"
        aMulti[END_TIMER_ALARM_NDX]="TRUE"
        aMulti[PROMPT_BEFORE_SET_NDX]="FALSE"
        aMulti[END_SET_MESSAGE_NDX]="FALSE"
        aMulti[END_SET_ALARM_NDX]="FALSE"
        aMulti[SYSMONITOR_INDICATOR_NDX]="FALSE"
        aMulti[CLOSE_PROGRAM_AT_END_NDX]="FALSE"
        aAlias=("Timer 1" "Timer 2" "Timer 3" "Timer 4" "Timer 5" \
                "Timer 6" "Timer 7" "Timer 8" "Timer 9" "Timer 10" \
                "Timer 11" "Timer 12" "Timer 13" "Timer 14" "Timer 15" \
                "Timer 16" "Timer 17" "Timer 18" "Timer 19")
        aDuration=(0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0)
    fi

} # ReadConfiguration

BuildTimerPage () {

    aTimerPage=()
    for ((i=0; i<MAX_TIMERS; i++)); do
        b1=$(( i + 1 ))
        aTimerPage+=("--field=Timer $b1 Alias:")
        aTimerPage+=("${aAlias[i]}")
    done
    for ((i=0; i<MAX_TIMERS; i++)); do
        aTimerPage+=("--field=Duration::NUM")
        aTimerPage+=("${aDuration[i]}")
    done
}

GetParameters () {

    # configuration notebook page
    yad --plug=$KEY --tabnum=1 --form \
    --field="Timer duration units::CB" "$cbTimeUnits" \
    --field="Number of times to run set (all timers)::NUM" \
            "${aMulti[SET_COUNT_NDX]}"!1..99!1!0 \
    --field="Progress Bar update every x seconds::NUM" \
            "${aMulti[PROGRESS_INTERVAL_NDX]}"!1..60!1!0 \
    --field="Alarm sound filename:FL" "${aMulti[ALARM_FILENAME_NDX]}" \
    --field="Lock screen::CB" "$cbLockScreen" \
    --field="Ask to begin each timer:CHK" \
            "${aMulti[PROMPT_BEFORE_TIMER_NDX]}" \
    --field="Pop-up message when each timer ends:CHK" \
            "${aMulti[END_TIMER_MESSAGE_NDX]}" \
    --field="Sound alarm when each timer ends:CHK" \
            "${aMulti[END_TIMER_ALARM_NDX]}" \
    --field="Ask to begin each set (all timers):CHK" \
            "${aMulti[PROMPT_BEFORE_SET_NDX]}" \
    --field="Pop-up message when each set ends:CHK" \
            "${aMulti[END_SET_MESSAGE_NDX]}" \
    --field="Sound alarm when each set ends:CHK" \
            "${aMulti[END_SET_ALARM_NDX]}" \
    --field="Interface to Sysmonitor Indicator:CHK" \
            "${aMulti[SYSMONITOR_INDICATOR_NDX]}" \
    --field="Auto close progress bar display when all sets end:CHK" \
            "${aMulti[CLOSE_PROGRAM_AT_END_NDX]}" > "$res1" &

    # timers notebook page
    BuildTimerPage
    yad --plug=$KEY --tabnum=2 --form --columns=2 \
        "${aTimerPage[@]}" > "$res2" &

    # run main dialog
    #  --image=gnome-calculator
    if yad --notebook --key=$KEY --tab="Configuration" --tab="Timers" \
        --image=/usr/share/icons/gnome/48x48/status/appointment-soon.png \
        --title="$TitlePrefix multi-timer setup" --auto-close \
        --width=400 --image-on-top --text="Multiple Timer settings" \
        "$GEOMETRY"
    then

        # When LC_NUMERIC=it_IT-UTF8 30 seconds can be `30,000000` or
        # `30.000000` which breaks bash tests for `-gt 0`.
        # Search and replace ".000000" or ",000000" to null
        sed -i 's/[,.]000000//g' "$res1"
        sed -i 's/[,.]000000//g' "$res2"

        # Save configuration
        truncate -s -1 "$res1" # Remove new line at EOF
        cat "$res1" >  ~/.multi-timer
        truncate -s -2 "$res2" # Remove trailing "|" and new line at EOF
        cat "$res2" >> ~/.multi-timer
        # Get user changes into aAlias & aDuration
        ReadConfiguration
        return 0
    else
        return 1    # Cancel click or Escape press
    fi

}

fNewRun=FALSE
fNewTimer=FALSE
iSetSaveSec=0

InitTimers () {

    if [[ "${aMulti[TIME_UNIT_NDX]}" == "Seconds" ]]; then
        fUnitsInSeconds=TRUE
    else
        fUnitsInSeconds=FALSE
    fi

    iActiveTimersCount=0
    for ((i=0; i<MAX_TIMERS; i++)); do
        if [[ ${aDuration[i]} -gt 0 ]] ; then
            (( iActiveTimersCount++ ))
            iSetSaveSec=$(( iSetSaveSec + ${aDuration[i]} ))
        fi
    done

    # Progress Bars, 1 per timer + optional: set and/or set count
    iAllSetsSaveCount="${aMulti[SET_COUNT_NDX]}"
    iAllSetsRemainingCount=$iAllSetsSaveCount
    fSetProgressBar=FALSE # Summary progress bar when > 1 timer used
    iSetProgressBarNo=0
    fAllSetsProgressBar=FALSE  # Summary progress bar when > 1 run
    iAllSetsProgressBarNo=0
    if [[ $iActiveTimersCount -eq 0 ]]; then
        # If active timers count = 0, error message & clear run count
        yad --title "mutli-timer error" "$GEOMETRY" --text \
            "At least one non-zero timer required." --image=dialog-error \
            --on-top --borders=20 --button=gtk-close:0
        iAllSetsRemainingCount=0 # Set orderly exit via sibling function(s)
        iProgressBarCount=0
        fAbend=TRUE
    else
        # Active timers count > 0 so calculate times
        fNewTimer=TRUE
        fNewRun=TRUE
        [[ $fUnitsInSeconds == FALSE ]] && \
            iSetSaveSec=$(( iSetSaveSec * 60 ))
        iAllSetsSaveCountSec=$(( iSetSaveSec * iAllSetsRemainingCount ))
        iAllSetsElapsedSec=0
        iProgressBarCount=$iActiveTimersCount
        if [[ $iActiveTimersCount -gt 1 ]]; then
            (( iProgressBarCount++ )) # Extra progress bar for Set
            fSetProgressBar=TRUE
            iSetProgressBarNo=$iProgressBarCount
        fi
        if [[ $iAllSetsRemainingCount -gt 1 ]]; then
            (( iProgressBarCount++ )) # Extra progress bar for Set Count
            fAllSetsProgressBar=TRUE
            iAllSetsProgressBarNo=$iProgressBarCount
        fi
    fi

    # Friendly variable names instead of Array entries
    iProgressSleepSeconds="${aMulti[PROGRESS_INTERVAL_NDX]}"
    sSoundFilename="${aMulti[ALARM_FILENAME_NDX]}"
    if [[ $fWindows10 == TRUE ]] ; then
        mod="${sSoundFilename//\//\\}" # Replace Linux / with Windows \
	mod="${mod#*Windows}"          # Remove "/mnt/whatever/Windows"
        sSoundFilename="C:\\Windows""\\$mod"
    fi

    fPromptBeforeTimer="${aMulti[PROMPT_BEFORE_TIMER_NDX]}"
    fEndTimerMessage="${aMulti[END_TIMER_MESSAGE_NDX]}"
    fEndTimerAlarm="${aMulti[END_TIMER_ALARM_NDX]}"
    fPromptBeforeSetRun="${aMulti[PROMPT_BEFORE_SET_NDX]}"
    fEndSetMessage="${aMulti[END_SET_MESSAGE_NDX]}"
    fEndSetAlarm="${aMulti[END_SET_ALARM_NDX]}"
    fSysmonitorIndicator="${aMulti[SYSMONITOR_INDICATOR_NDX]}"
    fCloseProgramAtEnd="${aMulti[CLOSE_PROGRAM_AT_END_NDX]}"
} # InitTimers

# Optional lost time log file monitors program execution time for progress
# bars
[[ $fLog == TRUE ]] && echo "multi-timer lost time log"  > ~/multi-timer.log

PromptToStart () {

    # $1= Message key text
    # Dialog box to proceed with timer.
    yad --title "mutli-timer notification" "$GEOMETRY" --on-top \
        --fontname="Serif bold italic 28" \
        --text "Ready to start $1" \
        --image=/usr/share/icons/gnome/48x48/status/appointment-soon.png \
        --borders=20 --button=gtk-execute:0

    # Eliminates time waiting for user input
    [[ $fLog == TRUE ]] && LastWakeMicroSeconds=$(date +%s%N)
}

EndMessageAndAlarm () {

    # $1= fEndTimerMessage, $2= fEndTimerAlarm, $3= Message key text

    # Sound alarm when timer ends
    if [[ "$2" == TRUE ]]; then
        if [[ $fWindows10 == TRUE ]] ; then
            powershell.exe -c "(New-Object Media.SoundPlayer $sSoundFilename).PlaySync();"
        elif [[ ! -f "$sSoundFilename" ]]; then
            notify-send --urgency=critical "multi-timer" \
            --icon=/usr/share/icons/gnome/48x48/status/appointment-soon.png \
            "Sound file not found: $sSoundFilename"
        else
            paplay "$sSoundFilename" ;
        fi
    fi

    # Bubble message when timer ends
    if [[ "$1" == TRUE ]]; then
        notify-send --urgency=critical "multi-timer" \
            --icon=/usr/share/icons/gnome/48x48/status/appointment-soon.png \
            "$3 has ended."
        # Something bold to test. Set $3 has ended. into $phrase
        # /usr/bin/notify-send  --urgency=critical --icon=clock -t 4000 \
        # "<i>Time Now</i>" "<span color='#57dafd' font='26px'><i><b>$phrase</b></i></span>" >/dev/null 2>&1

    fi
}

LockScreenCheck () {

    # $1=Run type being checked:
    # "Each timer end" / "Each set end" / "All sets end"
    [[ "$1" != "${aMulti[$LOCK_SCREEN_NDX]}" ]] && return 0

    # When locking screen override & prompt to start next timer / run
    [[ "$1" == "Each timer end" ]] && fPromptBeforeTimer=TRUE
    [[ "$1" == "Each set end"   ]] && fPromptBeforeSetRun=TRUE

    if [[ $fWindows10 == TRUE ]]; then
        # Call lock screen for Windows 10
        rundll32.exe user32.dll,LockWorkStation
    else
        # Call screen saver lock for Unbuntu versions >= 14.04.
        # dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock
        # Call lock screen for all Linux distributions
        loginctl lock-session
    fi
}

iCurrTimerNo=0
iCurrTimerNdx=0
TotalLostTime=0

PrepareNewSet () {

    # Was a set just completed?
    if [[ $iAllSetsRemainingCount -ne $iAllSetsSaveCount ]]; then
        # Display mssage and/or sound alarm for set end
        EndMessageAndAlarm $fEndSetMessage $fEndSetAlarm \
                           "$sSetProgressText"
        # Check to lock screen
        LockScreenCheck "Each set end"
    fi

    if [[ $iAllSetsRemainingCount -eq 0 ]]; then
        # We are done. Force exit from all while loops.
        fNewRun=FALSE
        fNewTimer=FALSE
    else
        # Decrement remaining run count and start at first timer.
        (( iAllSetsRemainingCount-- ))
        iSetElapsedSec=0
        fNewTimer=TRUE
        iCurrTimerNo=0
        iCurrTimerNdx=0
        iNextTimerNdx=0
        iCurrSetNo=$(( iAllSetsSaveCount - iAllSetsRemainingCount ))
        sSetProgressText="Set $iCurrSetNo of $iAllSetsSaveCount"
        [[ $fPromptBeforeSetRun == TRUE ]] && \
            PromptToStart "$sSetProgressText"
    fi
}

PrepareNewTimer () {

    iCurrTimerElapsedSec=0
    if [[ $iCurrTimerNo -eq $iActiveTimersCount ]]; then
        # Last timer done. Force exit from inner while loop.
        fNewTimer=FALSE
        return 0
    fi

    for ((i=iNextTimerNdx; i<MAX_TIMERS; i++ )); do
        if [[ ${aDuration[i]} -gt 0 ]]; then
            iCurrTimerNdx=$i
            (( iCurrTimerNo++ ))    # Increment progress bar number
            iNextTimerNdx=$(( iCurrTimerNdx + 1 ))
            iCurrTimerSaveSec=${aDuration[i]}
            [[ $fUnitsInSeconds == FALSE ]] && \
                            iCurrTimerSaveSec=$(( iCurrTimerSaveSec * 60 ))
            iCurrTimerRemainingSec=$iCurrTimerSaveSec
            break
        fi
    done
}

# Next function could be embedded within InitTimers to save space
# and code line count but this provides better readability IMO.
SetupYadProgressBars () {

    aYadProgressBars=("yad" "--multi-progress" "$GEOMETRY")
    aYadProgressBars+=("--title=multi-timer progress")
    [[ $fCloseProgramAtEnd == TRUE ]] && aYadProgressBars+=("--auto-close")
    aYadProgressBars+=("--watch-bar$iProgressBarCount")

    for ((i=0; i<MAX_TIMERS; i++)); do
        if [[ ${aDuration[i]} -gt 0 ]] ; then
            b1=$(( i + 1 ))
            aYadProgressBars+=("--bar=Timer $b1 - ${aAlias[i]}:NORM")
        fi
    done

    if [[ $fSetProgressBar == TRUE ]]; then
        aYadProgressBars+=("--bar=Set:NORM")
    fi
    if [[ $fAllSetsProgressBar == TRUE ]]; then
        aYadProgressBars+=("--bar=All Sets:NORM")
    fi
}

DisplayProgressBar () {

    # Parameters
    # $1=Elapsed Time, $2=Total Time, $3=Bar Number, 
    # $4=TRUE/FALSE if eligible to update Sysmonitor Indicator
    # $5=Sysmonitor Indicator text for interface file or null
    # $6=Progress Text Prefix, ie "Set 2 of 4: " or null
    iPercentage=$(( $1 * 100 / $2 ))
    echo "$3:$iPercentage"

    RemainingSec=$(( $2 - $1 ))
    h=$((RemainingSec/3600))
    m=$(((RemainingSec%3600)/60))
    s=$((RemainingSec%60))

    TimeRemaining=""
    [[ $h -gt 0 ]] && TimeRemaining=$TimeRemaining" $h Hours"
    [[ $m -gt 0 ]] && TimeRemaining=$TimeRemaining" $m Minutes"
    [[ $s -gt 0 ]] && TimeRemaining=$TimeRemaining" $s Seconds"
    if [[ $TimeRemaining == "" ]]; then
        echo "$3:#$6Finished."
    else
        echo "$3:#$6$TimeRemaining remaining."
    fi

    if [[ $fSysmonitorIndicator == TRUE ]] && [[ $4 == TRUE ]]; then
        echo "$5: $TimeRemaining" > ~/.lock-screen-timer-remaining
    fi
}

ProcessCurrTimer () {

    sTimerAlias="${aAlias[iCurrTimerNdx]}"

    # Dialog box to proceed with timer.
    [[ $fPromptBeforeTimer == TRUE ]] && PromptToStart "$sTimerAlias"

    iLastSleepSec=0
    [[ $fLog == TRUE ]] && echo Start timer: "${aAlias[iCurrTimerNdx]}" \
        >> ~/multi-timer.log

    while [[ $iCurrTimerElapsedSec -lt $iCurrTimerSaveSec ]]; do

        iCurrTimerElapsedSec=$(( iCurrTimerElapsedSec + iLastSleepSec))
        iSetElapsedSec=$(( iSetElapsedSec + iLastSleepSec))
        iAllSetsElapsedSec=$(( iAllSetsElapsedSec + iLastSleepSec))

        DisplayProgressBar $iCurrTimerElapsedSec $iCurrTimerSaveSec \
            $iCurrTimerNo TRUE "${aAlias[iCurrTimerNdx]}" "" ""
        if [[ $fSetProgressBar == TRUE ]] ; then
            DisplayProgressBar $iSetElapsedSec $iSetSaveSec \
                           $iSetProgressBarNo FALSE "" "$sSetProgressText: "
        fi
        [[ $fAllSetsProgressBar == TRUE ]] && \
            DisplayProgressBar $iAllSetsElapsedSec $iAllSetsSaveCountSec \
                           $iAllSetsProgressBarNo FALSE "" ""

        # We sleep lesser of iProgressSleepSeconds or iCurrTimerRemainingSec
        iCurrTimerRemainingSec=$(( iCurrTimerRemainingSec - iLastSleepSec))
        if [[ $iProgressSleepSeconds -gt $iCurrTimerRemainingSec ]]; then
            iLastSleepSec=$iCurrTimerRemainingSec
        else
            iLastSleepSec=$iProgressSleepSeconds
        fi

        if [[ $fLog == TRUE ]] ; then
            tt=$((($(date +%s%N) - LastWakeMicroSeconds)/1000000))
            echo "Last lost time: $tt milliseconds" >> ~/multi-timer.log
            TotalLostTime=$(( TotalLostTime + tt ))
            echo "Total Lost: $TotalLostTime milliseconds" ~/multi-timer.log
        fi
        sleep $iLastSleepSec
        [[ $fLog == TRUE ]] && LastWakeMicroSeconds=$(date +%s%N)

    done

    # Currently removing Sysmonitor Indicator after current timer. Need to
    # modify to do it based on choice box for "Lock Screen".
    if [[ -f ~/.lock-screen-timer-remaining ]]; then
        # Remove Sysmonitor Indicator interface file.
        rm -f ~/.lock-screen-timer-remaining
    fi

    # Check for and display mssage and/or sound alarm
    EndMessageAndAlarm $fEndTimerMessage $fEndTimerAlarm \
                       "Timer: $sTimerAlias"

    # cbLockScreen="Never!Each timer end!Each set end!All sets end"  
    LockScreenCheck "Each timer end"
}

ZeroIndividualTimerProgressBars () {

    for ((i=1; i<=iActiveTimersCount; i++)); do
        echo "$i:0"
        echo "$i:#"
    done
}

###################################
#            MAINLINE             #
###################################

ReadConfiguration

if GetParameters ; then :
else
    # Escape or Cancel from yad notebook
    Cleanup
    exit 1
fi

InitTimers
if [[ $fAbend == TRUE ]]; then
    Cleanup
    exit 1
fi

SetupYadProgressBars
PrepareNewSet
[[ $fLog == TRUE ]] && LastWakeMicroSeconds=$(date +%s%N)

while [[ $fNewRun == TRUE ]]; do

    PrepareNewTimer
    while [[ $fNewTimer == TRUE ]]; do
        ProcessCurrTimer
        PrepareNewTimer
    done
    PrepareNewSet
    [[ $fNewRun == TRUE ]] && ZeroIndividualTimerProgressBars
    [[ $fLog == TRUE ]] && echo "Set Lost Time: $TotalLostTime milliseconds" \
        >> ~/multi-timer.log  # For some reason value is zero?

done | "${aYadProgressBars[@]}"

LockScreenCheck "All sets end"

# TO-DO why is $TotalLostTime zero below?
[[ $fLog == TRUE ]] && echo "All sets lost time: $TotalLostTime milliseconds" \
    >> ~/multi-timer.log

Cleanup

exit 0
```


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

## Sysmonitor Indicator Interface

You can have the System Tray / Application Indicator Area update with the time remaining along with a "spinning text pizza" as illustrated in the GIF in above the bash listing.

To setup Sysmonitor Indicator see this Q&A: [Can BASH display in systray as application indicator?]({% post_url /2017/2017-02-11-Can-BASH-display-in-systray-as-application-indicator? %})


  [1]: https://i.stack.imgur.com/4m75Y.gif
  [2]: https://i.stack.imgur.com/mDbYLl.png
  [3]: https://i.stack.imgur.com/pHZNHm.png
  [4]: https://i.stack.imgur.com/Actwjm.gif



<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

