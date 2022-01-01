---
layout:       post
title:        >
    USB ports not working after resume from sleep on Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1056420
type:         Answer
tags:         usb 18.04
created_date: !!str "2018-07-15 23:56:01"
edit_date:    !!str "2020-12-19 09:02:59"
votes:        !!str "8"
favorites:    
views:        !!str "7,457"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

This answer from [Unix & Linux Stack Exchange][1] (slightly enhanced here) has a solution.

1. Edit `/etc/default/grub` and find the line containing `LINUX_DEFAULT`. Change the line from:

``` 
   GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"

```

   to:

``` 
   GRUB_CMDLINE_LINUX_DEFAULT="quiet splash usbcore.autosuspend=-1"

```

2. Save the file, run `sudo update-grub`, and reboot.

3. After using this, you will find:

``` 
   $ cat /sys/module/usbcore/parameters/autosuspend
   -1

```

   The default value is `2`. The kernel parameter changes this value.

Setting the kernel parameter helped me. Now my mouse works again when resuming from suspend.

Suggestion: When USB devices don't work after suspend, you can also reload the driver using the following commands as root:

``` 
modprobe -r uhci_hcd
modprobe uhci_hcd

```

and/or:

``` 
modprobe -r ehci_hcd
modprobe ehci_hcd

```


  [1]: https://unix.stackexchange.com/a/342953/322816

