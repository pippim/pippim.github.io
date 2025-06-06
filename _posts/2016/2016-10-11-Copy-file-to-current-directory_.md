---
layout:       post
title:        >
    Copy file to current directory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/835659
type:         Answer
tags:         command-line files copy grub
created_date: 2016-10-11 12:15:46
edit_date:    2016-10-11 22:54:48
votes:        "16 "
favorites:    
views:        "323,636 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-11-Copy-file-to-current-directory_.md
toc:          false
navigation:   false
clipboard:    false
---

For the destination directory use a single dot '**`.`**'

## Long Answer


From your home directory type the following:

``` 
rick@dell:~$ mkdir a && mkdir a/b && mkdir a/b/c && mkdir a/b/c2
────────────────────────────────────────────────────────────────
rick@dell:~$ cd a/b/c
────────────────────────────────────────────────────────────────
rick@dell:~/a/b/c$ cp /etc/default/grub .
────────────────────────────────────────────────────────────────
rick@dell:~/a/b/c$ cp /etc/default/grub ..
────────────────────────────────────────────────────────────────
rick@dell:~/a/b/c$ cp /etc/default/grub ../c2
────────────────────────────────────────────────────────────────
rick@dell:~/a/b/c$ cd ../../
────────────────────────────────────────────────────────────────
rick@dell:~/a$ tree
.
└── b
    ├── c
    │   └── grub
    ├── c2
    │   └── grub
    └── grub

3 directories, 3 files
```

We created 4 directories on one line by using `&&` to join multiple lines together. Then changed to the directory `a/b/c`, which is the current directory for the following copy commands:

 - In the first copy command (`cp`) we set the target / destination to our
   current directory (**c**) with `.`.
 - In the second copy command we set the directory to the parent
   directory (**b**) with `..`.
 - In the third copy command we set the directory to the sibling
   directory (**c2**) with `../c2`

Next we changed directory to our grand-parent directory (**a**) using `cd ../../`.

Finally we use `tree` to show all the directories and files under directory **a**.
