---
layout:       post
title:        >
    What is the difference between graphics drivers in the kernel, and graphics drivers for Xorg?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1009652
type:         Answer
tags:         drivers nvidia kernel xorg nouveau
created_date: 2018-02-25 15:49:05
edit_date:    2018-02-25 17:28:45
votes:        "4 "
favorites:    
views:        "1,945 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-25-What-is-the-difference-between-graphics-drivers-in-the-kernel_-and-graphics-drivers-for-Xorg_.md
toc:          false
navigation:   false
clipboard:    false
---

# Difference between two files

Differences can be found on many levels. For this limited answer the size differences and application differences are described.

## Size differences

``` 
$ ll /usr/lib/xorg/modules/drivers/nouveau_drv.so
-rw-r--r-- 1 root root 221200 Jul  6  2017 /usr/lib/xorg/modules/drivers/nouveau_drv.so
$ ll /lib/modules/4.14.20-041420-generic/kernel/drivers/gpu/drm/nouveau/nouveau.ko
-rw-r--r-- 1 root root 3646510 Feb 16 15:53 /lib/modules/4.14.20-041420-generic/kernel/drivers/gpu/drm/nouveau/nouveau.ko
```

The kernel Nouveau module is 16 times larger than the Xorg driver. This implies the kernel module does a lot more.

There are [additional Xorg drivers][1] some systems (especially laptops) will have:

> In Debian the 2D graphics drivers for the X.Org Server are packaged  
> individually and called xserver-xorg-video-*.[7] After installation  
> the 2D graphics driver-file is found under  
> /usr/lib/xorg/modules/drivers/. The package xserver-xorg-video-nouveau  
> installs nouveau_drv.so with a size of 215 KiB, the proprietary Nvidia  
> GeForce driver installs a 8 MiB-sized file called nvidia_drv.so ...  

The `nvidia_drv.so` is 37 times larger than `nouveau_drv.so`.

## Application differences

The kernel Nouveau module is a `.ko` file and the Xorg driver is a `.drv.so` file type. [This question][2] asks what the difference is between the two file types. The best answer (IMO) states:

> In laymen terms:  
>   
> Kernel modules (ko) run in kernel space, user modules (so) run in user  
> space.  
>   
> Kernel spaces facilitate (or not) access to a variety of functions  
> that user space does not.  
>   
> Kernel modules are always executed in kernel space and if buggy or  
> erroneous, can freeze the system.  
>   
> User space is "protected" and a buggy module or app is less likely to  
> crash the system.  


  [1]: https://en.wikipedia.org/wiki/X.Org_Server
  [2]: https://www.linuxquestions.org/questions/linux-newbie-8/difference-between-%2A-ko-and-%2A-so-597607/
