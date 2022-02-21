---
layout:       post
title:        >
    Prevent a Workstation Screen from dimming
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000745
type:         Answer
tags:         suspend screen
created_date: 2018-01-28 19:43:05
edit_date:    2018-01-28 23:35:25
votes:        "2 "
favorites:    
views:        "497 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-28-Prevent-a-Workstation-Screen-from-dimming.md
toc:          false
navigation:   false
clipboard:    false
---

# Terminal CLI method

OP requests a CLI (Command Line Interface) methodology.

## For battery timeout:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout <time_in_seconds>
```

## For AC timeout:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout <time_in_seconds>
```

So for both Battery and A/C set the time to 0 (never).

## For Login screen:

``` 
gsettings set org.gnome.desktop.screensaver idle-activation-enabled false
```
