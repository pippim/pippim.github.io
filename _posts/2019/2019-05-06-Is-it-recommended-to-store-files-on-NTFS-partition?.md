---
layout:       post
title:        Is it recommended to store files on NTFS partition?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1140935
type:         Answer
tags:         dual-boot partitioning ntfs
created_date: 2019-05-06 11:29:28
edit_date:    
votes:        1
favorites:    
views:        479
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

Sometimes an NTFS partition is the only way of sharing files between Windows and Linux. For example bash scripts that I run in Ubuntu 16.04 / 18.04 and Windows 10 WSL are stored in in an NTFS partition mounted in Ubuntu as `/mnt/e/bin/`. On the Windows side the NTFS partition it is accessed as drive `E:\`

I have run into anomalies where I have to create the bash script on the Ubuntu site first to get proper editing permissions from the Windows 10 WSL side. This could be my system setup fault though and I honestly haven't cared enough to research it that deeply.

Ubuntu running under Windows 10 WSL does recognize and can change Linux file permissions properly but cannot access `ext4` partitions, only `NTFS` partitions. 

There is a Windows add-on to read/write `ext4` partitions but there are/were data corruption problems in 64-bit mode. As such I stopped using this Windows 10 add-on.

Ubuntu seems to have no problems updating Windows NTFS partitions for changing the Linux file permissions. As far as changing Windows file permissions it is rather complicated and I'll leave that up to you to research.
