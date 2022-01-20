---
layout:       post
title:        >
    How to make grub menu appear instead grub minimal bash-like in booting?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105737
type:         Answer
tags:         boot dual-boot grub2
created_date: 2018-12-31 01:35:45
edit_date:    2020-06-12 14:37:07
votes:        "19 "
favorites:    
views:        "79,570 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-31-How-to-make-grub-menu-appear-instead-grub-minimal-bash-like-in-booting^.md
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

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})

If this happens to you, visit the link for a solution.

  [1]: https://help.ubuntu.com/community/Boot-Repair
  [2]: https://i.stack.imgur.com/UXflA.png
