---
layout:       post
title:        >
    Automounted USB devices are read only
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1012264
type:         Answer
tags:         usb mount permissions
created_date: 2018-03-06 03:03:28
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "75,319 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-06-Automounted-USB-devices-are-read-only.md
toc:          false
navigation:   false
clipboard:    false
---

# Problem appears to have gone away

This is a 5 y/o question on short term release Ubuntu 12.10. The `dmesg` link is no longer available in the OP's question. But if I plug in a Ubuntu 18.04 Live USB with persistent storage `dmesg` reveals:

``` 
$ dmesg | tail -n18
[115528.249547] usb-storage 1-9:1.0: USB Mass Storage device detected
[115528.250152] scsi host2: usb-storage 1-9:1.0
[115528.250474] usbcore: registered new interface driver usb-storage
[115528.255685] usbcore: registered new interface driver uas
[115529.281407] scsi 2:0:0:0: Direct-Access     Verbatim STORE N GO       PMAP PQ: 0 ANSI: 6
[115529.282090] sd 2:0:0:0: Attached scsi generic sg1 type 0
[115529.992200] sd 2:0:0:0: [sdb] 30261248 512-byte logical blocks: (15.5 GB/14.4 GiB)
[115529.992998] sd 2:0:0:0: [sdb] Write Protect is off
[115529.993006] sd 2:0:0:0: [sdb] Mode Sense: 23 00 00 00
[115529.993787] sd 2:0:0:0: [sdb] No Caching mode page found
[115529.993797] sd 2:0:0:0: [sdb] Assuming drive cache: write through
[115530.592616]  sdb: sdb1 sdb2 sdb3 sdb4 sdb5
[115530.596279] sd 2:0:0:0: [sdb] Attached SCSI removable disk
[115531.018019] EXT4-fs (sdb5): warning: mounting unchecked fs, running e2fsck is recommended
[115531.470201] EXT4-fs (sdb5): mounted filesystem without journal. Opts: (null)
[115531.480738] ISO 9660 Extensions: Microsoft Joliet Level 3
[115531.483397] ISO 9660 Extensions: Microsoft Joliet Level 3
[115531.512219] ISO 9660 Extensions: RRIP_1991A
```

Unlike OP implies, there is no warning for read-only. Notice the line:

> **sd 2:0:0:0: [sdb] Write Protect is off**  

Apparently whatever the problem was 5 years ago, it no longer exists today under **Ubuntu 16.04 LTS**. Also for the only other LTS version today, **14.04** I can't remember this being a problem either. Only SD RAM cards come to mind as being read only, which is a different problem altogether.
