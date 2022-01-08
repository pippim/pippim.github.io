---
layout:       post
title:        >
    Black screen beteen GRUB and login screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1105656
type:         Answer
tags:         boot
created_date: 2018-12-30 18:14:29
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "414 "
accepted:     Accepted
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

To see what is happening during the 20 to 30 seconds use:

``` 
sudo -H gedit /etc/default/grub

```

Find the line that starts with:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash

```

and change it to:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="noplymouth

```

Leave the rest of the line as is.

Now save the file and exit `gedit`

Run:

``` 
sudo update-grub

```

Now when you reboot you will see the messages scroll by as the kernel boots up. If it gets stuck on one message for more than a second note it and add it to your question.

For a detailed time break down of your boot use:

``` 
systemd-analyze blame

```

The longest running boot commands are listed first. Use <kbd>Q</kbd> to exit the command.


----------

## Systemd log messages

After completing above steps this error is revealed during boot up:

``` 
WARNING: Failed to connect to lvmetad. Falling back to device scanning.

```

Arch Linux references this error [here][1].

Unix & Linux describes LVM setup errors [here][2].


  [1]: https://bbs.archlinux.org/viewtopic.php?id=231357
  [2]: https://unix.stackexchange.com/questions/199164/error-run-lvm-lvmetad-socket-connect-failed-no-such-file-or-directory-but
