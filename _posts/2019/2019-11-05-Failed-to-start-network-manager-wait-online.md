---
layout:       post
title:        >
    Failed to start network manager wait online
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186405
type:         Answer
tags:         boot
created_date: 2019-11-05 11:43:30
edit_date:    
votes:        "0 "
favorites:    
views:        "4,178 "
accepted:     Accepted
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-05-Failed-to-start-network-manager-wait-online.md
toc:          false
navigation:   false
clipboard:    false
---

Boot into recovery mode, open a terminal and use:

``` 
sudo systemctl disable NetworkManager-wait-online.service
```

This will allow you to reboot in normal mode.

More [details about this service][1].


  [1]: https://askubuntu.com/questions/1018576/what-does-networkmanager-wait-online-service-do
