---
layout:       post
title:        >
    Best way to make Ubuntu installation as lean as possible?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1179705
type:         Answer
tags:         kernel
created_date: 2019-10-09 11:25:29
edit_date:    
votes:        "4 "
favorites:    
views:        "1,768 "
accepted:     Accepted
uploaded:     2023-09-12 11:43:57
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-09-Best-way-to-make-Ubuntu-installation-as-lean-as-possible_.md
toc:          false
navigation:   false
clipboard:    false
---

I have no need to do what you are doing but Ubuntu Desktop requires 25GB space (recommended) and Ubuntu Server requires 1.5GB space (recommended) so I would start by installing the [server edition][1].

Next I would install the desktop (not all the apps) onto [the server version][2]:

``` 
sudo apt-get install xubuntu-desktop
```

Then reboot and run a script to install your bare minimum GUI requirements.


  [1]: https://help.ubuntu.com/community/Installation/SystemRequirements
  [2]: https://itstillworks.com/install-desktop-ubuntu-server-6780086.html
