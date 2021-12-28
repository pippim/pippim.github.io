---
layout:       post
title:        Pin kernel version
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1049234
type:         Answer
tags:         16.04 kernel updates pinning
created_date: 2018-06-24 07:20:34
edit_date:    2018-06-24 15:01:21
votes:        2
favorites:    
views:        2,657
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

To prevent the kernel from getting purged by `sudo apt autoremove`, pin the kernel using:

``` 
sudo apt-mark hold linux-image-4.13.0-26-generic linux-headers-4.13.0-26-generic

```

If you boot with version `-26` and run `autoremove` without pinning the kernel first, it still won't be removed because you booted with it. If you boot with the newest kernel version and run `autoremove` then `-26` will be purged if it's not the most recent or the next most recent version installed.
