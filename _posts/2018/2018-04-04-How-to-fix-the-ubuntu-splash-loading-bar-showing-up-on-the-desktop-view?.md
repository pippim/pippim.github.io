---
layout:       post
title:        >
    How to fix the ubuntu splash loading bar showing up on the desktop view?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021878
type:         Answer
tags:         16.04 lts
created_date: 2018-04-04 10:48:28
edit_date:    
votes:        "2 "
favorites:    
views:        "8,131 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

## Short term fix

This is the Plymouth splash screen. As a short term fix you can disable it by editing the file `/etc/default/grub` with `sudo` powers and searching for this line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"

```

Remove the `splash` parameter so it looks like this:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet"

```

**NOTE:** You may have other options besides `quite splash`. Only remove the `splash` option.

Save the file and exit your editor. Then use:

``` 
 sudo update-grub

```

On the next reboot instead of the purple splash screen with moving dots you'll have a plain black screen instead.


----------

## Long term fix

From the terminal use:

``` 
$ systemctl list-units --all plymouth-quit-wait.service
UNIT                       LOAD   ACTIVE   SUB  DESCRIPTION
plymouth-quit-wait.service loaded inactive dead Hold until boot process finishes up

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.

1 loaded units listed.
To show all installed unit files use 'systemctl list-unit-files'.

```

Above is the the normal output. Compare yours and report any differences in your question.

Next step is to look for error messages using:

``` 
$ journalctl -b-1 | grep -i plymouth
Apr 03 05:36:13 alien systemd[1]: Starting Show Plymouth Boot Screen...
Apr 03 05:36:14 alien systemd[1]: Started Show Plymouth Boot Screen.
Apr 03 05:36:14 alien systemd[1]: Started Forward Password Requests to Plymouth Directory Watch.
Apr 03 05:36:14 alien systemd[1]: Received SIGRTMIN+20 from PID 389 (plymouthd).
Apr 03 05:36:15 alien systemd[1]: Starting Tell Plymouth To Write Out Runtime Data...
Apr 03 05:36:15 alien systemd[1]: Started Tell Plymouth To Write Out Runtime Data.
Apr 03 05:36:15 alien systemd[1]: Received SIGRTMIN+21 from PID 389 (plymouthd).
Apr 03 05:39:32 alien systemd[1]: Starting Show Plymouth Reboot Screen...
Apr 03 05:39:33 alien systemd[1]: Received SIGRTMIN+20 from PID 20980 (plymouthd).
Apr 03 05:39:33 alien systemd[1]: Started Show Plymouth Reboot Screen.
Apr 03 05:39:34 alien systemd[1]: Stopped Forward Password Requests to Plymouth Directory Watch.

```

Once again the above is normal output.
