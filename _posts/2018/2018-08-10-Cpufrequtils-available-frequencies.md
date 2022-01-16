---
layout:       post
title:        >
    Cpufrequtils available frequencies
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064309
type:         Answer
tags:         cpu
created_date: 2018-08-10 23:32:56
edit_date:    2018-08-19 18:32:36
votes:        "0 "
favorites:    
views:        "1,227 "
accepted:     Accepted
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-10-Cpufrequtils-available-frequencies.md
toc:          false
navigation:   false
clipboard:    true
---

Intel has stopped publishing available frequencies but you can approximate what they are:

Use these commands to see available steps and min/max:

{% include copyHeader.html %}
``` 
$ cd /sys/devices/system/cpu/intel_pstate
$ paste <(ls *) <(cat *) | column -s $'\t' -t
max_perf_pct  100
min_perf_pct  22
no_turbo      0
num_pstates   28
status        active
turbo_pct     33

$ cd /sys/devices/system/cpu/cpu0/cpufreq
$ paste <(ls *) <(cat *) | column -s $'\t' -t
affected_cpus                             0
cpuinfo_max_freq                          3500000
cpuinfo_min_freq                          800000
cpuinfo_transition_latency                4294967295
energy_performance_available_preferences  default performance balance_performance balance_power power 
energy_performance_preference             balance_performance
related_cpus                              0
scaling_available_governors               performance powersave
scaling_cur_freq                          1939478
scaling_driver                            intel_pstate
scaling_governor                          powersave
scaling_max_freq                          3500000
scaling_min_freq                          800000
scaling_setspeed                          <unsupported>
```

From this answer I just posted on Stack Exchange: [Get all available frequency steps][1] copy and paste this function into your terminal:

``` 
ApproximateFrequencies () {
    NumSteps=$(cat /sys/devices/system/cpu/intel_pstate/num_pstates)
    MinFreq=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq)
    MaxFreq=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq)
    LastFreq=$MinFreq
    StepRate=$((( $MaxFreq - $MinFreq ) / $NumSteps))
    for ((n=0;n<=$NumSteps;n++)); do
        echo $LastFreq
        LastFreq=$(( $LastFreq + $StepRate))
    done
}
```

Then use this to display frequencies:

``` 
$ ApproximateFrequencies | column
800000  1089284 1378568 1667852 1957136 2246420 2535704 2824988 3114272 3403556
896428  1185712 1474996 1764280 2053564 2342848 2632132 2921416 3210700 3499984
992856  1282140 1571424 1860708 2149992 2439276 2728560 3017844 3307128
```

If you don't have `column` installed then omit `| column` portion of command.

  [1]: https://unix.stackexchange.com/questions/443767/get-all-available-frequency-steps

