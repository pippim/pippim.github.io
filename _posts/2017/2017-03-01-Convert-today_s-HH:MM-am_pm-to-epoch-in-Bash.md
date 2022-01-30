---
layout:       post
title:        >
    Convert today's HH:MM am/pm to epoch in Bash
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/42521666
type:         Question
tags:         bash date time epoch
created_date: 2017-03-01 01:31:23
edit_date:    2017-10-17 05:36:06
votes:        "2 "
favorites:    1
views:        "824 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-01-Convert-today_s-HH:MM-am_pm-to-epoch-in-Bash.md
toc:          false
navigation:   false
clipboard:    false
---

I have two variables `$sunrise`="7:23 am" and `$sunset`="6:10 pm". I need to convert both of them to today's epoch equivalent as in:

``` 
secSunrise=($date ... "$sunrise" ... +"%s")
secSunset=$(date ... "$sunset" ... +"%s")
```

The only thing I've figured out so far is doing it with current date-time:

``` 
$ secNow=$(date +"%s")
$ echo $secNow
1488331535
```


How to square this circle and plug the `HH:MM am/pm` 12-hour formatted variable into the `date` command?
