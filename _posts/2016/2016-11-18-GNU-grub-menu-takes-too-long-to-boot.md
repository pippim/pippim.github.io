---
layout:       post
title:        >
    GNU grub menu takes too long to boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/850840
type:         Answer
tags:         dual-boot grub2 gnu
created_date: 2016-11-18 11:53:39
edit_date:    
votes:        "3 "
favorites:    
views:        "5,815 "
accepted:     
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-18-GNU-grub-menu-takes-too-long-to-boot.md
toc:          false
navigation:   false
clipboard:    false
---

To see what grub is doing while it's loading the kernel image and booting up Ubuntu you need to remove the splash screen and enable messaging. Open the terminal and use the command `gksu gedit /etc/default/grub` and search for this line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash vt.handoff=7 kaslr"
```

Change the line to look like this:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="vt.handoff=7 kaslr"
```

Leave the other parameters alone (which probably don't look like mine). The important thing is to remove "quiet" and "splash" parameters.

Save the file and then use:

``` 
sudo update-grub
```

Now reboot your computer and watch for messages that pause for a long time. After getting a message that pauses for a long time you can review the log file using:

``` 
gedit /var/log/syslog
```

Additionally the time for all services loaded during boot can be reviewed using:

``` 
systemd-analyze blame
```

After getting specifics of what module(s) is/are slowing down your boot you can ask pointed question(s) about it/them
