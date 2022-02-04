---
layout:       post
title:        >
    Remove second hard drive OS from grub
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1042589
type:         Answer
tags:         boot grub2 hard-drive
created_date: 2018-06-01 11:06:16
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "4,203 "
accepted:     Accepted
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-01-Remove-second-hard-drive-OS-from-grub.md
toc:          false
navigation:   false
clipboard:    true
---

## Short Answer

If you don't want third party utilities you can do it with a move command:

``` 
sudo mv /mnt/extra_distro/boot /mnt/extra_distro/boot.old
```

Then `sudo update-grub` of course.

## Long Answer

Grub's OS_Prober checks each mounted drive for presence of `/boot/*` entries of `vmlinuz*` and `initrd.img*`. Then adds those options to your booted instance of `grub`. On my system for example:

{% include copyHeader.html %}
``` 
$ sudo mount-menu.sh
Mount Partition


      ┌───────────┤ Use arrow, page, home & end keys. Tab toggle option ├────────────┐
      │ NAME        FSTYPE  LABEL                    SIZE MOUNTPOINT                 │ 
      │                                                                              │ 
      │ sda                                        931.5G                           ↑│ 
      │ ├─sda4      ntfs    WINRETOOLS               450M                           ▒│ 
      │ ├─sda2                                       128M                           ▒│ 
      │ ├─sda5      ntfs    Image                   11.4G                           ▒│ 
      │ ├─sda3      ntfs    HGST_Win10               919G /mnt/d                    ▒│ 
      │ └─sda1      vfat    ESP                      500M                           ▒│ 
      │ nvme0n1                                      477G                           ▒│ 
      │ ├─nvme0n1p5 ntfs                             858M                           ▒│ 
      │ ├─nvme0n1p3                                   16M                           ▒│ 
      │ ├─nvme0n1p1 ntfs                             450M                           ▒│ 
      │ ├─nvme0n1p8 ntfs    Shared_WSL+Linux           9G /mnt/e                    ▒│ 
      │ ├─nvme0n1p6 ext4    Ubuntu18.04             23.7G                           ▮│ 
      │ ├─nvme0n1p4 ntfs    NVMe_Win10             390.4G /mnt/c                    ▒│ 
      │ ├─nvme0n1p2 vfat                              99M /boot/efi                 ▒│ 
      │ ├─nvme0n1p9 swap    Linux Swap               7.9G [SWAP]                    ▒│ 
      │ └─nvme0n1p7 ext4    NVMe_Ubuntu_16.0        44.6G /                         ↓│ 
      │                                                                              │ 
      │                                                                              │ 
      │                     <Select unmounted partition> <Exit>                      │ 
      │                                                                              │ 
      └──────────────────────────────────────────────────────────────────────────────┘ 
                                                                                       
```


I will mount the Ubuntu 18.04 partition:


``` 
=====================================================================
Mount Device:  /dev/nvme0n1p6
Mount Name:    /mnt/mount-menu.BkLzA
File System:   ext4
ID:            Ubuntu
RELEASE:       18.04
CODENAME:      bionic
DESCRIPTION:   Ubuntu 18.04 LTS
 Size  Used Avail Use%
  24G   18G  4.7G  79%
```

Now update `grub` and look at the menu:

