---
layout:       post
title:        >
    How to know CPU frequency?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/837563
type:         Answer
tags:         14.04 cpu
created_date: 2016-10-15 18:36:33
edit_date:    
votes:        "4 "
favorites:    
views:        "5,884 "
accepted:     
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

The first answer is a great one. The OP asked for "some" terminal commands. I'll throw in some extras, because every question can have many answers.

This is another way of seeing current frequencies for EVERY CPU:

``` 
rick@dell:~$  sudo cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_cur_freq
[sudo] password for rick: 
2911523
2978173
2825097
3068554
2888232
2038769
2891894
3134619
────────────────────────────────────────────────────────────────
rick@dell:~$ 

```

You can shorten the above output by replacing `*` with a given CPU number such as `0` for the first CPU or `7` for the last CPU (on an 8 CPU system).

Another way of getting CPU frequencies without `sudo` powers is:

``` 
rick@dell:~$ cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
3174316
3223095
3250781
3214160
3211962
3222802
3237451
3245654
────────────────────────────────────────────────────────────────
rick@dell:~$ 

```

These are other commands in regards to Frequencies and the CPU that you might like to try out:

``` 
cat /sys/class/thermal/thermal_zone*/temp
cat /sys/devices/system/cpu/intel_pstate/no_turbo
cat /sys/devices/system/cpu/intel_pstate/turbo_pct
cat /sys/devices/system/cpu/intel_pstate/num_pstates
cat /sys/devices/system/cpu/intel_pstate/min_perf_pct
cat /sys/devices/system/cpu/intel_pstate/max_perf_pct
cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_min_freq
cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_max_freq
cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_transition_latency
cat /sys/devices/system/cpu/cpu*/cpufreq/affected_cpus
cat /sys/devices/system/cpu/cpu*/cpufreq/related_cpus
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_available_governors 
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_min_freq
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_max_freq
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_setspeed 
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_driver

```

Once again you can replace `*` with a given CPU number to shorten output.
