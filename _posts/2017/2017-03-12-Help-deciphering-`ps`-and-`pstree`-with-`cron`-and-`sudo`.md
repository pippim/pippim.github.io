---
layout:       post
title:        >
    Help deciphering `ps` and `pstree` with `cron` and `sudo`
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/892141
type:         Answer
tags:         command-line bash cron windows-subsystem-for-linux ps
created_date: 2017-03-12 01:03:36
edit_date:    2017-04-13 12:23:52
votes:        "0 "
favorites:    
views:        "1,047 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

Thanks to this Q&A ([how to kill a cron job if it doesn&#39;t show in ps? or get it to show in ps?][1]) I was set on the right path:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ ps wwuxa |grep display-auto | grep -v grep
root      1584  0.0  0.0   4508   780 ?        Ss   14:02   0:00 /bin/sh -c    /usr/local/bin/display-auto-brightness
root      1592  0.0  0.0  12564  2984 ?        S    14:02   0:00 /bin/bash /usr/local/bin/display-auto-brightness
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ pstree -p -g | grep display-auto
             |-cron(1376,1376)---cron(1436,1376)---sh(1584,1584)---display-auto-br(1592,1584)---sleep(16989,1584)
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ 

```

Killing cron (with pid's 1376 and 1436) is probably a bad idea. However killing bash shell (1584) which is the parent to ***display-auto-brightness*** (1592) and grandparent to ***sleep*** (16989) should kill the child and grandchild. Then two copies of the child process (display-auto-brightness) won't be running at the same time.

Now comes the challenge of programming the script but at least now I know how to extract the information.

  [1]: https://askubuntu.com/questions/100244/how-to-kill-a-cron-job-if-it-doesnt-show-in-ps-or-get-it-to-show-in-ps
