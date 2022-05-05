---
layout:       post
title:        >
    Why is this 'eject' icon showing next to my drive?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/862786
type:         Answer
tags:         16.04
created_date: 2016-12-20 19:13:37
edit_date:    2017-04-13 12:24:56
votes:        "5 "
favorites:    
views:        "1,430 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-20-Why-is-this-_eject_-icon-showing-next-to-my-drive_.md
toc:          false
navigation:   false
clipboard:    false
---

I've posted a couple of comments already so I'll just wrap them up with an answer and a picture:

[![Nautilus Eject][1]][1]

The first Eject button is for the Android phone.

Below that we have:

 - "Computer" the mounted Linux partition on 120 GB mSata SSD `/dev/sdc3`
 - "KSX_Win7" Kingston Savage X 240 GB SSD `/dev/sda2` (Unmounted)
 - "KSX Win 8.1" Kingston Savage X 240 GB SSD `/dev/sda3` (Unmounted)
 - "ST9_Linux" Seagate Technologies 512 GB HDD `/dev/sdb5` (Unmounted)
 - "ST9_Win7" Seagate Technologies 512 GB HDD `/dev/sdb2` (Mounted)
 - "Music" bookmark into `ST9_Win7/Users/Person/Music/iTunes/iTunesMedia/Music`

As you can see bookmarks are handy to save you a lot of clicking during drill down.

The design of Nautilus is to always show you partitions you can mount by clicking on their name. After clicking the partition name the "Eject" icon appears. Clicking "Eject" simply unmounts the partition.

If you want to hide a partition from Nautilus use the `Disks` application ([How do I hide / remove a partition from the Nautilus left panel?][2]). For example in the above Nautilus screen the partition `/dev/sdc2` - F9m_Win7 has been hidden using the `Disks` application. The reason was it's a brand new install and broken so not much point in having it appear in Nautilus.

The entire `lsblk` is:

``` 
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 223.6G  0 disk 
├─sda1   8:1    0   100M  0 part 
├─sda2   8:2    0  69.1G  0 part 
├─sda3   8:3    0  58.6G  0 part 
└─sda4   8:4    0     1K  0 part 
sdb      8:16   0 465.8G  0 disk 
├─sdb1   8:17   0   100M  0 part 
├─sdb2   8:18   0 257.4G  0 part /media/rick/ST9_Win7
├─sdb3   8:19   0     1K  0 part 
├─sdb5   8:21   0 200.5G  0 part 
└─sdb6   8:22   0   7.9G  0 part 
sdc      8:32   0 119.2G  0 disk 
├─sdc2   8:34   0  58.6G  0 part /mnt/5824BF4E76D68BE2
├─sdc3   8:35   0  29.3G  0 part /
└─sdc4   8:36   0   7.8G  0 part [SWAP]
sr0     11:0    1 695.9M  0 rom  
```

In summary Nautilus gives us a nice GUI into our partitions. It's very handy on this Laptop with three drives and many partitions.


  [1]: https://i.stack.imgur.com/v4Nn2.png
  [2]: {% post_url /2016/2016-10-10-How-do-I-hide-_-remove-a-partition-from-the-Nautilus-left-panel_ %}
