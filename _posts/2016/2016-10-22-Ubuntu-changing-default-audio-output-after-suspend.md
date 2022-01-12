---
layout:       post
title:        >
    Ubuntu changing default audio output after suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840543
type:         Answer
tags:         sound suspend hdmi kodi
created_date: 2016-10-22 18:05:45
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "1,937 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

# Fixing PulseAudio switching from TV to Laptop on Suspend

This "undocumented feature" appeared with Ubuntu 16.04 and new version of PulseAudio 8. 

Create a new file `/lib/systemd/system-sleep/tv-sound` and copy in:



``` sh
#!/bin/sh

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    # Place your pre suspend commands here, or `exit 0`
    # if no pre suspend action required
    sleep 1
    ;;
  post/*)
    echo "Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` 
    # if no post suspend action required
    sleep 2
    export PULSE_RUNTIME_PATH="/run/user/1000/pulse/"
    sudo -u rick -E pacmd set-card-profile 0 output:hdmi-stereo
    ;;
esac

```


**NOTE:** replace user name `rick` (third line from the bottom) with your user name.

Then mark it executable with the command:

``` sh
sudo chmod +x /lib/systemd/system-sleep/tv-sound

```

An additional step might be required if `output:hdmi-stereo` (the device for most people) is different on your system.
