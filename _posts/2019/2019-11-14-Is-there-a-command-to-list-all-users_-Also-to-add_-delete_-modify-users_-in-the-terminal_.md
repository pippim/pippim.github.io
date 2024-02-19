---
layout:       post
title:        >
    Is there a command to list all users? Also to add, delete, modify users, in the terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188600
type:         Answer
tags:         command-line user-management
created_date: 2019-11-14 01:33:17
edit_date:    
votes:        "2 "
favorites:    
views:        "3,641,926 "
accepted:     
uploaded:     2024-02-19 10:38:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-14-Is-there-a-command-to-list-all-users_-Also-to-add_-delete_-modify-users_-in-the-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

The first answer recommends:

``` 
cut -d: -f1 /etc/passwd
```

But using this and counting number of users you get:

``` 
$ cut -d: -f1 /etc/passwd | wc -l
46
```

46 users for a laptop computer are a lot!. So use this instead:

``` 
$ cat /etc/passwd | grep -vE '(/bin/false|/sbin/nologin|/bin/sync)' | cut -d: -f1
root
rick
guest-atkb2q
guest-u4sf2i
guest-rmlbtg
guest-mz53vp
```

To remove guest accounts (who don't have saved files anyway) use:

``` 
$ cat /etc/passwd | grep -vE '(/bin/false|/sbin/nologin|/bin/sync|guest-)' | cut -d: -f1
root
rick

```
Some sample users removed from the listing are:

``` 
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
sync:x:4:65534:sync:/bin:/bin/sync
guest-atkb2q:x:999:999:Guest:/tmp/guest-atkb2q:/bin/bash
```

It turns out most of the users on a single user system are actually programs that have set themselves up as users.
