---
layout:       post
title:        >
    Failed to write (No space left on device)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/824760
type:         Answer
tags:         apt virtualbox xubuntu dependencies disk-usage
created_date: 2016-09-14 10:27:12
edit_date:    2017-04-13 12:23:12
votes:        "4 "
favorites:    
views:        "31,195 "
accepted:     
uploaded:     2022-01-14 05:03:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-14-Failed-to-write-(No-space-left-on-device).md
toc:          false
navigation:   false
clipboard:    false
---

Your problem isn't the 18GB free on `/`

The problem is:

``` 
/dev/sda1                  236M  226M     0 100% /boot

```

The package installer is working on `/boot/vmlinuz-3.13.0-91-generic` and there is no space available.

You need to increase the size of this partition.

As Anwar stated in comment a minute ago see: [askubuntu.how-do-i-increase-the-size-of-boot][1]

Originally I said to see the Q&A: [askubuntu.com ..how-to-increase-size-of-boot-partition-using-gparted][2] which is also helpful.


  [1]: https://askubuntu.com/questions/717698/how-do-i-increase-the-size-of-boot
  [2]: https://askubuntu.com/questions/671788/how-to-increase-size-of-boot-partition-using-gparted
