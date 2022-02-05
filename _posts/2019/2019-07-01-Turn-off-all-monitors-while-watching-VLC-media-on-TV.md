---
layout:       post
title:        >
    Turn off all monitors while watching VLC media on TV
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155095
type:         Answer
tags:         vlc external-monitor tv
created_date: 2019-07-01 00:14:36
edit_date:    2020-06-12 14:37:07
votes:        "12 "
favorites:    
views:        "1,647 "
accepted:     Accepted
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-01-Turn-off-all-monitors-while-watching-VLC-media-on-TV.md
toc:          false
navigation:   true
clipboard:    true
---

I've created a script that slowly dims two monitors after 5 minutes of keyboard or mouse inactivity while you watch a movie on a third monitor. When you move your mouse or use your keyboard the two dimmed monitors quickly brighten (but not suddenly to shock you).


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Sample status screen

[![movie.sh status display.png][1]][1]

Before you think I watch too much TV note this is a laptop and the program has been running for many days and the laptop is suspended / resumed twice a day at least.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Setup Instructions

<!-- Language-all: lang-bash -->

Save the script below to a filename in your path such as `/usr/local/bin/movie.sh` or `/home/your_user_name/bin/movie.sh` and then use:

``` 
chmod a+x /path/to/script/movie.sh
```

Xorg's package `xprintidle` is required to track how long your computer has been idle since a mouse movement or keyboard activity:

``` 
sudo apt install xprintidle
```

Then to launch the script use:

``` 
movie.sh
```

**Note:** When testing, change `TIME_TO_FADE` from `200000` to `10000` so you only have to wait 10 seconds instead of 200 seconds for fading to start.


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## The script

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: movie.sh
# PATH: ~/eyesome
# DESC: Dim monitors 1 and 3 after 5 minutes of activity
# DATE: June 27, 2019. Modified November 5, 2019.
# PARM: Pass any parameter 1 to generate trace output

# UPDT: 2019-07-05 Add dependancy message. Improve sleep calcualation.
#       2019-09-01 Display how long dimming lasted in hours, minutes, seconds
#       2019-09-07 Do not brighten if toggling play / pause of movie with
#       mouse click or Enter key. Log first wake and if a second wake appears
#       within 1 to 3 seconds then wake up. Otherwise forget first wake signal.
#       2019-11-05 Replace scrolling messages with Statistics display.

: <<'END'
/* -----------------------------------------------------------------------------

CUSTOM NOTES
============
Put C-style free form notes here about disabling third party auto-brightness
sunrise / sunset applications like nightlight, redshift, flux, eyesome, etc.

CONFIGURATION FILE LOCATION
===========================
$ ll /usr/local/bin/.eyesome-cfg
-rw-r--r-- 1 root root 610 Jun 27 18:31 /usr/local/bin/.eyesome-cfg

CONFIGURATION FILE RECORD LAYOUT
================================
$ cat /usr/local/bin/.eyesome-cfg
https://www.timeanddate.com/sun/canada/edmonton|70.000000|120.000000|90.000000|
1.000000|TRUE| | | | |1|Disabled|Hardware|Alien 17" Builtin DIsplay|
intel_backlight|eDP-1-1|3500.000000|1.000000|1.000000|1.000000|850.000000|
1.000000|0.780000|0.650000|3500|1.000000:1.000000:1.000000| | | | |2|Enabled|
Software|Sony 50" TV|xrandr|HDMI-0|1.000000|1.000000|1.000000|1.000000|0.750000|
1.000000|0.950000|0.850000|1.00|1.000000:1.000000:1.000000| | | | |3|Disabled|
Software|Toshibal 43" 4K TV|xrandr|DP-1-1|1.000000|1.000000|1.000000|1.000000|
0.650000|1.000000|0.880000|0.780000|1.00|1.000000:1.000000:1.000000| | | | 

----------------------------------------------------------------------------- */
END

# If sudo powers not needed, eg no 3rd party auto-brightening to disable,
# then comment out the next four lines:
if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo >&2 "$0 must be called with sudo powers"
    exit 1
fi

command -v xprintidle >/dev/null 2>&1 || { echo >&2 \
        "xprintidle package required but it is not installed.  Aborting."; \
        exit 1; }

