---
layout:       post
title:        Disable password request from suspend - 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029805
type:         Answer
tags:         suspend password lock-screen 18.04
created_date: 2018-04-29 18:04:15
edit_date:    2018-07-01 08:14:59
votes:        63
favorites:    
views:        47,914
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

For most Ubuntu distributions and versions try this in the terminal:

``` 
gsettings get org.gnome.desktop.screensaver ubuntu-lock-on-suspend
true

```

If the result is `true` then set it to `false` using:

``` 
gsettings set org.gnome.desktop.screensaver ubuntu-lock-on-suspend false

```

Just remember to reset it before your cleaning person comes over for monthly work.
