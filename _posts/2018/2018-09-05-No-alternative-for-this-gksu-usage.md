---
layout:       post
title:        >
    No alternative for this gksu usage
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/52175484
type:         Answer
tags:         ubuntu ubuntu-18.04 gksudo
created_date: 2018-09-05 00:22:57
edit_date:    
votes:        "0 "
favorites:    
views:        "802 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-05-No-alternative-for-this-gksu-usage.md
toc:          false
navigation:   false
clipboard:    false
---

This answer deals only with `gksu gedit` and nothing else. 

Besides the disappearance of `gksu` with Ubuntu 17.10, I've had long standing problems where my regular user settings for font name, font size, tab stops, convert tabs to spaces, etc. were never carried over to `sudo` / `gksudo` and I'd always have to reset them.

Furthermore `sudo` gets no top-level menu for editing preferences.

The script I wrote not only allows `gksu`-like usage with `gedit` but also copies my user `gedit` preferences over to the `sudo` account.

You will need to change one line of code:

``` 
nohup gedit -g 1300x840+1+1220 $@ &>/dev/null &
```

This positions the window `1` pixel right and `1220` pixels down. You might prefer `1+1` instead of `1+1220`.

The window size is set to `1300` pixels wide by `840` pixels high. You might prefer a smaller or larger size depending on Monitor resolution and HiDPI. So change `1330x840` to your preferences.



``` bash
#!/bin/bash

# NAME: sgedit
# PATH: /mnt/e/bin
# DESC: Run gedit as sudo using $USER preferences
# DATE: June 17, 2018.

# Must not prefix with sudo when calling script
if [[ $(id -u) == 0 ]]; then
    zenity --error --text "You cannot call this script using sudo. Aborting."
    exit 99
fi

# Get user preferences before elevating to sudo
gsettings list-recursively | grep -i gedit | grep -v history | \
    grep -v docinfo | \
    grep -v virtual-root | grep -v state.window > /tmp/gedit.gsettings

sudoFunc () {

    # Must be running as sudo
    if [[ $(id -u) != 0 ]]; then
        zenity --error --text "Sudo password authentication failed. Aborting."
        exit 99
    fi

    # Get sudo's gedit preferences
    gsettings list-recursively | grep -i gedit | grep -v history | \
        grep -v docinfo | \
        grep -v virtual-root | grep -v state.window > /tmp/gedit.gsettings.root
    diff /tmp/gedit.gsettings.root /tmp/gedit.gsettings | grep '>' > /tmp/gedit.gsettings.diff
    sed -i 's/>/gsettings set/g; s/uint32 //g' /tmp/gedit.gsettings.diff
    chmod +x /tmp/gedit.gsettings.diff
    bash -x /tmp/gedit.gsettings.diff  # Display override setting to terminal
#    nohup gedit $@ &>/dev/null &
    nohup gedit -g 1300x840+1+1220 $@ &>/dev/null &
#              Set the X geometry window size (WIDTHxHEIGHT+X+Y).

}

FUNC=$(declare -f sudoFunc)
sudo -H bash -c "$FUNC; sudoFunc $*;"

exit 0
```

Create the bash script somewhere in your path and mark it as executable using:

``` bash
sudo chmod a+x /path/to-script/sgedit
```

Then to call it use:

``` bash
sgedit <file-name>
```

instead of the old system of:

``` bash
gksu gedit <file-name>
```

HTH

