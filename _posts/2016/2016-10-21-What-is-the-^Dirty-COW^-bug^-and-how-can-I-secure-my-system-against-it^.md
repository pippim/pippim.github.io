---
layout:       post
title:        >
    What is the "Dirty COW" bug, and how can I secure my system against it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/839920
type:         Answer
tags:         kernel security
created_date: 2016-10-21 03:35:38
edit_date:    2020-06-12 14:37:07
votes:        "20 "
favorites:    
views:        "17,366 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-21-What-is-the-^Dirty-COW^-bug^-and-how-can-I-secure-my-system-against-it^.md
toc:          false
navigation:   false
clipboard:    false
---

# The Ancient Dirty COW Bug

This bug has been around since Kernel version 2.6.22. It allows a local user with read access to gain administrative privileges. A warning has been issued ([Softpedia: Linux Kernels 4.8.3, 4.7.9 & 4.4.26 LTS Out to Patch "Dirty COW" Security Flaw][1]) and users are urged to upgrade to Kernel Linux kernel 4.8.3, Linux kernel 4.7.9, and Linux kernel 4.4.26 LTS. **THIS LINK IS MISLEADING** because these Kernel versions are not supported by Ubuntu.

This answer is tailored for Ubuntu users and tells you:

 - Recommended Kernel Versions for Ubuntu users
 - How to display your current Kernel Version
 - How to apply fix for Ubuntu Supported Kernels
 - How to apply fix for Non-Supported Ubuntu Kernels

# Ubuntu users "Dirty COW" recommended Kernels

Ubuntu released security updates on October 20, 2016 to patch the Kernel used by all supported Ubuntu versions: [Softpedia: Canonical Patches Ancient "Dirty COW" Kernel Bug in All Supported Ubuntu OSes][2]

Canonical is urging all users to patch their systems immediately by installing:

 - linux-image-4.8.0-26 (4.8.0-26.28) for Ubuntu 16.10
 - linux-image-4.4.0-45 (4.4.0-45.66) for Ubuntu 16.04 LTS
 - linux-image-3.13.0-100 (3.13.0-100.147) for Ubuntu 14.04 LTS
 - linux-image-3.2.0-113 (3.2.0-113.155) for Ubuntu 12.04 LTS
 - linux-image-4.4.0-1029-raspi2 (4.4.0-1029.36)

The Xenial HWE kernel for Ubuntu 14.04 LTS was updated as well, to version linux-image-4.4.0-45 (4.4.0-45.66~14.04.1), and the Trusty HWE kernel for Ubuntu 12.04 LTS to version linux-image-3.13.0-100 (3.13.0-100.147~precise1). 

Please update your Ubuntu installations immediately by following the instructions provided by Canonical at: [https://wiki.ubuntu.com/Security/Upgrades][3] .

# Display your current Kernel Version

To display your current running Kernel version open the terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and then type:

``` 
uname -a
```

The kernel version **you booted with** is then displayed like this:

``` 
Linux dell 4.8.1-040801-generic #201610071031 SMP Fri Oct 7 14:34:10 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```

Remember after you install the new kernel with the patches, you can still boot older kernel versions from Grub. Older versions will not have the patch applied, which is the case of this kernel version 4.8.1.

Once again remember kernel version 4.8.1 is not supported by Ubuntu.

  [1]: http://news.softpedia.com/news/linux-kernels-4-8-3-4-7-9-4-4-26-lts-out-to-patch-dirty-cow-security-flaw-509495.shtml
  [2]: http://news.softpedia.com/news/canonical-patches-ancient-dirty-cow-kernel-bug-in-all-supported-ubuntu-oses-509507.shtml
  [3]: https://wiki.ubuntu.com/Security/Upgrades

# How to fix for Ubuntu supported Kernels

Since Ubuntu has released the fix of the bug, All users need to do is upgrade their system. If daily security updates are enabled the kernel upgrade has already been done. Check your kernel version to the list of kernels above. 

If Ubuntu has not automatically upgraded your kernel version then run:

``` 
sudo apt-get update
sudo apt-get dist-upgrade
sudo reboot
```

After rebooting check your current kernel version by repeating the previous section instructions.

# How to fix for Non-supported Ubuntu Kernels

Some installations with newer hardware may be using an unsupported Kernel such as `4.8.1` or greater. If so you will need to manually upgrade the Kernel. Although the bug report link above says to use Kernel `4.8.3`, As of October 30, 2016, `4.8.5` is the most recent and this is how to install it:

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-headers-4.8.5-040805_4.8.5-040805.201610280434_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-headers-4.8.5-040805-generic_4.8.5-040805.201610280434_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.5/linux-image-4.8.5-040805-generic_4.8.5-040805.201610280434_amd64.deb
sudo dpkg -i *.deb
sudo reboot
```

After rebooting check your current kernel version by repeating the instructions two sections back.
