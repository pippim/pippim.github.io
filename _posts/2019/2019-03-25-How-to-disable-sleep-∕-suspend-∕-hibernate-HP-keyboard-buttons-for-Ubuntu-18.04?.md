---
layout:       post
title:        >
    How to disable sleep ∕ suspend ∕ hibernate HP keyboard buttons for Ubuntu 18.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1128676
type:         Answer
tags:         18.04 shortcut-keys power-management
created_date: 2019-03-25 22:36:32
edit_date:    2019-03-26 10:24:41
votes:        "7 "
favorites:    
views:        "5,592 "
accepted:     
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    true
---

In addition to the Gnome Power settings you can set the `systemd` settings found in `/etc/systemd/logind.conf`:

My laptop looks like this:

``` 
$ cat /etc/systemd/logind.conf

```

{% include copyHeader.html %}
``` 
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.
#
# Entries in this file show the compile time defaults.
# You can change settings by editing this file.
# Defaults can be restored by simply deleting this file.
#
# See logind.conf(5) for details.

[Login]
#NAutoVTs=6
#ReserveVT=6
#KillUserProcesses=no
#KillOnlyUsers=
#KillExcludeUsers=root
#InhibitDelayMaxSec=5
#HandlePowerKey=poweroff
#HandleSuspendKey=suspend
#HandleHibernateKey=hibernate
HandleLidSwitch=ignore
#HandleLidSwitchDocked=ignore
#PowerKeyIgnoreInhibited=no
#SuspendKeyIgnoreInhibited=no
#HibernateKeyIgnoreInhibited=no
#LidSwitchIgnoreInhibited=yes
#HoldoffTimeoutSec=30s
#IdleAction=ignore
#IdleActionSec=30min
#RuntimeDirectorySize=10%
#RemoveIPC=yes
#UserTasksMax=12288

```

Notice on my system the only option I've changed is `HandleLidswitch`. For your system I would override these defaults:

``` 
#HandleSuspendKey=suspend
#HandleHibernateKey=hibernate

```

to this:

``` 
HandleSuspendKey=ignore
HandleHibernateKey=ignore

```

`systemd` is a little unique in that a line beginning with a hashtag (`#`) is not only a comment but also represents the default action taken.

Unfortunately I don't have your keyboard to test this configuration.

**NOTE:** After saving changes either reboot to activate or use:

``` 
sudo systemctl restart systemd-logind.service

```
