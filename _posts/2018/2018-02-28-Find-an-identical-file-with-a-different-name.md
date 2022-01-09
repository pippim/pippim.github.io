---
layout:       post
title:        >
    Find an identical file with a different name
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010619
type:         Answer
tags:         command-line files text-processing
created_date: 2018-02-28 11:18:09
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,937 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

# Grep can find it quickly

When used properly, the `grep` command can find the duplicate quickly. You must be careful not to search the whole file system or it will take **days** to complete. I recently documented this here: [`grep`ing all files for a string takes a long time][1]

For optimum speed use:

``` 
grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e 'String in file'

```

If your file might be on a Windows directory remove the `mnt` directory.

If you know the file is within the `/home` directory someplace you can shorten the command:

``` 
grep -rnw '/home' -e 'String in file'

```


  [1]: {% post_url /2018/2018-02-12-`grep`ing-all-files-for-a-string-takes-a-long-time %}
