---
layout:       post
title:        >
    Any way to check the clock speed of my processor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/935623
type:         Answer
tags:         cpu conky
created_date: !!str "2017-07-13 00:35:40"
edit_date:    !!str ""
votes:        !!str "10"
favorites:    
views:        !!str "600,180"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

I'd like to point out `sudo` is needed for Ian's answer above:

``` 
sudo cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_cur_freq

```

However you can get the same results without sudo using:

``` 
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq

```

My favourite is to use Conky where you can paint your own picture:

[![Conky.gif][1]][1]

This sits on the right of my built-in display all the time. The relevant code for the CPU section is:

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

```


  [1]: https://i.stack.imgur.com/zxBC3.gif
