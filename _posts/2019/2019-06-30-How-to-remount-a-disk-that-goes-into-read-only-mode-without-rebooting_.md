---
layout:       post
title:        >
    How to remount a disk that goes into read-only mode without rebooting?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155086
type:         Answer
tags:         boot partitioning mount hard-drive ssd
created_date: 2019-06-30 23:21:56
edit_date:    2019-07-01 22:22:32
votes:        "3 "
favorites:    
views:        "7,012 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-30-How-to-remount-a-disk-that-goes-into-read-only-mode-without-rebooting_.md
toc:          false
navigation:   false
clipboard:    false
---

From [Linux, how to change HDD state from ReadOnly after temporarly crash?](https://unix.stackexchange.com/questions/74090/linux-how-to-change-hdd-state-from-readonly-after-temporarly-crash) the accepted answer (with 12 upvotes, at the time of this writing) states:

> try with `blockdev --setrw` or `hdparm -r 0`  
