---
layout:       post
title:        >
    How to backup the whole desktop — without backing up junk?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1152148
type:         Answer
tags:         backup rsync
created_date: 2019-06-19 00:28:14
edit_date:    
votes:        "0 "
favorites:    
views:        "319 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-19-How-to-backup-the-whole-desktop-—-without-backing-up-junk_.md
toc:          false
navigation:   false
clipboard:    false
---

From: [Backup/clone live to a new partition which can be booted]({% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %})

``` 
rsync -haxAX --stats --delete --info=progress2 --info=name0 --inplace  \
      /* "$TargetMnt"                                                   \
      --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/run/*,/mnt/*,/media/*,/lost+found}
```

The script also updates `/boot/grub/grub.cfg` and `/etc/fstab` so you can boot your backup.
