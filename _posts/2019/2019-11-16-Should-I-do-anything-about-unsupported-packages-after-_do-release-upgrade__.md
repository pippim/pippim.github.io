---
layout:       post
title:        >
    Should I do anything about unsupported packages after `do-release-upgrade`?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189340
type:         Answer
tags:         windows-subsystem-for-linux do-release-upgrade
created_date: 2019-11-16 16:58:03
edit_date:    
votes:        "1 "
favorites:    
views:        "158 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-16-Should-I-do-anything-about-unsupported-packages-after-_do-release-upgrade__.md
toc:          false
navigation:   false
clipboard:    false
---

You probably have nothing to worry about but you can double check with command:

``` 
$ apt list | grep -E 'gcc-.?-base'

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

gcc-5-base/xenial-updates,xenial-security,now 5.4.0-6ubuntu1~16.04.12 amd64 [installed]
gcc-6-base/xenial,now 6.0.1-0ubuntu1 amd64 [installed]
```

In above case it's a Ubuntu 16.04 installation and it is showing what you have lost. When you run the command the results should show what you have gained (newer versions) with the code name `bionic` instead of `xenial`.

`gcc` is the compiler for Ubuntu and most other Linux distributions. It is needed when certain drivers and applications are released in source code rather than binary format. `gcc` compiles that source code (which humans can read) into binary format for the machine to run.
