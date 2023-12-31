---
layout:       post
title:        >
    Temperature monitoring help
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102340
type:         Answer
tags:         cpu temperature monitoring
created_date: 2018-12-16 15:41:25
edit_date:    
votes:        "1 "
favorites:    
views:        "9,319 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-16-Temperature-monitoring-help.md
toc:          false
navigation:   false
clipboard:    false
---

I use an alias to monitor temperature:

``` 
$ temp
INT3400 Thermal  20.0°C
SEN1             52.0°C
SEN2             50.0°C
SEN3             57.0°C
SEN4             60.0°C
B0D4             50.0°C
pch_skylake      81.5°C
x86_pkg_temp     50.0°C
```

**Note:** pch_skylake is the Thunderbolt port which for some reason is always out of wack. The bottom temperature `x86_pkg_temp` is the temperature I use for overall system temperature. The first four `SEN` temperatures (`SEN1` through `SEN4`) are the CPU core temperatures (Intel Quad Cord i7-6700HQ processor).

You can mimic my `temp` alias by copying and pasting this line into the terminal:

``` 
paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'
```

Source: [How do I get the CPU temperature?]({% post_url /2016/2016-11-26-How-do-I-get-the-CPU-temperature_ %})
