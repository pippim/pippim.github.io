---
layout:       post
title:        >
    How to access Advanced Options in GRUB?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014761
type:         Answer
tags:         grub-efi
created_date: 2018-03-14 02:56:23
edit_date:    
votes:        "2 "
favorites:    
views:        "39,327 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-14-How-to-access-Advanced-Options-in-GRUB_.md
toc:          false
navigation:   false
clipboard:    false
---

From: [ Grub2/Submenus][1]:

> The submenu feature was introduced by Ubuntu in GRUB 1.99. The default  
> submenu title is "Previous Linux versions" and appears immediately  
> below the first kernel menuentry (and its associated recovery mode  
> option, if enabled) in the main GRUB menu.  

So if you are a fresh install and don't have a previous Kernel version to boot to the sub-menu **Advanced Options** may not appear.

If this is true in your case, after a Kernel Update the sub-menu will appear.

  [1]: https://help.ubuntu.com/community/Grub2/Submenus
