---
layout:       post
title:        >
    How to add LAN driver?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138726
type:         Answer
tags:         internet ethernet lan 19.04
created_date: 2019-04-27 21:05:35
edit_date:    
votes:        "1 "
favorites:    
views:        "3,321 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-27-How-to-add-LAN-driver_.md
toc:          false
navigation:   false
clipboard:    false
---

Each Ubuntu version uses a different kernel chain. After upgrading to Ubuntu version 19.04 your kernel version changed. To find the new version number type `uname -r`. Then use that in your command. For example:

``` 
$ uname -r
4.14.110-0414110-generic

$ sudo dkms add r8168/8.046.00 -k 4.14.110-0414110-generic
```


----------

To reinstall `dkms` driver for the `rtl8168` use:

``` 
sudo apt update
sudo apt install --reinstall r8168-dkms
## ```



You may not need `dkms` RTL8168 driver add on with version 5.0 kernel. The RTL8169 driver has been improved in this kernel version as per [Linux Kernel 5.0 Released! Check Out The New Features][1]:

Here are some of the major new changes in Kernel 5.0:

-    AMD Radeon FreeSync support
-    Support for a new VegaM
-    NVIDIA Xavier display support
-    Continued work on Intel Icelake Gen11 graphics
-    Initial support for the NXP i.MX8 SoCs
-    Support for the Allwinner T3, Qualcomm QCS404, and NXP Layerscape LX2160A
-    Intel VT-d Scalable Mode support for Scalable I/O Virtualization
-    New Intel Stratix 10 FPGA drivers
-    Fixes for F2FS, EXT4 and XFS
-    Btrfs file-system restores support for swap files
-    Fscrypt Adiantum support for helping with fast data encryption on low-end hardware. This replaces the infamous Speck algorithm by NSA.
-    **Realtek R8169 driver improvements**
-    Logitech High Resolution Scrolling support
-    Raspberry Pi Touchscreen driver
-    x86 laptop drivers improvement
-    Thunderbolt security enhancement
-    Support for the Chameleon96 Intel FPGA board
-    Improved power management

The RTL8168 driver has been manually installed by many users because of RTL8169 flaws for their network cards.

  [1]: https://itsfoss.com/linux-kernel-5/
