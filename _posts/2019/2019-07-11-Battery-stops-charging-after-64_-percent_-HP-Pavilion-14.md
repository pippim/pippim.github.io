---
layout:       post
title:        >
    Battery stops charging after 64% percent, HP Pavilion 14
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157680
type:         Answer
tags:         battery
created_date: 2019-07-11 23:46:35
edit_date:    2019-07-16 03:04:57
votes:        "0 "
favorites:    
views:        "2,795 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-11-Battery-stops-charging-after-64_-percent_-HP-Pavilion-14.md
toc:          false
navigation:   false
clipboard:    false
---

## Sometimes you just have to replug it

Here's my 1 week battery history:

[![Power laptop battery.png][1]][1]

When I first encountered the question above (not the day it was posted) I checked my own battery and was surprised it was only charged to 80% or so.

I unplugged it and let it drain to 33%.

I plugged it back in and suspended it overnight. The next day when I checked it was only 34%

I also noticed the power daemon was going nuts and consuming 20% to 25% of  CPUs:

[![Power 20% of CPUs][2]][2]

I rebooted and unplugged the charger and let battery drain to 6%. I plugged the charger back in (without suspending this time) and it fully recharged to 100%.

Since then it's been perfectly normal again.

----------

## Original Answer

As I mentioned in comments, here is a Windows only answer for my laptop from:

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

As I mentioned I have to go to Windows to change the battery charge limiter. I don't know how to do this in Linux. It would be a nifty little C program to write in the Linux Kernel some day.


  [1]: https://i.stack.imgur.com/5tnW3.png
  [2]: https://i.stack.imgur.com/lGwek.png
