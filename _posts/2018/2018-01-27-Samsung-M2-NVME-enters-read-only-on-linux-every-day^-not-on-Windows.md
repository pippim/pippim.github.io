---
layout:       post
title:        >
    Samsung M2 NVME enters read only on linux every day, not on Windows
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000454
type:         Answer
tags:         partitioning upgrade ssd disk fsck
created_date: 2018-01-27 16:50:22
edit_date:    2018-01-29 04:09:11
votes:        "2 "
favorites:    
views:        "1,520 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-27-Samsung-M2-NVME-enters-read-only-on-linux-every-day^-not-on-Windows.md
toc:          false
navigation:   false
clipboard:    false
---

# Intel Microcode 2018-01-08 breaks some systems

When the world famous Meltdown and Spectre security holes were announced in the beginning of 2018 vendors rushed in with fixes. According to Ubuntu Intel asked them to downgrade to older microcode when then the [January 8, 2018 Microcode Update][1] broke some systems.

----------

# List your current Microcode version

To find your current Microcode version use:

``` 
$ apt list --installed | grep intel-microcode

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

intel-microcode/now 3.20170707.1~ubuntu16.04.0 amd64 [installed,upgradable to: 3.20180108.0+really20170707ubuntu16.04.1]

```

In my case the Intel Microcode update for `2018-01-08` is **not** being used and the original version from `2017-07-07` is being used. When patches for Meltdown were announced bugs started appearing on regular updates on 2018-01-04. Since then I declined all automatic updates in favour of manually installing new mainline kernels instead. That is why I have the older original microcode.


----------


# Downgrade Microcode for Ubuntu 14.04, 16.04 and 17.10

If you are running `2018-01-08` Intel Microcode you *MUST* upgrade it to the version released on 2018-01-22.

> The problem can be corrected by updating your system to the following  
> package version:  

## Ubuntu 17.10:
  -  ###[intel-microcode][2] [3.20180108.0+really20170707ubuntu17.10.1][3]

## Ubuntu 16.04 LTS:
  -  ###[intel-microcode][2] [3.20180108.0+really20170707ubuntu16.04.1][4]

## Ubuntu 14.04 LTS:
  -  ###[intel-microcode][2] [3.20180108.0+really20170707ubuntu14.04.1][5] 

To update your system, please follow these instructions: [https://wiki.ubuntu.com/Security/Upgrades][6].

After a standard system update you need to reboot your computer to make
all the necessary changes.

***Repeat the steps in previous section to check your Intel Microcode version***

# Install Microcode from Terminal

To install Microcode from Terminal without going through Ubuntu GUI Settings panels use:

``` 
sudo apt update
sudo apt install intel-microcode

```

  [1]: https://usn.ubuntu.com/usn/usn-3531-2/
  [2]: https://launchpad.net/ubuntu/+source/intel-microcode
  [3]: https://launchpad.net/ubuntu/+source/intel-microcode/3.20180108.0+really20170707ubuntu17.10.1
  [4]: https://launchpad.net/ubuntu/+source/intel-microcode/3.20180108.0+really20170707ubuntu16.04.1
  [5]: https://launchpad.net/ubuntu/+source/intel-microcode/3.20180108.0+really20170707ubuntu14.04.1
  [6]: https://wiki.ubuntu.com/Security/Upgrades