# To echo debug/trace statements to screen, pass any parameter to script
Debug=0
[[ $# -gt 0 ]] && Debug=1

# To get list of your monitors use: xrandr --verbose | grep " connected"
MON1="eDP-1-1"      # eDP-1-1 = Laptop display
MON2=""             # HDMI-0 = Sony TV
MON3="DP-1-1"       # DP-1-1 = Toshiba TV

# If you elect to turn backlight complete off and on you must use sudo
BACK="intel_backlight"  # Setting to blank means no backlight to turn off/on

# All seconds in millisconds, eg 1000 milliseconds = 1 second
TIME_TO_FADE=200000 # Keyboard/Mouse idle time before dim 300000 = 5 minutes
TIME_TO_WAKE=2000   # 2 second time or less to trigger brightening
FADE_SLEEP=.15      # When fading sleep seconds between monitor changes
WAKE_SLEEP=.025     # When waking sleep seconds between monitor changes

# Optional configurationfile for 3rd party auto brightnes / color temperature
CFG_FILE=""
# if nothing else is automatically controlling monitors comment out next line
CFG_FILE=/usr/local/bin/.eyesome-cfg

DisableAutoBright () {
    # Disable specific monitors from nightlight, redshift, flux, eyesome, ect.
    [[ $CFG_FILE == "" ]] && return # No third party apps
    [[ $MON1 != "" ]] && sed -i 's/1|Enabled/1|Disabled/g' "$CFG_FILE"
    [[ $MON2 != "" ]] && sed -i 's/2|Enabled/2|Disabled/g' "$CFG_FILE"
    [[ $MON3 != "" ]] && sed -i 's/3|Enabled/3|Disabled/g' "$CFG_FILE"
} # DisableAutoBright

EnableAutoBright () {
    # Renable specific monitors for nightlight, redshift, flux, eyesome, ect.
    [[ $CFG_FILE == "" ]] && return # No third party apps
    [[ $MON1 != "" ]] && sed -i 's/1|Disabled/1|Enabled/g' "$CFG_FILE"
    [[ $MON2 != "" ]] && sed -i 's/2|Disabled/2|Enabled/g' "$CFG_FILE"
    [[ $MON3 != "" ]] && sed -i 's/3|Disabled/3|Enabled/g' "$CFG_FILE"

    # Trigger 3rd party app to gradually set brightness based on sunrise/sunset
    /usr/local/bin/wake-eyesome.sh post eyesome-cfg.sh nosleep

} # EnableAutoBright

MonArr=()   # Index 0= Monitor # 1 to 3, 1=Xrandr Name, 2=Connected/Disconnected, 
            # 3=Save Bright "100"=1.0, 4=Current Bright "75"=0.75, 5=xprintidle cnt

PaintStats () {

    local i Image 

    Image=( \
    "╔═══════════════════════════════════════════════════════════════════╗"
    "║   movie.sh - Dim specific monitors when keyboard and mouse idle   ║"
    "╠═════════════════════════════════╤═════════════════════════════════╣"
    "║         Active Stats            │         Dimmed Stats            ║"
    "╟─────────────────────────────────┼─────────────────────────────────╢"
    "║ Total time:   1:30:22 (H:M:S)   │ Total Time:   0:30:25 (H:M:S)   ║"
    "║ Cycle Count:  999 cycles        │ Cycle Count:  999 cycles        ║"
    "║ Total checks: 9,999,999 checks  │ Total checks: 9,999,999 checks  ║"
    "╟─────────────────────────────────┼─────────────────────────────────╢"
    "║ This cycle:   99 Hours 99 Secs  │ Last cycle:   99 Hours 99 Secs  ║"
    "║ Last check:   Sat 1:52:39 pm    │ Dim started:  Sat 12:42:15 pm   ║"
    "║ Sleeping:     200 Seconds       │ Short wakes:  999 pause/plays   ║"
    "║ Next check:   Sat 1:53:49 pm    │ Dim ended:    Sat 1:31:08 pm    ║"
    "╚═════════════════════════════════╧═════════════════════════════════╝"
    )

    echo -e "\033[32m"  # Start green text
    for i in "${Image[@]}" ; do echo "$i" ; done
    echo -e "\033[0m"   # End green text

} # PaintStats        

PrintStr () {
    tput cup "$1" "$2" ; echo -e "                 "
    tput cup "$1" "$2" ; echo -e "$3"
} # PrintStr

PrintDig () {
    tput cup "$1" "$2" ; echo -e "                 "
    tput cup "$1" "$2" ; printf "%'d %s" "$3" "$4"
} # PrintDig

PrintDur () {

    local h m s FormattedElapsed
    (( h = ${3} / 3600 ))
    (( m = (${3}%3600) / 60 ))
    (( s = ${3}%60 ))
    FormattedElapsed="$h:$m:$s (H:M:S)"
    FormattedElapsed="$h""hr $m""mn $s""sc"

    tput cup "$1" "$2" ; echo -e "                 "
    PrintStr "$1" "$2" "$FormattedElapsed"
} # PrintDur

TotalActive=0
TotalDimmed=0
ActiveCount=1       # We are already active starting up
DimmedCount=0
ActiveChecks=0
DimmedChecks=0
ThisActiveTime=0
LastDimmedTime=0
LastActiveCheck=""
LastDimStarted=""
ActiveSleepTime=0
ShortCount=0
NextActiveCheck=""
LastDimEnded=""

UpdateStats () {

    tput sc             # Save Cursor
    echo -e "\033[36m"  # Start cyan text
    PrintDur  6 16 "$TotalActive"
    PrintDur  6 50 "$TotalDimmed"
    PrintDig  7 16 "$ActiveCount" "cycles"
    PrintDig  7 50 "$DimmedCount" "cycles"
    PrintDig  8 16 "$ActiveChecks" "checks"
    PrintDig  8 50 "$DimmedChecks" "checks"
    PrintDur 10 16 "$ThisActiveTime"
    PrintDur 10 50 "$LastDimmedTime"
    PrintStr 11 16 "$LastActiveCheck"
    PrintStr 11 50 "$LastDimStarted"
    PrintStr 12 16 "$ActiveSleepTime Seconds"
    PrintDig 12 50 "$ShortCount" "pause/plays"
    PrintStr 13 16 "$NextActiveCheck"
    PrintStr 13 50 "$LastDimEnded"
    echo -e "\033[0m"   # End cyan text
    tput rc             # Restore cursor
}
# UpdateStats

SetBrightness () {

    # Parm 1: XrandrMonitor Name
    # Parm 2: Math Brigthness Value
    local MON CurrBright
    MON="$1"
    MathBright="$2"

    [[ "${MathBright:0:1}" == "-" ]] && MathBright=0    # Negative not allowed
    [[ "$MathBright" -gt 999  ]] && MathBright=999      # Can't go over 9.99

    if [[ "${#MathBright}" -eq 3 ]] ; then
        MathBright="$MathBright"000         # Pad with lots of zeros
        CurrBright="${MathBright:0:1}.${MathBright:1:2}"
    elif [[ "${#MathBright}" -eq 1 ]] ; then
        CurrBright=".0$MathBright"
    else
        MathBright="$MathBright"000         # Pad with lots of zeros
        CurrBright=".${MathBright:0:2}"
    fi

    # Even if brigthness hasn't changed we want to set it each time so
    # that `xrandr` will lag sleep cycle by 25 milliseconds
    if [[ $CurrBright == ".0" ]] ; then
        xrandr --output "$MON" --off
    else    
        xrandr --output "$MON" --brightness "$CurrBright"   # Set new brightness
    fi
} # SetBrightness

GetCurrBright () {

    # Call this before starting to fade monitor. Parm1: Monitor Xrandr name
    # Setup for global variables failure
    MonMathBright="0"
    MonCurrBright="0.0"
    MonStatus="Disconnected"
    [[ $1 == "" ]] && return

    local CurrBright Left Right
    CurrBright=$( xrandr --verbose --current | \
                                      grep ^"$1 connected" -A5 | tail -n1 )
    [[ $CurrBright == "" ]] && { echo "$1 Monitor not found in xorg"; return; }

    MonStatus="Connected"
    MonCurrBright="${CurrBright##* }"  # Get brightness level with decimal place
    Left=${MonCurrBright%%"."*}        # Extract left of decimal point
    Right=${MonCurrBright#*"."}        # Extract right of decimal point

    [[ "$Left" != 0 ]] && MonMathBright="$Left"00   # 1.0 becomes "100"
    [[ "${#Right}" -eq 1 ]] && Right="$Right"0      # 0.5 becomes "50"
    MonMathBright=$(( MonMathBright + Right ))
    # ((Debug)) && echo "$MonName Starting brightness: $MonMathBright"

} # GetCurrBright

ConvertSeconds () {

    # Credit: https://stackoverflow.com/a/12199798/6929343
    local h m s
    ((h=${1}/3600))
    ((m=(${1}%3600)/60))
    ((s=${1}%60))
    printf "Monitor(s) dimmed for: "
    [[ $h -gt 0 ]] && printf "%d Hour(s) " $h
    [[ $m -gt 0 ]] && printf "%d Minute(s) " $m
    printf "%2d Second(s)\n" $s
    
} # ConvertSeconds

IgnoreShortWake () {

    # If this was just an accidental mouse movement or a singe Enter key to
    # pause / play movie then return false (1).

    local LastElapsed ShortTime
    LastElapsed=$(xprintidle)
    while true ; do
        sleep .1
        ShortTime=$(xprintidle)
        [[ $ShortTime -lt "$LastElapsed" ]] && return 0 # Real wakeup
        # User clicked play/pausse, incrment count and go back to sleep
        [[ $ShortTime -ge 3000           ]] && { (( ShortCount++ )); return 1; }
        LastElapsed="$ShortTime"    
    done

} # IgnoreShortWake

BrightenMonitors () {

    # If short mouse movement or single key press go back to sleep
    IgnoreShortWake
    [[ "$?" == "1" ]] && return 1   # Monitors not brightened

    # How long were we dimmed for?
    DimmingEnded="$SECONDS"
    DimmingDuration=$(( DimmingEnded - DimmingStarted ))
    TotalDimmed=$(( TotalDimmed + DimmingDuration ))

    (( ActiveCount++ ))
    ThisActiveTime=0

    # Turn monitor on and slowly raise brightness to saved setting
    [[ "$BACK" != "" && "$BackOff" == true ]] && \
        echo 0 > "/sys/class/backlight/$BACK/bl_power"
    BackOff=false

    local i m LastPercent NewMathBright
    LastPercent=0
    for (( m = 0 ; m < MonArrCnt ; m=m+MON_COL_CNT )); do   #loop for each monitor
        GetByNdx "$m"
        [[ $MonStatus == Disconnected ]] && continue
        # If dimming interrupted, start from last percentage and not 0%
        [[ $MonPercent -gt "$LastPercent" ]] && LastPercent="$MonPercent"
    done
#    if ((Debug)) ; then
#        echo Starting percentage: "$LastPercent"
#        ConvertSeconds "$DimmingDuration"
#    fi

    # Brighten by increments of 4% for quicker waking
    for (( i = LastPercent ; i <= 100 ; i=i+4 )); do    # loop from 0% to 100%
        [[ $i -ge 96 ]] && i=100 # If 96, next loop will be 100
        for (( m = 0 ; m < MonArrCnt ; m=m+MON_COL_CNT )); do   #loop for each monitor
            GetByNdx "$m"
            [[ $MonStatus == Disconnected ]] && continue
            [[ $MonMathBright -eq 0 ]] && MonMathBright=1
            NewMathBright=$(( MonMathBright * i / 100 ))
            SetBrightness "$MonName" "$NewMathBright"
            SetByNdx "$m"
            sleep "$WAKE_SLEEP"       # Very quick increase, so smaller sleep
        done
    done

    LastDimEnded=$(date +'%a %I:%M:%S %P')

    return 0        # Monitors were brigthened

} # BrightenMonitors

DimMonitors () {

    DimmingStarted="$SECONDS"
    LastDimmedTime=0
    (( DimmedCount++ ))
    local i m NewMathBright Elapsed
    for (( m = 0 ; m < MonArrCnt ; m=m+MON_COL_CNT )); do   #loop for each monitor
        GetByNdx "$m"
        # Get starting full brightness level, blank monitor name returns zeros
        GetCurrBright "$MonName"
        SetByNdx "$m"
    done

    # Dim by increments of 1% for slow fading
    for (( i = 100 ; i >= 0 ; i-- )); do    # loop from 100% to 0% brightness
        for (( m = 0 ; m < MonArrCnt ; m=m+MON_COL_CNT )); do   #loop for each monitor
            GetByNdx "$m"
            [[ $MonStatus == Disconnected ]] && continue
            NewMathBright=$(( MonMathBright * i / 100 ))
            SetBrightness "$MonName" "$NewMathBright"
            MonPercent="$i"
            SetByNdx "$m"
        done
        sleep "$FADE_SLEEP"         # slowly dim so longer sleep
        Elapsed=$(xprintidle)
        [[ $Elapsed -lt 2000 ]] && return
    done

    # Completely turn off laptop's backlight for "full black"
    [[ "$BACK" != "" ]] && echo 4 > "/sys/class/backlight/$BACK/bl_power"
    BackOff=true
    
    LastDimStarted=$(date +'%a %I:%M:%S %P')

} # DimMonitors

GetByNdx () {
    # Parm1 = index number, 0 = first monitor array entry
    MonNumber="${MonArr[$1]}"       # 3rd party monitor number, eg "3"
    MonName="${MonArr[$1+1]}"       # Xrandr Monitor name, eg "DP-1-1"
    MonStatus="${MonArr[$1+2]}"     # Xrandr Connected/Disconnected
    MonCurrBright="${MonArr[$1+3]}" # Value when dimming first starts eg 1.00
    MonMathBright="${MonArr[$1+4]}" # Math implied decimal 100 = 1.00, 50 = .5
    MonPercent="${MonArr[$1+5]}"    # Last percentage brightness set
} # GetByNdx

SetByNdx () {
    # Parm1 = index number, 0 = first monitor array entry
    MonArr[$1]="$MonNumber"         # 3rd party monitor number, eg "3"
    MonArr[$1+1]="$MonName"         # Xrandr Monitor name, eg "DP-1-1"
    MonArr[$1+2]="$MonStatus"       # Xrandr Connected/Disconnected
    MonArr[$1+3]="$MonCurrBright"   # Value when dimming first starts eg 1.00
    MonArr[$1+4]="$MonMathBright"   # Implied decimal 100 = 1.00, 50 = .5
    MonArr[$1+5]="$MonPercent"      # Last percentage brightness set
} # SetByNdx

InitializeMonArr () {

    # Initialize arrays with Xrandr name, status, curret bright, math bright, %
    MonArr=()
    MonArr+=( "1" "$MON1" "Cconnected" "1.0" "100" "0" )
    MonArr+=( "2" "$MON2" "Disconnected" ".0" "0" "0" )
    MonArr+=( "3" "$MON3" "Connected" "1.0" "100" "0" )

    MON_COL_CNT=6
    MonArrCnt="${#MonArr[@]}"

    # Dummy calls, but may not be necessary, test with delete later
    GetByNdx 0
    SetByNdx 0

} # InitializeMonArr

clear
PaintStats

Dimmed=false
InitializeMonArr
if ((Debug)) ; then
    echo ""
    echo "$(date +'%A %I:%M:%S %P') Starting movie.sh"
    echo ""
    echo "Monitor Array Dump: #, Name, Curr Bright, Math Bright, Last Percent"
    echo "${MonArr[*]}"
    echo ""
fi


# Loop until CTRL + C
while true ; do

    UpdateStats
    Elapsed=$(xprintidle)

    if [[ $Elapsed -lt "$TIME_TO_WAKE" ]] ; then
        if [[ $Dimmed == true ]] ; then

            # ((Debug)) && echo -e $'\n'"$(date) Wake after: $Elapsed milliseconds"
            TotalDimmed=$(( Elapsed / 1000 + TotalDimmed ))
            (( DimmedCount++ ))
            BrightenMonitors
            if [[ "$?" == "0" ]] ; then
                EnableAutoBright
                Dimmed=false
            else
                Elapsed=0       # Calculate new full sleep cycle below
            fi
        fi

    elif [[ $Elapsed -gt "$TIME_TO_FADE" ]] ; then
        if [[ $Dimmed == false ]] ; then

            # ((Debug)) && echo -e $'\n'"$(date) Fade after: $Elapsed milliseconds"
            TotalActive=$(( Elapsed / 1000 + TotalActive ))
            Dimmed=true
            DisableAutoBright
            DimMonitors
            continue    # Double check in case mouse moved during fade.
        fi
    fi

    if [[ "$Dimmed" == true ]] ; then
        # Be prepared to respond relatively instantly to mouse movement
        sleep 1
        (( DimmedChecks++ ))
        DimmedTime=$(( DimmedTime + 1 ))
        LastDimmedTime=$(( LastDimmedTime + 1 ))
        
    else
        # sleep until time to test for monitor fade
        SleepTime=$(( (TIME_TO_FADE - Elapsed + 1000) / 1000 ))
        [[ "$SleepTime" -lt 1 ]] && SleepTime=1
        # ((Debug)) && echo "$(date) Sleeping until next fade check: $SleepTime seconds"
        LastActiveCheck=$(date +'%a %I:%M:%S %P')
        ActiveSleepTime=$SleepTime
        NextActiveCheck=$(date +'%a %I:%M:%S %P' --date "$SleepTime seconds")
        ActiveTime=$(( ActiveTime + SleepTime ))
        TotalActive=$(( TotalActive + SleepTime ))
        (( ActiveChecks++ ))
        ThisActiveTime=$(( ThisActiveTime + SleepTime ))
        UpdateStats
        sleep "$SleepTime"
    fi
    
done
```

  [1]: https://i.stack.imgur.com/1OyCj.png


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

