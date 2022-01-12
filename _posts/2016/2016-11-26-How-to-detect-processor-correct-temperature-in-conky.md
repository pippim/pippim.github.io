---
layout:       post
title:        >
    How to detect processor correct temperature in conky
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854030
type:         Answer
tags:         temperature conky sensors
created_date: 2016-11-26 22:17:10
edit_date:    2018-05-25 23:07:51
votes:        "9 "
favorites:    
views:        "67,585 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

## Temperature from command line

To find out the temperature, use:

``` 
# Ivybridge Intel i7-3630QM
$ cat /sys/class/thermal/thermal_zone*/temp
69000
69000
67000

# Skylake Intel i7-6700HQ using paste after zone names
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t
INT3400 Thermal  20000
SEN1             53000
SEN2             49000
SEN3             53000
SEN4             55000
pch_skylake      70000
B0D4             47000
x86_pkg_temp     48000

```

## Temperature with Conky

Within `conky` the system variable I used to monitor an Ivy Bridge CPU is:

``` 
${hwmon 2 temp 1}°C

```

To monitor a Skylake CPU I initially used:

``` 
${hwmon 0 temp 1}°C

```

A few months later (possibly due to new kernel) on the same Skylake CPU I switched to:

``` 
${hwmon 1 temp 1}°C

```

The display looks like this:

[![Conky Temperature 4.8.10][1]][1]


  [1]: https://i.stack.imgur.com/85zjQ.png
