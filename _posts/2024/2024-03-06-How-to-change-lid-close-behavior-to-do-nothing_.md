---
layout:       post
title:        >
    How to change lid close behavior to do nothing?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1506656
type:         Answer
tags:         suspend power-management laptop
created_date: 2024-03-06 01:29:55
edit_date:    
votes:        "7 "
favorites:    
views:        "13,274 "
accepted:     
uploaded:     2026-01-11 15:29:19
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-03-06-How-to-change-lid-close-behavior-to-do-nothing_.md
toc:          false
navigation:   false
clipboard:    false
---

Use this command:

``` 
gsettings get org.gnome.settings-daemon.plugins.power lid-close-ac-action
```

If the printed reply is not `nothing` then use this command:

``` 
gsettings set org.gnome.settings-daemon.plugins.power lid-close-ac-action 'nothing'
```

Then repeat the first command and the response should be `nothing`.

There is no need to reboot and the result should be persistent across reboots.
