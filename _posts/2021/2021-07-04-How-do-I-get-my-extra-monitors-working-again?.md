---
layout:       post
title:        >
    How do I get my extra monitors working again?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1349989
type:         Answer
tags:         nvidia multiple-monitors xorg grub
created_date: !!str "2021-07-04 17:12:33"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "35"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

As per comments the problem was solved by booting to the kernel version previous to the upgrade:

- [How can I boot with an older kernel version?](https://askubuntu.com/a/1161535/307523)

This link also shows you how to make grub always boot to a specific kernel version each time.
