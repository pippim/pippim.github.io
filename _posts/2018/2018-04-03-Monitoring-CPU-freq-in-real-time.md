---
layout:       post
title:        >
    Monitoring CPU freq in real time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021463
type:         Answer
tags:         monitoring amd-processor frequency cpupower
created_date: 2018-04-03 00:40:31
edit_date:    
votes:        "2 "
favorites:    
views:        "2,069 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-03-Monitoring-CPU-freq-in-real-time.md
toc:          false
navigation:   false
clipboard:    false
---

My favorite tool is **Conky** which I part to the right side of one of my monitors:

[![CPU Powersave.gif][1]][1]

My code only has 8 CPU's and you would have to modify it for 16 CPUs:

``` 
#------------+
# i7-6700 CPU|
#------------+
${color2}${voffset 5}Intel® i-7 6700HQ 3.5 GHz: ${color1}@  ${color green}${freq} MHz
${color}${goto 13}CPU 0 ${goto 81}${color green}${cpu cpu1}% ${goto 131}${color3}${cpubar cpu1 18}
${color}${goto 13}CPU 1 ${goto 81}${color green}${cpu cpu2}% ${goto 131}${color3}${cpubar cpu2 18}
${color}${goto 13}CPU 2 ${goto 81}${color green}${cpu cpu3}% ${goto 131}${color3}${cpubar cpu3 18}
${color}${goto 13}CPU 3 ${goto 81}${color green}${cpu cpu4}% ${goto 131}${color3}${cpubar cpu4 18}
${color}${goto 13}CPU 4 ${goto 81}${color green}${cpu cpu5}% ${goto 131}${color3}${cpubar cpu5 18}
${color}${goto 13}CPU 5 ${goto 81}${color green}${cpu cpu6}% ${goto 131}${color3}${cpubar cpu6 18}
${color}${goto 13}CPU 6 ${goto 81}${color green}${cpu cpu7}% ${goto 131}${color3}${cpubar cpu7 18}
${color}${goto 13}CPU 7 ${goto 81}${color green}${cpu cpu8}% ${goto 131}${color3}${cpubar cpu8 18}
${color1}All CPU ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 1 temp 1}°C ${goto 250}${color1}Up: ${color green}$uptime
${color green}$running_processes ${color1}running of ${color green}$processes ${color1}loaded processes.
${color}Load Avg. 1-5-15 minutes: ${alignr}${color green}${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
```

You can literally find thousands of examples and solutions on [Ubuntu Forums][2] for Conky.


  [1]: https://i.stack.imgur.com/LmJil.gif
  [2]: https://ubuntuforums.org/showthread.php?t=281865
