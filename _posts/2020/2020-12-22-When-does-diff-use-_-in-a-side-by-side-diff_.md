---
layout:       post
title:        >
    When does diff use | in a side by side diff?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1302074
type:         Answer
tags:         diff
created_date: 2020-12-22 12:52:25
edit_date:    2022-03-22 12:22:37
votes:        "2 "
favorites:    
views:        "93 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-22-When-does-diff-use-_-in-a-side-by-side-diff_.md
toc:          false
navigation:   false
clipboard:    false
---

This is the best description of ["incomplete line"][1] I could find:

> When the last line of a file ends with a new line character it is a "complete line". Otherwise it is an "incomplete line".  

For example, suppose F and G are one-byte files that contain just f and g, respectively. Then `diff F G` outputs:

``` 
1c1
< f
\ No newline at end of file
---
> g
\ No newline at end of file
```


  [1]: https://www.linuxtopia.org/online_books/linux_tool_guides/comparing_and_merging_linux_files/diff_042.html
