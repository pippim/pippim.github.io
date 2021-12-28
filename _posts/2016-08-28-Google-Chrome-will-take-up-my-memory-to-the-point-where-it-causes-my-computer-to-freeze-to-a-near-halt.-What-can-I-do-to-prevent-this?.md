---
layout:       post
title:        Google Chrome will take up my memory to the point where it causes my computer to freeze to a near halt. What can I do to prevent this?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/817995
type:         Answer
tags:         16.04 google-chrome ram memory-usage
created_date: 2016-08-28 23:41:48
edit_date:    2017-10-04 19:46:26
votes:        32
favorites:    
views:        19,627
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

**The short answer:** In Chrome, press <kbd>Shift</kbd>+<kbd>Esc</kbd> to see what tabs are using up too much RAM, and refresh or reload those tabs from time to time to reclaim memory.

**The long answer:** I think this is more of a Chrome problem than a Ubuntu problem.

I recently ran into this problem using Windows 7 with a Chrome tab opened on rt.com with the comments section at the bottom of a story opened. The comments section is driven by spot.im and will consume over a gigabyte of RAM over an hour of doing nothing but sitting there. Windows 7 would issue a low RAM error and then I'd have to reboot. The same problem exists within Ubuntu + Chrome but not nearly as bad as Windows + Chrome.

Then I discovered <kbd>Shift</kbd>+<kbd>Esc</kbd> within Chrome to bring up memory display stats, where I could watch how much RAM each tab was consuming. This works on Windows and Ubuntu.

When available memory (RAM + SWAP) runs low, a program called "OOM Killer" (Out of Memory) starts up and "intelligently" kills running applications and stops new applications from running. OOM Killer was improved in Linux Kernel 4.6, but I can't say exactly how.

I did a test the other night using Chrome to burn up 95% of RAM and 65% of swap using OOM killer under Kernel 4.7.1 and the system remained stable. I couldn't do new things like <kbd>Alt</kbd>+<kbd>Print Screen</kbd> but could still reboot no problem. Chrome did error out on reboot and couldn't restore the 20 odd tabs from the previous session, but that isn't a surprise.
