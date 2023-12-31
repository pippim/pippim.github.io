---
layout:       post
title:        >
    Kernel panic when trying to fix broken packages (Nvidia)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160021
type:         Answer
tags:         drivers apt 18.04 nvidia kernel grub
created_date: 2019-07-21 22:22:08
edit_date:    2019-07-21 23:05:35
votes:        "0 "
favorites:    
views:        "891 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-21-Kernel-panic-when-trying-to-fix-broken-packages-_Nvidia_.md
toc:          false
navigation:   false
clipboard:    false
---

You can try [`update-initramfs`][1] on your favorite kernel by logging into console and typing:

``` 
sudo rm /var/lib/initramfs-tools/4.19.59-041959-generic
sudo update-initramfs -c -k 4.19.59-041959-generic
```

As far as logging into the GUI you can try selecting **Recover** mode in the **Advanced Options for Ubuntu** submenu reached from the grub main menu.

**Recovery** mode runs in low resolution and isn't a permanent solution. It allows you to reinstall new drivers and then boot normally.

`rm` is needed as described here: [update-initramfs missing /lib/modules/4.4.0-13-generic](update-initramfs missing /lib/modules/4.4.0-13-generic)


  [1]: https://www.systutorials.com/docs/linux/man/8-update-initramfs/
