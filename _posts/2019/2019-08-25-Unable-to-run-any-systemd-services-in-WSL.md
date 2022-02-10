---
layout:       post
title:        >
    Unable to run any systemd services in WSL
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1168459
type:         Answer
tags:         18.04 windows-subsystem-for-linux kubernetes
created_date: 2019-08-25 18:51:00
edit_date:    
votes:        "5 "
favorites:    
views:        "22,615 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-25-Unable-to-run-any-systemd-services-in-WSL.md
toc:          false
navigation:   false
clipboard:    false
---

`cron` is a `systemd` service which you can still run in WSL. See this answer as a guide for how you might setup your `kubelet` application:

- [How can I run services in WSL][1]

To expand on this link, you can modify Windows startup to load WSL with the background services minimized:

- [WSL Tips: Starting Linux Background Services on Windows Login][2]


  [1]: https://askubuntu.com/a/1025478/307523
  [2]: https://dev.to/ironfroggy/wsl-tips-starting-linux-background-services-on-windows-login-3o98
