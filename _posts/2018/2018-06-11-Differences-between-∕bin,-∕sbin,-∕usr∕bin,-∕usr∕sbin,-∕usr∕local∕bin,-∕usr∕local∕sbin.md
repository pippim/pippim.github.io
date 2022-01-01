---
layout:       post
title:        >
    Differences between ∕bin, ∕sbin, ∕usr∕bin, ∕usr∕sbin, ∕usr∕local∕bin, ∕usr∕local∕sbin
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045759
type:         Answer
tags:         command-line filesystem scripts directory system
created_date: !!str "2018-06-11 23:44:36"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "23"
favorites:    
views:        !!str "289,928"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    true
---

I had a similar question myself a year+ ago: https://askubuntu.com/questions/830074/best-directory-to-place-my-bash-scripts


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

For all users to access your scripts you can put them in `/usr/local/bin`. Keep in mind you need `sudo` access to add / change files here. See: https://askubuntu.com/questions/195652/is-there-a-standard-place-for-placing-custom-linux-scripts

For your own user ID scripts put them in `/home/YOUR_NAME/bin`. Keep in mind you have to create this directory first and relaunch the terminal to get the path automatically setup by `~/.profile`. See: https://askubuntu.com/questions/402353/how-to-add-home-username-bin-to-path?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa


----------


## What I know I don't know

I'm contemplating taking some of my more complex bash scripts in **Ask Ubuntu** and setting them up with install scripts on `github`. Here are few examples:

- https://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470
- https://askubuntu.com/questions/1039357/a-timer-to-set-up-different-alarms-simultaneosly/1039377#1039377
- https://askubuntu.com/questions/837078/application-that-will-lock-screen-after-a-set-amount-of-time-for-ubuntu/837115#837115
- https://askubuntu.com/questions/900319/code-version-control-between-local-files-and-au-answers/900609#900609

I *think* the scripts should be installed in `/usr/bin` which is in the $PATH, but I'm not sure on the appropriate place yet.

