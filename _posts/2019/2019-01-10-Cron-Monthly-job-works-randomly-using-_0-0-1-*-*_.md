---
layout:       post
title:        >
    Cron Monthly job works randomly using `0 0 1 * *`
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1108457
type:         Answer
tags:         cron
created_date: 2019-01-10 03:09:32
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "881 "
accepted:     Accepted
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-01-10-Cron-Monthly-job-works-randomly-using-_0-0-1-*-*_.md
toc:          false
navigation:   false
clipboard:    false
---

The reason the job only ran on New Year's Eve is all the other first days of the month your machine was shut off at the stroke of midnight.

The easiest way is to not use `sudo crontab -e` but rather create a bash script in the directory `/etc/cron.monthly`. Make sure the script filename doesn't contain a `.` in it. Filenames containing a `.` such as `Monthly job.cron` or `MonthlyUpdate.sh` will not run.



In this case use:

``` bash
sudo -H gedit /etc/cron.monthly/journal_vacuum
```

Insert these lines:

``` sh
#!/bin/sh
#
# NAME: journal_vacuum
# DESC: Reduce size of system journals (journalctl) each month.
# DATE: January 9, 2019.

# NOTE: Replaces `0 0 1 * * /bin/journalctl --vacuum-size=200M` which
#       which only runs if machine is turned on at midnight.

/bin/journalctl --vacuum-size=200M
```

Save the file and exit `gedit`. Make the script executable using:

``` bash
sudo chmod a+x /etc/cron.monthly/journal_vacuum
```

Now the first time the machine is turned on each month, be it 1st day of month at 7:00am or even 2nd day of month the `cron` job will run.


----------

## Update 1

Once per month is unpredictable. The cron job was setup on January 9, 2019 and then ran on January 30, 2019:

[![monthly cron job.png][1]][1]

Hopefully the cron job runs again on Feb 1, 2019 as anticipated!

----------

## Update 2

The script in `/etc/cron.monthly/` did not run on February 1, 2019. Digging deeper I found this explanation:

- [\[SOLVED\] cron.monthly not running - everything else is][2]

Following the link's explanation I discovered:

``` bash
$ sudo cat /var/spool/anacron/cron.monthly
20190130
```

Therefore with `sudo` powers I used:

``` bash
rick@alien:~$ sudo -i
root@alien:~# echo 20190101 > /var/spool/anacron/cron.monthly
root@alien:~# exit
```

Now cron believes that last time `monthly` jobs were run is January 1, 2019.

Time to reboot and test...


----------

## Update 3

After reboot an email was almost instantly sent:

``` bash
Anacron <XxxxxXxxxx999@gmail.com>    7:45 AM (3 minutes ago)
to root, bcc: XxxxxXxxxx999

/etc/cron.monthly/journal_vacuum:
Vacuuming done, freed 0B of archived journals on disk.
```

Now we can see:

``` bash
$ sudo cat /var/spool/anacron/cron.monthly
20190203
```

The last step is to replace `20190203` with `20190201` using technique in **Update 2**.

  [1]: https://i.stack.imgur.com/c76pC.png
  [2]: https://www.linuxquestions.org/questions/linux-newbie-8/cron-monthly-not-running-everything-else-is-4175461238/


