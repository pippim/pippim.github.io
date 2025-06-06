---
layout:       post
title:        >
    Is it normal for dpkg / kernel update to hit 100%?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854690
type:         Question
tags:         kernel dpkg conky
created_date: 2016-11-28 20:58:24
edit_date:    
votes:        "2 "
favorites:    
views:        "951 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-28-Is-it-normal-for-dpkg-_-kernel-update-to-hit-100__.md
toc:          false
navigation:   false
clipboard:    false
---

I ran `sudo dpkg -i *.deb` today and my heart skipped a beat when Conky showed all 8 CPUs at 100% and temperature spiked to 88 degrees Celsius. It lasted at least a minute giving my slow hands time to copy and paste terminal screen line and take screen snapshot. The current terminal screen line showed:

``` 
run-parts: executing /etc/kernel/header_postinst.d/dkms 4.8.11-040811-generic /boot/vmlinuz-4.8.11-040811-generic
```

Is this normal behavior?

Conky screen below as reference:

[![Kernel Update 100%][1]][1]


  [1]: https://pippim.github.io/assets/img/posts/2016/Q3Jca.png
