---
layout:       post
title:        >
    No such key “idle-delay” in org.gnome.desktop.screensaver
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1004713
type:         Answer
tags:         gnome-screensaver
created_date: 2018-02-10 00:02:46
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "644 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-10-No-such-key-“idle-delay”-in-org.gnome.desktop.screensaver.md
toc:          false
navigation:   false
clipboard:    false
---

# Use `idle-dim` instead of `idle-delay`

You can accomplish your goal through a different setting:

``` 
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false
```
