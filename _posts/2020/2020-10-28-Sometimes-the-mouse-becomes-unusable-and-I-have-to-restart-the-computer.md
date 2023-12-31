---
layout:       post
title:        >
    Sometimes the mouse becomes unusable and I have to restart the computer
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1287833
type:         Answer
tags:         18.04 20.04 xubuntu lubuntu
created_date: 2020-10-28 23:44:06
edit_date:    
votes:        "0 "
favorites:    
views:        "556 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-10-28-Sometimes-the-mouse-becomes-unusable-and-I-have-to-restart-the-computer.md
toc:          false
navigation:   false
clipboard:    false
---

Many people have had this problem and reloading the mouse drivers is a common solution.

From this answer I posted awhile back:

- [Touchpad not working after suspending laptop]({% post_url /2016/2016-09-24-Touchpad-not-working-after-suspending-laptop %})

This bug is reported in launchpad: [Elantech touchpad stops working after suspend][1]. After suspend the OP tries `# modprobe -r psmouse` and `# modprobe psmouse` and it doesn't work. But what if **psmouse** was removed before suspend and inserted after suspend? 

If this works manually then you can automate by creating a new file in the  `/lib/systemd/system-sleep/` directory containing:

``` sh
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
