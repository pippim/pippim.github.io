---
layout:       post
title:        >
    Avoid updating kernel as I need a specific kernel for my processor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885213
type:         Answer
tags:         12.04 kernel updates xubuntu
created_date: 2017-02-20 03:21:21
edit_date:    2017-04-13 12:37:16
votes:        "0 "
favorites:    
views:        "227 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-20-Avoid-updating-kernel-as-I-need-a-specific-kernel-for-my-processor_.md
toc:          false
navigation:   false
clipboard:    false
---

In this Q&A ([Blocking kernel updates with dpkg][1]) the OP was also on Ubuntu 12.04 and had to hold the kernel at a specific version because things break when upgrading.

A short summary of the link:

First check your kernel image name

``` 
dpkg -l | grep linux-image
```

output for the poster:

``` 
ii  linux-image-3.2.0-4-amd64              3.2.35-2                           amd64        Linux 3.2 for 64-bit PCs
ii  linux-image-amd64                      3.2+46                             amd64        Linux for 64-bit PCs (meta-package)
```

then tell dpkg to hold the metapackage (the generic version without any version numbers)

``` 
echo linux-image-amd64 hold | sudo dpkg --set-selections
```

You can then check this worked `via dpkg -l linux-image-amd64`

Please read the entire question and answer before proceeding.



  [1]: https://unix.stackexchange.com/questions/63293/blocking-kernel-updates-with-dpkg


