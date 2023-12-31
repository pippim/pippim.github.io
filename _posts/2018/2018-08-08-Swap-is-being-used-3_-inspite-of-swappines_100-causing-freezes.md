---
layout:       post
title:        >
    Swap is being used 3% inspite of swappines=100 causing freezes
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1063389
type:         Answer
tags:         18.04 freeze swap
created_date: 2018-08-08 03:44:04
edit_date:    
votes:        "0 "
favorites:    
views:        "214 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-08-Swap-is-being-used-3_-inspite-of-swappines_100-causing-freezes.md
toc:          false
navigation:   false
clipboard:    false
---

The default swappiness is 60. I would avoid extremes like 1% or 100%.

You can limit Firefox RAM usage on this screen accessed by `Preferences` -> `Performance` -> `Content Process Limit`:

[![Firefox RAM.png][1]][1]

The default setting is `4`. You can reduce RAM impact by setting it to `2`. Performance will slow but RAM consumption will reduce. I have too much RAM so I set it to `7` (the maximum).


  [1]: https://i.stack.imgur.com/4t3Z2.png
