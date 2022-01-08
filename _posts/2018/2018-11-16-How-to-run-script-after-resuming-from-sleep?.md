---
layout:       post
title:        >
    How to run script after resuming from sleep?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1093350
type:         Answer
tags:         startup-applications
created_date: 2018-11-16 01:39:42
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "3,068 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

# Run Script when Resuming from Suspend

Create a new file `/lib/systemd/system-sleep/resume` and copy in:



``` sh
#!/bin/sh

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    # Place your pre suspend commands here, or `exit 0`
    # if no pre suspend action required
    exit 0
    ;;
  post/*)
    echo "Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` 
    # if no post suspend action required
    mouse_script.sh
    ;;
esac

```


**NOTE:** replace user `mouse_script.sh` (third line from the bottom) with your script name. Provide the full path name if the script is not in your path (`echo $PATH`).

Then mark it executable with the command:

``` sh
sudo chmod +x /lib/systemd/system-sleep/resume

```

