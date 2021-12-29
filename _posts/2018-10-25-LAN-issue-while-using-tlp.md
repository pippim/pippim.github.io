---
layout:       post
title:        LAN issue while using tlp
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1087265
type:         Answer
tags:         lan tlp
created_date: 2018-10-25 22:55:05
edit_date:    
votes:        3
favorites:    
views:        593
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

TLP will power off devices during suspend to save battery life. This answer: https://askubuntu.com/questions/950871/need-to-reconnect-ethernet-cable-to-get-it-work-after-docking-laptop-into-dock-s/962090#962090. will reload the R8169 drivers for you realtek network card and might be a sufficient approach.

Another approach is to leave power to the network card during suspend. To do this use `sudo -H gedit /etc/default/tlp` and insert these lines:

``` 
USB_BLACKLIST="10ec:8168"
USB_BLACKLIST="103c:832b"

```

Save the file and reboot.
