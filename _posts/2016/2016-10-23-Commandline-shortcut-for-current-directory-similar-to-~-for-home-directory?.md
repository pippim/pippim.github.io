---
layout:       post
title:        >
    Commandline shortcut for current directory similar to ~ for home directory?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840899
type:         Answer
tags:         bash command-line shortcuts grub
created_date: 2016-10-23 16:47:53
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "70,254 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

To use the current directory as the destination directory use a single dot '**`.`**'

## Long Answer


Using your example you would type: `cp ~/anotherdir/dir2/file .`

To see the dot `.`, `..` and `../../` directory names in action, copy and paste the following commands into your Terminal:

``` 
mkdir a && mkdir a/b && mkdir a/b/c && mkdir a/b/c2
cd a/b/c
cp /etc/default/grub .
cp /etc/default/grub ..
cp /etc/default/grub ../c2
cd ../../
tree

```

The output from tree command appears like this:

``` 
.
└── b
    ├── c
    │   └── grub
    ├── c2
    │   └── grub
    └── grub

3 directories, 3 files

```

The `.` at the top of tree output represents the new current directory `a`  which is the grandparent of `a/b/c` which we navigated to using the `cd ../../` command. Underneath `a` we see the sub-directories `a/b`, `a/b/c` and `a/b/c2`

# Line by line analysis

First we created 4 directories on one line by using `&&` to join multiple lines together. 

Then we changed to the directory `a/b/c`, which is the current directory for the following copy commands:

 - In the first copy command (`cp`) we set the destination to our
   current directory (**c**) with `.`.
 - In the second copy command we set the destination to the parent
   directory (**b**) with `..`.
 - In the third copy command we set the destination to the sibling
   directory (**c2**) with `../c2`

Then, as stated earlier, we changed the current directory to `a` and ran the `tree` command to display all directories and files under `a`.

# Cleanup

After we are done, we remove the three directories and files with:

``` 
cd ~/
rm -r tree

```

