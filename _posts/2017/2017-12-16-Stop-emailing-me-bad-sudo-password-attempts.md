---
layout:       post
title:        >
    Stop emailing me bad sudo password attempts
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/986696
type:         Question
tags:         16.04 password security email
created_date: 2017-12-16 00:08:22
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "3,522 "
accepted:     Accepted
uploaded:     2024-02-19 10:38:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-16-Stop-emailing-me-bad-sudo-password-attempts.md
toc:          false
navigation:   false
clipboard:    false
---

I have cron setup to backup every morning and email it to my gmail account and it works great. A nasty side-effect is whenever I type my password wrong using sudo I also get an email which is annoying:

[![incorrect login][1]][1]

I've googled a bit but can't find out how to turn off this email feature.

## Contents of `/etc/sudoers`

``` 
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults    env_reset
Defaults    mail_badpass
Defaults    secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```

  [1]: https://i.stack.imgur.com/Jr883.png
