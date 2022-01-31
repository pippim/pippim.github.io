---
layout:       post
title:        >
    How to disable annoying freedesktop service login sound
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1049343
type:         Answer
tags:         sound pulseaudio notification xmpp
created_date: 2018-06-24 15:41:59
edit_date:    
votes:        "0 "
favorites:    
views:        "430 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-24-How-to-disable-annoying-freedesktop-service-login-sound.md
toc:          false
navigation:   false
clipboard:    false
---

You need to find out what is generating the system sound. The next time it happens immediately open a terminal and type `journalctl -b`. Then press the <kbd>End</kbd> key and read what program is issuing the sound.

If nothing appears press <kbd>q</kbd> to quit. Then type `dmesg` and look for an offending program there. The timestamps are important for linking the program in question to the time the sound occurred.
