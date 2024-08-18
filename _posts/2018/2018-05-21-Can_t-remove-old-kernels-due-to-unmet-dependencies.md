---
layout:       post
title:        >
    Can't remove old kernels due to unmet dependencies
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038748
type:         Answer
tags:         kernel 17.10 dependencies
created_date: 2018-05-21 15:56:55
edit_date:    
votes:        "2 "
favorites:    
views:        "3,463 "
accepted:     
uploaded:     2024-08-18 16:33:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-21-Can_t-remove-old-kernels-due-to-unmet-dependencies.md
toc:          false
navigation:   false
clipboard:    false
---

You need to free up space in your `/boot` directory first. You have four `4.4.13.0` chain kernels: `-36`, `-37`, `-38` and `-39`. You only need `-38` and `-39`. So you need to remove `-36` and `-37`. I don't have them installed but to give you an idea of what they would look like I used this command:

``` 
$ ll /boot/*4.4.0-124*
-rw-r--r-- 1 root root  1251054 May  2 08:58 /boot/abi-4.4.0-124-generic
-rw-r--r-- 1 root root   190654 May  2 08:58 /boot/config-4.4.0-124-generic
-rw-r--r-- 1 root root 43369621 May 17 06:00 /boot/initrd.img-4.4.0-124-generic
-rw-r--r-- 1 root root      255 May  2 08:58 /boot/retpoline-4.4.0-124-generic
-rw------- 1 root root  3898100 May  2 08:58 /boot/System.map-4.4.0-124-generic
-rw------- 1 root root  7143952 May  2 08:58 /boot/vmlinuz-4.4.0-124-generic
```

Repeat this command on  your system by substituting `4.4.0-124` with `4.13.0-36` and `4.13.0-37`. As you will see each kernel takes about 450 MB in `/boot`.

Then **very carefully** type these commands (but not the comments `#`):

``` 
sudo rm -f /boot/*4.13.0-36*
sudo rm -f /boot/*4.13.0-37*
sudo apt install -f  # Ensure all dependency errors are now fixed.
sudo apt update      # There should be no errors reported.
sudo apt autoremove  # This will finish removing kernels -36 & -37.
sudo apt upgrade     # This should install new kernel 4.13.0-41
sudo reboot          # You will now boot into kernel 4.13.0-41
```

After rebooting, and any other time after booting a new kernel update run:

``` 
sudo apt autoremove  # This will keep you at current kernel plus previous version (4.13.0-39) and remove all others
```


----------

If you have the slightest doubt or uncertainty **post a comment below**.
