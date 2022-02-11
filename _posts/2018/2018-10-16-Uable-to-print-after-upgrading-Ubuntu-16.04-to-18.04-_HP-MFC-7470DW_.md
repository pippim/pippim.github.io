---
layout:       post
title:        >
    Uable to print after upgrading Ubuntu 16.04 to 18.04 (HP MFC-7470DW)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084100
type:         Answer
tags:         drivers usb printing brother cups-lpd
created_date: 2018-10-16 00:34:32
edit_date:    2018-10-21 17:18:14
votes:        "2 "
favorites:    
views:        "1,540 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-16-Uable-to-print-after-upgrading-Ubuntu-16.04-to-18.04-_HP-MFC-7470DW_.md
toc:          false
navigation:   false
clipboard:    false
---

I tried [this answer][1] which worked for some:

``` 
sudo rmdir /usr/share/ghostscript/9.25/iccprofiles
sudo apt-get install --reinstall libgs9-common 
```

But it didn't work for me with Brother DCP-7065DN printer after fresh [cloning of 16.04][2] and upgrade to 18.04 on October 14, 2018.

## After reboot works

Purging the ghost scripts works, but not until you reboot. Then **even before you sign on**, everything that failed to print previously, suddenly prints out.

**This is a huge security issue!** Imagine a manager tries to print sensitive documents after 18.04 upgrade and it fails. The manager gives up and goes off to call Tech Support. Another user reboots the computer and even before they sign on the manager's reports spit out for the unauthorized employee to see.

After initial reboot I was able to print normally.

## Others with similar problems

Many people are having problems printing after 16.04 to 18.04 upgrade:

- [this answer](this answer)
- [printers not working after distribution upgrade](printers not working after distribution upgrade)
- [Printer stopped working after upgrade 16.04 to 18.04](Printer stopped working after upgrade 16.04 to 18.04)
- [Ubuntu 18.04: Printer not working for most apps (PDF, evince, Firefox...)](Ubuntu 18.04: Printer not working for most apps (PDF, evince, Firefox...))
- [Printer stopped working after upgrade 16.04 to 18.04](Printer stopped working after upgrade 16.04 to 18.04)
- [Brother Printer printing garbage after upgrade to 18.04](Brother Printer printing garbage after upgrade to 18.04)
- [Epson RX620 not printing since upgrade to 18.04 LTS](Epson RX620 not printing since upgrade to 18.04 LTS)
- [Ubuntu 18.04 LTS -- Printing Service Not Available](Ubuntu 18.04 LTS -- Printing Service Not Available)
- [Upgraded to Ubuntu 18.04.1 LTS now cannot print](Upgraded to Ubuntu 18.04.1 LTS now cannot print)


  [1]: https://askubuntu.com/questions/1080720/printer-filter-failed/1080926#1080926
  [2]: {% post_url /2018/2018-04-27-Bash-script-to-backup_clone-Ubuntu-to-another-partition %}
