---
layout:       post
title:        >
    How can I restrict users of computers to 2 hours only?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/964246
type:         Answer
tags:         user-management
created_date: !!str "2017-10-12 11:43:21"
edit_date:    !!str ""
votes:        !!str "6"
favorites:    
views:        !!str "336"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

This [Bash script][1] will lock screen after an interval you specify and require the password to reactivate it.

It gives a count down notification bubble and soft sound at 2 hours, 1 hour, 45, 30, 15, 10, 5, 3, 2 and 1 minute remaining.

As I wrote the script I'd be happy to modify it for anyone. Because it's written in Bash millions of other people with beginner scripting skills can change it as well.

  [1]: http://askubuntu.com/questions/837078/application-that-will-lock-screen-after-a-set-amount-of-time-for-ubuntu
