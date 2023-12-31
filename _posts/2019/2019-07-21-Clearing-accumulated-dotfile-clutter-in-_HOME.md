---
layout:       post
title:        >
    Clearing accumulated dotfile clutter in $HOME
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159998
type:         Answer
tags:         system-installation upgrade home-directory partitioning
created_date: 2019-07-21 19:48:05
edit_date:    2019-07-21 20:00:36
votes:        "1 "
favorites:    
views:        "1,504 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-21-Clearing-accumulated-dotfile-clutter-in-_HOME.md
toc:          false
navigation:   false
clipboard:    false
---

Although `~/.config` is large:

``` 
$ du -hs ~/.config
155M	/home/user_name/.config
```

You will probably find the largest is `~/.cache`:

``` 
$ du -hs ~/.cache
1.4G	/home/user_name/.cache
```

You can delete `~/.cache` when no applications are running and sections of it are rebuilt as need be. There are some caveats raised by other users though:

- [Is it okay to delete the ~/.cache folder?](Is it okay to delete the ~/.cache folder?)

You definitely don't want to delete `~/.config` which some users confuse with `~/.cache`.

Caches exist in other places:

- [How to Free Up a Lot of Disk Space on Ubuntu Linux by Deleting Cached Package Files][1]

  [1]: https://www.howtogeek.com/howto/28502/how-to-free-up-a-lot-of-disk-space-on-ubuntu-linux-by-deleting-cached-package-files/
