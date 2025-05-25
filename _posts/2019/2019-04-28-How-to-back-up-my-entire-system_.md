---
layout:       post
title:        >
    How to back up my entire system?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138896
type:         Answer
tags:         backup grub
created_date: 2019-04-28 15:45:07
edit_date:    
votes:        "2 "
favorites:    
views:        "415,684 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-28-How-to-back-up-my-entire-system_.md
toc:          false
navigation:   false
clipboard:    false
---

You can backup your entire Ubuntu installation to another partition with this answer:

- [Bash script to clone active Ubuntu Partition to another partition][1]

Advantages of this technique:

- You can continue using the system while it is being backed up. Care must be taken that you are only using web browser apps, office apps, watching videos, etc. and **not** database apps like accounting or SQL.
- Virtual file systems are not backed up. They are recreated on each boot up so they are useless to backup in the first place.
- The first backup may take an hour but daily backups do not copy files that haven't changed so they may only take a few minutes.
- You can reboot and use the backup. This is beneficial if you want to try something dangerous that might break the system such as a Ubuntu Version upgrade untested in your environment.
- If you totally break your production environment you can reboot into your clone and copy it back over using the same script.
- Grub is automatically updated with proper UUID entries.
- `/etc/fstab` is automatically updated with proper UUID entries.


  [1]: {% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %}
