---
layout:       post
title:        >
    Why don't Intel microcode updates work on my system?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017078
type:         Answer
tags:         microcode
created_date: 2018-03-18 18:13:39
edit_date:    2018-03-18 19:07:35
votes:        "2 "
favorites:    
views:        "10,147 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-18-Why-don_t-Intel-microcode-updates-work-on-my-system_.md
toc:          false
navigation:   false
clipboard:    false
---

# Bug in Meltdown/Spectre Intel Microcode

There was a [bug in early 2018 Intel Microcode update][1] to address Meltdown/Spectre security holes. As such the microcode had to be rolled back to a previous version.

Here is the microcode I'm using (having opted out of all updates starting January 2018):

``` 
$ apt list --installed | grep intel-microcode

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

intel-microcode/now 3.20170707.1~ubuntu16.04.0 amd64 [installed,upgradable to: 3.20180108.0+really20170707ubuntu16.04.1]
```

When you install Intel Microcode Update you will get this version or something similar:

``` 
intel-microcode/3.20180108.0+really20170707ubuntu16.04.1
```

# Ubuntu 16.04 LTS Menu

I'm not sure about Lubuntu menu structure but for regular Ubuntu this is how you access the Intel Microcode Update controls:

[![Additional Drivers.png][2]][2]

The bottom option controls Intel Microcode Updates.

# Install Intel Microcode from CLI

To skip the GUI menus altogether you can install from command line:

``` 
sudo apt update
sudo apt install intel-microcode
```

# `dmesg` now shows correct output

After following the installation steps `dmesg` returns the desired output (unlike in your question where it shows nothing):

``` 
$ dmesg | grep -i microcode
[    1.166542] microcode: sig=0x506e3, pf=0x20, revision=0xba
[    1.166993] microcode: Microcode Update Driver: v2.2.
[16082.584598] microcode: microcode updated early to revision 0xba, date = 2017-04-09
```

  [1]: https://askubuntu.com/a/1000454/307523
  [2]: https://i.stack.imgur.com/1QcZZ.png
