---
layout:       post
title:        Messed up Grub2
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196232
type:         Answer
tags:         grubrescue
created_date: 2019-12-14 23:59:48
edit_date:    2020-06-12 14:37:07
votes:        1
favorites:    
views:        116
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

Boot with a live USB, select "Try before installing", open a terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and install [boot-repair][1]:

``` 
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt-get update
sudo apt-get install -y boot-repair && boot-repair

```

Then type `boot-repair` and a menu will appear:

[![boot-repair menu.png][2]][2]

Select the recommended option.

If your system boots normally after recommended repair great. If not post the link to the problems reported.

----------


### Caveats

On some systems this annoyance can occur:

- https://askubuntu.com/questions/938633/boot-repair-created-too-many-grub-menu-entries-for-windows/1022700#1022700

If this happens to you, visit the link for a solution.

  [1]: https://help.ubuntu.com/community/Boot-Repair
  [2]: https://i.stack.imgur.com/UXflA.png

