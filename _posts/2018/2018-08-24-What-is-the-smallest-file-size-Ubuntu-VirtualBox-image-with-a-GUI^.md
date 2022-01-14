---
layout:       post
title:        >
    What is the smallest file size Ubuntu VirtualBox image with a GUI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068711
type:         Answer
tags:         virtualbox virtualization gui
created_date: 2018-08-24 23:23:37
edit_date:    
votes:        "3 "
favorites:    
views:        "1,762 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-24-What-is-the-smallest-file-size-Ubuntu-VirtualBox-image-with-a-GUI^.md
toc:          false
navigation:   false
clipboard:    false
---

## Lubuntu 16.04 is probably best and needs 4 GB minimum

I asked a similar for the smallest footprint / fastest flavour of Ubuntu here: [Is one distribution better for Virtualbox 5.1 inside Ubuntu 16.04?](Is one distribution better for Virtualbox 5.1 inside Ubuntu 16.04?)4 and the answer was **Lubuntu**.

I created my Lubuntu 16.04 Virtual Image at 7 GB:

[![Lubuntu allocated.png][1]][1]

With nothing of significance installed other than the base packages it's showing `3.9 GB` used and `3.5 GB` available:

[![Lubuntu used][2]][2]

So I would say the **minimum** you could get away with is **4 GB** using Lubuntu 16.04.

That said, my Ubuntu Unity 16.04.5 LTS installation with reams of applications installed and 3 kernel chains only takes up **9.8 GB**. Next time around I'll probably just go with this version and forgo the extra effort of learning new interfaces and applications such as File Manager and File Editor.

  [1]: https://i.stack.imgur.com/nyyPw.png
  [2]: https://i.stack.imgur.com/LDmGt.png
