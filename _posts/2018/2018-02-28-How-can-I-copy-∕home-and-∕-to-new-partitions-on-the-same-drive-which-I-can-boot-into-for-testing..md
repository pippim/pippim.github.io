---
layout:       post
title:        >
    How can I copy ∕home and ∕ to new partitions on the same drive which I can boot into for testing.
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010462
type:         Answer
tags:         boot dual-boot grub2 fstab
created_date: 2018-02-28 00:49:53
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "358 "
accepted:     
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   false
clipboard:    false
---

# Rather than copying OS install it

I would install Kubuntu to `sda6` rather than copying `sda4` to `sda6` and patching things here and there. The advantage is `grub` will automatically setup the triple boot for you.

After OS installation copy the package list and reinstall packages. There are a few Q&A's describing how to automate the process:

- [https://unix.stackexchange.com/questions/190853/backup-and-restore-list-of-installed-packages-and-apt-sources][1]
- [https://www.ostechnix.com/create-list-installed-packages-install-later-list-centos-ubuntu/][2]
- [How can I backup my programs/applications, so that after I reinstall a new one, I can still use the backup-ed ones?][3]

After automatic installation of packages then copy `sda5` (/home) over top of `sda7` (/home). If you did this before package installation some data / configurations files could be overwritten.

As far as UEFI being broken you could post that as a separate question.


  [1]: https://unix.stackexchange.com/questions/190853/backup-and-restore-list-of-installed-packages-and-apt-sources
  [2]: https://www.ostechnix.com/create-list-installed-packages-install-later-list-centos-ubuntu/
  [3]: https://askubuntu.com/questions/243387/how-can-i-backup-my-programs-applications-so-that-after-i-reinstall-a-new-one
