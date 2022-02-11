---
layout:       post
title:        >
    Terminal icon in window titlebar is stretched out over window control buttons
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035788
type:         Answer
tags:         icons themes gnome-terminal titlebar window-buttons
created_date: 2018-05-13 17:42:40
edit_date:    
votes:        "2 "
favorites:    
views:        "3,652 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-13-Terminal-icon-in-window-titlebar-is-stretched-out-over-window-control-buttons.md
toc:          false
navigation:   false
clipboard:    false
---

As Ahmad Nassri points out this is an icon problem. Specifically please read this [bug report][1] carefully to confirm you are having the same problem.

If so review all the comments. Of particular interest is comment #8:

``` 
sudo apt install gnome-icon-theme # fixes
sudo apt purge gnome-icon-theme # breaks
```

You can keep following this **8 month old** bug report by subscribing to email to find out when a permanent fix is in.

  [1]: https://bugs.launchpad.net/ubuntu/+source/ubuntu-themes/+bug/1718238
