---
layout:       post
title:        >
    strace hwinfo --dump-db 0 does not dump to /var/lib/hardware
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1018828
type:         Answer
tags:         command-line hardware
created_date: 2018-03-24 11:23:40
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "178 "
accepted:     Accepted
uploaded:     2024-03-03 10:35:34
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-24-strace-hwinfo-dump-db-0-does-not-dump-to-_var_lib_hardware.md
toc:          false
navigation:   false
clipboard:    false
---

There is a similar [bug report][1] in Ubuntu Launchpad for 16.10 not saving configuration files.

In summary the debian version wasn't creating the directories:

``` 
DIR PERMISSION
/var/lib/hardware 0755
/var/lib/hardware/udi 0755
```

I tried creating these directories manually after installing `hwinfo` but the command to dump the database still wouldn't work for me.

I suggest filing a bug report.

  [1]: https://bugs.launchpad.net/ubuntu/+source/hwinfo/+bug/1657544
