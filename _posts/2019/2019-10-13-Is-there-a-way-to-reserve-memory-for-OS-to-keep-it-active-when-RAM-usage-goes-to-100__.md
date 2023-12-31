---
layout:       post
title:        >
    Is there a way to reserve memory for OS to keep it active when RAM usage goes to 100%?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180740
type:         Answer
tags:         ram swap conky
created_date: 2019-10-13 22:20:37
edit_date:    
votes:        "0 "
favorites:    
views:        "2,491 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-13-Is-there-a-way-to-reserve-memory-for-OS-to-keep-it-active-when-RAM-usage-goes-to-100__.md
toc:          false
navigation:   false
clipboard:    false
---

All you really need to do is close a FireFox tab or two before you hit 100% RAM. But how do you know when you approach that point? 

You can have a script running that pops up a notification bubble at 95%:

- [Warning when available RAM approaches zero](Warning when available RAM approaches zero)

What I do is have conky always running showing me my system status:

[![conky 30 second clip.gif][1]][1]


  [1]: https://i.stack.imgur.com/haRKb.gif
