---
layout:       post
title:        >
    Transparent background in a Tkinter window
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67994877
type:         Answer
tags:         python tkinter transparency
created_date: 2021-06-16 00:19:03
edit_date:    2021-06-16 00:36:02
votes:        "3 "
favorites:    
views:        "115,691 "
accepted:     
uploaded:     2023-09-11 23:17:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-06-16-Transparent-background-in-a-Tkinter-window.md
toc:          false
navigation:   false
clipboard:    false
---

## The Linux Way - Install `pqiv`

The "Linux Way" seems to be installing another package:

``` bash
$ sudo apt install pqiv

Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  pqiv
0 upgraded, 1 newly installed, 0 to remove and 11 not upgraded.
Need to get 34.6 kB of archives.
After this operation, 136 kB of additional disk space will be used.
Get:1 http://ca.archive.ubuntu.com/ubuntu xenial/universe amd64 pqiv amd64 2.2-1 [34.6 kB]
Fetched 34.6 kB in 0s (96.0 kB/s)
Selecting previously unselected package pqiv.
(Reading database ... 442035 files and directories currently installed.)
Preparing to unpack .../archives/pqiv_2.2-1_amd64.deb ...
Unpacking pqiv (2.2-1) ...
Processing triggers for man-db (2.7.5-1) ...
Processing triggers for mime-support (3.59ubuntu1) ...
Setting up pqiv (2.2-1) ...
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

  [1]: https://i.stack.imgur.com/jJ3oC.gif
