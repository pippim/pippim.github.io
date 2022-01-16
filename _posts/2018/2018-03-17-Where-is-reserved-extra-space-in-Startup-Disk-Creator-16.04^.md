---
layout:       post
title:        >
    Where is reserved extra space in Startup Disk Creator 16.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1016794
type:         Answer
tags:         usb 16.04 startup disk disk-usage
created_date: 2018-03-17 17:09:22
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,117 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-17-Where-is-reserved-extra-space-in-Startup-Disk-Creator-16.04^.md
toc:          false
navigation:   false
clipboard:    false
---

I'll answering your last question first. The newer live-usb ISO's are hybrids that work for both MBR and GPT systems. `gparted` cannot read these after Startup Disk Creator has burned the ISO to the USB flash drive. Rather than taking your USB to another computer to reformat it you can use `dd` (Data Destroyer, real name Data Duplicator):

``` 
sudo dd if=/dev/zero of=/dev/sdX bs=512 count=1
```

Change `sdX` to `sdd`, `sde`, or whatever your USB drive letter is. 

### *Use `dd` with great caution!*

----------


As you discovered Ubuntu 16.04 Startup Disk Creator no longer provides an option for persistence storage for a Live Boot USB Flash Drive. But `mkusb` does provide this feature and it works well even for creating a pre-release Ubuntu 18.04 Live Boot USB.

For more about `mkusb` details read about it [here][1].


  [1]: https://help.ubuntu.com/community/mkusb
