---
layout:       post
title:        >
    Can't get bootable usb to show up in bios
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064760
type:         Answer
tags:         boot 18.04 live-usb
created_date: 2018-08-12 20:13:20
edit_date:    
votes:        "3 "
favorites:    
views:        "5,827 "
accepted:     Accepted
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Can_t-get-bootable-usb-to-show-up-in-bios.md
toc:          false
navigation:   false
clipboard:    false
---

According to: [New XPS 13 (9370) USB Port question][1]

Your laptop will only boot a live USB plugged into the right hand port.

> The ports on the left support Thunderbolt 3; the port on the right  
> does not.  As a result, the left-hand ports may be disabled at boot  
> time unless you enable Thunderbolt boot support in the BIOS.  I would  
> have thought that option would only affect devices that actually try  
> to communicate over the Thunderbolt protocol, but recent threads have  
> indicated that this option also affects whether regular USB-type  
> devices connected to those ports are visible at boot time.  

  [1]: https://www.dell.com/community/XPS/New-XPS-13-9370-USB-Port-question/td-p/6048300
