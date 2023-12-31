---
layout:       post
title:        >
    Where do log messages go with journald and rsyslog
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192179
type:         Answer
tags:         server logging syslog rsyslog systemd-journald
created_date: 2019-11-28 04:26:40
edit_date:    2019-11-29 11:54:53
votes:        "1 "
favorites:    
views:        "7,755 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-28-Where-do-log-messages-go-with-journald-and-rsyslog.md
toc:          false
navigation:   false
clipboard:    false
---

# Message storage locations

## journald message storage

When it's time to clean up older messages in `journald` (I do it monthly) you can see the files where messages are stored:

``` 
Deleted archived journal /var/log/journal/1ff17e6df1874fb3b2a75e669fa978f1/system@00059368465fc63c-5ca08f36fa6e6f04.journal~ (32.0M).
Deleted archived journal /var/log/journal/1ff17e6df1874fb3b2a75e669fa978f1/user-1000@0005936848a6d1ec-316ff74be646031e.journal~ (8.0M).
```

As you can see the file names are very long and cryptic.

## syslog message storage

`syslog` messages are kept in a more traditional filename format:

``` 
$ ll /var/log/syslog*
-rw-r----- 1 syslog adm   2161 Nov 29 04:47 /var/log/syslog
-rw-r----- 1 syslog adm 159700 Nov 29 04:32 /var/log/syslog.1
-rw-r----- 1 syslog adm  24466 Nov 28 04:27 /var/log/syslog.2.gz
-rw-r----- 1 syslog adm  23489 Nov 27 04:30 /var/log/syslog.3.gz
-rw-r----- 1 syslog adm  28087 Nov 26 04:28 /var/log/syslog.4.gz
-rw-r----- 1 syslog adm  28300 Nov 25 04:30 /var/log/syslog.5.gz
-rw-r----- 1 syslog adm  27445 Nov 24 05:36 /var/log/syslog.6.gz
-rw-r----- 1 syslog adm  27460 Nov 23 08:25 /var/log/syslog.7.gz
```

The filenames ending in `.gz` have compressed data to save space on disk.

----------


# Messages recorded are not the same

A quick test reveals the two message logging systems aren't exact duplicates. We'll put a message into the system with `logger` command and then search for it and display the five lines before it.

<code><pre>$ logger $0 "<b>ygoe</b> to two logs?"

$ cat /var/log/syslog | grep <b>ygoe</b> -a5
Nov 27 20:53:35 alien upowerd[2032]: message repeated 3 times: [ (upowerd:2032): UPower-Linux-WARNING **: treating change event as add on /sys/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.017E/0003:046D:101A.017F/power_supply/hidpp_battery_63]
Nov 27 20:54:23 alien upowerd[2032]: (upowerd:2032): UPower-Linux-WARNING **: treating change event as add on /sys/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.017E/0003:046D:2010.0180/power_supply/hidpp_battery_64
Nov 27 20:59:25 alien wpa_supplicant[1591]: wlp60s0: WPA: Group rekeying completed with ae:20:2e:cc:94:50 [GTK=CCMP]
Nov 27 21:00:02 alien CRON[24890]: (root) CMD (/usr/bin/updatedb)
Nov 27 21:07:48 alien upowerd[2032]: (upowerd:2032): UPower-Linux-WARNING **: treating change event as add on /sys/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.017E/0003:046D:2010.0180/power_supply/hidpp_battery_64
Nov 27 21:08:22 alien rick: bash <b>ygoe</b> to two logs?

$ journalctl -xe | grep <b>ygoe</b> -a5
Nov 27 20:59:25 alien wpa_supplicant[1591]: wlp60s0: WPA: Group rekeying completed with ae:20:2e:cc:94:50 [GTK=CCMP]
Nov 27 21:00:01 alien CRON[24881]: pam_unix(cron:session): session opened for user root by (uid=0)
Nov 27 21:00:01 alien CRON[24890]: (root) CMD (/usr/bin/updatedb)
Nov 27 21:00:04 alien CRON[24881]: pam_unix(cron:session): session closed for user root
Nov 27 21:07:48 alien upowerd[2032]: (upowerd:2032): UPower-Linux-WARNING **: treating change event as add on /sys/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.017E/0003:046D:2010.0180/power_supply/hidpp_battery_64
Nov 27 21:08:22 alien rick[8000]: bash <b>ygoe</b> to two logs?
</code></pre>

As you can see `journalctl` provides more details than `syslog`. Additionally `journalctl`:

- gives you more control on searches.
- Provides quicker multiple boot log access (once you enable it: https://askubuntu.com/questions/765315/how-to-find-previous-boot-log-after-ubuntu-16-04-restarts)
- More options for controlling size of logs: [Systemd logs (`journalctl`) are too large and slow]({% post_url /2018/2018-03-08-Systemd-logs-__journalctl__-are-too-large-and-slow %})

There was debate among developers about duplicating `journald` and `syslog` a few years  ago however, I couldn't find the link just now.

