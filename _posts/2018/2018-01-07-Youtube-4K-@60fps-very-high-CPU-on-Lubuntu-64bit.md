---
layout:       post
title:        >
    Youtube 4K @60fps very high CPU on Lubuntu 64bit
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993358
type:         Answer
tags:         youtube conky
created_date: 2018-01-07 21:57:22
edit_date:    2020-06-12 14:37:07
votes:        "-1 "
favorites:    
views:        "2,002 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-07-Youtube-4K-@60fps-very-high-CPU-on-Lubuntu-64bit.md
toc:          false
navigation:   false
clipboard:    false
---

# 60 Frames per second runs just fine

I must admit I didn't even know 60 FPS videos existed in Youtube before reading this question. So I found [this video][1] on Youtube which is very impressive.

Running the video and youtube statistics for nerds shows no dropped frames:

[![Youtube 60fps.gif][2]][2]

Conky which normally might show CPU load of 15-20% when running a regular video does rise a bit to 20-25% in comparison:

[![Youtube conky 60fps.gif][3]][3]

I just don't want people unduly concerned about Linux abilities to handle hardware acceleration.

This test was on Intel Skylake HD530 Graphics. I could duplicate test by rebooting to nVidia 970M graphics but not now.

  [1]: https://www.youtube.com/watch?v=OKM--8fzDpo
  [2]: https://i.stack.imgur.com/Q8kPw.gif
  [3]: https://i.stack.imgur.com/F30Dc.gif
