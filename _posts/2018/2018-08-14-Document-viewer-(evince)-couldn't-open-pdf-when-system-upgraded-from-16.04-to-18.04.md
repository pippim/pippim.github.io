---
layout:       post
title:        >
    Document viewer (evince) couldn't open pdf when system upgraded from 16.04 to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1065428
type:         Answer
tags:         upgrade 18.04 pdf evince
created_date: 2018-08-14 22:34:40
edit_date:    
votes:        "5 "
favorites:    
views:        "4,655 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

## Library path incorrect

Nine years ago on this [bug report][1] it was discovered:

> installed a version without using the packaging system and it's taking  
> over the ubuntu build and breaking your installation  
>   
> " libpoppler-glib.so.4 => /usr/local/lib/libpoppler-glib.so.4  
> (0xb78b0000)"  
>   
> clean that and it should be working correctly  

The solution was to remove:

``` 
sudo rm -f /usr/local/lib/libpoppler-glib.so.4

```


----------

Nine years later and you have a similar problem.  Checking `LD_LIBRARY_PATH` is pointing to a single dir rather than the full path list. There is an incorrect version of `libpoppler-cpp.so` and `libpoppler-glib.so.8` there.

Moving `libpopper*` to another directory allowed `evince` to work with the proper dynamic linker searches in `/lib` and `/usr/lib`.

  [1]: https://bugs.launchpad.net/ubuntu/+source/evince/+bug/363355
