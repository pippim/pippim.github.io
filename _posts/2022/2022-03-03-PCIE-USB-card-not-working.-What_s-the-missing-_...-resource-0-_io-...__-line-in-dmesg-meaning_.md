---
layout:       post
title:        >
    PCIE USB card not working. What's the missing "... resource 0 [io ...]" line in dmesg meaning?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1395687
type:         Answer
tags:         drivers usb dmesg pcie
created_date: 2022-03-03 01:01:40
edit_date:    
votes:        "0 "
favorites:    
views:        "945 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-03-03-PCIE-USB-card-not-working.-What_s-the-missing-_...-resource-0-_io-...__-line-in-dmesg-meaning_.md
toc:          false
navigation:   false
clipboard:    false
---

Looking at your logs it appears you will have to wait a few weeks / months for Intel to provide a driver.

From:

- [Device 'Intel C620 Series Chipset Family MEI Controller #2'](https://linux-hardware.org/index.php?id=pci:8086-a1bb-1043-871e)

| Name | Description |
| --- | --- |
| ID	| PCI 8086:a1bb:1043:871e |
| Class	| 07-80 » |
| Type	| communication controller » |
| Vendor 	| Intel » |
| Name	| C620 Series Chipset Family MEI Controller #2 |
| Subsystem	| ASUSTek Computer |

## Kernel Drivers

We have not found a driver for the device in any Linux kernel versions up to **5.16** according to the LKDDb.

## Other Drivers

We have not found a driver for the device in known additional packages.
Status (10)

The device is a part of the following computers: 

[![Intel PCIe failed drivers][1]][1]




  [1]: https://i.stack.imgur.com/8Xs5V.png
