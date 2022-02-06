---
layout:       post
title:        >
    How to add a progress bar to a shell script?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/65532561
type:         Answer
tags:         bash shell zsh
created_date: 2021-01-01 18:37:26
edit_date:    
votes:        "2 "
favorites:    
views:        "422,582 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-01-How-to-add-a-progress-bar-to-a-shell-script_.md
toc:          false
navigation:   false
clipboard:    true
---

I needed a progress bar that would fit in popup bubble message (`notify-send`) to represent TV volume level. Recently I've been writing a music player in python and the TV picture is turned off most of the time.

## Sample output from terminal

[![test_progress_bar3.gif][1]][1]


----------


## Bash script

{% include copyHeader.html %}
``` bash
#!/bin/bash

# Show a progress bar at step number $1 (from 0 to 100)


function is_int() { test "$@" -eq "$@" 2> /dev/null; } 

# Parameter 1 must be integer
if ! is_int "$1" ; then
   echo "Not an integer: ${1}"
   exit 1
fi

# Parameter 1 must be >= 0 and <= 100
if [ "$1" -ge 0 ] && [ "$1" -le 100 ]  2>/dev/null
then
    :
else
    echo bad volume: ${1}
    exit 1
fi

# Main function designed for quickly copying to another program 
Main () {

    Bar=""                      # Progress Bar / Volume level
    Len=25                      # Length of Progress Bar / Volume level
    Div=4                       # Divisor into Volume for # of blocks
    Fill="▒"                    # Fill up to $Len
    Arr=( "▉" "▎" "▌" "▊" )     # UTF-8 left blocks: 7/8, 1/4, 1/2, 3/4

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

    echo Volume: "$1 $Bar"
    exit 0                      # Remove this line when copying into program
} # Main

Main "$@"
```


----------


## Test bash script

Use this script to test the progress bar in the terminal.

``` bash
#!/bin/bash

# test_progress_bar3

Main () {

    tput civis                              # Turn off cursor
    for ((i=0; i<=100; i++)); do
        CurrLevel=$(./progress_bar3 "$i")   # Generate progress bar 0 to 100
        echo -ne "$CurrLevel"\\r            # Reprint overtop same line
        sleep .04
    done
    echo -e \\n                             # Advance line to keep last progress
    echo "$0 Done"
    tput cnorm                              # Turn cursor back on
} # Main

Main "$@"
```


----------

# TL;DR

This section details how `notify-send` is used to quickly spam popup bubble messages to the desktop. This is required because volume level can change many times a second and the default bubble message behavior is for a message to stay on the desktop for many seconds.

## Sample popup bubble message

[![tvpowered.gif][2]][2]

## Popup bubble message bash code

From the script above the `main` function was copied to a new functioned called `VolumeBar` in an existing bash script called `tvpowered`. The `exit 0` command in the copied `main` function was removed.

Here's how to call it and let Ubuntu's `notify-send` command know we will be spamming popup bubble message:

``` 
VolumeBar $CurrVolume
# Ask Ubuntu: https://askubuntu.com/a/871207/307523
notify-send --urgency=critical "tvpowered" \
    -h string:x-canonical-private-synchronous:volume \
    --icon=/usr/share/icons/gnome/48x48/devices/audio-speakers.png \
    "Volume: $CurrVolume $Bar"
```

This is the new line which tells `notify-send` to immediately replace last popup bubble:

``` 
-h string:x-canonical-private-synchronous:volume \
```

`volume` groups the popup bubble messages together and new messages in this group immediately replaces the previous. You can use `anything` instead of `volume`.

  [1]: https://i.stack.imgur.com/gD4iz.gif
  [2]: https://i.stack.imgur.com/yYCDw.gif
