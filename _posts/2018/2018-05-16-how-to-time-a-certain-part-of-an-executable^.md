---
layout:       post
title:        >
    how to time a certain part of an executable?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1036893
type:         Answer
tags:         command-line monitoring
created_date: 2018-05-16 10:44:20
edit_date:    2018-05-16 11:29:21
votes:        "2 "
favorites:    
views:        "393 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-16-how-to-time-a-certain-part-of-an-executable^.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest way is to put the `time` command in front of the command you are running. For example:




``` bash
$ time locate display-auto
/etc/cron.d/display-auto-brightness
/home/rick/Downloads/display-auto-brightness
/home/rick/Pictures/display-auto-brightness conky.png
/home/rick/Pictures/display-auto-brightness systray.png
/home/rick/Pictures/display-auto-brightness-config 1.png
/home/rick/Pictures/ps display-auto-brightness.png
/lib/systemd/system-sleep/display-auto-brightness
/mnt/e/etc/cron.d/display-auto-brightness
/mnt/e/lib/systemd/system-sleep/display-auto-brightness
/mnt/e/usr/local/bin/display-auto-brightness
/usr/local/bin/display-auto-brightness

real	0m0.826s
user	0m0.803s
sys 	0m0.016s
```

We are using the `locate` command to find all the filenames with `display-auto` in the names. Simply insert the `time` command in front of the command.


----------

## Getting time for portion of script

You can use the `$SECONDS` variable inside your script to get the time for a portion of it. For example:

``` bash
SECONDS=0
/bin/egrep -v "^#|^$" $BLOCKEDIPS_XS | while IFS= read -r ip
do
    # Append everything to droplist
    $IPTABLES -A droplist -i eth0 -s $ip -j LOG --log-prefix " Drop IP List blockxs "
    $IPTABLES -A droplist -i eth0 -s $ip -j DROP
done <"$BLOCKEDIPS_XS"
timer stops, shows elapsed time
BlockTime=$SECONDS
echo "Total time to block IPs: $BlockTime Seconds"
```

In this code the `SECONDS` is reset to zero and then obtained after a lengthy process occurs.
