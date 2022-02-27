---
layout:       post
title:        >
    Where to find power option config file(s) for 17.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/998465
type:         Answer
tags:         17.10 power-management monitor settings configure
created_date: 2018-01-21 23:07:08
edit_date:    
votes:        "2 "
favorites:    
views:        "259 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-21-Where-to-find-power-option-config-file_s_-for-17.10.md
toc:          false
navigation:   false
clipboard:    false
---

According to this super user [answer][1]:

You can set the desired settings in GSettings directly.

Timeout for blanking the screen (seconds; 0 = never):

``` 
gsettings set org.gnome.desktop.session idle-delay 1800
```

Timeout for locking the screen after blanking (seconds; 0 = instant):

``` 
gsettings set org.gnome.desktop.screensaver lock-delay 0
```



  [1]: https://superuser.com/questions/727120/make-gnome-screen-lock-after-1-hour-not-15-minutes
