---
layout:       post
title:        >
    Usbmon error - Ubuntu 16.04 with Kernel 4.15 in Dual Boot with Windows 10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1078874
type:         Answer
tags:         16.04 dual-boot usb kernel permissions
created_date: 2018-09-27 11:46:17
edit_date:    
votes:        "1 "
favorites:    
views:        "1,084 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-27-Usbmon-error-Ubuntu-16.04-with-Kernel-4.15-in-Dual-Boot-with-Windows-10.md
toc:          false
navigation:   false
clipboard:    false
---

You need to use `sudo` powers when looking at some directories and files.

For example:

``` 
$ cat /sys/kernel/debug/usb/uvcvideo/1-7/stats
cat: /sys/kernel/debug/usb/uvcvideo/1-7/stats: Permission denied
```

However with `sudo` powers:

``` 
$ sudo cat /sys/kernel/debug/usb/uvcvideo/1-7/stats
frames:  0
packets: 0
empty:   0
errors:  0
invalid: 0
pts: 0 early, 0 initial, 0 ok
scr: 0 count ok, 0 diff ok
sof: 0 <= sof <= 0, freq 0.000 kHz
```

