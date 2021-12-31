---
layout:       post
title:        >
    Cannot connect to g∕n wifi networks - is my driver the issue?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1100218
type:         Answer
tags:         networking drivers 18.04 dell xps
created_date: !!str "2018-12-12 05:06:26"
edit_date:    !!str "2018-12-16 16:51:49"
votes:        !!str "2"
favorites:    
views:        !!str "243"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    true
---

I have the same Wifi Card:

``` 
*-network
   description: Wireless interface
   product: QCA6174 802.11ac Wireless Network Adapter
   vendor: Qualcomm Atheros
   physical id: 0
   bus info: pci@0000:3c:00.0
   logical name: wlp60s0
   version: 32
   serial: 9c:b6:d0:10:37:f7
   width: 64 bits
   clock: 33MHz
   capabilities: pm msi pciexpress bus_master cap_list ethernet physical wireless
   configuration: broadcast=yes driver=ath10k_pci driverversion=4.14.78-041478-generic firmware=WLAN.RM.4.4.1-00079-QCARMSWPZ-1 ip=192.168.1.68 latency=0 link=yes multicast=yes wireless=IEEE 802.11
   resources: irq:138 memory:dd200000-dd3fffff

```

It's using the same driver but compiled for an older kernel:

``` 
driver=ath10k_pci driverversion=4.14.78-041478-generic firmware=WLAN.RM.4.4.1-00079-QCARMSWPZ-1

```

Your firmware is also identical:

``` 
firmware=WLAN.RM.4.4.1-00079-QCARMSWPZ-1

```

To answer your question, AFAIK there isn't a newer driver you can use.

You can use this command however to check for errors:

``` 
$ lspci -nnk | grep -iA2 net; dmesg | grep ath10k

```

{% include copyHeader.html %}
``` 
3b:00.0 Ethernet controller [0200]: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller [1969:e0a1] (rev 10)
	Subsystem: Device [0707:2400]
	Kernel driver in use: alx
--
3c:00.0 Network controller [0280]: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter [168c:003e] (rev 32)
	Subsystem: Bigfoot Networks, Inc. QCA6174 802.11ac Wireless Network Adapter [1a56:1535]
	Kernel driver in use: ath10k_pci
	Kernel modules: ath10k_pci
[    4.900039] ath10k_pci 0000:3c:00.0: enabling device (0000 -> 0002)
[    4.902213] ath10k_pci 0000:3c:00.0: pci irq msi oper_irq_mode 2 irq_mode 0 reset_mode 0
[    5.182837] ath10k_pci 0000:3c:00.0: Direct firmware load for ath10k/pre-cal-pci-0000:3c:00.0.bin failed with error -2
[    5.182859] ath10k_pci 0000:3c:00.0: Direct firmware load for ath10k/cal-pci-0000:3c:00.0.bin failed with error -2
[    5.183793] ath10k_pci 0000:3c:00.0: qca6174 hw3.2 target 0x05030000 chip_id 0x00340aff sub 1a56:1535
[    5.183794] ath10k_pci 0000:3c:00.0: kconfig debug 0 debugfs 1 tracing 1 dfs 0 testmode 0
[    5.184283] ath10k_pci 0000:3c:00.0: firmware ver WLAN.RM.4.4.1-00079-QCARMSWPZ-1 api 6 features wowlan,ignore-otp crc32 fd869beb
[    5.248062] ath10k_pci 0000:3c:00.0: board_file api 2 bmi_id N/A crc32 20d869c3
[    5.827014] ath10k_pci 0000:3c:00.0: Unknown eventid: 118809
[    5.829857] ath10k_pci 0000:3c:00.0: Unknown eventid: 90118
[    5.830504] ath10k_pci 0000:3c:00.0: htt-ver 3.47 wmi-op 4 htt-op 3 cal otp max-sta 32 raw 0 hwcrypto 1
[    5.963736] ath10k_pci 0000:3c:00.0 wlp60s0: renamed from wlan0
[    7.607819] ath10k_pci 0000:3c:00.0: Unknown eventid: 118809
[    7.610805] ath10k_pci 0000:3c:00.0: Unknown eventid: 90118
[ 1032.858110] Modules linked in: ccm rfcomm nvram msr hid_logitech_dj pci_stub vboxpci(OE) vboxnetadp(OE) vboxnetflt(OE) vboxdrv(OE) bbswitch(OE) bnep usblp nls_iso8859_1 arc4 uvcvideo btusb btrtl btbcm videobuf2_vmalloc btintel videobuf2_memops bluetooth videobuf2_v4l2 videobuf2_core videodev media ecdh_generic intel_rapl x86_pkg_temp_thermal intel_powerclamp coretemp snd_hda_codec_hdmi dell_wmi dell_smbios dcdbas wmi_bmof sparse_keymap mxm_wmi snd_hda_codec_ca0132 ath10k_pci kvm_intel kvm snd_hda_intel irqbypass snd_hda_codec ath10k_core snd_hda_core snd_hwdep snd_pcm crct10dif_pclmul crc32_pclmul ath ghash_clmulni_intel snd_seq_midi pcbc snd_seq_midi_event mac80211 snd_rawmidi snd_seq snd_seq_device cfg80211 nvidia_uvm(POE) snd_timer rtsx_pci_ms aesni_intel memstick aes_x86_64 joydev input_leds
[ 3585.443387] ath10k_pci 0000:3c:00.0: Unknown eventid: 118809
[ 3585.446346] ath10k_pci 0000:3c:00.0: Unknown eventid: 90118
[ 8863.625325] ath10k_pci 0000:3c:00.0: Unknown eventid: 118809
[ 8863.628239] ath10k_pci 0000:3c:00.0: Unknown eventid: 90118

```

Please **Update** your question with the results of:

``` 
lspci -nnk | grep -iA2 net; dmesg | grep ath10k

```


----------

There is a four year old on-going bug report with 350 posts. It has solutions for compiling the latest `ath10k_pci` patches: [Atheros Qualcomm Killer N1525 Wireless-AC \[168c:003e\] is not supported][1]


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1383184
