---
layout:       post
title:        >
    can't control cpu frequencies in 19.10 on 7390 xps 13 2-in-1
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187609
type:         Answer
tags:         cpu tlp frequency cpupower cpuf conky
created_date: 2019-11-09 22:19:34
edit_date:    
votes:        "0 "
favorites:    
views:        "1,174 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-09-can_t-control-cpu-frequencies-in-19.10-on-7390-xps-13-2-in-1.md
toc:          false
navigation:   false
clipboard:    false
---

## cpuf - Simple Bash GUI to set CPU Min/Max Frequency

You can use this [GUI or simple Bash script to throttle the CPU?](GUI or simple Bash script to throttle the CPU?)1 to override frequencies:




## Demonstration

In this demo `cpuf` window is on left and `conky` system information is on right side. This is how the demo progresses:

- Demo starts whilst youtube video is already running
- Default CPU min/max frequencies are `800` / `3500`
- Override CPU min/max to `800` / `800` and CPU usage jumps to 20%
- Override CPU min/max to `3500` / `3500` and CPU usage drops to 10%
- Demo loops back and starts again

[![cpuf-demo.gif][1]][1]


  [1]: https://i.stack.imgur.com/2lHSD.gif
