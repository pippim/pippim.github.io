---
layout:       post
title:        >
    Recursively list files with file names, folder names and permission
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/594918
type:         Answer
tags:         files permissions find ls
created_date: 2020-06-24 23:48:36
edit_date:    
votes:        "0 "
favorites:    
views:        "25,202 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-24-Recursively-list-files-with-file-names_-folder-names-and-permission.md
toc:          false
navigation:   false
clipboard:    false
---

The `stat` command executed by the `find` command will give you permissions and a whole lot more:



``` bash
$ find . -exec stat {} +

  File: '.'
  Size: 4096      	Blocks: 8          IO Block: 4096   directory
Device: 10306h/66310d	Inode: 1326677     Links: 3
Access: (0775/drwxrwxr-x)  Uid: ( 1000/    rick)   Gid: ( 1000/    rick)
Access: 2020-06-24 17:00:52.131209006 -0600
Modify: 2020-06-13 09:21:40.489850096 -0600
Change: 2020-06-13 09:21:40.489850096 -0600
 Birth: -

  File: './.eyesome-sunset'
  Size: 8         	Blocks: 8          IO Block: 4096   regular file
Device: 10306h/66310d	Inode: 1323438     Links: 1
Access: (0666/-rw-rw-rw-)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2020-06-23 04:32:44.808321580 -0600
Modify: 2020-06-02 16:37:33.282346160 -0600
Change: 2020-06-02 16:37:33.282346160 -0600
 Birth: -
```
