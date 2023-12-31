---
layout:       post
title:        >
    Thinkpad Yoga 14 backslash (\) / bar (|) key not working
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045450
type:         Answer
tags:         keyboard lenovo keyboard-layout thinkpad
created_date: 2018-06-11 02:15:06
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,032 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-11-Thinkpad-Yoga-14-backslash-___-_-bar-___-key-not-working.md
toc:          false
navigation:   false
clipboard:    false
---

According to [this Lenovo webpage][1] which sounds like your problem you can use:

``` 
sudo dpkg-reconfigure keyboard-configuration
```

Then scroll down to `classmate PC` and select it:

[![classmate PC keyboard][2]][2]

Hope this helps.

  [1]: https://forums.lenovo.com/t5/Linux-Discussion/Thinkpad-Yoga-14-Ubuntu-Linux-Keyboard-Problem/td-p/1844776
  [2]: https://i.stack.imgur.com/f3omB.png
