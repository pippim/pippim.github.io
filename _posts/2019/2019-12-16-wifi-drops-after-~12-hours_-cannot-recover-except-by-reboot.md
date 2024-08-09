---
layout:       post
title:        >
    wifi drops after ~12 hours, cannot recover except by reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196576
type:         Answer
tags:         18.04 wireless
created_date: 2019-12-16 16:06:48
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-09 16:47:37
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-16-wifi-drops-after-~12-hours_-cannot-recover-except-by-reboot.md
toc:          false
navigation:   false
clipboard:    false
---

You can remove and reinsert the WiFi driver rather than rebooting:

``` 
/sbin/modprobe -v -r iwldvm # This removes iwlwifi too
/sbin/modprobe -v iwlwifi   # This starts iwldvm too
systemctl restart NetworkManager.service
```

The last line is optional and you can save time if it's not needed. The above commands are for an Intel WiFi card. To get a list of your WiFi drivers use:

<pre><code>
$ sudo lshw -C network
  *-network               
``` 
   description: Ethernet interface
   product: Killer E2400 Gigabit Ethernet Controller
   vendor: Qualcomm Atheros
   physical id: 0
   bus info: pci@0000:3b:00.0
   logical name: enp59s0
   version: 10
   serial: 28:f1:0e:2a:1a:ed
   size: 1Gbit/s
   capacity: 1Gbit/s
   width: 64 bits
   clock: 33MHz
   capabilities: pm pciexpress msi msix bus_master cap_list ethernet physical tp 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd autonegotiation
   configuration: autonegotiation=on broadcast=yes driver=alx duplex=full ip=192.168.0.12 latency=0 link=yes multicast=yes port=twisted pair speed=1Gbit/s
   resources: irq:16 memory:dd600000-dd63ffff ioport:d000(size=128)
```
  *-network
``` 
   description: Wireless interface
   product: <b>QCA6174 802.11ac Wireless Network Adapter</b>
   vendor: Qualcomm Atheros
   physical id: 0
   bus info: pci@0000:3c:00.0
   logical name: wlp60s0
   version: 32
   serial: 9c:b6:d0:10:37:f7
   width: 64 bits
   clock: 33MHz
   capabilities: pm msi pciexpress bus_master cap_list ethernet physical wireless
   configuration: broadcast=yes driver=<b>ath10k_pci</b> driverversion=4.14.153-0414153-generic firmware=WLAN.RM.4.4.1-00079-QCARMSWPZ-1 ip=192.168.0.10 latency=0 link=yes multicast=yes wireless=IEEE 802.11
   resources: irq:137 memory:dd200000-dd3fffff
```
</code></pre>

Notice the the WiFi information above in **bold**.

Then see if what is tied to the driver:

``` 
$ lsmod | grep ath10k_pci
ath10k_pci             53248  0
ath10k_core           417792  1 ath10k_pci
```

In this case all we need to do is remove `ath10k_pci` driver and reload it.

``` 
$ sudo modprobe -r -v ath10k_pci
rmmod ath10k_pci
rmmod ath10k_core
rmmod mac80211
rmmod ath
rmmod cfg80211

$ lsmod | grep ath10k_pci # Nothing appears so we've successfully removed driver!

$ sudo modprobe -v ath10k_pci
insmod /lib/modules/4.14.153-0414153-generic/kernel/net/wireless/cfg80211.ko 
insmod /lib/modules/4.14.153-0414153-generic/kernel/net/mac80211/mac80211.ko 
insmod /lib/modules/4.14.153-0414153-generic/kernel/drivers/net/wireless/ath/ath.ko 
insmod /lib/modules/4.14.153-0414153-generic/kernel/drivers/net/wireless/ath/ath10k/ath10k_core.ko 
insmod /lib/modules/4.14.153-0414153-generic/kernel/drivers/net/wireless/ath/ath10k/ath10k_pci.ko 
```
