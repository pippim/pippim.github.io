---
layout:       post
title:        >
    How to check (via software) if my usb 3.1gen2 Type-C port supports Thunderbolt3?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/985074
type:         Answer
tags:         usb thunderbolt
created_date: 2017-12-10 23:12:08
edit_date:    2020-06-12 14:37:07
votes:        "13 "
favorites:    
views:        "23,930 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-10-How-to-check-^via-software^-if-my-usb-3.1gen2-Type-C-port-supports-Thunderbolt3^.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Thunderbolt 3

My system has Thunderbolt 3, USB 3.1 Gen 2 Type-C jack. I use it to drive a second HDMI TV through a DisplayPort to HDMI adapter.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## lsusb -t

{% include copyHeader.html %}
``` 
$ lsusb -t
/:  Bus 04.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/2p, 10000M
/:  Bus 03.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/2p, 480M
/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/8p, 5000M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 5000M
        |__ Port 4: Dev 3, If 0, Class=Hub, Driver=hub/4p, 5000M
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/16p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 1: Dev 4, If 1, Class=Vendor Specific Class, Driver=, 480M
        |__ Port 1: Dev 4, If 0, Class=Printer, Driver=usblp, 480M
        |__ Port 4: Dev 6, If 0, Class=Hub, Driver=hub/4p, 480M
            |__ Port 4: Dev 10, If 0, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 3: Dev 8, If 0, Class=Vendor Specific Class, Driver=usbfs, 480M
    |__ Port 4: Dev 3, If 0, Class=Human Interface Device, Driver=usbhid, 12M
    |__ Port 5: Dev 5, If 1, Class=Wireless, Driver=btusb, 12M
    |__ Port 5: Dev 5, If 0, Class=Wireless, Driver=btusb, 12M
    |__ Port 7: Dev 7, If 0, Class=Video, Driver=uvcvideo, 480M
    |__ Port 7: Dev 7, If 1, Class=Video, Driver=uvcvideo, 480M
    |__ Port 9: Dev 9, If 0, Class=Human Interface Device, Driver=usbhid, 12M
    |__ Port 9: Dev 9, If 1, Class=Human Interface Device, Driver=usbhid, 12M
    |__ Port 9: Dev 9, If 2, Class=Human Interface Device, Driver=usbhid, 12M
```

Notice the speed of `10000M` which doesn't appear on your display.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Bottom of `sudo lshw | grep -A10 -i usb`

{% include copyHeader.html %}
``` 
                 *-usb
                      description: USB controller
                      product: Intel Corporation
                      vendor: Intel Corporation
                      physical id: 0
                      bus info: pci@0000:39:00.0
                      version: 00
                      width: 32 bits
                      clock: 33MHz
                      capabilities: pm msi pciexpress xhci bus_master cap_list
                      configuration: driver=xhci_hcd latency=0
                      resources: irq:123 memory:d9f00000-d9f0ffff
                    *-usbhost:0
                         product: xHCI Host Controller
                         vendor: Linux 4.14.4-041404-generic xhci-hcd
                         physical id: 0
                         bus info: usb@3
                         logical name: usb3
                         version: 4.14
                         capabilities: usb-2.00
                         configuration: driver=hub slots=2 speed=480Mbit/s
                    *-usbhost:1
                         product: xHCI Host Controller
                         vendor: Linux 4.14.4-041404-generic xhci-hcd
                         physical id: 1
                         bus info: usb@4
                         logical name: usb4
                         version: 4.14
                         capabilities: usb-3.10
                         configuration: driver=hub slots=2 speed=10000Mbit/s
```

Notice the last line `speed=10000Mbit/s`.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Summary

It appears you do not have Thunderbolt 3 nor USB 3.1 Generation 2. You have USB 3.1 Type C Generation 1.0 which is 5 Gbps (480 MB/s) the same speed as USB 3.0.

The best way to find out is to look for the "thunderbolt" picture next to the USB Type-C jack on your computer. However even then it might only be two PCIe lanes and not four (according to some websites I read tonight).


----------


# Look at PCIe for more information

## PCIe tree

