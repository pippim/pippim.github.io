---
layout:       post
title:        >
    How does the new "Bash on Windows 10" really work?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1003732
type:         Answer
tags:         windows-subsystem-for-linux
created_date: 2018-02-07 01:49:21
edit_date:    2018-02-07 02:22:34
votes:        "3 "
favorites:    
views:        "10,537 "
accepted:     
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-07-How-does-the-new-_Bash-on-Windows-10_-really-work_.md
toc:          false
navigation:   false
clipboard:    false
---

The bash portions work very well in WSL. 

The kernel portions aren't there. For example there is no `/sys/class/backlight/intel_backlight/brightness` you can access to set screen brightness. There are Powershell commands you can easily call to do that if you don't mind COBOL style very long field names. MS Powershell can be called directly from within bash. So you can say powerful Windows features are now built into bash. By the same token MS Powershell can call bash I believe. So if true Powershell gets access to functions like `grep`, `awk`, `head`, `tail`, etc.

The GUI for Ubuntu Desktop (`gedit`, `nautilus`, etc.) only works after installing `VcXsrv` or something similar.

Sharing files between Linux and Windows WSL is complicated to setup. When when moving files between the shared WSL+Linux NTFS folder I have had some file permission "weirdness" either due to my ignorance or software deficiencies.

Speed is a lot slower in WSL than it is in Ubuntu. You can actually see the screen paint character by character when you run `cal` or `toilet`: [What are the differences between Windows Bash and Cygwin?]({% post_url /2017/2017-09-05-What-are-the-differences-between-Windows-Bash-and-Cygwin_ %})

I think WSL is a good product and I enjoy tinkering with it when dual-booting into Windows-World. It'll never become a great product because of MS lack of funding and they really don't want to have a great Linux Free-Ware Distro anyway. If you had enough RAM you would probably be happier with a VM. With only 8 GB myself and RAM prices rising until mid-2019 or so, I'll happily stick with WSL and forgo the 32 GB RAM upgrade for now.

I've visited a few MS forums and I must say Rich Turner and his WSL team members are some of the nicest professionals I've seen.
