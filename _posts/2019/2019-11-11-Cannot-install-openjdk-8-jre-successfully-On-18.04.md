---
layout:       post
title:        >
    Cannot install openjdk-8-jre successfully On 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187842
type:         Answer
tags:         18.04
created_date: 2019-11-11 04:23:12
edit_date:    
votes:        "2 "
favorites:    
views:        "393 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-11-Cannot-install-openjdk-8-jre-successfully-On-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

The file is corrupted. Remove it using:

``` 
sudo rm /var/lib/dpkg/info/astyle.list
```

Then reinstall the package using:

``` 
sudo apt install --reinstall openjdk-8-jre
```
