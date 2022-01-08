---
layout:       post
title:        >
    Prevent sleep if CPU usage is high
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187140
type:         Answer
tags:         suspend
created_date: 2019-11-08 01:46:13
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "3,191 "
accepted:     
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    true
---

Discover your current sleep settings with this:

``` 
$ gsettings list-recursively | grep sleep
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'suspend'
org.gnome.settings-daemon.plugins.power button-sleep 'suspend'
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 0
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type 'suspend'

```

My system is set to never go to sleep, but if yours is set for 5 minutes (300 seconds) it would look like this:

``` 
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 300

```

When your python program starts issue the command:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0

```

When your python program ends restore the previous settings:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 300

```


----------

Your screen saver settings are related at times:

{% include copyHeader.html %}
``` 
$ gsettings list-recursively | grep top.screensaver
org.gnome.desktop.screensaver picture-opacity 100
org.gnome.desktop.screensaver logout-enabled false
org.gnome.desktop.screensaver lock-enabled false
org.gnome.desktop.screensaver logout-delay uint32 7200
org.gnome.desktop.screensaver embedded-keyboard-enabled false
org.gnome.desktop.screensaver primary-color '#023c88'
org.gnome.desktop.screensaver idle-activation-enabled true
org.gnome.desktop.screensaver secondary-color '#5789ca'
org.gnome.desktop.screensaver logout-command ''
org.gnome.desktop.screensaver color-shading-type 'solid'
org.gnome.desktop.screensaver embedded-keyboard-command ''
org.gnome.desktop.screensaver show-notifications false
org.gnome.desktop.screensaver picture-options 'zoom'
org.gnome.desktop.screensaver lock-delay uint32 0
org.gnome.desktop.screensaver show-full-name-in-top-bar true
org.gnome.desktop.screensaver picture-uri 'file:///usr/share/backgrounds/gnome/adwaita-lock.jpg'
org.gnome.desktop.screensaver status-message-enabled true
org.gnome.desktop.screensaver ubuntu-lock-on-suspend false
org.gnome.desktop.screensaver user-switch-enabled true

```


----------

## Edit script based on system activity

OP has clarified needs. Multiple jobs can be running. The first one that ends would reactivate sleep which will prevent remaining jobs from completing.

A scaled down version of [this script][1] is needed:

[![movie.sh status display 2.png][2]][2]

- Removing dimming / brightening of monitors
- Remove list of selective monitors to process
- Remove checks for keyboard / mouse idle (which gnome uses for sleep activation)
- Drastically reduce statistics summary screen or remove all together

Then the code using `xprintidle` (keyboard and mouse unused time) needs to be yanked out and replaced with:

``` 
$ uptime
 08:08:54 up 9 days,  3:38,  1 user,  load average: 0.30, 0.47, 0.71

```

The load average prints for 1 minute, 5 minutes and 15 minutes. Once 5 minutes or 15 minutes is below threshold, simply suspend the system.


----------


## Development testing

To start testing run this in a terminal now:

``` 
$ while true ; do uptime; sleep 300; done
 08:20:36 up 9 days,  3:50,  1 user,  load average: 0.36, 0.50, 0.64

```

Every five minutes the load average will display to give you an idea of where your thresholds should be to suspend.


----------


## Tracking usage

After program has been implemented you may want to audit usage. For tracking the suspend activity (power savings?) [this script][3] can be used:

``` 
$ suspendtime
Oct 31 05:55:19 to Oct 31 16:54:26 lasting 39,547 seconds
 (... SNIP ...)
Nov 08 07:24:31 to Nov 08 09:28:44 lasting 7,453 seconds
Nov 08 23:26:19 to Nov 09 07:38:50 lasting 29,551 seconds

Linux uptime 791,119 seconds (9 days, 3 hours, 45 minutes, 19 seconds)
18 Suspends 494,551 seconds (5 days, 17 hours, 22 minutes, 31 seconds)
Real uptime 296,568 seconds (3 days, 10 hours, 22 minutes, 48 seconds)

```


  [1]: {% post_url /2019/2019-07-01-Turn-off-all-monitors-while-watching-VLC-media-on-TV %}
  [2]: https://i.stack.imgur.com/Dxo3M.png
  [3]: {% post_url /2019/2019-11-07-How-to-get-real-uptime? %}
