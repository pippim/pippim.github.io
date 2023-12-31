---
layout:       post
title:        >
    Want to Run SSD + HDD Drives, Can't Access HDD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/858609
type:         Answer
tags:         hard-drive ssd
created_date: 2016-12-09 00:18:40
edit_date:    
votes:        "0 "
favorites:    
views:        "2,935 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-09-Want-to-Run-SSD-_-HDD-Drives_-Can_t-Access-HDD.md
toc:          false
navigation:   false
clipboard:    false
---

The links provided by OldFred within the comment section under your question describe what you need to do in detail. So briefly (assuming legacy BIOS boot):

 - Open dash with <kbd>Alt</kbd>+<kbd>F2</kbd>
 - Type `gparted`, select the icon and press <kbd>Enter</kbd>

In the screen below I'm in the process of creating a new Extended partition of 95 GB which I will be using for Linux in the future:

[![gparted][1]][1]

This gives you an idea of what you will be doing without going into a lot of detail.

In your case you will be selecting `/dev/sdb` (the second hard drive) to setup your Linux files. On my system this has already been done so I can't show how to create from scratch but here is an example of `/dev/sdb` from my system:

[![gparted 2][2]][2]

Notice the top right hand corner where you select the SSD or HDD you want to work with.

If you have any questions post them as comments below and I'll update the answer accordingly.


  [1]: https://i.stack.imgur.com/YhUdm.png
  [2]: https://i.stack.imgur.com/1ltsb.png
