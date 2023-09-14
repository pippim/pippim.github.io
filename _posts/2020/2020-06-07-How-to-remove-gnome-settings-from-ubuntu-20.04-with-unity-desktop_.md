---
layout:       post
title:        >
    How to remove gnome settings from ubuntu 20.04 with unity desktop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1247933
type:         Answer
tags:         20.04
created_date: 2020-06-07 15:25:55
edit_date:    2022-01-06 12:41:10
votes:        "8 "
favorites:    
views:        "4,265 "
accepted:     
uploaded:     2023-09-14 14:30:15
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-07-How-to-remove-gnome-settings-from-ubuntu-20.04-with-unity-desktop_.md
toc:          false
navigation:   false
clipboard:    false
---

After you've install **Unity Desktop** and, logged into it, use:

``` 
sudo apt remove ubuntu-gnome-desktop
sudo apt remove gnome-shell
```

This works for for Ubuntu **16.04** to **20.04** and even **20.10** (Groovy). Source:

- [Ubuntu – How to remove Gnome Desktop Environment without messing Unity DE? (Ubuntu 16.04)][1]


----------


Although article is written for Ubuntu **16.04**, you can verify the package is still around for **20.04** (called Focal) by visiting [Package: ubuntu-gnome-desktop](https://packages.ubuntu.com/focal/ubuntu-gnome-desktop):

[![ubuntu-gnome-deskop package.png][2]][2]


----------


Personally I use **Unity** all the time but like to keep both desktops installed. Occasionally I need to answer other users' questions about **Gnome Desktop**.


----------

## Note: `ubuntu-gnome-desktop` might not be installed

Because it is a transitional package since 18.04 these instructions from:

- [Why and How to Install Unity 7 Desktop on Ubuntu 18.04 LTS][3]

Tell you to simply use:

``` 
sudo apt remove gnome-shell
```

The article doesn't mention `ubuntu-gnome-desktop` needing to be removed. This article includes additional tips on setting up **Unity Desktop**.


  [1]: https://itectec.com/ubuntu/ubuntu-how-to-remove-gnome-desktop-environment-without-messing-unity-de-ubuntu-16-04/
  [2]: https://i.stack.imgur.com/3vBFv.png
  [3]: https://www.linuxbabe.com/ubuntu/install-unity-desktop-ubuntu-18-04-lts
