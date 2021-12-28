---
layout:       post
title:        External hard drive keeps powering down
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051039
type:         Answer
tags:         16.04 downloads external-hdd drive badblocks
created_date: 2018-06-30 18:13:52
edit_date:    
votes:        3
favorites:    
views:        3,746
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

Not only with large downloads, but also with copying large files from HDD to external HDD there is a bug almost five years old: [Ubuntu slows down and hangs while copying file from/to USB][1].

The solutions posted by many users is to check your write back cache:

``` 
$ cat /proc/vmstat | egrep "dirty|writeback"
nr_dirty 15
nr_writeback 0
nr_writeback_temp 0
nr_dirty_threshold 261131
nr_dirty_background_threshold 130406

```

The accepted answer (with 66 up-votes) here: [stackexchange.com - Why is my pc freezing while I'm copying a file to a pendrive?][2]

suggests using:

``` 
echo $((16*1024*1024)) > /proc/sys/vm/dirty_background_bytes
echo $((48*1024*1024)) > /proc/sys/vm/dirty_bytes

```

The accepted answer is using indirect math to set 16 MiB for dirty background bytes and 48 MiB for dirty bytes.

From the first link (bug report) though, comment #83 recommends a more aggressive value of 200 MB for dirty bytes. To make settings permanent edit `/etc/sysctl.conf` and add this line:

``` 
vm.dirty_bytes = 200000000

```

Then run `systctl -p` or reboot.

There are many other suggestions in the first link and you might have to try other ones if this common solution doesn't work.

BTW **dirty** doesn't mean anything nefarious. It means data held in RAM waiting to be written to disk. So while your download is running the information is being held in RAM and not written to your external hard drive. Inactivity could be why it is powering down.

Also as I mentioned in comments `blkid` reveals nothing in Ubuntu 18.04 but `lsblk` reveals everything including external drives.


  [1]: https://bugs.launchpad.net/ubuntu/+source/nautilus/+bug/1208993
  [2]: https://unix.stackexchange.com/questions/107703/why-is-my-pc-freezing-while-im-copying-a-file-to-a-pendrive/107722#107722
