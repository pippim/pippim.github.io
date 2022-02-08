---
layout:       post
title:        >
    help! W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132078
type:         Answer
tags:         boot dual-boot grub2 kernel uefi
created_date: 2019-04-08 08:51:03
edit_date:    2019-04-09 00:22:11
votes:        "3 "
favorites:    
views:        "33,692 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-08-help!-W:-Possible-missing-firmware-_lib_firmware_i915_kbl_guc_ver9_14.bin-for-module-i915.md
toc:          false
navigation:   false
clipboard:    true
---

This answer appears to best solution for missing Intel Graphics Driver warnings:

- [Updated kernel to 4.8 now missing firmware warnings](Updated kernel to 4.8 now missing firmware warnings)


----------


As requested in comments it appears warnings do not go away with `linux-firmware` reinstall:

{% include copyHeader.html %}
``` 
$ sudo apt install --reinstall linux-firmware
Reading package lists... Done
Building dependency tree       
Reading state information... Done
0 upgraded, 0 newly installed, 1 reinstalled, 0 to remove and 9 not upgraded.
Need to get 49.8 MB of archives.
After this operation, 0 B of additional disk space will be used.
Get:1 http://ca.archive.ubuntu.com/ubuntu xenial-updates/main amd64 linux-firmware all 1.157.21 [49.8 MB]
Fetched 49.8 MB in 8s (5,542 kB/s)                                                         
(Reading database ... 495159 files and directories currently installed.)
Preparing to unpack .../linux-firmware_1.157.21_all.deb ...
Unpacking linux-firmware (1.157.21) over (1.157.21) ...
Setting up linux-firmware (1.157.21) ...
update-initramfs: Generating /boot/initrd.img-4.15.0-47-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.15.0-46-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.14.110-0414110-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.14.98-041498-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.14.89-041489-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.14.78-041478-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.14.70-041470-generic
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
update-initramfs: Generating /boot/initrd.img-4.4.0-145-generic
update-initramfs: Generating /boot/initrd.img-3.16.60-031660-generic
```


