---
layout:       post
title:        >
    can't mount any partitions from Live USB on HP Laptop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1244699
type:         Answer
tags:         dual-boot partitioning mount
created_date: 2020-05-28 22:49:39
edit_date:    
votes:        "1 "
favorites:    
views:        "188 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in comments the SSD partition attempting to mount is a Windows partition. For that to work you need `ntfs-3g` package installed. To successfully install packages to a Live USB it needs to be a persistent Live USB:

- [https://askubuntu.com/questions/772744/how-to-make-a-live-usb-persistent/815493#815493](https://askubuntu.com/questions/772744/how-to-make-a-live-usb-persistent/815493#815493)
- [https://askubuntu.com/questions/397481/how-to-make-a-persistent-live-ubuntu-usb-with-more-than-4gb/438734#438734](https://askubuntu.com/questions/397481/how-to-make-a-persistent-live-ubuntu-usb-with-more-than-4gb/438734#438734)
