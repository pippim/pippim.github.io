---
layout:       post
title:        >
    How can screen recording software record the call audio of both the local person (on the mic) and the remote person (on the speakers)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156154
type:         Answer
tags:         sound pulseaudio desktop-recording pavucontrol
created_date: !!str "2019-07-05 10:59:13"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "73"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

You can route your microphone through your speakers. That might do the trick:

- https://askubuntu.com/questions/123798/how-to-hear-my-voice-in-speakers-with-a-mic

In summary:

``` 
pactl load-module module-loopback latency_msec=1

```
