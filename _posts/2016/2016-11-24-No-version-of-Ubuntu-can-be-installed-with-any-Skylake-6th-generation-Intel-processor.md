---
layout:       post
title:        >
    No version of Ubuntu can be installed with any Skylake 6th generation Intel processor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/852910
type:         Answer
tags:         drivers system-installation kernel intel-graphics grub
created_date: !!str "2016-11-24 00:37:49"
edit_date:    !!str "2017-04-13 12:23:56"
votes:        !!str "2"
favorites:    
views:        !!str "36,924"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

## New kernel version 4.8.10 (November 23, 2016)

Steps everyone can take are to ensure Intel microcode is up to date. See the answer here: ([Ubuntu 16.04 Skylake overheating][1])

Instead of kernel `4.2`, `4.3` or `4.4.2` in the other answers here you should upgrade to kernel `4.8.10` which has good reviews / improvments:

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810_4.8.10-040810.201611210531_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-image-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
sudo dpkg -i *.deb
sudo reboot

```

After installing the new kernel you can try to roll out grub command line changes for `nomodeset`, `i915.preliminary_hw_support=1`, etc. you fudged to make earlier kernels and drivers work.

Please note kernel version 4.9 LTS will be out soon. We all hope Intel fixes the pstate / cstate / thermald issues plaguing many of us in the LTS kernel release.


  [1]: https://askubuntu.com/questions/830404/ubuntu-16-04-skylake-overheating
