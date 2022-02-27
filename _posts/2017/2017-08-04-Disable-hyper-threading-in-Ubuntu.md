---
layout:       post
title:        >
    Disable hyper threading in Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/942843
type:         Answer
tags:         16.04 configuration performance cpu conky
created_date: 2017-08-04 03:30:27
edit_date:    2021-11-15 11:54:31
votes:        "12 "
favorites:    
views:        "24,717 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-04-Disable-hyper-threading-in-Ubuntu.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

This is an interesting question. Probably one of the most interesting in months for me personally. Like the OP there is no option for disabling Hyper Threading in my old BIOS (invented 2012, updated 2016 or so).


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

## Hyper-Threading bugs in Intel Skylake and Kaby Lake:

> Anyone using **Intel Skylake** or **Kaby Lake** processors must read  
> the bug reports about Hyper Threading that surfaced a couple months  
> ago. This [UK Register][1] story spells out how Debian Developers  
> spotted how Hyper Threading can crash and corrupt the machine.  

There are numerous problems with Skylake reported in Ask Ubuntu over the last year and one wonders how to discern which problems may have been caused by Hyper Threading bugs.

## This answer is divided into three parts:

- Display of CPUs when Hyper-Threading is turned off/on
- Bash script to automate turning hyper-threading off/on
- Conky Crashes if Hyper Threading is turned off before it starts


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Display of CPUs when Hyper-Threading is turned off/on

Below you can see the CPU utilization when hyper-threading is turned off and a CPU stress test is performed. About 10 seconds later the same script is repeated with hyper threading turned on. Finally 10 seconds after that the script is run with hyper-threading turned off again:

[![Set Hyper Threading noht][2]][2]

The display is divided into two sections:

 - On the left half the terminal window invoking the script `set-hyper-threading` with the parameter 0 (off) and then 1 (on).
 - On the right half `conky` displays the CPU percentage utilization of CPUS 1 to 8.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

## First script run Hyper Threading off

The first time the script is run CPU Numbers 2, 4, 6 & 8 (according to Conky) are frozen at 3%, 2%, 2% and 2%. CPU Numbers 1, 3, 5 and 7 spike to 100% while stress test is run.

The CPU topology is displayed with hyper-threading turned off and only the four cores reported:

``` 
/sys/devices/system/cpu/cpu0/topology/core_id:0
/sys/devices/system/cpu/cpu2/topology/core_id:1
/sys/devices/system/cpu/cpu4/topology/core_id:2
/sys/devices/system/cpu/cpu6/topology/core_id:3
```


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

## Second script run Hyper Threading on

The second time the script is run Hyper-Threading is turned on and all CPU Numbers 1-8 spike to 100% while stress test is run.

The CPU topology is displayed with hyper-threading turned on and only the four cores plus and four virtual cores reported:

``` 
/sys/devices/system/cpu/cpu0/topology/core_id:0
/sys/devices/system/cpu/cpu1/topology/core_id:0
/sys/devices/system/cpu/cpu2/topology/core_id:1
/sys/devices/system/cpu/cpu3/topology/core_id:1
/sys/devices/system/cpu/cpu4/topology/core_id:2
/sys/devices/system/cpu/cpu5/topology/core_id:2
/sys/devices/system/cpu/cpu6/topology/core_id:3
/sys/devices/system/cpu/cpu7/topology/core_id:3
```


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Third script run Hyper Threading off

Note how after the second script ends CPUs 2, 4, 6 and 8 are idling at 4%, 2%, 3%, 4%. This is important because in the third test turning Hyper-Threading off shows those CPU percentages frozen at 4%, 2%, 3%, 4% rather than 3%, 2%, 2% and 2% from the first test.

Therefore turning off hyper-threading seems to just freeze the virtual CPUs at the current state.

Also note no matter if you turn Hyper-Threading on or off the script still displays "Hyper Threading Supported".


----------


# Bash script to automate turning hyper-threading off/on

When viewing the script below keep in mind that Conky numbers the CPUs from 1 to 8 but Linux numbers the CPUs from 0 to 7.

{% include copyHeader.html %}
``` bash
#!/bin/bash
    
# NAME: set-hyper-threading
# PATH: /usr/local/bin
# DESC: Turn Hyper threading off or on.
    
# DATE: Aug. 5, 2017.
    
# NOTE: Written Part of testing for Ubuntu answer:
#       https://askubuntu.com/questions/942728/disable-hyper-threading-in-ubuntu/942843#942843
    
# PARM: 1="0" turn off hyper threading, "1" turn it on.
    
if [[ $# -ne 1 ]]; then
    echo 'One argument required. 0 to turn off hyper-threading or'
    echo '1 to turn hyper-threading back on'
    exit 1
fi
    
echo $1 > /sys/devices/system/cpu/cpu1/online
echo $1 > /sys/devices/system/cpu/cpu3/online
echo $1 > /sys/devices/system/cpu/cpu5/online
echo $1 > /sys/devices/system/cpu/cpu7/online
    
grep "" /sys/devices/system/cpu/cpu*/topology/core_id
    
grep -q '^flags.*[[:space:]]ht[[:space:]]' /proc/cpuinfo && \
    echo "Hyper-threading is supported"
    
grep -E 'model|stepping' /proc/cpuinfo | sort -u
    
stress --cpu 8 --io 1 --vm 1 --vm-bytes 128M --timeout 10s
```

