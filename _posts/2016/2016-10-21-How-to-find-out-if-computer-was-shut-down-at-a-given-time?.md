---
layout:       post
title:        >
    How to find out if computer was shut down at a given time?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840031
type:         Answer
tags:         power-management shutdown schedule
created_date: 2016-10-21 10:45:17
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "347 "
accepted:     
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

# Use `syslog.1` to find hours system was running yesterday

If for example you wanted to know the hours your system was running yesterday you could use this command:

**rick@dell:~$** `grep cron.hourly /var/log/syslog.1`

``` 
Oct 20 04:17:01 dell CRON[16062]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 05:17:01 dell CRON[23665]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 18:17:01 dell CRON[11680]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 19:17:01 dell CRON[19789]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 20:17:01 dell CRON[16936]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 21:17:01 dell CRON[24757]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)
Oct 20 22:17:01 dell CRON[32481]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)

```

It shows us the system was active at 4 am and 5 am. Then it was active again at 6 pm, 7 pm, 8 pm, 9 pm and your magic number `10 pm` represented by "22:17:01".

This methodology requires knowledge of system log files stored in `/var/log` and some commands such as `cron` which can be setup to run hourly. You could search for other commands such as wifi, print jobs, etc.

My system is a laptop that doesn't actually shutdown but rather suspends and resumes when the lid is closed and opened so the solution needs to be different than the other answers offered so far.
