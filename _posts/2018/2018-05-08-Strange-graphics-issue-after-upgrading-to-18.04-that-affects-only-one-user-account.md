---
layout:       post
title:        >
    Strange graphics issue after upgrading to 18.04 that affects only one user account
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033800
type:         Answer
tags:         xorg 18.04 ubuntu-gnome window-manager
created_date: 2018-05-08 23:46:30
edit_date:    2018-05-09 11:31:48
votes:        "2 "
favorites:    
views:        "11,291 "
accepted:     
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-08-Strange-graphics-issue-after-upgrading-to-18.04-that-affects-only-one-user-account.md
toc:          false
navigation:   false
clipboard:    false
---

When you run `update-initramfs` you should not be getting error messages for missing skylake drivers.

### Under Ubuntu 16.04 LTS:

``` 
$ sudo update-initramfs -u
update-initramfs: Generating /boot/initrd.img-4.14.34-041434-generic
Adding /lib/firmware/i915/skl_guc_ver9_33.bin
```

### Under Ubuntu 18.04 LTS:

``` 
$ sudo update-initramfs -u
update-initramfs: Generating /boot/initrd.img-4.15.0-20-generic
Adding /lib/firmware/i915/skl_guc_ver9_33.bin
```

In particular you should be seeing the last line. If not follow the instructions here: [Updated kernel to 4.8 now missing firmware warnings][1]


  [1]: {% post_url /2016/2016-10-03-Possible-missing-firmware-_lib_firmware_i915 %}
