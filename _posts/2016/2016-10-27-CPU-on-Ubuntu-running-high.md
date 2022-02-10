---
layout:       post
title:        >
    CPU on Ubuntu running high
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/842214
type:         Answer
tags:         gpu conky
created_date: 2016-10-27 01:21:01
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "237 "
accepted:     Accepted
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-27-CPU-on-Ubuntu-running-high.md
toc:          false
navigation:   false
clipboard:    false
---

When you are looking at the CPU% or Load factor you have to divide by the number of CPU Cores x Hyper Threading. So if you have a quad core processor with hyper threading it's in interpreted as 8 CPU's.

If your CPU% shows 200% and it is 8 CPUs then your real CPU usage is 25%.

If your load factor show ".92" and you have 8 CPUs then your real load factor is ".115". In your Conky you would massage your load factor (for 5 minutes, 10 minutes and 15 minutes) by using:

``` 
${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
```

The **Real** CPU percentage can never go over 100% and the **Real** load factor can never go over 1 so you have to mentally do the math dividing by the number of CPUs or use Conky for accurate results instead of `Top` or whatever program you were using.


----------

# Conky vs `top` screen example

Comparing `top` CPU% to Conky's CPU%:

[![top cpu vs conky cpu.png][1]][1]

Firefox is consuming the most CPU%. In `top` it is listed at **27.8%** in Conky it is listed at **3.37%**. Taking Conky's percentage and multiplying by 8 (the number of CPUs) yields **27%**.


  [1]: https://i.stack.imgur.com/8PPUK.png
