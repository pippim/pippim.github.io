---
layout:       post
title:        >
    Is there a way to show external IP in top bar using GNOME 3.28.2 in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1198072
type:         Answer
tags:         gnome ip top-bar
created_date: 2019-12-23 11:58:34
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "948 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-23-Is-there-a-way-to-show-external-IP-in-top-bar-using-GNOME-3.28.2-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I've been using [Indicator System Monitor][1] for years on Ubuntu 16.04:

[![indicator system monitor.gif][2]][2]

I haven't used it with Gnome but the link above states:

> ## Indicator-SysMonitor - v0.8.2  
>   
> An Application Indicator showing cpu temperature, memory, network  
> speed, cpu usage, public IP address and internet connection status .  
>   
> Works with Unity, Xubuntu, Gnome-Shell + app-indicator extension  
> together with any other desktop environments that support  
> AppIndicators.  
>   
> Also works with the Budgie-Desktop  
>   
> Offers the possibility to run your own command and display its output.  

Even though it already offers an option to display Public IP you can still write your own bash script which refreshes every x seconds with custom display information, in my case above a spinning pizza with time remaining in washing machine wash cycle (so you are told when to add fabric softener for rinse cycle).

Indicator System Monitor is maintained by FossFreedom who is a regular visitor to Ask Ubuntu website.

  [1]: https://github.com/fossfreedom/indicator-sysmonitor
  [2]: https://i.stack.imgur.com/IlSmL.gif
