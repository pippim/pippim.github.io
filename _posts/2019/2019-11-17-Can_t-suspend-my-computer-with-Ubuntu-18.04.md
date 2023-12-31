---
layout:       post
title:        >
    Can't suspend my computer with Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189558
type:         Answer
tags:         18.04 suspend shutdown hibernate
created_date: 2019-11-17 15:32:09
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "4,096 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-17-Can_t-suspend-my-computer-with-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

### How to select Unity desktop in Ubuntu 18.04

When you were running Ubuntu 16.04 you were on the **Unity** interface. After upgrading to 18.04 the Unity interface is still there but new interfaces are offered as well. It sounds like you are searching for the **Gnome** Desktop which you can select from the "gear" next to the <kbd>Sign In</kbd> button during login:

[![Ubuntu 18.04 Five Desktops.jpg][1]][1]

You can try all the desktops to see which you like best but keep in mind:

- Many have reported problems using the Wayland window manager which was designed to replace X11 but has not lived up to expectations.
- When I tested 18.04 upgrade of 16.04 clone some of the options resulted in a purple screen with only a movable mouse cursor.


----------

Can't be sure at this time but it sounds like this:

- [My laptop shuts down when I close the lid even though it's set to hibernate]({% post_url /2016/2016-08-21-My-laptop-shuts-down-when-I-close-the-lid-even-though-it_s-set-to-hibernate %})

  [1]: https://i.stack.imgur.com/XSXLO.jpg
