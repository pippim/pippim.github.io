---
layout:       post
title:        >
    Can I safely resize Windows 10 system partition from Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030518
type:         Answer
tags:         dual-boot partitioning gparted
created_date: 2018-05-01 10:34:33
edit_date:    2018-05-01 10:52:57
votes:        "5 "
favorites:    
views:        "9,136 "
accepted:     Accepted
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-01-Can-I-safely-resize-Windows-10-system-partition-from-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

The safest way is to use Windows 10 to shrink it's own partition.

Windows 10 knows more about the last used area of the disk partition. Ubuntu / gparted cannot shrink the partition reliably as Windows 10 can.

For example last weekend I wanted to clone 16.04 and do a test run upgrade to 18.04. My Windows partition was 411 GB with only 100 GB used. Windows 10 would only shrink by a maximum of 25 GB because it saw used files near the end of the partition. If any more was needed Windows 10 would have to defragment the disk.
