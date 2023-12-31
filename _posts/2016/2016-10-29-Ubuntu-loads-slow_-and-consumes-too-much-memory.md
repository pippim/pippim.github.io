---
layout:       post
title:        >
    Ubuntu loads slow, and consumes too much memory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/843002
type:         Answer
tags:         boot ram conky
created_date: 2016-10-29 00:19:04
edit_date:    
votes:        "1 "
favorites:    
views:        "1,595 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-29-Ubuntu-loads-slow_-and-consumes-too-much-memory.md
toc:          false
navigation:   false
clipboard:    false
---

When you say "System Monitor" I presume you mean "Conky". Edit your conky configuration file with `gedit ~/.conkyrc` and insert the line:

`no_buffers yes # Subtract cached and buffered ram from memory usage.`

The comment after `#` is optional. Search on "no_buffers" and make sure the line doesn't appear again with "no_buffers no" just to be safe.

To see what was included in the total before (but is now taken out) you can report them individually with:

``` 
Cache RAM: ${cached} Buffers: ${buffers}
```

On my system which is also 8 GB, my conky shows memory used 4.25GB, Cached  RAM 2.94 GB and Buffers 207 MB. This explains where your "lost RAM" is.

Cached memory is areas of RAM the Kernel stores information from disk to speed up access. Basically most of RAM applications aren't the kernel will cache to speed up access.

As far as Chrome is concerned when it is running and you press <kbd>Shift</kbd>+<kbd>Esc</kbd> it will display all tabs and the amount of RAM used. Some websites, especially those with videos and streaming user comments can get out of control and consume a 500 MB of RAM after a couple of hours. By clicking the refresh button these tabs will regain the memory leaks.

