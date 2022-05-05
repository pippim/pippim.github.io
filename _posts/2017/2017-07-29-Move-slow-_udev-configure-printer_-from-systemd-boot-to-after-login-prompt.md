---
layout:       post
title:        >
    Move slow `udev-configure-printer` from systemd boot to after login prompt
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/941061
type:         Question
tags:         boot printing services systemd cups-lpd
created_date: 2017-07-29 18:02:33
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    1
views:        "767 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-29-Move-slow-_udev-configure-printer_-from-systemd-boot-to-after-login-prompt.md
toc:          false
navigation:   false
clipboard:    false
---

I've been tweaking my boot speed today. The first step was to remove:

``` 
      6.194s NetworkManager-wait-online.service
```

To remove it I used:

``` 
systemctl disable NetworkManager-wait-online.service
```

And now my boot time shows:

``` 
$ systemd-analyze
Startup finished in 3.407s (kernel) + 8.356s (userspace) = 11.764s
```

The network still works ok so it appears no harm has come from the change.

Next on the `systemd-analyze blame` list is:

``` 
      5.467s udev-configure-printer@-devices-pci0000:00-0000:00:14.0-usb3-3\x2d3-3\x2d3.1.service
```

I only use my printer a couple times a month and I certainly don't need it during the boot up phase. My question is; how do I move CUPS initialization out of the boot sequence into a post boot environment like **Startup Applications** or `/etc/rc.local` or whatever place makes sense?

Or can systemd be told to load the service after login screen appears? Or told to simply wait 15 seconds before loading the service?

----------

# What I tried

Using the instructions [here][1] I set the target to be after the login prompt. I did this by editing `/lib/systemd/system/udev-configure-printer.service` to look like this:

``` 
[Unit]
Description=Automatic USB/Bluetooth printer setup (%i)
# July 29, 2017 - Move from startup (5 seconds time) to after login screen
After=lightdm.service

[Service]
#Type=simple
Type=forking
GuessMainPID=true
ExecStart=/lib/udev/udev-configure-printer add %I
# This ExecStop would be useful to disable the print queue when ippusbxd
# crashes or gets killed, but in the case that ippusbxd does not get started
# at all during the process run by ExecStart (printer does not support
# IPP-over-USB) ExecStop gets run immediately making a printer getting
# disabled again right after it getting enabled or set up
# ExecStop=/lib/udev/udev-configure-printer remove %I
```

Even after rebooting twice to confirm speeds, the boot time went from 11 seconds to 16 seconds.

  [1]: https://stackoverflow.com/questions/21830670/systemd-start-service-after-specific-service
