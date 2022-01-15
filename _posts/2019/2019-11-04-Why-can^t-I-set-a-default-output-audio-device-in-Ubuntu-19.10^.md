---
layout:       post
title:        >
    Why can't I set a default output audio device in Ubuntu 19.10?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186131
type:         Answer
tags:         sound hdmi
created_date: 2019-11-04 12:03:03
edit_date:    2019-11-08 22:40:07
votes:        "14 "
favorites:    
views:        "8,542 "
accepted:     Accepted
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-04-Why-can^t-I-set-a-default-output-audio-device-in-Ubuntu-19.10^.md
toc:          false
navigation:   false
clipboard:    false
---

This is a bug reported here three days ago:

- [Audio / Sound reverts to HDMI when power event occurs](https://bugs.launchpad.net/ubuntu/+source/pulseaudio/+bug/1850887)

> PulseAudio reverts the sound to HDMI all the time when a HDMI related  
> power event occurs. That means, although I have set another USB sound  
> device plugged in and set as default under sound settings, when an  
> application like Kodi or the system shuts off the HDMI monitor and I  
> reactivate the monitor, the sound is set to HDMI output again and  
> again.  
>   
> That probably has to do with the fix to the reported Bug # 1711101 and  
> definitely not happened at Ubuntu 19.04. I switched to Ubuntu 19.10  
> two days ago.  
>   
> Setting the USB device as default does not help, even when done by  
> PulseAudio mixer (gui) and removing HDMI output from the alternatives  
> option.  

Only one person is effected by the bug (on November 4, 2019). Visit the link, click that it effects you and subscribe to the bug email.

11 people are now effected as of November 8, 2019. Comment #11 presents a solution though:

> I think i found a solution. I'm commenting this lines  
>  
>     #load-module module-switch-on-port-available  
>     #load-module module-switch-on-connect  
> in `etc/pulse/default.pa` and all   
work for me.
