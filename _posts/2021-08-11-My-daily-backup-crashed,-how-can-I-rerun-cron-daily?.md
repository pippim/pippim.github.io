---
layout:       post
title:        My daily backup crashed, how can I rerun cron daily?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1357286
type:         Answer
tags:         cron
created_date: 2021-08-11 01:29:10
edit_date:    
votes:        5
favorites:    
views:        342
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

This [answer](https://unix.stackexchange.com/a/245056/200094) is close but you really want to use:

``` 
sudo run-parts /etc/cron.daily

```

The linked answer omits `sudo` and my daily backup crashed again. This is because the same `.tar` work file (with errant 30 MB file) that was created with `sudo` privileges (which cron runs with) still existed. 

I had removed the "bad" 30 MB file but the earlier `.tar` file created by the original `cron` job was still about. My regular user privileges simply were insufficient to recreate a new `.tar` file.

If you call `run-parts` without `sudo` your environment is different. Using `sudo` for `run-parts` makes it work. In my case at least.
