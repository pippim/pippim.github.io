---
layout:       post
title:        >
    Accidentally deleted all contents of /etc/grub.d
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069158
type:         Answer
tags:         grub2 18.04 restore
created_date: 2018-08-26 18:08:09
edit_date:    
votes:        "0 "
favorites:    
views:        "1,905 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-26-Accidentally-deleted-all-contents-of-_etc_grub.d.md
toc:          false
navigation:   false
clipboard:    false
---

Boot with your Live USB / DVD.

Open **Nautilus** in root mode using:

``` 
sudo -H nautilus
```

Then navigate to your `/etc` directory and copy the `grub.d` directory.

While still in `nautilus` root mode navigate to your real `/etc` directory on your hard drive SSD and paste the `grub.d` directory into it.

**Note:** You may have to mount your real Ubuntu first if `nautilus` doesn't see it on the hard drive / SSD: [How to mount a partition from live usb](How to mount a partition from live usb)
