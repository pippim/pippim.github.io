---
layout:       post
title:        >
    Run script every 4 minutes but don't run from 3:00 to 3:40
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188218
type:         Answer
tags:         cron
created_date: 2019-11-12 16:35:20
edit_date:    
votes:        "1 "
favorites:    
views:        "1,922 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

Stack Overflow has a good answer similar to your problem:

- [Crontab run every 15 minutes except at 3AM?](https://stackoverflow.com/questions/8764150/crontab-run-every-15-minutes-except-at-3am/8764193)

In this answer a job runs every 15 minutes except blackout period from 3am to 4am at which time another job is run:

>     # Every 15 minutes except for 3:00-3:59  
>     */15 0-2,4-23 * * * thejob  
>     # 3:15, 3:30, 3:45  
>     15-45/15 3 * * * thejob  
>     # 3:00 dead  
>     0 3 * * * otherjob  

If you don't have another job to run during the blackout period remove the last two lines.

You can combine your two lines of:

``` 
*/4 0-3 * * * example.sh
*/4 4-0 * * * example.sh

```

With one line of:

``` 
*/4 0-2,4-23 * * * example.sh

```

Then for your last complicated line:

``` 
40,44,48,52,56 4 * * * example.sh

```

Replace it with:

``` 
40-59/4 3 * * * example.sh

```

