---
layout:       post
title:        >
    dkms failure because gcc version is newer than that used to compile kernel
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1143439
type:         Answer
tags:         package-management upgrade dkms
created_date: 2019-05-15 10:57:09
edit_date:    
votes:        "3 "
favorites:    
views:        "20,672 "
accepted:     
uploaded:     2024-03-11 05:28:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-15-dkms-failure-because-gcc-version-is-newer-than-that-used-to-compile-kernel.md
toc:          false
navigation:   false
clipboard:    false
---

As per this [lengthy Debian report bug][1] enter:

``` 
IGNORE_CC_MISMATCH=1
```

before upgrading.


  [1]: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=908568
