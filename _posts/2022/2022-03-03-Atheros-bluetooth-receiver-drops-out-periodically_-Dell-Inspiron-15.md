---
layout:       post
title:        >
    Atheros bluetooth receiver drops out periodically, Dell Inspiron 15
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1395694
type:         Answer
tags:         bluetooth dell atheros
created_date: 2022-03-03 01:29:17
edit_date:    
votes:        "1 "
favorites:    
views:        "221 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-03-03-Atheros-bluetooth-receiver-drops-out-periodically_-Dell-Inspiron-15.md
toc:          false
navigation:   false
clipboard:    false
---

Someone else with a computer from 2013 had the same problem with Ubuntu 20.10 derivative called Pop OS 20.10:

- [[Solved] Bluetooth down and hciconfig hci0 up timeout](https://bbs.archlinux.org/viewtopic.php?id=171357)

You should definitely read the entire thread on Arch Linux forum but the solution is to use:

``` shell
hciconfig hci0 down
rmmod btusb
modprobe btusb
hciconfig hci0 up
```

The other doesn't state it but you should use `sudo` first.
