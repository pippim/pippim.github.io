---
layout:       post
title:        >
    Disabling Zeitgeist
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182396
type:         Answer
tags:         zeitgeist
created_date: 2019-10-20 13:03:27
edit_date:    
votes:        "0 "
favorites:    
views:        "60,557 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-Disabling-Zeitgeist.md
toc:          false
navigation:   false
clipboard:    false
---

My problem with `zeitgeist` are distracting error messages in `journalctl`:

``` 
$ journalctl -xe | grep zeitgeist.SimpleIndexer
Oct 20 05:30:06 alien org.gnome.zeitgeist.SimpleIndexer[2098]: ** (zeitgeist-fts:4341): WARNING **: Unable to get info on application://nautilus-autostart.desktop
Oct 20 05:30:06 alien org.gnome.zeitgeist.SimpleIndexer[2098]: ** (zeitgeist-fts:4341): WARNING **: Unable to get info on application://eyesome-cfg.desktop

$ journalctl -b-1 | grep zeitgeist
Oct 16 04:47:02 alien org.gnome.zeitgeist.Engine[2134]: Performing VACUUM operation... OK
Oct 16 04:47:02 alien org.gnome.zeitgeist.Engine[2134]: ** (zeitgeist-datahub:4587): WARNING **: zeitgeist-datahub.vala:229: Unable to get name "org.gnome.zeitgeist.datahub" on the bus!
Oct 16 16:39:18 alien org.gnome.zeitgeist.SimpleIndexer[2134]: ** (zeitgeist-fts:4585): WARNING **: Unable to get info on application://multi-timer.desktop
Oct 16 18:23:48 alien org.gnome.zeitgeist.SimpleIndexer[2134]: ** (zeitgeist-fts:4585): WARNING **: Unable to get info on application:///home/rick/Desktop/multi-timer.desktop
```

I found [this article][1] on configuring "Activity Log Manager" in Gnome or "Security and Privacy" in Unity that allows you to tell zeitgeist to ignore certain applications or directories. So I added the directory `~/Desktop` to the blacklist.

I didn't do anything about the error `application://nautilus-autostart.desktop`. I still need to research that gnome application. My instinct tells me it's a bug and not my problem to fix.


  [1]: https://smallbusiness.chron.com/use-zeitgeist-ubuntu-48292.html
