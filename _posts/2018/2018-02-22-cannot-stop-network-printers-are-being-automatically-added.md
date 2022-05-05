---
layout:       post
title:        >
    cannot stop network printers are being automatically added
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1008550
type:         Answer
tags:         printing 17.10
created_date: 2018-02-22 00:25:35
edit_date:    2020-06-12 14:37:07
votes:        "8 "
favorites:    
views:        "13,903 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-22-cannot-stop-network-printers-are-being-automatically-added.md
toc:          false
navigation:   false
clipboard:    false
---

This is the mega Q&A here in Ask Ubuntu for what you want to do: [How do I disable automatic remote printer installation?][1]. Indeed you've already completed many of the steps listed in many of the answers.

There is one answer though with another step to take. With your favourite editor and sudo powers, edit `/etc/avahi/avahi-daemon.conf` and insert below the `[server]` section this line:

``` 
enable-dbus=no
```

then restart the avahi-daemon service:

``` 
sudo service avahi-daemon stop
sudo service avahi-deamon start
```

Stop/Start is preferable in some instances as documented in [Unix & Linux][2].

# What has changed

The `cupsd` server is no longer used. So changing the "Browse" settings in the cups server won't work.

PS Please read the entire answer linked above for more information and the comments on 5 second delay posted below it.

PPS you have the exact same printer I have, Brother DCP-7065DN :)


  [1]: https://askubuntu.com/questions/345083/how-do-i-disable-automatic-remote-printer-installation/556963
  [2]: https://unix.stackexchange.com/questions/255197/how-to-disable-avahi-daemon-without-uninstalling-it
