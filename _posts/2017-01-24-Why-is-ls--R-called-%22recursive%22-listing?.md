---
layout:       post
title:        Why is ls -R called "recursive" listing?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/875471
type:         Answer
tags:         command-line ls
created_date: 2017-01-24 01:07:07
edit_date:    
votes:        7
favorites:    
views:        21,691
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    true
---

-R is for recursion, which could loosely be called "repeatedly".

Take this code for example:

{% include copyHeader.html %}
``` 
───────────────────────────────────────────────────────────────────────────────
$ mkdir -p temp/a
───────────────────────────────────────────────────────────────────────────────
$ mkdir -p temp/b/1
───────────────────────────────────────────────────────────────────────────────
$ mkdir -p temp/c/1/2
───────────────────────────────────────────────────────────────────────────────
$ ls -R temp
temp:
a  b  c

temp/a:

temp/b:
1

temp/b/1:

temp/c:
1

temp/c/1:
2

temp/c/1/2:

```


The `-p` in making directories allows you to mass create directories with a single command. If one or more of the top-middle directories already exist it's not an error and the middle-lower directories are created.

Then the `ls -R` recursively lists every single directory starting with temp and working it's way down the tree to all the branches.

Now let's look at a complement to the `ls -R` command, ie the `tree` command:

``` 
$ tree temp
temp
├── a
├── b
│   └── 1
└── c
    └── 1
        └── 2

6 directories, 0 files

As you can see `tree` accomplishes the same as `ls -R` except is more concise and dare I say "prettier".
```


Now let's look at how to recursively remove the directories we just created in one simple command:

``` 
$ rm -r temp

```

This recursively removes `temp` and all the sub-directories underneath it. ie `temp/a`, `temp/b/1` and `temp/c/1/2` plus the middle directories in between.
