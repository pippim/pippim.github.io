---
layout:       post
title:        >
    What does the indicator icon with three dots over a power plug mean in Ubuntu 20.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1270227
type:         Answer
tags:         dell 20.04 gnome-shell indicator docking
created_date: 2020-08-26 11:02:45
edit_date:    2020-08-26 22:41:40
votes:        "4 "
favorites:    
views:        "1,825 "
accepted:     
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-08-26-What-does-the-indicator-icon-with-three-dots-over-a-power-plug-mean-in-Ubuntu-20.04_.md
toc:          false
navigation:   false
clipboard:    false
---

The image is known as a ***cable snake***:

[![boltd cable snake][1]][1]

From the [author's blog][2]:

> ### GNOME Shell  
>   
> The GNOME shell bits to enable Thunderbolt 3 support were merged some  
> time ago and made it into **3.28**. This means that the GNOME shell will  
> act as authorization agent and will automatically authorize new  
> thunderbolt 3 devices — if the user has administrator rights, is  
> currently logged in and the session is unlocked. It will also show a  
> little indicator (called the cable_snake by some) in the status  
> indicator section while devices are being authorized because the whole  
> authorization dance can take quite a while.  


----------


# Correspondence from developer

I emailed the developer today and this is our conversation:

*There are users annoyed with Cable_Snake icon making icons shift left and right in the application indicator top bar. Is there a way to disable the icon but keep boltd running?*

> This was introduced via a change in the kernel/udev, but a work-around  
> laded in bolt 0.9:  
> [https://gitlab.freedesktop.org/bolt/bolt/-/issues/156](https://gitlab.freedesktop.org/bolt/bolt/-/issues/156)6  
>   
> There is an ubuntu bug open:  
> [https://bugs.launchpad.net/ubuntu/+source/bolt/+bug/1892657](https://bugs.launchpad.net/ubuntu/+source/bolt/+bug/1892657)7  


*Is there a way to disable the icon but keep boltd running?*

> Currently not, GNOME Shell is hardwired to react to boltd's probing  
> setting. Best way is to update bolt.  


----------


# Some ideas of my own

I use the Unity interface where application indicators are right justified on the top bar so new apps opening and closing on the left are preferred and not a disadvantage.

For Gnome Users to prevent icons jumping back and forth the only band-aid I can think of is moving all icons to the right side. This can probably be achieved here:

- [How can I order Gnome3 shell extensions at the top?](How can I order Gnome3 shell extensions at the top?)

***If*** this works, then when the `boltctl` icon appears and disappears on the left side nothing "jumps around".

  [1]: https://i.stack.imgur.com/FLXQK.png
  [2]: https://christian.kellner.me/

