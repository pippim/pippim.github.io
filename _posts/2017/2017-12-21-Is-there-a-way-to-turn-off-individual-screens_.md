---
layout:       post
title:        >
    Is there a way to turn off individual screens?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/988203
type:         Answer
tags:         multiple-monitors
created_date: 2017-12-21 02:02:42
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "8,353 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-21-Is-there-a-way-to-turn-off-individual-screens_.md
toc:          false
navigation:   false
clipboard:    false
---

# Problem with existing answer

Although there was an answer seven years ago with three up-votes it wasn't accepted because it causes all open windows on the shut-off display to migrate to the remaining active display(s).

# Software based brightness

On a laptop you can control brightness through the graphics card controlling the LCD panel. With external TV's and monitors you need a software solution to turn brightness down to 0. Turning it to zero is closest I've come to the illusion of turning it off whilst keeping the active windows on that external display.

## Short version

From the command line (without scripts) use:

``` 
$ xrandr | grep " connected"
HDMI-0 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 1107mm x 623mm
eDP-1-1 connected primary 1920x1080+3840+2160 (normal left inverted right x axis y axis) 382mm x 215mm
DP-1-1 connected 3840x2160+1920+0 (normal left inverted right x axis y axis) 1600mm x 900mm
```

This shows you the list of monitor names assigned by `xrandr`. Now if you want to set `DP-1-1` brightness off use:

``` 
xrandr --output DP-1-1 --brightness 0
```


----------


## Sony TV bash script

Here's one of three scripts I've written:



``` bash
#!/bin/bash

# NAME: sony
# PATH: /mnt/e/bin
# DESC: Set brightness of Sony TV
# DATE: Dec 9, 2017.

if [[ $# -ne 1 ]]; then
    xrandr --verbose | grep -A5 "^HDMI-0" > /tmp/sony
    head -n1 /tmp/sony
    echo "$(tput setaf 1)" ; tail -n1 /tmp/sony ; echo "$(tput sgr0)"
    rm /tmp/sony
    echo 'One argument required for brightness level, e.g. "sony .63"'
    echo 'will set brightness level of Sony TV to level .63 using xrandr'
    exit 1
fi

xrandr --output HDMI-0  --brightness "$1"
```

To turn off the display you would use `sony 0`

## Calling script with no parameters

When you call the script with no parameters it displays the `xrandr` screen name along with the current brightness in red. You can change the red color to another by modifying this line:

``` bash
echo "$(tput setaf 1)" ; tail -n1 /tmp/sony ; echo "$(tput sgr0)"
```

After `setaf` change the `1` to:

- `2` for green
- `3` for orange
- `4` for blue, etc.

## Modifying and installing script

Change the two occurrences of `HDMI-0`to match your screen name. You can get a list of all your screens typing `xrandr`in the terminal.

Place the script in a directory in your path such as:

``` bash
/usr/local/bin/sony
```

Mark the script as executable using:

``` bash
sudo chmod a+x /usr/local/bin/sony
```


## Choosing which directory:`/usr/local/bin` vs `~/bin`

When you create scripts in `/usr/local/bin` you must use `sudo` powers. A better alternative is to use the directory `~/bin` which is shorthand for `/home/YourUserID/bin`:

- create the directory `~/bin`
- close your terminal and reopen it.
- the newly created directory is now in your path.
- all the scripts you create in `~/bin` can be created with your regular permissions.
- to enable execution of your scripts you just need to use `chmod +x` rather than `chmod a+x` (the `a` meaning all users)
