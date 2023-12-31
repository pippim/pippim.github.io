---
layout:       post
title:        >
    How to quickly move into and from deeply nested directories through CLI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1276377
type:         Answer
tags:         command-line bash directory
created_date: 2020-09-20 00:18:34
edit_date:    2020-11-17 11:49:23
votes:        "0 "
favorites:    
views:        "34,081 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-20-How-to-quickly-move-into-and-from-deeply-nested-directories-through-CLI_.md
toc:          false
navigation:   false
clipboard:    false
---

I wrote a [script][1] this afternoon to make it easier to change directories.

# Usage

When you call `cdd` and there is more than one sub-directory you need to pick one:

[![cdd.png][2]][2]

In this screen if you click **OK** button it is equivalent to:

``` none
cd Seven\ Mary\ Three
```

or:

``` none
cd "Seven Mary Three"
```

When you call `cdd` and there is only one sub-directory it automatically changes to it:

``` none
rick@alien:~/Music/Seven Mary Three$ cdd
rick@alien:~/Music/Seven Mary Three/American Standard$ 
```

When you call `cdd` and there are no sub-directories an error is displayed:

``` none
rick@alien:~/Music/Seven Mary Three/American Standard$ cdd
No subdirectories
rick@alien:~/Music/Seven Mary Three/American Standard$ 
```


  [1]: https://askubuntu.com/a/1276376/307523
  [2]: https://i.stack.imgur.com/0qG4p.png
