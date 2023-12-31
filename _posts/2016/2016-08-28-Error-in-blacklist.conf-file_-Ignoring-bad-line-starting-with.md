---
layout:       post
title:        >
    Error in blacklist.conf file: Ignoring bad line starting with
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/817695
type:         Answer
tags:         kernel blacklist
created_date: 2016-08-28 07:16:06
edit_date:    2016-08-28 16:53:07
votes:        "0 "
favorites:    
views:        "21,662 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-28-Error-in-blacklist.conf-file_-Ignoring-bad-line-starting-with.md
toc:          false
navigation:   false
clipboard:    false
---

Your four error messages add up to:

``` 
sudo modprobe /etc/rc.local exit
```

**sudo** is a command giving you root powers to run powerful commands.

**modprobe** is a tool that controls modules loading, unloading and kernel compatability.

**/etc/rc.local** is a file where you can put startup commands when you boot your system.

**exit** is used to end a group of commands which could be found in a file like rc.local and many other files.

Your blacklist errors don't pertain to any kernel loadable module at all. 

After removing blacklist command errors you need to type in the terminal:

``` 
sudo update-initramfs -u
```

This will generate a new initramfs with an updated blacklist for your next boot.
