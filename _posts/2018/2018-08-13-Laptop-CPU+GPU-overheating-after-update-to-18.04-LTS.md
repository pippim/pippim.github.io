---
layout:       post
title:        >
    Laptop CPU+GPU overheating after update to 18.04 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1065125
type:         Answer
tags:         18.04 intel temperature cpu-load
created_date: 2018-08-13 23:58:11
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "17,718 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

# `tlp` 

As mentioned on this thread `tlp` works wonders for keeping system under control. It works with `thermald`, Intel Powerclamp, Battery vs AC for USB power, etc. Although highly configurable I've never had to change the configuration settings for a pleasant Out-Of-The-Box experience. Prior to using it I had all kinds of problems with an IvyBridge laptop overheating all the time. I have it on my new Skylake laptop and the fans NEVER run except when doing Ubuntu 16.04 LTS to 18.04 upgrade.

You can get a very detailed write-up with installation instructions here: [Stop cpu from overheating]({% post_url /2017/2017-01-25-Stop-cpu-from-overheating %})


----------

As an aside I've read a few questions the last two weeks from people wanting to override the minimum frequency, maximum frequency or to fix the current frequency at a specific speed. As such I've decided to create a new bash+yad GUI project. A tab to display temperatures for all thermal zones and issuing notify-send (pop-up bubble messages) will be part of it. As well some sort of session log file for when you weren't watching the screen might be kept.

I just had the idea 2 hours ago whilst rereading this thread. No promises on doing the project but I think a few people would like it and I would have a lot of fun :)

