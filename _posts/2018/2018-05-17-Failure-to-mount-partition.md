---
layout:       post
title:        >
    Failure to mount partition
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037215
type:         Answer
tags:         partitioning mount
created_date: 2018-05-17 03:49:36
edit_date:    
votes:        "3 "
favorites:    
views:        "3,399 "
accepted:     
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

Try this:

``` 
sudo mkdir /mnt/stuff
sudo mount -t auto /dev/sda1 /mnt/stuff

```

Then do what you want to with the "stuff" and when finished use:

``` 
sudo umount -l /mnt/stuff
sudo rm -d /mnt/stuff

```

This is from an interactive script I wrote last week: [Unable to read files between two distros]({% post_url /2018/2018-05-11-Unable-to-read-files-between-two-distros %})
