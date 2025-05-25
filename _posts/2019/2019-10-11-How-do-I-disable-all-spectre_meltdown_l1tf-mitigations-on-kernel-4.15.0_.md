---
layout:       post
title:        >
    How do I disable all spectre/meltdown/l1tf mitigations on kernel 4.15.0?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180250
type:         Answer
tags:         kernel grub
created_date: 2019-10-11 11:27:41
edit_date:    
votes:        "2 "
favorites:    
views:        "2,272 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-11-How-do-I-disable-all-spectre_meltdown_l1tf-mitigations-on-kernel-4.15.0_.md
toc:          false
navigation:   false
clipboard:    false
---

I can't answer your VPS provider side of the question, but in my grub I use:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="noplymouth loglevel=4 fastboot acpiphp.disable=1 pcie_aspm=force vt.handoff=7 i915.fastboot=1 nopti nospectre_v2 nospec mem_sleep_default=deep nouveau.nomodeset=0"


# Aug 16/2018 - i915.edp_vswing=2 comes from Ask Ubuntu Dell XPS 15 9350 screen flickering:
#               https://askubuntu.com/a/1064747/307523
# Aug 11/2018 - 10% performance boost eliminating Meltdown & Spectre support:
#               "nopti nospectre_v2 nospec"
```

I left some of the grub comments in this answer in case that helps.
