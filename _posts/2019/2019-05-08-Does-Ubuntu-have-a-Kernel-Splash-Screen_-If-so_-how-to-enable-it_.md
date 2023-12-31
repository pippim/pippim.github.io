---
layout:       post
title:        >
    Does Ubuntu have a Kernel Splash Screen? If so, how to enable it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1141648
type:         Answer
tags:         kernel screen plymouth grub
created_date: 2019-05-08 23:35:35
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "606 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-08-Does-Ubuntu-have-a-Kernel-Splash-Screen_-If-so_-how-to-enable-it_.md
toc:          false
navigation:   false
clipboard:    false
---

# Grub Theme

What you are looking for is a [Grub Theme][1] that runs before the kernel loads with Plymouth splash screen:

Here's my Grub Theme which is a spin on **Tux** theme referenced in your links:

[![grub boot.gif][2]][2]


  [1]: https://www.gnome-look.org/browse/cat/109/
  [2]: https://i.stack.imgur.com/98Dog.gif
