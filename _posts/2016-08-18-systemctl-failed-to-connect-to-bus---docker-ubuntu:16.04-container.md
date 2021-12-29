---
layout:       post
title:        systemctl failed to connect to bus - docker ubuntu:16.04 container
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/813644
type:         Answer
tags:         server 16.04 systemd docker
created_date: 2016-08-18 03:57:34
edit_date:    2017-07-22 16:16:42
votes:        19
favorites:    
views:        239,195
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

Others have reported a similar problem. Start up the terminal and type:

``` 
$ env

```

Do you see an environment variable like this?

``` 
XDG_RUNTIME_DIR=/run/user/`id -u`

```

Where `id -u` is enclosed in backticks not single quotes. This variable is reinterpreted into a number usually `1000` for regular users and `0` for super user (sudo).

If the environment variable `XDG_RUNTIME_DIR` does not exist you need to create it. The full discussion is in [launchpad systemd answers][1].


  [1]: https://answers.launchpad.net/ubuntu/+source/systemd/+question/287454
