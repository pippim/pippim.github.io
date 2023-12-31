---
layout:       post
title:        >
    Slow boot 1min 2.440s dev-sda1.device due to Google Drive?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/995860
type:         Answer
tags:         16.04 boot
created_date: 2018-01-14 18:29:26
edit_date:    
votes:        "1 "
favorites:    
views:        "2,839 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-14-Slow-boot-1min-2.440s-dev-sda1.device-due-to-Google-Drive_.md
toc:          false
navigation:   false
clipboard:    false
---

# Google Drive from Linux

The instructions you were following to setup google drive access within Linux were a little outdated. [OMG Ubuntu][1] has easier instructions from April 2017 that don't involve modifying `/etc/fstab` which slows down your boot.

## Install Google Drive Ocamlfuse for Ubuntu 16.04 and up

``` 
sudo add-apt-repository ppa:alessandro-strada/ppa
sudo apt update && sudo apt install google-drive-ocamlfuse
```

## Configure Google Drive Ocamlfuse

With the install complete you can go ahead and set up the app to work with your Google Drive account. While there isn’t a fancy-pants GUI front-end for setting things up don’t feel put. GDO is super simple to use via the CLI.

To get started run the app from the command line using this command:

``` 
google-drive-ocamlfuse
```

The first time you do this the utility will create all the relevant config files and folders it needs to mount your Google Drive account. It will also launch your default web browser so that you sign in and authorize access to your Google Drive files.

Sign in with your Google username and password and, when the screen above appears, grant the utility permission to access your files and folders.

That’s it; you’re pretty much good to go!

## Create directory for Google Drive

All that’s left is to create an empty folder in which to mount Google Drive on your system.

``` 
mkdir ~/googledrive
```

## Mount Google Drive

Once a Google Drive directory is created go ahead and mount it there by running this command:

``` 
google-drive-ocamlfuse ~/googledrive
```

Pop open Nautilus (or whichever modern file manager you use) and you will see your Google Drive mount listed in the sidebar as a device.

## Unmount Google Drive

When you’re finished editing, adding or copying files you can unmount the fuse filesystem with this command:

``` 
fusermount -u ~/google-drive
```

You can try to unmount it using the eject button you’ll see in Nautilus, Nemo, etc but this won’t work; you’ll get a permissions error.

  [1]: http://www.omgubuntu.co.uk/2017/04/mount-google-drive-ocamlfuse-linux
