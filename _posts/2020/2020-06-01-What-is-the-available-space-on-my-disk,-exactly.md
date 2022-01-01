---
layout:       post
title:        >
    What is the available space on my disk, exactly
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1245640
type:         Answer
tags:         disk-usage
created_date: !!str "2020-06-01 00:55:34"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "365"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

QDirStat appears to be only showing the size of files you own. For example `/boot` shows as zero bytes but in reality it would have to have something in it:

For example:

``` 
$ du /boot -s -h

du: cannot read directory '/boot/efi': Permission denied
1.2G	/boot

$ sudo du /boot -s -h
1.3G	/boot
```

Another important consideration is some utilities list the size of the bytes in a file while others list the space a file occupies which is number of bytes rounded up to the block size which is generally 4,096 bytes or 4K.
