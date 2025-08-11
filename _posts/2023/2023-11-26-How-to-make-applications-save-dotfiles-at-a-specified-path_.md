---
layout:       post
title:        >
    How to make applications save dotfiles at a specified path?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1493946
type:         Answer
tags:         configuration environment-variables
created_date: 2023-11-26 03:35:18
edit_date:    
votes:        "3 "
favorites:    
views:        "458 "
accepted:     
uploaded:     2025-08-10 20:14:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-11-26-How-to-make-applications-save-dotfiles-at-a-specified-path_.md
toc:          false
navigation:   false
clipboard:    false
---

As was posted a decade ago states, the answer is **no**.

Nautilus / Files and other file managers do have an option to hide all files and directories starting with a `.` (dot). 

Although this doesn't directly solve your issue, it solves the problem of having the `.names` cluttering up your screen when you are looking for your data files.

By default the `ls` command will not show `.` (hidden) files. You need to use `ls -a` to include "all" for the hidden files to show up.
