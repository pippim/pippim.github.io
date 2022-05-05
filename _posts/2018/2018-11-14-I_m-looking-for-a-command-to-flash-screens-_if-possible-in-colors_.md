---
layout:       post
title:        >
    I'm looking for a command to flash screens (if possible in colors)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092835
type:         Answer
tags:         18.04 xubuntu notification eyesome
created_date: 2018-11-14 11:49:42
edit_date:    2018-11-16 01:15:58
votes:        "4 "
favorites:    
views:        "1,282 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-14-I_m-looking-for-a-command-to-flash-screens-_if-possible-in-colors_.md
toc:          false
navigation:   false
clipboard:    true
---

I made a bash script to meet the objective:



[![flash-primary-screen.sh.gif][1]][1]

## `flash-primary-screen.sh` bash script

Copy this bash script to your computer:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: flash-primary-screen.sh
# PATH: ~/bin
# DESC: Flashes primary screen colours to alert timer has ended.
# DATE: November 15, 2018

# NOTE: Written for: https://askubuntu.com/a/1092835/307523
#       I'm looking for a command to flash screens (if possible in colors)

# Change 6 variables below to control screen flashing levels
MaxBright="1.5"
MinBright=".5"
MaxRed="2.0"
MaxGreen="2.0"
MaxBlue="2.0"
MinGamma=".5"

declare aXrandr=()

# Next two functions lifted from: eyesome internet sunrise/sunset time screen
# brightness and gamma controller: https://github.com/WinEunuuchs2Unix/eyesome

InitXrandrArray () {

    # Array is used for each monitor and searched by name.
    # Save time to search on connected/disconnected, primary monitor,
    # brightness level, gamma level.

    mapfile -t aXrandr < <(xrandr --verbose --current)
    
} # InitXrandrArray

SearchXrandrArray () {

    # Parms: $MonXrandrName = xrandr monitor name to search for.

    # NOTE: Entries in array follow predicatble order from xrandr --verbose:

    #       <MONITOR-NAME> connected / disconnected (line 1 of monitor entry)
    #       Gamma:      0.99:0.99:0.99              (line 5 of entry)
    #       Brightness: 0.99                        (line 6 of entry)
    #       CRTC:       9                           (line 8 of entry)

    fNameFnd=false
    fBrightnessFnd=false
    fGammaFnd=false
    fCrtcFnd=false
    XrandrConnection=disconnected
    XrandrPrimary=false
    XrandrGamma=""
    XrandrBrightness=""
    XrandrCRTC=""           # Laptop lid open value=0, lid closed=blank

    for (( i=0; i<"${#aXrandr[*]}"; i++ )) ; do

        line="${aXrandr[$i]}"
        # Have we looped to next monitor and not found search string?
        if [[ "$line" =~ " connected " ]] && [[ $fNameFnd == true ]] ; then
            break
        fi

        if [[ "$line" =~ ^"$MonXrandrName connected" ]]; then
            fNameFnd=true
            XrandrConnection=connected
            [[ "$line" =~ "primary" ]] && XrandrPrimary=true
        fi

        if [[ $fNameFnd == true ]] && [[ $fGammaFnd == false ]] ; then
            if [[ "$line" =~ "Gamma: " ]]; then
                fGammaFnd=true
                XrandrGamma="${line##* }"
                # TODO: Use `xgamma` for accuracy
            fi
        fi

        if [[ $fGammaFnd == true ]] && [[ $fBrightnessFnd == false ]] ; then
            if [[ "$line" =~ "Brightness: " ]]; then
                fBrightnessFnd=true
                XrandrBrightness="${line##* }"
            fi
        fi

        if [[ $fBrightnessFnd == true ]] && [[ $fCrtcFnd == false ]] ; then
            if [[ "$line" =~ "CRTC: " ]]; then
                fCrtcFnd=true
                XrandrCRTC="${line##* }"
                break
            fi
        fi
        
    done
    
} # SearchXrandrArray

FlipBright () {

    if [[ $NewBrightness == "$MaxBright" ]] ; then
        NewBrightness="$MinBright"
    else
        NewBrightness="$MaxBright"
    fi
    
} # FlipBright

