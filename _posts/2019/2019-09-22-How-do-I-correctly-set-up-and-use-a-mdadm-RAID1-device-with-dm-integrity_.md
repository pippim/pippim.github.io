---
layout:       post
title:        >
    How do I correctly set up and use a mdadm RAID1 device with dm-integrity?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1175865
type:         Answer
tags:         partitioning mount hard-drive raid mdadm
created_date: 2019-09-22 14:50:24
edit_date:    
votes:        "0 "
favorites:    
views:        "1,928 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-22-How-do-I-correctly-set-up-and-use-a-mdadm-RAID1-device-with-dm-integrity_.md
toc:          false
navigation:   false
clipboard:    false
---

# Short Answer

After you've created your device use:

``` 
integritysetup status <name>
```

# Long Answer

In terminal you can use `man dm-integrity` to read your options. Eeryone else can read the same on the internet:

- http://man7.org/linux/man-pages/man8/integritysetup.8.html

### NAME

``` 
   integritysetup - manage dm-integrity (block level integrity) volumes
```

### SYNOPSIS

``` 
   integritysetup <options> <action> <action args>
```

### DESCRIPTION

``` 
   Integritysetup is used to configure dm-integrity managed device-
   mapper mappings.

   Device-mapper integrity target provides read-write transparent
   integrity checking of block devices. The dm-integrity target emulates
   additional data integrity field per-sector. You can use this
   additional field directly with integritysetup utility, or indirectly
   (for authenticated encryption) through cryptsetup.

   Integritysetup supports these operations:

   format <device>

          Formats <device> (calculates space and dm-integrity superblock
          and wipes the device).

          <options> can be [--data-device, --batch-mode, --no-wipe,
          --journal-size, --interleave-sectors, --tag-size, --integrity,
          --integrity-key-size, --integrity-key-file, --sector-size,
          --progress-frequency]

   open <device> <name>
   create <name> <device> (OBSOLETE syntax)

          Open a mapping with <name> backed by device <device>.

          <options> can be [--data-device, --batch-mode,
          --journal-watermark, --journal-commit-time, --buffer-sectors,
          --integrity, --integrity-key-size, --integrity-key-file,
          --integrity-no-journal, --integrity-recalculate,
          --integrity-recovery-mode]

   close <name>

          Removes existing mapping <name>.

          For backward compatibility, there is remove command alias for
          the close command.

   status <name>

          Reports status for the active integrity mapping <name>.

   dump <device>

          Reports parameters from on-disk stored superblock.
```
