---
layout:       post
title:        >
    How do you find out which program is using too much memory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033799
type:         Answer
tags:         memory-usage conky
created_date: 2018-05-08 23:26:27
edit_date:    
votes:        "3 "
favorites:    
views:        "123,779 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-08-How-do-you-find-out-which-program-is-using-too-much-memory_.md
toc:          false
navigation:   false
clipboard:    false
---

This is a good question but the information shows there is lots of memory available. You should be monitoring your memory usage though.

My favorite system monitor is `conky` and memory display is part of it:

[![Conky.gif][1]][1]

Total memory line shows 2.5 GiB out of 7.4 GiB is being used.

Detailed memory line shows:

- `Web Content` is using 7% of memory. This is a Firefox subprogram.
- `Firefox` itself is using 7% of memory
- `ffmpeg` is using 3% of memory. This is the `.gif` recorder `peek` making the video we are watching.

Conky is highly configurable and everyone's desktop looks different. You can google `conky` and get 787 thousand hits.

  [1]: https://pippim.github.io/assets/img/posts/2018/SeTOv.gif
