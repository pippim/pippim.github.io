---
layout:       post
title:        What is /run/user/1000/gvfs/
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035122
type:         Answer
tags:         gvfs mountpoint
created_date: 2018-05-12 00:11:57
edit_date:    2020-06-12 14:37:07
votes:        12
favorites:    
views:        16,452
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

# All roads lead to Gnome

Ubuntu is based upon many things plus home grown programming from Canonical (the owners of Ubuntu). Most people know it is based on Linux kernel and provides a "GNOME" Desktop environment. But it is also based on Debian and perhaps just as important Gnome Internals. It is so intrinsic I dare to say in Ubuntu that: "All roads lead to Gnome".

### What is GIO / gvfs?

In your question `/run/user/1000/gvfs/` the `gvfs` component stands for "Gnome Virtual File System". Your camera and Android phones are mounted in this "User Space" outside of "Kernel Space" where a normal "mount" occurs.

To learn more about GIO (Gnome Input Output I surmise) see [here][1] and [here][2]. Ubuntu has a page about using GIO to mount devices using the [gvfs-mount command][3].

The other component in your question `/run/user/1000/gvfs/` is the `/run/user` component. This was created by `systemd` to circumvent using the `/tmp` directory which was common practice for such devices because it side-stepped network "rules". See [here][4].

### The other part of your question is how is it different from `/media`?

The `/media` directory is where removable storage is located. The removable storage is in a familiar file format such as `ext4`, `fat` or `ntfs`. The device names and mount names are static.

Your Android phone is not just removable storage but a removable foreign operating system that has storage. The storage is generally accessed with MTP. However, there is a host of programs to communicate with the phone. That is why it goes into `/run/user/1000/gvfs`. Samba also goes into the same directory chain but I haven't researched that one yet. 

In the `/run/user/1000` directory structure the mount names are dynamic and change with every connection. For example my phone currently is:

``` 
$ ll /run/user/1000/gvfs/mtp:host=%5Busb%3A001%2C013%5D
total 0
dr-x------ 1 rick rick 0 Dec 31  1969 ./
dr-x------ 3 rick rick 0 May  9 18:20 ../
drwx------ 1 rick rick 0 Dec 31  1969 Internal storage/
drwx------ 1 rick rick 0 Dec 31  1969 SD card/

```

The USB enumeration is notorious for changing so you can be assured the directory name will be different next time. `/media` "stuff" on the other hand is static.

Notice the dates shown by Ubuntu 16.04 under Kernel 4.14.34. I haven't had this Android Smartphone since the year 1969. I guess we can call this a bug.

  [1]: https://developer.gnome.org/gio/stable/ch01.html
  [2]: https://developer.gnome.org/gio/stable/gio.html
  [3]: http://manpages.ubuntu.com/manpages/xenial/man1/gvfs-mount.1.html
  [4]: https://unix.stackexchange.com/a/162911/200094
