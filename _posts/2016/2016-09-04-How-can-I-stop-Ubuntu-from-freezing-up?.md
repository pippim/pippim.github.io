---
layout:       post
title:        >
    How can I stop Ubuntu from freezing up?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/820657
type:         Answer
tags:         16.04 package-management updates
created_date: 2016-09-04 00:44:38
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "703 "
accepted:     Accepted
uploaded:     2022-01-09 10:02:40
toc:          false
navigation:   false
clipboard:    false
---

# How to Install Kernel 4.8.4


----------


**NOTE:** As of December 25, 2016 the most recent Ubuntu 16.04 kernel 4.4.0-53 performs extremely well and better than 4.8.4 in most circumstances. Furthermore mainline kernel 4.9.0 is now out with ehanced support for AMDGPU and Intel Skylake amongst other issues. That said 4.4.0-53 on my 3rd Generation Intel CPU performs just as well.


----------


As of October 24, 2016, Kernel 4.8.4 is the latest stable Kernel. It's not officially supported by Ubuntu but if your hardware requires the latest kernel to operate properly you have little choice but to install it.

Go to the Ubuntu Mainline Kernel page: [Ubuntu Kernel Mainline][1].

Scroll down near the bottom and click on `4.8.4`.

Notice the files under AMD64 and how those files names and the main web link is used to build the following commands (which you need type or copy and paste into your terminal):

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-headers-4.8.4-040804_4.8.4-040804.201610220733_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-headers-4.8.4-040804-generic_4.8.4-040804.201610220733_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-image-4.8.4-040804-generic_4.8.4-040804.201610220733_amd64.deb
sudo dpkg -i *.deb
sudo reboot

```

Using the Website address and adding in the file name, you complete the entire `wget` command. Study this technique so you can repeat it with any kernel version. We want `amd64` for 64-bit versions of Ubuntu running on Intel and AMD chips. We want `generic` which is the mainstream version of the kernel. `low-latency` on the other hand is difficult to setup and maintain but necessary for those in the sound recording industry and similar industries.


  [1]: http://kernel.ubuntu.com/~kernel-ppa/mainline/
