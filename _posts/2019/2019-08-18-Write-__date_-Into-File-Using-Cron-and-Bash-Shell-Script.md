---
layout:       post
title:        >
    Write $(date) Into File Using Cron and Bash Shell Script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1166511
type:         Answer
tags:         bash scripts cron
created_date: 2019-08-18 00:41:25
edit_date:    2019-08-18 01:07:20
votes:        "1 "
favorites:    
views:        "6,364 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-18-Write-__date_-Into-File-Using-Cron-and-Bash-Shell-Script.md
toc:          false
navigation:   false
clipboard:    false
---


`cron` can be rather `$PATH` oblivious at times. Many people simply prefix commands with the command's path. For the `date` command, locate it's path with and one of these three commands:

``` bash
$ which date
/bin/date

$ type -a date
date is /bin/date

$ command -v date
/bin/date
```

So change your script from:

``` bash
$(date)
```

to:

``` bash
$(/bin/date)
```

You can shorten your script by replacing:

``` bash
target_file='/home/dan/timestamps'
echo $(/bin/date)  >>  $target_file
```

with:

``` bash
/bin/date >> /home/dan/timestamps
```
