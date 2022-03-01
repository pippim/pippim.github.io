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
views:        "466 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
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


  [1]: https://i.stack.imgur.com/Q3Jca.png
