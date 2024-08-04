---
layout:       post
title:        >
    Why does linux native file system prefer 'ExtFS' file system? What is the benefit over NTFS?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/836020
type:         Answer
tags:         partitioning mount ntfs
created_date: 2016-10-12 10:42:21
edit_date:    2016-10-12 23:31:34
votes:        "4 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-04 14:28:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-12-Why-does-linux-native-file-system-prefer-_ExtFS_-file-system_-What-is-the-benefit-over-NTFS_.md
toc:          false
navigation:   false
clipboard:    false
---

Linux is free open source software. As such you find manufacturers such as Apple, Microsoft and Google will take that code and develop it for their own platforms.

On Linux the `ext` file system was created in April 1992. On Windows the `ntfs` file system was created in 1993. Some would say Microsoft Engineers could have looked at Linux systems as a model for their own code. I'm not saying that though :)

Linux can read and write `ntfs` file systems but it is not a `native` file system and performance would be sub-standard in many instances. Plus you may have problems with permissions.

Anyway when using Ubuntu the best choice for the average user is `ext4` (the fourth extended file system).

HTH (Hope This Helps)
