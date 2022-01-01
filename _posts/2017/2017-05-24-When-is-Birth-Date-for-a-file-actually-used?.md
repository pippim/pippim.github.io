---
layout:       post
title:        >
    When is Birth Date for a file actually used?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/918300
type:         Question
tags:         command-line stat
created_date: !!str "2017-05-24 03:01:14"
edit_date:    !!str "2017-05-24 03:59:08"
votes:        !!str "13"
favorites:    1
views:        !!str "7,197"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

When I type the following:

``` 
$ IFS=$'\n'; arr=( $(stat "/bin/bash") ); for i in ${arr[@]} ; do echo $i ; done
  File: '/bin/bash'
  Size: 1037528   	Blocks: 2032       IO Block: 4096   regular file
Device: 823h/2083d	Inode: 656086      Links: 1
Access: (0755/-rwxr-xr-x)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2017-05-23 16:38:03.848124217 -0600
Modify: 2017-05-16 06:49:55.000000000 -0600
Change: 2017-05-18 07:43:22.946694155 -0600
 Birth: -

```

I see the Birth Date for `/bin/bash` is null / empty. When is this field ever used and what purpose might it have in Linux when it works?

I appreciate there is a shorter way of using `stat` but this came up during development cycle and I copy and pasted.
