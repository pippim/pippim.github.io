---
layout:       post
title:        >
    What are Kernel Version number components (w.x.yy-zzz) called?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/843198
type:         Answer
tags:         kernel
created_date: 2016-10-29 14:51:48
edit_date:    2022-01-05 17:20:13
votes:        "6 "
favorites:    
views:        "31,471 "
accepted:     
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-29-What-are-Kernel-Version-number-components-_w.x.yy-zzz_-called_.md
toc:          false
navigation:   false
clipboard:    false
---

### Kernel Version . Major Revision . Minor Revision - Patch

Using **w.xx.y-zzz** and looking at the fourth file listed `/boot/vmlinuz-4.4.0-45` we can say:

 - **w** = Kernel Version = 4
 - **xx**= Major Revision = 4
 - **y** = Minor Revision = 0
 - **zzz**=Patch number = 45

If someone is using `4.8.0`, which Ubuntu 16.10 ships with, and encounters screen flickering they might say "I used the previous version 4.4.0-45" (which Ubuntu 16.04 uses) to fix the problem.

In layman's terms, this is correct but technically it was a downgrade four major revision levels (4.8.y-z) to (4.4.y-z). Technically speaking, to move from kernel version 4.8 to a previous kernel version it would have to be 3.2 or 3.13 using the file listing shown in the OP.

### Segment name changes after Kernel 3.0

The above definitions come from: ([Kernel Version Numbering][1]) published May 9, 2006 but are now obsolete.

As the duplicate comment link ([What does the fourth number in the release version mean?][2]) states, the new names are:

``` 
<base kernel version>.<ABI number>.<upload number>-<flavour>
```

The proposed duplicate appears to be wrong because the second segment in the kernel version number seems to have nothing to do with `ABI`. In the other answer posted in this thread the fourth segment is tied to `ABI` but that doesn't seem right either. Here's the top of the list of ABI changes from ([Linux Kernel ABI Timeline][3]):

``` 
                ----- Symbols -----
Version	Date    Added Removed Total
4.8.1	2016-10-07	141	50	1470
4.7.2	2016-08-20	170	42	881
4.6.1	2016-06-01	159	52	924
4.5.6	2016-06-01	146	41	994
4.4.5	2016-03-10	87	40	994
4.3.6	2016-02-20	166	51	1231
4.2.8	2015-12-15	213	75	1768
4.1.19	2016-03-05	204	88	1760
4.0.9	2015-07-21	159	53	822
3.19.8	2015-05-11	207	44	1146
3.18.28	2016-03-05	147	56	867
3.17.8	2015-01-08	165	46	688
3.16.7	2014-10-30	155	55	943
3.15.10	2014-08-14	129	98	1051
3.14.64	2016-03-10	279	91	1019
3.13.11	2014-04-23	140	99	822
3.12.56	2016-03-04	171	77	994
```

### ABI number

From `wiki.ubuntu` we learn:

> ABI stands for Application Binary Interface. For the kernel, this  
> boils down to the exported functions that modules (AKA drivers) can  
> use to do things in kernel space. Most of these exported functions are  
> available directly from the kernel (vmlinux), but a good portion is  
> also exported from other modules. These functions allow modules to  
> make use of subsystems in the kernel for memory management, device  
> interfaces, filesystems (VFS), networking stacks, etc.  

### Summary of Linux Kernel Version Numbering

From perhaps the most definitive source ([wikipedia.org - Linux Kernel Version Numbering][4]) we learn:

*The Linux kernel has had three different numbering schemes.* To summarize:

 - The first scheme was used in the run-up to "1.0". The first version
   of the kernel was 0.01. This was followed by 0.02, 0.03, 0.10, 0.11,
   0.12 (the first GPL version), 0.95, 0.96, 0.97, 0.98, 0.99 and then 1.0.[303] From 0.95 on there were many patch releases between versions.
 - After the 1.0 release and prior to version 2.6, the number was
   composed as "a.b.c", where the number "a" denoted the kernel version,
   the number "b" denoted the major revision of the kernel, and the
   number "c" indicated the minor revision of the kernel.
 - In 2004, after version 2.6.0 was released, the kernel developers held
   several discussions regarding the release and version
   scheme[304][305] and ultimately Linus Torvalds and others decided
   that a much shorter "time-based" release cycle would be beneficial.


  [1]: http://www.linfo.org/kernel_version_numbering.html
  [2]: https://askubuntu.com/questions/637852/what-does-the-fourth-number-in-the-release-version-mean
  [3]: https://abi-laboratory.pro/tracker/timeline/linux/
  [4]: https://en.wikipedia.org/wiki/Linux_kernel#Version_numbering
