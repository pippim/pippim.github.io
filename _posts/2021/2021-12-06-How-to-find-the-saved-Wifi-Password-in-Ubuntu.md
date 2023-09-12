---
layout:       post
title:        >
    How to find the saved Wifi Password in Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1379422
type:         Answer
tags:         wireless password
created_date: 2021-12-06 00:24:28
edit_date:    
votes:        "3 "
favorites:    
views:        "8,811 "
accepted:     
uploaded:     2023-09-12 14:58:05
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-12-06-How-to-find-the-saved-Wifi-Password-in-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

# One-liner
A one-liner you can use:

``` 
sudo grep --with-filename psk= /etc/NetworkManager/system-connections/*
```

For example:

``` bash
$ sudo grep --with-filename psk= /etc/NetworkManager/system-connections/*

/etc/NetworkManager/system-connections/SHAW-999999:psk=99999A999999
/etc/NetworkManager/system-connections/SHAW-999999-5G:psk=99999A999999
/etc/NetworkManager/system-connections/SHAW-999999-5G:psk=999999999999
```

After "`system-connections/`" you will see your WiFi network name. EG "`SHAW-999999`". Then you will see your password after "`:psk=`". EG "`99999A999999`". WiFi network name and password were redacted in case my neighbour is hoping for a free bus ride :)
