---
layout:       post
title:        >
    Is systemctl daemon-reload equal systemctl restart service?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021780
type:         Answer
tags:         16.04 services
created_date: 2018-04-04 03:26:00
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "40,098 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-04-Is-systemctl-daemon-reload-equal-systemctl-restart-service_.md
toc:          false
navigation:   false
clipboard:    false
---

## No

From `man systemctl` (perhaps the longest man page in the world):

``` 
Manager Lifecycle Commands
   daemon-reload
       Reload the systemd manager configuration. This will rerun all generators (see
       systemd.generator(7)), reload all unit files, and recreate the entire
       dependency tree. While the daemon is being reloaded, all sockets systemd
       listens on behalf of user configuration will stay accessible.

       This command should not be confused with the reload command.
```

There is a distinction between `reload` and `restart`

``` 
Unit Commands
   reload PATTERN...
       Asks all units listed on the command line to reload their configuration. Note
       that this will reload the service-specific configuration, not the unit
       configuration file of systemd. If you want systemd to reload the configuration
       file of a unit, use the daemon-reload command. In other words: for the example
       case of Apache, this will reload Apache's httpd.conf in the web server, not
       the apache.service systemd unit file.

       This command should not be confused with the daemon-reload command.

   restart PATTERN...
       Restart one or more units specified on the command line. If the units are not
       running yet, they will be started.
```

