---
layout:       post
title:        >
    Ubuntu changes sound device after suspend, how to fix?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/809849
type:         Answer
tags:         sound
created_date: 2016-08-09 01:05:07
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "34,812 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-09-Ubuntu-changes-sound-device-after-suspend_-how-to-fix_.md
toc:          false
navigation:   false
clipboard:    false
---

# Fixing PulseAudio switching off HDMI sound on Suspend

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
