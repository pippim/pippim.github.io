---
layout:       post
title:        >
    One core goes to 100% usage and activate fan on Ubuntu 18.10,
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1096362
type:         Answer
tags:         cpu fan 18.10
created_date: 2018-11-27 03:01:38
edit_date:    
votes:        "0 "
favorites:    
views:        "2,855 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-27-One-core-goes-to-100_-usage-and-activate-fan-on-Ubuntu-18.10_.md
toc:          false
navigation:   false
clipboard:    false
---

Try turning off your nVidia card:

``` 
sudo prime-select intel
```

Then reboot.

Also it could simply be a glitch with your machine design: [G752VT Left side fan keeps turning on and off!][1]


  [1]: https://rog.asus.com/forum/showthread.php?82844-G752VT-Left-side-fan-keeps-turning-on-and-off!
