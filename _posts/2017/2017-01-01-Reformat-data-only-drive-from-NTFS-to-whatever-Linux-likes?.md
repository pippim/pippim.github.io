---
layout:       post
title:        >
    Reformat data only drive from NTFS to whatever Linux likes?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/866851
type:         Answer
tags:         hard-drive ntfs format
created_date: 2017-01-01 19:28:46
edit_date:    
votes:        "3 "
favorites:    
views:        "469 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

There is a nice one page write up on this question here ([PC Wolrd - Ext4 vs NTFS][1]) on day 16 of a 30-day diary learning **Linux**.

### Ext4 advantages:
 - In addition to being faster, Ext4 has greater support for larger files  and has less fragmentation.
 - Using checksums for drive journaling improves reliability and improves performance.
 - When it comes to file checking, EXT4 is quicker because unallocated blocks of data are marked as such and are simply skipped during disk check operations.

In addition to this article others have pointed out how NTFS requires extras drivers that are non-native to Linux / Ubuntu.

The article does mention some benefits of a Windows drive that might effect you so I suggest reading it.

  [1]: http://www.pcworld.com/article/230527/ubuntu_linux_day_16_ext4_vs_ntfs.html
