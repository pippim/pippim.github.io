---
layout:       post
title:        Where is "journalctl" data stored?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1083044
type:         Answer
tags:         log systemd systemd-journald
created_date: 2018-10-11 22:31:25
edit_date:    2021-08-02 18:46:52
votes:        2
favorites:    
views:        112,672
accepted:     
uploaded:     2021-12-28 19:30:13
toc:          false
navigation:   false
clipboard:    false
---

In addition to Muru's answer on where data is stored there are other relevant answers.

### [How to increase `journalctl` to find previous boot logs][1]

``` 
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal

```

### [How to keep `journalctl` file size down][2]

``` 
$ sudo journalctl --vacuum-size=200M
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system@00056515dbdd9a4e-a6fe2ec77e516045.journal~ (56.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-65534@00056515dbfe731d-b7bab56cb4efcbf6.journal~ (8.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-1000@1bbb77599cf14c65a18af51646751696-000000000000064f-00056444d58433e1.journal (112.0M).
Vacuuming done, freed 176.0M of archived journals on disk.

```

  [1]: https://askubuntu.com/questions/765315/how-to-find-previous-boot-log-after-ubuntu-16-04-restarts/1008210#1008210
  [2]: https://askubuntu.com/questions/1012912/systemd-logs-journalctl-are-too-large-and-slow/1012913#1012913
