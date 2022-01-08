---
layout:       post
title:        >
    change min and max cpu frequency
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1057727
type:         Answer
tags:         18.04 cpu scaling frequency
created_date: 2018-07-19 23:37:41
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "25,154 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

## Edit May 13, 2019 - simple bash GUI script

I wrote this [simple bash GUI script][1] to change minimum and maximum frequencies:

[![cpuf.png][2]][2]


----------


# Original Answer

## Discover your Min/Max/Current Frequencies

To discover your frequencies copy and paste this command into your terminal (without the `$` or `#` prompts):

``` 
$ sudo -i
# paste <(cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_min_freq) <(cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_cur_freq) <(cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_max_freq) | column -s $'\t' -t
800000  900757  3500000
800000  921781  3500000
800000  857695  3500000
800000  904921  3500000
800000  816664  3500000
800000  845203  3500000
800000  892835  3500000
800000  844187  3500000
# exit
$

```

The minimum frequency, current frequency and maximum frequency is listed for each CPU. In my case it is 8 CPUs, in your case it will be 4 CPUs (dual core x 2 threads per core).

Values are listed in MHz with three decimals. So CPU 0 showing:

``` 
800000  900757  3500000

```

- Minimum Frequency 800.000 MHz
- Current Frequency 900.757 MHz
- Maximum Frequency 3500.000 Mhz

## How to reset Max Frequency

To change the maximum frequency lower (you can't change it higher) use this command to change it from 2200 Mhz to 1700 Mhz:

``` 
for x in /sys/devices/system/cpu/*/cpufreq/; do echo 1700000 | sudo tee $x/scaling_max_freq; done

```


  [1]: {% post_url /2019/2019-05-12-GUI-or-simple-Bash-script-to-throttle-the-CPU? %}
  [2]: https://i.stack.imgur.com/aBbiY.png
