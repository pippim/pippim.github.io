---
layout:       post
title:        >
    cron launching but not executing script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846557
type:         Answer
tags:         cron
created_date: 2016-11-07 09:43:10
edit_date:    2016-11-07 11:41:29
votes:        "6 "
favorites:    
views:        "2,044 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-07-cron-launching-but-not-executing-script.md
toc:          false
navigation:   false
clipboard:    false
---

It looks like the executable `ruby` is not in `cron`'s path, so you need to use the full path to the executable.

Change your `monday.sh` script from:

``` bash
#!/bin/bash
ruby ~/Documents/Scripts/monday_task.rb >> ~/Documents/Scripts/monday
```

to:

``` bash
#!/bin/bash
/home/asarluhi/.rvm/rubies/ruby-2.3.1/bin/ruby /home/asarluhi/Documents/Scripts/monday_task.rb >> /home/asarluhi/Documents/Scripts/monday
```

As your `syslog` demonstrates the `monday.sh` script is being run on time so absolute path-names is the only answer. As per OP comment `ruby` also has to be prefixed with absolute path-name.
