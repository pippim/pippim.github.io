---
layout:       post
title:        >
    Any file manager that can XOR two home folders?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/966176
type:         Question
tags:         dual-boot software-recommendation windows-subsystem-for-linux
created_date: 2017-10-18 23:45:08
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "371 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-10-18-Any-file-manager-that-can-XOR-two-home-folders_.md
toc:          false
navigation:   false
clipboard:    false
---

I'm setting up a new Win 10 laptop with Ubuntu 16.04 in dual boot that has a home folder and with WSL (Windows Subsystem for Linux) using Xubuntu that has a home folder.

My goal is when booted with Ubuntu I want to be able to change files and have those reflected in WSL at the same time. When I've booted into Windows I want WSL changes to be reflected in Ubuntu at the same time.

Within WSL Ubuntu will be mounted. Within Ubuntu WSL will be mounted.

I have a "faint hope" that a file manager can virtually merge the two home folders, strip out the file names that are the same and leave me with the file names / directories names that are in one home folder (and sub-directories) but not the other (XOR).

The reason being:

- I don't want to duplicate the same files between two different homes and have to synchronize them.
- Some files / documents with the same name must be unique to each environment and never synchronized. A likely candidate would be `~/.conkyrc` should never be copied between environments as one uses Linux Kernel and the other uses NT kernel for machine stats.

I'm hoping to get Xubuntu running as a second Desktop within WSL. It should be able to run most file managers. I'm hoping I won't have to dig into the source to XOR two home folders.

I think much of `/usr/local/bin` will be only on the Ubuntu partition and symbolic links created from WS.

On a similar note I read once the same user name shouldn't be used as a sub-directory under `/home` on different partitions. ie having two `/home/WinEunuuchs2Unix` is frowned upon? And the Windows one should be named `/home/WinEunuuchs2Unix2WSL` for example? Real names would be shorter of course.


----------


# XOR

Initially there was some confusion on my question so I'll define `XOR` as best I can. It is an Assembler command (some insist on calling it Assembly Language) that means:

> In one, or in another but NOT in both  

Once you understand this instruction code you'll see how I want to be presented with a list of files in my directory PLUS the list of files in the same directory name in on a DIFFERENT partition that do NOT exist on the current partition so I can edit any of the files simultaneously and NOT have to synchronize them because they do NOT exist in the current partition in the first place.

It's probably a new invention in data processing so it makes my question misleading to most people which I apologize for. Ironically on the other hand, XOR is probably one of the oldest computer instruction codes on earth, dating back to the 1 vacuum tube = 1 bit of memory days I imagine.
