---
layout:       post
title:        >
    How do I edit configuration files?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160748
type:         Answer
tags:         configuration text-editor editing
created_date: 2019-07-24 15:58:05
edit_date:    2019-08-24 21:47:20
votes:        "6 "
favorites:    
views:        "7,437 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-24-How-do-I-edit-configuration-files^.md
toc:          false
navigation:   false
clipboard:    false
---

Configuration files are usually owned by `root`. For example:

``` 
$ ll /etc/default/grub

-rw-r--r-- 1 root root 6801 Jul 18 13:26 /etc/default/grub

 ^^ ^  ^
 || |  +-- Users can only read
 || +----- Members of the group can only read
 |+------- The owner can write
 +-------- The owner can read
```

In order for a user (yourself) to edit `/etc/grub/default` you need to use `sudo` powers. So **instead of using**:



``` bash
gedit /etc/default/grub
```

**You must use**:



``` bash
sudo -H gedit /etc/default/grub
```

At which point you will be prompted for your password.

**Note:** Related question today: [Grub file can&#39;t be saved after modification](Grub file can&#39;t be saved after modification)
