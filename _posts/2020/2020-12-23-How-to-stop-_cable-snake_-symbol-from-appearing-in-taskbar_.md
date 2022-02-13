---
layout:       post
title:        >
    How to stop "cable snake" symbol from appearing in taskbar?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1302334
type:         Answer
tags:         gnome indicator thunderbolt docking statusbar
created_date: 2020-12-23 12:48:39
edit_date:    2020-12-24 15:15:02
votes:        "4 "
favorites:    
views:        "379 "
accepted:     
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-23-How-to-stop-_cable-snake_-symbol-from-appearing-in-taskbar_.md
toc:          false
navigation:   false
clipboard:    false
---

A blown up image shows the ***cable snake*** on the left:

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

I emailed the developer and this is our conversation:

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

Follow the author's blog for updates.

----------


# Some ideas of my own

I use the Unity interface where application indicators are right justified on the top bar so new apps opening and closing on the left are preferred and not a disadvantage.

For Gnome Users to prevent icons jumping back and forth the only band-aid I can think of is moving all icons to the right side. This can probably be achieved here:

- [How can I order Gnome3 shell extensions at the top?](How can I order Gnome3 shell extensions at the top?)

***If*** this works, then when the `boltctl` icon appears and disappears on the left side nothing "jumps around".


----------

I've emailed the developer again on December 24, 2020 with a link to OP's problem and asked these questions:

- A) Is there an update to correct the problem?
- B) Is it possible to define a new cable snake icon which is 0x0 pixels such that even if it still reappears every few seconds the effect is invisible?


  [1]: https://i.stack.imgur.com/FLXQK.png
  [2]: https://christian.kellner.me/

