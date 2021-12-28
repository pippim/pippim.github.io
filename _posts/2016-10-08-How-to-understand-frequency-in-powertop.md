---
layout:       post
title:        How to understand frequency in powertop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/834601
type:         Answer
tags:         powertop conky grub
created_date: 2016-10-08 17:06:47
edit_date:    2016-10-08 17:16:22
votes:        2
favorites:    
views:        749
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

The `frequency` the CPU is running at could be called the `heartbeat`. The faster the `frequency` the more the CPU is getting done. As a consequence just as you tend to sweat when your heartbeat is higher, the CPU gets hotter when the frequency increases.

Your `powertop` screen snapshot shows what percentage of time is spent at different frequencies. Look at the part that says `3,21 GHz 22,2%`. It appears your processor has a peek speed of 3.2 Gigahertz which is equivalent to 3200 Megahertz. In simple terms we can say 3.2 billion heartbeats per second for 22.2 percent of the time.

Look at the line below that says `1500 MHz 3,3%`. The Core is running at 1500 Megahertz (1.5 Gigahertz) for 3.3 percent of the time.

Although these values can be interesting to look at, generally they are only studied when something goes wrong such as CPU overheating (running at too high a frequency for too long) or system lock-up (one or more CPUs stuck in an infinite loop causing system to be unresponsive to input and/or screen turning grey).

A better test for your YouTube video is to load it up in one window and in another window open a few chrome tabs and scroll through websites. Is the Chrome scrolling fast enough for you? Note that internet speed can cause a slow down too when videos are playing and pictures in websites are downloaded concurrently.

## Conky Display


If you are interested you can use use a Conky display that always appear on your screen (I have mine on the right side) to show you CPU frequencies in real time along with temperature and average load factor. Average load factor summarizes frequencies and percentage of time at each frequency over 1 minute, 5 minute and 15 minute periods. As the screen below shows:

[![Conky Average Load][1]][1]

The processor speed of `1200 MHz` is misleading because it was for that second the picture was taken. It fluctuates from 1200 MHz to 2400 MHz with Intel turbo boost turned off (Intel pstate disabled in the last grub boot) and peeks to 3400 Mhz (3.4 Gigahertz) with turbo boost turned on.


  [1]: http://i.stack.imgur.com/lzv7x.png
