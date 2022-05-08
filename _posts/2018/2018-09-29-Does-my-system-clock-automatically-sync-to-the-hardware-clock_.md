---
layout:       post
title:        >
    Does my system clock automatically sync to the hardware clock?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1079387
type:         Answer
tags:         time clock
created_date: 2018-09-29 02:02:21
edit_date:    
votes:        "3 "
favorites:    
views:        "2,530 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-29-Does-my-system-clock-automatically-sync-to-the-hardware-clock_.md
toc:          false
navigation:   false
clipboard:    false
---

I think [this page][1] provides the best answer:

> # 2. How Linux Keeps Track of Time  
>   
> ## 2.1 Basic Strategies  
>   
> A Linux system actually has two clocks: One is the battery powered  
> "Real Time Clock" (also known as the "RTC", "CMOS clock", or "Hardware  
> clock") which keeps track of time when the system is turned off but is  
> not used when the system is running. The other is the "system clock"  
> (sometimes called the "kernel clock" or "software clock") which is a  
> software counter based on the timer interrupt. It does not exist when  
> the system is not running, so it has to be initialized from the RTC  
> (or some other time source) at boot time. References to "the clock" in  
> the ntpd documentation refer to the system clock, not the RTC.  
>   
> The two clocks will drift at different rates, so they will gradually  
> drift apart from each other, and also away from the "real" time. The  
> simplest way to keep them on time is to measure their drift rates and  
> apply correction factors in software. Since the RTC is only used when  
> the system is not running, the correction factor is applied when the  
> clock is read at boot time, using clock(8) or hwclock(8). The system  
> clock is corrected by adjusting the rate at which the system time is  
> advanced with each timer interrupt, using adjtimex(8).  
>   
> A crude alternative to adjtimex(8) is to have chron run clock(8) or  
> hwclock(8) periodically to sync the system time to the (corrected)  
> RTC. This was recommended in the clock(8) man page, and it works if  
> you do it often enough that you don't cause large "jumps" in the  
> system time, but adjtimex(8) is a more elegant solution. Some  
> applications may complain if the time jumps backwards.  
>   
> The next step up in accuracy is to use a program like ntpd to read the  
> time periodically from a network time server or radio clock, and  
> continuously adjust the rate of the system clock so that the times  
> always match, without causing sudden "jumps" in the system time. If  
> you always have a network connection at boot time, you can ignore the  
> RTC completely and use ntpdate (which comes with the ntpd package) to  
> initialize the system clock from a time server-- either a local server  
> on a LAN, or a remote server on the internet. But if you sometimes  
> don't have a network connection, or if you need the time to be  
> accurate during the boot sequence before the network is active, then  
> you need to maintain the time in the RTC as well.  

  [1]: https://www.tldp.org/HOWTO/Clock-2.html
