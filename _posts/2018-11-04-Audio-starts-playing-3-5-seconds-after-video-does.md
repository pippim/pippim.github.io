---
layout:       post
title:        Audio starts playing 3-5 seconds after video does
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089961
type:         Answer
tags:         sound multimedia displayport
created_date: 2018-11-04 14:31:09
edit_date:    2020-06-12 14:37:07
votes:        5
favorites:    
views:        3,013
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

## Perfect solution for specific problem, but not all applications

This solution works when pausing and resuming from the same sound source such as a movie:

Edit Pulse Audio configuration file: `sudo -H gedit /etc/pulse/default.pa`

Locate this section and place `#` in front of second line:

``` 
### Automatically suspend sinks/sources that become idle for too long
# load-module module-suspend-on-idle

```

Save the file and exit.

Reload Pulse Audio using `pulseaudio -k`.

## Where it doesn't work.

Whilst watching a movie I can have [laundry timer][1] running in the background. When a alert sounds to signal end of Wash Cycle, Rinse Cycle or Dryer no sound is heard. The alert sound was < 5 seconds. The workaround is to pick a different sound file > 5 seconds long.


  [1]: https://pippim.github.io/2018/05/23/Set-of-countdown-timers-with-alarm.html
