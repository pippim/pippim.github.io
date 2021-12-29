---
layout:       post
title:        Uable to print after upgrading Ubuntu 16.04 to 18.04 (HP MFC-7470DW)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084100
type:         Answer
tags:         drivers usb printing brother cups-lpd
created_date: 2018-10-16 00:34:32
edit_date:    2018-10-21 17:18:14
votes:        2
favorites:    
views:        1,528
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
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

- https://askubuntu.com/questions/1080720/printer-filter-failed/1080926#1080926
- https://askubuntu.com/questions/1080558/printers-not-working-after-distribution-upgrade
- https://askubuntu.com/questions/1081885/printer-stopped-working-after-upgrade-16-04-to-18-04
- https://askubuntu.com/questions/1036429/ubuntu-18-04-printer-not-working-for-most-apps-pdf-evince-firefox
- https://askubuntu.com/questions/1081885/printer-stopped-working-after-upgrade-16-04-to-18-04?rq=1
- https://askubuntu.com/questions/1076529/brother-printer-printing-garbage-after-upgrade-to-18-04
- https://askubuntu.com/questions/1075136/epson-rx620-not-printing-since-upgrade-to-18-04-lts?noredirect=1&lq=1
- https://askubuntu.com/questions/1065068/ubuntu-18-04-lts-printing-service-not-available
- https://askubuntu.com/questions/1085872/upgraded-to-ubuntu-18-04-1-lts-now-cannot-print


  [1]: https://askubuntu.com/questions/1080720/printer-filter-failed/1080926#1080926
  [2]: https://askubuntu.com/questions/1028604/bash-script-to-clone-ubuntu-to-new-partition-for-testing-18-04-lts-upgrade/1028605#1028605
