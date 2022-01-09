---
layout:       post
title:        >
    Installing Ubuntu with HD + SSD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1158113
type:         Answer
tags:         boot dual-boot grub2 partitioning ssd
created_date: 2019-07-13 21:42:49
edit_date:    
votes:        "3 "
favorites:    
views:        "1,800 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

I have 1 TB HDD and 512 GB Samsung 960 Pro SSD.

The 1 TB essentially a brick but all 1,000 GB are allocated to a sing Windows NTFS partition. When Windows games are installed (60GB each) they go to HDD but are copied to SSD when it's time to play them for a few weeks / months.

The SSD has 400 GB for Windows 10 and the remaining 100 GB for two Ubuntu 16.04 partitions (20GB and 45GB), one Ubuntu 18.04 partition 25GB and one 10 GB partition for all four OS's to share.

The shared partition is primarily used to store bash scripts used in both Windows 10 WSL (Windows Subsystem for Linux) and the three Ubuntu distros. Occasionally screenshots and other graphics are placed there. The shared partition is in NTFS format because Windows 10 can't read/write ext4 Linux partitions. Linux on the other hand can read/write NTFS partitions with no problem (well very few anyway).

I don't believe in separate `/boot` or `/home` partitions but I understand many do and I don't fault them for it. I put everything in `/` so I don't have to micro manage storage allocation between `/`, `/boot` and `/home`.

What gives me peace of mind is every day important files are backed up off-site automatically using cron to cloud. Maybe once a year I'll use `gparted` to make some partitions larger and some smaller.

If you can set it up such that the HDD is used to store all your projects and the project you are currently working on for a few days/weeks/months is transferred to SSD then I think that is the best.
