---
layout:       post
title:        >
    Restore screen brightness automatically at boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1166733
type:         Answer
tags:         nvidia brightness 19.04
created_date: 2019-08-19 05:03:46
edit_date:    2019-08-19 11:27:02
votes:        "0 "
favorites:    
views:        "386 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-19-Restore-screen-brightness-automatically-at-boot.md
toc:          false
navigation:   false
clipboard:    false
---

Your system may be setup to automatically restore the last brightness setting already. You can however edit `/etc/rc.local` and insert this line before `exit 0` at the bottom:

``` 
echo 50 > /sys/class/backlight/nvidia_0/brightness
```

Note you can also use `cron@reboot` if `rc.local-service` isn't setup in `systemd`:

- [How to Enable /etc/rc.local with Systemd][1]


  [1]: https://www.linuxbabe.com/linux-server/how-to-enable-etcrc-local-with-systemd
