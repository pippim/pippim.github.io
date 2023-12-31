---
layout:       post
title:        >
    Upgrade Ubuntu 16.04 LTS to Ubuntu 20.04.2.0 LTS via Terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1333934
type:         Answer
tags:         command-line upgrade
created_date: 2021-04-25 20:05:11
edit_date:    
votes:        "0 "
favorites:    
views:        "1,716 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-04-25-Upgrade-Ubuntu-16.04-LTS-to-Ubuntu-20.04.2.0-LTS-via-Terminal.md
toc:          false
navigation:   false
clipboard:    false
---

I would recommend running the upgrade on a clone of your production system. Then if the clone passes all tests error free, convert the clone to your production system. See:

- [Backup/clone live to a new partition which can be booted]({% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %})

Note you need to create a partition the size of your production system in order to use the script. Also note as other answer mentions you have to run 16.04 to 18.04 upgrade first and then 18.04 upgrade second.

You may find out the best method is:

- Clone production system to 16.04 clone.
- Run 16.04 to 18.04 upgrade on 16.04 clone.
- Find errors, fix errors in production system.
- Rerun 16.04 to 18.04 upgrade on 16.04 clone.
- Clone 16.04 clone to new 18.04 clone.
- Run 18.04 to 20.04 upgrade on 18.04 clone.
- Find errors, fix errors in 18.04 clone.
- Rerun 18.04 to 20.04 upgrade on 18.04 clone.
- After running clone clone for a few days, Rename clone clone to production system.

Or of course you can simply back up your production system, attempt upgrades and simply restore after each failed attempt at upgrade. Fix what cause the failure, backup again and attempt upgrade again. Wash, rinse, repeat.
