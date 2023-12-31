---
layout:       post
title:        >
    grep change color highlight from first line to second line
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138689
type:         Question
tags:         grep
created_date: 2019-04-27 17:19:23
edit_date:    
votes:        "1 "
favorites:    
views:        "964 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-27-grep-change-color-highlight-from-first-line-to-second-line.md
toc:          false
navigation:   false
clipboard:    false
---

I've spent hours with a new 4K TV and nVidia GPU trying to get highest refresh rate possible. Just now I've setup a relatively simple `grep` setup to display connected monitors, resolution and refresh rate.

Results of `xrandr --current | grep -e " connected" -A1`:

[![grep connected.png][1]][1]

I want the current refresh rate (denoted by `*`) highlighted. When `connected` is highlighted on the first line it is visually distracting and redundant. If I `grep` a second time to highlight `*` on the second line the first line with output name disappears. That is not helpful.

How can I move initial `grep` color highlight from first line with a second `grep` and still keep the first line?

  [1]: https://i.stack.imgur.com/gg8V7.png
