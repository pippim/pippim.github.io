---
layout:       post
title:        >
    Wake up monitor from standby and show the screen without blocking further standby [Ubuntu 16.04]
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854687
type:         Answer
tags:         command-line 16.04 suspend monitor wakeup
created_date: 2016-11-28 20:47:02
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "5,259 "
accepted:     
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-28-Wake-up-monitor-from-standby-and-show-the-screen-without-blocking-further-standby-_Ubuntu-16.04_.md
toc:          false
navigation:   false
clipboard:    false
---

The only thing I could find on your situation was this webpage ([Can't wake up monitor once dpms put it into sleep][1]) from Archlinux. It's a long read but at the very bottom one poster recommends your script say this:

``` 
sleep 1 && xset dpms force standby && sleep 8 && xset dpms force on
```

Note this user tip implies it is based on having turned off DRI3 in `/etc/X11/xorg.conf.d/20-intel.conf` and using DRI2:

``` 
Section "Device"
   Identifier  "Intel Graphics"
   Driver      "intel"
   Option "DRI" "2"
EndSection
```

Please note this is the best I could come up with for your problem and felt compelled to post it because there have been no other answers. Since I can't reproduce your problem I have no idea if it will work for you as it has for others.

If it doesn't work I encourage you to google as much as you can using appropriate keywords.

  [1]: https://bbs.archlinux.org/viewtopic.php?id=215930

