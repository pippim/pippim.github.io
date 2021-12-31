---
layout:       post
title:        >
    how to make conky true transparent?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014200
type:         Answer
tags:         17.10 conky
created_date: !!str "2018-03-12 15:17:34"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "5,721"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

Find this section:

``` 
## no compositor
own_window_type conky
own_window_argb_visual yes

## xcompmgr
#own_window_type conky
#own_window_argb_visual yes

## cairo-compmgr
own_window_type conky
own_window_argb_visual no

```

Copy this code over top of the section:

``` 
## no compositor
#own_window_type conky
#own_window_argb_visual yes

## xcompmgr
own_window_type conky
own_window_argb_visual yes

## cairo-compmgr
#own_window_type conky
#own_window_argb_visual no

```
