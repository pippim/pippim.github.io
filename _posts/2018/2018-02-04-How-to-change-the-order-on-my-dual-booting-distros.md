---
layout:       post
title:        >
    How to change the order on my dual booting distros
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1003086
type:         Answer
tags:         dual-boot grub2
created_date: 2018-02-04 22:42:32
edit_date:    
votes:        "4 "
favorites:    
views:        "4,337 "
accepted:     Accepted
uploaded:     2022-04-11 04:33:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-04-How-to-change-the-order-on-my-dual-booting-distros.md
toc:          false
navigation:   false
clipboard:    false
---

# Better method is to repeat last boot selection

The reason I say this is because sometimes when you are running Windows it will wake up at 3 am, mysteriously update, reboot, finish updating and go back to sleep. If your default was Ubuntu but periodically boot into Windows and put your system to sleep the Windows updates could start but never finish.

Another reason to repeat the last boot selection is you might be working in Kubuntu for a week, then working in Mate for a week. It's easier if Grub just remembered your last boot selection and you don't have to keep overriding every boot.

Another reason to repeat the last boot selection is if you are overriding the kernel for a few days or weeks in the **Advanced Options** menu. Even more so if like me you have 20+ kernels (each with three options regular, safe and repair mode) could mean a lot of arrow keys.

# How to get Grub to repeat last boot selection

This is fairly straight forward. Using `sudo` powers edit `/etc/default/grub` and change the following:

``` 
#GRUB_DEFAULT=0 # Rather than option #1, we'll always default to last boot choice.
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

The first line you will be commenting out and right below that insert the next two lines.

Save the file and type in the terminal:

``` 
sudo update-grub
```

# If you still want your original request

You can set the [default boot selection][1] by menu entry number where 0 is the first entry:

As above edit `/etc/default/grub` but this time use:

``` 
GRUB_DEFAULT=0
```

Remove the `#` at the beginning of the line to transform it from a comment into a command. Use `0` for menu first entry, `1` for second menu entry, etc.

See the link above for more details on setting a sub-menu entry as the default boot selection in Grub.
  [1]: https://help.ubuntu.com/community/Grub2/Submenus
