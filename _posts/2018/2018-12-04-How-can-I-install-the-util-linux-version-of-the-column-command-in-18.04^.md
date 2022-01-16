---
layout:       post
title:        >
    How can I install the util linux version of the column command in 18.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1098274
type:         Answer
tags:         command-line software-installation
created_date: 2018-12-04 02:10:58
edit_date:    
votes:        "7 "
favorites:    
views:        "3,280 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-04-How-can-I-install-the-util-linux-version-of-the-column-command-in-18.04^.md
toc:          false
navigation:   false
clipboard:    false
---

There is a [bug report][1] on this problem you can subscribe to. The more people that subscribe the greater chances it will be fixed:

> The 'column' program included in upstream util-linux  
> (https://git.kernel.org/pub/scm/utils/util-linux/util-linux.git/tree/text-utils/column.c)  
> is newer than the included in the bsdmainutil package  
> (https://anonscm.debian.org/cgit/bsdmainutils/bsdmainutils.git/tree/usr.bin/column/column.c).  
> However, debian/rules from util-linux package states the opposite, and  
> therefore Ubuntu now is using 'column' from bsdmainutils instead of  
> the util-linux one.  


  [1]: https://bugs.launchpad.net/ubuntu/+source/util-linux/+bug/1705437
