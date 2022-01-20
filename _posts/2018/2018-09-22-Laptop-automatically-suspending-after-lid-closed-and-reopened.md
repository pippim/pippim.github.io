---
layout:       post
title:        >
    Laptop automatically suspending after lid closed and reopened
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1077388
type:         Answer
tags:         suspend laptop lid
created_date: 2018-09-22 01:52:30
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,211 "
accepted:     Accepted
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-22-Laptop-automatically-suspending-after-lid-closed-and-reopened.md
toc:          false
navigation:   false
clipboard:    false
---

## First thing to try

Use `sudo -H gedit /etc/systemd/logind.conf` and search for this line:

``` 
#HandlLidSwitch=
```

change it to:

``` 
HandleLidSwitch=ignore
```

Then save the file and reboot.
