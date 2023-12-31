---
layout:       post
title:        >
    How to fix install updates message, even though there are no updates to install?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993873
type:         Answer
tags:         updates conky
created_date: 2018-01-09 11:45:48
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "474 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-09-How-to-fix-install-updates-message_-even-though-there-are-no-updates-to-install_.md
toc:          false
navigation:   false
clipboard:    false
---

# Install Updates option

When you select System Settings, Details your screen looks like this:

[![Settings Details Install][1]][1]

The lower right option "Install Updates" could best be described as:

- Check if updates exist and then give me option to install them

# Terminal equivalent

To mimic the steps in the terminal the first step is to update repository information similar to `sudo apt update`:

``` 
$ sudo apt update
Ign:1 http://dl.google.com/linux/chrome/deb stable InRelease
Ign:2 http://archive.canonical.com/ubuntu trusty InRelease                               
Ign:3 http://dl.google.com/linux/earth/deb stable InRelease                              
Hit:4 http://dl.google.com/linux/chrome/deb stable Release                               
Hit:5 http://archive.canonical.com/ubuntu trusty Release                                 
Hit:6 http://dl.google.com/linux/earth/deb stable Release                                
Hit:9 http://security.ubuntu.com/ubuntu xenial-security InRelease                        
Ign:11 http://ppa.launchpad.net/daniel.pavel/solaar/ubuntu xenial InRelease              
Hit:12 http://ca.archive.ubuntu.com/ubuntu xenial InRelease             
Hit:13 http://ca.archive.ubuntu.com/ubuntu xenial-updates InRelease                      
Hit:14 http://ppa.launchpad.net/fossfreedom/indicator-sysmonitor/ubuntu xenial InRelease
Hit:15 http://ca.archive.ubuntu.com/ubuntu xenial-backports InRelease                    
Hit:16 http://ppa.launchpad.net/graphics-drivers/ppa/ubuntu xenial InRelease             
Hit:17 http://ppa.launchpad.net/mkusb/ppa/ubuntu xenial InRelease              
Hit:18 http://ppa.launchpad.net/peek-developers/stable/ubuntu xenial InRelease 
Hit:19 https://download.01.org/gfx/ubuntu/16.04/main xenial InRelease          
Hit:20 http://ppa.launchpad.net/peterlevi/ppa/ubuntu xenial InRelease          
Hit:21 http://ppa.launchpad.net/sethj/silentcast/ubuntu xenial InRelease       
Err:22 http://ppa.launchpad.net/daniel.pavel/solaar/ubuntu xenial Release      
  404  Not Found
Reading package lists... Done
W: https://download.01.org/gfx/ubuntu/16.04/main/dists/xenial/InRelease: Signature by key 09D6EF97BFB38E916EF060E756A3DEF863961D39 uses weak digest algorithm (SHA1)
E: The repository 'http://ppa.launchpad.net/daniel.pavel/solaar/ubuntu xenial Release' does not have a Release file.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
```

Next to see what packages would be updated use:

``` 
$ sudo apt list --upgradeable
Listing... Done
conky-std/xenial 1.10.1-3 amd64 [upgradable from: 1.9.0-4]
libpoppler-glib8/xenial-updates,xenial-security 0.41.0-0ubuntu1.6 amd64 [upgradable from: 0.41.0-0ubuntu1.5]
libpoppler58/xenial-updates,xenial-security 0.41.0-0ubuntu1.6 amd64 [upgradable from: 0.41.0-0ubuntu1.5]
poppler-utils/xenial-updates,xenial-security 0.41.0-0ubuntu1.6 amd64 [upgradable from: 0.41.0-0ubuntu1.5]
```

In this case the much awaited **Meltdown** security hole patch is probably available to install which would be accomplished with `sudo apt upgrade`. But I'm going to hold off until others have installed it and tested it.

# Summary

The option on the **Details** screen is designed to check if updates exist when you click the button. To have it check for updates *before* mounting the screen and changing the button to "System up to date" or "Install Updates", would provide a delay of many seconds to a minute. A third button label of "Internet unavailable" would also have to be created.

I don't think the change you are seeking is possible for the System Details screen.


----------

# Update - Errors in packages

OP posted answer that some packages are being held back. This can happen frequently for a variety of reasons:

- Dependencies: Package depends on another package being updated but in cannot be.
- Pinned: A package (such as Conky 1.9 above) has been pinned to a specific version by user and can't be upgraded by Ubuntu.

You can see these messages when you use `sudo apt upgrade` from the terminal but OP did not see these messages through GUI.

  [1]: https://i.stack.imgur.com/xrdcB.png

