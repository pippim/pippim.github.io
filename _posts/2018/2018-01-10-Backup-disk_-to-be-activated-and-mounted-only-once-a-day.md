---
layout:       post
title:        >
    Backup disk, to be activated and mounted only once a day
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/994084
type:         Answer
tags:         mount backup cron disk
created_date: 2018-01-10 01:21:29
edit_date:    
votes:        "0 "
favorites:    
views:        "83 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-10-Backup-disk_-to-be-activated-and-mounted-only-once-a-day.md
toc:          false
navigation:   false
clipboard:    false
---

I did a little digging and the best solution to your specific problem I found was: [Prevent a USB external hard drive from sleeping][1].

There are four answers but what I like the best is a comment suggesting a `cron` job that executes:

``` 
*/15 * * * * date > /mnt/disk/.date`
```

Please review all answers though and, as always, if clarification is needed don't hesitate to post a comment below!

  [1]: https://unix.stackexchange.com/questions/5211/prevent-a-usb-external-hard-drive-from-sleeping
