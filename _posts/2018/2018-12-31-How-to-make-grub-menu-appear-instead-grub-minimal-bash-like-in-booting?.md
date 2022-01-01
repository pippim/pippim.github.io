---
layout:       post
title:        >
    How to make grub menu appear instead grub minimal bash-like in booting?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105737
type:         Answer
tags:         boot dual-boot grub2
created_date: !!str "2018-12-31 01:35:45"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "19"
favorites:    
views:        !!str "78,063"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

**Note:** If you can't boot Ubuntu at all, use a Live USB to boot Ubuntu, select "Try before installing" and perform steps below.


----------


After booting the hard way, open a terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and install [boot-repair][1]:

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
