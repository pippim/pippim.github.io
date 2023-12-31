---
layout:       post
title:        >
    problem in sudo apt-get install --reinstall ubuntu-desktop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1207583
type:         Answer
tags:         package-management upgrade dpkg reinstall
created_date: 2020-02-02 16:38:55
edit_date:    
votes:        "1 "
favorites:    
views:        "5,611 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-02-problem-in-sudo-apt-get-install-reinstall-ubuntu-desktop.md
toc:          false
navigation:   false
clipboard:    false
---

I haven't tried it myself but I presume the system won't reinstall the desktop while it is in use. Instead of logging into the desktop and opening a terminal, log into console mode:

- [How to start Ubuntu in Console mode]({% post_url /2016/2016-12-11-How-to-start-Ubuntu-in-Console-mode %})

Before changing make sure you note the settings for:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
#GRUB_TERMINAL=console
```

After rebooting and logging into console use:

``` 
sudo apt update
sudo apt install --reinstall ubuntu-desktop
sudo apt install --reinstall unity
```

The last command is only necessary if you are using the Unity interface.

Now reverse the changes for console mode and reboot.
