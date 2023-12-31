---
layout:       post
title:        >
    How do I set battery full alert tone in ubuntu 18.04 to save battery wear out?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157685
type:         Answer
tags:         battery charging
created_date: 2019-07-11 23:58:02
edit_date:    
votes:        "0 "
favorites:    
views:        "3,992 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-11-How-do-I-set-battery-full-alert-tone-in-ubuntu-18.04-to-save-battery-wear-out_.md
toc:          false
navigation:   false
clipboard:    false
---

Another option is to set the battery charge limiter to say 60% to 80% if you aren't planning on taking it on the road. However for my laptop at least I can only change it in Windows as this answer details:

- [Re: Plugged in, charging but won't pass 70%](https://www.dell.com/community/Laptops-General-Read-Only/Plugged-in-charging-but-won-t-pass-70/td-p/4211919)

> The reason why your battery would stay upto 70% and not charge further  
> could be due to an option called "Desktop Mode" which might be  
> enabled. Desktop mode helps in disabling the battery to charge upto  
> 100% to maximize the life of the battery. This option can also be  
> disabled. To disable this option:  
>   
> -    Right-click the battery icon on the Windows notification area, and then click Dell Extended Battery life Options  
> -    The Battery Meter dialog box is displayed, Click the Desktop Mode tab  
> -    Select the option to disable this feature  
> -    Then, click OK  

I dual boot Ubuntu and Windows 10 so it's not a big deal to change the battery charge limiter. I don't know of any apps to do this in Linux. It would be a nifty little C program to write for my inaugural journey into the Linux Kernel coding though.

