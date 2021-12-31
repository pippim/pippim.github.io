---
layout:       post
title:        >
    Can I safely resize Windows 10 system partition from Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030518
type:         Answer
tags:         dual-boot partitioning gparted
created_date: !!str "2018-05-01 10:34:33"
edit_date:    !!str "2018-05-01 10:52:57"
votes:        !!str "5"
favorites:    
views:        !!str "8,747"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

The safest way is to use Windows 10 to shrink it's own partition.

Windows 10 knows more about the last used area of the disk partition. Ubuntu / gparted cannot shrink the partition reliably as Windows 10 can.

For example last weekend I wanted to clone 16.04 and do a test run upgrade to 18.04. My Windows partition was 411 GB with only 100 GB used. Windows 10 would only shrink by a maximum of 25 GB because it saw used files near the end of the partition. If any more was needed Windows 10 would have to defragment the disk.
