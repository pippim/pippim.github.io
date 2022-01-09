---
layout:       post
title:        >
    Where is my PATH variable being set?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069939
type:         Answer
tags:         bash java environment-variables bashrc .profile
created_date: 2018-08-28 23:01:05
edit_date:    2018-09-30 14:43:51
votes:        "3 "
favorites:    
views:        "7,809 "
accepted:     
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

To find all places where `$PATH` environment variable is changed use this:

``` 
sudo grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e "PATH="

```

This will search all directories on your system excluding virtual file system directories. In my case with three distros mounted, 697 files are returned.


----------


A more targeted approach for OP is to search for specific path name. You could look for the program that is setting the unusual part of $PATH containing:

``` 
/usr/local/java/jdk1.7.0_79/bin

```

Run this in the terminal:

``` 
sudo grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e "/usr/local/java/jdk1.7.0_79/bin"

```

If the first directory in the $PATH is not the culprit then search for the last one:

``` 
/usr/lib/jvm/java-7-openjdk-amd64/jre/bin

```

`grep` will return the name of the script / file that is setting the $PATH.
