---
layout:       post
title:        >
    Removing exeuctable bit on ntfs stored linux files corrupts files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038502
type:         Question
tags:         mount ntfs chmod data-corruption vnstat
created_date: !!str "2018-05-20 22:12:21"
edit_date:    !!str "2018-05-20 22:17:34"
votes:        !!str "0"
favorites:    
views:        !!str "50"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

I have a shared partition setup as `ntfs` for storing Linux files between distros and WSL. My `/etc/fstab` for the shared partition looks like this:

``` 
UUID=F2C2ACE4C2ACADF3 /mnt/e    ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show 0 	0
 
```

I get this error when trying to turn of executable bit:

``` 
$ ll /mnt/e/var/lib/vnstat
total 20
drwxrwxrwx 1 root root 4096 May 20 11:56 ./
drwxr-xr-x 1 root root    0 May 20 09:39 ../
-rwxrwxrwx 1 root root 2792 May 20 15:58 enp59s0*
-rwxrwxrwx 1 root root 2792 May 20 15:58 .enp59s0*
-rwxrwxrwx 1 root root 2792 May 20 15:58 wlp60s0*
-rwxrwxrwx 1 root root 2792 May 20 15:58 .wlp60s0*

$ sudo chmod a-x /mnt/e/var/lib/vnstat

```

``` 
$ ll /mnt/e/var/lib/vnstat
ls: cannot access '/mnt/e/var/lib/vnstat/.': Permission denied
ls: cannot access '/mnt/e/var/lib/vnstat/..': Permission denied
ls: cannot access '/mnt/e/var/lib/vnstat/.enp59s0': Permission denied
ls: cannot access '/mnt/e/var/lib/vnstat/.wlp60s0': Permission denied
ls: cannot access '/mnt/e/var/lib/vnstat/enp59s0': Permission denied
ls: cannot access '/mnt/e/var/lib/vnstat/wlp60s0': Permission denied
total 0
d????????? ? ? ? ?            ? ./
d????????? ? ? ? ?            ? ../
-????????? ? ? ? ?            ? enp59s0
-????????? ? ? ? ?            ? .enp59s0
-????????? ? ? ? ?            ? wlp60s0
-????????? ? ? ? ?            ? .wlp60s0

```


----------

I'm able to rebuild the shared files using:

``` 
$ sudo rm -rf /mnt/e/var/lib/vnstat

$ sudo cp -rp /var/lib/vnstat /mnt/e/var/lib

$ sudo chmod a+r /mnt/e/var/lib/vnstat/*

$ ll /mnt/e/var/lib/vnstat
total 16
drwxr-xr-x 1 vnstat vnstat    0 Oct 31  2017 ./
drwxr-xr-x 1 root   root      0 May 20 16:09 ../
-rw-r--r-- 1 vnstat vnstat 2792 May 20 16:14 enp59s0
-rw-r--r-- 1 vnstat vnstat 2792 May 20 16:14 .enp59s0
-rw-r--r-- 1 vnstat vnstat 2792 May 20 16:14 wlp60s0
-rw-r--r-- 1 vnstat vnstat 2792 May 20 16:14 .wlp60s0

```

I'm still curious to know how the files get corrupted as shown in the first section?

I'm also appearing to having ownership problems when `/etc/fstab` is parsed and ownership defaults to either `root` or my user ID depending on settings.
