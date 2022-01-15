---
layout:       post
title:        >
    What is the correct way to view your CPU speed on Linux?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/463736
type:         Answer
tags:         linux cpu
created_date: 2018-08-20 23:06:33
edit_date:    
votes:        "8 "
favorites:    
views:        "216,045 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-20-What-is-the-correct-way-to-view-your-CPU-speed-on-Linux^.md
toc:          false
navigation:   false
clipboard:    false
---

CPU frequencies are kept in the kernel but they can be a little "off". You can see them using:

``` 
$ cd /sys/devices/system/cpu
$ paste <(cat cpu*/cpufreq/affected_cpus) <(cat cpu*/cpufreq/scaling_cur_freq) | column -s $'\t' -t
0  833914
1  800021
2  800086
3  800029
4  800036
5  800460
6  800118
7  800141

```

If you don't need to know the CPU #'s a shorter method is simply using:

``` 
$ cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
1396354
800058
800050
800024
800005
800017
800001
1392006

```

