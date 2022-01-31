---
layout:       post
title:        >
    Why does Gparted leave a spare used space after formating for all File Systems(ntfs,fat32,ex4)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161539
type:         Answer
tags:         partitioning filesystem gparted ntfs ext4
created_date: 2019-07-27 19:58:33
edit_date:    
votes:        "2 "
favorites:    
views:        "363 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-27-Why-does-Gparted-leave-a-spare-used-space-after-formating-for-all-File-Systems_ntfs_fat32_ex4__.md
toc:          false
navigation:   false
clipboard:    false
---

`ext4` has overhead for newly created partitions. [Answers here][1] suggest reserved space (overhead) of **1.5%** is great and it can be as high as **5%**. In your case it appears to be **2.17%** if my math-challenged mind has calculated it correctly.

The reasons for overhead are to address the infamous **defrag hard disk** problem in Windows which doesn't exist in Linux. Other reasons are to improve `fsck`.


  [1]: https://askubuntu.com/questions/131516/new-ext4-partition-and-used-space
