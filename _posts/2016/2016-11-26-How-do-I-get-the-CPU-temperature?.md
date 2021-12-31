---
layout:       post
title:        >
    How do I get the CPU temperature?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854029
type:         Answer
tags:         hardware cpu temperature monitoring sensors conky
created_date: !!str "2016-11-26 22:15:04"
edit_date:    !!str "2018-10-15 10:41:04"
votes:        !!str "113"
favorites:    
views:        !!str "1,526,126"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

## Temperature without third-party apps

At the time of writing, all the answers involve use of third-party utilities. If you want to find out the temperature without installing anything, use:

``` 
$ cat /sys/class/thermal/thermal_zone*/temp
20000
53000
50000
53000
56000
68000
49000
50000

```

To see what zones the temperatures are referring to use:

``` 
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'
INT3400 Thermal  20.0°C
SEN1             45.0°C
SEN2             51.0°C
SEN3             57.0°C
SEN4             59.0°C
pch_skylake      77.5°C
B0D4             50.0°C
x86_pkg_temp     51.0°C

```

The temperatures are stored in Celsius with 3 implied decimal places. `sed` is used to "prettify" output. 

The last temperature is `x86_pkg_temp` reported at `54.0°C`. For the Skylake i7 6700HQ CPU, I used this temperature for Conky display below.

## Temperature with Conky

If you don't mind third-party utilities I like to use Conky--a light weight system monitor.

### Conky commands

Within conky the system variable I used to monitor an Ivy Bridge CPU is:

``` 
${hwmon 2 temp 1}°C

```

To monitor a Skylake CPU I used:

``` 
${hwmon 0 temp 1}°C

```

### Conky display

The conky display looks like this:

[![enter image description here][1]][1]

The temperature starts at 72°C with a single CPU running at 100% in turbo mode of 3200 MHz. Then turbo is switched off and temp drops 10°C to 62°C with a non-turbo speed of 2600 MHz. 10 seconds later turbo is turned back on and temperatures immediately spike back up to 72°C.


----------


# Controlling Temperature

After knowing your temperature you probably want to control it better. `tlp` works wonders for keeping system under control. It works with `thermald`, Intel Powerclamp, Battery vs AC for USB power, etc. Although highly configurable I've never had to change the configuration settings for a pleasant Out-Of-The-Box experience. Prior to using it I had all kinds of problems with an IvyBridge laptop overheating all the time. I have it on my new Skylake laptop and the fans NEVER run except when doing Ubuntu 16.04 LTS to 18.04 upgrade.

You can get a very detailed write-up with installation instructions here: https://askubuntu.com/questions/391474/stop-cpu-from-overheating/875872#875872

  [1]: https://i.stack.imgur.com/QHcG8.gif




