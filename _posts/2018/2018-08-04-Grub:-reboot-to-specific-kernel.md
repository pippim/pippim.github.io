---
layout:       post
title:        >
    Grub: reboot to specific kernel
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062304
type:         Answer
tags:         grub2
created_date: 2018-08-04 12:12:49
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "13,357 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-04-Grub:-reboot-to-specific-kernel.md
toc:          false
navigation:   false
clipboard:    false
---

## Display Grub Menu Entries from Command Line

I created a script `grub-menu.sh` to make it easy to find the menu entry number:

[![grub menu.png][1]][1]


----------

## Booting with Grub Menu Entry Number

If you wanted to reboot into Kernel `4.4.0-131` you would use:

``` 
sudo grub-reboot "1>6"

```


----------

## Getting the bash script `grub-menu.sh`

You can find the bash script in this Q&A: [Display grub menu and options without rebooting?]({% post_url /2018/2018-03-26-Display-grub-menu-and-options-without-rebooting^ %})


  [1]: https://i.stack.imgur.com/99pqV.png
