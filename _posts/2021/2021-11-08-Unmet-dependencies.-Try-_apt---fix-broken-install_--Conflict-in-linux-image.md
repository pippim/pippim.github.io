---
layout:       post
title:        >
    Unmet dependencies. Try 'apt --fix-broken install'- Conflict in linux-image
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1374281
type:         Answer
tags:         apt 20.04 kernel xubuntu dpkg
created_date: 2021-11-08 12:21:01
edit_date:    
votes:        "4 "
favorites:    
views:        "683 "
accepted:     
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-11-08-Unmet-dependencies.-Try-_apt---fix-broken-install_--Conflict-in-linux-image.md
toc:          false
navigation:   false
clipboard:    false
---

From this [tutorial](https://itsfoss.com/dpkg-returned-an-error-code-1/):

## Method 1: Reconfigure Package Database

The first method you can try is to reconfigure the package database. Probably the database got corrupted while installing a package. Reconfiguring often fixes the problem.

``` 
sudo dpkg --configure -a
```

## Method 2: Use force install

If a package installation was interrupted previously, you may try to do a force install.

``` 
sudo apt-get install -f
```

## Method 3: Try removing the troublesome package

If it’s not an issue for you, you may try to remove the package manually. Please don’t do it for Linux Kernels (packages starting with linux-).

``` 
sudo apt remove package_name
```

## Method 4: Remove post info files of the troublesome package

This should be your last resort. You can try removing the files associated to the package in question from /var/lib/dpkg/info.

