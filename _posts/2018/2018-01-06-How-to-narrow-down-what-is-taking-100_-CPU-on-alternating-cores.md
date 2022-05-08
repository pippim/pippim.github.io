---
layout:       post
title:        >
    How to narrow down what is taking 100% CPU on alternating cores
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/992779
type:         Question
tags:         google-chrome cpu conky
created_date: 2018-01-06 00:20:02
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    2
views:        "646 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-06-How-to-narrow-down-what-is-taking-100_-CPU-on-alternating-cores.md
toc:          false
navigation:   false
clipboard:    false
---

Whilst watching video one core will spike to 100% for a few moments drop off and then another core will spike to 100%.

# 30 second `htop` .gif

[![one cpu 100%.gif][1]][1]

# 30 second `conky` .gif

[![one cpu conky 100%.gif][2]][2]

Other points:

- CPU MHz running over 3000 Mhz (3 GHz) when it is normally around 1000 MHz
- Temperature about 20 degrees Celsius above normal.

# Narrowing it down

While writing this question I accidentally closed the chrome tab with the video on external monitor. CPU frequencies and load dropped to normal. I've noticed before how `apt-get` will spike a single CPU to 100% but this problem is nothing like that.

The process causing abnormal behaviour is `chrome` but what steps can be taken to narrow it down? ie Can a certain sub-process be identified within video codec-land (whatever you call it) and targeted for bug reporting?

## Chrome Version

Version 63.0.3239.132 (Official Build) (64-bit)

  [1]: https://i.stack.imgur.com/XpTpk.gif
  [2]: https://i.stack.imgur.com/9u6nf.gif
