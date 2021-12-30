---
layout:       post
title:        Cannot mount usb hard drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132581
type:         Answer
tags:         18.04 mount gparted exfat
created_date: 2019-04-09 23:42:35
edit_date:    2019-04-09 23:50:21
votes:        4
favorites:    
views:        11,227
accepted:     Accepted
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

Firstly, an easier way of mounting is to use:

``` 
mount -t auto /dev/sdb /media/usb-drive

```

This way you are spared the magical incantations of specifying a partition type.

Secondly, you may have errors on the drive and/or the partition table may be damaged. This happened to me when using `dd` to erase the first MB of a USB on `/dev/sdd` and I accidentally used `/dev/sdb`. This wiped out the first 1 MB of my second hard disk containing the MBR (Master Boot Record) and partition table.

**TestDisk** can be downloaded [here][1] and has versions for Windows and Linux. It goes through every byte of your hard drive to analyze what partition type it is and rebuilds the partition tables. I used TestDisk to successfully recover all my data.

From the website, TestDisk can:

- Fix partition table, recover deleted partition
- Recover FAT32 boot sector from its backup
- Rebuild FAT12/FAT16/FAT32 boot sector
- Fix FAT tables
- Rebuild NTFS boot sector
- Recover NTFS boot sector from its backup
- Fix MFT using MFT mirror
- Locate ext2/ext3/ext4 Backup SuperBlock
- Undelete files from FAT, exFAT, NTFS and ext2 filesystem
- Copy files from deleted FAT, exFAT, NTFS and ext2/ext3/ext4 partitions.

  [1]: http://www.cgsecurity.org/wiki/TestDisk
