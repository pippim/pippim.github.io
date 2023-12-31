---
layout:       post
title:        >
    How can I get kernel 3.7.1 header files in Ubuntu 16.04 x32?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195135
type:         Answer
tags:         apt kernel ppa
created_date: 2019-12-10 12:04:17
edit_date:    
votes:        "0 "
favorites:    
views:        "391 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-10-How-can-I-get-kernel-3.7.1-header-files-in-Ubuntu-16.04-x32_.md
toc:          false
navigation:   false
clipboard:    false
---

This answer shows how version 3.7.1 might be found under a different numbering scheme:

- [Install linux headers 3.7 on debian 8][1]

In this case the equivalent kernel version for Debian was `linux-headers-3.16.0.4-all`.

In Ubuntu the `3.16` equivalent would probably best be found by matching up the published dates in the Ubuntu Mainline Kernel page you already linked.

  [1]: https://unix.stackexchange.com/questions/214385/install-linux-headers-3-7-on-debian-8
