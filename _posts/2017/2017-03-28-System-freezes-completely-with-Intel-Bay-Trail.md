---
layout:       post
title:        >
    System freezes completely with Intel Bay Trail
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/897596
type:         Answer
tags:         16.04 kernel intel
created_date: 2017-03-28 01:18:44
edit_date:    2019-09-29 14:37:17
votes:        "2 "
favorites:    
views:        "46,505 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-28-System-freezes-completely-with-Intel-Bay-Trail.md
toc:          false
navigation:   false
clipboard:    false
---

For people following this bug here is an update. Go to: [Bug 109051 - intel_idle.max_cstate=1 required on baytrail to prevent crashes][1] and press the <kbd>End</kbd> key. If necessary press <kbd>Page Up</kbd> to message #1013.

According to comment# 1013 it is now fixed in recent kernels:

> I haven't checked this thread in a long time, but I thought I should  
> post my findings just in case it is of any use to anyone.  
>   
> A low end computer powered with an Intel N2807 which never worked more  
> than 30 mn without crashing when I didn't set ...max_cstates=1 now  
> works perfectly well with a stock kernel v. 5.3.1 or 4.19.75. I ran it  
> for a couple of days with each version without any issues. The average  
> power consumption was also down by a little over 10%.  

It has taken about four years to fix this bug first reported December 8, 2015.

  [1]: https://bugzilla.kernel.org/show_bug.cgi?id=109051
