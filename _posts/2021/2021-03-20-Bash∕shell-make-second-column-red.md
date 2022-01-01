---
layout:       post
title:        >
    Bash∕shell make second column red
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1324945
type:         Answer
tags:         command-line bash gnome-terminal colors
created_date: !!str "2021-03-20 19:59:18"
edit_date:    !!str "2021-03-20 20:07:07"
votes:        !!str "2"
favorites:    
views:        !!str "38"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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
