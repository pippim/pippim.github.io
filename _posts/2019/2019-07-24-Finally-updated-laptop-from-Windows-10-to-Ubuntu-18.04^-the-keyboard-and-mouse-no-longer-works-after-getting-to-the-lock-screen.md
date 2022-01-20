---
layout:       post
title:        >
    Finally updated laptop from Windows 10 to Ubuntu 18.04; the keyboard and mouse no longer works after getting to the lock screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160734
type:         Answer
tags:         18.04 keyboard
created_date: 2019-07-24 15:22:46
edit_date:    
votes:        "0 "
favorites:    
views:        "99 "
accepted:     Accepted
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-24-Finally-updated-laptop-from-Windows-10-to-Ubuntu-18.04^-the-keyboard-and-mouse-no-longer-works-after-getting-to-the-lock-screen.md
toc:          false
navigation:   false
clipboard:    false
---

The same problem was reported yesterday:

- [5.0.0-21 kernel update causing desktop and mouse problems](5.0.0-21 kernel update causing desktop and mouse problems)

At the same time a related kernel problem was reported:

- [Software Updater Kernel Update broke package manager - Cannot install linux-modules-extra-5.0.0-21-generic](Software Updater Kernel Update broke package manager - Cannot install linux-modules-extra-5.0.0-21-generic)

Hopefully this will be fixed in the next Ubuntu kernel update `5.0.0-21` but in the meantime use kernel `5.0.0-20`. If you want to avoid reinstalling Ubuntu you can manually install the previous Linux Mainline/Stable kernel with these instructions:

- [How to update kernel to the latest mainline version without any Distro-upgrade?]({% post_url /2017/2017-02-20-How-to-update-kernel-to-the-latest-mainline-version-without-any-Distro-upgrade^ %})

The kernel before `5.0.0-21` in Ubuntu Speak is `5.1.16` or `4.19.59` in Linux Speak. When looking at the mainline kernels the important thing to remember is the dates. Anything dated July 21-23 is new one with bugs, anything around July 14 is the previous version:

[![Ubuntu Mainline Kernels July 23.png][1]][1]


  [1]: https://i.stack.imgur.com/cqMDTl.png
