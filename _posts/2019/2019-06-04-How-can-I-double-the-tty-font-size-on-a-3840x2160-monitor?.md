---
layout:       post
title:        >
    How can I double the tty font size on a 3840x2160 monitor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1148410
type:         Answer
tags:         fonts tty
created_date: 2019-06-04 02:20:04
edit_date:    
votes:        "4 "
favorites:    
views:        "2,303 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

My eyes almost literally got sick and tired of the tiny fonts on Full HD and now 4K screens when I had to log onto the console periodically.

I put the following into my `~/.bashrc` and my problems went away:

``` 
# Set font when running in console
if [ $TERM == linux ]; then
    /bin/setfont /usr/share/consolefonts/Lat2-Terminus32x16.psf.gz
fi

```

