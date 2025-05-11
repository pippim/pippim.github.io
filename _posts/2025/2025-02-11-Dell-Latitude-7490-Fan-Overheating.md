---
layout:       post
title:        >
    Dell Latitude 7490 Fan Overheating
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1541197
type:         Answer
tags:         dell fan overheating grub
created_date: 2025-02-11 21:54:49
edit_date:    
votes:        "0 "
favorites:    
views:        "100 "
accepted:     Accepted
uploaded:     2025-05-11 09:03:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2025/2025-02-11-Dell-Latitude-7490-Fan-Overheating.md
toc:          false
navigation:   false
clipboard:    false
---

I found my Dell fans are quick to turn on when watching a video. After the video ends though the Dell fans are very slow to reduce speed. Never timed it but maybe five minutes to slow down? 

``` bash
$ sensors
dell_smm-virtual-0
Adapter: Virtual device
Processor Fan: 5200 RPM
Video Fan:     5000 RPM
CPU:            +72.0°C  
GPU:            +73.0°C  
SODIMM:         +71.0°C  

pch_skylake-virtual-0
Adapter: Virtual device
temp1:        +93.5°C  

coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +80.0°C  (high = +100.0°C, crit = +100.0°C)
Core 0:        +78.0°C  (high = +100.0°C, crit = +100.0°C)
Core 1:        +80.0°C  (high = +100.0°C, crit = +100.0°C)
Core 2:        +69.0°C  (high = +100.0°C, crit = +100.0°C)
Core 3:        +66.0°C  (high = +100.0°C, crit = +100.0°C)
```

---

## Grub notes

My `grub` line has a bunch of stuff added over the years. Here is what it has now:

> GRUB_CMDLINE_LINUX_DEFAULT="noplymouth loglevel=3 fastboot acpiphp.disable=1 pcie_aspm=force vt.handoff=7 i915.fastboot=1 nopti nospectre_v2 nospec mem_sleep_default=deep nouveau.nomodeset=0 ipv6.disable_ipv6=1"  

---

I found an older commented out line in my `grub` that relates to your screen freezing issue which I no longer use:

> #GRUB_CMDLINE_LINUX_DEFAULT="quiet loglevel=0 vga=current udev.log-priority=3 fastboot kaslr acpiphp.disable=1 i915.enable_rc6=0 i915.enable_psr=0 i915.preliminary_hw_support=1 i915.enable_hd_vgaarb=1 intel_idle.max_cstate=1 i915.enable_guc_loading=1 i915.enable_guc_submission pcie_aspm=force vt.handoff=7"  

***Because these screen freezing solutions of yours are no longer needed, I suspect the cause was due to outdated Nvidia drivers.***

---

Finally, I found years of notes of various things tried inside of `grub` that aren't used now. There might be something useful inside:

