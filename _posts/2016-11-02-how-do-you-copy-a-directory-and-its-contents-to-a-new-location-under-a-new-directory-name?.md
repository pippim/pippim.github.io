---
layout:       post
title:        how do you copy a directory and its contents to a new location under a new directory name?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/844886
type:         Answer
tags:         command-line directory copy cp
created_date: 2016-11-02 22:34:46
edit_date:    2016-11-02 23:07:13
votes:        5
favorites:    
views:        467,604
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

I find it easier to change to the directory I'm copying from first. For this example change to a directory everyone has called `/boot`. Anyone can copy and paste the commands below into their Terminal.

``` 
cd /boot
sudo mkdir /boot_backup
sudo cp -r . /boot_backup
du /boot_backup -h

```

``` 
752K	/boot_backup/extlinux/themes/debian-wheezy
756K	/boot_backup/extlinux/themes
832K	/boot_backup/extlinux
2.5M	/boot_backup/grub/i386-pc
20K	    /boot_backup/grub/locale
2.3M	/boot_backup/grub/fonts
7.2M	/boot_backup/grub
565M	/boot_backup

```

For the `cp` command the current directory is identified as `.` which is the `/boot` directory we changed to. The `-r` option makes it recursive to include all sub-directories.

To ensure it worked run `du` to list all sub-directories and total file sizes in the new directory `/boot_backup` in this case.

After finishing this walk-through, use: `sudo rm -r /boot_backup` to remove the new directory and it's sub-directories.
