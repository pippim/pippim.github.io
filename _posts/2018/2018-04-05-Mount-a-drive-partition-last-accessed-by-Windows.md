---
layout:       post
title:        >
    Mount a drive partition last accessed by Windows
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022218
type:         Answer
tags:         partitioning mount hard-drive
created_date: 2018-04-05 10:54:00
edit_date:    
votes:        "1 "
favorites:    
views:        "76 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-05-Mount-a-drive-partition-last-accessed-by-Windows.md
toc:          false
navigation:   false
clipboard:    false
---

The best way is to turn off hibernation or fastboot in Windows. Because you don't have Windows installed the only other option is [`ntfsfix`][1]:

To summarize the article, use the command:

``` 
sudo ntfsfix /dev/sdXY
```

Where `sdXY` is the Windows locked down partition.

  [1]: https://itsfoss.com/solve-ntfs-mount-problem-ubuntu-windows-8-dual-boot/
