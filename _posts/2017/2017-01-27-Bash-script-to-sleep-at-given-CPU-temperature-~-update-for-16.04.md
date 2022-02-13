---
layout:       post
title:        >
    Bash script to sleep at given CPU temperature ~ update for 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/876732
type:         Answer
tags:         16.04 suspend cpu temperature conky
created_date: 2017-01-27 03:23:44
edit_date:    2017-04-13 12:23:51
votes:        "2 "
favorites:    
views:        "2,613 "
accepted:     
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-27-Bash-script-to-sleep-at-given-CPU-temperature-~-update-for-16.04.md
toc:          false
navigation:   true
clipboard:    false
---

On my system every time `sensors` is run there is a stutter in video streaming. Having this happen every 10 seconds or however often proposed script is run would drive me bat crazy. A better solution to suspend would be using Intel's ***thermald*** and ***Powerclamp*** to slow down the CPU in order to reduce heat. I've written this answer for another question ([Stop cpu from overheating][1]) and am copying here for convenience.

Additionally the above script relies on `temp1` which is often corrupted on my Ubuntu 16.04 and only `temp3` is 100% reliable which doesn't show up on `sensors`. ie:

``` 
$ cat /sys/class/thermal/thermal_zone*/temp
27800
29800
58000
```

and from `sensors`:

``` 
acpitz-virtual-0
Adapter: Virtual device
temp1:        +27.8°C  (crit = +106.0°C)
temp2:        +29.8°C  (crit = +106.0°C)
```

This happens after suspend/resume. The **REAL** temperature is +58.0°C but is falsely reported as +27.8°C after resuming. So the heat protection would only work once to suspend and never work again until a reboot. So the system would hit critical (+106.0°C) at which point a hard power off is performed and data can be corrupted.

So here's my recommended solution to prevent overheating and utilizing CPU slow down rather than outright system suspend.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Slow down CPU to reduce heat

This works for Ubuntu 16.04+ with Intel Sandy Bridge and newer processors. 

From ([wiki.debian.org -thermald][2]) is Debian's (used by Ubuntu) write up about ***thermald***, a Linux daemon for cooling tablets and laptops.  Once the system temperature reaches a certain threshold, the Linux daemon activates various cooling methods to cool the system.

Linux thermal daemon (thermald) monitors and controls temperature in laptops, tablets PC with the latest Intel sandy bridge and latest Intel CPU releases. Once the system temperature reaches a certain threshold, the Linux daemon activates various cooling methods to try to cool the system.

It operates in two modes:

### Zero Configuration Mode
 - For most users, this should be enough to bring the CPU temperature of the system under control. This uses DTS temperature sensor and uses Intel P state driver, Power clamp driver, Running Average Power Limit control and cpufreq as cooling methods.

### User defined configuration mode
 - This allows ACPI style configuration in a thermal XML configuration file. This can be used to fix the buggy ACPI configuration or fine tune by adding more sensors and cooling devices. This is a first step in implementing a close loop thermal control in user mode and can be enhanced based on community feedback and suggestions.

### How to install

``` 
apt-get install thermald
```


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# Intel Powerclamp

Intel's ***Powerclamp*** driver is defined here ([kernel.org - Intel Power Clamp.txt][3]) and is part of ***thermald*** described above. A direct quote for **Powerclamp** from the link:

> Consider the situation where a system’s power consumption must be  
> reduced at runtime, due to power budget, thermal constraint, or noise  
> level, and where active cooling is not preferred. Software managed  
> passive power reduction must be performed to prevent the hardware  
> actions that are designed for catastrophic scenarios.  
>   
> Currently, P-states, T-states (clock modulation), and CPU offlining  
> are used for CPU throttling.  
>   
> On Intel CPUs, C-states provide effective power reduction, but so far  
> they’re only used opportunistically, based on workload. With the  
> development of intel_powerclamp driver, the method of synchronizing  
> idle injection across all online CPU threads was introduced. The goal  
> is to achieve forced and controllable C-state residency.  
>   
> Test/Analysis has been made in the areas of power, performance,  
> scalability, and user experience. In many cases, clear advantage is  
> shown over taking the CPU offline or modulating the CPU clock.  



----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# How do you know Powerclamp is running?

***Powerclamp*** might only show itself once a year when your fan vents get too much dust & lint. So how do you know it's actually running in the background? Use:

``` 
lsmod | grep intel
```

And you should see a list similar to this:

``` 
btintel                16384  1 btusb
bluetooth             520192  29 bnep,btbcm,btrtl,btusb,rfcomm,btintel
intel_rapl             20480  0
intel_powerclamp       16384  0
   (.... more intel drivers ....)
snd                    81920  18 snd_hwdep,snd_timer,snd_hda_codec_hdmi,snd_hda_codec_idt,snd_pcm,snd_seq,snd_rawmidi,snd_hda_codec_generic,snd_hda_codec,snd_hda_intel,snd_seq_device
```

If you see `intel_rapl` and `intel_powerclamp` you know it's working and simply waiting temps to exceed 85C.


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Powerclamp in action displayed by Conky

Here is a screen shot when *Powerclamp* injects sleep cycles:

[![Kidie Injection][4]][4]

Normally on this system CPU clock speed is 2400 Mhz to 3400 Mhz when watching HTML5 video and 10 Chrome tabs open. Normally CPU utilization is about 9% to 12% across 8 CPUs. When things get too hot (**86C**) *Powerclamp* kicks in and this happens:

 - CPU speed is reduced to 1200 Mhz. 
 - CPU utilization spikes up to 80%. This is misleading because the extra 70% is sleeping time.
 - The top 9 CPU processes are usually 5 or 6 Chrome processes plus Xorg, Conky, Pulse Audio and an occasional kworker. However now 8 of the top 10 are the **kidle_inject/x** process where `x` is from 0 to 7. For the first 8 CPUs.

The ***Powerclamp*** driver runs until temps drop below 85C again. While the driver is running you might have split second pausing in your videos and possibly split second keyboard and mouse lag.


----------



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# Disable Intel Turbo Boost

Back in the "cool old days" of Ubuntu 14.04 Intel Turbo Boost was broken so my processor speed fluctuated between 1200 Mhz and 2400 Mhz. After upgrade to Ubuntu 16.04 it would go up to 3400 Mhz (3.4 Ghz) because Turbo Boost was finally working. But it also raised the heat.

To disable Intel Turbo Boost use:

``` 
echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
```

  [1]: {% post_url /2017/2017-01-25-Stop-cpu-from-overheating %}
  [2]: https://wiki.debian.org/thermald
  [3]: https://www.kernel.org/doc/Documentation/thermal/intel_powerclamp.txt
  [4]: https://i.stack.imgur.com/TYc48.png



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

