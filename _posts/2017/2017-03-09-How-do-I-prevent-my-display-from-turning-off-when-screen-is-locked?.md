---
layout:       post
title:        >
    How do I prevent my display from turning off when screen is locked?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/891090
type:         Answer
tags:         power-management 16.10 lock-screen
created_date: 2017-03-09 01:54:03
edit_date:    2018-02-21 01:02:10
votes:        "2 "
favorites:    
views:        "2,098 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

Quite by accident tonight I discovered a "hack". Enter an invalid password at the lock screen and it will stay there and not fade to black.

I'll be using this technique myself from now on until a better answer comes along. The duplicate candidates don't work for me under Ubuntu 16.04 and like yourself it irritates me the screen turns off.


----------

# Feb 20 2018 Update - Disable Dimming CLI method

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

  [2]: https://unix.stackexchange.com/questions/257329/laptop-screen-dims-after-20-seconds-cannot-change-that/258886
