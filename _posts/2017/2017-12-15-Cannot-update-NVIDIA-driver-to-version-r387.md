---
layout:       post
title:        >
    Cannot update NVIDIA driver to version r387
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/986384
type:         Answer
tags:         drivers nvidia kernel cuda
created_date: 2017-12-15 00:31:42
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,846 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-15-Cannot-update-NVIDIA-driver-to-version-r387.md
toc:          false
navigation:   false
clipboard:    false
---

# Easiest way to install nVidia 387.34

You are asking many different things in one question. You are also proposing different techniques and problems with them. I'll focus on the title of your question as others might be interested.

The easiest way to upgrade from nVidia 384.98 to 387.34 is to go to `System Settings` -> `Software & Updates` -> `Additional Drivers` and this screen appears

[![nVidia 387 install][1]][1]

Check the option for `387.34` and the current option for 384.98 will be unchecked automatically. Then save your changes and reboot.

**Note:** If you've manually installed nVidia bits and pieces you can run into complications requiring manual purges of older versions, etc. In that case check the Q&A database here for solutions. If a solution isn't found then post a new question.

  [1]: https://i.stack.imgur.com/BMmV7.png
