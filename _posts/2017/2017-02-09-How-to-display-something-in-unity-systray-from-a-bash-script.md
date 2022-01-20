---
layout:       post
title:        >
    How to display something in unity systray from a bash script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/881548
type:         Answer
tags:         unity bash system-tray
created_date: 2017-02-09 11:58:00
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "2,010 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-09-How-to-display-something-in-unity-systray-from-a-bash-script.md
toc:          false
navigation:   false
clipboard:    false
---

# Indicator System Monitor

[![indicator system monitor][1]][1]

The closest method I've found to satisfy your requirements is ([webupd8.org - Ubuntu appindicator that displays bash][2]) that displays text on the Unity system tray / application indicator bar. The sample above comes from two bash scripts: [`multi-timer`][3] and [`display-auto-brightness`][4].

# Install and Configure Sysmonitor Indicator

You need to install `indicator-sysmonitor` from ppa:

``` 
sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor
sudo apt-get update
sudo apt-get install indicator-sysmonitor
```

Then run the gui and configure it with the script name that updates the system tray.

# Sample scripts to output to system tray

Here are a few examples from the ***WebUpd8*** link above:

- Display the current CPU frequency for the first core:

``` 
`echo $(grep "cpu MHz" /proc/cpuinfo | head -1 | cut -d ' ' -f3 | cut -d '.' -f1) MHz`
```

- Check if a website is up (smiley face) or down (sad face):

``` 
`if wget -O /dev/null webupd8.org > /dev/null; then echo "☺"; else echo "☹"; fi`
```


  [1]: https://i.stack.imgur.com/Zh8Wh.gif
  [2]: http://www.webupd8.org/2014/05/ubuntu-appindicator-that-displays-bash.html
  [3]: {% post_url /2018/2018-05-23-Set-of-countdown-timers-with-alarm %}
  [4]: {% post_url /2017/2017-03-19-Automatically-adjust-display-brightness-based-on-sunrise-and-sunset %}
