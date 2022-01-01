---
layout:       post
title:        >
    Ubuntu Server 16.04 unusual crontab entry
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180445
type:         Answer
tags:         server cron
created_date: !!str "2019-10-12 02:46:45"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "632"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

As stated in comments you have a virus installed by crypto miner. This tells you how to remove it: [Watchbog Vulnerability][1]

To summarize the steps:

``` 
crontab –r
ls /var/spool/cron/crontabs
pip uninstall urllib2
apt-get remove --auto-remove curl
apt-get remove --auto-remove wget
crontab -r
while true ; do killall watchbog ; done
sudo passwd root

```

Read the entire link for step by step details and to verify you have this virus in the first place.
  [1]: https://www.linode.com/community/questions/18657/watchbog-vulnerability
