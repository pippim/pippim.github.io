---
layout:       post
title:        >
    Disable password request from suspend - 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029805
type:         Answer
tags:         suspend password lock-screen 18.04
created_date: 2018-04-29 18:04:15
edit_date:    2022-02-13 23:55:05
votes:        "64 "
favorites:    
views:        "49,228 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Disable-password-request-from-suspend-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

Type the following in the terminal after the `$` prompt:

``` 
gsettings get org.gnome.desktop.screensaver ubuntu-lock-on-suspend
```

If the result displayed is `true` then set it to `false` using:

``` 
gsettings set org.gnome.desktop.screensaver ubuntu-lock-on-suspend false
```

**NOTE:** The above question and this answer is for **Ubuntu 18.04**.