**NOTE:** The program `stress` is built into all Debian systems which Ubuntu is a derivative of. Therefore you don't have to download and install any packages to run this script in Ubuntu.

If you have a dual core CPU you need to remove (or comment out with `#`) the lines controlling CPU numbers 5 and 7.

Credit to [Hi-Angel][3] for bash line `grep "" /sys/devices/system/cpu/cpu*/topology/core_id` displaying CPU topology.

----------



<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Conky Crashes if Hyper Threading is turned off before it starts

To get CPUs 2, 4, 6, 8 to lowest percent utilization possible I tried turning off Hyper-Threading during boot up. I used this script to do that:

``` bash
# NAME: /etc/cron.d/turn-off-hyper-threading
# DATE: Auguust 5, 1017
# DESC: This turns off CPU 1, 3, 5 & 7
# NOTE: Part of testing for Ubuntu answer:
#       https://askubuntu.com/questions/942728/disable-hyper-threading-in-ubuntu/942843#942843
# BUGS: Conky crashes with Segmentation Fault when CPU 2,4,6 & 8 (as conky calls them)
#       are off-line.
#
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
#
# @reboot   root    echo 0 > /sys/devices/system/cpu/cpu1/online
# @reboot   root    echo 0 > /sys/devices/system/cpu/cpu3/online
# @reboot   root    echo 0 > /sys/devices/system/cpu/cpu5/online
# @reboot   root    echo 0 > /sys/devices/system/cpu/cpu7/online
```

However `conky` crashes with a segmentation fault if hyper-threading is turned off when it starts up. As such I had to comment out the four `@reboot` lines in the script.


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

## Conky Code to display CPU percent utilization and load factor

If you are interested in setting up a similar display in Conky here is the relevant code snippet:

``` 
${color orange}${voffset 2}${hr 1}
${color2}${voffset 5}Intel® i-7 3630QM 3.4 GHz: ${color1}@  ${color green}${freq} MHz   
${color}${goto 13}CPU 1 ${goto 81}${color green}${cpu cpu1}% ${goto 131}${color3}${cpubar cpu1 18}
${color}${goto 13}CPU 2 ${goto 81}${color green}${cpu cpu2}% ${goto 131}${color3}${cpubar cpu2 18}
${color}${goto 13}CPU 3 ${goto 81}${color green}${cpu cpu3}% ${goto 131}${color3}${cpubar cpu3 18}
${color}${goto 13}CPU 4 ${goto 81}${color green}${cpu cpu4}% ${goto 131}${color3}${cpubar cpu4 18}
${color}${goto 13}CPU 5 ${goto 81}${color green}${cpu cpu5}% ${goto 131}${color3}${cpubar cpu5 18}
${color}${goto 13}CPU 6 ${goto 81}${color green}${cpu cpu6}% ${goto 131}${color3}${cpubar cpu6 18}
${color}${goto 13}CPU 7 ${goto 81}${color green}${cpu cpu7}% ${goto 131}${color3}${cpubar cpu7 18}
${color}${goto 13}CPU 8 ${goto 81}${color green}${cpu cpu8}% ${goto 131}${color3}${cpubar cpu8 18}
${color1}All CPU ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 2 temp 1}°C ${goto 250}${color1}Up: ${color green}$uptime
${color green}$running_processes ${color1}running of ${color green}$processes ${color1}loaded processes.
Load Avg. 1-5-15 minutes: ${alignr}${color green}${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
${color1}NVIDIA  ${color}-GPU ${color green}${nvidia gpufreq} Mhz  ${color}-Memory ${color green}${nvidia memfreq} Mhz
${color1}GT650M ${color}-Temp ${color green}${nvidia temp}°C  ${color}-Threshold ${color green}${nvidia threshold}°C
${color orange}${voffset 2}${hr 1}
```

**NOTE:** The full conky resource file can be found on [Setting to High Performance]({% post_url /2018/2018-06-19-Setting-to-High-Performance %}).


  [1]: https://www.theregister.co.uk/2017/06/25/intel_skylake_kaby_lake_hyperthreading/
  [2]: https://i.stack.imgur.com/M33lK.gif
  [3]: https://askubuntu.com/users/266507/hi-angel


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a></div>

