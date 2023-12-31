---
layout:       post
title:        >
    Redirect output of systemd service to Ubuntu Boot Screen (20.04)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1250621
type:         Answer
tags:         boot gnome shutdown desktop-environments
created_date: 2020-06-15 17:25:01
edit_date:    
votes:        "0 "
favorites:    
views:        "545 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-15-Redirect-output-of-systemd-service-to-Ubuntu-Boot-Screen-_20.04_.md
toc:          false
navigation:   false
clipboard:    false
---

This is discussed at length in [Unix & Linux](https://unix.stackexchange.com/questions/560167/how-can-i-write-to-console-during-shutdown) site:

> For a systemd service you need a `TTYPath=/dev/console` and a  
> `StandardOutput=tty` in the .INI file to change this,  
> `StandardInput=tty` if you want to read (but you do not) as well as  
> write. Witness systemd's pre-supplied `debug-shell.service`.  

There is a lot more in the link as well as additional sources linked in.
