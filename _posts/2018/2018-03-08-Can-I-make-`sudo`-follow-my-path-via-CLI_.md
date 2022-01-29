---
layout:       post
title:        >
    Can I make `sudo` follow my path via CLI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1012922
type:         Question
tags:         command-line sudo paths
created_date: 2018-03-08 02:31:15
edit_date:    
votes:        "4 "
favorites:    
views:        "765 "
accepted:     Accepted
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-08-Can-I-make-`sudo`-follow-my-path-via-CLI_.md
toc:          false
navigation:   false
clipboard:    true
---

You can edit `sudoers` file and set `secure_path` to match your path. This is documented in [Unix & Linux][1].

Is there a command line switch I can pass to `sudo` such that it uses the path I have set? For example:

{% include copyHeader.html %}
``` 
rick@alien:~$ sudo echo $PATH
/home/rick/bin:/home/rick/.local/bin:/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ echo $PATH
/home/rick/bin:/home/rick/.local/bin:/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ sudo which auto-brightness-config
/usr/local/bin/auto-brightness-config
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ which auto-brightness-config
/mnt/e/usr/local/bin/auto-brightness-config
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ sudo locate auto-brightness-config
/Desktop/Link to auto-brightness-config
/home/rick/Pictures/display-auto-brightness-config 1.png
/mnt/e/Desktop/Link to auto-brightness-config
/mnt/e/usr/local/bin/.auto-brightness-config
/mnt/e/usr/local/bin/Link to auto-brightness-config
/mnt/e/usr/local/bin/auto-brightness-config
/usr/local/bin/.auto-brightness-config
/usr/local/bin/Link to auto-brightness-config
/usr/local/bin/auto-brightness-config
```

When I run using `sudo` it is finding the wrong copy of the script in `/usr/local/bin` when I really want the version in `/mnt/e/usr/local/bin` .

If I don't want to maintain the path in `sudoers` file, is there a switch I can pass to `sudo` to use my path to find the right command?

  [1]: https://unix.stackexchange.com/questions/8646/why-are-path-variables-different-when-running-via-sudo-and-su
