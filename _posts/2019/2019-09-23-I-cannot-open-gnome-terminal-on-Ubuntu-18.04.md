---
layout:       post
title:        >
    I cannot open gnome-terminal on Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1176174
type:         Answer
tags:         command-line 18.04
created_date: 2019-09-23 23:45:11
edit_date:    2019-09-24 00:57:03
votes:        "2 "
favorites:    
views:        "2,601 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-23-I-cannot-open-gnome-terminal-on-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

Part of the problem might be because you are using a "new lab computer" and who knows what they've cooked up in the lab?

Try this for starters:

``` 
$ apt list | grep gnome-terminal

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

gnome-terminal/xenial,now 3.18.3-1ubuntu1 amd64 [installed]
gnome-terminal-data/xenial,xenial,now 3.18.3-1ubuntu1 all [installed]
```

If it doesn't say "`[installed]`" at the end of the last two lines then let's install it with:

``` 
sudo apt install gnome-terminal
```

Hopefully the problem is as simple to fix as that...

Reply to comment:

Sounds like you need to use:

``` 
sudo rm /usr/bin/python3
sudo ln -s python3.5 /usr/bin/python3
```

Source: [Gnome terminal will not start](Gnome terminal will not start)
