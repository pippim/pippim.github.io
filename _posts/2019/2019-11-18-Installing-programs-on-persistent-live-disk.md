---
layout:       post
title:        >
    Installing programs on persistent live disk
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189665
type:         Answer
tags:         18.04 live-usb persistence
created_date: 2019-11-18 02:40:54
edit_date:    2019-11-18 02:55:30
votes:        "0 "
favorites:    
views:        "433 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

In the copy of the screen are missing the lines preceding:

``` 
Do you want to continue? [Y/n] Y
Setting up linux-image-5.0.0-36-generic (5.0.0-36.39~18.04.1) ...
Setting up initramfs-tools (0.130ubuntu3.9) ...

```

This leads me to believe you entered `sudo apt upgrade`. You can't do this with a persistent USB.

You can only do:

``` 
sudo apt update
sudo apt install <package_name>

```

Where `<package_name>` is not a linux kernel package such as `linux_image` or `linux_header`.

The problem is not based on your encrypted HDD because a Live USB will not see your HDD or any other drives / partitions until they are manually mounted.

Additionally make sure automatic upgrades are turned off in systems settings. From time to time use:

``` 
apt list --upgradable

```

Only select those packages with `sudo apt upgrade <package_name>` when they are not related to `initramfs`, `grub`, `linux_image` or `linux_header`. There may be other packages as well that should not be upgraded.
