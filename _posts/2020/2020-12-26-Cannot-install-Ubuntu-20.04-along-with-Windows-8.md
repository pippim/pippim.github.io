---
layout:       post
title:        >
    Cannot install Ubuntu 20.04 along with Windows 8
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1302977
type:         Answer
tags:         dual-boot 20.04 windows-8 usb-installation
created_date: 2020-12-26 17:54:09
edit_date:    
votes:        "0 "
favorites:    
views:        "369 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-26-Cannot-install-Ubuntu-20.04-along-with-Windows-8.md
toc:          false
navigation:   false
clipboard:    false
---

Boot into BIOS and ensure your 750GB drive is visible. See: [How to change boot priority?](How to change boot priority?)0 as a reference.

If it's visible in BIOS then try `testdisk` to see if it can be repaired. I could not find **exact** instructions. But I found related instructions [here][1]:

## Step 1 - Boot on a liveCD or liveUSB

Boot your computer on a Ubuntu live-CD or live-USB, then choose "Try Ubuntu".

## Step 2 - Install TestDisk in the live-session

Once in the Ubuntu live session, install TestDisk this way:

- Connect internet
- Open the Software Center, in the top bar click Edit -> Software Sources -> enable the Universe repository
- Open a terminal (Ctrl+Alt+T) and type : 

``` 
sudo apt-get update

sudo apt-get install -y testdisk && sudo testdisk
```

## Step 3 - Use TestDisk

- Via the arrows and the Enter key, go to the [No log] menu,
- then select the disk where the broken partition is,
- then select [Proceed],
- then choose the type of partition (generally [Intel]),
- then[Advanced],
- then select the broken partition with [Boot], it will display something like : 

``` 
 Boot sector
 Status: Bad

 Backup boot sector
 Status: OK

 Sectors are not identical.

 A valid NTFS Boot sector must be present in order to access
 any data; even if the partition is not bootable.

 [  List  ]  [Backup BS]  [Rebuild BS]  [  Dump  ]
```

7. Check that you have "Status ok" below "Backup boot sector"

8. select [Backup BS].

Done 


----------

As mentioned these are not **exact** instructions. If you get stuck at a certain point when adapting these instructions to repair your disk, you can update your question.



  [1]: https://help.ubuntu.com/community/BootSectorFix
