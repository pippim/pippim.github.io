---
layout:       post
title:        >
    Can't boot laptop after installing tlp
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160082
type:         Answer
tags:         boot tlp grub
created_date: 2019-07-22 07:27:19
edit_date:    
votes:        "1 "
favorites:    
views:        "333 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-22-Can_t-boot-laptop-after-installing-tlp.md
toc:          false
navigation:   false
clipboard:    false
---

From the grub menu select **Advanced Options for Ubuntu** submenu. From there select **Recovery** option.

After logging in (graphics resolution might be reduced) open a terminal and use

``` 
sudo apt remove tlp --purge
```

Then reboot and select normal grub start option for Ubuntu.

Next step (different question) is to find out what makes `tlp` incompatible with your system.
