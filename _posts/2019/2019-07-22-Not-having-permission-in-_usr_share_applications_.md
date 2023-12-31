---
layout:       post
title:        >
    Not having permission in /usr/share/applications/
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160220
type:         Answer
tags:         16.04 permissions
created_date: 2019-07-22 17:26:35
edit_date:    
votes:        "0 "
favorites:    
views:        "3,808 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-22-Not-having-permission-in-_usr_share_applications_.md
toc:          false
navigation:   false
clipboard:    false
---

Users don't have write access to `/usr/share/applications`:

``` 
$ ll /usr/share/applications
total 900
drwxr-xr-x   3 root root 12288 Jul 18 06:42 ./
drwxr-xr-x 343 root root 12288 Jun 30 09:29 ../
```

If you want to create a document there try:

``` 
sudo -H gedit /usr/share/applications/mydoc.txt
```

Add a few lines and save it. Then check that it is there:

``` 
$ ll /usr/share/applications/mydoc.txt

-rw-r--r-- 1 root root 149 Jul 22 11:24 /usr/share/applications/mydoc.txt

$ cat /usr/share/applications/mydoc.txt

Test for writing into /usr/share/applications/mydoc.txt
For: https://askubuntu.com/questions/1160114/not-having-permission-in-usr-share-applications
```


