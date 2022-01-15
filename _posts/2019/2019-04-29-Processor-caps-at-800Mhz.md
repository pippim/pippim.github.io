---
layout:       post
title:        >
    Processor caps at 800Mhz
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1139270
type:         Answer
tags:         16.04 cpufreq intel-cpu
created_date: 2019-04-29 23:17:43
edit_date:    
votes:        "3 "
favorites:    
views:        "1,947 "
accepted:     Accepted
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-29-Processor-caps-at-800Mhz.md
toc:          false
navigation:   false
clipboard:    false
---

The following commands are used in the `.gif` below:

``` 
time sudo updatedb # See 8 CPUs run at 3.5 GHz. Then set 800 MHz Below
echo 800000 | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq
time sudo updatedb # See 8 CPUs run at 800 Mhz. Then set 3.5 GHz Below
echo 3500000 | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq
time sudo updatedb # Time is 3.5 seconds instead of 13.8 seconds

```

[![cpu 800 MHz demo.gif][1]][1]

To make a long visual short first find out maximum CPU speed before it is throttled:

``` 
rick@alien:~$ cd /sys/devices/system/cpu/cpu0/cpufreq/
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:/sys/devices/system/cpu/cpu0/cpufreq$ grep -r .
energy_performance_available_preferences:default performance balance_performance balance_power power 
scaling_min_freq:800000
scaling_available_governors:performance powersave
scaling_governor:performance
cpuinfo_max_freq:3500000
related_cpus:0
scaling_cur_freq:3218768
scaling_setspeed:<unsupported>
affected_cpus:0
scaling_max_freq:3500000
cpuinfo_transition_latency:0
energy_performance_preference:performance
scaling_driver:intel_pstate
cpuinfo_min_freq:800000

```

Notice the line: `cpuinfo_max_freq:3500000` above. 3,500.000 MHz is my processors max speed. So to restore maximum speed I use:

``` 
echo 3500000 | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq

```

Most people do it one by one and some say it's not possible to do them all at once but I've never had a problem doing all 8 CPUs at once. If you want to do one at a time you can use:

``` 
echo 3500000 | sudo tee /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq
echo 3500000 | sudo tee /sys/devices/system/cpu/cpu1/cpufreq/scaling_max_freq
         ( etc., etc., etc. )
echo 3500000 | sudo tee /sys/devices/system/cpu/cpu7/cpufreq/scaling_max_freq

```


----------

This will restore your CPUs to maximum speed but we still need to find out what package is setting your CPUs to 800 MHz.

  [1]: https://i.stack.imgur.com/uvime.gif
