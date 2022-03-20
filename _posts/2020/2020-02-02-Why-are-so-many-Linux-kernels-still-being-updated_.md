---
layout:       post
title:        >
    Why are so many Linux kernels still being updated?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1207540
type:         Answer
tags:         kernel
created_date: 2020-02-02 12:49:19
edit_date:    
votes:        "4 "
favorites:    
views:        "1,392 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-02-Why-are-so-many-Linux-kernels-still-being-updated_.md
toc:          false
navigation:   false
clipboard:    false
---

New hardware is supported in major kernel numbering changes. For example as of today it would to `5.3` to `5.4` to `5.5`, etc. Besides new hardware support bug fixes will also be in these major kernel numbering releases. However bug fixes will also be released at the same time to older LTS (Long Term Support) kernels.

I'm on LTS kernel version `4.14` which was recently upgraded to minor version `.168`. Looking at the release notes we see a frequent contributor here in **Ask Ubuntu** has written some [bug fixes][1] for `4.14.168`:

``` 
Colin Ian King (14):
      pcrypt: use format specifier in kobject_add
      staging: most: cdev: add missing check for cdev_add failure
      rtc: ds1672: fix unintended sign extension
      rtc: 88pm860x: fix unintended sign extension
      rtc: 88pm80x: fix unintended sign extension
      rtc: pm8xxx: fix unintended sign extension
      drm/nouveau/bios/ramcfg: fix missing parentheses when calculating RON
      drm/nouveau/pmu: don't print reply values if exec is false
      platform/x86: alienware-wmi: fix kfree on potentially uninitialized pointer
      media: vivid: fix incorrect assignment operation when setting video mode
      scsi: libfc: fix null pointer dereference on a null lport
      ext4: set error return correctly when ext4_htree_store_dirent fails
      bcma: fix incorrect update of BCMA_CORE_PCI_MDIO_DATA
      iio: dac: ad5380: fix incorrect assignment to val
```

Although my system is extremely stable I'm none-the-less interested in this bug fix:

``` 
platform/x86: alienware-wmi: fix kfree on potentially uninitialized pointer
```

Even though my Alienware laptop is two years old I would like to have this bug fix applied "just in case".

Besides bug fixes there are security fixes to consider:

- [Secondary monitor not recognized under Ubuntu 16.04 with kernel 4.7.4]({% post_url /2016/2016-09-20-Secondary-monitor-not-recognized-under-Ubuntu-16.04-with-kernel-4.7.4 %})
- [What is Ubuntu&#39;s status on the Meltdown and Spectre vulnerabilities?](What is Ubuntu&#39;s status on the Meltdown and Spectre vulnerabilities?)

In the last security fix the problem was with Intel chips predictive branching technology and was around for many years. Besides Linux, ***Windows and Mac were effected as well***.

  [1]: https://lwn.net/Articles/810637/
