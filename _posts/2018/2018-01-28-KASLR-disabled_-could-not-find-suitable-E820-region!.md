---
layout:       post
title:        >
    KASLR disabled: could not find suitable E820 region!
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000559
type:         Answer
tags:         boot kernel virtualbox
created_date: 2018-01-28 01:25:31
edit_date:    2018-01-28 01:39:07
votes:        "3 "
favorites:    
views:        "5,037 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-28-KASLR-disabled_-could-not-find-suitable-E820-region!.md
toc:          false
navigation:   false
clipboard:    false
---

# Boot Fix

In order to boot properly in the first place, highlight your Ubuntu option and press <kbd>e</kbd> to edit the boot parameters. Manually insert `nokaslr` behind `quiet splash` and then press <kbd>F10</kbd> to continue booting.


# Permanent Fix

Using `sudo` powers edit your `/etc/default/grub` and add the option `nokaslr` to the line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nokaslr"
```

You may have other options besides `quiet splash` which you will want to leave in place. Save the file and exit your editor. Then run:

``` 
sudo update-grub
```

# Second Option

If inserting `nokaslr` above doesn't work, then repeat both sections above but insert `kaslr` instead.

# TL;DR

KASLR randomizes the layout of Kernel address space making it harder for snooping programs to hack kernel working storage and obtain passwords. It was superceded by KAISER which was superceded KPTI (Kernel Page Table Isolation) for Meltdown and Spectre Security hole violations.
