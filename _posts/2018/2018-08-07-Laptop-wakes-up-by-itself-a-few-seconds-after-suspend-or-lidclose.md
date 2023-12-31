---
layout:       post
title:        >
    Laptop wakes up by itself a few seconds after suspend or lidclose
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1063360
type:         Answer
tags:         network-manager suspend power-management wakeup grub
created_date: 2018-08-07 23:20:20
edit_date:    2018-08-09 02:57:13
votes:        "1 "
favorites:    
views:        "3,223 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-07-Laptop-wakes-up-by-itself-a-few-seconds-after-suspend-or-lidclose.md
toc:          false
navigation:   false
clipboard:    false
---

## August 8, 2018 Update

Kernel `4.15.0-30` has been released. The resume immediately after suspend problem persists. Kernel `4.13.0-36` still works reliably.

## Additional steps to try

I have the same problem on `4.15.0-29-generic`. I had just installed nVidia driver 384.130 and assumed it was related to that. I went through all your steps plus I modified:

``` 
$ paste <(ls /sys/bus/usb/devices/*/power/wakeup) <(cat /sys/bus/usb/devices/*/power/wakeup) | column -s $'\t' -t
/sys/bus/usb/devices/1-1.4.3/power/wakeup  disabled
/sys/bus/usb/devices/1-1.4/power/wakeup    disabled
/sys/bus/usb/devices/1-1/power/wakeup      disabled
/sys/bus/usb/devices/1-4/power/wakeup      disabled
/sys/bus/usb/devices/1-5/power/wakeup      enabled
/sys/bus/usb/devices/1-9/power/wakeup      disabled
/sys/bus/usb/devices/usb1/power/wakeup     disabled
/sys/bus/usb/devices/usb2/power/wakeup     disabled
/sys/bus/usb/devices/usb3/power/wakeup     disabled
/sys/bus/usb/devices/usb4/power/wakeup     disabled
```

**USB 1-5** is the WiFi / Bluetooth card:

``` 
$ lsusb
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 009: ID 046d:c52b Logitech, Inc. Unifying Receiver
Bus 001 Device 007: ID 1bcf:2b8c Sunplus Innovation Technology Inc. 
Bus 001 Device 005: ID 0cf3:e301 Atheros Communications, Inc. 
Bus 001 Device 003: ID 187c:0528 Alienware Corporation 
Bus 001 Device 008: ID 413c:9016 Dell Computer Corp. 
Bus 001 Device 006: ID 2109:2812 VIA Labs, Inc. VL812 Hub
Bus 001 Device 004: ID 0764:0501 Cyber Power System, Inc. CP1500 AVR UPS
Bus 001 Device 002: ID 2109:2812 VIA Labs, Inc. VL812 Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

You can check this as well.

## Unplug everything

Intel recommends unplugging everything-- All USBs, Network cable, etc to debug suspending. There are other things to try listed in [Intel's article][1].

## Kernel `4.13.0-36` works!

I recompiled my `nvhda.ko` under kernel `4.13.0-36-generic` and discovered that suspend through the menu at least works now.

- If you have an older kernel version like `4.15.0-24` in your Advanced Grub menu boot with that.
- If you have `4.13.0-36` boot with that.
- If you don't have an older version you can install it with `sudo apt install linux-image-4.15.0-24*`
- If you use DKMS you also need to use `sudo apt install linux-headers-4.15.0-24*`
- I don't see kernels `4.15.0-25` through `4.15.0-28` available in the repository.


  [1]: https://01.org/blogs/rzhang/2015/best-practice-debug-linux-suspend/hibernate-issues
