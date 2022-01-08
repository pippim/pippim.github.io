---
layout:       post
title:        >
    MainThread unfamiliar process suddenly showing up 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1265019
type:         Answer
tags:         process background-process
created_date: 2020-08-06 12:44:19
edit_date:    
votes:        "2 "
favorites:    
views:        "2,143 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

In addition to other answers there is a problem I encountered killing Firefox.

Previously I could use`sudo killall firefox`. Now that has no effect and `pgrep firefox` finds nothing.

For me to kill an unresponsive Firefox session I now need to use:

``` 
sudo killall /usr/lib/firefox/firefox

```

Note above problem isn't limited to Ubuntu 18.04 as I'm using Ubuntu 16.04.6 LTS.
