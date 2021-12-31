---
layout:       post
title:        Pause music when bluetooth connection drops
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1178810
type:         Answer
tags:         sound bluetooth pulseaudio
created_date: 2019-10-05 00:03:51
edit_date:    2020-06-12 14:37:07
votes:        0
favorites:    
views:        885
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

My first instinct would be to pause the music on the earbuds as the range distorts the sound. But as you say this doesn't work. The second option would be to tell Pulse Audio not to switch sound to the speakers when earbuds are out of range.

Try this:


# Disable automatic device switching

- edit the file `/etc/pulse/default.pa`
- find the line `load-module module-switch-on-port-available`
- insert a `#` at the beginning of the line to disable automatic port switching
- save file and exit editor
- type `pulseaudio -k` to reload configuration

Source: https://askubuntu.com/questions/1061414/how-to-disable-pulseaudio-automatic-device-switch/1061578#1061578
