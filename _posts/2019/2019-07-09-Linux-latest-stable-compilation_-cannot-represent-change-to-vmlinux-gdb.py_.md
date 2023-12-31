---
layout:       post
title:        >
    Linux latest stable compilation: cannot represent change to vmlinux-gdb.py:
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/56961763
type:         Answer
tags:         git compilation linux-kernel
created_date: 2019-07-09 23:51:16
edit_date:    
votes:        "1 "
favorites:    
views:        "9,417 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-09-Linux-latest-stable-compilation_-cannot-represent-change-to-vmlinux-gdb.py_.md
toc:          false
navigation:   false
clipboard:    false
---

You can simply take the precompiled driver from the previous kernel and [force it into the new kernel][1] with `-f` parameter. You will simply get a "taints kernel" message in `journalctl` but you can ignore it.

As long as the [ABI][2] doesn't change you should be good to go.


  [1]: https://www.symantec.com/connect/articles/compiling-drivers-linux-and-adding-them-your-linux-automation-image
  [2]: https://en.wikipedia.org/wiki/Linux_kernel_interfaces#Linux_ABI
