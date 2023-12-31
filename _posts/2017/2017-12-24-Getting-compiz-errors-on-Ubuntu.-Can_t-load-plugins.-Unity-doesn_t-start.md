---
layout:       post
title:        >
    Getting compiz errors on Ubuntu. Can't load plugins. Unity doesn't start
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/989257
type:         Answer
tags:         unity compiz plugins opengl windows-subsystem-for-linux
created_date: 2017-12-24 21:40:53
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "6,903 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-24-Getting-compiz-errors-on-Ubuntu.-Can_t-load-plugins.-Unity-doesn_t-start.md
toc:          false
navigation:   false
clipboard:    false
---

# X-Server for Windows

You need to install an X-Server for Windows before running any graphical apps like `gedit` or `nautilus`. I have had good luck using `VcXsrv` but there are others you can try.

A very good tutorial for setting up Ubuntu Unity under Windows 10 WSL is in ZDNET:

- [​How to run the native Ubuntu desktop on Windows 10][1].

If you simply google `VcXsrv WSL` you will get many hits:

- [github QMonkey wsl-tutorial][2]
- [solarianprogrammer windows susbsystem for linux xfce-4][3]
- [reddit bashonubuntuonwindows how to run gnome terminal on wsl][4]

**Note:** I changed your tag `14.04` to `wsl` because this is about Windows Subsystem for Linux which defaults to using 16.04 from the Windows Store. You can probably install any supported Ubuntu-desktop version though, even Xubuntu-desktop 16.04 as I did.

# Running `compiz` within WSL
 
On my setup after setting up Unity in WSL (Windows Subsystem for Linux) I can test it with:

``` 
$ compiz
compiz (core) - Info: Loading plugin: core
compiz (core) - Info: Starting plugin: core
compiz (core) - Info: Loading plugin: ccp
compiz (core) - Info: Starting plugin: ccp
compizconfig - Info: Backend     : ini
compizconfig - Info: Integration : true
compizconfig - Info: Profile     : default
```


  [1]: https://www.zdnet.com/article/how-to-run-run-the-native-ubuntu-desktop-on-windows-10/
  [2]: https://github.com/QMonkey/wsl-tutorial
  [3]: https://solarianprogrammer.com/2017/04/16/windows-susbsystem-for-linux-xfce-4/
  [4]: https://www.reddit.com/r/bashonubuntuonwindows/comments/51f7ni/how_to_run_gnome_terminal_on_wsl/
