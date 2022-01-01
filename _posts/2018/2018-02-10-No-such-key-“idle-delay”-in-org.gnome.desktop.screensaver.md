---
layout:       post
title:        >
    No such key “idle-delay” in org.gnome.desktop.screensaver
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1004713
type:         Answer
tags:         gnome-screensaver
created_date: !!str "2018-02-10 00:02:46"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "1"
favorites:    
views:        !!str "270"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

# Use `idle-dim` instead of `idle-delay`

You can accomplish your goal through a different setting:

``` 
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false

```
