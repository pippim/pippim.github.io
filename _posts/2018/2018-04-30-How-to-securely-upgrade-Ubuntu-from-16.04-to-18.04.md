---
layout:       post
title:        >
    How to securely upgrade Ubuntu from 16.04 to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030348
type:         Answer
tags:         16.04 upgrade updates system 18.04
created_date: 2018-04-30 23:23:17
edit_date:    
votes:        "2 "
favorites:    
views:        "4,801 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-30-How-to-securely-upgrade-Ubuntu-from-16.04-to-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

When in doubt err on the side of caution. The best thing to do is test, test and test some more. Using this script: [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][1] you can clone your Ubuntu 16.04 to a new partition and run the upgrade to 18.04 on the new partition.

If the upgrade fails, find out why, wait for fix, clone the data again and rerun the upgrade.

After the upgrade succeeds test each application you use. If one doesn't work, find out why, wait for fix, clone the data again and rerun the upgrade.

The other part about testing is to choose which of the five unique signons you like best between Gnome, Unity, Wayland, X11 and combinations therein.

Additionally you can install new applications previously not available such as tweak tools and experiment with them. If you break something, clone the data again and rerun the upgrade.

Wash, Rinse, Repeat then Repeat again...


  [1]: {% post_url /2018/2018-04-27-Bash-script-to-backup_clone-Ubuntu-to-another-partition %}
