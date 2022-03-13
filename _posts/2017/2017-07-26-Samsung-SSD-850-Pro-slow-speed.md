---
layout:       post
title:        >
    Samsung SSD 850 Pro slow speed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/939990
type:         Answer
tags:         partitioning ssd performance
created_date: 2017-07-26 13:57:39
edit_date:    2017-07-26 14:33:42
votes:        "3 "
favorites:    
views:        "1,250 "
accepted:     Accepted
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-26-Samsung-SSD-850-Pro-slow-speed.md
toc:          false
navigation:   false
clipboard:    false
---

# SATA II channel (3 Gbps) vs. SATA III channel (6 Gbps)

Looking at your timings it is similar to my `/dev/sdc`

``` 
$ sudo hdparm -tT /dev/sdc

/dev/sdc:
 Timing cached reads:   20494 MB in  2.00 seconds = 10255.92 MB/sec
 Timing buffered disk reads: 812 MB in  3.00 seconds = 270.63 MB/sec
```

What you are hoping for is timings like my `/dev/sda`

``` 
$ sudo hdparm -tT /dev/sda

/dev/sda:
 Timing cached reads:   21598 MB in  2.00 seconds = 10809.23 MB/sec
 Timing buffered disk reads: 1566 MB in  3.00 seconds = 521.44 MB/sec
```

The explanation can be found using `dmesg | grep SATA`

``` 
$ dmesg | grep SATA
[    1.177247] ahci 0000:00:1f.2: AHCI 0001.0300 32 slots 6 ports 6 Gbps 0xf impl SATA mode
[    1.202732] ata1: SATA max UDMA/133 abar m2048@0xf1618000 port 0xf1618100 irq 27
[    1.202735] ata2: SATA max UDMA/133 abar m2048@0xf1618000 port 0xf1618180 irq 27
[    1.202736] ata3: SATA max UDMA/133 abar m2048@0xf1618000 port 0xf1618200 irq 27
[    1.202739] ata4: SATA max UDMA/133 abar m2048@0xf1618000 port 0xf1618280 irq 27
[    1.521294] ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
[    1.521318] ata3: SATA link up 3.0 Gbps (SStatus 123 SControl 300)
[    1.521337] ata2: SATA link up 3.0 Gbps (SStatus 123 SControl 300)
[    1.521356] ata4: SATA link up 1.5 Gbps (SStatus 113 SControl 300)
```

Both `/dev/sda` and `/dev/sdc` are SATA III SSD's but `sda` is on a 6 Gbps bus (ata1) and `sdc` is on a 3 Gbps bus.

# Comparison to SATA II 500GB HDD on a SATA III Channel

For comparison sakes here are the results of a 5400 rpm SATA II 500 GB HDD running on a SATA III (6 Gbps) channel:

``` 
$ sudo hdparm -tT /dev/sdb

/dev/sdb:
 Timing cached reads:   20632 MB in  2.00 seconds = 10325.32 MB/sec
 Timing buffered disk reads: 340 MB in  3.02 seconds = 112.76 MB/sec
```

# Summary

This is a laptop and only has two SATA channels:

- ata1 and ata2 are SATA III channels (6 Gbps)
- ata3 and ata4 are SATA II channels (3 Gbps)

Linux/Ubuntu matches the device's SATA ability and channel's SATA ability to the lowest common denominator:

- ata1 has a 240GB SSD SATA III attached.
- ata2 has a 500GB HDD SATA II attached to SATA III channel.
- ata3 has a 120GB PCIe half-height SSD SATA III attached to SATA II channel.
- ata4 has a CD/DVD optical drive SATA I (1.5 Gbps) attached to SATA II channel.

