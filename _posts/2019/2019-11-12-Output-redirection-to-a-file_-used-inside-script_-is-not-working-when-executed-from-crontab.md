---
layout:       post
title:        >
    Output redirection to a file, used inside script, is not working when executed from crontab
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188181
type:         Answer
tags:         scripts cron
created_date: 2019-11-12 14:45:00
edit_date:    
votes:        "1 "
favorites:    
views:        "3,393 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-12-Output-redirection-to-a-file_-used-inside-script_-is-not-working-when-executed-from-crontab.md
toc:          false
navigation:   false
clipboard:    false
---

`logs/testpad1.log` will behave differently depending on your current directory. It can also behave differently depending if `cron` is running as root or you are calling the script from your terminal.

The safe (and usually error correcting) thing to do is hard code the full path into the file name:

``` 
/home/me/scripts/logs/testpad1.log
/var/log/testpad1.log
```
