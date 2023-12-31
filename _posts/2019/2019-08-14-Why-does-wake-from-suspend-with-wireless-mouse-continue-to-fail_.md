---
layout:       post
title:        >
    Why does wake from suspend with wireless mouse continue to fail?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165821
type:         Answer
tags:         18.04 suspend power-management xps
created_date: 2019-08-14 22:30:20
edit_date:    2019-08-16 01:31:29
votes:        "0 "
favorites:    
views:        "2,001 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-14-Why-does-wake-from-suspend-with-wireless-mouse-continue-to-fail_.md
toc:          false
navigation:   false
clipboard:    false
---

## Mouse receiver needs power

Your Unifying Receiver needs to be plugged into a USB port that has power when the machine is suspended. You can move your mouse but if the Unifying Receiver has no power nothing will happen.

From: [USB PowerShare not working on XPS13 9380](https://www.dell.com/community/XPS/USB-PowerShare-not-working-on-XPS13-9380/td-p/7298666)

> 1. Make sure you actually enabled USB PowerShare in the BIOS Setup interface.  On some systems it's disabled by default.  
>   
> 2. Make sure you're using a port that actually supports PowerShare.  Not all Dell systems have PowerShare implemented on all of their USB  
> ports.  Look for a port with a battery icon or possibly a lightning  
> bolt icon, although the latter might cause some confusion because the  
> 9380 also supports Thunderbolt 3, which uses a very similar  
> lightning-style icon.  
>   
> 3. On some Dell systems, PowerShare only works when the system is either shut down **and on AC power**, or sleeping (on either battery  
> or AC power).  Not all systems enable PowerShare while the system is  
> fully shut down and not plugged in.  
