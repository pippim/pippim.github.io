---
layout:       post
title:        >
    Mounting multiple external HDD storages as /mnt/sdx might cause I/O error on wake from suspend?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818017
type:         Answer
tags:         mount hard-drive suspend
created_date: 2016-08-29 01:10:57
edit_date:    
votes:        "0 "
favorites:    
views:        "55 "
accepted:     Accepted
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-29-Mounting-multiple-external-HDD-storages-as-_mnt_sdx-might-cause-I_O-error-on-wake-from-suspend_.md
toc:          false
navigation:   false
clipboard:    false
---

Yes.

UUID is the preferred method because /dev/sda, /dev/sdb, /dev/sdc, etc. can change between boots.

It's described in detail here: [persistent_block_device_naming][1]


  [1]: https://wiki.archlinux.org/index.php/persistent_block_device_naming
