---
layout:       post
title:        >
    Dedicated GPU increases idling temps
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188198
type:         Answer
tags:         drivers conky
created_date: 2019-11-12 15:28:31
edit_date:    
votes:        "2 "
favorites:    
views:        "244 "
accepted:     Accepted
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-12-Dedicated-GPU-increases-idling-temps.md
toc:          false
navigation:   false
clipboard:    false
---

A rise in temperature is normal. The nVidia GTX 970M for example uses 24 watts which is quite a bit in computing terms:

[![nvidia temperature.png][1]][1]

Turning off the nVidia GPU with `sudo prime-select intel` will reduce heat by 5 to 10 degrees but there is really no cause for concern unless running on battery. In this case turning off the nVidia GPU would benefit battery life.

Even at the displayed temperatures there is no heat on the keyboard and fans (there are two one for CPU and one for GPU) cannot be heard.

To summarize if your situation is like above conky display there is nothing to worry about.

  [1]: https://i.stack.imgur.com/hM4Ot.png
