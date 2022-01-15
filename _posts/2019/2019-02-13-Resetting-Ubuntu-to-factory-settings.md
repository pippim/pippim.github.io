---
layout:       post
title:        >
    Resetting Ubuntu to factory settings
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1117800
type:         Answer
tags:         reset
created_date: 2019-02-13 00:58:09
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "73,003 "
accepted:     
uploaded:     2022-01-14 19:32:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-02-13-Resetting-Ubuntu-to-factory-settings.md
toc:          false
navigation:   false
clipboard:    false
---

Reinstalling can mean erasing everything, reformatting the partition, loosing all data and installing Ubuntu with a brand new `/home/user` directory. This is the common result when doing a google search.

This answer is about reinstalling Ubuntu and ***keeping*** `/home/user` directory. The following is from: [Ubuntu Reinstallation][1]


----------


# Ubuntu Reinstallation

## Introduction

Sometimes reinstalling is the quickest way to solve a problem, for example if an upgrade failed or if your graphics driver is broken. When reinstalling, you're most likely want to preserve two things:

-    `/home` folder with your files and settings
-    Entries in boot menu (if you have multiple OS installed) 

## How To Reinstall Ubuntu

Since Hardy it is possible to reinstall Ubuntu without losing the content of the `/home` folder (the folder that contains program settings, internet bookmarks, emails and all your documents, music, videos and other user files). This can be done even if /home is not on a separate partition (which is the case by default if you did not manually separate it when installing Ubuntu originally). This tutorial can also be used to upgrade Ubuntu (eg 11.04 -> 12.04 from a 12.04 live-CD).

## Before doing anything

This operation should not damage your documents but, for security, backup your documents and settings (including /home hidden files) on external disk or DVDs. (eg via CloneZilla) Note: Some special applications settings may be in system folders, eg LAMP, see below in the thread.

## Run the Ubuntu installer

-    Run the UbuntuInstaller
-    Follow the prompts until the "Installation type" (or "Allocate disk space") menu
-    Choose the right option as described below: 

### Choose the right option

There are two possibilities - choose the one that fits what the installer is showing:

- If an "**Upgrade 1X.XX to 1Y.YY**" option is available (like in the screenshot below), choose it. 

[![enter image description here][2]][2]


- Or, if the above option is not available, choose manual partitioning ("Something-else" option), then select Ubuntu system partition, set its mount point as "/". Be sure to keep the same format type, the same size, and untick the "Format" checkbox or all data on "/" will be deleted!. Also set other partitions (/boot, /home... see DiskSpace) if needed.

Then finish the installation process. (this may take several hours, like a normal install)

## After reinstalling

After reinstalling, user accounts must be re-created with the same login and password.

## See also

  1.  [Discussion on the forum][3]

## Create a Live USB

- [How to Create a Bootable Linux USB Flash Drive, the Easy Way][4]


  [1]: https://help.ubuntu.com/community/UbuntuReinstallation
  [2]: http://i.stack.imgur.com/Su5Ay.png
  [3]: https://ubuntuforums.org/showthread.php?p=11770332#post11770332
  [4]: https://www.howtogeek.com/howto/linux/create-a-bootable-ubuntu-usb-flash-drive-the-easy-way/
