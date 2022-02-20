---
layout:       post
title:        >
    LAN issue while using tlp
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1087265
type:         Answer
tags:         lan tlp
created_date: 2018-10-25 22:55:05
edit_date:    
votes:        "3 "
favorites:    
views:        "617 "
accepted:     Accepted
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-25-LAN-issue-while-using-tlp.md
toc:          false
navigation:   false
clipboard:    false
---

TLP will power off devices during suspend to save battery life. This answer: [Need to reconnect ethernet cable to get it work after docking laptop into dock station]({% post_url /2017/2017-10-05-Need-to-reconnect-ethernet-cable-to-get-it-work-after-docking-laptop-into-dock-station %}). will reload the R8169 drivers for you realtek network card and might be a sufficient approach.

Another approach is to leave power to the network card during suspend. To do this use `sudo -H gedit /etc/default/tlp` and insert these lines:

``` 
USB_BLACKLIST="10ec:8168"
USB_BLACKLIST="103c:832b"
```

Save the file and reboot.
