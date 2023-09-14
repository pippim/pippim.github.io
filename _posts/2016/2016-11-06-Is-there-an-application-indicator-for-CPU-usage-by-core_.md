---
layout:       post
title:        >
    Is there an application indicator for CPU usage by core?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846327
type:         Answer
tags:         indicator cpu-load system-monitor multi-core conky
created_date: 2016-11-06 19:30:42
edit_date:    
votes:        "2 "
favorites:    
views:        "3,060 "
accepted:     
uploaded:     2023-09-14 01:12:26
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-06-Is-there-an-application-indicator-for-CPU-usage-by-core_.md
toc:          false
navigation:   false
clipboard:    false
---

System Monitor, aka "Conky" is a well known light-weight system monitor popular across most Linux distributions. On an Intel i-7 Core you can display all 8 CPUs:

[![Conky CPUs][1]][1]

The relevant code to make this is:

``` 
${color2}${voffset 5}Intel® i-7 3630QM 3.4 GHz: ${color1}@  ${color green}${freq} MHz   
${color}${goto 13}CPU 1 ${goto 81}${color green}${cpu cpu1}% ${goto 131}${color3}${cpubar cpu1 18}
${color}${goto 13}CPU 2 ${goto 81}${color green}${cpu cpu2}% ${goto 131}${color3}${cpubar cpu2 18}
${color}${goto 13}CPU 3 ${goto 81}${color green}${cpu cpu3}% ${goto 131}${color3}${cpubar cpu3 18}
${color}${goto 13}CPU 4 ${goto 81}${color green}${cpu cpu4}% ${goto 131}${color3}${cpubar cpu4 18}
${color}${goto 13}CPU 5 ${goto 81}${color green}${cpu cpu5}% ${goto 131}${color3}${cpubar cpu5 18}
${color}${goto 13}CPU 6 ${goto 81}${color green}${cpu cpu6}% ${goto 131}${color3}${cpubar cpu6 18}
${color}${goto 13}CPU 7 ${goto 81}${color green}${cpu cpu7}% ${goto 131}${color3}${cpubar cpu7 18}
${color}${goto 13}CPU 8 ${goto 81}${color green}${cpu cpu8}% ${goto 131}${color3}${cpubar cpu8 18}
${color1}All CPU ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 2 temp 1}°C ${goto 250}${color1}Up: ${color green}$uptime
${color green}$running_processes ${color1}running of ${color green}$processes ${color1}loaded processes.
```

  [1]: https://i.stack.imgur.com/eH0Ku.png

Posting the entire conky configuration file isn't possible because it is too long and it contains too many test sections making it unprofessional. You can google conky samples and find one that appeals to you. Then you can copy and paste the above code into the one you found.
