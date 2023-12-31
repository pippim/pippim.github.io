---
layout:       post
title:        >
    How can I change the power related settings (suspend, hibernate...) with the command line only?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1056714
type:         Answer
tags:         multiple-monitors suspend power-management laptop i3-wm
created_date: 2018-07-16 22:36:44
edit_date:    2018-07-17 23:41:57
votes:        "1 "
favorites:    
views:        "1,191 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-16-How-can-I-change-the-power-related-settings-_suspend_-hibernate..._-with-the-command-line-only_.md
toc:          false
navigation:   false
clipboard:    false
---

I'm not using the I3 Windowing Manager but these settings should work for you just as they do with Unity and Gnome Desktop. First discover the current settings:

``` 
$ gsettings get org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout
0

$ gsettings get org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type
'suspend'
```

If your first setting is not `0` set it to zero so inactivity is not measured:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
```

If your second setting reads 'suspend' set it to 'nothing':

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
```


----------

To list all settings use:

``` 
$ gsettings list-recursively | grep -E 'sleep|suspend*'
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
org.gnome.settings-daemon.plugins.power power-button-action 'suspend'
org.gnome.settings-daemon.plugins.power critical-battery-action 'suspend'
org.gnome.settings-daemon.plugins.power lid-close-suspend-with-external-monitor true
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
org.gnome.settings-daemon.plugins.power button-suspend 'suspend'
org.gnome.settings-daemon.plugins.power button-sleep 'suspend'
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 0
org.gnome.settings-daemon.plugins.power lid-close-ac-action 'suspend'
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type 'suspend'
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'suspend'
org.gnome.desktop.screensaver ubuntu-lock-on-suspend true
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
org.gnome.settings-daemon.plugins.power power-button-action 'suspend'
org.gnome.settings-daemon.plugins.power critical-battery-action 'suspend'
org.gnome.settings-daemon.plugins.power lid-close-suspend-with-external-monitor true
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
org.gnome.settings-daemon.plugins.power button-suspend 'suspend'
org.gnome.settings-daemon.plugins.power button-sleep 'suspend'
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 0
org.gnome.settings-daemon.plugins.power lid-close-ac-action 'suspend'
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type 'suspend'
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'suspend'
```

