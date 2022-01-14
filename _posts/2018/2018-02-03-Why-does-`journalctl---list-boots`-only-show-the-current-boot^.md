---
layout:       post
title:        >
    Why does `journalctl --list-boots` only show the current boot?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1002525
type:         Answer
tags:         boot kernel systemd systemd-journald
created_date: 2018-02-03 01:33:54
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "9,276 "
accepted:     Accepted
uploaded:     2022-01-14 05:03:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-03-Why-does-`journalctl---list-boots`-only-show-the-current-boot^.md
toc:          false
navigation:   false
clipboard:    false
---

# Reported as a bug that's an undocumented feature

There is a bug report filed on this [topic][1]. Because `rsyslog` already maintains multiple boot journals in `/var/log/syslog` and `syslog.1`, `.2.gz`, `.3.gz`... `syslog.7.gz` the developers felt keeping extra `journalctl` logs would waste disk space.

The bug report states on **January 3, 2018** that for new installs `rsyslog` will no longer be the default and that `journalctl` will keep multiple boot data logs.

## Create multiple boot logs without reinstalling Ubuntu

Most of us won't do a new install so to enable multiple `journalctl` boot logs use:

``` 
sudo mkdir -p /var/log/journal
sudo systemd-tmpfiles --create --prefix /var/log/journal
Cannot set file attribute for '/var/log/journal', value=0x00800000, mask=0x00800000: Operation not supported

```

According to this [github report][2] the warning message on attributes can be ignored.

Interesting new flag `s` instead of the familiar `x` (executable bit) in the file permissions of the newly created directory:

``` 
$ ll /var/log/journal
total 8
drwxr-sr-x+  2 root systemd-journal 4096 Feb  2 18:18 ./
drwxrwxr-x  15 root syslog          4096 Feb  2 18:18 ../

```


----------

# Update 3 weeks later

``` 
$ journalctl --list-boots
-15 58a9e56135564cd8a52d547b19e76bf5 Fri 2018-02-02 18:34:35 MST—Fri 2018-02-02 23:07:14 M
-14 3514e056440341b1b6e5f03d109681bc Sat 2018-02-03 06:05:12 MST—Sat 2018-02-03 08:07:44 M
-13 0d1a32dc275348589f5ecdc72180c018 Sat 2018-02-03 08:08:05 MST—Sat 2018-02-03 08:08:34 M
-12 74159b593f3a401589ee6bd78e31684b Sat 2018-02-03 08:08:51 MST—Sun 2018-02-04 08:32:09 M
-11 4b394a9aad584ab2bfabe3b77eeed78f Sun 2018-02-04 08:32:26 MST—Mon 2018-02-05 16:54:02 M
-10 8e461ed2593c4fd896ca3b71eb3c0fba Mon 2018-02-05 16:54:34 MST—Tue 2018-02-06 03:54:30 M
 -9 ec7ba0e4dfe241c0b9c978d278fcca6d Tue 2018-02-06 03:54:47 MST—Tue 2018-02-06 16:25:02 M
 -8 b5c110267c214c38b63d0a367197d118 Tue 2018-02-06 16:25:19 MST—Thu 2018-02-08 16:49:03 M
 -7 75c3b117ac6a4de984dc3ced15edb7f8 Thu 2018-02-08 16:49:22 MST—Fri 2018-02-09 03:51:09 M
 -6 7338bd1007bc42dda5c8667eeefe1a59 Fri 2018-02-09 03:51:26 MST—Fri 2018-02-09 16:55:52 M
 -5 4b6cd0121327454ca3db035c7ed42df6 Fri 2018-02-09 16:56:09 MST—Sat 2018-02-10 07:55:14 M
 -4 0d56207f9ec0405ca3a3fd638334de2f Sat 2018-02-10 07:55:32 MST—Mon 2018-02-12 22:16:05 M
 -3 0f230cc546fd4aec8f5233e0074ab3e1 Tue 2018-02-13 03:57:20 MST—Wed 2018-02-14 22:58:56 M
 -2 c0d2c0141dd840cbab75d3c2254f8781 Wed 2018-02-14 22:59:13 MST—Sat 2018-02-17 22:46:14 M
 -1 aafb2573a6374e019a7165cb8eee74a0 Sun 2018-02-18 06:02:03 MST—Mon 2018-02-19 04:16:36 M
  0 8462f1969c6f4d61973e7e245014b846 Mon 2018-02-19 04:16:53 MST—Wed 2018-02-21 04:07:07 M
`lines 1-16/16 (END)`
```



  [1]: https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1618188
  [2]: https://github.com/systemd/systemd/issues/5607

