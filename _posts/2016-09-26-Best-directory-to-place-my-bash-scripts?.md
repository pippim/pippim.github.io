---
layout:       post
title:        Best directory to place my bash scripts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/830074
type:         Question
tags:         bash scripts
created_date: 2016-09-26 23:08:32
edit_date:    2018-01-04 01:17:04
votes:        4
favorites:    1
views:        240
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

I'm developing some scripts. One for the [annoying speaker beep regression][1] that popped in Ubuntu 16.04 even though `pcspkr` is blacklisted. Another to fix a [PulseAudio 8.0 bug in Ubuntu 16.04][2] where sound switches off from TV to the laptop.

What is the best directory to put my bash scripts in?

I've searched the Q&A database but I get a bunch of different answers for a bunch of different scenarios.

`/usr/local` has been recommended by one person because it's in the PATH$. Is that the right thing to do?

Thank you for your advice.


----------

Even though I accepted below answer over a year ago, I ended up using:

- `/usr/local/bin` for scripts needing sudo powers
- `/home/me/bin` for scripts running at user level

After creating directory `/home/me/bin` you need to log out and in again for it to get into your PATH.

  [1]: https://pippim.github.io/2016/09/26/Turn-off-Motherboard∕PC-Speaker-%22beep%22-in-Ubuntu-16.04-regression.html
  [2]: https://pippim.github.io/2016/10/22/Ubuntu-changing-default-audio-output-after-suspend.html
