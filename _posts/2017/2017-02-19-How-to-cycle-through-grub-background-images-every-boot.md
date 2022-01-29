---
layout:       post
title:        >
    How to cycle through grub background images every boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885030
type:         Answer
tags:         boot grub2 bash cron
created_date: 2017-02-19 16:03:46
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,215 "
accepted:     Accepted
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-19-How-to-cycle-through-grub-background-images-every-boot.md
toc:          false
navigation:   false
clipboard:    true
---

# Short Answer



{% include copyHeader.html %}
``` bash
#!/bin/bash

CURR_FILE=$(cat /etc/default/grub | grep BACKGROUND) # Get grub current line
CURR_FILE=$(cut -d "=" -f 2 <<< "$CURR_FILE")        # File name only
CURR_FILE=$(echo "$CURR_FILE" | tr -d '"')           # Remove double quotes

for ALL_FILES in /home/rick/Pictures/Wallpaper/640x480*; do # Loop through every file
    if [[ "$FIRST_FILE" == "" ]]; then
        FIRST_FILE="$ALL_FILES"
    elif [[ "$MATCH_FILE" != "" ]]; then
        NEXT_FILE="$ALL_FILES"
        break # We've got it!
    fi
    if [[ "$CURR_FILE" == "$ALL_FILES" ]]; then
        MATCH_FILE="$ALL_FILES" # We found our current file entry
    fi
done

# If $NEXT_FILE empty we hit end of list so use First file name
if [[ "$NEXT_FILE" == "" ]]; then
    NEXT_FILE="$FIRST_FILE"
fi

# replace background file name in grub source file
sed -i "s|$CURR_FILE|$NEXT_FILE|g" /etc/default/grub

# replace background file name in grub configuration file
# Backup... just in case :)
cp /boot/grub/grub.cfg /boot/grub/grub.cfg~
# Short cut so we don't have to run `sudo update-grub`
sed -i "s|$CURR_FILE|$NEXT_FILE|g" /boot/grub/grub.cfg
```

## Credits

After much googling this morning along with trial and error the problem was 90% solved. Then with incredible assistance in chat room from [Pilot6][1], [Terdon][2] and [Zanna][3] the hardest part for me (using `sed`) was solved.

Considerate comments were also posted by [cl-netbox][4] and [Byte Commander][5] making ***Ask Ubuntu's*** chat room the friendliest most homogeneous technical chat room I've frequented in my two decades on the net.

# Call script every boot with cron

Create the file `/etc/cron.d/cycle-grub-background` containing:

``` bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    /usr/local/bin/cron-reboot-cycle-grub-background
```

**NOTE:** create file using `sudo` powers. No need to mark it as executable but doing so won't hurt either.

# Long Answer with debug and variable declarations



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: cron-reboot-cycle-grub-background
# DATE: February 18, 2017. Modified April 9, 2017.
# PATH: /usr/local/bin/

# DESC: Cycle through available wallpaper for grub background


CURR_FILE=$(cat /etc/default/grub | grep BACKGROUND) # Get grub current line
echo "Grub line:    $CURR_FILE"

CURR_FILE=$(cut -d "=" -f 2 <<< "$CURR_FILE") # File name only
CURR_FILE=$(echo "$CURR_FILE" | tr -d '"')    # Remove double quotes

echo "Current file: $CURR_FILE"

FIRST_FILE=""
NEXT_FILE=""
MATCH_FILE=""

for ALL_FILES in /home/rick/Pictures/1600x900/*; do # Loop through every file
    if [[ "$FIRST_FILE" == "" ]]; then
        FIRST_FILE="$ALL_FILES"
    fi
    if [[ "$MATCH_FILE" != "" ]]; then
        NEXT_FILE="$ALL_FILES"
        break # We've got it!
    fi
    if [[ "$CURR_FILE" == "$ALL_FILES" ]]; then
        MATCH_FILE="$ALL_FILES" # We found our current file entry
    fi
done

# If $NEXT_FILE empty we hit end of list so use First file name
if [[ "$NEXT_FILE" == "" ]]; then
    NEXT_FILE="$FIRST_FILE"
fi

echo "First file:   $FIRST_FILE"
echo "Match file:   $MATCH_FILE"
echo "Next file:    $NEXT_FILE"

# replace background file name in grub source file
sed -i "s|$CURR_FILE|$NEXT_FILE|g" /etc/default/grub

# replace background file name in grub control file
# Backup... just in case :)
cp /boot/grub/grub.cfg /boot/grub/grub.cfg~
# Short cut so we don't have to run `sudo update-grub`
sed -i "s|$CURR_FILE|$NEXT_FILE|g" /boot/grub/grub.cfg

# Now next reboot will have new background image
exit 0
```

## A few notes

The long version answer uses a different picture directory name than the short version. In either case you need to update to whatever directory your images are stored in.

`sed` usually uses `/` as a delimiter however our path/file names contain `/` so we use `|` instead.

The conventional method after changing `/etc/default/grub` is to run `sudo update-grub`. However this takes 12 seconds on my machine the machine could be rebooted while this lengthy process was being run. Given that `systemd-inhibit` would have to be used.

The short cut uses `sed` to search and replace within `/boot/grub/grub.cfg`. A backup of the file is made just in case something goes wrong. The way cron reboot is setup on this machine however the process is completed by the time the login password is typed and a terminal window is opened to check on the update.

  [1]: https://askubuntu.com/users/167850/pilot6
  [2]: https://askubuntu.com/users/85695/terdon
  [3]: https://askubuntu.com/users/527764/zanna
  [4]: http://chat.stackexchange.com/users/112690/cl-netbox
  [5]: https://askubuntu.com/users/367990/byte-commander


