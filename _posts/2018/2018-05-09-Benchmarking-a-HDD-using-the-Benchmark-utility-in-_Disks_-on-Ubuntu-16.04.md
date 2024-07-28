---
layout:       post
title:        >
    Benchmarking a HDD using the Benchmark utility in "Disks" on Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033986
type:         Answer
tags:         hard-drive performance benchmarks
created_date: 2018-05-09 11:07:51
edit_date:    
votes:        "7 "
favorites:    
views:        "0 "
accepted:     Accepted
uploaded:     2024-07-28 15:18:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-09-Benchmarking-a-HDD-using-the-Benchmark-utility-in-_Disks_-on-Ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

`hdparm` is a standard CLI for testing disk speed and the drives don't have to be mounted (when doing read tests).

``` 
$ sudo hdparm -tT /dev/nvme0n1

/dev/nvme0n1:
 Timing cached reads:   20760 MB in  1.99 seconds = 10414.33 MB/sec
 Timing buffered disk reads: 5104 MB in  3.00 seconds = 1701.12 MB/sec

$ sudo hdparm -tT /dev/sdb

/dev/sdb:
 Timing cached reads:   18822 MB in  1.99 seconds = 9442.74 MB/sec
 Timing buffered disk reads:  80 MB in  3.08 seconds =  26.01 MB/sec
```

The first drive is an SSD and the second drive is a USB pen drive.
