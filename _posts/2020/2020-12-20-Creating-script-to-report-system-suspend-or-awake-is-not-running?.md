---
layout:       post
title:        >
    Creating script to report system suspend or awake is not running?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1301658
type:         Answer
tags:         16.04 bash suspend
created_date: 2020-12-20 19:49:43
edit_date:    2020-12-20 21:31:38
votes:        "4 "
favorites:    
views:        "109 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

Copy your script to:

``` 
/lib/systemd/system-sleep/sleep_mode

```

You will need to use `sudo` powers. After copying flag it as executable:

``` 
sudo chmod +x /lib/systemd/system-sleep/sleep_mode

```

Additionally change all occurrences of:

``` 
echo "%s

```

to:

``` 
echo "s

```

The percent sign is unnecessary.

The existing date command is OK:

``` 
date +%s >>  /tmp/suspend_time.txt

```

However it is formatted as number of seconds since January 1, 1970 which isn't the most readable date format.


----------

## case statement

The `case` statement can be changed:

``` 
case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    # Place your pre suspend commands here, or `exit 0` if no pre suspend action required
    ;;
  post/*)
    echo "$0: Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` if no pre suspend action required
    ;;
esac
```
