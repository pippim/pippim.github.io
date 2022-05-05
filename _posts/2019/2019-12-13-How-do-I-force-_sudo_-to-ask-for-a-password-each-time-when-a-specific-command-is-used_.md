---
layout:       post
title:        >
    How do I force `sudo` to ask for a password each time when a specific command is used?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195879
type:         Answer
tags:         command-line sudo password
created_date: 2019-12-13 12:23:30
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "5,646 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-13-How-do-I-force-_sudo_-to-ask-for-a-password-each-time-when-a-specific-command-is-used_.md
toc:          false
navigation:   false
clipboard:    false
---

# `rm` wrapper script

Sometime ago I wrote a wrapper script for the `rm` command:

- [How can I set up a password for the 'rm' command?]({% post_url /2016/2016-12-30-How-can-I-set-up-a-password-for-the-_rm_-command_ %})

Some of the notable features:

- An encrypted password must be used each time `rm` is called unless it is being used within a batch job like `sudo apt-get` or `sudo update-grub`.
- Ensure top level directories are never removed even if a relative path was passed.
- Every time `rm` is used it is logged to `journalctl` and `/var/log/syslog`.
