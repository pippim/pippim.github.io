---
layout:       post
title:        >
    How do you manage journald log history on ubuntu core 16
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1039213
type:         Answer
tags:         ubuntu-core
created_date: 2018-05-23 00:23:03
edit_date:    2018-05-23 22:45:51
votes:        "1 "
favorites:    
views:        "1,007 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-23-How-do-you-manage-journald-log-history-on-ubuntu-core-16.md
toc:          false
navigation:   false
clipboard:    true
---

For multiple boot logs ([How to find previous boot log after Ubuntu 16.04 restarts?][1]) you don't need read/write access to `/etc`. You need read/write access to `/var/log` which you should have already.

To summarize the link:

``` 
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
```


### Display list of previous boots

After boot history has accumulated, use:

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
  0 8462f1969c6f4d61973e7e245014b846 Mon 2018-02-19 04:16:53 MST—Tue 2018-02-20 18:51:42 M
```

### Display last boot log

{% include copyHeader.html %}
``` 
$ journalctl -b-1
-- Logs begin at Fri 2018-02-02 18:34:35 MST, end at Thu 2018-03-01 16:43:25 MST. --
Feb 28 20:03:15 alien systemd-journald[290]: Runtime journal (/run/log/journal/) is 8.0M, 
Feb 28 20:03:15 alien kernel: Linux version 4.14.23-041423-generic (kernel@kathleen) (gcc 
Feb 28 20:03:15 alien kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-4.14.23-041423-generi
Feb 28 20:03:15 alien kernel: KERNEL supported cpus:
Feb 28 20:03:15 alien kernel:   Intel GenuineIntel
Feb 28 20:03:15 alien kernel:   AMD AuthenticAMD
Feb 28 20:03:15 alien kernel:   Centaur CentaurHauls
Feb 28 20:03:15 alien kernel: x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point
Feb 28 20:03:15 alien kernel: x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'
Feb 28 20:03:15 alien kernel: x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'
Feb 28 20:03:15 alien kernel: x86/fpu: Supporting XSAVE feature 0x008: 'MPX bounds registe
Feb 28 20:03:15 alien kernel: x86/fpu: Supporting XSAVE feature 0x010: 'MPX CSR'
Feb 28 20:03:15 alien kernel: x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256
Feb 28 20:03:15 alien kernel: x86/fpu: xstate_offset[3]:  832, xstate_sizes[3]:   64
Feb 28 20:03:15 alien kernel: x86/fpu: xstate_offset[4]:  896, xstate_sizes[4]:   64
Feb 28 20:03:15 alien kernel: x86/fpu: Enabled xstate features 0x1f, context size is 960 b
Feb 28 20:03:15 alien kernel: e820: BIOS-provided physical RAM map:
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000000000000-0x0000000000057fff] usabl
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000000058000-0x0000000000058fff] reser
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000000059000-0x000000000009dfff] usabl
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x000000000009e000-0x000000000009ffff] reser
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000000100000-0x0000000030a5ffff] usabl
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030a60000-0x0000000030a71fff] reser
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030a72000-0x0000000030a89fff] usabl
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030a8a000-0x0000000030a8afff] ACPI 
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030a8b000-0x0000000030ad4fff] reser
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030ad5000-0x0000000030b2dfff] usabl
Feb 28 20:03:15 alien kernel: BIOS-e820: [mem 0x0000000030b2e000-0x0000000031099fff] reser
lines 1-29
```

Pay close attention to the parameter `-b-1` it is different than other references you may see.

### Keep log file size down with `vacuum`

I have a monthly `cron` job setup to keep log files down to 200MB in size: [Systemd logs (`journalctl`) are too large and slow]({% post_url /2018/2018-03-08-Systemd-logs-_`journalctl`_-are-too-large-and-slow %}). This not only decreases storage requirements but speeds up search across all boot logs.


For example to reduce 312 MB consumption down to 200 MB (or less) use:

``` 
$ journalctl --vacuum-size=200M
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system@00056515dbdd9a4e-a6fe2ec77e516045.journal~ (56.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-65534@00056515dbfe731d-b7bab56cb4efcbf6.journal~ (8.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-1000@1bbb77599cf14c65a18af51646751696-000000000000064f-00056444d58433e1.journal (112.0M).
Vacuuming done, freed 176.0M of archived journals on disk.
```


  [1]: {% post_url /2018/2018-02-21-How-to-find-previous-boot-log-after-Ubuntu-16.04_-restarts_ %}

