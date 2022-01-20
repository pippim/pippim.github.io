---
layout:       post
title:        >
    How to delete CPU-stats from cpufreq?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138740
type:         Answer
tags:         18.04 xubuntu cpu 32-bit cpufreq
created_date: 2019-04-27 22:15:04
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "1,448 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-27-How-to-delete-CPU-stats-from-cpufreq^.md
toc:          false
navigation:   false
clipboard:    false
---

From: [CPU frequency and voltage scaling statistics in the Linux(TM) kernel][1]

``` 
<mysystem>:/sys/devices/system/cpu/cpu0/cpufreq/stats # ls -l
total 0
drwxr-xr-x  2 root root    0 May 14 16:06 .
drwxr-xr-x  3 root root    0 May 14 15:58 ..
--w-------  1 root root 4096 May 14 16:06 reset
-r--r--r--  1 root root 4096 May 14 16:06 time_in_state
-r--r--r--  1 root root 4096 May 14 16:06 total_trans
-r--r--r--  1 root root 4096 May 14 16:06 trans_table
```


## reset

Write-only attribute that can be used to reset the stat counters. This can be
useful for evaluating system behaviour under different governors without the
need for a reboot.

This should reset all the stats:

``` 
echo '1' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/stats/reset
## ```




From: [How to use cpufrequtils][2]

### cpufreq-set

Allows setting

``` 
-d  minimum frequency,
-u  maximum frequency,
-f  specific frequency (userspace governor must be set first) and
-g  governor on a
-c  specific CPU.
```

`cpufreq-set` needs root privileges in order to work. 

Look for this in your setup:

``` 
sudo cpufreq-set -u 950MGhz
```

and remove it. Or add this to your setup:

``` 
sudo cpufreq-set -u 1.20Ghz
```


----------


From: [HowTo CpuFrequencyScaling][3] 

GOVERNOR variable from /etc/default/cpufrequtils not taking effect

So, you configured the GOVERNOR variable in /etc/default/cpufrequtils and after reboot you notice by running cpufreq-info that the active governor is still "ondemand".

This may happen if you have laptop-mode-tools installed. laptop-mode configures the active governor via the following variables: BATT_CPU_GOVERNOR, LM_AC_CPU_GOVERNOR, NOLM_AC_CPU_GOVERNOR. You can override them to your liking in /etc/laptop-mode/laptop-mode.conf:

``` 
BATT_CPU_GOVERNOR=powersave
LM_AC_CPU_GOVERNOR=conservative
NOLM_AC_CPU_GOVERNOR=ondemand
```


----------

From: [Arch Linux CPU frequency scaling][4]

### Setting maximum and minimum frequencies

In rare cases, it may be necessary to manually set maximum and minimum frequencies.

To set the maximum clock frequency (clock_freq is a clock frequency with units: GHz, MHz):

``` 
sudo cpupower frequency-set -u clock_freq
```

To set the minimum clock frequency:

``` 
sudo cpupower frequency-set -d clock_freq
```

To set the CPU to run at a specified frequency:

``` 
sudo cpupower frequency-set -f clock_freq
```


  [1]: https://www.kernel.org/doc/Documentation/cpu-freq/cpufreq-stats.txt
  [2]: http://www.thinkwiki.org/wiki/How_to_use_cpufrequtils#cpufreq-set
  [3]: https://wiki.debian.org/HowTo/CpuFrequencyScaling#Configuration
  [4]: https://wiki.archlinux.org/index.php/CPU_frequency_scaling#Setting_maximum_and_minimum_frequencies
