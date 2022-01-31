---
layout:       post
title:        >
    Intercept shutdown call and run script to allow or prevent shutdown
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010124
type:         Answer
tags:         16.04 bash shutdown
created_date: 2018-02-27 00:23:41
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,667 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-27-Intercept-shutdown-call-and-run-script-to-allow-or-prevent-shutdown.md
toc:          false
navigation:   false
clipboard:    false
---

# Use systemd inhibitors

**Original Post** is in section below and details how to intercept `/sbin/shutdown` command. This section is based on *systemd inhibitors*.

From [systemd inhibitor][1]:

## Name

systemd-inhibit — Execute a program with an inhibition lock taken

## Synopsis

`systemd-inhibit [OPTIONS...] [COMMAND] [ARGUMENTS...]`

`systemd-inhibit [OPTIONS...] --list`

## Description

**systemd-inhibit** may be used to execute a program with a shutdown, sleep, or idle inhibitor lock taken. The lock will be acquired before the specified command line is executed and released afterwards.

Inhibitor locks may be used to block or delay system sleep and shutdown requests from the user, as well as automatic idle handling of the OS. This is useful to avoid system suspends while an optical disc is being recorded, or similar operations that should not be interrupted.

For more information see the [Inhibitor Lock Developer Documentation][2].

## Options

The following options are understood:

`--what=`

 -   Takes a colon-separated list of one or more operations to inhibit: "shutdown", "sleep", "idle", "handle-power-key", "handle-suspend-key", "handle-hibernate-key", "handle-lid-switch", for inhibiting reboot/power-off/halt/kexec, suspending/hibernating, the automatic idle detection, or the low-level handling of the power/sleep key and the lid switch, respectively. If omitted, defaults to "idle:sleep:shutdown".

`--who=`

 -   Takes a short, human-readable descriptive string for the program taking the lock. If not passed, defaults to the command line string.

`--why=`

 -   Takes a short, human-readable descriptive string for the reason for taking the lock. Defaults to "Unknown reason".

`--mode=`

 -   Takes either "block" or "delay" and describes how the lock is applied. If "block" is used (the default), the lock prohibits any of the requested operations without time limit, and only privileged users may override it. If "delay" is used, the lock can only delay the requested operations for a limited time. If the time elapses, the lock is ignored and the operation executed. The time limit may be specified in [logind.conf(5)][3]. Note that "delay" is only available for "sleep" and "shutdown".

`--list`

 -   Lists all active inhibition locks instead of acquiring one.

`-h`, `--help`

 -   Print a short help text and exit. 

`--version`

 -   Print a short version string and exit.

## Exit status

Returns the exit status of the executed program.

## Example

`# systemd-inhibit wodim foobar.iso`

This burns the ISO image foobar.iso on a CD using wodim(1) *Note: link is broken in systemd documentation*, and inhibits system sleeping, shutdown and idle while doing so.

## See Also

[systemd(1)][4], [logind.conf(5)][3] 

----------

# Original Post

In concept it seems pretty easy. Simply find the command, rename it, and replace it with your own script that calls the renamed version:



``` bash
$ type -a shutdown
shutdown is /sbin/shutdown
$ sudo mv /sbin/shutdown /sbin/shutdownoriginal
```

Then edit your own script in `/sbin/shutdown` containing at the very least:

``` bash
#!/bin/bash
/sbin/shutdownoriginal
```

Then mark your script as executable for everyone:

``` bash
$ sudo chmod a+x /sbin/shutdown
```

Voila! Everything that calls shutdown now calls your script which then calls the original commmand.

In reality by the time your script gets called things may not be in the state you expect. For example I put in some commands to record the shutdown but they do not appear to work:

``` bash
echo "/sbin/shutdown custom script calling /sbin/shutdownoriginal"
shutdowntime=`date`
echo "Last shutdown: $shutdowntime" >> /home/rick/shutdownlog.txt
```

The first `echo` should have appeared in `/var/log/syslog` but it did not. The second `echo` should have appended a line to the log file but it did not. This tells me that by the time the `/sbin/shutdown` command is executed system logging is already turned off and the file I/O system is shutdown.

A better approach would be looking at systemd shutdown target and/or input inhibitors. I'll leave this answer here though for others that might think it could/would/should work.

As always remember **YMMV**--**Y**our **M**ileage **M**ay **V**ery.


  [1]: https://www.freedesktop.org/software/systemd/man/systemd-inhibit.html
  [2]: https://www.freedesktop.org/wiki/Software/systemd/inhibit/
  [3]: https://www.freedesktop.org/software/systemd/man/logind.conf.html#
  [4]: https://www.freedesktop.org/software/systemd/man/systemd.html#
