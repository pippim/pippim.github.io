---
layout:       post
title:        >
    how do I fix a wrong UUID in grub.cfg?
site:         Super User
stack_url:    https://superuser.com/q/1318288
type:         Answer
tags:         linux grub uuid
created_date: 2018-04-29 16:05:46
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-09 17:46:04
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-how-do-I-fix-a-wrong-UUID-in-grub.cfg_.md
toc:          false
navigation:   false
clipboard:    false
---

When you run `update-grub` from `sda5` it reads the `/boot/grub/grub.cfg` from `sda9` which was copied from `sda5`. First boot into `sda5` which is your primary OS. Then use these commands to fix:

``` 
SourceUUID=cc3bca0d-aee4-4b9c-95c2-57212cc36d4d
TargetUUID=64662470-0e58-4dfd-90ac-43227d773556
sudo mkdir /mnt/clone
sudo mount -t auto -v /dev/sda9 /mnt/clone
sudo sed -i "s/$SourceUUID/$TargetUUID/g" /mnt/clone/boot/grub/grub.cfg
sudo update-grub
sudo umount /mnt/clone -l
```

I based this answer on a [Ubuntu 16.04 LTS clone to new partition script][1].


  [1]: {% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %}
