---
layout:       post
title:        >
    Questions About Kernel Upgrade and Computer Maintenance
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/863912
type:         Answer
tags:         upgrade kernel
created_date: !!str "2016-12-23 16:06:16"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "135"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

After your first `uname -r` it listed **4.4.0-53** as the kernel version you last booted with.

When you did `sudo apt upgrade` it offered to update your disk with newer kernel `4.4.0-57` but you must select `Y` to upgrade it on disk. You did not say if you did this or not.

When you typed `uname -r` a second time it still shows **4.4.0-53** as the kernel you booted with because you haven't rebooted yet.

Anyways... Do the upgrade and select `Y` and then reboot to get the newest kernel booted into RAM and virtual directories `/proc`, `/sys`, etc.
