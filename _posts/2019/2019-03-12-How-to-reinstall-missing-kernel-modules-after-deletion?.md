---
layout:       post
title:        >
    How to reinstall missing kernel modules after deletion?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1124908
type:         Answer
tags:         kernel linux-headers
created_date: !!str "2019-03-12 01:48:09"
edit_date:    !!str "2019-03-12 02:04:57"
votes:        !!str "5"
favorites:    
views:        !!str "13,232"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

From: [How to install Linux Kernel headers on Debian or Ubuntu][1]

``` 
sudo apt-get install --reinstall linux-headers-$(uname -r)

```

Then:

``` 
sudo apt-get update && sudo apt-get upgrade

```

  [1]: https://www.garron.me/en/go2linux/how-install-linux-kernel-headers-debian-or-ubuntu.html
