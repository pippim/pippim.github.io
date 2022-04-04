---
layout:       post
title:        >
    Systemd logs (`journalctl`) are too large and slow
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1012913
type:         Answer
tags:         command-line performance disk-usage systemd systemd-journald
created_date: 2018-03-08 01:13:36
edit_date:    2022-03-16 16:06:55
votes:        "90 "
favorites:    
views:        "47,860 "
accepted:     Accepted
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-08-Systemd-logs-__journalctl__-are-too-large-and-slow.md
toc:          false
navigation:   false
clipboard:    true
---

# `systemd` comes with a nifty vacuum cleaner

To limit log files to a specific size `systemd` provides a `vacuum` feature to "suck out" older information from log files. The parameters allowed are:

``` 
 --vacuum-size=BYTES   Reduce disk usage below specified size
 --vacuum-files=INT    Leave only the specified number of journal files
 --vacuum-time=TIME    Remove journal files older than specified time
```


For example to reduce 312 MB consumption down to 200 MB (or less) use:

``` 
$ journalctl --vacuum-size=200M
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system@00056515dbdd9a4e-a6fe2ec77e516045.journal~ (56.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-65534@00056515dbfe731d-b7bab56cb4efcbf6.journal~ (8.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-1000@1bbb77599cf14c65a18af51646751696-000000000000064f-00056444d58433e1.journal (112.0M).
Vacuuming done, freed 176.0M of archived journals on disk.
```

# Disk Space saved

The `journalctl` size is reduced substantially:

``` 
$ journalctl --disk-usage
Archived and active journals take up 136.0M on disk.
```

Size has dropped from 312 MB to 136 MB a savings of 176 MB and 64 MB more than expected. This is probably a one time anomaly due to an extraordinary large single log file. I'll revise this answer after a month if new info arises.

# Boot Logs reduced

The number of `journalctl` boot logs was 32 but now it is reduced to 26:

{% include copyHeader.html %}
``` 
$ journalctl --list-boots
-26 0f230cc546fd4aec8f5233e0074ab3e1 Tue 2018-02-13 03:57:20 MST—Wed 2018-02-14 
-25 c0d2c0141dd840cbab75d3c2254f8781 Wed 2018-02-14 22:59:13 MST—Sat 2018-02-17 
-24 aafb2573a6374e019a7165cb8eee74a0 Sun 2018-02-18 06:02:03 MST—Mon 2018-02-19 
-23 8462f1969c6f4d61973e7e245014b846 Mon 2018-02-19 04:16:53 MST—Sat 2018-02-24 
-22 7f71ac2fb9714c49aa05989b741655f2 Sat 2018-02-24 04:24:36 MST—Sat 2018-02-24 
-21 b12a48c363474e5fb39311a166a98d54 Sat 2018-02-24 04:28:09 MST—Sun 2018-02-25 
-20 fbef1e659de64a0cbdcb9994f5a39457 Sun 2018-02-25 17:48:20 MST—Mon 2018-02-26 
-19 3d9b4c10f98d4ef7aab1cb2baa9b74e1 Mon 2018-02-26 08:37:01 MST—Mon 2018-02-26 
-18 4412b117dcc648aa9eceabcd0f205207 Mon 2018-02-26 08:38:00 MST—Mon 2018-02-26 
-17 f6794cbb7fb24213a6f2c3e368f666a1 Mon 2018-02-26 08:39:12 MST—Mon 2018-02-26 
-16 472f968506ed446ab12cf7abc65fa81a Mon 2018-02-26 08:49:37 MST—Mon 2018-02-26 
-15 d575c609d82e4ecd8dcebb70d40160d7 Mon 2018-02-26 17:07:36 MST—Mon 2018-02-26 
-14 878cfd9239a84dae80c62e7413c72951 Mon 2018-02-26 17:24:54 MST—Mon 2018-02-26 
-13 7f9913c7dbff46ab9bbd7c2cbefc4d7d Mon 2018-02-26 17:35:19 MST—Mon 2018-02-26 
-12 bf90829ef13a4e9fa1794bf0a88f4033 Mon 2018-02-26 17:45:12 MST—Wed 2018-02-28 
-11 fb879a836c7c459ab27f6332bee6013b Wed 2018-02-28 03:56:29 MST—Wed 2018-02-28 
-10 b0fec230765046f5bf3d654db1dc13ee Wed 2018-02-28 20:03:15 MST—Thu 2018-03-01 
 -9 72a2d6789eab4396be16348d9ead0408 Thu 2018-03-01 03:58:25 MST—Fri 2018-03-02 
 -8 8bccdc9b16124d26af05c34c8a30a0f5 Fri 2018-03-02 16:54:36 MST—Sat 2018-03-03 
 -7 40c2875db30349f5a9b1dfc849a47c05 Sat 2018-03-03 10:03:48 MST—Sat 2018-03-03 
 -6 781c79d2ec7946afba0fa2300e8ebe56 Sat 2018-03-03 10:04:34 MST—Sat 2018-03-03 
 -5 bb66dc875e414021940b7233072516d2 Sat 2018-03-03 17:43:08 MST—Tue 2018-03-06 
 -4 ba3bcfdc71584757b8bef9df16e7b0f6 Tue 2018-03-06 16:56:36 MST—Tue 2018-03-06 
 -3 60faa0fda99a4ef4b14b73c412d69e50 Tue 2018-03-06 17:00:47 MST—Tue 2018-03-06 
 -2 9b317bb8403344ca84dd2f288bc90410 Tue 2018-03-06 17:02:15 MST—Tue 2018-03-06 
 -1 dcb126be665a4531aae4312af7e51a34 Tue 2018-03-06 17:09:00 MST—Tue 2018-03-06 
  0 6a105af650d5442a9b03004165e58adf Tue 2018-03-06 17:42:45 MST—Wed 2018-03-07 
```

# Performance improved

The time to verify `journalctl` integrity is noticeably quicker:

[![journalctl verify 2.png][1]][1]

Time has reduced from 10 seconds down to 4 seconds.

## Credit to this [Source][2]


----------

# Long Term Solutions

I've created a `cron` job to run the vacuum cleaner once a month.

Another option as mentioned in comments is to set `SystemMaxUse=50M` in `/etc/systemd/journald.conf`. There are actually four different places you can set the option:

``` 
/etc/systemd/journald.conf
/etc/systemd/journald.conf.d/*.conf
/run/systemd/journald.conf.d/*.conf
/usr/lib/systemd/journald.conf.d/*.conf
```

There are actually [many options][3] you can use for similar goals:

``` 
SystemMaxUse=, SystemKeepFree=, SystemMaxFileSize=, SystemMaxFiles=, RuntimeMaxUse=, RuntimeKeepFree=, RuntimeMaxFileSize=, RuntimeMaxFiles=
```

reload conf:

``` 
$ sudo systemctl reload systemd-journald
```

  [1]: https://i.stack.imgur.com/o4SoS.gif
  [2]: https://www.loggly.com/ultimate-guide/managing-journal-size/
  [3]: https://www.freedesktop.org/software/systemd/man/journald.conf.html
