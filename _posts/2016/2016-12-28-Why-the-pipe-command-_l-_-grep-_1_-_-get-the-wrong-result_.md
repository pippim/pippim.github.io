---
layout:       post
title:        >
    Why the pipe command "l | grep "1" " get the wrong result?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/865249
type:         Answer
tags:         command-line grep ls pipe
created_date: 2016-12-28 04:03:46
edit_date:    2016-12-28 19:28:10
votes:        "6 "
favorites:    
views:        "2,862 "
accepted:     
uploaded:     2025-01-28 05:54:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-28-Why-the-pipe-command-_l-_-grep-_1_-_-get-the-wrong-result_.md
toc:          false
navigation:   false
clipboard:    false
---

### Your `l` and `ls` commands are setup as aliases.

When you run them piping the output through `grep "1"` (using `|`) each screen line where `1` appears is displayed, with the `1` colored red. 

Because file names `.`, `..`, `2` and `22` appear on the same screen line, they are output by `grep` as well but do not appear in red which shows `grep` matches.

The `:34m` is an escape sequence for a color that doesn't paint properly. Based on your revised question with the output of `type -a l` and `type -a` it can be reproduced in my system. Please note you should change your alias from `--color` to `--color=auto`:

### Color output

[![color ls][1]][1]


  [1]: https://pippim.github.io/assets/img/posts/2016/EdiMJ.png
