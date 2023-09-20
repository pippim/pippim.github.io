---
layout:       post
title:        >
    What happens if you mount to a non-empty mount point with fuse?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63984397
type:         Answer
tags:         linux fuse
created_date: 2020-09-20 22:55:27
edit_date:    
votes:        "3 "
favorites:    
views:        "148,721 "
accepted:     
uploaded:     2023-09-19 23:21:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-20-What-happens-if-you-mount-to-a-non-empty-mount-point-with-fuse_.md
toc:          false
navigation:   false
clipboard:    false
---

For me the error message goes away if I unmount the old mount before mounting it again:

``` 
fusermount -u /mnt/point
```

If it's not already mounted you get a non-critical error:

``` 
$ fusermount -u /mnt/point

fusermount: entry for /mnt/point not found in /etc/mtab
```

So in my script I just put unmount it before mounting it.
