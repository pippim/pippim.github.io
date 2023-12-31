---
layout:       post
title:        >
    Remove/hide grub menu and decrease boot time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187270
type:         Answer
tags:         boot dual-boot grub2 partitioning 18.04
created_date: 2019-11-08 13:18:09
edit_date:    
votes:        "0 "
favorites:    
views:        "2,258 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-08-Remove_hide-grub-menu-and-decrease-boot-time.md
toc:          false
navigation:   false
clipboard:    false
---

Using this answer as a guideline:

- [Boot-Repair created too many grub menu entries for Windows]({% post_url /2018/2018-04-06-Boot-Repair-created-too-many-grub-menu-entries-for-Windows %})

You can change the file `sudo -H gedit /etc/grub.d/25_custom`:

``` 
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ cat /etc/grub.d/25_custom
#!/bin/sh
exec tail -n +3 $0

───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ 
```

The extra screen lines were included so you can see there **must be** a third empty line at the bottom of the file.

Grub defaults to a 10 second count down but you can shorten it to about 2 or 3 seconds which gives you enough time to interrupt it. In this example the 10 second countdown has been changed to 5 seconds:

[![grub boot.gif][1]][1]

To change the count down time use `sudo -H gedit /etc/default/grub` and find this line:

``` 
GRUB_TIMEOUT=10
```

Change it to a more reasonable time for you:

``` 
GRUB_TIMEOUT=3
```

Changing it to `0` doesn't work because grub code automatically changes `0` to `10` seconds. For more details see:

- [How can I get my GRUB menu to be hidden, AND have the shift or esc keys show the hidden GRUB menu at boot time](How can I get my GRUB menu to be hidden, AND have the shift or esc keys show the hidden GRUB menu at boot time)


  [1]: https://i.stack.imgur.com/yaO9u.gif
