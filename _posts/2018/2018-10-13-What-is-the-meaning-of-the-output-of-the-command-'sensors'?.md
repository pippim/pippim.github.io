---
layout:       post
title:        >
    What is the meaning of the output of the command 'sensors'?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1083487
type:         Answer
tags:         cpu temperature
created_date: 2018-10-13 14:31:58
edit_date:    2018-10-13 14:51:57
votes:        "11 "
favorites:    
views:        "18,994 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

Sensors is reporting values found in Linux virtual file system directory:

``` 
/sys/class/thermal/thermal_zone*/temp

```

You can find them out yourself (even if Sensors isn't installed) using:

``` 
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/...$/.0°C/'
INT3400 Thermal  20.0°C
pch_skylake      -47.0°C
SEN1             52.0°C
SEN2             48.0°C
SEN3             55.0°C
SEN4             58.0°C
B0D4             54.0°C
x86_pkg_temp     54.0°C

```

Notice the `pch_skylake` sensor has gone crazy. Whilst researching the problem I found this question and posted this answer.

