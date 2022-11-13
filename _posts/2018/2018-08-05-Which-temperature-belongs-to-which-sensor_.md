---
layout:       post
title:        >
    Which temperature belongs to which sensor?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/460670
type:         Answer
tags:         linux sensors
created_date: 2018-08-05 15:52:34
edit_date:    2018-08-05 16:38:46
votes:        "2 "
favorites:    
views:        "2,688 "
accepted:     
uploaded:     2022-11-13 08:20:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-05-Which-temperature-belongs-to-which-sensor_.md
toc:          false
navigation:   false
clipboard:    false
---

I use this one-liner which I have aliased to `temp` in my `~/.bashrc`:

``` 
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t
INT3400 Thermal  20000
SEN1             53000
SEN2             51000
SEN3             54000
SEN4             57000
B0D4             49000
pch_skylake      71500
x86_pkg_temp     50000
```

The packages `sensors` gets it's information from the kernel `/sys/class/...` directories. You can get all info there which `sensors` is massaging to reveal to you.

**NOTE:** `pch_skylake` temperature is abnormally high on most machines. A short google search confirms this.
