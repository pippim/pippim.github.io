---
layout:       post
title:        >
    Wrong lsb-release after release upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099248
type:         Answer
tags:         apt package-management upgrade dpkg do-release-upgrade
created_date: 2018-12-07 19:02:48
edit_date:    
votes:        "0 "
favorites:    
views:        "5,224 "
accepted:     Accepted
uploaded:     2024-06-09 08:36:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-07-Wrong-lsb-release-after-release-upgrade.md
toc:          false
navigation:   false
clipboard:    false
---

`lsb_release` is a Python script that simply reads from the file `/etc/lsb-release` and dumps output to the screen. You can edit the file using:

``` 
sudo -H gedit /etc/lsb-release
```

Then change the contents to suit your platform. Mine contains:

``` 
$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.5 LTS"
```

