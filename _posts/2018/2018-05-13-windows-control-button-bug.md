---
layout:       post
title:        >
    windows control button bug
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035769
type:         Answer
tags:         gnome configuration 18.04 window-buttons
created_date: !!str "2018-05-13 16:59:23"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "224"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Please read this [bug report][1] carefully to confirm you are having the same problem.

If so review all the comments. Of particular interest is comment #8:

``` 
sudo apt install gnome-icon-theme # fixes
sudo apt purge gnome-icon-theme # breaks

```

I don't have this problem using **Unity** on 18.04 LTS so I hope this helps you.

  [1]: https://bugs.launchpad.net/ubuntu/+source/ubuntu-themes/+bug/1718238
