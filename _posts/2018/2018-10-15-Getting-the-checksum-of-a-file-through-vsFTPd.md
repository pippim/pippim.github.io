---
layout:       post
title:        >
    Getting the checksum of a file through vsFTPd
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084076
type:         Answer
tags:         server ftp vsftpd
created_date: 2018-10-15 22:08:11
edit_date:    
votes:        "0 "
favorites:    
views:        "936 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

On your server have a cron job that runs daily in `/etc/cron.daily`. No special `crontab` magic needs to be done. Simply but an executable script there.

<!-- Language-all: lang-bash -->

Here is one I have handy already for calculating hash sums on files:

``` 
#!/bin/bash

    md5sum \
        install.sh \
        eyesome.sh \
        eyesome-cfg.sh \
        eyesome-src.sh \
        eyesome-sun.sh \
        wake-eyesome.sh \
        start-eyesome \
        daily-eyesome-sun \
        systemd-wake-eyesome \
        acpi-lid-eyesome.sh \
        acpi-lid-event-eyesome \
        eyesome-dbus.sh \
        > eyesome.md5

```

So you would download the file `eyesome.md5` to your remote machine.

``` 
$ cat eyesome.md5
2627fe73a1c99c1ec02a17002cf88dad  install.sh
62999343cd603c4bff70e890367739bb  eyesome.sh
c42766c412b31c45d814efea36c1021b  eyesome-cfg.sh
8e56b945b9173dee4cceecb1b111b28a  eyesome-src.sh
d70ca24ca2aea58b043d86e9bdd15c0e  eyesome-sun.sh
28b0fde9a98933fee0226c49350fdc6c  wake-eyesome.sh
712eff1f4ec14fbf04521674c32aa5b8  start-eyesome
0cdc4dbb0a383cd97f1e6d0744a6f8e4  daily-eyesome-sun
5a2abb831f31a7339270868ddd37f745  systemd-wake-eyesome
e06f195dcf254d65b4f8512d46e44458  acpi-lid-eyesome.sh
8ce2412bdb1bab4bca6e4921f9ae282b  acpi-lid-event-eyesome
54e3052f12ca33fc53e38b01d4dd05d6  eyesome-dbus.sh

```

**Note:** If your file names are prefixed with a path you may have to change it from the server's path to your local path with `sed`, `grep` or another utility.

Then run:

``` 
$ md5sum -c eyesome.md5
install.sh: OK
eyesome.sh: OK
eyesome-cfg.sh: OK
eyesome-src.sh: FAILED
eyesome-sun.sh: OK
wake-eyesome.sh: FAILED
start-eyesome: OK
daily-eyesome-sun: OK
systemd-wake-eyesome: OK
acpi-lid-eyesome.sh: OK
acpi-lid-event-eyesome: OK
eyesome-dbus.sh: OK
md5sum: WARNING: 2 computed checksums did NOT match

```

The files that fail (`eyesome-src.sh` and `wake-eyesome.sh`) you need to download.
