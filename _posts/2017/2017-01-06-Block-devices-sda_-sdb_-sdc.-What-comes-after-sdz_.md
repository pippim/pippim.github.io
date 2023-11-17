---
layout:       post
title:        >
    Block devices sda, sdb, sdc. What comes after sdz?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/868688
type:         Answer
tags:         kernel hard-drive
created_date: 2017-01-06 11:53:34
edit_date:    
votes:        "4 "
favorites:    
views:        "10,003 "
accepted:     
uploaded:     2023-11-17 06:08:54
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-06-Block-devices-sda_-sdb_-sdc.-What-comes-after-sdz_.md
toc:          false
navigation:   false
clipboard:    false
---

## After `sda`➡`sdz` comes `sdaa`➡`sdaz`, etc.

The first link in the accepted answer (from 2011) is broken. Here is a new link (also from 2011) containing a good write-up: [How are Linux drives named beyond drive 26?][1].

To summarize the main point in the link (slightly revised and reformatted):

``` 
Drive # - Name
1	    - sda
26	    - sdz
27	    - sdaa
28	    - sdab
52	    - sdaz
53	    - sdba
54	    - sdbb
702	    - sdzz
703	    - sdaaa
704	    - sdaab
18278   - sdzzz
```

Needless to say Linux is well positioned for expansion of drives.

  [1]: https://rwmj.wordpress.com/2011/01/09/how-are-linux-drives-named-beyond-drive-26-devsdz/
