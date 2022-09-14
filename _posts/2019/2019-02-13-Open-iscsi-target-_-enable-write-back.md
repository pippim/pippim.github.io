---
layout:       post
title:        >
    Open-iscsi target : enable write-back
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1117807
type:         Answer
tags:         iscsi
created_date: 2019-02-13 01:19:13
edit_date:    
votes:        "2 "
favorites:    
views:        "1,610 "
accepted:     
uploaded:     2022-09-14 04:51:06
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-02-13-Open-iscsi-target-_-enable-write-back.md
toc:          false
navigation:   false
clipboard:    false
---

I can't test on my laptop but,

> **NOTE:** IOMode "wb" is ignored when employing blockio as it performs no caching.  
>   
> **WARNING: IOMode=wb could lead to  serious  data  loss  from  an  unexpected  system failure (power loss, system crash). Use at your own  
> risk!**  

If you are using `blockio` switch to `fileio` as this link documents:

- http://manpages.ubuntu.com/manpages/trusty/man5/ietd.conf.5.html

