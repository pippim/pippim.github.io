---
layout:       post
title:        >
    Is there a way of limiting the Kernel's memory manager to use only 75% of memory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1031774
type:         Answer
tags:         kernel vmware ram memory-usage cache
created_date: 2018-05-03 23:51:15
edit_date:    
votes:        "2 "
favorites:    
views:        "339 "
accepted:     Accepted
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-03-Is-there-a-way-of-limiting-the-Kernel^s-memory-manager-to-use-only-75^-of-memory^.md
toc:          false
navigation:   false
clipboard:    false
---

The only way I can think of is to tell the Kernel 25% of the memory is bad and not to use it.

This [Unix & Linux Q&A][1] has excellent instructions. Here is a snippet:

If there's bad RAM at 802M and 807M, you can disable a 10M section of RAM starting at 800M like this:

``` 
memmap=10M$800M
```



  [1]: https://unix.stackexchange.com/questions/75059/how-to-blacklist-a-correct-bad-ram-sector-according-to-memtest86-error-indicati?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
