---
layout:       post
title:        >
    Failed to start network manager wait online
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186405
type:         Answer
tags:         boot
created_date: !!str "2019-11-05 11:43:30"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "3,967"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
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
