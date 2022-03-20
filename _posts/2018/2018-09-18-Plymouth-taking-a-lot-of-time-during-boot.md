---
layout:       post
title:        >
    Plymouth taking a lot of time during boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1076190
type:         Answer
tags:         boot plymouth boot-time
created_date: 2018-09-18 03:41:31
edit_date:    
votes:        "2 "
favorites:    
views:        "4,369 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-18-Plymouth-taking-a-lot-of-time-during-boot.md
toc:          false
navigation:   false
clipboard:    false
---

You can remove `plymouth` during your boot up process and display progress messages by using:

``` 
sudo -H gedit /etc/default/grub
```

Find the line containing:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

and remove `quiet splash` between the double quotes. If you have additional parameters leave them as is.

Save the file and run:

``` 
sudo update-grub
```

Then reboot and watch the messages that appear for any clues on what is causing delays.

After boot completes run:

``` 
systemd-analze blame
```

once more and report back with the results.

