---
layout:       post
title:        >
    How to find previous boot log after Ubuntu 16.04+ restarts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1008210
type:         Answer
tags:         16.04 boot logs systemd-journald
created_date: 2018-02-21 01:24:55
edit_date:    2019-01-16 02:50:51
votes:        "29 "
favorites:    
views:        "57,296 "
accepted:     Accepted
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-21-How-to-find-previous-boot-log-after-Ubuntu-16.04_-restarts_.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Reported as a bug that's an undocumented feature

There is a bug report filed on this [topic][1]. Because `rsyslog` already maintains multiple boot journals in `/var/log/syslog` and `syslog.1`, `.2.gz`, `.3.gz`... `syslog.7.gz` the developers felt keeping extra `journalctl` logs would waste disk space.

The bug report states on **January 3, 2018** that for new installs `rsyslog` will no longer be the default and that `journalctl` will keep multiple boot data logs.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Create multiple boot logs without reinstalling Ubuntu

Most of us won't do a new install so to enable multiple `journalctl` boot logs in which case we can use:

``` 
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
Cannot set file attribute for '/var/log/journal', value=0x00800000, mask=0x00800000: Operation not supported
```

According to this [github report][2] the warning message *"Cannot set file attribute"* can be ignored.

### Optional persistent storage setting

After using previous boot logging for many months I've [discovered another option][3] that can be set in `/etc/systemd/journald.conf`:

From [journald.conf man page][4]:

> Storage=  
>   
> Controls where to store journal data. One of "volatile", "persistent", "auto" and "none". If "volatile", journal log data will  
> be stored only in memory, i.e. below the /run/log/journal hierarchy  
> (which is created if needed). If "persistent", data will be stored  
> preferably on disk, i.e. below the `/var/log/journal` hierarchy (which  
> is created if needed), with a fallback to `/run/log/journal` (which is  
> created if needed), during early boot and if the disk is not writable.  
> "auto" is similar to "persistent" but the directory `/var/log/journal`  
> is not created if needed, so that its existence controls where log  
> data goes. "none" turns off all storage, all log data received will be  
> dropped. Forwarding to other targets, such as the console, the kernel  
> log buffer, or a syslog socket will still work however. Defaults to  
> "auto".  

In a nutshell remove the comment and revise the line to:

``` 
Storage=persistent
```




<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Display list of previous boots

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


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

## Display last boot log

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
lines 1-19
```

Pay close attention to the parameter `-b-1` it is different than other references you may see. From [man page][5]:

> `-b [ID][±offset], --boot=[ID][±offset]`  

> Show messages from a specific boot. This will add a match for "_BOOT_ID=".  

> The argument may be empty, in which case logs for the current boot will be shown.  

> If the boot ID is omitted, a positive offset will look up the boots starting from the beginning of the journal, and an equal-or-less-than zero offset will look up boots starting from the end of the journal. Thus, 1 means the first boot found in the journal in chronological order, 2 the second and so on; while -0 is the last boot, -1 the boot before last, and so on. An empty offset is equivalent to specifying -0, except when the current boot is not the last boot (e.g. because --directory was specified to look at logs from a different machine).  

Then every once in a while, with `cron` or [timers][6] you may clean [old logs][7]:

``` 
journalctl --vacuum-time=2d  # keep last two days or

journalctl --vacuum-size=300M  # keep last 300MB
```


  [1]: https://bugs.launchpad.net/ubuntu/+source/systemd/+bug/1618188
  [2]: https://github.com/systemd/systemd/issues/5607
  [3]: https://www.freedesktop.org/software/systemd/man/journald.conf.html
  [4]: http://www.freedesktop.org/software/systemd/man/journald.conf.html
  [5]: https://www.freedesktop.org/software/systemd/man/journalctl.html
  [6]: https://www.freedesktop.org/software/systemd/man/systemd.timer.html
  [7]: https://unix.stackexchange.com/a/194058/209677


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a></div>

