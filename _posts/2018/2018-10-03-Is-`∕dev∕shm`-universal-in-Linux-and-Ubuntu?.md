---
layout:       post
title:        Is `∕dev∕shm` universal in Linux and Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1080717
type:         Question
tags:         devices pipe
created_date: 2018-10-03 23:03:52
edit_date:    2020-06-12 14:37:07
votes:        1
favorites:    
views:        1,762
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

For FIFO pipe speed I'm considering placing it inside the RAM disk called `/dev/shm`. I see there are some files there already:

``` 
$ ll /dev/shm
total 1536
drwxrwxrwt  2 root    root         280 Oct  2 17:19 ./
drwxr-xr-x 22 root    root        4840 Oct  2 05:49 ../
-rwx------  1 rick    rick    67108904 Oct  2 04:29 pulse-shm-1087740037*
-rwx------  1 lightdm lightdm 67108904 Oct  2 04:29 pulse-shm-1609193682*
-rwx------  1 rick    rick    67108904 Oct  2 04:34 pulse-shm-2114917541*
-rwx------  1 rick    rick    67108904 Oct  2 04:29 pulse-shm-2616701246*
-rwx------  1 rick    rick    67108904 Oct  2 17:14 pulse-shm-3211887872*
-rwx------  1 rick    rick    67108904 Oct  2 17:14 pulse-shm-3411101615*
-rwx------  1 rick    rick    67108904 Oct  2 04:32 pulse-shm-3740841284*
-rwx------  1 lightdm lightdm 67108904 Oct  2 04:29 pulse-shm-4039050064*
-rwx------  1 rick    rick    67108904 Oct  2 04:29 pulse-shm-608722223*
-rwx------  1 rick    rick    67108904 Oct  2 05:46 pulse-shm-629296834*
-rwx------  1 rick    rick    67108904 Oct  2 17:19 pulse-shm-791566179*
-rwx------  1 lightdm lightdm 67108904 Oct  2 04:29 pulse-shm-871250926*

```

Is it safe to assume this directory is universal on all Ubuntu systems or even better all Linux systems?

If the directory doesn't exist I'll create my pipe FIFO file in `/tmp` but hopefully that never happens.


----------

**Edit:** With many thanks to two great answers written below I found this article: [Why use named pipes on Linux][1]

> ## Why use named pipes?  
>   
> Named pipes are used infrequently for a good reason. On Unix systems,  
> there are almost always many ways to do pretty much the same thing.  
> There are many ways to write to a file, read from a file, and empty a  
> file, though named pipes have a certain efficiency going for them.  
>   
> For one thing, named pipe content resides in memory rather than being  
> written to disk. It is passed only when both ends of the pipe have  
> been opened. And you can write to a pipe multiple times before it is  
> opened at the other end and read.  


  [1]: https://www.networkworld.com/article/3251853/linux/why-use-named-pipes-on-linux.html
