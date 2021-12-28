---
layout:       post
title:        Can't delete empty directories with strange names
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/949468
type:         Answer
tags:         delete bleachbit
created_date: 2017-08-24 14:56:49
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        4,273
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

# Graphical method

I would use `nautilus` the file manager built into Ubuntu. Simply highlight the directories, right-click and select "send to trash". If directories have large files you might want to empty trash right away.

If the directories are owned by root Nautilus won't let you delete them. In this case open a terminal and use:

``` 
gksu nautilus

```

## Can't move to trash but can delete directly

According to this [Linux Mint question][1] some Windows files can't be moved to trash but can be deleted directly.

Another answer in this thread points out how to find out the file system type using:

``` 
df -T /media/<path_to_project_folder>

```

Then changing the `/etc/fstab` entry worked for mounting using different parameters and successfully deleting the files.

----------

# Terminal Method

As per this [Super User Q&A][2] you can delete files with special characters (weird names) by changing to the directory containing them and using:

``` 
rm -i -- *

```

This will prompt you to delete each file. You can and should change '*' to a narrower match if there are a lot of files. The `--` stops processing options, so a file named `-d` will be removed by rm successfully.

Another answer in the same thread proposes deleting by inode number using. It says you can use `ls -li` to show all files by their inode. Then run this command to remove the file:

``` 
find . -inum ${INODE_NUM} -delete

```

You can add `-maxdepth 1` to my find just to be safe:

``` 
find . -maxdepth 1 -inum ${INODE_NUM} -delete

```


  [1]: https://github.com/adobe/brackets/issues/10581
  [2]: https://superuser.com/questions/451979/how-to-delete-a-file-with-a-weird-name
