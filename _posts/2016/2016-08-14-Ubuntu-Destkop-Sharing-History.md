---
layout:       post
title:        >
    Ubuntu - Destkop Sharing History
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/812180
type:         Answer
tags:         networking
created_date: 2016-08-14 13:49:11
edit_date:    
votes:        "0 "
favorites:    
views:        "29 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-14-Ubuntu-Destkop-Sharing-History.md
toc:          false
navigation:   false
clipboard:    false
---

***Authorization Log***

The Authorization Log tracks usage of authorization systems, the mechanisms for authorizing users which prompt for user passwords, such as the Pluggable Authentication Module (PAM) system, the sudo command, remote logins to sshd and so on. The Authorization Log file may be accessed at **/var/log/auth.log**. This log is useful for learning about user logins and usage of the sudo command.

Use grep to cut down on the volume. For example, to see only information in the Authorization Log pertaining to sshd logins, use this:

``` 
grep sshd /var/log/auth.log | less
```
