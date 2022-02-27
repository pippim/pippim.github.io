---
layout:       post
title:        >
    Unable to lock screen with Cron or Settings
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1393684
type:         Answer
tags:         20.04 gnome cron lock-screen
created_date: 2022-02-18 18:19:34
edit_date:    2022-02-21 14:36:05
votes:        "1 "
favorites:    
views:        "26 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-18-Unable-to-lock-screen-with-Cron-or-Settings.md
toc:          false
navigation:   false
clipboard:    false
---

A more universal way of [locking the screen](https://wiki.archlinux.org/title/Session_lock) is using:

``` 
loginctl lock-session
```

## Cron doesn't know the Session ID for `loginctl`

When you use `loginctl lock-session` from the command line, your session ID is already known. For example:

``` shell
$ echo $XDG_SESSION_ID

c2

$ loginctl list-sessions

   SESSION        UID USER             SEAT            
        c2       1000 rick             seat0           

1 sessions listed.
```

The above shows two ways you can get your Session ID from the command line.

This GitHub issue for `loginctl` explains why the variable `XDG_SESSION_ID` is unknown to `systemd`. The same case would apply to `cron`:

- [ "loginctl lock-session" fails when no explicit session passed #6032 ](https://github.com/systemd/systemd/issues/6032)

So from `cron` you could use `loginctl lock-session c2` if you knew your session ID would always be `c2`. An easier way is to use `lock-sessions`.

I tried this on my system and it works. Try using this on your `crontab -e`:

``` 
*/5  *   *  *   *     loginctl lock-sessions
```

Now, every five minutes your screen will lock.

