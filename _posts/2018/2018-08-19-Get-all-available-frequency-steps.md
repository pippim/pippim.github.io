---
layout:       post
title:        >
    Get all available frequency steps
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/463517
type:         Answer
tags:         cpu cpu-frequency
created_date: 2018-08-19 16:08:45
edit_date:    2018-08-19 18:34:34
votes:        "2 "
favorites:    
views:        "3,983 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-19-Get-all-available-frequency-steps.md
toc:          false
navigation:   false
clipboard:    false
---

I've searched around and as comments say there doesn't appear to be a table of frequencies maintained anymore.

Assuming the frequencies are scaled linearly you can approximate them by looking at the directories.



To assist in typing create this alias:

``` bash
alias cpuinfo="paste <(ls *) <(cat *) | column -s $'\t' -t"
```

First discover the number of frequency steps

``` bash
$ cd /sys/devices/system/cpu/intel_pstate
$ cpuinfo
max_perf_pct  100
min_perf_pct  22
no_turbo      0
num_pstates   28
status        active
turbo_pct     33
```

We have 28 frequency steps determined by `num_pstates`.

Now look at min and max frequency MHz which can change based on Turbo Boost enabled/disabled state:

``` bash
cd /sys/devices/system/cpu/cpu0/cpufreq
$ cpuinfo
affected_cpus                             0
cpuinfo_max_freq                          3500000
cpuinfo_min_freq                          800000
cpuinfo_transition_latency                4294967295
energy_performance_available_preferences  default performance balance_performance balance_power power 
energy_performance_preference             balance_performance
related_cpus                              0
scaling_available_governors               performance powersave
scaling_cur_freq                          837225
scaling_driver                            intel_pstate
scaling_governor                          powersave
scaling_max_freq                          3500000
scaling_min_freq                          800000
scaling_setspeed                          <unsupported>
```

I may write a script later to display frequencies automatically but to do it by hand this way:

- Step Rate=(`max`-`min`)/`steps`. eg (3500-800)/28=96.428
- Repeat 28 times: Rate=Last Rate+Step Rate. eg `800.00`, `896.42`, `992.856`, `1089.284`, `1185.712`, `1282.14`...


----------

## Script to list frequencies

You can copy and paste this function into your terminal:

``` bash
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

Then run the function using `ApproximateFrequencies`:

``` bash
800000
896428
992856
 . . .
3403556
3499984
```

Better still pipe through `column` command if you have it installed:

``` bash
$ ApproximateFrequencies | column
800000	1089284	1378568	1667852	1957136	2246420	2535704	2824988	3114272	3403556
896428	1185712	1474996	1764280	2053564	2342848	2632132	2921416	3210700	3499984
992856	1282140	1571424	1860708	2149992	2439276	2728560	3017844	3307128
```


