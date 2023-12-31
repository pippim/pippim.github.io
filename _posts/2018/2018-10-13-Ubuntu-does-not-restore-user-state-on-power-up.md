---
layout:       post
title:        >
    Ubuntu does not restore user state on power up
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1083556
type:         Answer
tags:         restore
created_date: 2018-10-13 23:08:49
edit_date:    2018-10-13 23:18:17
votes:        "1 "
favorites:    
views:        "125 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-13-Ubuntu-does-not-restore-user-state-on-power-up.md
toc:          false
navigation:   false
clipboard:    false
---

Regular Ubuntu doesn't restore the previous session but if this is an important feature you can switch to `kubuntu`. This [answer][1] has a sample screen I've recycled to display the setup:

![enter image description here][2]


----------

You can configure regular Ubuntu to automatically startup your favourite applications but they will not continue where they left off. There are a few exceptions such as web browsers which continue where they left of.

Use the **Startup Applications** app to define which applications automatically load when you sign on:

[![Startup Applications.png][3]][3]


  [1]: https://askubuntu.com/questions/428805/prevent-kubuntu-from-remembering-previous-session
  [2]: https://i.stack.imgur.com/ny599.png
  [3]: https://i.stack.imgur.com/NJQr2m.png
