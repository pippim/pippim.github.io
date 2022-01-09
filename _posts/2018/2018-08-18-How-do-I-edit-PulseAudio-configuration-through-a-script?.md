---
layout:       post
title:        >
    How do I edit PulseAudio configuration through a script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1066655
type:         Answer
tags:         command-line sound pulseaudio hdmi
created_date: 2018-08-18 19:14:50
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,172 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

Each time you reboot Pulse Audio resets sound device to `HDMI`. In order for it to keep the setting at `HDMI3` you need to tell it to stop automatically switching.

### Disable automatic device switching

When signal is lost to during sleep or shutdown, Pulse Audio is automatically configured to activate the default source (your HDMI). Upon resume or restart the sound device is still on HDMI. To override this setting, tell Pulse Audio to never switch sound devices automatically:

-    edit the file `/etc/pulse/default.pa`
-    find the line `load-module module-switch-on-port-available`
-    insert a `#` at the beginning of the line to disable automatic port switching
-    save the file and reboot.

Instead of rebooting you can use `pulseaudio -k` to reload the configuration changes.
