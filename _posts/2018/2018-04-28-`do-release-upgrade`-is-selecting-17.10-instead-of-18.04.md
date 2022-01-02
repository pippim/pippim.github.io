---
layout:       post
title:        >
    `do-release-upgrade` is selecting 17.10 instead of 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029453
type:         Question
tags:         16.04 upgrade 18.04
created_date: 2018-04-28 22:33:34
edit_date:    
votes:        "1 "
favorites:    
views:        "488 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

There was a bug fix awhile back for this problem: [`do-release-upgrade` selects 18.04 instead of 17.10 target][1]. My problem is the opposite of this bug fix.

On my test partition when I try to upgrade 16.04 to 18.04 and I run:

``` 
~$ sudo do-release-upgrade
Checking for a new Ubuntu release
Get:1 Upgrade tool signature [819 B]                                                       
Get:2 Upgrade tool [1,253 kB]                                                              
Fetched 1,254 kB in 0s (0 B/s)                                                             
authenticate 'artful.tar.gz' against 'artful.tar.gz.gpg' 
extracting 'artful.tar.gz'

```

It is selecting Artful (**17.10**) and not Bionic (**18.04**).

If I change `/etc/update-manager/release-upgrades` last line from:

``` 
Prompt=normal

```

to:

``` 
Prompt=lts

```

and rerun `do-release-upgrade` I get this:

``` 
$ sudo do-release-upgrade
Checking for a new Ubuntu release
No new release found.

```

Assuming 18.04 has been properly populated into Canonical Repositories, what am I doing wrong???

  [1]: https://askubuntu.com/questions/1006921/do-release-upgrade-selects-18-04-instead-of-17-10-target

