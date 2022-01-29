---
layout:       post
title:        >
    HTML5 Videos flickering
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/823683
type:         Answer
tags:         google-chrome
created_date: 2016-09-11 16:21:55
edit_date:    2016-09-11 16:30:57
votes:        "2 "
favorites:    
views:        "1,776 "
accepted:     Accepted
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-11-HTML5-Videos-flickering.md
toc:          false
navigation:   false
clipboard:    false
---

There are a few things you can try:

 - go to `chrome://flags` and DISABLE `Smooth Scrolling`
 - Make sure `Use hardware acceleration when available` is checked in
   Chrome's advanced settings

You could consider updating kernel as well. This worked for me with i7 integrated graphics platform to cure many annoying glitches and is an easy way of getting updated Intel drivers.

NB: `Smooth Scrolling` is normally set to `default` which works well for me with screen lines scrolling smoothly in chrome.
