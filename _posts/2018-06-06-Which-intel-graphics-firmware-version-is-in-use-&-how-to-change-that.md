---
layout:       post
title:        Which intel graphics firmware version is in use & how to change that
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1044310
type:         Answer
tags:         18.04 intel-graphics
created_date: 2018-06-06 23:12:59
edit_date:    2018-06-07 00:31:27
votes:        2
favorites:    
views:        4,162
accepted:     Accepted
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

## Short Answer

To change the drivers in use you need to change your kernel version. However you shouldn't do this unless there are specific reasons to do so.

## Long Answer

The `install.sh` scripts have been deprecated and are no longer used. Now there are ***blobs*** (Binary Large Objects) that simply need to be downloaded and then copied to `/lib/firmware/i915`. If you follow the link you posted you will see it has been changed from the last time you downloaded.

For instructions on installing the new ***blobs*** see: https://askubuntu.com/questions/832524/updated-kernel-to-4-8-now-missing-firmware-warnings/832528#832528

As far as quickly seeing which i915 drivers for ***Skylake*** you have installed (but not necessarily active for current boot) use:

``` 
$ locate i915/skl_
/lib/firmware/i915/skl_dmc_ver1.bin
/lib/firmware/i915/skl_dmc_ver1_23.bin
/lib/firmware/i915/skl_dmc_ver1_26.bin
/lib/firmware/i915/skl_guc_ver1.bin
/lib/firmware/i915/skl_guc_ver1_1059.bin
/lib/firmware/i915/skl_guc_ver4.bin
/lib/firmware/i915/skl_guc_ver4_3.bin
/lib/firmware/i915/skl_guc_ver6.bin
/lib/firmware/i915/skl_guc_ver6_1.bin
/lib/firmware/i915/skl_guc_ver9_33.bin
/lib/firmware/i915/skl_huc_ver01_07_1398.bin

```

I noticed in your link a new version `skl_dmc_ver1_27.bin` so I downloaded it and then ran:

``` 
$ sudo updatedb
[sudo] password for rick:          
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ locate dmc_ver1_27
/home/rick/Downloads/skl_dmc_ver1_27.bin
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ sudo mv /lib/firmware/i915/skl_dmc_ver1_26.bin /lib/firmware/i915/skl_dmc_ver1_26.bin.old
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ sudo mv /home/rick/Downloads/skl_dmc_ver1_27.bin /lib/firmware/i915/skl_dmc_ver1_27.bin
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ sudo update-initramfs -u -k `uname -r`
update-initramfs: Generating /boot/initrd.img-4.14.42-041442-generic
W: Possible missing firmware /lib/firmware/i915/skl_dmc_ver1_26.bin for module i915
Adding /lib/firmware/i915/skl_guc_ver9_33.bin

```

So even though `skl_dmc_ver1_27.bin` is available it doesn't work with the Kernel `4.14` chain and it still looks for `skl_dmc_ver1_26.bin`. Ubuntu 18.04 uses the `4.15` kernel chain so apparently it is using `skl_dmc_ver1_26.bin` as well.


----------


I just downloaded Kernel 4.17 which came out two days ago and it uses the new `skl_dmc_ver1_27.bin` driver:

``` 
$ sudo mv /lib/firmware/i915/skl_dmc_ver1_27.bin /lib/firmware/i915/skl_dmc_ver1_27.bin.old
$ sudo update-initramfs -u -k 4.17.0-041700-generic
update-initramfs: Generating /boot/initrd.img-4.17.0-041700-generic
W: Possible missing firmware /lib/firmware/i915/skl_dmc_ver1_27.bin for module i915
W: Possible missing firmware /lib/firmware/i915/kbl_dmc_ver1_04.bin for module i915
W: Possible missing firmware /lib/firmware/i915/cnl_dmc_ver1_07.bin for module i915
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_39.bin for module i915
W: Possible missing firmware /lib/firmware/i915/bxt_guc_ver9_29.bin for module i915
Adding /lib/firmware/i915/skl_guc_ver9_33.bin

```

**Notice how it's looking for `/lib/firmware/i915/skl_dmc_ver1_27.bin`**


----------

## Summary 

- Kernel `4.14` uses `skl_dmc_ver1_26.bin`.
- Kernel `4.17` uses `skl_dmc_ver1_27.bin`.
- `/lib/firmware/i915/skl_guc_ver9_33.bin` is used by both Kernels `4.14` and `4.17`.

You also asked: *"What about guc and huc?"* **guc** is answered immediately above. As far as **huc** is concerned the same version is used from Kernel `4.14` (and earlier) to Kernel `4.17`:

``` 
rick@alien:~/Downloads$ sudo mv /lib/firmware/i915/skl_huc_ver01_07_1398.bin /lib/firmware/i915/skl_huc_ver01_07_1398.bin.old
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ sudo update-initramfs -u -k `uname -r`
update-initramfs: Generating /boot/initrd.img-4.14.42-041442-generic
W: Possible missing firmware /lib/firmware/i915/skl_dmc_ver1_26.bin for module i915
W: Possible missing firmware /lib/firmware/i915/skl_huc_ver01_07_1398.bin for module i915
Adding /lib/firmware/i915/skl_guc_ver9_33.bin

```

