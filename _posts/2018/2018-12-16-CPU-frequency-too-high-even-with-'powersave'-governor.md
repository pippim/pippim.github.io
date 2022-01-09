---
layout:       post
title:        >
    CPU frequency too high even with 'powersave' governor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102337
type:         Answer
tags:         18.04 intel cpu cpufreq governor
created_date: 2018-12-16 15:16:15
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "4,873 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

# Answer Version 3.0

Kernel version 4.14.98 has finally fixed problems I've noticed for last 6 months or so:

- When system is idle CPU frequency would spike to 3,000 MHz in Turbo Mode.
- When system is busy CPU frequency would simmer down to about 1,500 MHz.

Now as you can see when system is idle system is at 800 MHz as it should be:

[![enter image description here][1]][1]
# Answer Version 2.0

OP updated question with results of Initial Answer below and for whatever reason the governor is set to `performance` mode which runs all CPU's at max speed all the time.

We need to do the reverse of this answer: [Set CPU governor to performance in 18.04](Set CPU governor to performance in 18.04)

<!-- Language-all: lang-bash -->


Use: `sudo -H gedit /etc/rc.local` put insert this **before** the last line containing `exit 0`:

``` 
sleep 120 # Give CPU startup routines time to settle.
echo powersave | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
echo 800000 | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_min_freq

```


Save the file and reboot. Two minutes after rebooting your CPU's will settle down and run normally.


----------

# What if `/etc/rc.local` doesn't exist?

From this: [Ubuntu 16.10 rc.local file does not exist](Ubuntu 16.10 rc.local file does not exist)

you need to enter:

``` 
sudo systemctl enable rc-local.service

```



----------

# Initial Answer

According to: [`intel_pstate` CPU Performance Scaling Driver][2], `intel_pstate` status should be:

> **status**  
>   
>     Operation mode of the driver: “active”, “passive” or “off”.  
>   
>     “active”  
>         The driver is functional and in the active mode.  
>     “passive”  
>         The driver is functional and in the passive mode.  
>     “off”  
>         The driver is not functional (it is not registered as a scaling driver with the CPUFreq core)  

My first step would be to remove your kernel command line parameter `intel_pstate=disable`.

Reboot and type the following:

``` 
$ cd /sys/devices/system/cpu/cpu0/cpufreq

$ paste <(ls *) <(cat *)

affected_cpus                             0
cpuinfo_max_freq                          3500000
cpuinfo_min_freq                          800000
cpuinfo_transition_latency                0
energy_performance_available_preferences  default performance balance_performance balance_power power 
energy_performance_preference             balance_performance
related_cpus                              0
scaling_available_governors               performance powersave
scaling_cur_freq                          832522
scaling_driver                            intel_pstate
scaling_governor                          powersave
scaling_max_freq                          3500000
scaling_min_freq                          800000
scaling_setspeed                          <unsupported>

```

This is what I have in a default configuration without `intel_pstate=disable`.

**Pay close attention** to `scaling_max_freq` and `scaling_min_freq`.

You might want to temporarily uninstall CPU Freq Utils package:

``` 
sudo apt remove cpufrequtils

```

I have never found a need for it and it might be mucking your system up. Later you can install it again (if need be) with:

``` 
sudo apt install cpufrequtils

```


  [1]: https://i.stack.imgur.com/RnnCy.png
  [2]: https://www.kernel.org/doc/html/v4.12/admin-guide/pm/intel_pstate.html
