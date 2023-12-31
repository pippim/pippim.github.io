---
layout:       post
title:        >
    Desktop Environment Initialization Delay in 20.04 (PLEASE HELP!)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1271623
type:         Answer
tags:         20.04 login xorg lightdm desktop-environments
created_date: 2020-08-31 18:37:36
edit_date:    2020-09-01 14:58:21
votes:        "1 "
favorites:    
views:        "1,216 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-08-31-Desktop-Environment-Initialization-Delay-in-20.04-_PLEASE-HELP!_.md
toc:          false
navigation:   false
clipboard:    false
---

## Disable `networkd-dispatcher`

From [Reddit][1]:

### Disable networkd services: 

If you are not a system admin you don't need this. Gui uses network-manger (and it has it's own dispatcher) anyway.

``` 
sudo apt-get remove networkd-dispatcher
sudo systemctl stop systemd-networkd.service
sudo systemctl disable systemd-networkd.service
```

There are other boot speed tips but this appears most relevant to your case.

## Bug Report

There is a bug report on your issue:

- [pam_unix(sudo:auth): Couldn't open /etc/securetty: No such file or directory][2]

It seems to have begun with **20.04** as **16.04** doesn't seem to have the problem:

``` 
$ ll /etc/securetty
-rw-r--r-- 1 root root 4038 Mar 29  2016 /etc/securetty
```

You should subscribe to the bug report and follow progress.


  [1]: https://www.reddit.com/r/Ubuntu/comments/clu0lj/short_guide_to_improve_slow_boot_on_ubuntu_1804/
  [2]: https://bugs.launchpad.net/ubuntu/+source/pam/+bug/1860826
