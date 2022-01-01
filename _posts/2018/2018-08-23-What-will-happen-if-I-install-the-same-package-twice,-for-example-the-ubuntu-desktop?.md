---
layout:       post
title:        >
    What will happen if I install the same package twice, for example the ubuntu-desktop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068333
type:         Answer
tags:         apt gui
created_date: 2018-08-23 21:47:16
edit_date:    2018-08-23 23:43:28
votes:        "2 "
favorites:    
views:        "1,177 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

No harm will come.

The second time you try to install a package it will simply tell you it's already installed.

If the package was just installed it will say:

``` 
<Package> is already the newest version (<version number>)

```

If the package was upgraded since it was last installed/upgraded then it will be upgraded:

``` 
The following packages will be upgraded:
  <Package>
1 upgraded, 0 newly installed, ___ to remove and ___ not upgraded

```
