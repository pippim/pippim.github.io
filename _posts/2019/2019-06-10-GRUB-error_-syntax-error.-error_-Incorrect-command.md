---
layout:       post
title:        >
    GRUB error: syntax error. error: Incorrect command
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/523914
type:         Answer
tags:         ubuntu grub2
created_date: 2019-06-10 02:51:50
edit_date:    2020-06-11 14:16:50
votes:        "0 "
favorites:    
views:        "1,068 "
accepted:     Accepted
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-10-GRUB-error_-syntax-error.-error_-Incorrect-command.md
toc:          false
navigation:   false
clipboard:    false
---

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
