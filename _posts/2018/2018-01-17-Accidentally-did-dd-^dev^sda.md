---
layout:       post
title:        >
    Accidentally did dd /dev/sda
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/996828
type:         Answer
tags:         hard-drive data-recovery dd
created_date: 2018-01-17 03:10:04
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "21,818 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-17-Accidentally-did-dd-^dev^sda.md
toc:          false
navigation:   false
clipboard:    false
---

# Testdisk to the rescue

I can personally vouch for [Testdisk][1] which saved my data after I was repeatedly copying and pasting instructions for `/dev/sdb` and changing it to `/dev/sdd` which was my USB. Only one time I forgot to change it and there went my `/dev/sdb` into the dustbin.

# Setup your system to never write to `/dev/sda`

I strongly recommend creating a wrapper script: [Prevent `dd` from destroying SSD or HDD][2]. This ensures `dd` never writes to `/dev/sda` or possibly `/dev/sdb` or any other of your mass storage devices.


  [1]: https://www.pcworld.com/article/3132067/linux/how-to-recover-lost-data-using-testdisk.html
  [2]: {% post_url /2017/2017-01-04-Prevent-`dd`-from-destroying-SSD-or-HDD %}
