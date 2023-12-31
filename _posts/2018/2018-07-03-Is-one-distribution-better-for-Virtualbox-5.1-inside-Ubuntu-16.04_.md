---
layout:       post
title:        >
    Is one distribution better for Virtualbox 5.1 inside Ubuntu 16.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051964
type:         Question
tags:         16.04 boot dual-boot grub2 virtualbox
created_date: 2018-07-03 23:08:03
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "191 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-03-Is-one-distribution-better-for-Virtualbox-5.1-inside-Ubuntu-16.04_.md
toc:          false
navigation:   false
clipboard:    false
---

## Eeny, meeny, miny, moe pick a Distro by the Toe

A little background, I bought a tripod for my cell phone to record grub start up. Total flop. Now I want to setup Virtualbox and use screen capture of grub booting there.

After problems with libssl 1.1.0 being incompatible with newer kernel headers and Kernel 4.14.34 being incompatible with Virtualbox 5.1 I've finally got it setup where it's now asking me for a bootable CD to install.

## So which Distro should I pick?

- I've allocated 2 GB of RAM even though VB recommended 1 GB of RAM. 
- I've allocated 10 GB of SSD space.

Since all I want to run is `sudo update-grub` and then `reboot` and make a GIF with `peek` of grub booting up, what is the smallest (and reliable) distro to install in VB in Ubuntu 16.04?
