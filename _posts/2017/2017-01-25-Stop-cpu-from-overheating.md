---
layout:       post
title:        >
    Stop cpu from overheating
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/875872
type:         Answer
tags:         cpu temperature conky
created_date: 2017-01-25 00:50:03
edit_date:    2017-08-06 13:29:25
votes:        "12 "
favorites:    
views:        "24,433 "
accepted:     Accepted
uploaded:     2022-01-09 05:38:31
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Intel Ubuntu 16.04+ solution for Sandy Bridge and newer processors

From ([wiki.debian.org -thermald][1]) there is Debian's (Ubuntu's) write up about ***thermald***  A Linux daemon for cooling tablets and laptops. This only works for Sandy Bridge (2nd generation) and newer Intel Cores. Once the system temperature reaches a certain threshold, the Linux daemon activates various cooling methods to try to cool the system.

Linux thermal daemon (thermald) monitors and controls temperature in laptops, tablets PC with the latest Intel sandy bridge and latest Intel CPU releases. Once the system temperature reaches a certain threshold, the Linux daemon activates various cooling methods to try to cool the system.

It operates in two modes:

### Zero Configuration Mode
 - For most users, this should be enough to bring the CPU temperature of the system under control. This uses DTS temperature sensor and uses Intel P state driver, Power clamp driver, Running Average Power Limit control and cpufreq as cooling methods.

### User defined configuration mode
 - This allows ACPI style configuration in a thermal XML configuration file. This can be used to fix the buggy ACPI configuration or fine tune by adding more sensors and cooling devices. This is a first step in implementing a close loop thermal control in user mode and can be enhanced based on community feedback and suggestions.

### How to install

``` 
apt-get install thermald
## 
```




<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# TLP

From [Arch Linux][4]:

> TLP brings you the benefits of advanced power management for Linux  
> without the need to understand every technical detail. TLP comes with  
> a default configuration already optimized for battery life, so you may  
> just install and forget it. Nevertheless TLP is highly customizable to  
> fulfill your specific requirements.  

Please read the full Arch Linux TLP link above. There are issues with Nvidia that require configuration changes.

After many trials and errors with other packages, I've had great success using TLP. It gives superior fan control and works seamlessly with ***thermald*** and ***p-states***.

As these [installation instructions][5] for Ubuntu 15.04+ mention TLP not only reduces overheating but it extends battery life too.

Since installing TLP, ***Powerclamp*** (described below) has never been invoked again.


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Intel Powerclamp

Intel's ***Powerclamp*** driver is defined here ([kernel.org - Intel Power Clamp.txt][2]) and is part of ***thermald*** described above. A direct quote for **Powerclamp** from the link:

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



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

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



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# Powerclamp in action displayed by Conky

Here is a screen shot when *Powerclamp* injects sleep cycles:

[![Kidie Injection][3]][3]

Normally on this system CPU clock speed is 2400 Mhz to 3400 Mhz when watching HTML5 video and 10 Chrome tabs open. Normally CPU utilization is about 9% to 12% across 8 CPUs. When things get too hot (**86C**) *Powerclamp* kicks in and this happens:

 - CPU speed is reduced to 1200 Mhz. 
 - CPU utilization spikes up to 80%. This is misleading because the extra 70% is sleeping time.
 - The top 9 CPU processes are usually 5 or 6 Chrome processes plus Xorg, Conky, Pulse Audio and an occasional kworker. However now 8 of the top 10 are the **kidle_inject/x** process where `x` is from 0 to 7. For the first 8 CPUs.

The ***Powerclamp*** driver runs until temps drop below 85C again. While the driver is running you might have split second pausing in your videos and possibly split second keyboard and mouse lag.


----------



<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

# Disable Intel Turbo Boost

Back in the "cool old days" of Ubuntu 14.04 Intel Turbo Boost was broken so my processor speed fluctuated between 1200 Mhz and 2400 Mhz. After upgrade to Ubuntu 16.04 it would go up to 3400 Mhz (3.4 Ghz) because Turbo Boost was finally working. But it also raised the heat.

To disable Intel Turbo Boost use:

``` 
echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo

```


----------



<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# Short term fix in this scenario

To "band-aid" fix this problem I pulled the old laptop cooler pad with dual fans out of the closet and popped under the laptop. This dropped temps to 63C under the same workload.

The next step will be compress air in vents. After that the final step will be new Cooling Heatsink with pipes for CPU and GPU. Good thermal paste such as Arctic Silver 5 is also needed in that operation. A new fan was already installed last year and that seems to be running ok.

### Update Jan 25 2017

Blew out fan vents with compressed air and temps dropped from 63C to 56C. This is still using the laptop cooling pad mind you.


### Update Aug 06 2017

Have been using `TLP` (described above) for many months now and temperatures are steady around 50C and fan performance is optimal.

----------



<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

# Watch out for too many fan control drivers

Because this is a Dell I had installed I8K Fan Monitor / Control in hopes it would speed up the fan sooner and faster. When I type `sensors` I get:

{% include copyHeader.html %}
``` 
$ sensors
dell_smm-virtual-0
Adapter: Virtual device
Processor Fan: 3963 RPM
CPU:            +63.0°C  
Ambient:        +49.0°C  
GPU:            +54.0°C  
Other:          +79.0°C  

acpitz-virtual-0
Adapter: Virtual device
temp1:        +27.8°C  (crit = +106.0°C)
temp2:        +29.8°C  (crit = +106.0°C)

coretemp-isa-0000
Adapter: ISA adapter
Physical id 0:  +65.0°C  (high = +87.0°C, crit = +105.0°C)
Core 0:         +65.0°C  (high = +87.0°C, crit = +105.0°C)
Core 1:         +64.0°C  (high = +87.0°C, crit = +105.0°C)
Core 2:         +63.0°C  (high = +87.0°C, crit = +105.0°C)
Core 3:         +57.0°C  (high = +87.0°C, crit = +105.0°C)

```

***Ignore the virtual temps, they are out to lunch***. Under Ubuntu 14.04 the were accurate and I used `temp 1` in Conky display. After Ubuntu 16.04 upgrade I had to refer to a third temperature not displayed on this screen. To see the **REAL** temps you can use this command:

``` 
$ cat /sys/class/thermal/thermal_zone*/temp
27800
29800
62000

```

When I type:

``` 
$ lsmod |grep dell
dell_wmi               16384  0
sparse_keymap          16384  1 dell_wmi
dell_laptop            20480  0
dell_smbios            16384  2 dell_wmi,dell_laptop
dcdbas                 16384  1 dell_smbios
dell_smm_hwmon         16384  0
wmi                    16384  1 dell_wmi
video                  40960  3 dell_wmi,dell_laptop,i915

```

I see the `dell_smm_hwmon` kernel module / driver. When I google that driver and `I8K` people report the two drivers cause system freezes for a split-second every 10 seconds or so. I was having this problem myself so had to remove *I8K fan control*.

There are lots of other utilities and cooling methodologies but this is getting **TL;DR**.

  [1]: https://wiki.debian.org/thermald
  [2]: https://www.kernel.org/doc/Documentation/thermal/intel_powerclamp.txt
  [3]: https://i.stack.imgur.com/TYc48.png
  [4]: https://wiki.archlinux.org/index.php/TLP
  [5]: http://linuxpitstop.com/install-tlp-on-ubuntu-15-04-and-centos-7/





<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

