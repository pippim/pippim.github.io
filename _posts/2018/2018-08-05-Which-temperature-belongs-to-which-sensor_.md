---
layout:       post
title:        >
    Which temperature belongs to which sensor?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/460670
type:         Answer
tags:         linux sensors
created_date: 2018-08-05 15:52:34
edit_date:    2022-11-13 21:15:08
votes:        "2 "
favorites:    
views:        "2,753 "
accepted:     
uploaded:     2023-01-03 19:49:43
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-05-Which-temperature-belongs-to-which-sensor_.md
toc:          false
navigation:   false
clipboard:    false
---

This one-liner displays temperature:

``` bash
paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'
```

Here are the results on Intel Skylake i-7 6700 HQ:

``` text
INT3400 Thermal  20.0°C
pch_skylake      91.0°C
SEN1             67.0°C
B0D4             61.0°C
SEN2             60.0°C
SEN3             68.0°C
SEN4             71.0°C
x86_pkg_temp     63.0°C
```

The packages `sensors` gets it's information from the kernel `/sys/class/...` directories. You can get all info there which `sensors` is massaging to reveal to you.

**NOTE:** `pch_skylake` temperature is abnormally high on most machines. A short google search confirms this.
