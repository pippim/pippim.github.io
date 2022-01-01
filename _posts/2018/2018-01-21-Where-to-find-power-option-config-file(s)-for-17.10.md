---
layout:       post
title:        >
    Where to find power option config file(s) for 17.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/998465
type:         Answer
tags:         17.10 power-management monitor settings configure
created_date: !!str "2018-01-21 23:07:08"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "239"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
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
