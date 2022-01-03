---
layout:       post
title:        >
    Laptop selectively will∕will not wake up from suspend on Ubuntu 18.04.3
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1206241
type:         Answer
tags:         suspend power-management
created_date: 2020-01-28 03:33:24
edit_date:    2020-02-18 12:49:42
votes:        "4 "
favorites:    
views:        "2,440 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

## February 18, 2020 update

Log file has been posted and when system suspends at 17:00 the next action is reboot at 20:00 (rather than resume):

``` 
Feb 17 16:25:30 neon-Predator-PH315-51 systemd-sleep[1430]: Suspending system...
Feb 17 16:25:30 neon-Predator-PH315-51 kernel: [32444.683507] PM: suspend entry (deep)
Feb 17 20:09:33 neon-Predator-PH315-51 systemd-modules-load[527]: Inserted module 'lp'
Feb 17 20:09:33 neon-Predator-PH315-51 kernel: [    0.000000] microcode: microcode updated early to revision 0xca, date = 2019-10-03
Feb 17 20:09:33 neon-Predator-PH315-51 kernel: [    0.000000] Linux version 5.3.0-7625-generic (buildd@lgw01-amd64-052) (gcc version 7.4.0 (Ubuntu 7.4.0-1ubuntu1~18.04.1)) #27~1576774585~18.04~c7868f8-Ubuntu SMP Thu Dec 19 20:37:47 UTC  (Ubuntu 5.3.0-7625.27~1576774585~18.04~c7868f8-generic 5.3.13)
Feb 17 20:09:33 neon-Predator-PH315-51 kernel: [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.3.0-7625-generic root=UUID=7db19782-809c-409f-9ac5-e76d1cf84345 ro quiet splash nouveau.runpm=0 vt.handoff=1
```

This is similar to:

- [Laptop reboots instead of resuming from systemd suspend when on battery power (suspending on AC power works)][1]
- [https://askubuntu.com/questions/871950/dell-xps-15-9550-rebooting-after-suspend](https://askubuntu.com/questions/871950/dell-xps-15-9550-rebooting-after-suspend)

----------


You need to find the error message(s) that are occurring during resume from suspend. Once you know the error then you can fix it.

When your resume breaks and you restart your system open the terminal and type `gedit /var/log/syslog`. Then scroll to the section where the system suspended and resumed. For example, my system suspended at 5:52 am before going to work and resumed at 16:56 (4:56 pm) when returning home:

``` 
Jan 27 05:52:11 alien kernel: [1305328.821795] PM: suspend entry (deep)
Jan 27 05:52:11 alien kernel: [1305328.821797] PM: Syncing filesystems ... done.
Jan 27 05:52:13 alien acpid: client 1428[0:0] has disconnected
Jan 27 16:56:19 alien kernel: [1305331.145883] Freezing user space processes ... (elapsed 0.003 seconds) done.
Jan 27 16:56:19 alien kernel: [1305331.148954] OOM killer disabled.
Jan 27 16:56:19 alien kernel: [1305331.148955] Freezing remaining freezable tasks ... (elapsed 0.001 seconds) done.
```

Look through your own log file using this example until you find an error message and perform a google search on the error.

Use this same technique for all problems you encounter, not just suspend / resume errors.


  [1]: https://unix.stackexchange.com/questions/291546/laptop-reboots-instead-of-resuming-from-systemd-suspend-when-on-battery-power-s
