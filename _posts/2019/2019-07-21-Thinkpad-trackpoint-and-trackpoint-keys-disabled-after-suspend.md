---
layout:       post
title:        >
    Thinkpad trackpoint and trackpoint keys disabled after suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159960
type:         Answer
tags:         18.04 thinkpad trackpoint
created_date: 2019-07-21 17:25:56
edit_date:    2019-07-22 15:37:41
votes:        "4 "
favorites:    
views:        "364 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-21-Thinkpad-trackpoint-and-trackpoint-keys-disabled-after-suspend.md
toc:          false
navigation:   false
clipboard:    false
---

Having to unload and reload the `psmouse` driver when resuming from suspend is a common problem. You can automate the process with a script though:

<!-- Language-all: lang-bash -->

Create a new file in the  `/lib/systemd/system-sleep/` directory containing:

``` 
#!/bin/bash

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    # Place your pre suspend commands here, or `exit 0` if no pre suspend action required
    modprobe -r psmouse
    ;;
  post/*)
    echo "Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` if no post suspend action required
    sleep 2
    modprobe psmouse
    ;;
esac

```

Make it executable:

``` 
sudo chmod a+x /lib/systemd/system-sleep/script-name

```

After the next reboot, the script will be active.

A script like this has worked for many people over the years. Of course your other option would be trying the previous kernel version and if it works sticking with it.
