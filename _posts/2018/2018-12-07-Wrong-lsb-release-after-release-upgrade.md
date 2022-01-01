---
layout:       post
title:        >
    Wrong lsb-release after release upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099248
type:         Answer
tags:         apt package-management upgrade dpkg do-release-upgrade
created_date: !!str "2018-12-07 19:02:48"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "3,104"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
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

