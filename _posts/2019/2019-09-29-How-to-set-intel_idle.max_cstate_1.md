---
layout:       post
title:        >
    How to set intel_idle.max_cstate=1
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1177476
type:         Answer
tags:         intel idle grub
created_date: 2019-09-29 14:32:55
edit_date:    
votes:        "4 "
favorites:    
views:        "70,854 "
accepted:     
uploaded:     2023-09-19 23:02:23
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-29-How-to-set-intel_idle.max_cstate_1.md
toc:          false
navigation:   false
clipboard:    false
---

There is no need to update grub anymore if you switch to a most recent kernel.

According to comment# 1013 in [bug report][1] it is now fixed:

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
