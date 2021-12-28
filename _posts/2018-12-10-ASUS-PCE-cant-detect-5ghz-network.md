---
layout:       post
title:        ASUS PCE cant detect 5ghz network
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099864
type:         Answer
tags:         networking drivers network-manager broadcom asus
created_date: 2018-12-10 19:05:15
edit_date:    
votes:        5
favorites:    
views:        5,317
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

Sounds the same as this problem: https://askubuntu.com/questions/749420/wireless-lost-ability-to-use-5ghz-pce-ac68

The answer there says:

> I had the same problem as you, and I just found the problem. The 5Ghz  
> network was set to choose automatically the channel, one day it  
> changed to a channel with an high number and my card wasn't able to  
> find the network anymore.  
>   
> So just check in your router if the network has an high number channel  
> and change it back to a lower one (now I'm with channel 40 and it's  
> working fine) and check if you can now find again the network.  
>   
> I've also open a bug report in the `bcmwl` package page, if this is the  
> problem click on the "This bug affect you" button in [this page][1]  
>   
> I hope I have helped you.  

  [1]: https://bugs.launchpad.net/ubuntu/+source/bcmwl/+bug/1574196
