---
layout:       post
title:        >
    Bluetooth does not turn on
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159949
type:         Answer
tags:         18.04 bluetooth
created_date: 2019-07-21 16:48:43
edit_date:    2019-07-22 15:35:47
votes:        "1 "
favorites:    
views:        "1,085 "
accepted:     Accepted
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-21-Bluetooth-does-not-turn-on.md
toc:          false
navigation:   false
clipboard:    true
---

## Long standing bug report

Three is a Launch Pad bug report on this WiFi card since 2013:

- [Ralink RT3290 doesn't have a bluetooth driver][1]

I suggest you subscribe to the bug report because the more people that do the quicker the bug gets solved. Also subscribe to the email chain for status updates.

There are too many fixes listed in **Ask Ubuntu** to pick a single one that will work for you. Here are the various questions you can check on the RT3290 though:

- [Ralink RT 3290 Bluetooth Problem on Ubuntu 14.04](Ralink RT 3290 Bluetooth Problem on Ubuntu 14.04)
- [RT3290 Ralink driver in Ubuntu](RT3290 Ralink driver in Ubuntu)
- [Ralink RT 3290 Bluetooth Problem on Ubuntu 16.04](Ralink RT 3290 Bluetooth Problem on Ubuntu 16.04)

## How to get WiFi Information

There is a diagnostics script you can run to [analyze all things WiFi][2]:

``` 
wget -N -t 5 -T 10 https://github.com/UbuntuForums/wireless-info/raw/master/wireless-info
chmod +x wireless-info
./wireless-info

```

It will create the file `wireless-info.txt` at which point you will need to use:

- `gedit wireless-info.txt`
- Highlight text from top of file to `route` section
- Copy selected text to clipboard with <kbd>Ctrl</kbd>+<kbd>C</kbd>
- Edit your question above and position cursor to bottom
- Press <kbd>Enter</kbd> to insert new line if necessary
- Paste text from clipboard with <kbd>Ctrl</kbd>+<kbd>V</kbd>
- Highlight inserted text (it will take awhile) and press `{}` button to reformat text to code.

Now the bottom of your question will look something like this:

{% include copyHeader.html %}
``` 
########## wireless info START ##########

Report from: 21 Jul 2019 10:42 MDT -0600

Booted last: 21 Jul 2019 00:00 MDT -0600

Script from: 22 Oct 2018 03:34 UTC +0000

##### release ###########################

Distributor ID:	Ubuntu
Description:	Ubuntu 16.04.6 LTS
Release:	16.04
Codename:	xenial

##### kernel ############################

Linux 4.14.114-0414114-generic #201904270558 SMP Sat Apr 27 10:01:11 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux

Parameters: ro, noplymouth, fastboot, acpiphp.disable=1, pcie_aspm=force, vt.handoff=7, i915.fastboot=1, nopti, nospectre_v2, nospec, mem_sleep_default=deep

##### desktop ###########################

Ubuntu

##### lspci #############################

3b:00.0 Ethernet controller [0200]: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller [1969:e0a1] (rev 10)
	Subsystem: Device [0707:2400]
	Kernel driver in use: alx

3c:00.0 Network controller [0280]: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter [168c:003e] (rev 32)
	Subsystem: Bigfoot Networks, Inc. QCA6174 802.11ac Wireless Network Adapter [1a56:1535]
	Kernel driver in use: ath10k_pci

##### lsusb #############################

Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 003: ID 2109:0812 VIA Labs, Inc. VL812 Hub
Bus 002 Device 002: ID 2109:0812 VIA Labs, Inc. VL812 Hub
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 007: ID 1bcf:2b8c Sunplus Innovation Technology Inc. 
Bus 001 Device 005: ID 0cf3:e301 Atheros Communications, Inc. 
Bus 001 Device 003: ID 187c:0528 Alienware Corporation 
Bus 001 Device 011: ID 046d:c52b Logitech, Inc. Unifying Receiver
Bus 001 Device 010: ID 2109:2812 VIA Labs, Inc. VL812 Hub
Bus 001 Device 008: ID 413c:9016 Dell Computer Corp. 
Bus 001 Device 006: ID 0764:0501 Cyber Power System, Inc. CP1500 AVR UPS
Bus 001 Device 004: ID 04f9:024a Brother Industries, Ltd 
Bus 001 Device 002: ID 2109:2812 VIA Labs, Inc. VL812 Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

##### PCMCIA card info ##################

##### rfkill ############################

0: dell-rbtn: Wireless LAN
	Soft blocked: no
	Hard blocked: no
1: phy0: Wireless LAN
	Soft blocked: no
	Hard blocked: no
8: hci0: Bluetooth
	Soft blocked: yes
	Hard blocked: no

##### secure boot #######################

SecureBoot disabled

##### lsmod #############################

dell_wmi               16384  0
dell_smbios            16384  1 dell_wmi
wmi_bmof               16384  0
sparse_keymap          16384  1 dell_wmi
mxm_wmi                16384  0
ath10k_pci             53248  0
ath10k_core           417792  1 ath10k_pci
ath                    32768  1 ath10k_core
mac80211              925696  1 ath10k_core
cfg80211              733184  3 ath,mac80211,ath10k_core
wmi                    28672  3 dell_wmi,wmi_bmof,mxm_wmi
video                  45056  2 dell_wmi,i915

##### interfaces ########################

[/etc/network/interfaces]
auto lo
iface lo inet loopback

##### ifconfig ##########################

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback <MAC address> brd <MAC address>
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp59s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether <MAC 'enp59s0' [IF1]> brd <MAC address>
    inet 192.168.1.67/24 brd 192.168.1.255 scope global dynamic enp59s0
       valid_lft 82088sec preferred_lft 82088sec
    inet6 2001:56a:f117:600:11c1:654b:3cc9:3a43/64 scope global temporary dynamic 
       valid_lft 14655sec preferred_lft 14355sec
    inet6 2001:56a:f117:600:fcf0:956d:fa78:8f6/64 scope global mngtmpaddr noprefixroute dynamic 
       valid_lft 14655sec preferred_lft 14355sec
    inet6 fe80::1cd:2767:f2be:8f60/64 scope link 
       valid_lft forever preferred_lft forever
3: wlp60s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether <MAC 'wlp60s0' [IF2]> brd <MAC address>
    inet 192.168.1.68/24 brd 192.168.1.255 scope global dynamic wlp60s0
       valid_lft 82093sec preferred_lft 82093sec
    inet6 2001:56a:f117:600:c57b:316a:703d:9d66/64 scope global temporary dynamic 
       valid_lft 14655sec preferred_lft 14355sec
    inet6 2001:56a:f117:600:e0a7:e80e:e5d1:5853/64 scope global mngtmpaddr noprefixroute dynamic 
       valid_lft 14655sec preferred_lft 14355sec
    inet6 fe80::5b43:df9d:7566:888/64 scope link 
       valid_lft forever preferred_lft forever

##### iwconfig ##########################

enp59s0   no wireless extensions.

lo        no wireless extensions.

wlp60s0   IEEE 802.11  ESSID:"TELUS1213-5G"  
          Mode:Managed  Frequency:5.56 GHz  Access Point: <MAC 'TELUS1213-5G' [AN10]>   
          Bit Rate=6 Mb/s   Tx-Power=24 dBm   
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=70/70  Signal level=-40 dBm  
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:88   Missed beacon:0

##### route #############################

```


  [1]: https://bugs.launchpad.net/bluetooth/+bug/1189721
  [2]: https://github.com/UbuntuForums/wireless-info
