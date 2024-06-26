---
layout:       post
title:        >
    How can screen recording software record the call audio of both the local person (on the mic) and the remote person (on the speakers)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156154
type:         Answer
tags:         sound pulseaudio desktop-recording pavucontrol
created_date: 2019-07-05 10:59:13
edit_date:    
votes:        "1 "
favorites:    
views:        "151 "
accepted:     Accepted
uploaded:     2024-06-16 11:13:06
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-05-How-can-screen-recording-software-record-the-call-audio-of-both-the-local-person-_on-the-mic_-and-the-remote-person-_on-the-speakers__.md
toc:          false
navigation:   false
clipboard:    false
---

You can route your microphone through your speakers. That might do the trick:

- [How to hear my voice in speakers with a mic?](How to hear my voice in speakers with a mic?)

In summary:

``` 
pactl load-module module-loopback latency_msec=1
```
