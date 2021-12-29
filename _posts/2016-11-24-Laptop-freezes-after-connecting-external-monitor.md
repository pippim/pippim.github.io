---
layout:       post
title:        Laptop freezes after connecting external monitor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/852908
type:         Answer
tags:         14.04 drivers intel-graphics freeze external-monitor
created_date: 2016-11-24 00:29:27
edit_date:    2017-04-13 12:24:08
votes:        1
favorites:    
views:        769
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

You are on Linux Kernel `4.5.3` which is no longer supported: ([https://www.kernel.org/][1]). I would recommend you move up to `4.8.10`
which came out a few days ago and has been working well for me. Plus users of `Cherry Trail` on the infamous `Bay Trail` bug list said yesterday it is fixing problems for them: ([https://bugzilla.kernel.org/show_bug.cgi?id=109051][2]). You have an Intel `Skylake` which is also included in that bug report. I have an `Ivy Bridge` and also have side effects ever since my upgrade to kernel `4.4` used by **Ubuntu 16.04**

Other **Intel Skylake** posts that may interest you here in AskUbuntu are:

 - [Ubuntu 16.04 Skylake overheating][3]
 - [No version of Ubuntu can be installed with any Skylake 6th generation Intel processor][4]
 - [Intel Skylake Graphics fix crashes Nvidia card][5]
 - [Ubuntu 14.10 LTS with new skylake processors .][6]
 - [Ubuntu 16.04 Skylake 6th Generation Screen Flickering][7]
 - [Skylake integrated graphics on Ubuntu - Help!][8]

## Enough links already you're killing me!!!

Steps everyone can take are to ensure Intel microcode is up to date. See the answer in the first link at top of page.

Steps you can take is to upgrade kernel from `4.5.3` (unsupported) to `4.8.10` which has good reviews / improvments:

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810_4.8.10-040810.201611210531_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-image-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
sudo dpkg -i *.deb
sudo reboot

```

I look forward to feedback and updating this answer as new information comes to light.

Thank you.

  [1]: https://www.kernel.org/
  [2]: https://bugzilla.kernel.org/show_bug.cgi?id=109051
  [3]: https://askubuntu.com/questions/830404/ubuntu-16-04-skylake-overheating
  [4]: https://askubuntu.com/questions/691216/no-version-of-ubuntu-can-be-installed-with-any-skylake-6th-generation-intel-proc
  [5]: https://askubuntu.com/questions/850453/intel-skylake-graphics-fix-crashes-nvidia-card
  [6]: https://askubuntu.com/questions/731645/ubuntu-14-10-lts-with-new-skylake-processors
  [7]: https://askubuntu.com/questions/752743/ubuntu-16-04-skylake-6th-generation-screen-flickering
  [8]: https://askubuntu.com/questions/686164/skylake-integrated-graphics-on-ubuntu-help
