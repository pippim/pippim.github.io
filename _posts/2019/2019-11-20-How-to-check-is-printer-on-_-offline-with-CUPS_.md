---
layout:       post
title:        >
    How to check is printer on / offline with CUPS?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1190200
type:         Answer
tags:         printing cups-lpd
created_date: 2019-11-20 01:16:40
edit_date:    
votes:        "2 "
favorites:    
views:        "21,826 "
accepted:     
uploaded:     2025-08-18 11:20:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-20-How-to-check-is-printer-on-_-offline-with-CUPS_.md
toc:          false
navigation:   false
clipboard:    false
---

Use `lpstat` with the `-t` parameter:

``` 
$ lpstat -t
scheduler is running
system default destination: DCP-7065DN
device for DCP-7065DN: usb://Brother/DCP-7065DN?serial=<REDACTED>
DCP-7065DN accepting requests since Tue 19 Nov 2019 04:29:56 PM MST
printer DCP-7065DN is idle.  enabled since Tue 19 Nov 2019 04:29:56 PM MST
```

The system tells us the printer is accepting requests, eg "Good to go".
