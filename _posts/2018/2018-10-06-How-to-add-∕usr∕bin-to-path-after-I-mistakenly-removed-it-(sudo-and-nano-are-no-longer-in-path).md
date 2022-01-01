---
layout:       post
title:        >
    How to add ∕usr∕bin to path after I mistakenly removed it (sudo and nano are no longer in path)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1081545
type:         Answer
tags:         permissions sudo environment-variables bashrc
created_date: !!str "2018-10-06 20:52:42"
edit_date:    !!str ""
votes:        !!str "5"
favorites:    
views:        !!str "1,808"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

You can prefix the commands with the path:

``` 
/usr/bin/sudo /bin/nano ~/.bashrc

```
