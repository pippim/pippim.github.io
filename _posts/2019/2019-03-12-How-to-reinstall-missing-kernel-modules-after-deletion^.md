---
layout:       post
title:        >
    How to reinstall missing kernel modules after deletion?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1124908
type:         Answer
tags:         kernel linux-headers
created_date: 2019-03-12 01:48:09
edit_date:    2019-03-12 02:04:57
votes:        "5 "
favorites:    
views:        "13,684 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-03-12-How-to-reinstall-missing-kernel-modules-after-deletion^.md
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
