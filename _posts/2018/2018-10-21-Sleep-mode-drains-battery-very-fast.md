---
layout:       post
title:        >
    Sleep mode drains battery very fast
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1085901
type:         Answer
tags:         18.04 suspend battery
created_date: 2018-10-21 17:30:14
edit_date:    2018-10-21 20:25:21
votes:        "8 "
favorites:    
views:        "13,536 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-21-Sleep-mode-drains-battery-very-fast.md
toc:          false
navigation:   false
clipboard:    false
---

After resuming from suspend, use this command in the terminal:

``` 
journalctl -b | grep -i "should not be sleeping"
```

If you see this:

``` 
Oct 21 07:20:18 alien kernel:  cache: parent cpu1 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu2 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu3 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu4 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu5 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu6 should not be sleeping
Oct 21 07:20:18 alien kernel:  cache: parent cpu7 should not be sleeping
```

It could mean when you suspended the CPU's were not put to sleep as per his bounty Q&A a couple of years ago: [systemd suspends system but upon resume kernel then enters sleep and wake-up](systemd suspends system but upon resume kernel then enters sleep and wake-up)

If so, I'm sad to report the problem persists to this day on my newest laptop just as it did on that older laptop.


----------

## Problem since 2012?

This old email chain: [Re: Kernel stops at "PM: Preparing system for mem sleep", never makes it to "Freezing user space processes ... "][1] has a similar problem.

From my log file today:

``` 
Oct 21 13:48:15 alien kernel: PM: Preparing system for sleep (mem)
Oct 21 13:48:16 alien acpid[964]: client 1171[0:0] has disconnected
Oct 21 13:48:32 alien kernel: Freezing user space processes ... (elapsed 0.003 seconds) done.
```

- Line 1 is normal
- Line 2 is abnormal and linked to old X11 crash bugs
- Line 3 is occurs after resuming but should have happened as part of suspend.

Some other interesting points is it often takes 5 to 8 seconds to suspend when it should be about 1 second. This bug is reported in many places too.

----------

If you don't have the same problem in the previous sections and, your laptop stays warm when suspended, then your fix maybe here: [Ubuntu 18.04 - Dell XPS13 9370 no longer suspends on lid close](Ubuntu 18.04 - Dell XPS13 9370 no longer suspends on lid close)


  [1]: https://www.spinics.net/lists/linux-acpi/msg37409.html
