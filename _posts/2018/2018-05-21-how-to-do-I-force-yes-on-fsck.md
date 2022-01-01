---
layout:       post
title:        >
    how to do I force-yes on fsck
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038764
type:         Answer
tags:         grub2 fsck
created_date: !!str "2018-05-21 16:44:54"
edit_date:    !!str ""
votes:        !!str "4"
favorites:    
views:        !!str "26,636"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

The answer to your question is here [How can I make fsck run non-interactively at boot time?][1]


To force ubuntu to fix all disk errors at boot you need to add `FSCKFIX=yes` to the file `/etc/default/rcS`. This tells `fsck` to run with the `-y` flag.

  [1]: https://askubuntu.com/questions/151025/how-can-i-make-fsck-run-non-interactively-at-boot-time
