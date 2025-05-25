---
layout:       post
title:        >
    How to decrease the boot time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1166517
type:         Answer
tags:         boot network-manager 19.04 thunderbolt fwupd
created_date: 2019-08-18 01:29:10
edit_date:    2019-10-06 14:28:14
votes:        "2 "
favorites:    
views:        "24,257 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-18-How-to-decrease-the-boot-time.md
toc:          false
navigation:   false
clipboard:    false
---

This line with 1.5 seconds is a [bug][1]:

``` 
      1.552s systemd-backlight@backlight:intel_backlight.service
```

On my system without bug it is only 1 millisecond:

``` 
$ systemd-analyze blame | grep backlight

         1ms systemd-backlight@backlight:intel_backlight.service
```

More tips (including NetworkManager-wait-online.service) can be found here:

- [How to speed up boot time on lubuntu](How to speed up boot time on lubuntu)
 


  [1]: https://github.com/systemd/systemd/issues/8479
