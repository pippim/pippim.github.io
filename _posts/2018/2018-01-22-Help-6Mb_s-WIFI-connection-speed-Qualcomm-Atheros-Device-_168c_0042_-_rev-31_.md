---
layout:       post
title:        >
    Help 6Mb/s WIFI connection speed Qualcomm Atheros Device [168c:0042] (rev 31)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/998636
type:         Answer
tags:         16.04 networking drivers wireless atheros
created_date: 2018-01-22 12:09:40
edit_date:    2018-04-09 00:44:25
votes:        "1 "
favorites:    
views:        "2,104 "
accepted:     Accepted
uploaded:     2022-03-06 17:39:07
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-22-Help-6Mb_s-WIFI-connection-speed-Qualcomm-Atheros-Device-_168c_0042_-_rev-31_.md
toc:          false
navigation:   false
clipboard:    true
---

My connection information also shows 6 Mbps:

``` 
$ iwconfig
enp59s0   no wireless extensions.

lo        no wireless extensions.

wlp60s0   IEEE 802.11  ESSID:"TELUS1213-5G"  
          Mode:Managed  Frequency:5.22 GHz  Access Point: 70:F1:96:42:5F:06   
          Bit Rate=6 Mb/s   Tx-Power=17 dBm   
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=64/70  Signal level=-46 dBm  
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:81   Missed beacon:0
```

However speedtest.net reports almost 60 Mbps throughput:

[![internet speed wifi][1]][1]

Running the same test on an Ethernet adapter rated at 1000 Mbps results in same 60 Mbps Internet download speed. So speed is limited by ISP not by WiFi. Relevant `lspci -vv`:

{% include copyHeader.html %}
``` 
3b:00.0 Ethernet controller: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller (rev 10)
	Subsystem: Device 0707:2400
	Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
	Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
	Latency: 0
	Interrupt: pin A routed to IRQ 16
	Region 0: Memory at dd600000 (64-bit, non-prefetchable) [size=256K]
	Region 2: I/O ports at d000 [size=128]
	Capabilities: <access denied>
	Kernel driver in use: alx
	Kernel modules: alx

3c:00.0 Network controller: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 32)
	Subsystem: Bigfoot Networks, Inc. QCA6174 802.11ac Wireless Network Adapter
	Control: I/O- Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx+
	Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
	Latency: 0
	Interrupt: pin A routed to IRQ 137
	Region 0: Memory at dd200000 (64-bit, non-prefetchable) [size=2M]
	Capabilities: <access denied>
	Kernel driver in use: ath10k_pci
	Kernel modules: ath10k_pci
```

I can't explain why the `iwconfig` speed is so low when the real speed is so high. The same results are obtained from other Linux CLI sources:

``` 
$ iw dev wlp60s0 link
    (... SNIP ...)
	freq: 5220
	RX: 1421503515 bytes (4545343 packets)
	TX: 131449836 bytes (1061284 packets)
	signal: -55 dBm
	tx bitrate: 6.0 MBit/s

	bss flags:	short-preamble short-slot-time
	dtim period:	2
	beacon int:	100

$ iwlist wlp60s0 bitrate
wlp60s0   unknown bit-rate information.
          Current Bit Rate=6 Mb/s
```

  [1]: https://i.stack.imgur.com/oyD90.png
  [2]: {% post_url /2018/2018-01-15-Touchpad-gestures-and-holding-keys-does-not-work %}
