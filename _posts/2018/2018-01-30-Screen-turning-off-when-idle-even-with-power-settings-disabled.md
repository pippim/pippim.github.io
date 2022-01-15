---
layout:       post
title:        >
    Screen turning off when idle even with power settings disabled
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1001331
type:         Answer
tags:         gnome display 17.10
created_date: 2018-01-30 12:07:54
edit_date:    2018-01-31 00:46:37
votes:        "3 "
favorites:    
views:        "6,328 "
accepted:     Accepted
uploaded:     2022-01-14 19:32:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-30-Screen-turning-off-when-idle-even-with-power-settings-disabled.md
toc:          false
navigation:   false
clipboard:    false
---

This is from another [answer][1] I posted recently. You may not need the Login screen section.

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
