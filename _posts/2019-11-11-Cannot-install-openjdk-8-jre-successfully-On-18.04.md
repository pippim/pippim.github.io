---
layout:       post
title:        Cannot install openjdk-8-jre successfully On 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187842
type:         Answer
tags:         18.04
created_date: 2019-11-11 04:23:12
edit_date:    
votes:        2
favorites:    
views:        304
accepted:     
uploaded:     2021-12-28 20:06:53
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
