---
layout:       post
title:        >
    GRUB corrupted after update of an OS in another partition
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/859814
type:         Answer
tags:         dual-boot grub2
created_date: 2016-12-12 11:45:04
edit_date:    
votes:        "0 "
favorites:    
views:        "1,091 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-12-GRUB-corrupted-after-update-of-an-OS-in-another-partition.md
toc:          false
navigation:   false
clipboard:    false
---

As said in another answer you can boot into Ubuntu and type:

``` 
sudo update-grub
```

However if Grub is on a different drive than `sda` it may not work and you will have to use:

``` 
sudo grub-install /dev/sda
```

In either case reboot to test changes.
