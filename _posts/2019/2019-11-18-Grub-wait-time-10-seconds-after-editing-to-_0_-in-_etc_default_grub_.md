---
layout:       post
title:        >
    Grub wait time 10 seconds after editing to "0" in /etc/default/grub?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189649
type:         Answer
tags:         boot dual-boot grub2 15.04
created_date: 2019-11-18 00:42:29
edit_date:    
votes:        "2 "
favorites:    
views:        "9,220 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-18-Grub-wait-time-10-seconds-after-editing-to-_0_-in-_etc_default_grub_.md
toc:          false
navigation:   false
clipboard:    false
---

There is an override in grub for when the timeout is 0 seconds to replace it with 10 seconds. Rather than editing grub scripts as other answers recommend you can simply use:

``` 
GRUB_HIDDEN_TIMEOUT="0.0"
GRUB_TIMEOUT="0.0"
```

This will work because the grub overrides will not find `"0"` to be equal to `"0.0"`.