{% include copyHeader.html %}
``` 
$ lspci -tv
-[0000:00]-+-00.0  Intel Corporation Sky Lake Host Bridge/DRAM Registers
           +-01.0-[01]--+-00.0  NVIDIA Corporation GM204M [GeForce GTX 970M]
           |            \-00.1  NVIDIA Corporation GM204 High Definition Audio Controller
           +-02.0  Intel Corporation Skylake Integrated Graphics
           +-04.0  Intel Corporation Skylake Processor Thermal Subsystem
           +-14.0  Intel Corporation Sunrise Point-H USB 3.0 xHCI Controller
           +-14.2  Intel Corporation Sunrise Point-H Thermal subsystem
           +-16.0  Intel Corporation Sunrise Point-H CSME HECI #1
           +-17.0  Intel Corporation Sunrise Point-H SATA Controller [AHCI mode]
           +-1c.0-[02-3a]----00.0-[03-3a]--+-00.0-[04]--
           |                               +-01.0-[05-38]--
           |                               \-02.0-[39]----00.0  Intel Corporation DSL6340 USB 3.1 Controller [Alpine Ridge]
           +-1c.4-[3b]----00.0  Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller
           +-1c.5-[3c]----00.0  Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter
           +-1c.6-[3d]----00.0  Realtek Semiconductor Co., Ltd. RTS5227 PCI Express Card Reader
           +-1d.0-[3e]----00.0  Samsung Electronics Co Ltd NVMe SSD Controller SM961/PM961
           +-1f.0  Intel Corporation Sunrise Point-H LPC Controller
           +-1f.2  Intel Corporation Sunrise Point-H PMC
           +-1f.3  Intel Corporation Sunrise Point-H HD Audio
           \-1f.4  Intel Corporation Sunrise Point-H SMBus
```

Looking at the details below we see nVidia GPU can take a maximum of 16 PCIe lanes at Gen 3.0 speeds but, is currently using 8 lanes. NVMe M.2 Samsung SSD is taking 4 PCIe lanes at Gen 3.0 speeds. Others devices at taking 1 PCIe lane at Gen 3.0 speeds or less.

Device 1c.0 -02 looks like it may serve the Thunderbolt3 taking 4 PCIe lanes at Gen 3.0 speeds. The description above reads "Alpine Ridge". However when you run `sudo lspci -tv` the description changes:

``` 
   +-1c.0-[02-3a]----00.0-[03-3a]--+-00.0-[04]--
   |                               +-01.0-[05-38]--
   |                               \-02.0-[39]----00.0  Intel Corporation Device 15b5
```

**When you google `15b5` it confirms it's the Intel Thunderbolt 3!**

There is other interesting information below such as nVidia power limit of 75 Watts. Ethernet and WiFi power limit of 10 watts but yet SSD has a limit of 25 watts which seems high. The Thunderbolt3 power limit is 25 watts which makes sense for charging devices.

