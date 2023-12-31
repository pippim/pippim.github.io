---
layout:       post
title:        >
    Linux kernel header files to match the current kernel
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045481
type:         Answer
tags:         kernel
created_date: 2018-06-11 05:08:27
edit_date:    2018-06-12 01:12:49
votes:        "0 "
favorites:    
views:        "31,861 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-11-Linux-kernel-header-files-to-match-the-current-kernel.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest solution is to install the missing packages:

``` 
$ sudo apt install linux-headers-generic linux-headers-4.13.0-43-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
linux-headers-4.13.0-43-generic is already the newest version (4.13.0-43.48~16.04.1).
linux-headers-generic is already the newest version (4.4.0.127.133).
0 upgraded, 0 newly installed, 0 to remove and 1 not upgraded.
```

My system already has installed what yours is missing. Why they're missing I can't say.

Notice for `linux-headers-generic` the most current version is indeed `4.4.0.127.133`. Although Linux Kernel 4.4 came out in 2015 it is an LTS (Long Term Support) kernel for 5 or 6 years (can't remember exactly) and it is currently on update number 127. So the update number will eventually grow to 300 or so.

No matter how you look at it, you need to just bite the bullet and install the missing headers using:

``` 
sudo apt install linux-headers-generic linux-headers-4.13.0-43-generic
```

## June 11, 2018 update.

`4.4.0.127.133` is no longer the latest header version. I ran `sudo apt upgrade` and then later ran `sudo apt autoremove`. I received some error messages as schizophrenic software removed `127` and told me to add `127` headers to fix the problem:

``` 
Removing linux-image-extra-4.4.0-127-generic (4.4.0-127.153) ...
run-parts: executing /etc/kernel/postinst.d/apt-auto-removal 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
run-parts: executing /etc/kernel/postinst.d/dkms 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
dkms: WARNING: Linux headers are missing, which may explain the above failures.
      please install the linux-headers-4.4.0-127-generic package to fix this.
run-parts: executing /etc/kernel/postinst.d/initramfs-tools 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
update-initramfs: Generating /boot/initrd.img-4.4.0-127-generic
Adding /lib/firmware/i915/skl_guc_ver9_33.bin
run-parts: executing /etc/kernel/postinst.d/pm-utils 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
run-parts: executing /etc/kernel/postinst.d/unattended-upgrades 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
run-parts: executing /etc/kernel/postinst.d/update-notifier 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
run-parts: executing /etc/kernel/postinst.d/zz-update-grub 4.4.0-127-generic /boot/vmlinuz-4.4.0-127-generic
```

There is no real problem though and as of June 11, 2018 the latest `linux-headers-generic` version is: `4.4.0.128.134`.
