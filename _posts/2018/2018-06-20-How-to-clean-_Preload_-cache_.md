---
layout:       post
title:        >
    How to clean "Preload" cache?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1048363
type:         Answer
tags:         18.04 preload
created_date: 2018-06-20 22:43:55
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "4,363 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-20-How-to-clean-_Preload_-cache_.md
toc:          false
navigation:   false
clipboard:    false
---

From a [FOSS article][1]:

## What is Preload?

Preload is a daemon application and runs in the background. Preload analyzes the user behavior and tracks what applications are run frequently by the user. Based on these analysis, it predicts what application the user might run next and fetches those binaries and their dependencies into memory and hence increases the startup time of the application.


----------

## You can't really clear the cache

You can't really clear the cache but you can disable specific programs from `preload`. As per this [Arch Linux article][2]:

To disable the loading of a program, remove the appropriate list in `/usr/share/gopreload/enabled` or move it to `/usr/share/gopreload/disabled`.

You should read the whole article!


----------

Also of interest to you:

- [Drawbacks of using preload? Why isn&#39;t it included by default?](Drawbacks of using preload? Why isn&#39;t it included by default?)


  [1]: https://itsfoss.com/improve-application-startup-speed-with-preload-in-ubuntu/
  [2]: https://wiki.archlinux.org/index.php/Preload
