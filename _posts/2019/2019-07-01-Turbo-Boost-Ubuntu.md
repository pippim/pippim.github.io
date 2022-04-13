---
layout:       post
title:        >
    Turbo Boost Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155295
type:         Answer
tags:         18.04 intel turbo-boost
created_date: 2019-07-01 20:07:49
edit_date:    
votes:        "1 "
favorites:    
views:        "278 "
accepted:     Accepted
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-01-Turbo-Boost-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

To disable turbo boost (for Intel anyway) use this command:

<!--Language-all: lang-bash -->

``` 
$ echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
1
```


----------


Another option is to limit your CPU frequencies to non-turbo boost speeds or even lower. For this purpose I wrote `cpuf`:


- [GUI or simple Bash script to throttle the CPU?]({% post_url /2019/2019-05-12-GUI-or-simple-Bash-script-to-throttle-the-CPU_ %})

[![cpuf-demo.gif][1]][1]

Visit the link to copy the script or get more details.

  [1]: https://i.stack.imgur.com/2lHSD.gif

