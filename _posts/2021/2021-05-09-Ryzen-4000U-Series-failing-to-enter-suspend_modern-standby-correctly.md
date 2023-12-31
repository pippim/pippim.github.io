---
layout:       post
title:        >
    Ryzen 4000U Series failing to enter suspend/modern-standby correctly
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1337171
type:         Answer
tags:         suspend amd-graphics acer
created_date: 2021-05-09 18:03:55
edit_date:    
votes:        "0 "
favorites:    
views:        "960 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-09-Ryzen-4000U-Series-failing-to-enter-suspend_modern-standby-correctly.md
toc:          false
navigation:   false
clipboard:    false
---

There have been four posts today on: [https://gitlab.freedesktop.org/drm/amd/-/issues/1230](https://gitlab.freedesktop.org/drm/amd/-/issues/1230)0 which is the link posted by *user5950*.

Running Kernel 5.12.1 fixes the problem for the first suspend/resume but unless you reboot the second suspend/resume cycle crashes.

This indicates something was left unstable after the first resume and some drivers need to be reinitialized.

Released two days ago is an even newer kernel 5.12.2 which may improve the situation even more:

- [https://kernel.ubuntu.com/~kernel-ppa/mainline/v5.12.2/](https://kernel.ubuntu.com/~kernel-ppa/mainline/v5.12.2/)

For instructions on installing a mainline kernel published by Ubuntu:

- [How to update kernel to the latest mainline version without any Distro-upgrade?](https://askubuntu.com/a/885165/307523)
