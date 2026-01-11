---
layout:       post
title:        >
    Slow Ubuntu Boot [ata2: SRST failed (errno=-16)] and [ata2: reset failed, giving up]
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132854
type:         Answer
tags:         boot hard-drive sata
created_date: 2019-04-10 23:06:37
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "18,091 "
accepted:     
uploaded:     2026-01-11 15:47:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-10-Slow-Ubuntu-Boot-_ata2_-SRST-failed-_errno_-16__-and-_ata2_-reset-failed_-giving-up_.md
toc:          false
navigation:   false
clipboard:    false
---

# Step 1 - Identify ATA2

It's a guess that `ATA2` references `/dev/sdb`. The way to find out for sure is using:

``` 
$ ll /sys/block/
total 0
drwxr-xr-x  2 root root 0 Apr 10 16:46 ./
dr-xr-xr-x 13 root root 0 Apr  4 21:05 ../
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop0 -> ../devices/virtual/block/loop0/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop1 -> ../devices/virtual/block/loop1/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop2 -> ../devices/virtual/block/loop2/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop3 -> ../devices/virtual/block/loop3/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop4 -> ../devices/virtual/block/loop4/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop5 -> ../devices/virtual/block/loop5/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop6 -> ../devices/virtual/block/loop6/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 loop7 -> ../devices/virtual/block/loop7/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 nvme0n1 -> ../devices/pci0000:00/0000:00:1d.0/0000:3e:00.0/nvme/nvme0/nvme0n1/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 sda -> ../devices/pci0000:00/0000:00:17.0/ata2/host1/target1:0:0/1:0:0:0/block/sda/
lrwxrwxrwx  1 root root 0 Apr 10 16:46 sr0 -> ../devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.3/1-1.3:1.0/host2/target2:0:0/2:0:0:0/block/sr0/
```

Ignore the `loop1` through `loop7` entries.

- `sda` (a hard drive) is on channel `ata2`
- `nvme0n1` (an SSD) is on `0000:3e:00.0` (actually hardwired to the CPU @ 40 GB/s)
- `sr0` is on `usb1`

So your first step is to discover which devices are on `ata2`

# Step 2 - Check devices

`ide` devices can be chained with master/slave arrangement and if on `ata2` you might need to check their settings whilst removing them one by one to ascertain which is defective.

Someone with same error discovered their DVD/CD drive on `ata2` was the culprit and defective: [&quot;ata2: link is slow to respond, please be patient&quot; during boot](&quot;ata2: link is slow to respond, please be patient&quot; during boot)

Another person found a defective SSD was the problem: [ata1: link is slow to respond, please be patient (ready=0)][1]

By all means run `fsck` or whatever drive testing utilities at your disposal too.


  [1]: https://forums.fedoraforum.org/showthread.php?312834-ata1-link-is-slow-to-respond-please-be-patient-(ready-0)
