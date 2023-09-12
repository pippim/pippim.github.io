---
layout:       post
title:        >
    How to make calendar points to Sunday as first day of the week in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047183
type:         Answer
tags:         18.04 gnome-shell calendar
created_date: 2018-06-16 18:58:29
edit_date:    2019-12-08 14:12:41
votes:        "6 "
favorites:    
views:        "5,196 "
accepted:     
uploaded:     2023-09-11 23:13:58
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-16-How-to-make-calendar-points-to-Sunday-as-first-day-of-the-week-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

A similar question was asked here: [Monday as first day in Gnome-Shell (instead of Sunday)](Monday as first day in Gnome-Shell (instead of Sunday))

1.  Use `sudo -H gedit /usr/share/i18n/locales/en_GB`.
2.  Edit the value of `first_weekday` to `1`.
3.  Save the file, restart the system.

There is a second variable: `first_workday` that is set to `2`. Some calendar's may refer to this variable but I would initially leave it unchanged unless further tweaking is needed.

Essentially you will make your `GB` locale look like the `US` locale:

``` 
$ cat /usr/share/i18n/locales/en_GB | grep week -A1
week    7;19971130;4
first_weekday 2
first_workday 2

$ cat /usr/share/i18n/locales/en_US | grep week -A1
week    7;19971130;7
first_weekday	1
first_workday	2
```

I don't know what the `week` variable does so would leave it unchanged at first.
