---
layout:       post
title:        Skylake hardware brightness changes too granular
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/52804560
type:         Question
tags:         ubuntu-16.04 screen intel hardware-programming
created_date: 2018-10-14 16:04:27
edit_date:    2019-06-30 08:20:02
votes:        0
favorites:    
views:        61
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    true
---

I'm having a problem with Skylake i7-6700 HQ laptop display (HD 530 graphics) brightness changes:

- If the value changes by 20 it works.
- If the value changes by 19 it only works in multiple-hundred jumps.
- If the value changes by <19 there is no brightness change at all.

However on my old Ivybridge laptop i7-3630 QM (HD 4000 graphics) brightness successfully changes in steps of 1.

Here is the script for testing:

<!-- Language: lang-bash -->

``` 
#!/bin/bash

# Test all brightness levels from 1 to max_brightness

# For Intel i7-6700 HQ HD 530 graphics:
# - When change is 18 steps brighhness doesn't change at all.
# - When change is 19 steps brightnesss changes on multi-hundred point jumps.
# - When change is 20 steps each change applied as expected.

```

{% include copyHeader.html %}
``` 
# For Intel i7-3630QM steps of 1 work fine!

if [[ $(id -u) != 0 ]]; then
    echo >&2 "$0 must be called with sudo powers"
    exit 1
fi

cd /sys/class/backlight/*/
max=$(cat max_brightness)
save=$(cat brightness)

for (( i=1; i < max; i=i+20)); do
    echo $i > brightness
    echo setting brightness level: $i
    sleep .005
done

echo $save > brightness
echo resetting brightness level from $max back to: $save

exit 0

```


I think my skylake is working fine other than weird temperatures reported for pch_skylake sensor:

``` 
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/...$/.0°C/'
INT3400 Thermal  20.0°C
SEN1             56.0°C
SEN2             52.0°C
SEN3             57.0°C
SEN4             61.0°C
pch_skylake      -44.0°C
B0D4             50.0°C
x86_pkg_temp     52.0°C

```

Other than that Linux intel micro-code is definitely activated on old laptop (Ubuntu 16.04) but may not be loaded on new laptop (Ubuntu 16.04.5).

**Edit:** Rebooted with Ubuntu 18.04.1 LTS, Kernel 4.15.0-36 and the same behaviour is witnessed.

**Confirmation:** I wonder if others have a Skylake laptop and can confirm hardware brightness works the same way.

**Question:** *For the app I'm developing, do I have to put in a feature for each user to test smallest granular brightness change supported?*
