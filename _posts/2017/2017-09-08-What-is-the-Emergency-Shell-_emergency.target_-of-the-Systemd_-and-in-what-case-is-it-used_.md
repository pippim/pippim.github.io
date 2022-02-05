---
layout:       post
title:        >
    What is the Emergency Shell (emergency.target) of the Systemd, and in what case is it used?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/954081
type:         Answer
tags:         command-line systemd
created_date: 2017-09-08 23:54:30
edit_date:    
votes:        "4 "
favorites:    
views:        "3,070 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-09-08-What-is-the-Emergency-Shell-_emergency.target_-of-the-Systemd_-and-in-what-case-is-it-used_.md
toc:          false
navigation:   false
clipboard:    false
---

Bonjour. The best write up comes from [Red Hat][1].

The first step in severe problem resolution is rescue mode initiated with:

``` 
~]# systemctl rescue

Broadcast message from root@localhost on pts/0 (Fri 2013-10-25 18:23:15 CEST):

The system is going down to rescue mode NOW!
```

However there are times where `rescue mode` doesn't work and you have to enter `emergency` mode. This mounts foot file system as `read-only`, doesn't mount any other local file systems and doesn't enable network connections. To enter emergency mode use:

``` 
systemctl emergency
```

This is an abbreviated summary so please read the Red Hat link for more detailed `systemd` usage.

All-in-all I think we all hope we never have to use `rescue` target in the first place or `emergency` target second place.

  [1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Targets.html
