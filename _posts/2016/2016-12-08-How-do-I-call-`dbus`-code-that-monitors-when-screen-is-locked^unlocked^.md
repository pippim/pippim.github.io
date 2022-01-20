---
layout:       post
title:        >
    How do I call `dbus` code that monitors when screen is locked/unlocked?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/858236
type:         Question
tags:         16.04 scripts lock-screen dbus
created_date: 2016-12-08 01:01:02
edit_date:    2017-04-13 12:37:16
votes:        "5 "
favorites:    1
views:        "2,229 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-08-How-do-I-call-`dbus`-code-that-monitors-when-screen-is-locked^unlocked^.md
toc:          false
navigation:   false
clipboard:    false
---

I have a code snippet from ([unix.stackexchange.com - Run script on screen lock / unlock][1]) which I plan to modify because PulseAudio "undocumented feature" switches sound from TV to laptop when screen is locked.

The code is pretty straight forward:

``` 
dbus-monitor --session "type='signal',interface='com.ubuntu.Upstart0_6'" | \
(
  while true; do
    read X
    if echo $X | grep "desktop-lock" &> /dev/null; then
      SCREEN_LOCKED;
    elif echo $X | grep "desktop-unlock" &> /dev/null; then
      SCREEN_UNLOCKED;
    fi
  done
)
```

I can't really say I understand the program / subroutine top-down flow or looping but someone from here commented there that it works and I trust his judgement.

The question is what are the naming conventions for my script? What is the industry standard directory to put the script in? How do I invoke it? ie Startup applications, rc.local, cron @reboot, etc. After invocation I trust it runs until the next reboot.

It will be running forever even if it's only used every Wednesday Laundry night so ideally it shouldn't hog too many CPU cycles.

  [1]: https://unix.stackexchange.com/questions/28181/run-script-on-screen-lock-unlock
