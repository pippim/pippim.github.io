---
layout:       post
title:        >
    Messed up Grub2
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196232
type:         Answer
tags:         grubrescue
created_date: 2019-12-14 23:59:48
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "179 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-14-Messed-up-Grub2.md
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

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})

If this happens to you, visit the link for a solution.

  [1]: https://help.ubuntu.com/community/Boot-Repair
  [2]: https://pippim.github.io/assets/img/posts/2019/UXflA.png

