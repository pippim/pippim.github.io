---
layout:       post
title:        >
    How do I install Guest Additions in a VirtualBox VM?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1053061
type:         Answer
tags:         virtualbox guest-additions
created_date: 2018-07-07 18:29:55
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "2,171,562 "
accepted:     
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-07-How-do-I-install-Guest-Additions-in-a-VirtualBox-VM_.md
toc:          false
navigation:   false
clipboard:    false
---

# For Lubuntu 16.04 users inside Ubuntu 16.04 Virtualbox

After trying many of the main-stream generic instructions I found [Lubuntu specific instructions][1]:

## Install Virtualbox Guest Additions onto a Lubuntu Virtual Machine

First step: Install required software

``` 
sudo apt-get update
sudo apt-get install make gcc
```

Next, use Virtualbox to download the Guest Additions, then select "Install Guest Additions" from the Virtualbox menu.

If the VBOXADDITIONS cd does not pop up in File Manager, Use File Manager to open the contents of the VBOXADDITIONS cd, then open a terminal there, by going to File Manager's menu and selecting 'Open Current Folder in Terminal'

``` 
sudo sh VBoxLinux*
```

reboot and enjoy! 

  [1]: https://help.ubuntu.com/community/Lubuntu/3rdParty