``` bash
##################### June 29 2018 - Tuxkiller2 theme ##############################

GRUB_BACKGROUND="/usr/share/grub/themes/Tuxkiller2/1600x900-TuxRestingOnWindowsTB.png"
# Mar 3, 2021: Above is the "terminal box" which is clipped version of full
#              screen version called "1600x900-TuxRestingOnWindows.jpg".
     GRUB_THEME="/usr/share/grub/themes/Tuxkiller2/theme.txt"
   GRUB_GFXMODE="1920x1080x32"
GRUB_GFXPAYLOAD_LINUX="keep"
      GRUB_FONT="/usr/share/grub/themes/Tuxkiller2/ubuntu_regular_28.pf2"
# GRUB_TERMINAL="gfxterm"
#GRUB_CMDLINE_LINUX_DEFAULT="quiet splash i915.fastboot=1"
#GRUB_CMDLINE_LINUX_DEFAULT="noplymouth fastboot acpiphp.disable=1 pcie_aspm=force scsi_mod.use_blk_mq=1 vt.handoff=7 i915.enable_guc_loading=1 i915.enable_guc_submission=1 i915.edp_vswing=2 i915.enable_fbc=1 i915.fastboot=1 nopti nospectre_v2 nospec"
GRUB_CMDLINE_LINUX_DEFAULT="noplymouth loglevel=3 fastboot acpiphp.disable=1 pcie_aspm=force vt.handoff=7 i915.fastboot=1 nopti nospectre_v2 nospec mem_sleep_default=deep nouveau.nomodeset=0 ipv6.disable_ipv6=1"

# Jul 13/2019 - mem_sleep_default=deep from https://www.reddit.com/r/Dell/comments/8b6eci/xp_13_9370_battery_drain_while_suspended/
# Dec 27/2018 - intel_pstate=disable from: http://konkor.github.io/cpufreq/faq/#irqbalance-detected
# Dec 17/2018 - intel_pstate=no_hwp from: https://www.kernel.org/doc/html/v4.12/admin-guide/pm/intel_pstate.html
#               Takes pstate frequency control from hardware to software
# Oct 8/2018 -  Use scsi_mod.use_blk_mq=1 as per Ask Ubuntu to speed up NVMe:
#               https://askubuntu.com/questions/698395/poor-io-performance-
#               pcie-nvme-samsung-950-pro THIS ADDED A FEW SECONDS TO USERSPACE
# Aug 16/2018 - i915.edp_vswing=2 comes from Ask Ubuntu Dell XPS 15 9350 screen flickering:
#               https://askubuntu.com/a/1064747/307523
# Aug 11/2018 - 10% performance boost eliminating Meltdown & Spectre support:
#               "nopti nospectre_v2 nospec"
# Dec 13/2017 intel_iommu=igfx_off to fix rare error message related to virtualization which isn't used now.
# As per bug report: https://bbs.archlinux.org/viewtopic.php?id=176398 :
#  DMAR: DRHD: handling fault status reg 2
#  DMAR: [INTR-REMAP] Request device [f0:1f.0] fault
# Remove as boot went from 23 seconds to 46 seconds and screen flashed more

# November 27/2017 HDMI working with Nvidia drivers, but no sound so use hdmi-audio.service which requires
# early KMS to be off. Remove quiet & splash options for no plymouth.

# acpiphp.disable=1 to allow suspend to work with NVMe but disables hot plug.
# October 26/2017 HDMI isn't working but this isn't the cause of it. Try to update i915 drivers.

# pcie_aspm=force to get rid of syslog error message:
# ACPI FADT declares the system doesn't support PCIe ASPM, so disable it
# Also a web site says it adds 20 minutes battery life too.

# kaslr randomizes address space so same modules aren't in same memory location each boot.
# https://askubuntu.com/questions/32999/what-is-vt-handoff-7-parameter-in-grub-cfg

# nomodeset turns off "nouveau" drivers for nVidia card
# This doesn't remove additional drivers section as hopeed plus negative effect of screen
# going full bright at log in.

# loglevel=3 vga=current as per Arch Linux posting at:
# https://wiki.archlinux.org/index.php/silent_boot
# this should prevent messages still appearing twice when `quiet` is used.

# loglevel=3 udev.log-priority=3 as per Reddit posting at:
# https://www.reddit.com/r/archlinux/comments/4br86x/setting_up_plymouth_efi_framebuffer/d1briv2/
# Same link also notes to set plymouth delay to 0.

# i915.enable_rc6=0 Fix screen flickering Kernel's > 4.12 https://bbs.archlinux.org/viewtopic.php?id=211399

# i915.enable_psr=0 screen flickering kernel's > 4.6 https://wiki.archlinux.org/index.php/intel_graphics#Skylake_support
# GRUB_CMDLINE_LINUX="console=tty12" # Redirect the kernel output to another tty

# video=SVIDEO-1:d eliminate blank screen boot from above archlinux.org link.

# Skylake optimization: https://wiki.archlinux.org/index.php/intel_graphics
#  i915.enable_guc_loading=1 i915.enable_guc_submission=1
```


