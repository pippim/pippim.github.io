---
layout:       post
title:        >
    vboxdrv: Fatal error in Kernel 4.8
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/842626
type:         Answer
tags:         kernel virtualbox virtualization
created_date: 2016-10-27 23:17:02
edit_date:    2017-04-13 12:25:11
votes:        "1 "
favorites:    
views:        "0 "
accepted:     Accepted
uploaded:     2024-08-09 17:46:04
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-27-vboxdrv_-Fatal-error-in-Kernel-4.8.md
toc:          false
navigation:   false
clipboard:    false
---

With Oracle's Virtual Box 5.1 the DKMS (Dynamic Kernel Management System) is no longer used to download source code and compile it for every Kernel Upgrade.

Go to [Install latest VirtualBox 5.1 Ubuntu 16.04][1] for instructions on:

 - removing old version
 - adding VirtualBox to sources.list (informs Ubuntu where to find it)
 - adding VirtualBox signature key to library
 - installing current version of VirtualBox

Also instead of Kernel version 4.8.1 which has the "Dirty COW" security holes ([What is dirty COW bug?][2]), you should use the most recent kernel version 4.8.4 (as of October 27, 2016) which has the bug fix.


  [1]: https://www.linuxbabe.com/virtualbox/install-latest-virtualbox-5-1-ubuntu-16-04
  [2]: {% post_url /2016/2016-10-21-What-is-the-_Dirty-COW_-bug_-and-how-can-I-secure-my-system-against-it_ %}
