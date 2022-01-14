---
layout:       post
title:        >
    cal -w does not work
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099211
type:         Answer
tags:         command-line calendar
created_date: 2018-12-07 16:00:05
edit_date:    
votes:        "0 "
favorites:    
views:        "752 "
accepted:     Accepted
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-07-cal--w-does-not-work.md
toc:          false
navigation:   false
clipboard:    false
---

Typing `cal -w` in the terminal shows extra arguments supported by `cal` and even more extra arguments supported by `ncal`:

``` 
$ cal -w
Usage: cal [general options] [-hjy] [[month] year]
       cal [general options] [-hj] [-m month] [year]
       ncal [general options] [-bhJjpwySM] [-s country_code] [[month] year]
       ncal [general options] [-bhJeoSM] [year]
General options: [-NC31] [-A months] [-B months]
For debug the highlighting: [-H yyyy-mm-dd] [-d yyyy-mm]

```

- `cal` only supports `h`, `j` and `y` arguments
- `ncal` supports same arguments plus `w` option you seek and many more


