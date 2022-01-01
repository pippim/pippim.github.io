---
layout:       post
title:        >
    What is the difference between touch file and > file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/831418
type:         Answer
tags:         command-line
created_date: !!str "2016-09-30 02:53:37"
edit_date:    !!str "2018-08-06 02:42:01"
votes:        !!str "28"
favorites:    
views:        !!str "40,612"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Both `touch` and `>` will create a new file if it doesn't exist. As the following terminal commands show when you `touch` an existing file the access/last modified time are updated. But if you `>` to an existing file it is truncated and the last modified time is updated (access time is not).  Note that `>` does not delete/unlink the file.  The inode stays the same -- which is why `>` / or `truncate` are commonly used to clear out log files even with an open file handle.

``` 
rick@dell:~$ > EmptyFile

```

``` 
rick@dell:~$ touch EmptyFile2

```

``` 
rick@dell:~$ ls Empty*
EmptyFile  EmptyFile2

```

``` 
rick@dell:~$ ls -l Empty*
-rw-rw-r-- 1 rick rick 0 Sep 29 20:27 EmptyFile
-rw-rw-r-- 1 rick rick 0 Sep 29 20:27 EmptyFile2

```

``` 
rick@dell:~$ echo Hello > EmptyFile

```

``` 
rick@dell:~$ ls -l Empty*
-rw-rw-r-- 1 rick rick 6 Sep 29 20:28 EmptyFile
-rw-rw-r-- 1 rick rick 0 Sep 29 20:27 EmptyFile2

```

``` 
rick@dell:~$ > EmptyFile

```

``` 
rick@dell:~$ ls -l Empty*
-rw-rw-r-- 1 rick rick 0 Sep 29 20:28 EmptyFile
-rw-rw-r-- 1 rick rick 0 Sep 29 20:27 EmptyFile2

```

``` 
rick@dell:~$ echo Hello > EmptyFile

```

``` 
rick@dell:~$ touch EmptyFile

```

``` 
rick@dell:~$ ls -l Empty*
-rw-rw-r-- 1 rick rick 6 Sep 29 20:32 EmptyFile
-rw-rw-r-- 1 rick rick 0 Sep 29 20:27 EmptyFile2

```


----------

As mentioned in comments, `touch` is an external command and only operates on files. `>` is a shell built-in feature that serves many different purposes. Typically you would see it used like `cat source.fil > target.fil`. 

A long form to empty a file would be:

``` 
cat /dev/null > emptyme.fil

```

Using `> emptme.fil` accomplishes the same thing in a compact format of redirecting nothing to the file.
