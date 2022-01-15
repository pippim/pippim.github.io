---
layout:       post
title:        >
    Why my Ubuntu 16.04 can't connect to wired when I change kernel to 4.2
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/917429
type:         Answer
tags:         networking kernel ethernet
created_date: 2017-05-21 14:37:37
edit_date:    2017-05-22 15:14:28
votes:        "2 "
favorites:    
views:        "1,339 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-05-21-Why-my-Ubuntu-16.04-can^t-connect-to-wired-when-I-change-kernel-to-4.2.md
toc:          false
navigation:   false
clipboard:    false
---

Kernel version 4.2 is EOL (End Of Life). This means hardware patches and bug fixes will not be applied to it. If you really need an older kernel hopefully 4.1 which is LTS (Long Term Support) will work for you.

As per [The Linux Kernel Archives][1] these are the LTS kernel versions:

 - 4.9 maintained by Greg Kroah-Hartman, EOL: Jan, 2019
 - 4.4 maintained by Greg Kroah-Hartman, EOL: Feb, 2018
 - 4.1 maintained by Sasha Levin, EOL: Sep, 2017
 - 3.16 maintained by Ben Hutchings, EOL: Apr, 2020
 - 3.10 maintained by Willy Tarreau, EOL: Oct, 2017
 - 3.4 maintained by Li Zefan, EOL: Apr, 2017
 - 3.2 maintained by Ben Hutchings, EOL: May, 2018

If you try version 4.1 and it doesn't work for your project, or for the Intel Ethernet chip then the next step would be to get the working Intel driver and force it to load in the kernel.

Please keep us posted on your progress via Question update or commenting below this answer.

*Welcome to Ask Ubuntu*


----------

**Update:** May 22, 2017.

OP fount LTS Kernel 4.1.xx with update drivers will not work for current platform. OP has opted to get Ethernet support by compiling new driver. The specific Ethernet card gained support in driver version 21.0 as shown by this screen:

[![Intel Ethernet 21.0.png][2]][2]

The latest driver has been downloaded (version 22.3 dated Apr 27 2017) and now the following compile errors are encountered:

``` 
root@horatio2-OptiPlex-7050:/home/horatio2/e1000e-3.3.5.3/s‌​rc# make install 
Makefile:67: *** Kernel header files not in any of the expected locations.
Makefile:68: *** Install the appropriate kernel development package, e.g. 
Makefile:69: *** kernel-devel, for building kernel modules and try again. Stop.'

```

These errors are likely because only `linux-image` was installed and not `linux-headers`. Exact kernel version number is required from `uname -a` output to install appropriate header version.


  [1]: https://www.kernel.org/category/releases.html
  [2]: https://i.stack.imgur.com/OeEh2.png
