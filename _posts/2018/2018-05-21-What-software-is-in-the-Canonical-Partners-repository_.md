---
layout:       post
title:        >
    What software is in the Canonical Partners repository?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038539
type:         Answer
tags:         repository canonical ubuntu-wiki
created_date: 2018-05-21 02:11:57
edit_date:    
votes:        "2 "
favorites:    
views:        "6,663 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-21-What-software-is-in-the-Canonical-Partners-repository_.md
toc:          false
navigation:   false
clipboard:    true
---

Not sure how up-to-date this is but you can use two commands:

{% include copyHeader.html %}
``` 
$ wget --spider -r --no-parent http://archive.canonical.com/ubuntu/pool/partner/
    (...SNIP...)
Found no broken links.

FINISHED --2018-05-20 20:01:58--
Total wall clock time: 1m 35s
Downloaded: 507 files, 1.2M in 0.4s (3.24 MB/s)

$ ls -l archive.canonical.com/ubuntu/pool/partner/
total 68
drwxrwxr-x  4 rick rick 4096 May 20 20:00 a
drwxrwxr-x  4 rick rick 4096 May 20 20:00 c
drwxrwxr-x  6 rick rick 4096 May 20 20:00 d
drwxrwxr-x  4 rick rick 4096 May 20 20:00 e
drwxrwxr-x  9 rick rick 4096 May 20 20:01 g
drwxrwxr-x  3 rick rick 4096 May 20 20:01 h
drwxrwxr-x  3 rick rick 4096 May 20 20:01 i
drwxrwxr-x  3 rick rick 4096 May 20 20:01 k
drwxrwxr-x  4 rick rick 4096 May 20 20:01 m
drwxrwxr-x  3 rick rick 4096 May 20 20:01 n
drwxrwxr-x  5 rick rick 4096 May 20 20:01 o
drwxrwxr-x  3 rick rick 4096 May 20 20:01 p
drwxrwxr-x  3 rick rick 4096 May 20 20:01 s
drwxrwxr-x 14 rick rick 4096 May 20 20:01 t
drwxrwxr-x  3 rick rick 4096 May 20 20:01 u
drwxrwxr-x  3 rick rick 4096 May 20 20:01 v
drwxrwxr-x  4 rick rick 4096 May 20 20:01 x
```

Now you have a complete index (I hope) of all packages available on your drive. To check out what's available in the `a` category:

``` 
$ ls archive.canonical.com/ubuntu/pool/partner/a
acroread  adobe-flashplugin
```

The size of the list is nominal so you might want to keep it on your drive or delete it:

``` 
$ du -h -d1 archive.canonical.com/ubuntu/pool/partner/
32K	    archive.canonical.com/ubuntu/pool/partner/g
12K     archive.canonical.com/ubuntu/pool/partner/e
8.0K	archive.canonical.com/ubuntu/pool/partner/n
12K     archive.canonical.com/ubuntu/pool/partner/x
8.0K	archive.canonical.com/ubuntu/pool/partner/v
12K     archive.canonical.com/ubuntu/pool/partner/c
8.0K    archive.canonical.com/ubuntu/pool/partner/p
8.0K	archive.canonical.com/ubuntu/pool/partner/i
8.0K	archive.canonical.com/ubuntu/pool/partner/s
12K     archive.canonical.com/ubuntu/pool/partner/a
52K     archive.canonical.com/ubuntu/pool/partner/t
8.0K	archive.canonical.com/ubuntu/pool/partner/k
8.0K	archive.canonical.com/ubuntu/pool/partner/u
8.0K	archive.canonical.com/ubuntu/pool/partner/h
16K     archive.canonical.com/ubuntu/pool/partner/o
20K     archive.canonical.com/ubuntu/pool/partner/d
12K     archive.canonical.com/ubuntu/pool/partner/m
248K	archive.canonical.com/ubuntu/pool/partner/
```



