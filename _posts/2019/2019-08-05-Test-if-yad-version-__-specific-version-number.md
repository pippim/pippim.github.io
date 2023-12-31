---
layout:       post
title:        >
    Test if yad version >= specific version number
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1163600
type:         Question
tags:         bash versions version-control yad
created_date: 2019-08-05 16:50:35
edit_date:    2019-08-05 18:53:14
votes:        "4 "
favorites:    
views:        "1,031 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-05-Test-if-yad-version-__-specific-version-number.md
toc:          false
navigation:   false
clipboard:    false
---

I need a script to check if [yad][1] (and other programs) version number is >= to a specific number. For example I have:

``` 
$ yad --version
0.40.0 (GTK+ 3.24.8)

$ gedit --version
gedit - Version 3.32.0

$ bash --version
GNU bash, version 5.0.3(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2019 Free Software Foundation, Inc.
```

- For [yad][1] new features are added between Ubuntu 16.04 and 19.04
- For [gedit][2] the ability to pass Window geometry is lost in newer versions
- [bash][3] complicates tests as the version number is in the middle of the first line.

An environment variable will **not** exist for all programs like bash has:

``` 
$ echo $BASH_VERSION
5.0.3(1)-release
```


  [1]: https://sourceforge.net/projects/yad-dialog/
  [2]: https://help.gnome.org/users/gedit/stable/
  [3]: https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html
