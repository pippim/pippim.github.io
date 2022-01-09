---
layout:       post
title:        >
    Is it possible to schedule `fsck` command and run it in background?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189127
type:         Answer
tags:         command-line fsck schedule grub
created_date: 2019-11-15 20:43:40
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,122 "
accepted:     
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## The Myth - "NO it can't be done"

All these most popular google search hits ignore the question or say **NO** it can't be done. That isn't true though. `fsck` is scheduled to run during boot before the filesystem is mounted as `rw` (read/write). As such most answers says it can't be run after system is fully booted:

- [Can I run fsck or e2fsck when Linux file system is mounted?](Can I run fsck or e2fsck when Linux file system is mounted?)
- [Doing disk checks on mounted OS partition?](Doing disk checks on mounted OS partition?)
- [Is it possible to run fsck to only see errors on mounted disk][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Why it needs to be done

This is a good question for some types of users. 

- Sometimes I can go weeks before rebooting my laptop and will not get the benefit of `fsck` regularly.
- Other times I can reboot dozens of times an hour as I try out a new grub theme or switch between distributions to compare functionality. In this case I don't want to wait the extra 30 seconds for `fsck` to run. As such I have it disabled during boot.

## What the manual says about how it can be done

You can run `fsck -n` but it won't accurately report errors for ReiserFS (whatever that filesystem is). There is another obscure file system called it refuses to check altogether.

{% include copyHeader.html %}
``` 
$ man fsck

FSCK(8)                              System Administration                             FSCK(8)
    NAME

       fsck - check and repair a Linux filesystem

SYNOPSIS
       fsck  [-lsAVRTMNP]  [-r  [fd]] [-C [fd]] [-t fstype] [filesystem...] [--] [fs-specific-
       options]

DESCRIPTION
       fsck is used to check and optionally repair one or more Linux filesystems.  filesys can
       be a device name (e.g.  /dev/hdc1, /dev/sdb2), a mount point (e.g.  /, /usr, /home), or
       an ext2 label or UUID  specifier  (e.g.   UUID=8868abf6-88c5-4a83-98b8-bfc24057f7bd  or
       LABEL=root).   Normally,  the  fsck program will try to handle filesystems on different
       physical disk drives in parallel to reduce the total amount of time needed to check all
       of them.

       If  no  filesystems  are specified on the command line, and the -A option is not speci‐
       fied, fsck will default to checking filesystems in /etc/fstab serially.  This is equiv‐
       alent to the -As options.

       The exit code returned by fsck is the sum of the following conditions:

              0      No errors
              1      Filesystem errors corrected
              2      System should be rebooted
              4      Filesystem errors left uncorrected
              8      Operational error
              16     Usage or syntax error

OPTIONS

       -n     For some filesystem-specific checkers, the -n option will cause the  fs-specific
              fsck to avoid attempting to repair any problems, but simply report such problems
              to stdout.  This is however not true for all filesystem-specific  checkers.   In
              particular,  fsck.reiserfs(8)  will  not  report  any  corruption  if given this
              option.  fsck.minix(8) does not support the -n option at all.

```

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## What it looks like checking mounted partitions

I have three partitions; Old (broken) Ubuntu 16.04, Ubuntu 19.04 (called `Ubuntu 18.04`) and New Ubuntu 16.04. When running `fchk` they look like this:

{% include copyHeader.html %}
``` 
$ sudo fsck -n /dev/nvme0n1p7
fsck from util-linux 2.27.1
e2fsck 1.42.13 (17-May-2015)
Warning!  /dev/nvme0n1p7 is mounted.
Warning: skipping journal recovery because doing a read-only filesystem check.
Old_Ubuntu_16.04 has been mounted 358 times without being checked, check forced.
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
Old_Ubuntu_16.04: 433493/1515520 files (0.8% non-contiguous), 4956946/6061568 blocks

$ sudo fsck -n /dev/nvme0n1p10
fsck from util-linux 2.27.1
e2fsck 1.42.13 (17-May-2015)
Warning!  /dev/nvme0n1p10 is mounted.
Warning: skipping journal recovery because doing a read-only filesystem check.
Ubuntu_18.04: clean, 719735/1782368 files, 5770105/7129088 blocks

$ sudo fsck -n /dev/nvme0n1p6
fsck from util-linux 2.27.1
e2fsck 1.42.13 (17-May-2015)
Warning!  /dev/nvme0n1p6 is mounted.
Warning: skipping journal recovery because doing a read-only filesystem check.
New_Ubuntu_16.04: clean, 833786/2953920 files, 8256858/11829504 blocks

```

As you can see `fsck` is telling us Old Ubuntu 16.04 requires a real `fsck` be run with system mounted in `ro` (read only mode) so fixes can be applied if necessary. However I already know it is broken.


----------


Later I'll update this answer with a cron weekly job that runs `fsck` on three mounted Ubuntu partitions in check only mode.

  [1]: https://unix.stackexchange.com/questions/439675/is-it-possible-to-run-fsck-to-only-see-errors-on-mounted-disk


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

