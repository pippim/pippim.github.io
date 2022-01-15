---
layout:       post
title:        >
    Broadcom Wireless Driver problem. I've tried solutions given on this forum but I can't get it work
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1001543
type:         Answer
tags:         16.04 drivers wireless broadcom
created_date: 2018-01-31 01:05:48
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "946 "
accepted:     Accepted
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-31-Broadcom-Wireless-Driver-problem.-I^ve-tried-solutions-given-on-this-forum-but-I-can^t-get-it-work.md
toc:          false
navigation:   false
clipboard:    false
---

# Update is breaking your system

After installing DO NOT update your software.

## Find out your kernel version with `uname -r`:

``` 
$ uname -r
4.14.15-041415-generic

```

## Find out the specific package names

Replace `4.14.15-041415-generic` below with what your `uname -r` returned above:

``` 
$ apt list --installed | grep 4.14.15-041415-generic

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

linux-headers-4.14.15-041415-generic/now 4.14.15-041415.201801231530 amd64 [installed,local]
linux-image-4.14.15-041415-generic/now 4.14.15-041415.201801231530 amd64 [installed,local]

```

## Pin the packages so they don't get updated

Replace `4.14.15-041415-generic` below with what your `uname -r` returned above:

``` 
$ sudo apt-mark hold linux-headers-4.14.15-041415-generic
linux-headers-4.14.15-041415-generic set on hold.
$ sudo apt-mark hold linux-image-4.14.15-041415-generic
linux-image-4.14.15-041415-generic set on hold.

```

*Note: Rather than retyping, copy and pasting portions from above section will save time and reduce errors*

## Now it's safe to update your software

You can update your software through the software centre or using:

``` 
sudo apt update
sudo apt upgrade

```
