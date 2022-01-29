---
layout:       post
title:        >
    How do I force `sudo` to ask for a password each time when a specific command is used?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195804
type:         Answer
tags:         command-line sudo password
created_date: 2019-12-13 04:08:20
edit_date:    2019-12-13 04:51:17
votes:        "3 "
favorites:    
views:        "5,232 "
accepted:     
uploaded:     2022-01-29 13:56:05
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-13-How-do-I-force-`sudo`-to-ask-for-a-password-each-time-when-a-specific-command-is-used^.md
toc:          false
navigation:   false
clipboard:    false
---

You can set sudo to always ask for a password:

<pre><code>
$ sudo cat /etc/sudoers
# 
# This file MUST be edited with the 'visudo' command as root.
# 
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
# 
# See the man page for details on how to write a sudoers file.
# 
Defaults	env_reset, <b>timestamp_timeout=120</b>, pwfeedback
# Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
</code></pre>

In my configuration I have sudo timeout set at 2 hours (120 minutes) before it asks for a password again. Setting it to `0` will require password every time you use `sudo`
