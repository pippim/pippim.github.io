---
layout:       post
title:        >
    CPU governor changes automatically to "performance" under load
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142294
type:         Answer
tags:         xubuntu performance cpu governor
created_date: 2019-05-11 03:09:43
edit_date:    
votes:        "2 "
favorites:    
views:        "1,992 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-11-CPU-governor-changes-automatically-to-_performance_-under-load.md
toc:          false
navigation:   false
clipboard:    false
---

`cpufreqd` is a frequency management daemon installed with:

``` 
sudo apt install cpufreqd
```

A configuration file [cpufreqd.conf][1] is used to change frequencies. There are two sections where you can see it changing governor to "performance":

``` 
[Profile]
name=hi_boost
minfreq=0%
maxfreq=100%
policy=performance

# full power when AC
[Rule]
name=AC_on
ac=on                   # (on/off)
profile=hi_boost
```

It's harder to figure out when it changes to "powersave" unless the battery charger is unplugged.

Since kernel 3.4 [*cpufreq*][2] is built into the kernel and loaded automatically. It includes frequency management daemon called `thermald`. As such there isn't much a need for `cpufreqd` anymore and it may have conflicted on your system. 

For even greater customization under battery power the `tlp` package is commonly used these days.

  [1]: https://linux.die.net/man/5/cpufreqd.conf
  [2]: https://wiki.archlinux.org/index.php/CPU_frequency_scaling
