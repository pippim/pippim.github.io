---
layout:       post
title:        >
    Unable to install mailutils
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/887539
type:         Answer
tags:         command-line apt mailutils
created_date: 2017-02-26 16:22:38
edit_date:    2017-02-26 19:36:49
votes:        "2 "
favorites:    
views:        "14,918 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-26-Unable-to-install-mailutils.md
toc:          false
navigation:   false
clipboard:    false
---

Use `apt policy` to see what's wrong :  

``` 
$ apt policy mailtuils
N: Unable to locate package mailtuils
```

Aha ... now what do I see ? ... a typo ! :D

``` 
$ apt policy mailutils
mailutils:
  Installed: (none)
  Candidate: 1:2.99.99-1.1ubuntu3
  Version table:
     1:2.99.99-1.1ubuntu3 500
        500 http://archive.ubuntu.com/ubuntu yakkety/universe amd64 Packages
```

Double check `universe` is in your repositories:

``` 
$ sudo add-apt-repository universe
'universe' distribution component is already enabled for all sources.
```

And here we go ...

``` 
$ sudo apt-get install mailutils
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libgsasl7 libkyotocabinet16v5 libmailutils4 libntlm0 mailutils-common
Suggested packages:
  mailutils-mh mailutils-doc
The following NEW packages will be installed:
  libgsasl7 libkyotocabinet16v5 libmailutils4 libntlm0 mailutils
  mailutils-common
0 upgraded, 6 newly installed, 0 to remove and 4 not upgraded.
Need to get 1,285 kB of archives.
After this operation, 6,657 kB of additional disk space will be used.
Do you want to continue? [Y/n] n
Abort.
```


