---
layout:       post
title:        >
    Touchpad not working after suspending laptop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/828920
type:         Answer
tags:         touchpad suspend asus synaptics
created_date: 2016-09-24 01:23:55
edit_date:    2016-09-24 02:26:03
votes:        "18 "
favorites:    
views:        "40,906 "
accepted:     
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    false
---

This bug is reported in launchpad: [Elantech touchpad stops working after suspend][1]. After suspend the OP tries `# modprobe -r psmouse` and `# modprobe psmouse` and it doesn't work. But what if **psmouse** was removed before suspend and inserted after suspend? 

If this works manually then you can automate by creating a new file in the  `/lib/systemd/system-sleep/` directory containing:

``` 
#!/bin/sh

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

It is known after a suspend the **psmouse** module can't be removed. We also know it can be removed and inserted before a suspend. So this technique removes it before suspend. After resume insert it and hopefully the kernel won't reject it.

The `sleep 2` command is from my own problems where systemd and kernel (via gnome or APM) were both sleeping and waking up. I needed to redirect pulseaudio sound back to the TV due to a bug introduced in Ubuntu 16.04/pulseaudio 8.0. The 2 second delay was necessary for kernel and systemd to finish waking up. Still haven't figured out the dual suspend and dual resume yet....

  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1490130
