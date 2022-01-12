---
layout:       post
title:        >
    How do I stop Ubuntu from asking for my password every time I install something?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/852530
type:         Answer
tags:         prompt
created_date: 2016-11-23 04:10:00
edit_date:    
votes:        "6 "
favorites:    
views:        "44,285 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

Type `sudo visudo` and this screen appears:

``` 
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults        env_reset, timestamp_timeout=120
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:$

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification

```


The first command `Defaults env_reset, timestamp_timeout=120` has been modified with a timeout of 120 minutes between having to enter `sudo` password. The normal default is 5 minutes. Although you can change this to a very large number you will still have to enter it once per boot.

