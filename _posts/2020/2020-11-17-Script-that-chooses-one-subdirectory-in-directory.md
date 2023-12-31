---
layout:       post
title:        >
    Script that chooses one subdirectory in directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1292993
type:         Answer
tags:         bash scripts directory
created_date: 2020-11-17 11:48:02
edit_date:    
votes:        "0 "
favorites:    
views:        "348 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-11-17-Script-that-chooses-one-subdirectory-in-directory.md
toc:          false
navigation:   false
clipboard:    false
---

I wrote this [script][1] to select long sub-directory names that are time consuming to type.

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


  [1]: {% post_url /2020/2020-09-20-How-can-I-move-down-one-directory %}
  [2]: https://i.stack.imgur.com/0qG4p.png
