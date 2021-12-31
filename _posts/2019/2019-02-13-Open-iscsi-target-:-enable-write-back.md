---
layout:       post
title:        >
    Open-iscsi target : enable write-back
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1117807
type:         Answer
tags:         iscsi
created_date: !!str "2019-02-13 01:19:13"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "1,366"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
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