CleanUp() {

    xrandr --output "$MonXrandrName" --gamma "$SaveGamma" \
           --brightness "$SaveBrightness"

    # Compensate for bug in Xrandr as of Nov 15, 2018 with second call
    InitXrandrArray
    SearchXrandrArray
    xrandr --output "$MonXrandrName" --gamma "$XrandrGamma"
    exit 0

} # CleanUp

Main () {

    trap CleanUp INT TERM

    # Get primary monitor current settings
    XrandrName=$(xrandr --current | grep primary)
    MonXrandrName="${XrandrName%% *}"
    InitXrandrArray
    SearchXrandrArray

    # Did we find primary monitor ok?
    if [[ $fBrightnessFnd == false ]] || [[ $fGammaFnd == false ]] ; then
        echo "Internal Error: Could not find Primary Screen brightness or gamma"
        echo XrandrPrimary: "$XrandrPrimary"
        echo aXrandr[0]: "${aXrandr[0]}"
        echo Brightness: "$XrandrBrightness"
        echo Gamma: "$XrandrGamma"
        exit 2
    fi

    # Restore these values when CleanUping program
    SaveBrightness="$XrandrBrightness"
    SaveGamma="$XrandrGamma"

    # Wait for <Ctrl>+C or until parent kills us.
    while true ; do
        if [[ $Red == true ]] ; then
            Red=false
            Green=true
            NewGamma="$MaxRed:$MinGamma:$MinGamma"
            FlipBright
        elif [[ $Green == true ]] ; then
            Green=false
            NewGamma="$MinGamma:$MaxGreen:$MinGamma"
            FlipBright
        else
            Red=true
            NewGamma="$MinGamma:$MinGamma:$MaxBlue"
            FlipBright
        fi

        xrandr --output "$MonXrandrName" --gamma "$NewGamma" \
       --brightness "$NewBrightness"

        sleep .2

    done

} # Main

Main "$@"
```

Mark the script as executable using:

``` bash
chmod a+x /path/flash-primary-screen.sh
```

Where `/path` is the directory you placed the script.

Call the script from your program (or even the command line). To end the script press <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Change the first 6 variables defined to manipulate the brightness level and color level changes.

Don't hesitate to ask questions or post suggestions in comment section below!

----------

You can also have color flashing ASCII Art text in the terminal:

[![bashVTcodes.gif][2]][2]

Here is the script:

{% include copyHeader.html %}
``` bash
#!/bin/bash

From: http://wiki.bash-hackers.org/scripting/terminalcodes
DATA[0]="     _/  _/    _/                            _/    "
DATA[1]="  _/_/_/_/_/  _/_/_/      _/_/_/    _/_/_/  _/_/_/ "
DATA[2]="   _/  _/    _/    _/  _/    _/  _/_/      _/    _/"
DATA[3]="_/_/_/_/_/  _/    _/  _/    _/      _/_/  _/    _/ "
DATA[4]=" _/  _/    _/_/_/      _/_/_/  _/_/_/    _/    _/  "

# virtual coordinate system is X*Y ${#DATA} * 5

REAL_OFFSET_X=0
REAL_OFFSET_Y=0

draw_char() {
  V_COORD_X=$1
  V_COORD_Y=$2

  tput cup $((REAL_OFFSET_Y + V_COORD_Y)) $((REAL_OFFSET_X + V_COORD_X))

  printf %c ${DATA[V_COORD_Y]:V_COORD_X:1}
}


trap 'exit 1' INT TERM
trap 'tput setaf 9; tput cvvis; clear' EXIT

tput civis
clear

while :; do

for ((c=1; c <= 7; c++)); do
  tput setaf $c
  for ((x=0; x<${#DATA[0]}; x++)); do
    for ((y=0; y<=4; y++)); do
      draw_char $x $y
    done
  done
done

done
```


To generate the ASCII Art you can use Figlet or Toilet. See: [When terminal is opened can I get current calendar and time displayed?]({% post_url /2017/2017-04-08-When-terminal-is-opened-can-I-get-current-calendar-and-time-displayed_ %})


  [1]: https://i.stack.imgur.com/4PBfR.gif
  [2]: https://i.stack.imgur.com/1fwKq.gif
