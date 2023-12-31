---
layout:       post
title:        >
    Formatting Hard Drives Takes Ages
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019788
type:         Answer
tags:         format
created_date: 2018-03-27 22:03:17
edit_date:    2018-03-27 22:08:22
votes:        "0 "
favorites:    
views:        "14,575 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-27-Formatting-Hard-Drives-Takes-Ages.md
toc:          false
navigation:   false
clipboard:    false
---

Sometimes disk creator or gparted messes up my USB  stick so I quick format it with:

``` 
dd if=/dev/zero of=/dev/sdX bs=512 count=1
```

It is very quick writing 512 bytes to remove the MBR (Master Boot Record).

In simple terms you changed count size from 1 to 6 billion. This is normally only done when you dispose of an old drive with financial secrets.

You can safely abort the long format and restart with creating partitions only.
