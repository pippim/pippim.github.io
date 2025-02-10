---
layout:       post
title:        >
    What is gvfsd-metadata?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195785
type:         Answer
tags:         nautilus metadata
created_date: 2019-12-13 01:14:37
edit_date:    2019-12-13 11:33:02
votes:        "2 "
favorites:    
views:        "25,362 "
accepted:     
uploaded:     2025-02-10 14:32:12
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-13-What-is-gvfsd-metadata_.md
toc:          false
navigation:   false
clipboard:    false
---

`gvfsd-metadata` is used by `nautilus` and other gnome utilities. What is happening to you could be this problem:

- [Why ``gvfsd-metadata`` process is hogging 100% of a single core for a long time][1]

The solution:

``` 
pkill gvfsd-metadata 
rm -rf .local/share/gvfs-metadata
```


  [1]: https://unix.stackexchange.com/questions/108254/why-gvfsd-metadata-process-is-hogging-100-of-a-single-core-for-a-long-time
