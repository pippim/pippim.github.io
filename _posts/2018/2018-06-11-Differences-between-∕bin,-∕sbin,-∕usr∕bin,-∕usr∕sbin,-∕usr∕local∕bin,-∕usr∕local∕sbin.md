---
layout:       post
title:        >
    Differences between ∕bin, ∕sbin, ∕usr∕bin, ∕usr∕sbin, ∕usr∕local∕bin, ∕usr∕local∕sbin
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045759
type:         Answer
tags:         command-line filesystem scripts directory system
created_date: 2018-06-11 23:44:36
edit_date:    2020-06-12 14:37:07
votes:        "24 "
favorites:    
views:        "292,053 "
accepted:     
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    true
---

I had a similar question myself a year+ ago: [Best directory to place my bash scripts?](Best directory to place my bash scripts?)


## System directories for binaries

`man hier` (hierarchy) lists all the directories. To get the ones just for binaries use:

{% include copyHeader.html %}
``` 
$ man hier | grep -E 'bin$|sbin$|^.{7}(/bin)|^.{7}(/sbin)' -A2

       /bin   This directory contains executable programs which are needed in single user
              mode and to bring the system up or repair it.

--
       /sbin  Like  /bin,  this  directory  holds commands needed to boot the system, but
              which are usually not executed by normal users.

--
       /usr/X11R6/bin
              Binaries  which  belong  to the X-Window system; often, there is a symbolic
              link from the more traditional /usr/bin/X11 to here.
--
       /usr/bin
              This  is the primary directory for executable programs.  Most programs exe‐
              cuted by normal users which are not needed for booting or for repairing the
--
       /usr/local/bin
              Binaries for programs local to the site.

--
       /usr/local/sbin
              Locally installed programs for system administration.

--
       /usr/sbin
              This directory contains program binaries for  system  administration  which
              are  not  essential  for the boot process, for mounting /usr, or for system

```


----------


## Where to put your own scripts?

For all users to access your scripts you can put them in `/usr/local/bin`. Keep in mind you need `sudo` access to add / change files here. See: [Is there a standard place for placing custom Linux scripts?](Is there a standard place for placing custom Linux scripts?)

For your own user ID scripts put them in `/home/YOUR_NAME/bin`. Keep in mind you have to create this directory first and relaunch the terminal to get the path automatically setup by `~/.profile`. See: [How to add /home/username/bin to $PATH?](How to add /home/username/bin to $PATH?)


----------


## What I know I don't know

I'm contemplating taking some of my more complex bash scripts in **Ask Ubuntu** and setting them up with install scripts on `github`. Here are few examples:

- [Automatically adjust display brightness based on sunrise and sunset]({% post_url /2017/2017-03-19-Automatically-adjust-display-brightness-based-on-sunrise-and-sunset %})
- [Set of countdown timers with alarm]({% post_url /2018/2018-05-23-Set-of-countdown-timers-with-alarm %})
- [Application that will lock screen after a set amount of time for Ubuntu]({% post_url /2016/2016-10-14-Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu %})
- [Code version control between local files and AU answers]({% post_url /2017/2017-04-05-Code-version-control-between-local-files-and-AU-answers %})

I *think* the scripts should be installed in `/usr/bin` which is in the $PATH, but I'm not sure on the appropriate place yet.

