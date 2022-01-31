---
layout:       post
title:        >
    Suddenly Ethernet & WiFi won't co-exist
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1312745
type:         Question
tags:         networking wireless ethernet
created_date: 2021-02-01 15:57:57
edit_date:    2021-02-03 12:26:24
votes:        "2 "
favorites:    
views:        "58 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-02-01-Suddenly-Ethernet-_-WiFi-won_t-co-exist.md
toc:          false
navigation:   false
clipboard:    true
---

I've had the same setting for years in Ubuntu 16.04 LTS. This morning suddenly there was no internet access unless I shut off WiFi. I can only access with either WiFi or Ethernet turned off.

I've rebooted laptop numerous times, run `sudo apt update && sudo apt upgrade`, rebooted router and looked at the router configuration:

[![shaw router.png][1]][1]

The setting "DHCP-Reserved" for the WiFi card stands out. All my IP addresses are static:

{% include copyHeader.html %}
``` 
$ cat /etc/hosts

127.0.0.1	localhost
127.0.1.1	alien

# Add to router static IP address list
192.168.0.10    alien  AW 17R3 WiFi                   9c:b6:d0:10:37:f7
192.168.0.12    alien  AW 17R3 Ethernet               28:f1:0e:2a:1a:ed
192.168.0.11    phone  Moto E4 Plus                   d0:77:14:c8:bc:e5
192.168.0.13    dell   Inspiron 17R-SE-7720 Ethernet  5c:f9:dd:5c:9c:53
192.168.0.14    dell   Inspiron 17R-SE-7720 WiFi      60:6c:66:86:de:bd
192.168.0.15    hs100  Sony TV Wall Light             50:d4:f7:eb:41:35
192.168.0.16    android-47cdabb50f83a5ee  Sony Bravia TV KBL 50W800C
192.168.0.17    hs103  Toshiba 32" TV                 18:4F:32:8D:AA:97

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

Ethernet and Wifi cards:

``` 
$ lspci -v | grep -i net -A6
3b:00.0 Ethernet controller: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller (rev 10)
	Subsystem: Device 0707:2400
	Flags: bus master, fast devsel, latency 0, IRQ 16
	Memory at dd600000 (64-bit, non-prefetchable) [size=256K]
	I/O ports at d000 [size=128]
	Capabilities: <access denied>
	Kernel driver in use: alx
--
3c:00.0 Network controller: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 32)
	Subsystem: Bigfoot Networks, Inc. QCA6174 802.11ac Wireless Network Adapter
	Flags: bus master, fast devsel, latency 0, IRQ 137
	Memory at dd200000 (64-bit, non-prefetchable) [size=2M]
	Capabilities: <access denied>
	Kernel driver in use: ath10k_pci
	Kernel modules: ath10k_pci
```
Not sure routing is relevant but here it is:

``` 
$ route -n

Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.0.1     0.0.0.0         UG    100    0        0 enp59s0
0.0.0.0         192.168.0.1     0.0.0.0         UG    600    0        0 wlp60s0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 enp59s0
192.168.0.0     0.0.0.0         255.255.255.0   U     100    0        0 enp59s0
192.168.0.0     0.0.0.0         255.255.255.0   U     600    0        0 wlp60s0
```


----------

## Edit February 2, 2021

The issue is that DNS lookup doesn't function when both Ethernet and WiFi connected. Internet is available through direct IP addressing. Looking at the router when both Wifi and Ethernet are connected values appear to be changing?

[![shaw router client computers.png][2]][2]

So now I'll go down the DNS rabbit hole...


  [1]: https://i.stack.imgur.com/Pax8x.png
  [2]: https://i.stack.imgur.com/DvwvR.png
