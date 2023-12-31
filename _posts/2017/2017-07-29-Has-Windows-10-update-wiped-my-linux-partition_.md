---
layout:       post
title:        >
    Has Windows 10 update wiped my linux partition?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/941043
type:         Answer
tags:         dual-boot partitioning
created_date: 2017-07-29 16:12:42
edit_date:    
votes:        "1 "
favorites:    
views:        "2,794 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-29-Has-Windows-10-update-wiped-my-linux-partition_.md
toc:          false
navigation:   false
clipboard:    false
---

When using `dd` to erase a USB on `/dev/sdd` I accidentally used `/dev/sdb` and wiped out the first 1 MB of my second hard disk. This erased the MBR (Master Boot Record) and partition table.

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
