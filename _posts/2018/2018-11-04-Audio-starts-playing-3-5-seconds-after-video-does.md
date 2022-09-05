---
layout:       post
title:        >
    Audio starts playing 3-5 seconds after video does
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089961
type:         Answer
tags:         sound multimedia displayport
created_date: 2018-11-04 14:31:09
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "3,615 "
accepted:     
uploaded:     2022-09-05 06:35:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-04-Audio-starts-playing-3-5-seconds-after-video-does.md
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


  [1]: {% post_url /2018/2018-05-23-Set-of-countdown-timers-with-alarm %}
