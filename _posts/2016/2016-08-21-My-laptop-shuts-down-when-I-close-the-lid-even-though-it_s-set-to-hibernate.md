---
layout:       post
title:        >
    My laptop shuts down when I close the lid even though it's set to hibernate
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/815134
type:         Answer
tags:         suspend laptop power-management shutdown hibernate grub
created_date: 2016-08-21 23:55:05
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "7,481 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-21-My-laptop-shuts-down-when-I-close-the-lid-even-though-it_s-set-to-hibernate.md
toc:          false
navigation:   false
clipboard:    false
---

With `sudo` powers open up `/etc/systemd/logind.conf` and look for the following two lines:

``` 
#HandleLidSwitch=suspend
#HandleLidSwitchDocked=suspend
```

If they begin with a hash tag (`#`) remove it and set your option to ignore, poweroff, reboot, halt, suspend, hibernate, hybrid-sleep, lock or kexec. More details can be found at [Power Management][1]

This worked for me and hopefully works for you too.


----------

# Bug Reports

There are many bug reports starting in August 2016 with Linux Suspend / Resume issues. This [bug report][2] has lots of solutions. One comment **#140** has grub command line changes that are confirmed to work:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_backlight=vendor acpi_osi='!Windows 2013' acpi_osi='!Windows 2012'"
```

If this doesn't work, by all means check out the other solutions in this bug report. Also check out other bug reports using google search string: "Resume shuts down 16.04"



  [1]: https://wiki.archlinux.org/index.php/Power_management
  [2]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1566302
