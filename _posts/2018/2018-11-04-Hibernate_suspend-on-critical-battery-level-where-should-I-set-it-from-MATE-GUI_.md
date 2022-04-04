---
layout:       post
title:        >
    Hibernate/suspend on critical battery level - where should I set it from MATE GUI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089951
type:         Answer
tags:         16.04 suspend battery hibernate mate
created_date: 2018-11-04 14:05:06
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "2,461 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-04-Hibernate_suspend-on-critical-battery-level-where-should-I-set-it-from-MATE-GUI_.md
toc:          false
navigation:   false
clipboard:    false
---

# GUI method

From: [Change Critical Battery Level and Action in Linux Mint 18 Cinnamon][1]
you can install `dconf-editor` using:

``` 
$ sudo apt-get install dconf-editor
```

Then go to **org -> cinnamon -> settings-daemon -> plugins -> power**

[![mate gsettings power.png][2]][2]

- Default settings are (in %):
- Critical battery action: hibernate
- Critical: 2
- Action: 2
- Low: 10

Exercise caution and tweak to your heart’s content 🙂

----------


## Original Answer and edits below

### Review your current settings with:

``` 
$ gsettings list-recursively | grep critical
org.gnome.settings-daemon.plugins.power critical-battery-action 'shutdown'
org.gnome.settings-daemon.plugins.power percentage-critical 3
org.gnome.settings-daemon.plugins.power time-critical 300
```

### Change your `critical-battery-action`

``` 
$ gsettings set org.gnome.settings-daemon.plugins.power critical-battery-action 'suspend'
```


----------


## Linux Mate differences

When using Linux Mate you need to substitute `org.gnome` with `org.mate` and possibly change your keys. From [ArchWiki][3]: 

### Battery discharge

To disable the notification on battery discharge, run:

``` 
$ gsettings set org.mate.power-manager.notify-discharging false
```

However in Ubuntu there is no equivalent.

## Find all Mate power settings

To find all Mate power settings use:

``` 
$ gsettings list-recursively | grep power-manager
```

In Ubuntu you would use:

``` 
$ gsettings list-recursively | grep plugins.power
```


  [1]: http://www.putdispenserhere.com/change-critical-battery-level-action-linux-mint-18-cinnamon/
  [2]: https://i.stack.imgur.com/3hykc.png
  [3]: https://wiki.archlinux.org/index.php/MATE
