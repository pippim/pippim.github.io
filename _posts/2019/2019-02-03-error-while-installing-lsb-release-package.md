---
layout:       post
title:        >
    error while installing lsb-release package
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1115248
type:         Answer
tags:         xubuntu dpkg lsb-release
created_date: 2019-02-03 13:08:49
edit_date:    2019-02-03 13:25:28
votes:        "1 "
favorites:    
views:        "3,096 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-02-03-error-while-installing-lsb-release-package.md
toc:          false
navigation:   false
clipboard:    false
---

### lsb-release is usually installed by default

To check if `lsb-release` package is already installed use:

``` 
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 16.04.5 LTS
Release:	16.04
Codename:	xenial
```

### Error may apply to all packages

The error message may apply to all packages, not just `lsb-release`. From:

- [How To Solve “sub process usr bin dpkg returned an error code 1″ Error in Ubuntu][1]

These are the most common steps to solve the error:

### Method 1: Reconfigure Package Database

The first method you can try is to reconfigure the package database. Probably the database got corrupted while installing a package. Reconfiguring often fixes the problem.

``` 
sudo dpkg --configure -a
```

### Method 2: Use force install

If a package installation was interrupted previously, you may try to do a force install.

``` 
sudo apt-get install -f
```


  [1]: https://itsfoss.com/dpkg-returned-an-error-code-1/
