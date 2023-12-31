---
layout:       post
title:        >
    Ubuntu is asking for sudo password on startup
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187283
type:         Answer
tags:         password startup sh
created_date: 2019-11-08 13:58:01
edit_date:    
votes:        "1 "
favorites:    
views:        "750 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-08-Ubuntu-is-asking-for-sudo-password-on-startup.md
toc:          false
navigation:   false
clipboard:    false
---

Sudo isn't needed to launch `/bin/sh` so your permissions may have changed. Use this to check:



``` sh
$ ll /bin/sh
lrwxrwxrwx 1 root root 4 Aug  2  2018 /bin/sh -> dash*

$ ll /bin/dash
-rwxr-xr-x 1 root root 154072 Feb 17  2016 /bin/dash*
```

Here `/bin/sh` is a link that all users have read/write/execute permissions to. The link points to `dash` so run `ll` on it as well to see that all users have read & execute permissions.

If your permissions are setup correctly, then there is something amiss with the program you are running on startup.
