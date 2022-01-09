---
layout:       post
title:        >
    Grub file can't be saved after modification
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160778
type:         Answer
tags:         grub2 files configuration wacom text-editor
created_date: 2019-07-24 18:12:35
edit_date:    2019-08-24 21:32:17
votes:        "3 "
favorites:    
views:        "487 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

`grub` is a system owned application so you need to use `sudo` to edit the file:

``` 
sudo -H gedit /etc/default/grub

```

If you omit `sudo -H` you can view the file but not save any changes.

After editing the file you need to run:

``` 
sudo update-grub

```

This will compile the changes you made to `/etc/default/grub` and compile them with `grub` functions to create a new `/boot/grub/grub.cfg` which is the actual file parsed at boot time.

**Note:** Related question today: [How do I edit configuration files?]({% post_url /2019/2019-07-24-How-do-I-edit-configuration-files? %})
