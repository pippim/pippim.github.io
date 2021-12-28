---
layout:       post
title:        Linux keeps on Logging and freezing after entering password
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1153967
type:         Answer
tags:         18.04 19.04 grub
created_date: 2019-06-25 21:56:00
edit_date:    
votes:        0
favorites:    
views:        483
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

As per this [bug report](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1521173) edit your grub command line with:

``` 
pci=noaer

```

I'm on mobile but will update from computer with instructions on how to update grub.
