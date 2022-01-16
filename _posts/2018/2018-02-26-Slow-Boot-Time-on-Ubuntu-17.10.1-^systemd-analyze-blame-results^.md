---
layout:       post
title:        >
    Slow Boot Time on Ubuntu 17.10.1 (systemd-analyze blame results)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010024
type:         Answer
tags:         boot shutdown performance
created_date: 2018-02-26 16:52:44
edit_date:    
votes:        "5 "
favorites:    
views:        "3,379 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-26-Slow-Boot-Time-on-Ubuntu-17.10.1-^systemd-analyze-blame-results^.md
toc:          false
navigation:   false
clipboard:    false
---

Using one answer within [Ubuntu 15.04 network manager causing slow boot][1] worked for me:

``` 
systemctl disable NetworkManager-wait-online.service
```

A bug report for 17.10 has already been filed and you may wish to subscribe to it:

- [NetworkManager-wait-online.service slows down boot][2]


  [1]: https://askubuntu.com/questions/615006/ubuntu-15-04-network-manager-causing-slow-boot
  [2]: https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/1723809
