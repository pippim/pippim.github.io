---
layout:       post
title:        >
    Which is better, High CPU % with Low Frequency or the opposite?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/416954
type:         Question
tags:         kernel cpu battery cpu-frequency temperature conky
created_date: 2018-01-14 03:14:21
edit_date:    2020-06-11 14:16:50
votes:        "4 "
favorites:    
views:        "1,707 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-14-Which-is-better^-High-CPU-^-with-Low-Frequency-or-the-opposite^.md
toc:          false
navigation:   false
clipboard:    false
---

## January 15, 2018 update

I created a 90 second Conky `.gif` showing "normal" behavior during start up:

- A few seconds after boot I start Conky.
- A few seconds later I start Peek which begins recording .gif after 3 seconds when system up-time is about about 30 seconds.
- When .gif starts I load Firefox 10 tabs and two windows, one window with video (flash player)
- For first minute up up-time, .gif shows frequency high in turbo mode and CPU load moderate.
- `cron`jobs, for example daily emailed backup, run at @reboot time making single core spike to 100%.
- After a minute frequencies reduce to non-turbo boost below 2.6 GHz which I deem to be "normal".
- .gif ends when system up-time is 2 minutes and 10 seconds.

Normal start-up `.gif`:

[![Conky startup.gif][1]][1]

Although this is under the same kernel `4.14.13` it doesn't explain the abnormal behavior on January 13, 2018 when frequencies stayed in turbo-boost mode during the entire session.

## January 14, 2018 update

I rebooted with Kernel 4.14.13 today and it is behaving like 4.14.12 yesterday. I can't explain the difference and have no objections with  this question be close voted.

## High CPU % with Low Frequency vs. Low CPU % with High Frequency

Both these results are using FireFox with 10 tabs open in Non-Full Screen on laptop built-in 1080p display and FireFox with one tab open in Full Screen streaming a movie on External TV connected via ThunderBolt 3 USB-C to HDMI adapter. All tests were on a Skylake i7 6700HQ.

## Kernel 4.14.12

All kernels sampled `4.4`, `4.10` and `4.14` (up until version 4.14.13) exhibited High CPU % with Low Frequency.

[![CPU High Frequency Low.gif ][2]][2]

## Kernel 4.14.13

Whilst trying different kernels to watch Meltdown security hole impact I noticed an unrelated change where clock frequency was running at Turbo speeds constantly with a 10 degree increase in temperatures.

[![CPU Low Frequency High.gif][3]][3]

# What Changed

The only difference is booting Kernel version `4.14.12` (High CPU, Low frequency) and kernel version `4.14.13` (Low CPU with High Frequency). 

Ubuntu 16.04.3 LTS is used in both tests with no `apt-get` changes in-between.

In both tests the nVidia GTX 970M is disabled and only the Intel HD530 integrated graphics are used. When nVidia was activated on Kernel 4.14.4 the CPU % didn't seem to decrease all that much but moving Windows on desktop wasn't nearly as smooth as the Intel iGPU.

My other laptop has an Ivy Bridge 3630QM CPU and exhibits very different behavior in the three years I was using it. CPU % was slightly higher because it was a weaker processor but frequency would bounce between low and high all the time with most time spent in the middle. I think the frequency behavior was much preferable but, that is subjective. I'll create some Conky .gif's later for the 3630QM CPU if someone is interested.

## Questions

Is it better to have Low CPU with High Frequency or High CPU and Low Frequency?

Battery use isn't really a concern as this 17" laptop doesn't go outside since it doesn't fit into the coat pocket as easily as the 5.5" 1080p smartphone. It would still be good to know if Low CPU % or Low Frequency is better for battery life?

  [1]: https://i.stack.imgur.com/32XjR.gif
  [2]: https://i.stack.imgur.com/Nrc2X.gif
  [3]: https://i.stack.imgur.com/J3Dai.gif
