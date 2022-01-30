---
layout:       post
title:        >
    How to start Ubuntu in Console mode
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/859637
type:         Answer
tags:         boot 16.04 nvidia
created_date: 2016-12-11 22:54:26
edit_date:    2019-09-18 22:41:08
votes:        "53 "
favorites:    
views:        "360,765 "
accepted:     
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-11-How-to-start-Ubuntu-in-Console-mode.md
toc:          false
navigation:   false
clipboard:    false
---

Yes you can. As described here ([ubuntuhandbook.org - Boot into text console ubuntu][1]) you need to edit `/etc/default/grub` to have the next boot end up in text mode. In summary you will set these parameters:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="text"
GRUB_TERMINAL=console
```

After saving changes you need to run:

``` 
sudo update-grub
sudo systemctl enable multi-user.target --force
sudo systemctl set-default multi-user.target
```


  [1]: http://ubuntuhandbook.org/index.php/2014/01/boot-into-text-console-ubuntu-linux-14-04/

## Undoing text-mode

  
To undo `sudo systemctl set-default multi-user.target` simply type 

``` 
sudo systemctl enable graphical.target --force
sudo systemctl set-default graphical.target 
```
