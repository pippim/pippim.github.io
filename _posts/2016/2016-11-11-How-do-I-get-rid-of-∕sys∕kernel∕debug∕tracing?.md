---
layout:       post
title:        >
    How do I get rid of ∕sys∕kernel∕debug∕tracing?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/848237
type:         Answer
tags:         16.04 mount debug
created_date: 2016-11-11 15:04:09
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "10,607 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

At first I thought the problem had something to do with your `Linux net-services` revealed by `uname -a` command. I'm on Ubuntu 16.04 desktop so had little hope I could solve these two questions. I read up on the situation from this link: ([redhat.com - Realtime Tuning Guide][1]) that discusses `/sys/kernel/debug/tracing/`

## Question 1: How did "debugfs on /sys/kernel/debug" get mounted?

Imagine my surprise learning on my system kernel tracing was also enabled:

``` 
# cat /proc/sys/kernel/ftrace_enabled
1

```

Also when I type `mount`, this is one of the lines that appears:

``` 
debugfs on /sys/kernel/debug type debugfs (rw,relatime)

```

I rebooted my kernel `4.4.0-47` to `4.4.0-45` then to `4.8.5` and finally to `3.13.0-92`. **ALL** these versions have `/sys/kernel/debug` mounted.

To answer your question (paraphrased) "how did this happen?" -> it happens to everyone.

## Question 2: How do I get rid of it?

To answer your question "how do I get rid of it?", use:

``` 
sudo umount debugfs

```

Note this only works for current session.

## Summary Thoughts

Even though trace is **enabled** on all Ubuntu kernel versions I've tested, it is **not activated** until you tell it to start monitoring a specific event. After an event is activated then it will slow down your CPU.

Basically I would not worry about this...

  [1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_MRG/1.3/html/Realtime_Tuning_Guide/sect-Realtime_Tuning_Guide-Realtime_Specific_Tuning-Using_the_ftrace_Utility_for_Tracing_Latencies.html
