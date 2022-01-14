---
layout:       post
title:        >
    Poor battery life and performance due to incorrect CPU frequency scaling
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1072579
type:         Answer
tags:         power-management battery cpu
created_date: 2018-09-06 01:01:14
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,113 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-06-Poor-battery-life-and-performance-due-to-incorrect-CPU-frequency-scaling.md
toc:          false
navigation:   false
clipboard:    false
---

## Update: Try `linux-cpupower`

I found this Q&A that may be of help: [Is it possible to set a *constant* lowest CPU frequency under the modern PSTATE driver?][1]

Summary of the answer:

``` 
sudo apt-get install linux-cpupower

```

Then:

``` 
sudo cpupower frequency-set -g powersave
sudo cpupower frequency-set -d 400MHz
sudo cpupower frequency-set -u 3100MHz

```

As mentioned elsewhere I don't have an AMD processor and cannot test this for you...

----------


I've been thinking of purchasing a Ryzen based system based upon leading-edge developments but I am still Intel platform based.

`cpufrequtils` comes up often on this site and it is designed for your AMD platform. From this [Debian Article][2] (Debian is the father of Ubuntu) install the AMD CPU utilities using:

``` 
sudo apt install cpufrequtils

```

Pay close attention to removing or overriding other governor utilities such as `laptop-mode-tools`.

If you have any questions post a comment below and I'll try my best to assist with my limited knowledge of AMD platform.

Additionally, here is a detailed report from another user in Ask Ubuntu: [CPU frequency scaling stuck 2.80 Ghz and it&#39;s not going down](CPU frequency scaling stuck 2.80 Ghz and it&#39;s not going down)


  [1]: https://unix.stackexchange.com/questions/424602/is-it-possible-to-set-a-constant-lowest-cpu-frequency-under-the-modern-pstate
  [2]: https://wiki.debian.org/HowTo/CpuFrequencyScaling

