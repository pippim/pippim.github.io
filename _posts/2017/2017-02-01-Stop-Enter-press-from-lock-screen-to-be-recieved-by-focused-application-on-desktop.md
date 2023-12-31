---
layout:       post
title:        >
    Stop Enter press from lock screen to be recieved by focused application on desktop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/878639
type:         Answer
tags:         keyboard lock-screen
created_date: 2017-02-01 11:54:09
edit_date:    
votes:        "0 "
favorites:    
views:        "116 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-01-Stop-Enter-press-from-lock-screen-to-be-recieved-by-focused-application-on-desktop.md
toc:          false
navigation:   false
clipboard:    false
---

### Create dbus monitor script Ubuntu 16.04

You could create this script which is invoked by dbus after screen is unlocked. Call the script from your ***Startup Applications*** and it will always be running.

``` bash
#!/bin/bash
dbus-monitor --session "type=signal,interface=com.canonical.Unity.Session,member=Unlocked" | 
  while read MSG; do
    LOCK_STAT=`echo $MSG | awk '{print $NF}'`
    if [[ "$LOCK_STAT" == "member=Unlocked" ]]; then
        logger "Screen unlocked"
        # Flush keyboard buffer
        while read -e -t 1; do : ; done.
    fi
  done
```

Note this is for Unity under Ubuntu 16.04. Ubuntu 14.04 and earlier versions have different methods. Different desktop environments may have different methods as well.

This code works for other utilities however the `#Flush keyboard buffer` section is new and untested.
