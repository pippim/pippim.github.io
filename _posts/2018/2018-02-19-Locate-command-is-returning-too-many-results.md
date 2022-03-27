---
layout:       post
title:        >
    Locate command is returning too many results
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007525
type:         Question
tags:         command-line bash scripts duplicate duplicate-files
created_date: 2018-02-19 01:31:51
edit_date:    2018-03-30 00:24:24
votes:        "2 "
favorites:    
views:        "203 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-19-Locate-command-is-returning-too-many-results.md
toc:          false
navigation:   false
clipboard:    false
---

I made the mistake of copying the same files to different partitions with good intentions of pruning (deleting) them from the source or target(s) later. Now when I try to locate them I get too many results from `locate` command:

``` 
rick@alien:~$ locate "display-auto-brightness"
/etc/cron.d/display-auto-brightness
/home/rick/Pictures/display-auto-brightness conky.png
/home/rick/Pictures/display-auto-brightness systray.png
/home/rick/Pictures/display-auto-brightness-config 1.png
/home/rick/Pictures/ps display-auto-brightness.png
/lib/systemd/system-sleep/display-auto-brightness
/mnt/e/etc/cron.d/display-auto-brightness
/mnt/e/lib/systemd/system-sleep/display-auto-brightness
/mnt/e/usr/local/bin/display-auto-brightness
/usr/local/bin/display-auto-brightness
```

The `locate` command is automatically placing the `*` wild card after the search string and returning extra undesired results. The `.png` files should not be returned.

Why is `locate` returning too many results?
