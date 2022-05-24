---
layout:       post
title:        >
    How to disable pulseaudio automatic device switch?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1061578
type:         Answer
tags:         pulseaudio
created_date: 2018-08-01 23:43:14
edit_date:    2020-06-12 14:37:07
votes:        "20 "
favorites:    
views:        "9,857 "
accepted:     Accepted
uploaded:     2022-05-23 21:10:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-01-How-to-disable-pulseaudio-automatic-device-switch_.md
toc:          false
navigation:   false
clipboard:    false
---

Let me know if this doesn't work for you and I'll delete my answer. I don't have your speaker system but this should work.

# Disable automatic device switching

When signal is lost to during sleep, Pulse Audio is automatically configured to activate the default source (your HDMI). Upon resume the sound device is still on HDMI. To override this setting, tell Pulse Audio to never switch sound devices automatically:

- edit the file `/etc/pulse/default.pa`
- find the line `load-module module-switch-on-port-available`
- insert a `#` at the beginning of the line to disable automatic port switching
- save file and exit editor
- type `pulseaudio -k` to reload configuration
