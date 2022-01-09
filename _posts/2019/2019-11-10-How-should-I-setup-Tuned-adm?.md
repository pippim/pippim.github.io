---
layout:       post
title:        >
    How should I setup Tuned-adm?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187749
type:         Answer
tags:         power-management cpu
created_date: 2019-11-10 16:02:32
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,715 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

The two processes don't really conflict with each other. `ondemand.service` focuses on setting the CPU Frequency Scaling governor.:

``` 
$ systemctl status ondemand
● ondemand.service - LSB: Set the CPU Frequency Scaling governor to "ondemand"
   Loaded: loaded (/etc/init.d/ondemand; bad; vendor preset: enabled)
   Active: active (exited) since Thu 2019-10-31 05:30:09 MDT; 1 weeks 3 days ago
     Docs: man:systemd-sysv-generator(8)

Oct 31 05:30:08 alien systemd[1]: Starting LSB: Set the CPU Frequency Scaling governor to "o
Oct 31 05:30:09 alien systemd[1]: Started LSB: Set the CPU Frequency Scaling governor to "on

```


----------


Tuned on the other hand focuses on optimizing performance of storage devices (including swap):

## [The Tuned Project][1]

### Tuned is a system tuning service for Linux. It:

-    monitors connected devices using the udev device manager
-    tunes system settings according to a selected profile
-    supports various types of configuration like sysctl, sysfs, or kernel boot command line parameters, which are integrated in a plug-in architecture
-    supports hot plugging of devices and can be controlled from the command line or through D-Bus, so it can be easily integrated into existing administering solutions: for example, with Cockpit
-    can be run in no-daemon mode with limited functionality (for example, no support for D-Bus, udev, tuning of newly created processes, and so on) for systems with reduced resources
-    stores all its configuration cleanly in one place – in the Tuned profile – instead of having configuration on multiple places and in custom scripts


----------

There should be no problem keeping `ondemand` service running or disabling it before installing `tuned`.

  [1]: https://tuned-project.org/
