---
layout:       post
title:        >
    Avoid screen turning off when the screen is locked?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1008228
type:         Answer
tags:         16.04 lock-screen
created_date: 2018-02-21 03:16:40
edit_date:    
votes:        "2 "
favorites:    
views:        "2,895 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-21-Avoid-screen-turning-off-when-the-screen-is-locked^.md
toc:          false
navigation:   false
clipboard:    false
---

# Terminal CLI method

To prevent screen from turning off you need two settings, one under battery power the other when plugged into wall outlet (A/C).

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

## Disable dimming screen when idle:

In [Unix & Linux][2] someone complained when on battery screen dims every 20 seconds and wants to turn that feature off:

``` 
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false

```


  [1]: {% post_url /2018/2018-01-28-Prevent-a-Workstation-Screen-from-dimming %}
  [2]: https://unix.stackexchange.com/questions/257329/laptop-screen-dims-after-20-seconds-cannot-change-that/258886
