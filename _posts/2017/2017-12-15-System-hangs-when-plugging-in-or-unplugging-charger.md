---
layout:       post
title:        >
    System hangs when plugging in or unplugging charger
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/986691
type:         Answer
tags:         power-management system charging
created_date: 2017-12-15 23:01:05
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "3,612 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-15-System-hangs-when-plugging-in-or-unplugging-charger.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# `udevadm monitor` to decipher errors unplugging AC

First boot your computer with AC plugged in. Then type `sudo udevadm monitor` wait a second and unplug the AC. Your screen will look something like this:

``` 
$ sudo udevadm monitor
monitor will print the received events for:
UDEV - the event which udev sends out after rule processing
KERNEL - the kernel uevent

KERNEL[5888.768785] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/ACPI0003:00/power_supply/ACAD (power_supply)
KERNEL[5888.799754] add      /module/thinkpad_acpi (module)
UDEV  [5888.800544] add      /module/thinkpad_acpi (module)
KERNEL[5888.824515] remove   /module/thinkpad_acpi (module)
UDEV  [5888.824827] remove   /module/thinkpad_acpi (module)
UDEV  [5889.752862] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/ACPI0003:00/power_supply/ACAD (power_supply)
KERNEL[5889.804222] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/PNP0C0A:03/power_supply/BAT1 (power_supply)
UDEV  [5889.805394] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/PNP0C0A:03/power_supply/BAT1 (power_supply)
```

The question is where did it stop in the above list?


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# `udevadm monitor` to decipher errors plugging in AC

Next reboot your machine whilst it's running on battery. Start `sudo udevadm monitor` again. Plug in your AC and your screen will look something like this:

``` 
$ sudo udevadm monitor
monitor will print the received events for:
UDEV - the event which udev sends out after rule processing
KERNEL - the kernel uevent

-KERNEL[5905.564769] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/ACPI0003:00/power_supply/ACAD (power_supply)
KERNEL[5905.597141] add      /module/thinkpad_acpi (module)
UDEV  [5905.598205] add      /module/thinkpad_acpi (module)
KERNEL[5905.624567] remove   /module/thinkpad_acpi (module)
UDEV  [5905.625432] remove   /module/thinkpad_acpi (module)
KERNEL[5906.632639] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/PNP0C0A:03/power_supply/BAT1 (power_supply)
UDEV  [5906.635327] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/PNP0C0A:03/power_supply/BAT1 (power_supply)
UDEV  [5906.716708] change   /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0A08:00/device:3f/ACPI0003:00/power_supply/ACAD (power_supply)
```

The second question is when did your machine lock up in the above list?


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Use `gedit /var/log/syslog` to review error messages

Now reboot your machine whilst it is still plugged in. Log on again and type `gedit /var/log/syslog`.

Scroll through the list to the time when your machine crashed looking for error messages:

