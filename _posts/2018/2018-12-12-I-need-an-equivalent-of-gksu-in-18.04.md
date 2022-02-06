---
layout:       post
title:        >
    I need an equivalent of gksu in 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1100220
type:         Answer
tags:         sudo root gksu
created_date: 2018-12-12 05:14:22
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "46,583 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-12-I-need-an-equivalent-of-gksu-in-18.04.md
toc:          false
navigation:   false
clipboard:    true
---

I use a script called `sgedit` which inherits user preferences for font, tabs, and extensions. It uses `sudo -H gedit` instead of `gksu gedit` for stability in GUI environment. It prompts for a password.

## Have `sudo` inherit your user account `gedit` settings

[![sgedit 80 column right slider.gif][1]][1]

In this example the user settings for font name, font size, tab stops, convert tabs to spaces, 80 column highlight, and right side thumbnail slider bar have been inherited by `sudo`.

With regular `sudo -H gedit` you cannot make nor save these configuration settings. With the script below `sgedit` the settings are inherited from your user account.

This script also addresses the "`gksu` is bad and not installed by default" and "`pkexec` is hard to setup" problems.

----------

## Background

I've been nagged by the same issue for years. This weekend's project was to write the `sgedit` script:

- Call using `sgedit filename1 filename2...`
- Gets user's gedit settings for tab stops, fonts, line-wrap, etc.
- Elevates to `sudo -H` to preserve file ownership whilst getting root powers. 
- Requests password if last sudo has timed out.
- Gets sudo's gedit settings
- Compares differences between user and sudo gedit settings
- Runs `gsettings set` on the differences only (reduces 174 `set` commands to a dozen or less. Next time it's run perhaps only one or two changes but often times none.
- Calls gedit as a background task such that terminal prompt reappears immediately.

# Bash script `sgedit`



{% include copyHeader.html %}
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
gsettings list-recursively | grep -i gedit | grep -v history |
    grep -v docinfo |
    grep -v virtual-root | grep -v state.window > /tmp/gedit.gsettings

sudoFunc () {
    # Must be running as sudo
    if [[ $(id -u) != 0 ]]; then
        zenity --error --text "Sudo password authentication failed. Aborting."
        exit 99
    fi

    # Get sudo's gedit preferences
    gsettings list-recursively | grep -i gedit | grep -v history |
        grep -v docinfo |
        grep -v virtual-root | grep -v state.window > /tmp/gedit.gsettings.root
    diff /tmp/gedit.gsettings.root /tmp/gedit.gsettings | grep '>' > /tmp/gedit.gsettings.diff
    sed -i 's/>/gsettings set/g; s/uint32 //g' /tmp/gedit.gsettings.diff
    chmod +x /tmp/gedit.gsettings.diff
    bash -x /tmp/gedit.gsettings.diff  # Display override setting to terminal
    nohup gedit $@ &>/dev/null &
}

FUNC=$(declare -f sudoFunc)
sudo -H bash -c "$FUNC; sudoFunc $*;"
```

## Housekeeping

Copy the bash script above to a new file called `sgedit`. I recommend placing it in your `$HOME/bin` directory, i.e. `/home/YOURNAME/bin`. You may have to create the directory first.

Mark the file as executable using:

``` bash
chmod a+x ~/sgedit
```

Note `~` is a shortcut for `/home/YOURNAME`.


  [1]: https://i.stack.imgur.com/pVabr.gif
