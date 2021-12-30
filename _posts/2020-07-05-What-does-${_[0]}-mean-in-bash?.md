---
layout:       post
title:        What does ${_[0]} mean in bash?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1256426
type:         Answer
tags:         command-line bash
created_date: 2020-07-05 00:54:24
edit_date:    2020-07-05 11:44:22
votes:        5
favorites:    
views:        2,057
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

As others have mentioned `${_[0]}` is extra typing for `${_}` which in turn can be abbreviated into `$_` as it is most commonly used. 

As mentioned previously it is a variable that contains the last parameter of the last command used. A practical application is like this:

```bash
$ ll /etc/lsb-release
-rw-r--r-- 1 root root 105 Feb 20  2019 /etc/lsb-release

$ cat $_
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.6 LTS"
```

In the first command the last parameter is `/etc/lsb-release`. In the second command the parameter is `$_`, which repeats `/etc/lsb-release` so you don't have to retype it.
