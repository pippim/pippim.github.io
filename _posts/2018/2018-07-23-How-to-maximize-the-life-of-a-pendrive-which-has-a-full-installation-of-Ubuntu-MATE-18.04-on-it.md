---
layout:       post
title:        >
    How to maximize the life of a pendrive which has a full installation of Ubuntu MATE 18.04 on it
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1058629
type:         Answer
tags:         18.04 live-usb usb-drive ubuntu-mate
created_date: 2018-07-23 10:55:49
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "4,464 "
accepted:     
uploaded:     2022-01-14 05:03:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-23-How-to-maximize-the-life-of-a-pendrive-which-has-a-full-installation-of-Ubuntu-MATE-18.04-on-it.md
toc:          false
navigation:   false
clipboard:    false
---

# SSDs are designed for OS, Pen Drives are not

Although you can use pen drives to store and execute an Operating System (OS) they were not designed for that purpose like an SSD (Solid State Device) is. As such you will not find the manufacturer utilities such as TRIM nor Linux support such as the `nvme` command (https://askubuntu.com/questions/1032082/is-it-still-bad-to-use-swap-on-a-modern-ssd/1032093#1032093).

Below is what [wikipedia][1] has to say about Pen Drive lifespan. Ensure you avoid the `SLC` type which might only last a few days.

## Longevity

The memory in flash drives is commonly engineered with multi-level cell (MLC) based memory that is good for around 3,000-5,000 program-erase cycles,[51] but some flash drives have single-level cell (SLC) based memory that is good for around 100,000 writes. There is virtually no limit to the number of reads from such flash memory, so a well-worn USB drive may be write-protected to help ensure the life of individual cells.

Estimation of flash memory endurance is a challenging subject that depends on the SLC/MLC/TLC memory type, size of the flash memory chips, and actual usage pattern. As a result, a USB flash drive can last from a few days to several hundred years.[52]

Regardless of the endurance of the memory itself, the USB connector hardware is specified to withstand only around 1,500 insert-removal cycles.[53] 

## Booting operating systems

Most current PC firmware permits booting from a USB drive, allowing the launch of an operating system from a bootable flash drive. Such a configuration is known as a Live USB.[64]

Original flash memory designs had very limited estimated lifetimes. The failure mechanism for flash memory cells is analogous to a metal fatigue mode; the device fails by refusing to write new data to specific cells that have been subject to many read-write cycles over the device's lifetime. Premature failure of a "live USB" could be circumvented by using a flash drive with a write-lock switch as a WORM device, identical to a live CD. Originally, this potential failure mode limited the use of "live USB" system to special-purpose applications or temporary tasks, such as:

-    Loading a minimal, hardened kernel for embedded applications (e.g., network router, firewall).
-    Bootstrapping an operating system install or disk cloning operation, often across a network.
-    Maintenance tasks, such as virus scanning or low-level data repair, without the primary host operating system loaded.

**As of 2011**, newer flash memory designs have much higher estimated lifetimes. Several manufacturers are now offering warranties of 5 years or more. Such warranties should make the device more attractive for more applications. By reducing the probability of the device's premature failure, flash memory devices can now be considered for use where a magnetic disk would normally have been required. Flash drives have also experienced an exponential growth in their storage capacity over time (following the Moore's Law growth curve). As of 2013, single-packaged devices with capacities of 1 TB are readily available,[35] and devices with 16 GB capacity are very economical. Storage capacities in this range have traditionally been considered to offer adequate space, because they allow enough space for both the operating system software and some free space for the user's data. 

  [1]: https://en.wikipedia.org/wiki/USB_flash_drive#Longevity
