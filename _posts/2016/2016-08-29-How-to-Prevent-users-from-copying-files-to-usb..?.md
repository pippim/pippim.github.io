---
layout:       post
title:        >
    How to Prevent users from copying files to usb..?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818165
type:         Answer
tags:         file-sharing usb-storage copy
created_date: !!str "2016-08-29 10:40:46"
edit_date:    !!str "2017-04-13 12:24:53"
votes:        !!str "3"
favorites:    
views:        !!str "1,531"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

The solution is to blacklist the USB storage driver. Users will not be able to read or write files through USB sticks. This not only protects your corporate information from theft but also reduces chances of viruses entering your system.

There isn't a single parameter for blacklisting USB storage because it can vary between kernel versions.

A good write up is on AskUbuntu: [how-do-i-disable-usb-storage][1] This Q&A covers Ubuntu 12.04 through 16.04. It covers different blacklisting methods and different USB storage driver names.


  [1]: https://askubuntu.com/questions/254113/how-do-i-disable-usb-storage
