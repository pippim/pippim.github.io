---
layout:       post
title:        >
    Where is "journalctl" data stored?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1083044
type:         Answer
tags:         log systemd systemd-journald
created_date: 2018-10-11 22:31:25
edit_date:    2021-08-02 18:46:52
votes:        "2 "
favorites:    
views:        "121,323 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-11-Where-is-_journalctl_-data-stored_.md
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

  [1]: {% post_url /2018/2018-02-21-How-to-find-previous-boot-log-after-Ubuntu-16.04_-restarts_ %}
  [2]: {% post_url /2018/2018-03-08-Systemd-logs-__journalctl__-are-too-large-and-slow %}
