---
layout:       post
title:        How to make calendar points to Sunday as first day of the week in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047183
type:         Answer
tags:         18.04 gnome-shell calendar
created_date: 2018-06-16 18:58:29
edit_date:    2019-12-08 14:12:41
votes:        4
favorites:    
views:        4,051
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

A similar question was asked here: https://askubuntu.com/questions/197613/monday-as-first-day-in-gnome-shell-instead-of-sunday.

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
