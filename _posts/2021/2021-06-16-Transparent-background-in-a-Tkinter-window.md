---
layout:       post
title:        >
    Transparent background in a Tkinter window
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67994877
type:         Answer
tags:         python tkinter transparency
created_date: 2021-06-16 00:19:03
edit_date:    2024-11-02 14:45:35
votes:        "5 "
favorites:    
views:        "137,212 "
accepted:     
uploaded:     2025-02-10 14:32:12
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-06-16-Transparent-background-in-a-Tkinter-window.md
toc:          false
navigation:   false
clipboard:    false
---

## The Linux Way - Install `pqiv`

The "Linux Way" seems to be installing another package:

``` bash
$ sudo apt install pqiv
```

But as I've had to install `xdotool` and other packages for my application what's another one right? Plus it will make the docker folks happy :)

The good news is it is only 136KB and automatically places the splash screen in the center of the active monitor instead of the center of the primary monitor or the center of the X11 screen (which can look funny on three monitor systems of different resolutions).


----------

## Calling `pqiv`

From the command line (which you can easily duplicate inside Python with `os.popen()` or `subprocess.Popen()`) you simply type:

``` 
pqiv -c -c -i m.png
```

Here's what it looks like with my `png` image:

[![mserve transparent splash screen.gif][1]][1]


----------


## Closing `pqiv`
In the terminal I have to send <kbd>Control</kbd> + <kbd>C</kbd> when loading is finished. In Python you would have to `grep` the output from `ps` and `kill` the job. Pretty straight forward in Linux I guess but probably foreign to our Windows friends.

Credit to Super User [answer](https://superuser.com/a/338369/662962).

  [1]: https://pippim.github.io/assets/img/posts/2021/jJ3oC.gif
