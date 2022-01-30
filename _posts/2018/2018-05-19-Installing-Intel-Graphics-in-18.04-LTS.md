---
layout:       post
title:        >
    Installing Intel Graphics in 18.04 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037926
type:         Answer
tags:         intel-graphics 18.04
created_date: 2018-05-19 01:05:31
edit_date:    2018-07-22 14:50:53
votes:        "3 "
favorites:    
views:        "47,776 "
accepted:     
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-19-Installing-Intel-Graphics-in-18.04-LTS.md
toc:          false
navigation:   false
clipboard:    false
---

## Switching between nVidia and Intel GPU

To activate your Intel iGPU use:

``` 
sudo prime-select intel
reboot
```

To turn your nVidia GPU back use:

``` 
sudo prime-select nvidia
reboot
```

If you forget which one is running use:

``` 
prime-select query
```


## Skylake (i7-6700) and newer processors

The Intel iGPU driver is already built into the Linux kernel. Normally you don't have to do anything special unless you have extremely new hardware, or very old hardware. There are configuration files you may have to setup for issues such as screen tearing. If you have a Skylake or newer processor you will get warning(s) that there are additional drivers you can install: [Updated kernel to 4.8 now missing firmware warnings](Updated kernel to 4.8 now missing firmware warnings)8 :

![download screen][1]


  [1]: https://i.stack.imgur.com/PzEm6.png
