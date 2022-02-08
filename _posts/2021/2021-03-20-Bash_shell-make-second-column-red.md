---
layout:       post
title:        >
    Bash/shell make second column red
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1324945
type:         Answer
tags:         command-line bash gnome-terminal colors
created_date: 2021-03-20 19:59:18
edit_date:    2021-03-20 20:07:07
votes:        "2 "
favorites:    
views:        "38 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-03-20-Bash_shell-make-second-column-red.md
toc:          false
navigation:   false
clipboard:    false
---

Using [bac0n's](https://askubuntu.com/users/986805/bac0n) comment I replaced:

``` 
paste <(ls "$@") <(cat "$@") | column -s $'\t' -t | sed "s#$prefix##g"
```

with:

``` 
paste <(ls "$@") <(printf '\e[1;91m%s\e[0m\n' $(cat "$@")) | \
    column -s $'\t' -t | sed "s#$prefix##g"
```

Now it displays as desired:

[![dircat output 2.png][1]][1]


  [1]: https://i.stack.imgur.com/UzXcr.png