``` 
Dec 15 15:43:34 alien upowerd[1685]: (upowerd:1685): UPower-Linux-WARNING **: treating change event as add on /sys/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.0004/0003:046D:2010.0007/power_supply/hidpp_battery_0
Dec 15 15:43:39 alien kernel: [ 5800.616352] acpi INT3400:00: Unsupported event [0x86]
Dec 15 15:43:46 alien kernel: [ 5807.735823] snd_hda_codec_ca0132 hdaudioC0D0: ca0132 DSP downloaded and running
Dec 15 15:43:46 alien kernel: [ 5807.912730] acpi INT3400:00: Unsupported event [0x86]
Dec 15 15:45:07 alien kernel: [ 5888.842935] ata2.00: exception Emask 0x10 SAct 0x0 SErr 0x50000 action 0xe frozen
Dec 15 15:45:07 alien kernel: [ 5888.842938] ata2.00: irq_stat 0x00400000, PHY RDY changed
Dec 15 15:45:07 alien kernel: [ 5888.842939] ata2: SError: { PHYRdyChg CommWake }
Dec 15 15:45:07 alien kernel: [ 5888.842942] ata2.00: failed command: IDENTIFY DEVICE
Dec 15 15:45:07 alien kernel: [ 5888.842944] ata2.00: cmd ec/00:01:00:00:00/00:00:00:00:00/40 tag 12 pio 512 in
Dec 15 15:45:07 alien kernel: [ 5888.842944]          res 50/00:00:00:00:00/00:00:00:00:00/00 Emask 0x10 (ATA bus error)
Dec 15 15:45:07 alien kernel: [ 5888.842946] ata2.00: status: { DRDY }
Dec 15 15:45:07 alien kernel: [ 5888.842949] ata2: hard resetting link
Dec 15 15:45:08 alien kernel: [ 5889.554959] ata2: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
Dec 15 15:45:08 alien kernel: [ 5889.557410] ata2.00: configured for UDMA/133
Dec 15 15:45:08 alien kernel: [ 5889.567686] ata2: EH complete
Dec 15 15:45:08 alien kernel: [ 5889.675349] acpi INT3400:00: Unsupported event [0x86]
Dec 15 15:45:24 alien kernel: [ 5906.215059] snd_hda_codec_ca0132 hdaudioC0D0: ca0132 DSP downloaded and running
Dec 15 15:45:25 alien kernel: [ 5906.503964] acpi INT3400:00: Unsupported event [0x86]
Dec 15 15:47:17 alien kernel: [ 6018.982028] ata2.00: exception Emask 0x10 SAct 0x0 SErr 0x50000 action 0xe frozen
Dec 15 15:47:17 alien kernel: [ 6018.982038] ata2.00: irq_stat 0x00400000, PHY RDY changed
Dec 15 15:47:17 alien kernel: [ 6018.982044] ata2: SError: { PHYRdyChg CommWake }
Dec 15 15:47:17 alien kernel: [ 6018.982048] ata2.00: failed command: CHECK POWER MODE
Dec 15 15:47:17 alien kernel: [ 6018.982057] ata2.00: cmd e5/00:00:00:00:00/00:00:00:00:00/00 tag 5
Dec 15 15:47:17 alien kernel: [ 6018.982057]          res 50/00:00:00:00:00/00:00:00:00:00/00 Emask 0x10 (ATA bus error)
Dec 15 15:47:17 alien kernel: [ 6018.982062] ata2.00: status: { DRDY }
Dec 15 15:47:17 alien kernel: [ 6018.982070] ata2: hard resetting link
Dec 15 15:47:18 alien kernel: [ 6019.697995] ata2: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
Dec 15 15:47:18 alien kernel: [ 6019.700625] ata2.00: configured for UDMA/133
Dec 15 15:47:18 alien udisksd[2389]: Error performing housekeeping for drive /org/freedesktop/UDisks2/drives/HGST_HTS721010A9E630_JR10004M303XVF: Error updating SMART data: Error sending ATA command CHECK POWER MODE: Unexpected sense data returned:#0120000: 70 00 05 00  00 00 00 0a  00 50 00 00  21 04 00 00    p........P..!...#0120010: 00 00 00 00  00 00 00 00  00 00 00 00  00 00 00 00    ................#012 (g-io-error-quark, 0)
Dec 15 15:47:18 alien kernel: [ 6019.710827] ata2: EH complete
```

In my case I see error messages but my laptop didn't lock up. Because I have a long list of error messages I already need to clean up and because I never run on the laptop on battery, I'll just ignore these errors.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

# Take your notes and "Google it"

Google search is a great help in finding other people with the same problem and solutions to it. 

- Copy and paste error messages into your google search bar.
- Append "Ubuntu Linux" to the end of the search string.
- Strip out unique numbers like time of day or seconds within the system log.
- Focus on search results from Ask Ubuntu, Launchpad.net and ArchLinux first.



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a></div>