The report below had to be truncated heavily because it won't fit into Ask Ubuntu 30KB message maximum size. I left in the relevant details which I hope complements the tree printout above.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## Partial contents of `sudo lspci -vv` (73 kb initially):
{% include copyHeader.html %}
``` 

00:00.0 Host bridge: Intel Corporation Sky Lake Host Bridge/DRAM Registers (rev 07)
    Subsystem: Dell Skylake Host Bridge/DRAM Registers
    Control: I/O- Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
    Status: Cap+ 66MHz- UDF- FastB2B+ ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort+ >SERR- <PERR- INTx-
    Latency: 0
    Capabilities: [e0] Vendor Specific Information: Len=10 <?>
    Kernel driver in use: skl_uncore

00:01.0 PCI bridge: Intel Corporation Sky Lake PCIe Controller (x16) (rev 07) (prog-if 00 [Normal decode])

    (...SNIP...)

    Capabilities: [88] Subsystem: Dell Skylake PCIe Controller (x16)
    Capabilities: [80] Power Management version 3

    (...SNIP...)

        LnkCap: Port #2, Speed 8GT/s, Width x16, ASPM L0s L1, Exit Latency L0s <256ns, L1 <8us

    (...SNIP...)

            Slot #1, PowerLimit 75.000W; Interlock- NoCompl+

    (...SNIP...)

    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:02.0 VGA compatible controller: Intel Corporation Skylake Integrated Graphics (rev 06) (prog-if 00 [VGA controller])
    DeviceName:  Onboard IGD
    Subsystem: Dell Skylake Integrated Graphics

    (...SNIP...)

    Kernel driver in use: i915
    Kernel modules: i915

00:04.0 Signal processing controller: Intel Corporation Skylake Processor Thermal Subsystem (rev 07)
    Subsystem: Dell Skylake Processor Thermal Subsystem

    (...SNIP...)

    Kernel driver in use: proc_thermal
    Kernel modules: processor_thermal_device

00:14.0 USB controller: Intel Corporation Sunrise Point-H USB 3.0 xHCI Controller (rev 31) (prog-if 30 [XHCI])
    Subsystem: Dell Sunrise Point-H USB 3.0 xHCI Controller

    (...SNIP...)

    Kernel driver in use: xhci_hcd

00:14.2 Signal processing controller: Intel Corporation Sunrise Point-H Thermal subsystem (rev 31)
    Subsystem: Dell Sunrise Point-H Thermal subsystem

    (...SNIP...)

    Kernel driver in use: intel_pch_thermal
    Kernel modules: intel_pch_thermal

00:16.0 Communication controller: Intel Corporation Sunrise Point-H CSME HECI #1 (rev 31)
    Subsystem: Dell Sunrise Point-H CSME HECI

    (...SNIP...)

    Kernel driver in use: mei_me
    Kernel modules: mei_me

00:17.0 SATA controller: Intel Corporation Sunrise Point-H SATA Controller [AHCI mode] (rev 31) (prog-if 01 [AHCI 1.0])
    Subsystem: Dell Sunrise Point-H SATA Controller [AHCI mode]

    (...SNIP...)

    Kernel driver in use: ahci
    Kernel modules: ahci

00:1c.0 PCI bridge: Intel Corporation Sunrise Point-H PCI Express Root Port #1 (rev f1) (prog-if 00 [Normal decode])
    Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
    Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
    Latency: 0
    Interrupt: pin A routed to IRQ 16
    Bus: primary=00, secondary=02, subordinate=3a, sec-latency=0
    I/O behind bridge: 00002000-00002fff
    Memory behind bridge: c4000000-da0fffff
    Prefetchable memory behind bridge: 0000000080000000-00000000a1ffffff
    Secondary status: 66MHz- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort+ <SERR- <PERR-
    BridgeCtl: Parity- SERR- NoISA- VGA- MAbort- >Reset- FastB2B-
        PriDiscTmr- SecDiscTmr- DiscTmrStat- DiscTmrSERREn-
    Capabilities: [40] Express (v2) Root Port (Slot+), MSI 00
        DevCap: MaxPayload 256 bytes, PhantFunc 0
            ExtTag- RBE+
        DevCtl: Report errors: Correctable- Non-Fatal- Fatal- Unsupported-
            RlxdOrd- ExtTag- PhantFunc- AuxPwr- NoSnoop-
            MaxPayload 128 bytes, MaxReadReq 128 bytes
        DevSta: CorrErr- UncorrErr- FatalErr- UnsuppReq- AuxPwr+ TransPend-
        LnkCap: Port #1, Speed 8GT/s, Width x4, ASPM not supported, Exit Latency L0s unlimited, L1 <16us
            ClockPM- Surprise- LLActRep+ BwNot+ ASPMOptComp+
        LnkCtl: ASPM Disabled; RCB 64 bytes Disabled- CommClk-
            ExtSynch- ClockPM- AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 8GT/s, Width x4, TrErr- Train- SlotClk+ DLActive+ BWMgmt+ ABWMgmt-
        SltCap: AttnBtn- PwrCtrl- MRL- AttnInd- PwrInd- HotPlug+ Surprise+
            Slot #4, PowerLimit 25.000W; Interlock- NoCompl+
        SltCtl: Enable: AttnBtn- PwrFlt- MRL- PresDet+ CmdCplt- HPIrq- LinkChg-
            Control: AttnInd Unknown, PwrInd Unknown, Power- Interlock-
        SltSta: Status: AttnBtn- PowerFlt- MRL- CmdCplt- PresDet+ Interlock-
            Changed: MRL- PresDet- LinkState-
        RootCtl: ErrCorrectable- ErrNon-Fatal- ErrFatal- PMEIntEna- CRSVisible-
        RootCap: CRSVisible-
        RootSta: PME ReqID 0000, PMEStatus- PMEPending-
        DevCap2: Completion Timeout: Range ABC, TimeoutDis+, LTR-, OBFF Not Supported ARIFwd+
        DevCtl2: Completion Timeout: 50us to 50ms, TimeoutDis-, LTR-, OBFF Disabled ARIFwd-
        LnkCtl2: Target Link Speed: 8GT/s, EnterCompliance- SpeedDis-
             Transmit Margin: Normal Operating Range, EnterModifiedCompliance- ComplianceSOS-
             Compliance De-emphasis: -6dB
        LnkSta2: Current De-emphasis Level: -3.5dB, EqualizationComplete+, EqualizationPhase1+
             EqualizationPhase2+, EqualizationPhase3+, LinkEqualizationRequest-
    Capabilities: [80] MSI: Enable- Count=1/1 Maskable- 64bit-
        Address: 00000000  Data: 0000
    Capabilities: [90] Subsystem: Dell Sunrise Point-H PCI Express Root Port
    Capabilities: [a0] Power Management version 3
        Flags: PMEClk- DSI- D1- D2- AuxCurrent=0mA PME(D0+,D1-,D2-,D3hot+,D3cold+)
        Status: D0 NoSoftRst- PME-Enable- DSel=0 DScale=0 PME-
    Capabilities: [100 v1] Advanced Error Reporting
        UESta:  DLP- SDES- TLP- FCP- CmpltTO- CmpltAbrt- UnxCmplt- RxOF- MalfTLP- ECRC- UnsupReq- ACSViol-
        UEMsk:  DLP- SDES- TLP- FCP- CmpltTO+ CmpltAbrt- UnxCmplt- RxOF- MalfTLP- ECRC- UnsupReq- ACSViol-
        UESvrt: DLP+ SDES- TLP- FCP- CmpltTO- CmpltAbrt- UnxCmplt- RxOF+ MalfTLP+ ECRC- UnsupReq- ACSViol-
        CESta:  RxErr- BadTLP- BadDLLP- Rollover- Timeout- NonFatalErr-
        CEMsk:  RxErr- BadTLP- BadDLLP- Rollover- Timeout- NonFatalErr+
        AERCap: First Error Pointer: 00, GenCap- CGenEn- ChkCap- ChkEn-
    Capabilities: [140 v1] Access Control Services
        ACSCap: SrcValid+ TransBlk+ ReqRedir+ CmpltRedir+ UpstreamFwd- EgressCtrl- DirectTrans-
        ACSCtl: SrcValid- TransBlk- ReqRedir- CmpltRedir- UpstreamFwd- EgressCtrl- DirectTrans-
    Capabilities: [220 v1] #19
    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:1c.4 PCI bridge: Intel Corporation Sunrise Point-H PCI Express Root Port #5 (rev f1) (prog-if 00 [Normal decode])

    (...SNIP...)

        LnkCap: Port #5, Speed 2.5GT/s, Width x1, ASPM L1, Exit Latency L0s <1us, L1 <16us
            ClockPM- Surprise- LLActRep+ BwNot+ ASPMOptComp+
        LnkCtl: ASPM L1 Enabled; RCB 64 bytes Disabled- CommClk+
            ExtSynch- ClockPM- AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 2.5GT/s, Width x1, TrErr- Train- SlotClk+ DLActive+ BWMgmt+ ABWMgmt-
        SltCap: AttnBtn- PwrCtrl- MRL- AttnInd- PwrInd- HotPlug- Surprise-
            Slot #8, PowerLimit 10.000W; Interlock- NoCompl+

    (...SNIP...)

    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:1c.5 PCI bridge: Intel Corporation Sunrise Point-H PCI Express Root Port #6 (rev f1) (prog-if 00 [Normal decode])

    (...SNIP...)

        LnkCap: Port #6, Speed 2.5GT/s, Width x1, ASPM L1, Exit Latency L0s <1us, L1 <16us
            ClockPM- Surprise- LLActRep+ BwNot+ ASPMOptComp+
        LnkCtl: ASPM L1 Enabled; RCB 64 bytes Disabled- CommClk+
            ExtSynch- ClockPM- AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 2.5GT/s, Width x1, TrErr- Train- SlotClk+ DLActive+ BWMgmt+ ABWMgmt-
        SltCap: AttnBtn- PwrCtrl- MRL- AttnInd- PwrInd- HotPlug- Surprise-
            Slot #9, PowerLimit 10.000W; Interlock- NoCompl+
        SltCtl: Enable: AttnBtn- PwrFlt- MRL- PresDet- CmdCplt- HPIrq- LinkChg-

    (...SNIP...)

    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:1c.6 PCI bridge: Intel Corporation Sunrise Point-H PCI Express Root Port #7 (rev f1) (prog-if 00 [Normal decode])

    (...SNIP...)

        LnkCap: Port #7, Speed 8GT/s, Width x1, ASPM L0s L1, Exit Latency L0s <1us, L1 <16us
            ClockPM- Surprise- LLActRep+ BwNot+ ASPMOptComp+
        LnkCtl: ASPM L0s L1 Enabled; RCB 64 bytes Disabled- CommClk+
            ExtSynch- ClockPM- AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 2.5GT/s, Width x1, TrErr- Train- SlotClk+ DLActive+ BWMgmt+ ABWMgmt-
        SltCap: AttnBtn- PwrCtrl- MRL- AttnInd- PwrInd- HotPlug- Surprise-
            Slot #10, PowerLimit 10.000W; Interlock- NoCompl+

    (...SNIP...)

    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:1d.0 PCI bridge: Intel Corporation Sunrise Point-H PCI Express Root Port #9 (rev f1) (prog-if 00 [Normal decode])

    (...SNIP...)

        LnkCap: Port #9, Speed 8GT/s, Width x4, ASPM L1, Exit Latency L0s <1us, L1 <16us

    (...SNIP...)

            Slot #12, PowerLimit 25.000W; Interlock- NoCompl+

    (...SNIP...)

        DevCtl2: Completion Timeout: 50us to 50ms, TimeoutDis-, LTR+, OBFF Disabled ARIFwd-

    (...SNIP...)

    Kernel driver in use: pcieport
    Kernel modules: shpchp

00:1f.0 ISA bridge: Intel Corporation Sunrise Point-H LPC Controller (rev 31)
    Subsystem: Dell Sunrise Point-H LPC Controller
    Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
    Status: Cap- 66MHz- UDF- FastB2B- ParErr- DEVSEL=medium >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
    Latency: 0

00:1f.2 Memory controller: Intel Corporation Sunrise Point-H PMC (rev 31)
    Subsystem: Dell Sunrise Point-H PMC
    Control: I/O- Mem- BusMaster- SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
    Status: Cap- 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
    Region 0: Memory at dd12c000 (32-bit, non-prefetchable) [disabled] [size=16K]

00:1f.3 Audio device: Intel Corporation Sunrise Point-H HD Audio (rev 31)
    Subsystem: Dell Sunrise Point-H HD Audio
    Control: I/O- Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx+
    Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
    Latency: 32
    Interrupt: pin A routed to IRQ 128
    Region 0: Memory at dd128000 (64-bit, non-prefetchable) [size=16K]
    Region 4: Memory at dd100000 (64-bit, non-prefetchable) [size=64K]
    Capabilities: [50] Power Management version 3
        Flags: PMEClk- DSI- D1- D2- AuxCurrent=55mA PME(D0-,D1-,D2-,D3hot+,D3cold+)
        Status: D0 NoSoftRst+ PME-Enable- DSel=0 DScale=0 PME-
    Capabilities: [60] MSI: Enable+ Count=1/1 Maskable- 64bit+
        Address: 00000000fee00318  Data: 0000
    Kernel driver in use: snd_hda_intel
    Kernel modules: snd_hda_intel

00:1f.4 SMBus: Intel Corporation Sunrise Point-H SMBus (rev 31)
    Subsystem: Dell Sunrise Point-H SMBus
    Control: I/O+ Mem+ BusMaster- SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
    Status: Cap- 66MHz- UDF- FastB2B+ ParErr- DEVSEL=medium >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
    Interrupt: pin A routed to IRQ 255
    Region 0: Memory at dd132000 (64-bit, non-prefetchable) [size=256]
    Region 4: I/O ports at f040 [size=32]
    Kernel modules: i2c_i801

01:00.0 3D controller: NVIDIA Corporation GM204M [GeForce GTX 970M] (rev a1)
    Subsystem: Dell GM204M [GeForce GTX 970M]
    (...SNIP...)

        LnkCap: Port #0, Speed 8GT/s, Width x16, ASPM L0s L1, Exit Latency L0s <1us, L1 <4us
            ClockPM+ Surprise- LLActRep- BwNot- ASPMOptComp+
        LnkCtl: ASPM Disabled; RCB 64 bytes Disabled- CommClk-
            ExtSynch- ClockPM+ AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 8GT/s, Width x8, TrErr- Train- SlotClk+ DLActive- BWMgmt- ABWMgmt-

     (...SNIP...)

    Kernel driver in use: nvidia
    Kernel modules: nvidiafb, nouveau, nvidia_384_drm, nvidia_384

01:00.1 Audio device: NVIDIA Corporation GM204 High Definition Audio Controller (rev a1)

    (...SNIP....)

    Kernel driver in use: snd_hda_intel
    Kernel modules: snd_hda_intel

02:00.0 PCI bridge: Intel Corporation Device 1576 (prog-if 00 [Normal decode])

    (...SNIP....)

03:01.0 PCI bridge: Intel Corporation Device 1576 (prog-if 00 [Normal     

    (...SNIP....)

03:02.0 PCI bridge: Intel Corporation Device 1576 (prog-if 00 [Normal     

    (...SNIP....)

39:00.0 USB controller: Intel Corporation Device 15b5 (prog-if 30 

    (...SNIP....)

3b:00.0 Ethernet controller: Qualcomm Atheros Killer E2400 Gigabit Ethernet Controller (rev 10)
    Subsystem: Device 0707:2400

(...SNIP...)

        LnkCap: Port #0, Speed 2.5GT/s, Width x1, ASPM L0s L1, Exit Latency L0s unlimited, L1 unlimited

    (...SNIP...)

    Kernel driver in use: alx
    Kernel modules: alx

3c:00.0 Network controller: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 32)
    Subsystem: Bigfoot Networks, Inc. QCA6174 802.11ac Wireless Network Adapter

    (...SNIP....)

    Kernel driver in use: ath10k_pci
    Kernel modules: ath10k_pci

3d:00.0 Unassigned class [ff00]: Realtek Semiconductor Co., Ltd. RTS5227 PCI Express Card Reader (rev 01)

    (...SNIP....)

    Kernel driver in use: rtsx_pci
    Kernel modules: rtsx_pci

3e:00.0 Non-Volatile memory controller: Samsung Electronics Co Ltd Device a804 (prog-if 02 [NVM Express])
    Subsystem: Samsung Electronics Co Ltd Device a801

     (...SNIP...)

        LnkCap: Port #0, Speed 8GT/s, Width x4, ASPM L1, Exit Latency L0s unlimited, L1 <64us
            ClockPM+ Surprise- LLActRep- BwNot- ASPMOptComp+
        LnkCtl: ASPM L1 Enabled; RCB 64 bytes Disabled- CommClk+
            ExtSynch- ClockPM+ AutWidDis- BWInt- AutBWInt-
        LnkSta: Speed 8GT/s, Width x4, TrErr- Train- SlotClk+ DLActive- BWMgmt- ABWMgmt-

    (...SNIP...)

    Kernel driver in use: nvme
    Kernel modules: nvme
```

I'll try to study this a little more and update it later.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

