---
layout:       post
title:        >
    Cannot install openjdk-8-jre successfully On 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187842
type:         Answer
tags:         18.04
created_date: !!str "2019-11-11 04:23:12"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "304"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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
