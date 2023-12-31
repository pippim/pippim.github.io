---
layout:       post
title:        >
    Why is /sys/devices/system/cpu/cpu0/cpufreq/scaling_setspeed not modifiable by sudo emacs?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/463735
type:         Answer
tags:         emacs cpu-frequency nano
created_date: 2018-08-20 22:56:49
edit_date:    
votes:        "0 "
favorites:    
views:        "5,745 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-20-Why-is-_sys_devices_system_cpu_cpu0_cpufreq_scaling_setspeed-not-modifiable-by-sudo-emacs_.md
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in comments, the conventional method to set 1600 MHz speed is:

``` 
echo 1600000 | sudo tee /sys/devices/system/cpu/cpu0/cpufreq/scaling_setspeed
```

To verify it's effect use:

``` 
$ cd /sys/devices/system/cpu/cpu0/cpufreq/
$ paste <(ls *) <(cat *) | column -s $'\t' -t
affected_cpus                             0
cpuinfo_max_freq                          3500000
cpuinfo_min_freq                          800000
cpuinfo_transition_latency                4294967295
energy_performance_available_preferences  default performance balance_performance balance_power power 
energy_performance_preference             balance_performance
related_cpus                              0
scaling_available_governors               performance powersave
scaling_cur_freq                          807325
scaling_driver                            intel_pstate
scaling_governor                          powersave
scaling_max_freq                          3500000
scaling_min_freq                          800000
scaling_setspeed                          <unsupported>
```

On my machine `scaling_setspeed` cannot be set as I have an i7-6700HQ. The same is true on my old 3rd generation i7-3630QM.

So on these platforms I would set `scaling_min_freq` and `scaling_max_freq` to the same level and `p_state` would never fluctuate. The same setting I would likely apply across all CPU's in `.../cpu0/...` through `.../cpu7/...`
