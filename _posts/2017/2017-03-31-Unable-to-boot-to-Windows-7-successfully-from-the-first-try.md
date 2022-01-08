---
layout:       post
title:        >
    Unable to boot to Windows 7 successfully from the first try
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/898806
type:         Answer
tags:         dual-boot grub2 windows-7 windows-10
created_date: 2017-03-31 10:28:18
edit_date:    2017-04-13 12:24:27
votes:        "1 "
favorites:    
views:        "176 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

This question is a duplicate of [GRUB2: black screen when booting Windows][1] but cannot be closed due to bounty rules. The solution as confirmed by OP in comments is:

``` 
sudo gedit /etc/default/grub

```

Search for the following and change the second line to look like:

``` 
# Uncomment to disable graphical terminal (grub-pc only)
GRUB_TERMINAL=console

```

Save and exit then run:

``` 
sudo update-grub

```




  [1]: https://askubuntu.com/questions/536745/grub2-black-screen-when-booting-windows/536757#536757
