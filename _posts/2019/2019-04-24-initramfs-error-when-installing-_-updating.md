---
layout:       post
title:        >
    initramfs error when installing / updating
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1137679
type:         Answer
tags:         apt initramfs
created_date: 2019-04-24 11:33:50
edit_date:    2023-08-25 23:07:54
votes:        "2 "
favorites:    
views:        "93,314 "
accepted:     
uploaded:     2023-09-14 01:12:26
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-24-initramfs-error-when-installing-_-updating.md
toc:          false
navigation:   false
clipboard:    false
---

A [similar question][1] has this solution:

``` 
sudo apt-get autoclean
sudo apt-get clean
sudo apt-get update 
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt-get -f install
sudo dpkg --configure -a
```

Additionally ensure this executable exists:

``` 
ls -alF /usr/share/initramfs-tools/hooks/fsck
```

returns this output:

``` 
-rwxr-xr-x 1 root root 2468 Sep 18  2018 /usr/share/initramfs-tools/hooks/fsck
```


  [1]: https://stackoverflow.com/questions/35336174/ubuntu-12-04-update-to-the-3-8-kernel-fails
