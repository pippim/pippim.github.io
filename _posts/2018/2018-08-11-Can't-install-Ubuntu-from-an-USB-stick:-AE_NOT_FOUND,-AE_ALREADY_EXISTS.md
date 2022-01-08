---
layout:       post
title:        >
    Can't install Ubuntu from an USB stick: AE_NOT_FOUND, AE_ALREADY_EXISTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064531
type:         Answer
tags:         dual-boot 18.04 system-installation live-usb acpi
created_date: 2018-08-11 22:00:21
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "3,511 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

As per this Arch Linux [thread][1] it's not an error:

> These kinds of "errors" have been discussed ad nauseam, it's simply  
> the kernel telling you that the ACPI information received from the  
> system seems to be incomplete in some way, update your BIOS/UEFI in  
> hopes for a proper fix or ignore the error if you don't notice  
> anything off with your system.  
>   
> (And please don't do something dumb like setting acpi=off just to get  
> rid of these messages)  

## What is causing the freeze is AFTER the ACPI messages

Below is a "good" boot log. What you need to figure out is which program **after** the ACPI entries is causing the lock up:

``` 
Aug 11 15:28:35 alien kernel: [    0.004000] pid_max: default: 32768 minimum: 301
Aug 11 15:28:35 alien kernel: [    0.004000] ACPI: Core revision 20170531
Aug 11 15:28:35 alien kernel: [    0.025175] ACPI Error: [\_SB_.PCI0.XHC_.RHUB.HS11] Namespace lookup failure, AE_NOT_FOUND (20170531/dswload-210)
Aug 11 15:28:35 alien kernel: [    0.025179] ACPI Exception: AE_NOT_FOUND, During name lookup/catalog (20170531/psobject-252)
Aug 11 15:28:35 alien kernel: [    0.025206] ACPI Exception: AE_NOT_FOUND, (SSDT:xh_rvp10) while loading table (20170531/tbxfload-228)
Aug 11 15:28:35 alien kernel: [    0.032753] ACPI Error: 1 table load failures, 9 successful (20170531/tbxfload-246)
Aug 11 15:28:35 alien kernel: [    0.033477] Security Framework initialized
Aug 11 15:28:35 alien kernel: [    0.033479] Yama: becoming mindful.
Aug 11 15:28:35 alien kernel: [    0.033493] AppArmor: AppArmor initialized
Aug 11 15:28:35 alien kernel: [    0.034589] Dentry cache hash table entries: 1048576 (order: 11, 8388608 bytes)
Aug 11 15:28:35 alien kernel: [    0.035039] Inode-cache hash table entries: 524288 (order: 10, 4194304 bytes)
Aug 11 15:28:35 alien kernel: [    0.035066] Mount-cache hash table entries: 16384 (order: 5, 131072 bytes)
Aug 11 15:28:35 alien kernel: [    0.035081] Mountpoint-cache hash table entries: 16384 (order: 5, 131072 bytes)
Aug 11 15:28:35 alien kernel: [    0.035221] CPU: Physical Processor ID: 0
Aug 11 15:28:35 alien kernel: [    0.035222] CPU: Processor Core ID: 0
Aug 11 15:28:35 alien kernel: [    0.035226] ENERGY_PERF_BIAS: Set to 'normal', was 'performance'
Aug 11 15:28:35 alien kernel: [    0.035227] ENERGY_PERF_BIAS: View and update with x86_energy_perf_policy(8)
Aug 11 15:28:35 alien kernel: [    0.035228] FEATURE SPEC_CTRL Present

```

  [1]: https://bbs.archlinux.org/viewtopic.php?id=233768
