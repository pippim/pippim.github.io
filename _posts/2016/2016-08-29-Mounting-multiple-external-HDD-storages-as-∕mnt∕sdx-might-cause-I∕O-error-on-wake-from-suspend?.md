---
layout:       post
title:        >
    Mounting multiple external HDD storages as ∕mnt∕sdx might cause I∕O error on wake from suspend?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818017
type:         Answer
tags:         mount hard-drive suspend
created_date: !!str "2016-08-29 01:10:57"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "53"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Yes.

UUID is the preferred method because /dev/sda, /dev/sdb, /dev/sdc, etc. can change between boots.

It's described in detail here: [persistent_block_device_naming][1]


  [1]: https://wiki.archlinux.org/index.php/persistent_block_device_naming
