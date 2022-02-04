---
layout:       post
title:        >
    How can I tell which of these video devices is a webcam?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1336985
type:         Answer
tags:         camera devices
created_date: 2021-05-08 16:14:02
edit_date:    
votes:        "3 "
favorites:    
views:        "1,840 "
accepted:     
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-08-How-can-I-tell-which-of-these-video-devices-is-a-webcam_.md
toc:          false
navigation:   false
clipboard:    true
---

There is a package called `usbutils` which can be an invaluable tool:

``` 
sudo apt install usbutils
```

Then you can query any USB device and get a lot of information:

{% include copyHeader.html %}
``` 
$ sudo lsusb -v | grep -i webcam -a14

Bus 001 Device 009: ID 1bcf:2b8c Sunplus Innovation Technology Inc. 
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass          239 Miscellaneous Device
  bDeviceSubClass         2 ?
  bDeviceProtocol         1 Interface Association
  bMaxPacketSize0        64
  idVendor           0x1bcf Sunplus Innovation Technology Inc.
  idProduct          0x2b8c 
  bcdDevice           47.14
  iManufacturer           1 SunplusIT Inc
  iProduct                2 Integrated_Webcam_HD
  iSerial                 0 
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength          767
    bNumInterfaces          2
    bConfigurationValue     1
    iConfiguration          0 
    bmAttributes         0x80
      (Bus Powered)
    MaxPower              500mA
    Interface Association:
      bLength                 8
      bDescriptorType        11
      bFirstInterface         0
      bInterfaceCount         2
      bFunctionClass         14 Video
      bFunctionSubClass       3 Video Interface Collection
      bFunctionProtocol       0 
      iFunction               4 Integrated Webcam
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       0
      bNumEndpoints           1
      bInterfaceClass        14 Video
      bInterfaceSubClass      1 Video Control
      bInterfaceProtocol      0 
      iInterface              4 Integrated Webcam
      VideoControl Interface Descriptor:
        bLength                13
        bDescriptorType        36
        bDescriptorSubtype      1 (HEADER)
        bcdUVC               1.00
        wTotalLength          109
        dwClockFrequency       48.000000MHz
        bInCollection           1
        baInterfaceNr( 0)       1
      VideoControl Interface Descriptor:
        bLength                18
        bDescriptorType        36
        bDescriptorSubtype      2 (INPUT_TERMINAL)
        bTerminalID             1

```
