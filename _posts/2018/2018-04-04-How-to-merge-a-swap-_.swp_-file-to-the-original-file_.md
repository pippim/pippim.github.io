---
layout:       post
title:        >
    How to merge a swap (.swp) file to the original file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021774
type:         Answer
tags:         files filesystem swap
created_date: 2018-04-04 02:57:27
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "18,580 "
accepted:     
uploaded:     2026-01-11 15:47:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-04-How-to-merge-a-swap-_.swp_-file-to-the-original-file_.md
toc:          false
navigation:   false
clipboard:    false
---

## Direct answer

To technically answer your question:

``` 
cat test.out > experiment.out
cat .test.out.swp >> experiment.out
```

The first redirection of the `cat` command `>` creates a new file. The second redirection of the `cat` command `>>` appends to the existing file.

In reality `experiment.out` probably won't be usable because you are adding an apple to an orange.

----------

## Alternative Repair

You can google repairing the files: [Superuser.com How can I recover the original file from a .swpfile?][1] In short use:

``` 
vim -r .swp
```

**Make copies of all files first!**

If that doesn't work I'd use `gedit` on both files in separate tabs and then in a third tab paste text copied from the first two tabs.

  [1]: https://superuser.com/questions/204209/how-can-i-recover-the-original-file-from-a-swp-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
