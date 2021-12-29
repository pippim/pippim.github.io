---
layout:       post
title:        Lock screen without blank in 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037753
type:         Answer
tags:         18.04 lock-screen
created_date: 2018-05-18 12:54:24
edit_date:    2018-05-19 18:41:24
votes:        2
favorites:    
views:        20,219
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

Check the current setting using:

``` 
gsettings get org.gnome.desktop.screensaver idle-activation-enabled

```

If the result is `true` turn it off using:

``` 
gsettings set org.gnome.desktop.screensaver idle-activation-enabled false

```

Second option to try is:

``` 
gsettings set org.gnome.settings-daemon.plugins.power idle-dim false

```

### Gnome bug

There is a four year old Gnome bug addressing the issue of screen blanking immediately after lock [here](https://bugzilla.gnome.org/show_bug.cgi?id=773645).
