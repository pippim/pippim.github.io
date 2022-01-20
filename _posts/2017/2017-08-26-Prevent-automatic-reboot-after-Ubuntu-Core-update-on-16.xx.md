---
layout:       post
title:        >
    Prevent automatic reboot after Ubuntu Core update on 16.xx
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/949895
type:         Answer
tags:         updates ubuntu-core
created_date: 2017-08-26 02:34:42
edit_date:    
votes:        "2 "
favorites:    
views:        "1,629 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-26-Prevent-automatic-reboot-after-Ubuntu-Core-update-on-16.xx.md
toc:          false
navigation:   false
clipboard:    false
---

I was trying to track down the **Snappy Ubuntu Core** source code and the closest I could find was [this][1] which has an accepted answer that I find unacceptable. With the source code many developers seeking to [turn off auto-updates][2] might be able to accomplish a goal akin to your own.

The second best solution for them, and perhaps yourself, is to find the name of the binary that performs auto-updating. Let's say for example it is called `a`. Rename it to `b`. Replace `a` with a simple program that displays "Hello World". During system boot call `b` in startup scripts.

Basically whenever you want to update your OS (or "Store" as they like to call it) at your convenience simply reboot your machine. After the update it will reboot again. On the second reboot when `b` is called the first reboot already updated the applications (called "snaps") so the second reboot would perform without an update.

Whenever Ubuntu tries to run auto-updates behind your back, it will simply be running a new program that writes "Hello World" to `/var/log/syslog`.

I'm not using Raspberry Pi 2 so I can't find the name of the auto-update program that needs to be renamed to "b". Hopefully someone else does use it and can provide the name.

  [1]: https://askubuntu.com/questions/744273/ubuntu-core-snappy-for-rpi2-source-code
  [2]: https://forum.snapcraft.io/t/disabling-automatic-refresh-for-snap-from-store/707/42
