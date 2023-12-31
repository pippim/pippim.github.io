---
layout:       post
title:        >
    Check the status of server 1, if it is not available then run the scripts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192264
type:         Answer
tags:         networking server bash scripts cron
created_date: 2019-11-28 11:57:20
edit_date:    
votes:        "0 "
favorites:    
views:        "82 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-28-Check-the-status-of-server-1_-if-it-is-not-available-then-run-the-scripts_.md
toc:          false
navigation:   false
clipboard:    false
---

I would prefer to have the same script running on both machines to reduce maintenance. Assuming the `/etc/hosts` file on the master contained the name "master" both machines could have the same script like this:

``` bash
#!/bin/bash

function DoJobs () {
    /manoj/scripts/location.plx > /manoj/logs/location/sync.log 2>&1
    /manoj/scripts/report.py > /manoj/logs/dashboard/dashboard.log 2>&1
    /etc/profile; /manoj/scripts/Space.py > /manoj/logs/dashboard/Consumption.log 2>&1
}

# If master server run jobs and exit
if grep -q "Master" /etc/hosts ; then
    DoJobs
    exit 0
fi

# Not the master server so do jobs if it is down
check=$(curl -s -w "%{http_code}\n" -L "master" -o /dev/null)
if [[ $check == 200 || $check == 403 ]]
then
    # Service is online
    echo "Service is online, slave is handing over the tasks to master if any"
    exit 0
else
    # Service is offline or not working correctly
    echo "Service is offline or not working correctly, slave is taking over master now"
   DoJobs
   exit 1
fi

```

Now there is only a single script to maintain for both servers. When a new job is setup only one file has to be edited.
