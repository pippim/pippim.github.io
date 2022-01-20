---
layout:       post
title:        >
    Ubuntu (dual boot Windows) Ethernet Not Connecting/Detecting
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/879818
type:         Answer
tags:         16.04 ethernet windows-10
created_date: 2017-02-04 16:54:25
edit_date:    
votes:        "3 "
favorites:    
views:        "16,304 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-04-Ubuntu-^dual-boot-Windows^-Ethernet-Not-Connecting^Detecting.md
toc:          false
navigation:   false
clipboard:    true
---

## The bible of network connection problems

The best place to start is with your favorite bible of network connections like this ([wiki.archlinux.org - Enable WOL in Windows driver][1]) from ArchLinux.

Although there are dozens of things you can try:

{% include copyHeader.html %}
``` 
1 Check the connection 2 Set the hostname
2.1 Local network hostname resolution 3 Device driver
3.1 Check the status
3.2 Load the module 4 Network interfaces
4.1 Device names
4.1.1 Get current device names
4.1.2 Change device name
4.1.3 Reverting to traditional device names
4.2 Set device MTU and queue length
4.3 Enabling and disabling network interfaces 5 Configure the IP address
5.1 Dynamic IP address
5.1.1 systemd-networkd
5.1.2 dhcpcd
5.1.3 dhclient
5.1.4 netctl
5.2 Static IP address
5.2.1 netctl
5.2.2 systemd-networkd
5.2.3 dhcpcd
5.2.4 Manual assignment
5.2.5 Calculating addresses 6 Tips and tricks
6.1 ifplugd for laptops
6.2 Bonding or LAG
6.3 IP address aliasing
6.3.1 Example
6.4 Change MAC/hardware address
6.5 Internet sharing
6.6 Router configuration
6.7 Promiscuous mode 7 Troubleshooting
7.1 Swapping computers on the cable modem
7.2 The TCP window scaling problem
7.2.1 How to diagnose the problem
7.2.2 Ways of fixing it
7.2.2.1 Bad
7.2.2.2 Good
7.2.2.3 Best
7.2.3 More about it
7.3 Realtek no link / WOL problem
7.3.1 Enable the NIC directly in Linux
7.3.2 Rollback/change Windows driver
7.3.3 Enable WOL in Windows driver
7.3.4 Newer Realtek Linux driver
7.3.5 Enable LAN Boot ROM in BIOS/CMOS
7.4 No interface with Atheros chipsets
7.5 Broadcom BCM57780
7.6 Realtek RTL8111/8168B
7.7 Gigabyte Motherboard with Realtek 8111/8168/8411 8 See also
```

We'll start with the most likely based on limited information given that the network card works in Windows but not Ubuntu. This is outlined in the next section.

## Windows disables NIC (Network Interface Card) on shutdown

When a BIOS feature known as ***Wake on LAN (WOL)*** is disabled your NIC will have no blinking LED's indicating connection and no connection to your router. Windows can disable your NIC on shutdown. To prevent this from happening on Realtek cards under Windows XP (example) use:

``` 
Right click my computer and choose "Properties"
--> "Hardware" tab   --> Device Manager
 --> Network Adapters
  --> "double click" Realtek ...
   --> Advanced tab
    --> Wake-On-Lan After Shutdown
     --> Enable
```

This may not solve the OP problem because exact details are not given. However there is a high degree of confidence that one of the other solutions on this web page will solve the problem.

  [1]: https://wiki.archlinux.org/index.php/Network_configuration#Enable_WOL_in_Windows_driver
