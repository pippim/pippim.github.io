---
layout:       post
title:        >
    Is there a stopwatch app available that shows the time on the sidebar?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/930662
type:         Answer
tags:         16.04
created_date: 2017-06-30 11:40:04
edit_date:    2017-06-30 15:03:41
votes:        "1 "
favorites:    
views:        "4,773 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-30-Is-there-a-stopwatch-app-available-that-shows-the-time-on-the-sidebar_.md
toc:          false
navigation:   false
clipboard:    false
---

There is a bash app I wrote that might be over kill: [https://askubuntu.com/a/837115/307523](https://askubuntu.com/a/837115/307523)

![Lock screen timer giphy][1]

It displays a count down timer on the *top bar* though not the *side bar* like you requested.

The default time coincidentally to your needs is 30 minutes but you can change that when calling the app.

The app repetitively calls itself so after say 30 minutes you can add another ten minutes.

As the count down approaches zero message bubbles appear and soft chime is heard at 15, 10, 5, 3, 2 and 1 minute remaining.

When the count down timer hits zero the normal lock screen and password prompt appears.

Because the app is written in bash it can quickly be tailored to your needs.


  [1]: https://i.stack.imgur.com/IcSfu.gif
