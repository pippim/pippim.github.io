---
layout:       post
title:        >
    How to Prevent users from copying files to usb..?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818165
type:         Answer
tags:         file-sharing usb-storage copy
created_date: 2016-08-29 10:40:46
edit_date:    2017-04-13 12:24:53
votes:        "3 "
favorites:    
views:        "1,547 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-29-How-to-Prevent-users-from-copying-files-to-usb..^.md
toc:          false
navigation:   false
clipboard:    false
---

The solution is to blacklist the USB storage driver. Users will not be able to read or write files through USB sticks. This not only protects your corporate information from theft but also reduces chances of viruses entering your system.

There isn't a single parameter for blacklisting USB storage because it can vary between kernel versions.

A good write up is on AskUbuntu: [how-do-i-disable-usb-storage][1] This Q&A covers Ubuntu 12.04 through 16.04. It covers different blacklisting methods and different USB storage driver names.


  [1]: https://askubuntu.com/questions/254113/how-do-i-disable-usb-storage
