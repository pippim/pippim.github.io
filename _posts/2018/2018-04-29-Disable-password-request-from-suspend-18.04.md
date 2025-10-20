---
layout:       post
title:        >
    Disable password request from suspend - 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029805
type:         Answer
tags:         suspend password lock-screen 18.04
created_date: 2018-04-29 18:04:15
edit_date:    2025-04-02 21:41:33
votes:        "77 "
favorites:    
views:        "64,684 "
accepted:     Accepted
uploaded:     2025-10-19 18:25:39
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
``` 
      Works on Ubuntu 24 LTS as well. Tested on April the 2nd 2025.
```
