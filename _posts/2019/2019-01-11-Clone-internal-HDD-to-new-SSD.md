---
layout:       post
title:        >
    Clone internal HDD to new SSD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1108839
type:         Answer
tags:         11.04 boot partitioning configuration ssd grub
created_date: 2019-01-11 12:24:40
edit_date:    
votes:        "1 "
favorites:    
views:        "31,967 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-01-11-Clone-internal-HDD-to-new-SSD.md
toc:          false
navigation:   false
clipboard:    false
---

The bash script [`clone-ubuntu.sh`][1] automates the steps the accepted answer outlines. A menu is provided to make the new partition easy to find:


[![clone-ubuntu.png][2]][2]

Visit the link above for a copy of the script and important points to consider such as:

- `rsync` is used to clone booted partition and system virtual directories are correctly skipped.
- `/etc/fstab` of the target clone is updated with correct UUIDs for booting.
- `/etc/grub/grub.cfg` is updated for seamless grub booting.


  [1]: {% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %}
  [2]: https://i.stack.imgur.com/MgM3p.png
