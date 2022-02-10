---
layout:       post
title:        >
    New installation of Windows 10 and Ubuntu from Windows Store error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/966214
type:         Answer
tags:         windows-subsystem-for-linux
created_date: 2017-10-19 03:15:06
edit_date:    2019-10-02 17:55:43
votes:        "6 "
favorites:    
views:        "97,631 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-10-19-New-installation-of-Windows-10-and-Ubuntu-from-Windows-Store-error.md
toc:          false
navigation:   false
clipboard:    false
---

I guess we are spoiled in the Linux world with `sudo apt install` that goes out to find dependencies and install them for us. As it turns out Ubuntu for Windows requires you to go into "Windows Features" and turn on "Windows Subsystem for Linux" as detailed in this [bug report](https://github.com/Microsoft/BashOnWindows/issues/2316).

After *rebooting* and launching Ubuntu again; I got the following messages:

``` 
"Installing, this may take a few minutes..." [healthy coffee break; YMMV]
Installation successful!
Please create a default UNIX user...
and completed the *second phase* to install/initialize Ubuntu in WSL (Windows Subsystem for Linux).```

