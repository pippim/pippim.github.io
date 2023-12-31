---
layout:       post
title:        >
    Ubuntu for Windows when running script gives mv: cannot stat error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1176704
type:         Answer
tags:         bash scripts nodejs ubuntu-forums
created_date: 2019-09-25 22:45:37
edit_date:    2019-09-25 23:28:53
votes:        "0 "
favorites:    
views:        "1,495 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-25-Ubuntu-for-Windows-when-running-script-gives-mv_-cannot-stat-error.md
toc:          false
navigation:   false
clipboard:    false
---

When the script was running on the Linux server the path name appears to have been much shorter.



As a quick fix change this line:

``` bash
file="${file:9}"
```

to this:

``` bash
file="${file:30}"
```

Essentially you were changing the variable `file` from:

``` bash
/mnt/c/localBarcodereader/pdf/K0XY92E6@DWEMIT6.glagsec107.SEC1.pdf
```

to:

``` bash
calBarcodereader/pdf/K0XY92E6@DWEMIT6.glagsec107.SEC1.pdf
```

When the intention was to change `file` to be:

``` bash
K0XY92E6@DWEMIT6.glagsec107.SEC1.pdf
```

There are better ways of doing this and I'll try to revise the answer (and reformat your question) a bit later.
