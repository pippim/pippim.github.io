---
layout:       post
title:        >
    Long kernel load time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164705
type:         Answer
tags:         boot 18.04 kernel performance systemd
created_date: 2019-08-10 00:24:17
edit_date:    2019-08-10 14:59:18
votes:        "2 "
favorites:    
views:        "438 "
accepted:     
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    true
---

> How can I troubleshoot this?  

<!-- Language-all: lang-sh -->

The first step is to find out what PCI device is generating the error:

>     pcieport 0000:04:00.0: Refused to change power state, currently in D3  

My system doesn't have a `0000:04:00.0` but it does have `0000:03:00.0` so I would use:

{% include copyHeader.html %}
``` 
$ cd /sys/bus/pci/devices/0000:03:00.0

$ ls -la
total 0
drwxr-xr-x 5 root root    0 Aug  8 17:15 .
drwxr-xr-x 8 root root    0 Aug  8 17:15 ..
drwxr-xr-x 3 root root    0 Aug  9 17:53 0000:03:00.0:pcie208
-rw-r--r-- 1 root root 4096 Aug  9 17:53 broken_parity_status
-r--r--r-- 1 root root 4096 Aug  8 17:15 class
-rw-r--r-- 1 root root 4096 Aug  8 17:15 config
-r--r--r-- 1 root root 4096 Aug  9 17:53 consistent_dma_mask_bits
-r--r--r-- 1 root root 4096 Aug  9 17:53 current_link_speed
-r--r--r-- 1 root root 4096 Aug  9 17:53 current_link_width
-rw-r--r-- 1 root root 4096 Aug  9 17:53 d3cold_allowed
-r--r--r-- 1 root root 4096 Aug  8 17:15 device
-r--r--r-- 1 root root 4096 Aug  9 17:53 dma_mask_bits
lrwxrwxrwx 1 root root    0 Aug  8 17:15 driver -> ../../../../../bus/pci/drivers/pcieport
-rw-r--r-- 1 root root 4096 Aug  9 17:53 driver_override
-rw-r--r-- 1 root root 4096 Aug  9 17:53 enable
-r--r--r-- 1 root root 4096 Aug  8 17:15 irq
-r--r--r-- 1 root root 4096 Aug  9 17:53 local_cpulist
-r--r--r-- 1 root root 4096 Aug  9 17:53 local_cpus
-r--r--r-- 1 root root 4096 Aug  9 17:53 max_link_speed
-r--r--r-- 1 root root 4096 Aug  9 17:53 max_link_width
-r--r--r-- 1 root root 4096 Aug  9 17:53 modalias
-rw-r--r-- 1 root root 4096 Aug  9 17:53 msi_bus
-rw-r--r-- 1 root root 4096 Aug  9 17:53 numa_node
drwxr-xr-x 3 root root    0 Aug  9 17:53 pci_bus
drwxr-xr-x 2 root root    0 Aug  8 17:15 power
--w--w---- 1 root root 4096 Aug  9 17:53 remove
--w--w---- 1 root root 4096 Aug  9 17:53 rescan
-r--r--r-- 1 root root 4096 Aug  8 17:15 resource
-r--r--r-- 1 root root 4096 Aug  9 17:53 revision
-r--r--r-- 1 root root 4096 Aug  9 17:53 secondary_bus_number
-r--r--r-- 1 root root 4096 Aug  9 17:53 subordinate_bus_number
lrwxrwxrwx 1 root root    0 Aug  9 17:53 subsystem -> ../../../../../bus/pci
-r--r--r-- 1 root root 4096 Aug  9 17:53 subsystem_device
-r--r--r-- 1 root root 4096 Aug  9 17:53 subsystem_vendor
-rw-r--r-- 1 root root 4096 Aug  9 17:53 uevent
-r--r--r-- 1 root root 4096 Aug  8 17:15 vendor

$ cat vendor
0x8086

$ cat device
0x1576

$ cat class
0x060400

$ cat max_link_speed
2.5 GT/s

$ cat max_link_width
4

$ lspci -n | tail -8
03:00.0 0604: 8086:1576
03:01.0 0604: 8086:1576
03:02.0 0604: 8086:1576
39:00.0 0c03: 8086:15b5
3b:00.0 0200: 1969:e0a1 (rev 10)
3c:00.0 0280: 168c:003e (rev 32)
3d:00.0 ff00: 10ec:5227 (rev 01)
3e:00.0 0108: 144d:a804

$ lspci | tail -8
03:00.0 PCI bridge: Intel Corporation DSL6340 Thunderbolt 3 Bridge [Alpine Ridge 2C 2015]
03:01.0 PCI bridge: Intel Corporation DSL6340 Thunderbolt 3 Bridge [Alpine Ridge 2C 2015]
03:02.0 PCI bridge: Intel Corporation DSL6340 Thunderbolt 3 Bridge [Alpine Ridge 2C 2015]
39:00.0 USB controller: Intel Corporation DSL6340 USB 3.1 Controller [Alpine Ridge]
3b:00.0 Ethernet controller: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller (rev 10)
3c:00.0 Network controller: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 32)
3d:00.0 Unassigned class [ff00]: Realtek Semiconductor Co., Ltd. RTS5227 PCI Express Card Reader (rev 01)
3e:00.0 Non-Volatile memory controller: Samsung Electronics Co Ltd NVMe SSD Controller SM961/PM961

```

If my system had the error then it would be caused by the Thunderbolt subsystem and I might just start by unplugging my Thunderbolt DPI to HDMI adapter.

In your case replace `0000:03:00.0` with `0000:04:00.0` above. Adjust `tail` number of lines as necessary.

This is the first step in trouble shooting. 

Credit: - [Decoding PCI data and lspci output on Linux hosts][1]

----------

**Solution**: It was Intel SpeedStep located at `0000:04:00.0` and enabling it in BIOS removes 30 second boot delay.

  [1]: https://prefetch.net/articles/linuxpci.html


