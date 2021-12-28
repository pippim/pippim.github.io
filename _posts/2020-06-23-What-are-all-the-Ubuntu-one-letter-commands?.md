---
layout:       post
title:        What are all the Ubuntu one letter commands?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1252962
type:         Question
tags:         command-line
created_date: 2020-06-23 02:27:53
edit_date:    
votes:        10
favorites:    0
views:        2,986
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

I came across this command whilst setting up `ssh`:

<!-- Language-all: lang-bash -->

``` 
$ w

 20:01:30 up 6 days,  2:20,  3 users,  load average: 0.06, 0.11, 0.10
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
rick     tty7     :0               16Jun20  6days 16:51   2.37s /sbin/upstart --user
rick     pts/21   192.168.0.12     18:44    1:14m  0.19s  0.00s sleep 60
rick     pts/22   192.168.0.12     18:45    0.00s  0.44s  0.01s w
```

Which led me to wonder what all the one letter commands are in Ubuntu. I didn't find an exact reference but I found this website:

- [An A-Z Index of the Linux command line: bash + utilities.][1]

Here the `w` command is listed along with:

- `.` the command to source a file which I've used
- `v` is a command not installed in Ubuntu. It is said to be equivalent to `ls -l -b`. This in turn is similar to the the `ll` alias setup by Ubuntu except files beginning with `.` (including the infamous `.` and `..`) are not included.

Are there other one letter commands installed within Ubuntu by default? 

  [1]: https://ss64.com/bash/
