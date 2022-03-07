---
layout:       post
title:        >
    What's the easiest way to run GUI apps on Windows Subsystem for Linux?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993331
type:         Answer
tags:         gui windows-subsystem-for-linux yad
created_date: 2018-01-07 19:59:43
edit_date:    2019-06-07 02:14:40
votes:        "101 "
favorites:    
views:        "289,639 "
accepted:     
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-07-What_s-the-easiest-way-to-run-GUI-apps-on-Windows-Subsystem-for-Linux_.md
toc:          false
navigation:   false
clipboard:    false
---

# VcXsrv

I chose to use `VcXsrv` in WSL (Windows 10 Subsystem for Linux). I recommend everyone do their research between `xming` (the accepted answer) and [VcXsrv][1] before selecting one or the other for Graphical User Interface (GUI) support in Windows 10 Ubuntu 16.04.

# Installation

Installation is straight forward. As of March 17, 2019 you can simply accept the defaults. If you want to call `gedit` from within your Bash Shell / Terminal you need to edit `~/.bashrc` and insert this line:

``` 
export DISPLAY=localhost:0.0
```

# What can you do after VcXsrv is installed?

I was able to run:

``` 
sudo apt install ubuntu-desktop
sudo apt install yad
sudo apt install gedit
```

... to install GUI desktop software. This then allowed me to run `gedit` and `nautilus`. Also I was then able to install specific GUI applications through the CLI (Command Line Interface) using `apt` or `apt-get` commands.

When I want to try many of my Ubuntu bash scripts within WSL **VcXsrv** must be installed so `zenity` and `yad` x-windows dialog boxes are displayed for user input.

As others have noted GUI within WSL is not perfect and you can expect to spend time problem-solving some issues. Also some GUI software simply won't work in WSL.

## Setup notes

I modified `/etc/environment` to tweak GUI drop down menus:

``` 
PATH="/mnt/e/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
export LIBGL_ALWAYS_INDIRECT=Yes
export DISPLAY=localhost:0.0
```

- `/mnt/e/bin` is unusual path because it is where I store scripts used in both Windows 10 dual boot WSL and Ubuntu 16.04 dual boot. Most users would not include this on their machine.
  [1]: https://sourceforge.net/projects/vcxsrv/
