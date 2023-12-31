---
layout:       post
title:        >
    where is the code file resposible for increasing and decreasing screen brightness
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132573
type:         Answer
tags:         18.04
created_date: 2019-04-09 23:08:05
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "475 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-09-where-is-the-code-file-resposible-for-increasing-and-decreasing-screen-brightness.md
toc:          false
navigation:   false
clipboard:    false
---

There are dozens of ways to do this: [How to change LCD brightness from command line (or via script)?](How to change LCD brightness from command line (or via script)?)

I think though if you want to know how Ubuntu does it then this answer within the link is probably closest:

## Using DBus with Gnome

### Increase brightness

``` 
gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.gnome.SettingsDaemon.Power.Screen.StepUp
```

### Decrease brightness

``` 
gdbus call --session --dest org.gnome.SettingsDaemon.Power --object-path /org/gnome/SettingsDaemon/Power --method org.gnome.SettingsDaemon.Power.Screen.StepDown
```


----------

## Automatic Adjustments

For myself I use [eyesome][1] which gets sunrise / sunset times each day from the internet. Then it adjusts screen brightness and gamma for both the laptop and two external HDMI TVs. The adjustment is gradual as a transition period of 1 to 2 hours is used at sunrise and sunset. I wrote the program so I'm biased :)


  [1]: https://github.com/WinEunuuchs2Unix/eyesome
