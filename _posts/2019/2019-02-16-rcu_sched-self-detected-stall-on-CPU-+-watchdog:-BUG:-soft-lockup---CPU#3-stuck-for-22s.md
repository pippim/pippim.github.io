---
layout:       post
title:        >
    rcu_sched self-detected stall on CPU + watchdog: BUG: soft lockup - CPU#3 stuck for 22s
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1118794
type:         Answer
tags:         kernel lockup watchdog scheduler
created_date: 2019-02-16 17:25:13
edit_date:    
votes:        "4 "
favorites:    
views:        "7,512 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

From: [What are all these "Bug: soft lockup" messages about?][1]

> ##Situation  
>   
> In the system log (/var/log/messages or journalctl) a lot of the  
> following messages is printed.  
>   
>     May 25 07:23:59 XXXXXXX kernel: [13445315.881356] BUG: soft lockup - CPU#16 stuck for 23s! [yyyyyyy:81602]  
>   
> followed by various stack traces. This document tries to explain what  
> the soft lockup messages mean.  

The error message itself doesn't tell you what is causing the problem.

> ## Cause  
>   
> A 'soft lockup' is defined as a bug that causes the kernel to loop in  
> kernel mode for more than 20 seconds, without giving other tasks a  
> chance to run. The watchdog daemon will send an non maskable interrupt  
> (NMI) to all CPUs in the system who in turn print the stack traces of  
> their currently running tasks.  

Reducing server load is normal solution:

> ##Resolution  
>   
> Under normal circumstances those messages may go away if the load  
> decreased. This 'soft lockup' can happen if the kernel is busy,  
> working on a huge amount of objects which need to be scanned, freed or  
> allocated respectively. The stack traces of those tasks can give a  
> first idea what the tasks were doing. However, to be able to examine  
> the cause behind the messages, a kernel dump would be needed.  
>   
> You cannot disable those messages, however in some situations  
> increasing the time when those soft lockups will be fired can relax  
> the situation.  
>   
> Do do so just increase the following `sysctl` parameter:  
> `kernel.watchdog_thresh` Default value for this parameter is `10` and  
> to double the value might be a good start.  






  [1]: https://www.suse.com/support/kb/doc/?id=7017652