{% include copyHeader.html %}
``` 
$ sudo update-grub
$ grub-menu.sh
Grub Version: 2.02~beta2-36ubuntu3.18


        ┌─────────┤ Use arrow, page, home & end keys. Tab toggle option ├──────────┐
        │ Menu No. --------------- Menu Name ---------------                         
        │                                                                            
        │1>41 Ubuntu, with Linux 4.4.0-127-generic (recovery mode)                 ↑ 
        │1>42 Ubuntu, with Linux 3.16.53-031653-generic                            ▒ 
        │1>43 Ubuntu, with Linux 3.16.53-031653-generic (upstart)                  ▒ 
        │1>44 Ubuntu, with Linux 3.16.53-031653-generic (recovery mode)            ▒ 
        │1>44 Ubuntu, with Linux 3.16.53-031653-generic (recovery mode)            ▒ 
        │2    Windows Boot Manager (on /dev/nvme0n1p2)                             ▒ 
        │3    Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)                         ▒ 
        │4    Advanced options for Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)    ▒ 
        │4>0  Ubuntu (on /dev/nvme0n1p6)                                           ▒ 
        │4>1  Ubuntu, with Linux 4.15.0-22-generic (on /dev/nvme0n1p6)             ▮ 
        │4>2  Ubuntu, with Linux 4.15.0-22-generic (recovery mode) (on /dev/nvme0  ▒ 
        │4>3  Ubuntu, with Linux 4.15.0-20-generic (on /dev/nvme0n1p6)             ▒ 
        │4>4  Ubuntu, with Linux 4.15.0-20-generic (recovery mode) (on /dev/nvme0  ▒ 
        │4>5  Ubuntu, with Linux 4.14.34-041434-generic (on /dev/nvme0n1p6)        ▒ 
        │4>6  Ubuntu, with Linux 4.14.34-041434-generic (recovery mode) (on /dev/  ▒ 
        │4>7  Ubuntu, with Linux 4.14.31-041431-generic (on /dev/nvme0n1p6)        ↓ 
        │                                                                            
        │                                                                            
        │                   <Display Grub Boot>        <Exit>                        
        │                                                                          │ 
        └──────────────────────────────────────────────────────────────────────────┘ 
                                                                                     
```

Notice the grub options:

- 2    Windows Boot Manager (on /dev/nvme0n1p2)
- 3    Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)
- 4    Advanced options for Ubuntu 18.04 LTS (18.04) (on /dev/nvme0n1p6)

option 2 we want to keep, options 3 and 4 we want gone.

So on my system use:

{% include copyHeader.html %}
``` 
$ sudo mv /mnt/mount-menu.BkLzA/boot /mnt/mount-menu.BkLzA/boot.old
$ sudo update-grub
$ grub-menu.sh
Grub Version: 2.02~beta2-36ubuntu3.18


        ┌─────────┤ Use arrow, page, home & end keys. Tab toggle option ├──────────┐
        │ Menu No. --------------- Menu Name ---------------                       │ 
        │                                                                          │ 
        │     1>33 Ubuntu, with Linux 4.13.0-43-generic                       ↑    │ 
        │     1>34 Ubuntu, with Linux 4.13.0-43-generic (upstart)             ▒    │ 
        │     1>35 Ubuntu, with Linux 4.13.0-43-generic (recovery mode)       ▒    │ 
        │     1>36 Ubuntu, with Linux 4.9.77-040977-generic                   ▒    │ 
        │     1>37 Ubuntu, with Linux 4.9.77-040977-generic (upstart)         ▒    │ 
        │     1>38 Ubuntu, with Linux 4.9.77-040977-generic (recovery mode)   ▒    │ 
        │     1>39 Ubuntu, with Linux 4.4.0-127-generic                       ▒    │ 
        │     1>40 Ubuntu, with Linux 4.4.0-127-generic (upstart)             ▒    │ 
        │     1>41 Ubuntu, with Linux 4.4.0-127-generic (recovery mode)       ▒    │ 
        │     1>42 Ubuntu, with Linux 3.16.53-031653-generic                  ▒    │ 
        │     1>43 Ubuntu, with Linux 3.16.53-031653-generic (upstart)        ▒    │ 
        │     1>44 Ubuntu, with Linux 3.16.53-031653-generic (recovery mode)  ▒    │ 
        │     1>44 Ubuntu, with Linux 3.16.53-031653-generic (recovery mode)  ▒    │ 
        │     2    Windows Boot Manager (on /dev/nvme0n1p2)                   ▒    │ 
        │     3    Windows Boot Manager (on /dev/sda1)                        ▮    │ 
        │     4    System setup                                               ↓    │ 
        │                                                                          │ 
        │                                                                          │ 
        │                   <Display Grub Boot>        <Exit>                      │ 
        │                                                                          │ 
        └──────────────────────────────────────────────────────────────────────────┘ 
```

**VOILA** Extra unwanted distribution no longer appears. Note, I had read once that simply renaming `/mnt/extra_distro/grub/grub.cfg` file would solve the issue but testing this just now didn't seem to work.
