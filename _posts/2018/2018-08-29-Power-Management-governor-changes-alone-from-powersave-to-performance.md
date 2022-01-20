---
layout:       post
title:        >
    Power Management governor changes alone from powersave to performance
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069961
type:         Answer
tags:         18.04 power-management cpu overheating tlp
created_date: 2018-08-29 01:17:00
edit_date:    
votes:        "3 "
favorites:    
views:        "2,855 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-29-Power-Management-governor-changes-alone-from-powersave-to-performance.md
toc:          false
navigation:   false
clipboard:    false
---

## Force to `powersave` speed governor

You are using `sudo tlp stat -p` to find out when the speed governor is set at `performance` mode. When this happens reset it to `powersave` with this command:

``` 
$ echo "powersave" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
powersave
```

Run `tlp` statistics again and ensure minimum frequency is normalized and no longer set at maximum frequency.

Keep running `tlp` to find out how often the governor is being reset to `performance` mode.

Keep searching for the program that is reseting the speed governor.

As a last resort you could:

1. Setup a sleeping procedure to reset to `powersave` every x seconds.
2. Setup a procedure that monitors the speed governor every second and reset it when it changes.
