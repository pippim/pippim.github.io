---
layout:       post
title:        >
    Plymouth Error Logging
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/864247
type:         Answer
tags:         grub2 plymouth initramfs
created_date: 2016-12-24 18:38:57
edit_date:    
votes:        "4 "
favorites:    
views:        "3,854 "
accepted:     Accepted
uploaded:     2025-10-19 18:25:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-24-Plymouth-Error-Logging.md
toc:          false
navigation:   false
clipboard:    false
---

You need to edit your grub configuration file using:

``` 
gksu gedit /etc/default/grub
```

look for the line containing "quiet splash" and change it like so:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="splash plymouth:debug"
```

You might have other options there like `kslar` or `vt.handoff=7` leave them in place. The important thing is to remove `quiet` and add `plymouth:debug`.

Save the file and then use:

``` 
sudo update-grub
```

Now when you reboot error messages appear on the boot screen plus a full `plymouth` log is located at:

``` 
/var/log/plymouth-debug.log
```

Good luck tracing down you errors!
