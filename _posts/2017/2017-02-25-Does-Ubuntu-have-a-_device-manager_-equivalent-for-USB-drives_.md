---
layout:       post
title:        >
    Does Ubuntu have a "device manager" equivalent for USB drives?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/887314
type:         Answer
tags:         hard-drive
created_date: 2017-02-25 23:02:23
edit_date:    2017-05-26 17:20:04
votes:        "74 "
favorites:    
views:        "207,901 "
accepted:     Accepted
uploaded:     2023-12-31 12:14:44
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-25-Does-Ubuntu-have-a-_device-manager_-equivalent-for-USB-drives_.md
toc:          false
navigation:   false
clipboard:    false
---

When I googled "Linux device manager equivalent" one of the recommendations is `hardinfo` which I already had installed but which you can install with:

``` 
sudo apt install hardinfo
```

Then typing `hardinfo` in the terminal or calling from Dash (<kbd>Alt</kbd>+<kbd>F2</kbd>) the gui appears like this:

[![hardinfo][1]][1]

The comments above suggest using `lspci` and `lsusb` which are what I use most often but your question asks for a Windows "device manager" equivalent.


  [1]: https://i.stack.imgur.com/ab0yv.png
