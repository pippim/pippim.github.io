---
layout:       post
title:        >
    Dual boot and the files /boot/grub/grub.cfg -- which one is used?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068993
type:         Answer
tags:         dual-boot grub2
created_date: 2018-08-26 02:53:59
edit_date:    2019-08-04 16:46:04
votes:        "0 "
favorites:    
views:        "2,374 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-26-Dual-boot-and-the-files-_boot_grub_grub.cfg-which-one-is-used_.md
toc:          false
navigation:   false
clipboard:    false
---

I have three distributions on one SSD. The setup is UEFI/GPT. Whenever a new distribution is installed it takes control of grub. 



To get the desired `/boot/grub/grub.cfg` to be in control, boot with that distribution and use:

``` bash
$ sudo cat /boot/efi/EFI/ubuntu/grub.cfg
search.fs_uuid 8337e8c8-6461-44f2-b5fe-dfd5b6b05883 root 
set prefix=($root)'/boot/grub'
configfile $prefix/grub.cfg
   
$ sudo grub-install
Installing for x86_64-efi platform.
Installation finished. No error reported.

$ sudo cat /boot/efi/EFI/ubuntu/grub.cfg
search.fs_uuid b40b3925-70ef-447f-923e-1b05467c00e7 root 
set prefix=($root)'/boot/grub'
configfile $prefix/grub.cfg
```

- The first `cat` reveals Ubuntu 19.04 grub is used on `8337e8c8-6461-44f2-b5fe-dfd5b6b05883`
- The `grub-install` command will override that with the booted distributions `UUID`
- The last `cat` reveals Ubuntu 16.04 grub is now used on `b40b3925-70ef-447f-923e-1b05467c00e7`.
- From now on only Ubuntu 16.04 `update-grub` command will change the grub boot menu. Running `update-grub` in Ubuntu 19.04 will changes it's local copy of `/boot/grub/grub.cfg` but not effect the boot menu.


----------


I've created a script to give more meaningful names to grub menu options:

``` bash
sed -i "s|Windows Boot Manager (on /dev/nvme0n1p2)|Windows 10|g" /boot/grub/grub.cfg
sed -i "s|Windows Boot Manager (on /dev/sda1)|Windows 10 original|g" /boot/grub/grub.cfg
sed -i "s|Ubuntu 16.04.5 LTS (16.04) (on /dev/nvme0n1p7)|Broken Ubuntu 16.04|g" /boot/grub/grub.cfg
sed -i "s|Ubuntu 19.04 (19.04) (on /dev/nvme0n1p10)|Ubuntu 19.04|g" /boot/grub/grub.cfg
```

Now a grub menu options change from:

``` bash
2. Ubuntu 19.04 (19.04) (on /dev/nvme0n1p10)
3. Advanced options for Ubuntu 19.04 (19.04) (on /dev/nvme0n1p10)
```

to:

``` bash
2. Ubuntu 19.04
3. Advanced options for Ubuntu 19.04
```
