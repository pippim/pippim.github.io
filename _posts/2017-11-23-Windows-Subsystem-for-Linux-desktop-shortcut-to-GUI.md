---
layout:       post
title:        Windows Subsystem for Linux desktop shortcut to GUI
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/979332
type:         Answer
tags:         bash gui shortcuts windows-subsystem-for-linux yad
created_date: 2017-11-23 01:26:29
edit_date:    2020-06-12 14:37:07
votes:        7
favorites:    
views:        10,158
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

# Why didn't I think of that?

This is one of those solutions where you look at it and think "Why didn't I think of that?". Unfortunately I had to look at many websites with wrong suggestions or over-kill such as "how to use regedit to run shortcut as admin".

# Having the right parameters

Right click on your Windows 10 desktop and setup your shortcut to look like this:

[![Windows 10 shortcut properties][1]][1]

The full line for the `Target` field should look like this:

``` 
C:\Windows\System32\bash.exe -c "cd && DISPLAY=:0 /mnt/e/bin/lock-screen-timer"

```

**NOTE:** Most users will use `/mnt/c/....` as their path but I'm dual-booting and the same script is shared by WSL and Ubuntu 16.04 so must be on a separate NTFS partition I've called `/mnt/e`. WSL cannot write to a Linux `ext4` drive and Linux nor Windows Apps can write to a WSL sub-directory. It's complicated...

Also note the `DISPLAY=:0` parameter accommodates calling a bash GUI script but the same is likely true if calling `gedit` or `nautilus` which are my next desktop shortcut projects. If not, I'll revise this answer..

Click the `Change Icon` button to get a default list of icons to choose from. This is where the clock icon came from.

  [1]: https://i.stack.imgur.com/kWwtS.png
