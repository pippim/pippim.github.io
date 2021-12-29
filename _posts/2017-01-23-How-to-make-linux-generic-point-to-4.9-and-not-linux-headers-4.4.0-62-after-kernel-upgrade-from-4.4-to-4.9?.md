---
layout:       post
title:        How to make linux-generic point to 4.9 and not linux-headers-4.4.0-62 after kernel upgrade from 4.4 to 4.9?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/875106
type:         Answer
tags:         upgrade kernel grub
created_date: 2017-01-23 02:14:16
edit_date:    2017-04-13 12:23:21
votes:        2
favorites:    
views:        4,410
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

## The first message you are receiving

``` 
The following packages have been kept back:
 linux-generic linux-headers-generic linux-image-generic

```

Is discussed here: ([digitalocean.com - Packages have been kept back new Ubuntu 14 image][1]) and the solution is to perform:

``` 
sudo apt-get dist-upgrade

```

## The second message you are receiving

``` 
The following NEW packages will be installed:
  linux-headers-4.4.0-62 linux-headers-4.4.0-62-generic linux-image-4.4.0-62-generic linux-image-extra-4.4.0-62-generic

```

Is perfectly normal and not a cause for concern. When you do regular Ubuntu 16.04 updates the kernel 4.4.0-xx is automatically updated. It has nothing to do with your Kernel 4.9.4 or Kernel 4.9.5 which is the first option on your Grub menu.

The 4.4.0-xxx kernels are available for booting if necessary on Grub's *Advanced Options* menu.

When you look on your system you will see linux headers for all kernel versions on your drive:

``` 
$ ls /lib/modules
3.13.0-92-generic      4.7.1-040701-generic   4.8.12-040812-generic
3.2.0-113-generic      4.7.2-040702-generic   4.8.4-040804-generic
4.4.0-53-generic       4.7.3-040703-generic   4.8.5-040805-generic
4.4.0-57-generic       4.7.5-040705-generic   4.9.0-040900-generic
4.4.0-59-generic       4.8.10-040810-generic  4.9.1-040901-generic
4.4.33-040433-generic  4.8.1-040801-generic   4.9.4-040904-generic
4.6.3-040603-generic   4.8.11-040811-generic

```

To see your header files for 4.4.0-xxx:

``` 
$ ls /lib/modules/4.4.0-59-generic/build/include/linux
8250_pci.h                i2c-smbus.h              phy_fixed.h
acct.h                    i2c-xiic.h               phy.h
acpi_dma.h                i7300_idle.h             pid.h
  (... hundreds of files ....)
i2c-pnx.h                 phonet.h                 zsmalloc.h
i2c-pxa.h                 phy                      zutil.h

```

To see your header files for 4.9.4:

``` 
$ ls /lib/modules/4.9.4-040904-generic/build/include/linux
8250_pci.h                i2c-ocores.h             phy_fixed.h
acct.h                    i2c-omap.h               phy.h
acpi_dma.h                i2c-pca-platform.h       pid.h
  (... hundreds of files ....)
i2c-mux-gpio.h            pfn_t.h                  zutil.h
i2c-mux.h                 phonet.h
i2c-mux-pinctrl.h         phy

```

## Removing older kernels

You should run `sudo apt-get autoremove` periodically to clean out old versions of 4.4.0-xxx kernels. This will keep the most recent version plus the next oldest.

Older kernel versions for 4.6, 4.7, 4.8 and 4.9 must be manually removed using:

``` 
sudo apt-get purge linux-image-x.x.x.x-generic

```

followed by:

``` 
sudo update-grub

```

As each kernel version is > 100 MB you can save a lot of storage space. A full write up for deleting older kernels you manually installed can be found here: [How do I remove old kernel versions to clean up the boot menu?][2]

### Recommended packages

`apt-get` has a message for you:

``` 
Suggested packages:
  fdutils linux-tools

```

This doesn't happen on my system and might be of interest to research further.

## Easiest way to install newest kernel

I used to use `wget` as you did because those are popular / common instructions on the internet. It requires a little bit of typing and joining of strings though. An easier way is just to navigate to:

``` 
http://kernel.ubuntu.com/~kernel-ppa/mainline/

```

Press the <kbd>End</kbd> key and click on `4.9.5` or the newest kernel you want. Then this screen appears:

[![kernel 4.9.5][3]][3]

Assuming yoyu want 64-bit generic version click on:

 - linux-headers-4.9.5-040905_4.9.5-040905.201701200532_all.deb
 - linux-headers-4.9.5-040905-generic_4.9.5-040905.201701200532_amd64.deb
 - linux-image-4.9.5-040905-generic_4.9.5-040905.201701200532_amd64.deb

All three downloads will easily start for you without complicated typing.

When done open terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type:

``` 
cd Downloads
sudo dpkg -i *.deb
rm *4.9.5*

```

I think everyone will find this method much easier than methods commonly published on the internet.

## Ubuntu 17.04 Zesty will be using Kernel 4.10

Although your statement Zesty will be using kernel version 4.9 was true yesterday it's not true today. As per this story released an hour ago: ([softpedia.com - Ubuntu developers now tracking Linux Kernel 4.10 for Ubuntu 17.04 Zesty Zapus][4]) they are using Kernel 4.10 rc4.

That said I would stick to Kernel 4.9.5 which is stable and has improvements for i915 and AMD Southern Islands which might interest many here.


  [1]: https://www.digitalocean.com/community/questions/packages-have-been-kept-back-new-ubuntu-14-image
  [2]: https://askubuntu.com/questions/2793/how-do-i-remove-old-kernel-versions-to-clean-up-the-boot-menu
  [3]: https://i.stack.imgur.com/qRmNl.png
  [4]: http://news.softpedia.com/news/ubuntu-developers-now-tracking-linux-kernel-4-10-for-ubuntu-17-04-zesty-zapus-512081.shtml
