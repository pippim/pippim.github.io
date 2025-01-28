---
layout:       post
title:        >
    Prevent sleep/suspend when not logged in to a specific account
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132068
type:         Answer
tags:         18.04 suspend power-management hibernate
created_date: 2019-04-08 08:19:26
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "14,102 "
accepted:     
uploaded:     2025-01-28 05:54:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-08-Prevent-sleep_suspend-when-not-logged-in-to-a-specific-account.md
toc:          false
navigation:   false
clipboard:    false
---

# When no user is signed on

When no user is signed on the power settings come from psuedo-user ID `gdm`. The following controls for **GDM auto-suspend** come from: [ArchLinux GDM][1]

## GDM auto-suspend (GNOME 3.28)

GDM uses a separate dconf database to control power management. You can make GDM behave the same way as user sessions by copying the user settings to GDM's dconf database.

``` 
$ IFS=$'\n'; for x in $(sudo -u username gsettings list-recursively org.gnome.settings-daemon.plugins.power); do eval "sudo -u gdm dbus-launch gsettings set $x"; done; unset IFS
```

where `username` is your user's name.

Or to simply disable auto-suspend (also run the command with ac replaced with battery to also disable it while running on battery):

``` 
$ sudo -u gdm dbus-launch gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing'
```

  [1]: https://wiki.archlinux.org/index.php/GDM#Setup_default_monitor_settings
