---
layout:       post
title:        How can I ensure that binaries installed by my install script are executable?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/52357904
type:         Question
tags:         github
created_date: 2018-09-16 19:59:06
edit_date:    2018-09-16 20:13:42
votes:        1
favorites:    
views:        57
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

I've just created my first github repository: https://github.com/WinEunuuchs2Unix/eyesome

I've uploaded all the files but have concerns with how the end-user will copy them after download.

Here is the `copy-files` script (abridged) they would run:

<!-- Language-all: lang-bash -->

``` 
!/bin/sh

if [ $(id -u) != 0 ]; then # root powers needed to call this script
    echo >&2 $0 must be called with sudo powers
    exit 1
fi

cp -v ./eyesome.sh              /usr/local/bin/
cp -v ./eyesome-cfg.sh          /usr/local/bin/
cp -v ./eyesome-src.sh          /usr/local/bin/
cp -v ./eyesome-sun.sh          /usr/local/bin/
cp -v ./wake-eyesome.sh         /usr/local/bin/
cp -v ./start-eyesome           /etc/cron.d/
cp -v ./daily-eyesome-sun       /etc/cron.daily/
cp -v ./systemd-wake-eyesome    /lib/systemd/system-sleep/

exit 0

```

My first thought is after someone downloads the files none are marked as executable?

The `copy-files` script has a section for "uninstalling" that is inactive. Is this a common courtesy to provide?

Comments on further reading to improve my `github` and refine my `copy-files` code are also appreciated.
