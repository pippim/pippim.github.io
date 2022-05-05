---
layout:       post
title:        >
    What are the dangers of upgrading kernel from 4.18.0-13 generic to 5?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1116102
type:         Answer
tags:         kernel grub
created_date: 2019-02-06 13:36:33
edit_date:    
votes:        "2 "
favorites:    
views:        "247 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-02-06-What-are-the-dangers-of-upgrading-kernel-from-4.18.0-13-generic-to-5_.md
toc:          false
navigation:   false
clipboard:    false
---

After installing a mainline Linux kernel such as version 5 you can still reboot and select the previous version.

At the Grub menu select **Advanced Options**. A sub menu appears showing all your previously installed kernels that have not been auto removed or manually removed.
