---
layout:       post
title:        >
    How do I find user login history?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138206
type:         Answer
tags:         security users vnstat
created_date: 2019-04-25 23:27:16
edit_date:    2019-04-25 23:51:10
votes:        "7 "
favorites:    
views:        "4,385 "
accepted:     
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-25-How-do-I-find-user-login-history_.md
toc:          false
navigation:   false
clipboard:    false
---

# `last` command to the rescue

The `last` command shows by a given user name or all user names:

``` 
$ last rick
rick     tty7         :0               Wed Apr 24 16:25    gone - no logout
rick     tty8         :1               Wed Apr 24 16:24 - down   (00:00)
rick     tty7         :0               Tue Apr 23 20:12 - down   (20:06)
rick     tty7         :0               Tue Apr 23 18:30 - crash  (01:42)
  (...SNIP...)
rick     tty7         :0               Tue Apr  2 16:52 - down   (00:31)
rick     tty7         :0               Tue Apr  2 03:14 - crash  (13:37)
```

By default it only shows history for the current month. If you need to go further back in history than one month, you can read the `/var/log/wtmp.1` file with the `last` command.

`last -f wtmp.1 rick` will show the previous month's history of logins for user `rick`:

``` 
$ last -f /var/log/wtmp.1 rick
rick     tty7         :0               Sun Mar 31 16:53    gone - no logout
rick     tty7         :0               Sat Mar 30 19:18 - down   (13:20)
  (...SNIP...)
rick     tty7         :0               Fri Mar  1 20:55 - down   (11:55)

wtmp.1 begins Fri Mar  1 18:23:28 2019
```


Security is hardened such that normal users can't write or delete the file:

``` 
$ ll /var/log/wtmp.1
-rw-rw-r-- 1 root utmp 107520 Mar 31 16:53 /var/log/wtmp.1
```

# Console only logins

The console uses the `login` command which records data to `/var/log/lastlog`:

``` 
$ ll /var/log/lastlog
-rw-rw-r-- 1 root utmp 292292 Apr 24 16:22 /var/log/lastlog
```

The `lastlog` file though cannot be tampered with so easily when you look at the File Owner and File Group above. "Normal" users just have read access. It's a binary file though so you can't just `cat` it and get meaningful information. Use this command instead:

``` 
$ lastlog
Username         Port     From             Latest
root                                       **Never logged in**
daemon                                     **Never logged in**
bin                                        **Never logged in**
sys                                        **Never logged in**
  (...SNIP...)
usbmux                                     **Never logged in**
rick             tty1                      Wed Nov 28 04:19:53 -0700 2018
vnstat                                     **Never logged in**
```

It's interesting to see all the different user IDs that could log in but never have and never should. I was surprised I haven't logged into the console / terminal since November last year.




