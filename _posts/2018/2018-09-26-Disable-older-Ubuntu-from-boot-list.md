---
layout:       post
title:        >
    Disable older Ubuntu from boot list
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1078472
type:         Answer
tags:         boot dual-boot grub2 ssd
created_date: 2018-09-26 01:14:41
edit_date:    
votes:        "0 "
favorites:    
views:        "53 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-26-Disable-older-Ubuntu-from-boot-list.md
toc:          false
navigation:   false
clipboard:    false
---

From [Stack Exchange][1] the easiest way is editing `/etc/default/grub` and inserting the line:

``` 
GRUB_DISABLE_OS_PROBER=true
```

Then save the file and run `sudo update-grub`.

If you have an older version of grub refer to the link for other options.


  [1]: https://unix.stackexchange.com/questions/56004/how-to-stop-update-grub-from-scanning-all-drives
