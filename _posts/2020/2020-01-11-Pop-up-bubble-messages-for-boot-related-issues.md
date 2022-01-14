---
layout:       post
title:        >
    Pop up bubble messages for boot related issues
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1202118
type:         Question
tags:         notify-osd notify-send systemd-journald conky
created_date: 2020-01-11 00:03:00
edit_date:    
votes:        "2 "
favorites:    1
views:        "51 "
accepted:     
uploaded:     2022-01-14 05:03:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-11-Pop-up-bubble-messages-for-boot-related-issues.md
toc:          false
navigation:   false
clipboard:    false
---

I was looking at one of my apps today and wondered if it actually worked to get today's sunrise and sunset times. Conky displays them as 8:46am and 4:36pm respectively but they could be yesterday's times for all I know. I could dig through program code and find what error messages go into `journalctl` if program failed and then manually search for those error messages.

It would be easier if there is an existing app where I put in what messages to watch for and it checks `journalctl` for me. Then it sends a pop-up notification periodically until I acknowledge reading it.

As a bonus the program can keep track of the times a specific error has occurred in a scroll-able database. Maybe for some errors such as NTFS permissions which spam `journalctl` just the count per day, week, month, etc is better and no pop-up notification.

Is there such a program already or do I have to invent the wheel?
