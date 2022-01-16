---
layout:       post
title:        >
    HP Truevision HD built-in webcam not working in ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1245950
type:         Answer
tags:         drivers 18.04 hp webcam camera
created_date: 2020-06-02 00:17:28
edit_date:    
votes:        "2 "
favorites:    
views:        "8,259 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-02-HP-Truevision-HD-built-in-webcam-not-working-in-ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    true
---

The `cheese` error messages are similar to those in this report:

- [Webcam not working with cheese (unless sudo-ed)](https://forum.manjaro.org/t/webcam-not-working-with-cheese-unless-sudo-ed/44724)

The solution was to use `sudo` when calling `cheese`.

Other users in the link suggest other packages that work when `cheese` doesn't work.

That said use the following commands to make sure webcam is connected:

{% include copyHeader.html %}
``` 
$ sudo apt install hwinfo

$ hwinfo --usb

11: USB 00.0: 0000 Unclassified device
  [Created at usb.122]
  Unique ID: X7GA.tCH1FaBg9PD
  Parent ID: k4bc.2DFUsyrieMD
  SysFS ID: /devices/pci0000:00/0000:00:14.0/usb1/1-7/1-7:1.0
  SysFS BusID: 1-7:1.0
  Hardware Class: unknown
  Model: "Sunplus Innovation Integrated_Webcam_HD"
  Hotplug: USB
  Vendor: usb 0x1bcf "Sunplus Innovation Technology Inc."
  Device: usb 0x2b8c "Integrated_Webcam_HD"
  Revision: "47.14"
  Driver: "uvcvideo"
  Driver Modules: "uvcvideo"
  Device File: /dev/input/event8
  Device Files: /dev/input/event8, /dev/input/by-id/usb-SunplusIT_Inc_Integrated_Webcam_HD-event-if00, /dev/input/by-path/pci-0000:00:14.0-usb-0:7:1.0-event
  Device Number: char 13:72
  Speed: 480 Mbps
  Module Alias: "usb:v1BCFp2B8Cd4714dcEFdsc02dp01ic0Eisc01ip00in00"
  Driver Info #0:
    Driver Status: uvcvideo is active
    Driver Activation Cmd: "modprobe uvcvideo"
  Config Status: cfg=new, avail=yes, need=no, active=unknown
  Attached to: #14 (Hub)
```

You can get the much of the same information with `lsbusb -v` but it doesn't concisely provide it the same way.
